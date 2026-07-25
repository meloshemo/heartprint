# Heartprint — Play Console'a Kopyala-Yapıştır (v1.0.4)

> Ben (Claude) senin Play Console'una giriş yapamıyorum, formları senin adına dolduramam.
> Aşağıdakileri Play Console'da ilgili alanlara **aynen yapıştır**. Uygulama iki dilli
> (cihaz diline göre TR/EN), o yüzden mağaza listesine **hem İngilizce hem Türkçe**
> yerelleştirme ekle (İngilizce = varsayılan/global, sonra Türkçe ekle).

---

## 1) Ana Mağaza Listesi (Store listing)

### İngilizce (en-US) — DEFAULT

**App name (30):**
```
Heartprint: How Well Do They Know You
```

**Short description (80):**
```
Make a fun quiz about yourself, send it, and see who really knows you best.
```

**Full description (4000):**
```
How well do the people in your life really know you?

Heartprint turns that question into a fun, shareable quiz. Build a quick quiz about YOURSELF, send the link to your partner, mom, dad, best friend, sibling, ex — or stay anonymous — and see how well they score.

⭐ HOW IT WORKS
• Pick who it's for and answer questions about yourself
• Get a link and share it anywhere (WhatsApp, Instagram, TikTok)
• They take the quiz in the browser — no download needed
• See their score and a hilarious result card you can post to your story

🔥 WHY IT'S FUN
• Sarcastic, witty results that are made to be screenshotted
• A beautiful "fingerprint heart" story card that fills up with your score
• Fresh questions every time — the pool rotates so it never gets old
• Categories for partner, mom, dad, best friend, sibling, ex, and anonymous
• Get notified the moment someone solves your test

Perfect for couples, friend groups, and family. Find out who's your ride-or-die and who's just an acquaintance.

Ready to see who really gets you? Make your Heartprint.
```

### Türkçe (tr-TR)

**Uygulama adı (30):**
```
Heartprint: Seni Ne Kadar Tanıyor
```

**Kısa açıklama (80):**
```
Kendinle ilgili eğlenceli bir test yap, gönder ve seni kim gerçekten tanıyor gör.
```

**Uzun açıklama (4000):**
```
Hayatındaki insanlar seni gerçekten ne kadar tanıyor?

Heartprint bu soruyu eğlenceli, paylaşılası bir teste dönüştürüyor. KENDİNLE ilgili kısa bir test hazırla, linki sevgiline, annene, babana, en yakın arkadaşına, kardeşine, eskine gönder — ya da anonim kal — ve kaç puan alacaklarını gör.

⭐ NASIL ÇALIŞIR
• Kimin için olduğunu seç ve kendinle ilgili soruları yanıtla
• Bir link al, istediğin yerde paylaş (WhatsApp, Instagram, TikTok)
• Onlar testi tarayıcıda çözer — indirmeye gerek yok
• Skorlarını ve story'ne atabileceğin komik bir sonuç kartını gör

🔥 NEDEN EĞLENCELİ
• Ekran görüntüsü alınmak için yazılmış sarkastik, esprili sonuçlar
• Skorunla dolan "parmak izi kalbi" story kartı
• Her seferinde farklı sorular — havuz döner, asla bayatlamaz
• Sevgili, anne, baba, en yakın arkadaş, kardeş, eski ve anonim kategorileri
• Testini biri çözdüğü an bildirim al

Çiftler, arkadaş grupları ve aileler için birebir. Kim "mezara kadar", kim sadece tanıdık, öğren.

Seni gerçekten kimin anladığını görmeye hazır mısın? Heartprint'ini yap.
```

---

## 2) Uygulama içeriği (App content)

**Gizlilik politikası URL'si:** (store/legal/privacy-policy.html'i herkese açık bir yere koy)
- Öneri: EAS Hosting'e zaten deploy'lu → `https://heartprint.expo.app/privacy` gibi
  bir yol yoksa, privacy-policy.html'i public/ altına koyup web deploy et; ya da
  GitHub Pages / Claude Artifact linkini kullan.

**Reklamlar:** Evet, uygulama reklam içeriyor (AdMob).

**İçerik derecelendirmesi:** Anketi doldur → beklenen: Everyone / PEGI 3
(hafif mizah, şiddet/uygunsuz içerik yok).

**Hedef kitle ve içerik:** 13+ (çocuklara yönelik DEĞİL).

**Uygulama erişimi (App access):** Tüm işlevler girişsiz açık → "All functionality
is available without special access" seç.

---

## 3) Veri Güvenliği (Data safety) — birebir cevaplar

| Soru | Cevap |
|---|---|
| Veri topluyor/paylaşıyor mu? | **Evet, topluyor** |
| Aktarımda şifreleniyor mu? | **Evet** (HTTPS / Firebase) |
| Kullanıcı silme isteyebilir mi? | **Evet** (uygulama içi "Testi sil" + e-posta) |

**Toplanan veri türleri:**
- Kişisel bilgi → **İsim** (girilen takma ad) — Amaç: Uygulama işlevselliği — Paylaşılmıyor — İsteğe bağlı değil
- Uygulama etkinliği → **Uygulama içi eylemler** (test cevapları/skorlar) — Amaç: İşlevsellik
- Cihaz/Diğer kimlikler → **Reklam kimliği** (AdMob) — Amaç: Reklamcılık
- Uygulama bilgisi ve performans (Firebase/AdMob) — Amaç: Analitik/İşlevsellik

---

## 4) Sürüm (Release)

- **AAB:** `android/app/build/outputs/bundle/release/app-release.aab` (versionCode 104)
- **Play App Signing**: kabul et (Google imzayı yönetir).
- **İmza SHA1** = EA:2A:76:58:... (EAS upload key) → doğru anahtar, kabul edilir.

---

## 5) Grafik varlıklar (Store listing → Graphics)

- **Uygulama ikonu (512×512):** `store/play-icon-512.png`
- **Öne çıkan görsel (1024×500):** `store/feature-graphic.png` ⚠️ ESKİ tasarım, yenilenmeli
- **Telefon ekran görüntüleri (min 2, 1080×1920):** `store/screenshot-1..5.png`
  ⚠️ ESKİ tasarım (9 Temmuz) — yeni parmak izi kartı + avatarlarla YENİLENMELİ.
