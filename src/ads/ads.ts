import { Platform } from 'react-native';
import mobileAds, {
  AdEventType,
  AdsConsent,
  InterstitialAd,
  MaxAdContentRating,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { AD_UNITS } from '../config';

let initialized = false;

/**
 * AdMob SDK'sını başlatır. Sırayla: GDPR/UMP izni → içerik filtresi → init →
 * reklamların ÖN YÜKLEMESİ. İzin akışı başarısız olsa bile reklamlar
 * başlatılır — kullanıcı deneyimi bloklanmaz.
 */
export async function initAds(): Promise<void> {
  if (initialized) return;
  initialized = true;
  try {
    // Gerekliyse izin formunu gösterir (AB dışında sessizce geçer)
    await AdsConsent.gatherConsent();
  } catch (e) {
    console.log('Reklam izni (UMP) hatası:', e);
  }
  try {
    // İÇERİK FİLTRESİ: sonuç kartları herkese açık paylaşılıyor ve uygulamayı
    // genç kullanıcılar da oynuyor. PG üstü içerik (alkol, kumar, cinsel
    // içerik, silah) istenmiyor → Google bu seviyenin ÜSTÜNDEKİ reklamları
    // hiç göndermez. Filtre daraldıkça envanter de daralır; PG bilinçli denge.
    // tagForChildDirectedTreatment KASITLI OLARAK AYARLANMIYOR: uygulama
    // çocuklara yönelik değil, yanlış beyan hesap kapanmasına yol açar.
    await mobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
    });
  } catch (e) {
    console.log('Reklam içerik filtresi ayarlanamadı:', e);
  }
  try {
    await mobileAds().initialize();
  } catch (e) {
    console.log('AdMob init hatası:', e);
  }
  // Reklamları şimdiden yükle: gösterim anında ağ beklemesi olmasın.
  preloadInterstitial();
  preloadRewarded();
}

function unitId(kind: 'interstitial' | 'rewarded'): string {
  const real = AD_UNITS[kind][Platform.OS === 'ios' ? 'ios' : 'android'];
  // Geliştirmede veya gerçek ID girilmemişse Google test reklamı
  if (__DEV__ || !real || real.includes('REPLACE')) {
    return kind === 'rewarded' ? TestIds.REWARDED : TestIds.INTERSTITIAL;
  }
  return real;
}

/*
 * ÖN YÜKLEME
 * ----------
 * Eskiden reklam tam gösterileceği anda oluşturulup load() ediliyordu; bu da
 * sonuç ekranına geçerken 1-8 saniyelik boş bekleme demekti. Artık reklam
 * ihtiyaçtan ÖNCE hazırda bekletilir, gösterim anında yalnızca show() çağrılır
 * → geçiş anında açılır. Gösterilen örnek tükenir, yerine yenisi yüklenir.
 */

type Slot<T> = {
  ad: T | null;
  ready: boolean;
  loading: boolean;
  fails: number;
  retry: ReturnType<typeof setTimeout> | null;
};

const inter: Slot<InterstitialAd> = {
  ad: null,
  ready: false,
  loading: false,
  fails: 0,
  retry: null,
};
const rew: Slot<RewardedAd> = {
  ad: null,
  ready: false,
  loading: false,
  fails: 0,
  retry: null,
};

/**
 * Başarısız yüklemeden sonraki bekleme: 4s, 8s, 16s, 32s… en fazla 2 dakika.
 * Bu OLMADAN tek bir başarısız istek reklamı kalıcı olarak öldürüyordu —
 * yeni AdMob birimleri ve "sınırlı reklam sunumu" kısıtı yüzünden ilk
 * isteklerin patlaması olağan; sürekli yeniden denemek şart.
 */
function backoffMs(fails: number): number {
  return Math.min(4000 * 2 ** (fails - 1), 120000);
}

function scheduleRetry(slot: Slot<unknown>, load: () => void): void {
  if (slot.retry) return;
  const wait = backoffMs(slot.fails);
  slot.retry = setTimeout(() => {
    slot.retry = null;
    load();
  }, wait);
}

function preloadInterstitial(): void {
  if (inter.loading || inter.ready) return;
  inter.loading = true;
  try {
    const ad = InterstitialAd.createForAdRequest(unitId('interstitial'));
    inter.ad = ad;
    ad.addAdEventListener(AdEventType.LOADED, () => {
      inter.ready = true;
      inter.loading = false;
      inter.fails = 0;
    });
    ad.addAdEventListener(AdEventType.ERROR, (e) => {
      inter.ad = null;
      inter.ready = false;
      inter.loading = false;
      inter.fails += 1;
      console.log('Geçiş reklamı yüklenemedi (deneme ' + inter.fails + '):', e);
      scheduleRetry(inter, preloadInterstitial);
    });
    ad.load();
  } catch (e) {
    inter.loading = false;
    inter.fails += 1;
    scheduleRetry(inter, preloadInterstitial);
  }
}

