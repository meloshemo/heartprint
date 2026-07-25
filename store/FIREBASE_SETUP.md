# Heartprint — Firebase Backend Kurulumu

> ## ✅ DURUM: CANLI (heartprint-c15f2)
> 1-4. adımlar **tamamlandı**: config girildi, Anonymous auth açık, Firestore
> kuralları + index'leri deploy edildi, Blaze aktif ve **Cloud Function canlı**
> (`onQuizResult`, europe-west3, Node 22). Canlı testler geçti.
> **Kalan tek adım: 5 (EAS build + FCM/APNs)** — gerçek cihazda bildirim için.
> Aşağıdakiler referans/yeniden kurulum içindir.

Backend üç şey sağlar: testlerin bulut kaydı, kısa linkler ve **"X testini çözdü"
push bildirimleri**. Kod tamamen hazır; sadece kendi Firebase projeni bağlaman
gerekiyor.

> Not: Firebase bağlanmadan da uygulama çalışır — backend erişilemezse otomatik
> olarak eski çevrimdışı base64 linkine düşer. Bildirimler ise backend ister.

## 1. Firebase projesi
1. https://console.firebase.google.com → yeni proje (veya mevcut projen).
2. **Firestore Database** oluştur (production mode).
3. **Authentication** → Sign-in method → **Anonymous**'ı etkinleştir.

## 2. Web yapılandırmasını uygulamaya gir
Proje ayarları → "Uygulamalarınız" → Web uygulaması ekle → `firebaseConfig`
nesnesini kopyala ve şuraya yapıştır:
`src/backend/firebaseConfig.ts` → `firebaseConfig` (`USE_EMULATOR` üretimde `false` kalmalı).

## 3. Firestore kuralları ve index'leri yayınla
```
npx firebase-tools deploy --only firestore:rules,firestore:indexes --project SENIN_PROJE_ID
```
(`firestore.rules` ve `firestore.indexes.json` repoda hazır.)

## 4. Cloud Function'ı yayınla (bildirim tetikleyici)
```
cd functions && npm install && cd ..
npx firebase-tools deploy --only functions --project SENIN_PROJE_ID
```
Fonksiyon: biri testi çözünce sahibine Expo push bildirimi gönderir + playCount artırır.

## 5. Push bildirimleri için EAS + kimlik bilgileri
Push, gerçek cihazda (Expo Go değil, **development/production build**) çalışır:
1. `npx eas-cli build:configure` → `app.json`'a EAS `projectId` eklenir.
2. Bildirim kimlik bilgileri:
   - **Android**: Firebase projenden FCM'i Expo'ya bağla
     (`npx eas-cli credentials` → Android → FCM V1 anahtarını yükle).
   - **iOS**: `npx eas-cli credentials` → iOS → push key (APNs) oluştur.
3. Build al: `npx eas-cli build --profile development --platform android`
4. Cihaza kur, test yap → başka biri linkinden çözünce bildirim gelir 🔔

## Yerel test (opsiyonel — gerçek projeye dokunmadan)
```
npx firebase-tools emulators:start --only auth,firestore,functions
```
Sonra `src/backend/firebaseConfig.ts` içinde `USE_EMULATOR = true` yap ve
`node scripts/test-backend.mjs` ile veri katmanını test et (10 kontrol geçmeli).
Bitince `USE_EMULATOR = false` yapmayı unutma.

## Veri modeli
```
quizzes/{id}          → cat, name, answers[], creatorId, pushToken, playCount, createdAt
quizzes/{id}/results/{rid} → guesserName, correct, total, percent, createdAt
```
Güvenlik: testi herkes okuyabilir (link ile oynasın), sadece sahibi düzenler;
sonucu herkes ekleyebilir (çözen anonim olabilir), yalnızca sahibi okuyabilir.
