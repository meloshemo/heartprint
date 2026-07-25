import { Platform } from 'react-native';
import mobileAds, {
  AdEventType,
  AdsConsent,
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { AD_UNITS } from '../config';

let initialized = false;

/**
 * AdMob SDK'yı başlatır. Önce GDPR/UMP iznini toplar (AB kullanıcıları için
 * AdMob zorunlu tutar). İzin akışı başarısız olsa bile reklamlar başlatılır —
 * kullanıcı deneyimi bloklanmaz.
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
    await mobileAds().initialize();
  } catch (e) {
    console.log('AdMob init hatası:', e);
  }
}

function unitId(kind: 'interstitial' | 'rewarded'): string {
  const real = AD_UNITS[kind][Platform.OS === 'ios' ? 'ios' : 'android'];
  // Geliştirmede veya gerçek ID girilmemişse Google test reklamı
  if (__DEV__ || !real || real.includes('REPLACE')) {
    return kind === 'rewarded' ? TestIds.REWARDED : TestIds.INTERSTITIAL;
  }
  return real;
}

// Sıklık sınırı: ilk oyunda reklam yok, sonra her 2 oyunda bir
let playsSinceAd = 0;

export async function maybeShowInterstitial(): Promise<void> {
  playsSinceAd += 1;
  if (playsSinceAd < 2) return;
  playsSinceAd = 0;
  await showInterstitial();
}

function showInterstitial(): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        resolve();
      }
    };
    try {
      const ad = InterstitialAd.createForAdRequest(unitId('interstitial'));
      ad.addAdEventListener(AdEventType.LOADED, () => {
        ad.show().catch(finish);
      });
      ad.addAdEventListener(AdEventType.CLOSED, finish);
      ad.addAdEventListener(AdEventType.ERROR, finish);
      ad.load();
      setTimeout(finish, 8000); // reklam yüklenmezse akışı bloklamayı önle
    } catch {
      finish();
    }
  });
}

/** Ödüllü reklam gösterir; ödül kazanıldıysa true döner. */
export function showRewarded(): Promise<boolean> {
  return new Promise((resolve) => {
    let earned = false;
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        resolve(earned);
      }
    };
    try {
      const ad = RewardedAd.createForAdRequest(unitId('rewarded'));
      ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
        ad.show().catch(finish);
      });
      ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
        earned = true;
      });
      ad.addAdEventListener(AdEventType.CLOSED, finish);
      ad.addAdEventListener(AdEventType.ERROR, finish);
      ad.load();
      setTimeout(finish, 10000);
    } catch {
      finish();
    }
  });
}
