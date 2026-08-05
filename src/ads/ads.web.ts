// Web'de AdMob native modülü yok. Metro bu dosyayı web için otomatik seçer.
// Reklam işlemleri no-op; ödüllü reklam web'de (ücretsiz erişim kanalı) hep verir.

export async function initAds(): Promise<void> {}

export async function maybeShowInterstitial(): Promise<void> {}

export function warmAds(): void {}

export async function showRewarded(): Promise<boolean> {
  return true;
}
