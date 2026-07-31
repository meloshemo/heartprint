import { Platform } from 'react-native';

// Paylaşılabilir test linklerinin tabanı.
// Web build Vercel'de barınıyor, kendi alan adı: heartprint.app.
export const WEB_BASE_URL = 'https://heartprint.app';

// Mağaza linkleri — yayına çıktıktan sonra gerçek ID'lerle güncellenmeli.
// iOS: id kısmını App Store Connect'teki sayısal uygulama ID'siyle değiştir.
export const APP_STORE_URL = 'https://apps.apple.com/app/heartprint/id0000000000';
export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=app.heartprint';

// Bir test kodundan tam paylaşım linki üretir.
export function quizLink(code: string): string {
  return `${WEB_BASE_URL}/?q=${code}`;
}

// AdMob reklam birim ID'leri (gerçek — heartprint AdMob hesabı).
// Not: __DEV__ modunda kod yine de Google TEST reklamlarını gösterir
// (kendi reklamına tıklamak hesap yasağına yol açar). Gerçek reklamlar
// yalnızca production build'de yayınlanır. Bkz. src/ads/ads.ts → unitId()
export const AD_UNITS = {
  interstitial: {
    ios: 'ca-app-pub-4634506944728114/6531431512',
    android: 'ca-app-pub-4634506944728114/2132901363',
  },
  rewarded: {
    ios: 'ca-app-pub-4634506944728114/4950636394',
    android: 'ca-app-pub-4634506944728114/1421052559',
  },
} as const;

/**
 * WEB REKLAMI (Google AdSense).
 * AdMob yalnızca uygulama içindir; web tarafının karşılığı AdSense'tir.
 *
 * KURULUM: adsense.google.com'da heartprint.app için site eklenip ONAYLANDIKTAN
 * sonra buradaki iki değer doldurulur. Boş kaldığı sürece web'de hiçbir reklam
 * kodu çalışmaz (WebAdSlot hiçbir şey basmaz) — yani yanlışlıkla boş/bozuk
 * reklam alanı görünmez.
 *   client: "ca-pub-..." (yayıncı kimliği)
 *   slots.result: sonuç ekranındaki birimin reklam birimi kimliği
 * AYRICA: onay sonrası public/ads.txt dosyasına AdSense satırı eklenmeli
 * (app-ads.txt uygulamalar için, ads.txt site için — ikisi ayrı).
 */
export const ADSENSE = {
  client: '',
  slots: {
    result: '',
  },
} as const;

export type MobileOS = 'ios' | 'android' | 'other';

/** Çalışılan cihazın mobil işletim sistemini tespit eder (web'de userAgent'tan). */
export function detectMobileOS(): MobileOS {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
    const ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
    if (/Android/i.test(ua)) return 'android';
  }
  return 'other';
}

/** App Store ID henüz gerçek değilse (iOS yayında değil) placeholder sayılır. */
export const IOS_LIVE = !APP_STORE_URL.includes('id0000000000');

/**
 * Cihaza uygun mağaza linki. iOS henüz yayında değilse iPhone kullanıcısını
 * kırık App Store sayfasına değil web uygulamasına yönlendirir (web = huni).
 */
export function storeUrl(os: MobileOS = detectMobileOS()): string {
  if (os === 'ios') return IOS_LIVE ? APP_STORE_URL : WEB_BASE_URL;
  if (os === 'android') return PLAY_STORE_URL;
  return WEB_BASE_URL;
}
