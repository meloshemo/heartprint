# Heartprint — AdMob Kurulumu

Reklam kodu tamamen hazır. Şu an **Google test reklamları** gösterecek şekilde
ayarlı (geliştirmede tıklaması güvenli). Yayına çıkmadan önce kendi AdMob
hesabının gerçek ID'lerini gir.

> Önemli: AdMob native bir modüldür — **Expo Go'da ve web'de reklam göstermez**.
> Gerçek reklamları görmek için **development/production build** (EAS) gerekir.
> Web'de reklam kodu no-op'tur (uygulama sorunsuz çalışır, ödüllü içerik açılır).

## Nerede hangi reklam var
- **Geçiş reklamı (interstitial)**: test çözüldükten sonra, sonuç ekranından
  önce. İlk oyunda gösterilmez; sonra her 2 oyunda bir (`src/ads/ads.ts`).
- **Ödüllü reklam (rewarded)**: sonuç ekranında "⭐ Premium kart (reklam izle)"
  → izleyince Story kartı premium (altın) temaya döner.

## 1. AdMob hesabı ve uygulama
1. https://admob.google.com → hesap aç.
2. İki uygulama ekle (iOS + Android) — henüz mağazada olmasa da olur.
3. Her uygulamanın **App ID**'sini (`ca-app-pub-XXX~YYY`) al.

## 2. App ID'leri gir
`app.json` → alttaki `react-native-google-mobile-ads` bloğunda test ID'lerini
kendi App ID'lerinle değiştir:
```json
"react-native-google-mobile-ads": {
  "android_app_id": "ca-app-pub-SENIN~ID",
  "ios_app_id": "ca-app-pub-SENIN~ID"
}
```

## 3. Reklam birimi (ad unit) ID'leri gir
AdMob'da her uygulama için **Interstitial** ve **Rewarded** reklam birimi oluştur,
ID'lerini (`ca-app-pub-XXX/YYY`) al ve `src/config.ts` → `AD_UNITS`'e yaz:
```ts
export const AD_UNITS = {
  interstitial: { ios: 'ca-app-pub-.../...', android: 'ca-app-pub-.../...' },
  rewarded:     { ios: 'ca-app-pub-.../...', android: 'ca-app-pub-.../...' },
};
```
`REPLACE` kaldığı ve/veya `__DEV__` olduğu sürece kod otomatik test reklamı gösterir.

## 4. Build al ve test et
```
npx eas-cli build --profile development --platform android
```
Cihaza kur → test yap. (Kendi gerçek reklamlarına tıklamak hesap yasağına yol
açar; test aşamasında test ID'lerinde kal.)

## 5. Yayın öncesi
- Uygulamayı AdMob + Play/App Store ile eşleştir.
- iOS için `SKAdNetwork` ve ATT (App Tracking Transparency) izni gerekebilir —
  plugin çoğunu otomatik ekler; App Store'da "izleme" beyanını doldur.

## Web tarafı (ayrı)
Web'de AdMob çalışmaz; web sonuç sayfasının reklam geliri için **Google AdSense**
ayrı entegre edilir (deploy sonrası, ayrı adım).