function preloadRewarded(): void {
  if (rew.loading || rew.ready) return;
  rew.loading = true;
  try {
    const ad = RewardedAd.createForAdRequest(unitId('rewarded'));
    rew.ad = ad;
    ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rew.ready = true;
      rew.loading = false;
      rew.fails = 0;
    });
    ad.addAdEventListener(AdEventType.ERROR, (e) => {
      rew.ad = null;
      rew.ready = false;
      rew.loading = false;
      rew.fails += 1;
      console.log('Ödüllü reklam yüklenemedi (deneme ' + rew.fails + '):', e);
      scheduleRetry(rew, preloadRewarded);
    });
    ad.load();
  } catch (e) {
    rew.loading = false;
    rew.fails += 1;
    scheduleRetry(rew, preloadRewarded);
  }
}

/**
 * Test bitiminde, sonuç ekranından hemen önce geçiş reklamı gösterir.
 *
 * SIKLIK: her test bitiminde (ürün kararı, 2026-07-31). Önceden ilk oyun
 * muaftı ve sonrasında 2 oyunda bire düşüyordu. Sonucu görmek kullanıcının
 * en çok istediği an olduğu için reklamın taşıdığı en değerli nokta burası.
 *
 * HAZIR DEĞİLSE BEKLEMEZ, atlar: kullanıcıyı sonuç ekranından alıkoymak
 * reklamın kazandırdığından fazlasını götürüyordu.
 */
export async function maybeShowInterstitial(): Promise<void> {
  if (!inter.ready || !inter.ad) {
    preloadInterstitial(); // bir dahakine hazır olsun
    return;
  }
  await showPreloadedInterstitial();
}

function showPreloadedInterstitial(): Promise<void> {
  return new Promise((resolve) => {
    const ad = inter.ad;
    if (!ad) return resolve();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      // Örnek tükendi → yenisini hazırla
      inter.ad = null;
      inter.ready = false;
      preloadInterstitial();
      resolve();
    };
    try {
      ad.addAdEventListener(AdEventType.CLOSED, finish);
      ad.addAdEventListener(AdEventType.ERROR, finish);
      ad.show().catch(finish);
      // Reklam kapanış olayı hiç gelmezse akış kilitlenmesin
      setTimeout(finish, 60000);
    } catch {
      finish();
    }
  });
}

/**
 * Ödüllü reklam gösterir; ödül kazanıldıysa true döner.
 * Ön yüklenmişse ANINDA açılır. Değilse yüklenmesini kısa süre bekler
 * (kullanıcı bu reklamı bilerek istedi), ama süresiz bekletmez.
 */
export function showRewarded(): Promise<boolean> {
  if (rew.ready && rew.ad) return showPreloadedRewarded();
  // Bekleyen backoff varsa iptal et: kullanıcı reklamı ŞU AN istedi.
  if (rew.retry) {
    clearTimeout(rew.retry);
    rew.retry = null;
  }
  preloadRewarded();
  return new Promise((resolve) => {
    const started = Date.now();
    const tick = () => {
      if (rew.ready && rew.ad) {
        showPreloadedRewarded().then(resolve);
      } else if (Date.now() - started > 12000) {
        // Reklam gelmedi (yeni birim / sınırlı sunum / ağ). Kullanıcıyı
        // cezalandırmanın anlamı yok: gösterilecek reklam yoksa gelir de
        // yok, ama özelliği kilitli bırakmak kullanıcıyı kaybettirir.
        // Bu yüzden ödül VERİLİR.
        console.log('Ödüllü reklam gelmedi, ödül yine de veriliyor.');
        resolve(true);
      } else {
        setTimeout(tick, 250);
      }
    };
    tick();
  });
}

function showPreloadedRewarded(): Promise<boolean> {
  return new Promise((resolve) => {
    const ad = rew.ad;
    if (!ad) return resolve(false);
    let earned = false;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      rew.ad = null;
      rew.ready = false;
      preloadRewarded();
      resolve(earned);
    };
    try {
      ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
        earned = true;
      });
      ad.addAdEventListener(AdEventType.CLOSED, finish);
      ad.addAdEventListener(AdEventType.ERROR, finish);
      ad.show().catch(finish);
      setTimeout(finish, 120000);
    } catch {
      finish();
    }
  });
}
