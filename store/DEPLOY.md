# Heartprint — Link Paylaşımını Canlıya Alma

Test linkleri (`https://heartprint.app/?q=...`) backend gerektirmez — quiz verisi
tamamen linkin içinde taşınır. Sadece Expo web build'ini bir statik hostta
yayınlaman yeterli.

## 1. Web build'i üret
```
npx expo export --platform web
```
Çıktı `dist/` klasörüne yazılır (tamamen statik dosyalar).

## 2. Bir statik hosta yükle
En kolay seçenekler (hepsi ücretsiz başlar):
- **Vercel**: `npx vercel deploy dist --prod`
- **Netlify**: `dist` klasörünü netlify.com'a sürükle-bırak
- **GitHub Pages / Cloudflare Pages**: `dist` içeriğini yayınla

## 3. Alan adını bağla
`heartprint.app` alan adını al (şu an boşta) ve host'a yönlendir.
Sonra `src/config.ts` içindeki `WEB_BASE_URL` bununla eşleşiyor mu kontrol et:
```ts
export const WEB_BASE_URL = 'https://heartprint.app';
```
Farklı bir adres kullanacaksan burayı değiştir ve web build'i yeniden üret.

## 4. (Sonraki adım) Uygulama yüklüyse linki uygulamada aç
Şu an link her zaman tarayıcıda açılır (bu iyi — indirmesi olmayan da oynar).
Uygulaması olan kişide linkin doğrudan uygulamada açılması için "universal links"
(iOS) / "app links" (Android) kurulur. Bu, alan adı canlı olduktan sonra
`apple-app-site-association` ve `assetlinks.json` dosyalarını host'a ekleyerek
yapılır. Mağazaya çıkıştan sonraki cila adımı.

## Akış (neden önemli)
1. A kişisi test yapar → link paylaşır
2. B kişisi linke tıklar → **indirmeden** tarayıcıda oynar
3. B sonucu görür → "Sen de dene" ile kendi testini yapar → yeni link paylaşır
4. Döngü büyür 🔁

Bu, viral büyümenin motoru. İndirme sürtünmesi olmadığı için her paylaşım
gerçek bir oyuncuya dönüşür.
