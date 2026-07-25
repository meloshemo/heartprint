# Play Console — Kalan Adımlar (kopyala-yapıştır hazır)

Kontrol panelinde 3 madde kaldı: **Veri güvenliği**, **Uygulama kategorisi + iletişim**, **Mağaza girişi**.
Aşağıdaki cevaplar uygulamanın gerçek davranışına göre hazırlandı.

---

## 1) VERİ GÜVENLİĞİ (Uygulama içeriği → Veri güvenliği)

5 adımlı sihirbaz. Her veri türü penceresini **Kaydet** ile kapat.

### Adım 2 — Veri toplama ve güvenlik
- Uygulama zorunlu veri topluyor/paylaşıyor mu? → **Evet**
- Aktarımda şifreleniyor mu? → **Evet**
- Hesap oluşturma yöntemleri → **"Uygulamam kullanıcıların hesap oluşturmasına izin vermiyor"** işaretle
  - Dışarıda oluşturulan hesapla giriş? → **Hayır**
- Veri silme talebi yolu var mı? → **Evet**
  - **Veri silme URL'si:** `https://claude.ai/code/artifact/74f510b2-d7fa-4072-9594-d9c2a6bd92c8`

### Adım 3 — Veri türleri (yalnızca bu 3'ünü işaretle)
- **Kişisel bilgiler → Ad**
- **Uygulama etkinliği → Uygulama işlemleri**
- **Cihaz veya diğer kimlikler → Cihaz veya diğer kimlikler**

### Adım 4 — Her tür için "Başlat" → şu cevaplar → Kaydet
**Ad (İsim):**
- Toplandı ✓ (Paylaşıldı: HAYIR)
- Kısa süreli işleniyor mu? → **Hayır**
- Zorunlu mu? → **Veriler zorunlu olarak toplanır**
- Amaç → **Uygulama işlevselliği**

**Uygulama işlemleri:**
- Toplandı ✓ (Paylaşıldı: HAYIR)
- Kısa süreli? → **Hayır**
- Zorunlu → **Veriler zorunlu olarak toplanır**
- Amaç → **Uygulama işlevselliği** (istersen **Analiz** de eklenebilir)

**Cihaz veya diğer kimlikler (reklam kimliği — AdMob):**
- Toplandı ✓ **ve Paylaşıldı ✓** (AdMob üçüncü taraf)
- Kısa süreli? → **Hayır**
- Zorunlu → **Veriler zorunlu olarak toplanır**
- Amaç → **Reklamcılık veya pazarlama**

### Adım 5 — Önizleme → **Kaydet**

---

## 2) UYGULAMA KATEGORİSİ + İLETİŞİM (Kontrol paneli → "Uygulama kategorisi seçip iletişim bilgileri")

- **Uygulama mı, oyun mu?** → Uygulama
- **Kategori** → **Eğlence** (Entertainment)
- **Etiketler** → quiz, arkadaşlık, eğlence (varsa seç)
- **İletişim e-postası** → `y.osmanmelih@gmail.com`
- **Web sitesi** → `https://heartprint.expo.app`
- **Telefon** → (isteğe bağlı, boş bırakılabilir)

---

## 3) MAĞAZA GİRİŞİ (Kontrol paneli → "Mağaza girişinizi oluşturun")

Play, varsayılan dil + eklediğin diller için ayrı metin ister. Aşağıda **Türkçe (tr-TR)** ve **İngilizce (en-US)** hazır.

### Uygulama adı (max 30)
`Heartprint`

### 🇹🇷 Türkçe (tr-TR)
**Kısa açıklama (max 80):**
```
Seni ne kadar tanıyorlar? Test yap, linki paylaş, sonucu birlikte gör 💛
```
**Tam açıklama (max 4000):**
```
Seni gerçekten tanıyorlar mı? Öğrenmenin en eğlenceli yolu Heartprint!

Kendine dair bir test oluştur, cevapları sen belirle, linki sevgiline, annene, en yakın arkadaşına ya da kardeşine gönder. Onlar da seni ne kadar tanıdıklarını görsün. Sonuç kartı komik, sarkastik ve paylaşılası — Instagram ve TikTok story'lerine bir tıkla düşer.

✨ Nasıl çalışır?
1. Bir kategori seç (Sevgilim, Annem, Babam, Kardeşim, En Yakın Arkadaşım, Eski Sevgilim ya da Anonim)
2. Kendine dair soruları yanıtla
3. Linki paylaş
4. Kim çözdü, kaç aldı — anında bildirim al

💛 Neden Heartprint?
• Yüzlerce eğlenceli, kişisel soru — her testte farklı
• Altınla dolan "parmak izi kalbi" sonuç kartı
• Komik ve sarkastik sonuçlar (kimseyi kırmadan güldüren)
• İndirmeden, tarayıcıda bile oynanabilir
• Türkçe ve İngilizce tam destek

Arkadaş gruplarında, ailelerde, ilişkilerde saatlerce eğlence. Sıra sende — bakalım seni ne kadar tanıyorlar? 👀
```

### 🇬🇧 İngilizce (en-US)
**Short description (max 80):**
```
How well do they know you? Make a quiz, share the link, see the score 💛
```
**Full description (max 4000):**
```
Do they REALLY know you? Heartprint is the funnest way to find out.

Create a quiz about yourself, set the answers, and send the link to your partner, mom, dad, best friend, or sibling. See how well they actually know you. The result card is funny, a little sarcastic, and made for sharing — one tap and it lands on your Instagram or TikTok story.

✨ How it works
1. Pick a category (Partner, Mom, Dad, Sibling, Best Friend, Ex, or Anonymous)
2. Answer questions about yourself
3. Share the link
4. Get notified the moment someone solves it — who and what they scored

💛 Why Heartprint?
• Hundreds of fun, personal questions — different every time
• A gold "fingerprint heart" result card that fills with your score
• Funny, roast-style results that make everyone laugh (never mean)
• Playable right in the browser, no install needed
• Full English and Turkish support

Hours of fun for friend groups, families, and couples. Your turn — how well do they know you? 👀
```

### Grafik varlıklar (store/ klasöründe hazır — ama ESKİ tasarım!)
- **Uygulama ikonu (512×512):** `store/play-icon-512.png`
- **Öne çıkan görsel (1024×500):** `store/feature-graphic.png` ⚠️ eski
- **Telefon ekran görüntüleri (min 2, 1080×1920):** `store/screenshot-1..5.png` ⚠️ ESKİ TASARIM
> NOT: Ekran görüntüleri 9 Temmuz'dan, yeni parmak-izi-kalbi kartını ve avatarları göstermiyor. Yayından önce güncellenmeli (Claude üretebilir).

---

## Yükleme (AAB) — hatırlatma
- Yüklenecek dosya: `android/app/build/outputs/bundle/release/app-release.aab`
- İmza SHA1: `EA:2A:76:...` (EAS keystore), versionCode: en son build'deki
- Play App Signing'i kabul et.

## Bu formlardan SONRA yayın için gerekenler
- Üretim sürümü oluştur → AAB yükle → İncelemeye gönder
- (Bu dosyadaki 3 madde + AAB tamamlanınca "Yayınla/İncelemeye gönder" aktifleşir)
