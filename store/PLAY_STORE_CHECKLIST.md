# Heartprint — Google Play Yayın Kontrol Listesi

Production `.aab` üretiliyor. Play Store'a yüklemek için gerekenler:

## 1. Ön koşullar (senin yapman gerekenler)
- [ ] **Google Play Developer hesabı** — https://play.google.com/console → $25 tek seferlik ücret
- [ ] **Gizlilik politikası URL'si** — `store/legal/privacy-policy.html` dosyasını bir yere yükle
      (heartprint.app/privacy, GitHub Pages, veya Claude'un vereceği link). Play Console bu URL'yi ister.
- [ ] AdMob hesabını Play uygulamasıyla eşleştir (AdMob → Uygulamalar → Play'e bağla)

## 2. Uygulama içeriği (Play Console → "Uygulama içeriği")
- **Gizlilik politikası:** yukarıdaki URL
- **Reklamlar:** Evet, uygulama reklam içeriyor
- **İçerik derecelendirmesi:** anketi doldur → muhtemelen **PEGI 3 / Everyone** (hafif mizah)
- **Hedef kitle:** 13+ (çocuklara yönelik değil)
- **Veri güvenliği:** aşağıdaki cevapları kullan ⬇️

## 3. Veri Güvenliği Formu (Data Safety) — birebir cevaplar
Uygulamanın gerçekte topladığı veriye göre:

| Soru | Cevap |
|---|---|
| Veri topluyor mu? | **Evet** |
| Veri şifreli aktarılıyor mu? | **Evet** (HTTPS/Firebase) |
| Kullanıcı veri silme isteyebilir mi? | **Evet** (e-posta ile) |

**Toplanan veri türleri:**
- **Kişisel bilgi → İsim** (girdiğin takma ad) — Uygulama işlevselliği için, paylaşılmaz
- **Uygulama etkinliği → Uygulama içi eylemler** (test cevapları/skorlar) — İşlevsellik
- **Cihaz/Diğer kimlikler → Reklam kimliği** (AdMob) — Reklam için
- **Uygulama bilgisi ve performans** (AdMob/Firebase) — Analitik/işlevsellik

Hepsi için: "Toplanıyor" işaretle, "İsteğe bağlı değil" (işlevsellik için gerekli).
Reklam kimliği için "Reklamcılık/pazarlama" amacını işaretle.

## 4. Mağaza listelemesi (hazır — store/ klasörü)
- **Uygulama adı:** Heartprint
- **Kısa/uzun açıklama:** `store/LISTING.md`
- **Ekran görüntüleri:** `store/screenshot-1..5.png` (1080×1920)
- **Öne çıkan görsel:** `store/feature-graphic.png` (1024×500)
- **Uygulama ikonu:** 512×512 gerekli — `assets/icon.png` (1024×1024) küçültülüp yüklenir

## 5. Sürüm yükleme
- Play Console → Üretim → Yeni sürüm oluştur
- Üretilen **`.aab`** dosyasını yükle
- **Play App Signing**'i kabul et (Google imzayı yönetir — önerilen)
- İncelemeye gönder → genelde 1-3 gün sürer

## ⚠️ Önemli notlar
- **Gerçek reklamlar:** Production build gerçek AdMob reklamları gösterir.
  **Kendi reklamlarına tıklama** — hesap yasağına yol açar.
- **Bildirimlerin çalışması** için linklerin açıldığı web sitesi
  (https://heartprint.expo.app) yayında olmalı — YAYINDA. Kendi alan adı
  alınınca WEB_BASE_URL güncellenip yeniden deploy edilmeli.
- İlk sürümde her şeyin mükemmel olması gerekmez — sonra güncelleme atabilirsin.
