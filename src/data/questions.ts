import { CategoryId, Question } from '../types';
import { LANG } from '../i18n/locale';
import { SHARED_EN, SPECIFIC_EN } from './questions.en';

// Sorular her zaman testi OLUŞTURAN kişi hakkındadır (onu ne kadar tanıyorlar?).
// text: oluşturan görür (1. şahıs). textGuess: tahmin eden görür ({name} = oluşturanın adı).
// Her testte havuzdan RASTGELE seçilir; seçilen id'ler teste kaydedilir ki
// tahmin eden aynı soruları görsün.

// --- Evrensel havuz (her kategoride kullanılabilir) ---
const SHARED_TR: Question[] = [
  { id: 1, text: 'En sevdiğim renk hangisi?', textGuess: '{name} en çok hangi rengi sever?', options: ['Mavi / turkuaz', 'Siyah / gri', 'Kırmızı / bordo', 'Yeşil / pastel'] },
  { id: 2, text: 'En sevdiğim yemek türü?', textGuess: '{name} en çok hangi yemeği sever?', options: ['Ev yemeği', 'Kebap / ızgara', 'Makarna / pizza', 'Fast food'] },
  { id: 3, text: 'Kahve mi çay mı?', textGuess: '{name} için: kahve mi çay mı?', options: ['Kahve', 'Çay', 'İkisi de', 'Hiçbiri'] },
  { id: 4, text: 'Sabah insanı mıyım, gece insanı mı?', textGuess: '{name} sabah insanı mı, gece insanı mı?', options: ['Sabah insanı', 'Gece kuşu', 'İkisi de', 'Sürekli uykulu'] },
  { id: 5, text: 'Kızgın olduğumda ne yaparım?', textGuess: '{name} kızgınken ne yapar?', options: ['Susar, küser', 'Anında söyler', 'Kapıyı çarpar', 'Yemeğe sarılır'] },
  { id: 6, text: 'Hangi müzik ruhuma iyi gelir?', textGuess: '{name} en çok hangi müziği dinler?', options: ['Pop', 'Rap / hip-hop', 'Rock', 'Türkçe slow / arabesk'] },
  { id: 7, text: 'En sevdiğim mevsim?', textGuess: "{name}'in en sevdiği mevsim?", options: ['Yaz', 'Kış', 'İlkbahar', 'Sonbahar'] },
  { id: 8, text: 'Tatlı mı tuzlu mu?', textGuess: '{name} için: tatlı mı tuzlu mu?', options: ['Tatlı', 'Tuzlu', 'İkisi de', 'Canı ne isterse'] },
  { id: 9, text: 'Boş bir günümde ne yaparım?', textGuess: '{name} boş gününde ne yapar?', options: ['Dizi maratonu', 'Arkadaşlarla takılır', 'Uyur', 'Dışarı çıkar'] },
  { id: 10, text: 'En büyük korkum nedir?', textGuess: "{name}'in en büyük korkusu?", options: ['Böcekler', 'Yükseklik', 'Karanlık', 'Yalnız kalmak'] },
  { id: 11, text: 'Elime para geçse ilk ne yaparım?', textGuess: "{name}'in eline para geçse ilk ne yapar?", options: ['Teknoloji alır', 'Kıyafet / alışveriş', 'Seyahate çıkar', 'Biriktirir'] },
  { id: 12, text: 'Telefonumda en çok hangi uygulama açık?', textGuess: "{name}'in telefonunda en çok hangi uygulama açık?", options: ['Instagram', 'TikTok', 'YouTube', 'WhatsApp'] },
  { id: 13, text: 'Beni en iyi anlatan emoji?', textGuess: "{name}'i en iyi anlatan emoji?", options: ['😎', '🥹', '😂', '😴'] },
  { id: 14, text: 'İdeal tatilim nasıl olurdu?', textGuess: "{name}'in ideal tatili nasıl olur?", options: ['Deniz / kumsal', 'Şehir gezisi', 'Doğa / kamp', 'Evde dinlenmek'] },
  { id: 15, text: 'Bir süper gücüm olsa ne isterdim?', textGuess: '{name} hangi süper gücü isterdi?', options: ['Uçmak', 'Görünmezlik', 'Zamanı durdurmak', 'Zihin okumak'] },
  { id: 16, text: 'Stresliyken beni ne rahatlatır?', textGuess: '{name} stresliyken onu ne rahatlatır?', options: ['Müzik', 'Yürüyüş', 'Uyku', 'Sevdiğiyle konuşmak'] },
  { id: 17, text: 'Yeni tanıştığım biriyle nasılımdır?', textGuess: '{name} yeni tanıştığı biriyle nasıldır?', options: ['Çok konuşkan', 'Utangaç', 'Mesafeli', 'Duruma göre'] },
  { id: 18, text: 'Canım sıkılınca ilk ne yaparım?', textGuess: '{name} canı sıkılınca ilk ne yapar?', options: ['Telefon karıştırır', 'Atıştırır', 'Uyur', 'Birine yazar'] },
  { id: 19, text: 'Plan mı yaparım, akışına mı bırakırım?', textGuess: '{name} plancı mı, akışına mı bırakır?', options: ['Her şey planlı', 'Akışına bırakır', 'Son dakikacı', 'Karışık'] },
  { id: 20, text: 'En sevdiğim atıştırmalık?', textGuess: "{name}'in en sevdiği atıştırmalık?", options: ['Çikolata / tatlı', 'Cips / tuzlu', 'Meyve', 'Ne bulursa'] },
  { id: 21, text: 'Fotoğraf çekilmeyi sever miyim?', textGuess: '{name} fotoğraf çekilmeyi sever mi?', options: ['Bayılır', 'Nefret eder', 'İyi çıkarsa', 'Hep aynı poz'] },
  { id: 22, text: 'Sabah alarmı kaç kez ertelerim?', textGuess: '{name} sabah alarmı kaç kez erteler?', options: ['Hiç, kalkar', '2-3 kez', 'Sayısız', 'Alarmı duymaz bile'] },
  { id: 23, text: 'Bir şeye üzülünce belli eder miyim?', textGuess: '{name} üzülünce belli eder mi?', options: ['Yüzünden okunur', 'Hiç belli etmez', 'Sessizleşir', 'Espriyle örter'] },
  { id: 24, text: 'Beni en çok ne mutlu eder?', textGuess: "{name}'i en çok ne mutlu eder?", options: ['Küçük sürprizler', 'Sevdikleriyle vakit', 'Başarmak', 'Huzur / yalnızlık'] },
  // "Bu mu şu mu" tarzı (IG this-or-that formatından uyarlanan) sorular:
  { id: 25, text: 'Deniz mi dağ mı?', textGuess: '{name} için: deniz mi dağ mı?', options: ['Deniz', 'Dağ', 'İkisi de', 'Evim en iyisi'] },
  { id: 26, text: 'Kedi mi köpek mi?', textGuess: '{name} için: kedi mi köpek mi?', options: ['Kedi', 'Köpek', 'İkisi de', 'Hayvan sevmez'] },
  { id: 27, text: 'Film mi dizi mi?', textGuess: '{name} için: film mi dizi mi?', options: ['Film', 'Dizi', 'İkisi de açıkken uyur', 'Kitap / hiçbiri'] },
  { id: 28, text: 'Mesaj mı sesli arama mı?', textGuess: '{name} mesaj mı atar, arar mı?', options: ['Mesaj', 'Arama', 'Uzun sesli mesaj', 'Ona ulaşılmaz'] },
  { id: 29, text: 'İçe dönük müyüm dışa dönük mü?', textGuess: '{name} içe dönük mü dışa dönük mü?', options: ['Tam içe dönük', 'Tam dışa dönük', 'Ortası', 'Ortama göre değişir'] },
  { id: 30, text: 'Param olsa harcar mıyım biriktirir miyim?', textGuess: '{name} parayı harcar mı biriktirir mi?', options: ['Harcar', 'Biriktirir', 'Harcar, sonra pişman olur', 'Zaten parası olmaz'] },
  { id: 31, text: 'Buluşmalara nasıl giderim?', textGuess: '{name} buluşmalara nasıl gider?', options: ['Erkenden orada', 'Tam vaktinde', 'Hep geç kalır', '"Çıktım" der, evdedir'] },
  { id: 32, text: 'Sabah duşu mu akşam duşu mu?', textGuess: '{name} için: sabah duşu mu akşam duşu mu?', options: ['Sabah', 'Akşam', 'İkisi de', 'Ne zaman denk gelirse'] },
  { id: 33, text: 'Odaklanırken müzik mi sessizlik mi?', textGuess: '{name} odaklanırken müzik mi sessizlik mi ister?', options: ['Müzik açık', 'Tam sessizlik', 'Kafe uğultusu', 'Zaten odaklanamaz'] },
  { id: 34, text: 'Giyimde trend mi klasik mi?', textGuess: '{name} giyimde trend mi klasik mi?', options: ['Trend ne varsa', 'Klasik / sade', 'Rahatlık her şey', 'Hep aynı kombin'] },
  { id: 35, text: 'Uçakta / otobüste: cam mı koridor mu?', textGuess: '{name} için: cam kenarı mı koridor mu?', options: ['Cam kenarı', 'Koridor', 'Fark etmez', 'Yolculuğu sevmez'] },
  { id: 36, text: 'Acıkınca: yemek mi yaparım, sipariş mi?', textGuess: '{name} acıkınca yemek mi yapar, sipariş mi verir?', options: ['Kendi yapar', 'Sipariş verir', 'Anne mutfağına gider', 'Ne bulursa onu yer'] },
  { id: 37, text: 'Bir dizide hangi karakter olurdum?', textGuess: '{name} bir dizide hangi karakter olurdu?', options: ['Herkesi güldüren', 'Gizemli olan', 'Dramatik olan', 'Arka planda takılan'] },
  { id: 38, text: 'Mesajlara dönüş hızım?', textGuess: '{name} mesajlara ne hızda döner?', options: ['Saniyesinde', 'Görür, cevabı unutur', 'Günler sonra', 'Görüldüde bırakır'] },
  { id: 39, text: 'Instagram profilim nasıldır?', textGuess: "{name}'in Instagram profili nasıldır?", options: ['Her an her şey paylaşılır', 'Yılda bir post', 'Sadece story atar', 'Kapalı kutu'] },
  { id: 40, text: 'Müzik dinleme tarzım?', textGuess: '{name} müziği nasıl dinler?', options: ['Aynı şarkı yüz kere', 'Sürekli yeni keşif', 'Modu neyse o', 'Ne denk gelirse'] },
  { id: 41, text: 'Karar verirken nasılımdır?', textGuess: '{name} karar verirken nasıldır?', options: ['Anında karar', 'Günlerce düşünür', 'Herkese danışır', 'Verir, sonra değiştirir'] },
  { id: 42, text: 'Tabakta en sevdiğimi ne yaparım?', textGuess: '{name} tabakta en sevdiği şeyi ne yapar?', options: ['İlk onu yer', 'Sona saklar', 'Karıştırıp yer', 'Kimseye koklatmaz'] },
  // Durum komedisi tarzı (internet kültürü) sorular, esprili şıklarla:
  { id: 43, text: 'Restoranda hesap gelince ne yaparım?', textGuess: '{name} hesap gelince ne yapar?', options: ['"Ben hallederim"', 'Usulca tuvalete kaçar', 'Hesabı böler', 'Telefonuna dalar'] },
  { id: 44, text: 'Yanlış kişiye mesaj atınca?', textGuess: '{name} yanlış kişiye mesaj atınca ne yapar?', options: ['Anında siler', 'Ölü taklidi yapar', '"Pardon yanlış oldu"', 'Görmezden gelir'] },
  { id: 45, text: 'Dizi izlerken "son bölüm" der miyim?', textGuess: '{name} "son bir bölüm" der mi?', options: ['Der ama yalan', 'Gerçekten durur', 'Sabaha kadar', 'Zaten uyuyakalır'] },
  { id: 46, text: 'Birinin story\'sine yanlış like atınca?', textGuess: '{name} yanlış like atınca ne yapar?', options: ['Panikler', 'Umursamaz', 'Geri alır, görmez sanır', 'Yer yarılsa girecek'] },
  { id: 47, text: 'Otobüste yanıma biri oturunca?', textGuess: '{name} yanına biri oturunca ne yapar?', options: ['Kulaklık takar', 'Cama yaslanır', 'İnecekmiş gibi kalkar', 'Sohbete dalar'] },
  { id: 48, text: 'Grup fotoğrafında ilk kime bakarım?', textGuess: '{name} grup fotoğrafında ilk kime bakar?', options: ['Kendine', 'Kötü çıkana güler', 'Sevdiğine', 'Beğenmez, sildirir'] },
  { id: 49, text: 'Biri "sana bir şey diyeceğim" deyince?', textGuess: '{name} "bir şey diyeceğim" deyince ne olur?', options: ['En kötüsünü düşünür', 'Merakla bekler', 'Umursamaz', 'Kalbi yerinden çıkar'] },
  { id: 50, text: 'Sevdiğim şarkı çalınca ne yaparım?', textGuess: '{name} sevdiği şarkı çalınca ne yapar?', options: ['Sesi patlatır', 'İçten söyler', 'Klip çeker gibi', 'Kimse yokken coşar'] },
  { id: 51, text: 'İki kişi ortalıkta aşırı sarılınca ne derim?', textGuess: '{name} ortada aşırı romantizme ne der?', options: ['"Oda tutun ya"', 'Görmezden gelir', 'İçten içe imrenir', '"Ay ne tatlılar"'] },
  { id: 52, text: 'Wifi şifresi sorulunca?', textGuess: '{name} wifi şifresini nasıl verir?', options: ['Ezbere söyler', 'Kutuya bakar', '"Dur bi bulamadım"', 'Vermez, misafir sevmez'] },
  { id: 53, text: 'Selfie çekerken nasılımdır?', textGuess: '{name} selfie çekerken nasıldır?', options: ['100 poz dener', 'Tek karede halleder', 'Filtresiz çekmez', 'Çekilmekten kaçar'] },
  { id: 54, text: 'Plan yapılınca içimden ne geçer?', textGuess: '{name} plan yapılınca ne umar?', options: ['"İptal olsa"', 'Heyecanla bekler', 'Son an kaçar', 'Kesin gider'] },
  // Kişilik soruları (sosyal medya "who knows me" trendlerinden esinli, özgün):
  { id: 55, text: 'Tartışmada haklıyken susar mıyım?', textGuess: '{name} haklıyken susar mı?', options: ['Asla, sonuna kadar', 'Susar, içine atar', 'Espriyle geçer', 'Ortamı terk eder'] },
  { id: 56, text: 'Gece yatağa girince beynim ne yapar?', textGuess: '{name} yatağa girince beyni ne yapar?', options: ['Eski rezaletleri açar', 'Anında uyur', 'Yarını planlar', 'Telefona sarılır'] },
  { id: 57, text: 'Birinden hoşlanınca belli eder miyim?', textGuess: '{name} birinden hoşlanınca belli eder mi?', options: ['Yüzünden okunur', 'Tam tersini yapar', 'Aşırı normal davranır', 'Kimse anlamaz'] },
  { id: 58, text: 'İltifat alınca ne yaparım?', textGuess: '{name} iltifat alınca ne yapar?', options: ['Utanır, konuyu değiştirir', 'Teşekkür eder', 'İnanmaz', 'Günlerce anlatır'] },
  { id: 59, text: 'Sıra beklerken nasılımdır?', textGuess: '{name} sıra beklerken nasıldır?', options: ['Sabırsız, homurdanır', 'Telefona gömülür', 'Sohbet başlatır', 'En gergini odur'] },
  { id: 60, text: 'Birine kızınca ne yaparım?', textGuess: '{name} birine kızınca ne yapar?', options: ['Yüzüne söyler', 'Küser, konuşmaz', 'Arkasından söylenir', 'Unutup gider'] },
  { id: 61, text: 'Sürpriz sever miyim?', textGuess: '{name} sürpriz sever mi?', options: ['Bayılır', 'Nefret eder', 'İyi olursa', 'Kontrolü sever'] },
  { id: 62, text: 'İşi son ana bırakır mıyım?', textGuess: '{name} işi son ana bırakır mı?', options: ['Hep son gece', 'Erkenden biter', 'Panikle yapar', 'Hiç yapmaz zaten'] },
  { id: 63, text: 'Biri bana yalan söyleyince?', textGuess: '{name} yalanı anlar mı?', options: ['Anında anlar', 'Kolayca kanar', 'Belli etmez, bilir', 'Umursamaz'] },
  { id: 64, text: 'En sevdiğim "yalnız" aktivitem?', textGuess: '{name} yalnızken en sevdiği ne?', options: ['Müzikle takılmak', 'Dizi/film', 'Yürüyüş', 'Hiçbir şey yapmamak'] },
  { id: 65, text: 'Telefonum %1 şarjdayken?', textGuess: '{name} telefonu %1 şarjdayken ne yapar?', options: ['Panik, priz arar', 'Umursamaz', 'Kapanana dek kullanır', 'Zaten hep şarjda'] },
  { id: 66, text: 'Yeni bir yere gidince ilk ne yaparım?', textGuess: '{name} yeni bir yere gidince ilk ne yapar?', options: ['Tuvaleti bulur', 'Fotoğraf çeker', 'Menüyü inceler', 'Çıkışı kontrol eder'] },
  { id: 67, text: 'Sabah mı gece mi daha verimliyim?', textGuess: '{name} sabah mı gece mi verimlidir?', options: ['Sabah kuşu', 'Gece baykuşu', 'Öğlen uyanır', 'Hiçbir zaman'] },
  { id: 68, text: 'Bir şeye çok gülünce nasıl gülerim?', textGuess: '{name} çok gülünce nasıl güler?', options: ['Sessiz, nefessiz kalır', 'Kahkaha patlatır', 'Ağlayana kadar', 'Masaya vurur'] },
  // Ek evrensel havuz — ikilemli / komik şıklar
  { id: 69, text: 'Son 10 lira olsa ne yaparım?', textGuess: "{name}'in son 10 lirası olsa ne yapar?", options: ['Kahve alır', 'Atıştırmalık', 'Biriktirir', 'Birine harcar'] },
  { id: 70, text: 'Bir düğmeye bassam hayatım değişse, basar mıyım?', textGuess: '{name} hayatını değiştiren düğmeye basar mı?', options: ['Gözü kapalı basar', 'Asla basmaz', 'Uzun düşünür', 'Önce başkasını dener'] },
  { id: 71, text: 'Ünlü olmak mı, görünmez zengin olmak mı?', textGuess: '{name}: ünlü mü, görünmez zengin mi?', options: ['Ünlü olmak', 'Görünmez zengin', 'İkisi de olmaz', 'Şöhret zaten var (!)'] },
  { id: 72, text: 'Zamanda geri gitsem kendime ne derdim?', textGuess: '{name} geçmişe gitse kendine ne der?', options: ['"O mesajı atma"', '"O parayı harcama"', '"Ona güvenme"', '"Aynısını yap"'] },
  { id: 73, text: 'Bir ada, tek eşya: ne götürürüm?', textGuess: '{name} ıssız adaya tek ne götürür?', options: ['Telefon (şarjsız)', 'Yastık', 'Kitap', 'Atıştırmalık'] },
  { id: 74, text: 'İçimden bir ses "yapma" derken yapar mıyım?', textGuess: '{name} "yapma" diyen sesi dinler mi?', options: ['Asla dinlemez', 'Hep dinler', 'Sonra pişman olur', 'Ses yok ki zaten'] },
  { id: 75, text: 'Bedava bufede stratejim ne?', textGuess: '{name} açık büfede nasıldır?', options: ['Tabağı kule yapar', 'Az al, çok tur', 'Tatlıdan başlar', 'Utanır, az alır'] },
  { id: 76, text: 'Kavga izlerken kimin tarafını tutarım?', textGuess: '{name} kavgada kimin tarafını tutar?', options: ['Haklının', 'Zayıfın', 'Kimsenin, kaçar', 'Popcorn ile izler'] },
  { id: 77, text: 'Piyango çıksa kime ilk söylerim?', textGuess: '{name} piyango çıksa ilk kime söyler?', options: ['Anneye', 'En yakın arkadaşa', 'Kimseye', 'Sosyal medyaya'] },
  { id: 78, text: 'Herkes bir şeye gülüyor, ben anlamadım: ne yaparım?', textGuess: '{name} espriyi anlamayınca ne yapar?', options: ['Yine de güler', '"Anlamadım" der', 'Google\'lar', 'Kafa sallar'] },
  { id: 79, text: 'Yeni bir şey denemek mi, garantiyi seçmek mi?', textGuess: '{name}: yeni şey mi, garanti mi?', options: ['Hep yeni dener', 'Hep aynısını alır', 'Menüde 10 dk düşünür', 'Başkasınınkini tadar'] },
  { id: 80, text: 'Telefonum çalınca "kim bu ya" der miyim?', textGuess: '{name} telefonu çalınca ne yapar?', options: ['Reddeder', 'Korkar, açmaz', 'Hemen açar', 'Sonra bakarım der'] },
  { id: 81, text: 'Bir yalan söylesem yüzüm ne yapar?', textGuess: '{name} yalan söylerken yüzü ne yapar?', options: ['Kızarır', 'Sırıtır', 'Hiç bozulmaz', 'Gözünü kaçırır'] },
  { id: 82, text: 'Alışverişte "son bir şey" der miyim?', textGuess: '{name} alışverişte durabilir mi?', options: ['"Son bir şey" x10', 'Listeye sadık', 'Hepsini alır', 'Sepeti bırakır kaçar'] },
  { id: 83, text: 'Sabah ilk baktığım şey ne?', textGuess: '{name} sabah ilk neye bakar?', options: ['Telefon', 'Saat', 'Tavan (düşünür)', 'Gözünü açamaz'] },
  { id: 84, text: 'Biri bana "değişmişsin" dese ne hissederim?', textGuess: '{name}\'e "değişmişsin" deseler ne hisseder?', options: ['Gururlanır', 'Alınır', 'Umursamaz', '"İyi yönde mi?" sorar'] },
  { id: 85, text: 'Kuyruğa biri kaynak yapınca ne yaparım?', textGuess: '{name} kuyruğa kaynak yapılınca ne yapar?', options: ['Sessizce kızar', 'Laf sokar', 'Umursamaz', 'Kendisi de kaynatır'] },
  { id: 86, text: 'Kendime söz verip tutmadığım şey?', textGuess: '{name} kendine verip tutmadığı söz?', options: ['Erken yatmak', 'Spor yapmak', 'Az harcamak', 'Telefonu bırakmak'] },
  { id: 87, text: 'Bir süperkahraman olsam kötü mü iyi mi olurdum?', textGuess: '{name} süper güçle iyi mi kötü mü olurdu?', options: ['Kahraman', 'Kötü adam', 'İkisi arası', 'Gücü satardı'] },
  { id: 88, text: 'Restoranda garson "afiyet olsun" deyince ne derim?', textGuess: '{name} "afiyet olsun"a ne der?', options: ['"Siz de" (yanlışlıkla)', '"Teşekkürler"', 'Kafa sallar', 'Duymaz'] },
  // --- ZOR sorular: yakın biri bile ancak gerçekten tanıyorsa bilir.
  // Şıklar bilerek EŞİT derecede olası; tahmin ~%25'te kalsın diye.
  { id: 89, text: 'Çocukken en çok neyi yapmaktan çekinirdim?', textGuess: '{name} çocukken en çok neyden çekinirdi?', options: ['Telefonla konuşmak', 'Sınıfta okumak', 'Yabancıya soru sormak', 'Yalnız uyumak'] },
  { id: 90, text: 'Kimsenin bilmediği, beni asıl sinir eden şey?', textGuess: '{name}\'i asıl sinir eden, kimsenin bilmediği şey?', options: ['Sesli çiğnemek', 'Sözünün kesilmesi', 'Geç kalınması', 'Islak bırakılan lavabo'] },
  { id: 91, text: 'Hangi övgü beni gerçekten mutlu eder?', textGuess: '{name} hangi övgüye gerçekten sevinir?', options: ['"Çok komiksin"', '"Çok akıllısın"', '"Çok iyi kalplisin"', '"Çok iyi görünüyorsun"'] },
  { id: 92, text: 'Yalnızken en sık yaptığım tuhaf şey?', textGuess: '{name} yalnızken en sık ne yapar?', options: ['Kendi kendine konuşur', 'Hayali tartışma yapar', 'Dans eder', 'Yüksek sesle şarkı söyler'] },
  { id: 93, text: 'Çocukken hayalimdeki meslek neydi?', textGuess: '{name} çocukken ne olmak isterdi?', options: ['Öğretmen', 'Doktor', 'Şarkıcı / oyuncu', 'Polis / asker'] },
  { id: 94, text: 'En son ne zaman ağladım?', textGuess: '{name} en son ne zaman ağladı?', options: ['Bu hafta', 'Bu ay', 'Aylar önce', 'Hatırlamıyor bile'] },
  { id: 95, text: 'Hangi konuda kimseye danışmam?', textGuess: '{name} hangi konuda kimseye danışmaz?', options: ['Para', 'İlişkiler', 'Sağlık', 'Gelecek planları'] },
  { id: 96, text: 'Gece uyumadan önce aklımdan geçen son şey?', textGuess: '{name} uyumadan önce en son ne düşünür?', options: ['Yarın yapacakları', 'Bugün söylediği bir şey', 'Sevdiği biri', 'Hiçbir şey, anında uyur'] },
  // --- KÜLTÜRE ÖZEL (yalnızca kendi dilinde seçilir, ama her dilde çözülebilir)
  { id: 97, only: 'tr', text: 'Nazara inanır mıyım?', textGuess: '{name} nazara inanır mı?', options: ['Kesinlikle inanır', 'İnanmam ama nazarlık takarım', 'Şaka gibi gelir', 'Hiç düşünmedim'] },
  { id: 98, only: 'tr', text: 'Kapı çalınca ilk ne yaparım?', textGuess: '{name} kapı çalınca ilk ne yapar?', options: ['Çay koyar', 'Ortalığı toplar', 'Panikler', 'Açmıyormuş gibi yapar'] },
  { id: 99, only: 'tr', text: 'Kahvaltıda olmazsa olmazım?', textGuess: "{name}'in kahvaltıda olmazsa olmazı?", options: ['Çay', 'Peynir-zeytin', 'Simit', 'Kahvaltı yapmaz'] },
  { id: 900, only: 'en', text: 'Sabah kahvem nasıl olur?', textGuess: '{name} kahvesini nasıl içer?', options: ['Sade', 'Sütlü/latte', 'Buzlu (kışın bile)', 'Kahve içmez'] },
  { id: 901, only: 'en', text: 'Biri "nasılsın?" deyince ne derim?', textGuess: '{name} "nasılsın?"a ne der?', options: ['"İyiyim, sen?" (otomatik)', 'Gerçekten anlatır', 'Sadece "selam"', 'Kime göre değişir'] },
  { id: 902, only: 'en', text: 'Burcumu önemser miyim?', textGuess: '{name} burcunu önemser mi?', options: ['Kendininkini de seninkini de bilir', 'Sadece kendininkini', 'Saçmalık bulur', 'Burcunu bilmiyor bile'] },
];

// --- Kategoriye özel havuzlar ---
const SPECIFIC_TR: Record<CategoryId, Question[]> = {
  sevgili: [
    { id: 101, text: 'Benim için ideal bir randevu nedir?', textGuess: '{name} için ideal randevu ne?', options: ['Güzel bir yemek', 'Evde film gecesi', 'Doğada yürüyüş', 'Sürpriz bir gezi'] },
    { id: 102, text: 'Sevgi dilim hangisi?', textGuess: '{name} sevgisini en çok nasıl gösterir?', options: ['Sarılmak / dokunmak', 'Güzel sözler', 'Hediye almak', 'Vakit ayırmak'] },
    { id: 103, text: 'İlişkide en çok neye kızarım?', textGuess: '{name} ilişkide en çok neye kızar?', options: ['İlgisizlik', 'Yalan', 'Geç kalmak', 'Telefonla oynamak'] },
    { id: 104, text: 'Küstüğümde beni ne yumuşatır?', textGuess: '{name} küskünken onu ne yumuşatır?', options: ['Sarılmak', 'Özür + tatlı', 'Komik mesaj', 'Biraz zaman'] },
    { id: 105, text: 'Bana en çok hangi sürpriz mutlu eder?', textGuess: "{name}'i en çok hangi sürpriz mutlu eder?", options: ['Çiçek', 'Sevdiği yemek', 'Küçük bir hediye', 'Plansız buluşma'] },
    { id: 106, text: 'İlk tanıştığımızda beni en çok ne etkiledi?', textGuess: '{name} ilk tanışmada en çok neyden etkilenir?', options: ['Gülüşü', 'Sohbeti', 'Gözleri', 'Kendine güveni'] },
    { id: 107, text: 'Bana bakınca ilk fark edilen şey?', textGuess: "{name}'e bakınca ilk fark edilen şey?", options: ['Gözleri', 'Gülüşü', 'Saçı', 'Tarzı'] },
    { id: 108, text: 'Tartışınca ilk adımı kim atar?', textGuess: '{name} ile tartışınca ilk adımı kim atar?', options: ['Ben', 'O', 'Kim haksızsa', 'Kimse, barışıveririz'] },
    { id: 109, text: 'Benim en romantik yanım?', textGuess: "{name}'in en romantik yanı?", options: ['Sürpriz yapması', 'Notlar/mesajlar', 'Sarılması', 'Dinlemesi'] },
    { id: 110, text: 'Hayalimdeki ortak plan?', textGuess: "{name}'in hayalindeki ortak plan?", options: ['Birlikte seyahat', 'Ev kurmak', 'Evcil hayvan', 'Sadece huzur'] },
    { id: 111, text: 'Beni en çok ne güldürür?', textGuess: "{name}'i en çok ne güldürür?", options: ['Saçma esprileri', 'Komik videolar', 'Kendi sakarlığı', 'Arkadaş muhabbeti'] },
    { id: 112, text: 'İlişkide olmazsa olmazım?', textGuess: '{name} için ilişkide olmazsa olmaz?', options: ['Güven', 'İlgi', 'Mizah', 'Sadakat'] },
    { id: 113, text: 'Kavgadan sonra nasıl barışırım?', textGuess: '{name} kavgadan sonra nasıl barışır?', options: ['İlk özür diler', 'Sarılır', 'Espriyle', 'Küser, bekler'] },
    { id: 114, text: 'Sevgilime nasıl seslenirim?', textGuess: '{name} sevgilisine nasıl seslenir?', options: ['Aşkım', 'Bir lakapla', 'Adıyla', 'Bebeğim'] },
    { id: 115, text: 'Yıldönümümüzü hatırlar mıyım?', textGuess: '{name} yıldönümünü hatırlar mı?', options: ['Asla unutmam', 'Genelde unuturum', 'Not alırım', 'O hatırlatır'] },
    { id: 116, text: 'İlişkideki en büyük korkum?', textGuess: "{name}'in ilişkideki en büyük korkusu?", options: ['Aldatılmak', 'Terk edilmek', 'İlgisizlik', 'Rutine düşmek'] },
    { id: 117, text: 'İdeal cumartesi gecemiz?', textGuess: "{name} için ideal cumartesi gecesi?", options: ['Dışarı, kalabalık', 'Evde film', 'Yemeğe çıkmak', 'Gezmek'] },
    { id: 118, text: 'Beni en çok ne kıskandırır?', textGuess: "{name}'i en çok ne kıskandırır?", options: ['Eski ilişkiler', 'Yakın arkadaşlar', 'Telefon', 'Hiçbir şey, güvenir'] },
    { id: 119, text: 'Küsünce mesajıma kaç dakikada döner?', textGuess: '{name} küsünce mesaja ne kadar sonra döner?', options: ['Saniyede', 'Yarım saat surat', 'Ertesi gün', 'Önce story atar'] },
    { id: 120, text: '"Bir şey yok" dediğimde gerçekten yok mu?', textGuess: '{name} "bir şey yok" dediğinde gerçekten yok mu?', options: ['Kesin bir şey var', 'Gerçekten yok', 'Az sonra dökülür', 'Test ediyordur'] },
    { id: 121, text: 'Ortak fotoğrafı kim daha çok paylaşır?', textGuess: '{name} mı, sevgilisi mi ortak fotoğrafı paylaşır?', options: ['Ben', 'O', 'İkimiz de', 'Gizli ilişki gibiyiz'] },
    { id: 122, text: 'Film seçerken kaç dakika tartışırız?', textGuess: '{name} ile film seçmek ne kadar sürer?', options: ['5 dakika', 'Yarım saat', 'Film bitecek kadar', 'Hep o seçer'] },
    { id: 123, text: 'Bana sarıldığında ne yaparım?', textGuess: '{name} sarılınca ne yapar?', options: ['Bırakmak istemez', 'Gıdıklanır kaçar', 'Eriyip gider', '"Sıcak oldu" der'] },
    { id: 124, text: '"Nereye gidelim?" sorusuna cevabım?', textGuess: '{name} "nereye gidelim?"e ne der?', options: ['"Fark etmez" (fark eder)', 'Nete sabittir', 'Hemen yer bulur', '"Sen seç" der'] },
    { id: 125, text: 'Yeni sevgili şüphesinde ilk bakacağı yer?', textGuess: '{name} kıskanınca ilk nereye bakar?', options: ['Son görülme', 'Beğeniler', 'Takip edilenler', 'Hiç bakmaz, güvenir'] },
    { id: 126, text: 'Kavgada "haklısın" der miyim?', textGuess: '{name} kavgada "haklısın" der mi?', options: ['Asla', 'Barışmak için der', 'Gerçekten kabul eder', 'Susarak kabul eder'] },
    { id: 127, text: 'Gece "iyi geceler"den sonra kaç saat konuşuruz?', textGuess: '{name} "iyi geceler" dedikten sonra ne kadar konuşur?', options: ['Hemen uyur', '1 saat daha', 'Sabaha kadar', 'Uyuyakalır telefon açık'] },
    { id: 128, text: 'Bana kızgınken bile yapamadığı şey?', textGuess: '{name} kızgınken bile yapamadığı şey?', options: ['Emojisiz mesaj', 'İyi geceler dememek', 'Gerçekten küsmek', 'Umursamamak'] },
    { id: 129, text: 'Sürpriz mi yaparım, plan mı yapmayı severim?', textGuess: '{name} sürpriz mi yapar, plan mı sever?', options: ['Sürpriz canavarı', 'Her şey planlı', 'Sürprizi berbat eder', 'Sürprizi kendine yapar'] },
    { id: 130, text: 'İlişkide ilk kim özür diler?', textGuess: '{name} ile ilişkide ilk kim özür diler?', options: ['Hep ben', 'Hep o', 'Haksız olan', 'Kimse, konu kapanır'] },
    // --- ZOR
    { id: 131, text: 'Kavgadan sonra aslında ne duymak isterim?', textGuess: '{name} kavgadan sonra aslında ne duymak ister?', options: ['"Haklısın"', '"Seni anlıyorum"', '"Özür dilerim"', '"Seni seviyorum"'] },
    { id: 132, text: 'İlişkide en çok korktuğum ama söylemediğim şey?', textGuess: '{name}\'in ilişkide söylemediği korkusu?', options: ['Sıradanlaşmak', 'Yeterince sevilmemek', 'Aldatılmak', 'Yalnız kalmak'] },
    { id: 133, text: 'Yapılan hangi küçük şey kalbimi eritir?', textGuess: '{name}\'in kalbini hangi küçük şey eritir?', options: ['Saçını okşamak', 'Sabah mesajı', 'Sevdiği şeyi hatırlamak', 'Sadece dinlemek'] },
    { id: 134, text: 'Beni en çok hangi hâlimle sevmesini isterim?', textGuess: '{name} hangi hâliyle sevilmek ister?', options: ['Yeni uyanmış hâliyle', 'Süslenmişken', 'Çalışırken', 'Gülerken'] },
    // --- KÜLTÜRE ÖZEL
    { id: 135, only: 'tr', text: 'Sevgilimi aileme ne zaman tanıştırırım?', textGuess: '{name} sevgilisini ailesiyle ne zaman tanıştırır?', options: ['İlk aylarda', 'Ciddileşince', 'Evlilik konuşulunca', 'Mümkünse hiç'] },
    { id: 136, only: 'tr', text: 'Ondan bahsederken ne derim?', textGuess: '{name} sevgilisinden bahsederken ne der?', options: ['"Sevgilim"', 'Adıyla', 'Duruma göre değişir', 'Hiç bahsetmez'] },
    { id: 137, only: 'en', text: '"Seni seviyorum"u her gün söyler miyiz?', textGuess: '{name} her gün "seni seviyorum" der mi?', options: ['Her gün', 'Sadece anlamlı anlarda', 'Nadiren yüksek sesle', 'Yazışmada daha çok'] },
    { id: 138, only: 'en', text: 'Nasıl flört ederim?', textGuess: '{name} nasıl flört eder?', options: ['İltifat ederek', 'Takılarak', 'Aşırı ilgi göstererek', 'Berbat şekilde'] },
  ],
  anne: [
    { id: 201, text: 'Annemden en çok gizlediğim şey?', textGuess: "{name}'in annesinden en çok gizlediği?", options: ['Harcadığı para', 'İlişkileri', 'Notları / işi', 'Nereye gittiği'] },
    { id: 202, text: 'Çocukken en sevmediğim yemek?', textGuess: '{name} çocukken en çok hangi yemeği sevmezdi?', options: ['Ispanak', 'Balık', 'Ciğer', 'Kabak'] },
    { id: 203, text: 'Evde en çok hangi işten kaçarım?', textGuess: '{name} evde en çok hangi işten kaçar?', options: ['Bulaşık', 'Çöp atmak', 'Oda toplamak', 'Alışveriş'] },
    { id: 204, text: 'Moralim bozukken beni ne iyi eder?', textGuess: '{name} morali bozukken onu ne iyi eder?', options: ['Annesinin yemeği', 'Uyumak', 'Dışarı çıkmak', 'Tatlı yemek'] },
    { id: 205, text: 'Küçükken en çok neyden korkardım?', textGuess: '{name} küçükken en çok neyden korkardı?', options: ['Karanlık', 'Köpek', 'Doktor / iğne', 'Yalnız kalmak'] },
    { id: 206, text: 'En kötü huyum (anneme göre)?', textGuess: "{name}'in annesine göre en kötü huyu?", options: ['Tembellik', 'İnatçılık', 'Dağınıklık', 'Geç yatmak'] },
    { id: 207, text: 'Annem beni hangi meslekte hayal ederdi?', textGuess: "{name}'i annesi hangi meslekte hayal ederdi?", options: ['Doktor', 'Öğretmen', 'Mühendis', 'Memur'] },
    { id: 208, text: 'Sabah beni uyandırmak nasıldır?', textGuess: "{name}'i sabah uyandırmak nasıldır?", options: ['İmkânsız', 'Bir seferde kalkar', 'Somurtur', '5 dakika daha der'] },
    { id: 209, text: 'Anneme en çok ne için yalan söylerim?', textGuess: '{name} annesine en çok ne için yalan söyler?', options: ['Nerede olduğu', 'Yemek yiyip yemediği', 'Para', 'Uyku saati'] },
    { id: 210, text: 'Hasta olunca nasıl biri olurum?', textGuess: '{name} hasta olunca nasıl olur?', options: ['Mızmızlanır', 'Kimseye söylemez', 'Anne ister', 'Diken üstünde'] },
    { id: 211, text: 'Annemle en çok ne konuda tartışırız?', textGuess: '{name} annesiyle en çok ne konuda tartışır?', options: ['Telefon', 'Uyku', 'Kıyafet', 'Arkadaşlar'] },
    { id: 212, text: 'Annemin bende en beğendiği yanı?', textGuess: "{name}'in annesinin onda en beğendiği yanı?", options: ['Kalbi', 'Zekâsı', 'Çalışkanlığı', 'Esprileri'] },
    { id: 213, text: 'Annemin bana en çok söylediği söz?', textGuess: "{name}'in annesi ona en çok ne der?", options: ['"Üşütürsün"', '"Yemek yedin mi?"', '"Dikkatli ol"', '"Ne zaman evleneceksin?"'] },
    { id: 214, text: 'Odam ne durumdadır?', textGuess: "{name}'in odası ne durumdadır?", options: ['Tertemiz', 'Savaş alanı', 'İdare eder', 'Kapı kapalı, görünmez'] },
    { id: 215, text: 'Eve geç kalınca ne yaparım?', textGuess: '{name} eve geç kalınca ne yapar?', options: ['Haber verir', 'Sessizce girer', 'Bahane bulur', 'Hiç geç kalmaz'] },
    { id: 216, text: 'Annemle en çok neyi paylaşırım?', textGuess: '{name} annesiyle en çok neyi paylaşır?', options: ['Her şeyi', 'Neredeyse hiçbir şey', 'Sadece iyi haberleri', 'Dedikoduları'] },
    { id: 217, text: 'Çocukken annem beni neyle kandırırdı?', textGuess: '{name} çocukken annesi onu neyle kandırırdı?', options: ['Dondurma', 'Oyuncak', 'Çizgi film', 'Dede / nine'] },
    { id: 218, text: 'Annem telefonuma baksa ne der?', textGuess: "{name}'in annesi telefonuna baksa ne der?", options: ['"Bu kim?"', '"Ne kadar mesaj var"', 'Bir şey anlamaz', '"Hiç ders yok mu?"'] },
    { id: 219, text: 'Annem beni kaç kez seslenince duyarım?', textGuess: "{name}'i annesi kaç kez seslenince duyar?", options: ['İlk seferde', 'Bağırınca', 'Tam adı+soyadı', 'Hiç duymaz'] },
    { id: 220, text: 'Annem "hemen geliyorum" dese kaç dakika sürer?', textGuess: "{name}'in annesi 'geliyorum' dese ne kadar sürer?", options: ['5 dakika', 'Yarım saat', '"Bir dakika" x100', 'Unutur'] },
    { id: 221, text: 'Eve girince annemin ilk sorusu?', textGuess: "{name} eve girince annesinin ilk sorusu?", options: ['"Acıktın mı?"', '"Neredeydin?"', '"Üşüdün mü?"', '"Telefonu bırak"'] },
    { id: 222, text: 'Annem hangi konuda asla ikna olmaz?', textGuess: "{name}'in annesi neyde asla ikna olmaz?", options: ['Terlik giymek', 'Erken yatmak', 'Fazla yemek', 'Kışın mont'] },
    { id: 223, text: 'Annemin telefon zil sesi ne?', textGuess: "{name}'in annesinin zil sesi ne türden?", options: ['Klasik zil', 'Full ses türkü', 'Titreşim (duymaz)', 'Torununun sesi'] },
    { id: 224, text: 'Annem misafir gelince ne yapar?', textGuess: "{name}'in annesi misafir gelince ne yapar?", options: ['Sofra kurar', 'Evi baştan temizler', '"Hiçbir şey yapmadım" (yapmış)', 'Beni çağırır'] },
    { id: 225, text: 'Anneme bir şey anlatınca tepkisi?', textGuess: "{name} annesine bir şey anlatınca tepkisi?", options: ['Tüm mahalleye yayar', 'Merak etmeye başlar', 'Zaten biliyordur', '"Aman dikkat et"'] },
    { id: 226, text: 'Annem yemekte "az koydum" der mi?', textGuess: "{name}'in annesi 'az koydum' der mi?", options: ['Tabağı doldurur', '3 kez daha koyar', '"Bitmeden kalkma"', 'Paket de hazırlar'] },
    { id: 227, text: 'Annem bana en çok hangi lakabı takar?', textGuess: "{name}'e annesi hangi lakabı takar?", options: ['Bebeğim', 'Koca adam/kız', 'Adının kısası', 'Kızınca tam adı'] },
    { id: 228, text: 'Annem bir eşyamı "attım" dese?', textGuess: "{name}'in annesi eşyasını atınca ne olur?", options: ['Kıyamet kopar', '"İyi ki attın"', 'Fark etmez', 'Gizlice geri alır'] },
    { id: 229, text: 'Hastalanınca annem ne yapar?', textGuess: "{name} hastalanınca annesi ne yapar?", options: ['Çorba + limon', 'Panik doktor', '"Geçmiş olsun" mesafe', 'Bütün ilaçları getirir'] },
    { id: 230, text: 'Annemle alışverişe çıkınca ne olur?', textGuess: "{name} annesiyle alışverişte ne olur?", options: ['Saatlerce sürer', 'Her şeyi pahalı bulur', 'Bana da alır', '"Bakıyoruz sadece" (alır)'] },
    // --- ZOR
    { id: 231, text: 'Anneme söyleyemediğim şey ne?', textGuess: '{name} annesine ne söyleyemiyor?', options: ['Yorulduğunu', 'Onu özlediğini', 'Bir hatasını', 'Gerçekten ne istediğini'] },
    { id: 232, text: 'Annemin söylediği, hâlâ aklımda olan cümle?', textGuess: '{name}\'in aklında annesinin hangi cümlesi kaldı?', options: ['"Sen yaparsın"', '"Dikkatli ol"', '"Ben hep buradayım"', '"Bir gün anlarsın"'] },
    { id: 233, text: 'Çocukken annemden en çok ne beklerdim?', textGuess: '{name} çocukken annesinden en çok ne beklerdi?', options: ['Onu dinlemesini', 'Sarılmasını', 'İzin vermesini', 'Övmesini'] },
    { id: 234, text: 'Annem olmasa en çok neyi özlerdim?', textGuess: '{name} annesinin en çok neyini özlerdi?', options: ['Sesini', 'Yemeğini', 'Merak etmesini', 'Dokunuşunu'] },
    // --- KÜLTÜRE ÖZEL
    { id: 235, only: 'tr', text: 'Annem misafire ne ikram eder?', textGuess: "{name}'in annesi misafire ne ikram eder?", options: ['Çay ve kurabiye', 'Kahve', 'Meyve tabağı', 'Koca bir sofra'] },
    { id: 236, only: 'tr', text: 'Annem beni komşuya nasıl anlatır?', textGuess: "{name}'i annesi komşuya nasıl anlatır?", options: ['Övgüyle', 'Şikayetle', 'Abartarak', 'Hiç bahsetmez'] },
    { id: 237, only: 'en', text: 'Annem emoji kullanır mı?', textGuess: "{name}'in annesi emoji kullanır mı?", options: ['Aşırı çok', 'Sadece kalp', 'Hiç', 'Hep yanlışını'] },
    { id: 238, only: 'en', text: 'Annem kararlarıma ne tepki verir?', textGuess: "{name}'in annesi kararlarına nasıl tepki verir?", options: ['Tamamen destekler', 'Endişelenir ama susar', 'Yüzüne söyler', 'Herkese anlatır'] },
  ],
  baba: [
    { id: 301, text: 'Babamla en çok ne yapmaktan hoşlanırım?', textGuess: '{name} babasıyla en çok ne yapmaktan hoşlanır?', options: ['Maç izlemek', 'Araba / gezi', 'Sohbet etmek', 'Yemek yemek'] },
    { id: 302, text: 'Babamdan en çok ne isterim?', textGuess: '{name} babasından en çok ne ister?', options: ['Harçlık', 'İzin', 'Destek / güven', 'Vakit'] },
    { id: 303, text: 'Babama en çok hangi konuda benzerim?', textGuess: '{name} babasına en çok neyde benzer?', options: ['İnatçılık', 'Espri anlayışı', 'Sakinlik', 'Çalışkanlık'] },
    { id: 304, text: 'Babam beni hangi meslekte hayal ederdi?', textGuess: "{name}'i babası hangi meslekte hayal ederdi?", options: ['Doktor', 'Mühendis', 'Memur', 'Kendi işi'] },
    { id: 305, text: 'Bir şey isteyeceğimde babama nasıl yaklaşırım?', textGuess: '{name} bir şey isteyeceğinde babasına nasıl yaklaşır?', options: ['Direkt söyler', 'Önce annesine', 'İyi bir zaman kollar', 'Mesaj atar'] },
    { id: 306, text: 'Babamın bana en çok söylediği laf?', textGuess: "{name}'in babası ona en çok ne der?", options: ['"Dikkatli ol"', '"Para biriktir"', '"Erken yat"', '"Adam ol"'] },
    { id: 307, text: 'Babamla aramdaki en büyük fark?', textGuess: '{name} ile babası arasındaki en büyük fark?', options: ['Teknoloji', 'Müzik zevki', 'Uyku düzeni', 'Sabır'] },
    { id: 308, text: 'Babam beni en çok ne yaparken görünce gurur duyar?', textGuess: '{name} ne yaparken babası gurur duyar?', options: ['Çalışırken', 'Yardım ederken', 'Başarınca', 'Kendi ayakları üstünde durunca'] },
    { id: 309, text: 'Babamın en sevdiği pazar keyfi?', textGuess: "{name}'in babasının en sevdiği pazar keyfi?", options: ['Kahvaltı', 'Maç', 'Uyku', 'Gezmek'] },
    { id: 310, text: 'Babam telefonu nasıl kullanır?', textGuess: "{name}'in babası telefonu nasıl kullanır?", options: ['Zar zor', 'Sürekli arar', 'Sadece WhatsApp', 'Gayet iyi'] },
    { id: 311, text: 'Babama bir hediye alsam ne olurdu?', textGuess: "{name} babasına ne hediye alır?", options: ['Parfüm', 'Saat', 'Cüzdan', 'Teknoloji'] },
    { id: 312, text: 'Babamla en çok neyi tartışırız?', textGuess: '{name} babasıyla en çok neyi tartışır?', options: ['Siyaset', 'Harcamalar', 'Gelecek planları', 'Hiç tartışmayız'] },
    { id: 313, text: 'Babama içimi döker miyim?', textGuess: '{name} babasına içini döker mi?', options: ['Her şeyi anlatır', 'Hiç konuşmazlar', 'Sadece ciddi konular', 'Anne aracılığıyla'] },
    { id: 314, text: 'Babamın en çok kızdığı şey?', textGuess: "{name}'in babasının en çok kızdığı şey?", options: ['Saygısızlık', 'İsraf', 'Tembellik', 'Yalan'] },
    { id: 315, text: 'Babam beni över mi?', textGuess: '{name}\'i babası över mi?', options: ['Sık sık', 'Nadiren', 'Sözle söylemez', 'Başkalarına övermiş'] },
    { id: 316, text: 'Babamla ortak zevkimiz?', textGuess: "{name} ile babasının ortak zevki?", options: ['Takım / futbol', 'Müzik', 'Yemek', 'Yok, hiç benzemeyiz'] },
    { id: 317, text: 'Babam para konusunda nasıldır?', textGuess: "{name}'in babası para konusunda nasıldır?", options: ['Cömert', 'Hesaplı', 'Duruma göre', 'Hiç konuşmaz'] },
    { id: 318, text: 'Babamla mesajlaşmamız nasıldır?', textGuess: '{name} babasıyla nasıl mesajlaşır?', options: ['Sadece "geliyor musun?"', 'Tamam / ok', 'Sesli arar, yazmaz', 'Uzun uzun yazışırız'] },
    { id: 319, text: 'Babam TV kumandasını kime verir?', textGuess: "{name}'in babası kumandayı verir mi?", options: ['Asla vermez', 'Uyuyunca kaparız', 'Verir ama uyur', 'Kumanda onun tahtı'] },
    { id: 320, text: 'Babam bir şey tamir edince sonuç?', textGuess: "{name}'in babası bir şeyi tamir edince ne olur?", options: ['Daha çok bozulur', 'Mükemmel olur', '"Sonra bakarım" (bakmaz)', 'Yeni alırız'] },
    { id: 321, text: 'Babam arabada nasıl sürücüdür?', textGuess: "{name}'in babası nasıl sürücüdür?", options: ['Herkese kızar', 'Sakin abi', 'Navigasyona güvenmez', 'Kısa yol uzmanı (uzun çıkar)'] },
    { id: 322, text: 'Babam "param yok" derken cüzdanında?', textGuess: "{name}'in babası 'param yok' derken?", options: ['Aslında vardır', 'Gerçekten yoktur', 'Anneye sorar', '"Ne alacaktın?"'] },
    { id: 323, text: 'Babam hangi konuda uzman kesilir?', textGuess: "{name}'in babası neyde uzman kesilir?", options: ['Siyaset', 'Futbol', 'Trafik', 'Her şey'] },
    { id: 324, text: 'Babam sabah kaçta kalkar?', textGuess: "{name}'in babası sabah kaçta kalkar?", options: ['Horoz gibi erken', 'Hafta sonu bile erken', 'Öğlene kadar', 'Duruma göre'] },
    { id: 325, text: 'Babama "seni seviyorum" desem?', textGuess: "{name} babasına 'seni seviyorum' dese?", options: ['"Ne istiyorsun?"', 'Utanır güler', '"Ben de oğlum/kızım"', 'Şaşkına döner'] },
    { id: 326, text: 'Babam markete gidince ne alır?', textGuess: "{name}'in babası markete gidince ne alır?", options: ['Listede olmayan 10 şey', 'Sadece isteneni', 'Hep aynı şeyleri', 'Eli boş döner'] },
    { id: 327, text: 'Babam telefonda neden bağırarak konuşur?', textGuess: "{name}'in babası telefonda neden bağırır?", options: ['"Duymuyor" sanır', 'Herkes duysun', 'Hoparlör hep açık', 'Bağırmaz aslında'] },
    { id: 328, text: 'Babamla ortak sessizliğimiz nasıldır?', textGuess: '{name} ile babasının sessizliği nasıldır?', options: ['Rahat, huzurlu', 'Garip', 'Maç varsa sorun yok', 'TV doldurur'] },
    { id: 329, text: 'Babam bir şeye kızınca nasıl belli olur?', textGuess: "{name}'in babası kızınca nasıl belli olur?", options: ['Sessizleşir', 'Kaşları çatılır', 'Gazeteyi sertçe açar', 'Annem araya girer'] },
    { id: 330, text: 'Babam en çok hangi cümleyi kurar?', textGuess: "{name}'in babası en çok hangi cümleyi kurar?", options: ['"Benim zamanımda..."', '"Işıkları kapat"', '"Kaç para?"', '"Erken yat"'] },
    // --- ZOR
    { id: 331, text: 'Babamdan duymayı en çok istediğim cümle?', textGuess: '{name} babasından hangi cümleyi duymak ister?', options: ['"Seninle gurur duyuyorum"', '"Seni seviyorum"', '"Haklısın"', '"Nasılsın, gerçekten?"'] },
    { id: 332, text: 'Babamla ilgili en net çocukluk anım?', textGuess: '{name}\'in babasıyla en net çocukluk anısı?', options: ['Omzunda taşıması', 'Bir araba yolculuğu', 'Bir tartışma', 'Bir hediye'] },
    { id: 333, text: 'Babama benzemekten çekindiğim yanım?', textGuess: '{name} babasının hangi yanına benzemekten çekinir?', options: ['Öfkesi', 'Suskunluğu', 'İnadı', 'Hiçbiri, benzemek ister'] },
    { id: 334, text: 'Babamı ağlarken görsem ne yapardım?', textGuess: '{name} babasını ağlarken görse ne yapardı?', options: ['Donup kalırdı', 'Sarılırdı', 'Odadan çıkardı', 'Hiç görmedi'] },
    // --- KÜLTÜRE ÖZEL
    { id: 335, only: 'tr', text: 'Babam çayını nasıl içer?', textGuess: "{name}'in babası çayını nasıl içer?", options: ['Demli, tavşan kanı', 'Açık', 'Bol şekerli', 'Çay değil kahve'] },
    { id: 336, only: 'tr', text: 'Babam akraba isimlerini karıştırır mı?', textGuess: "{name}'in babası akraba isimlerini karıştırır mı?", options: ['Hepsini karıştırır', 'Asla', 'Bazen', 'Zaten pek tanımaz'] },
    { id: 337, only: 'en', text: 'Babam mangal/ızgara konusunda nasıl?', textGuess: "{name}'in babası mangalda nasıldır?", options: ['Ustadır', 'Her şeyi yakar', 'Hiç yaklaşmaz', 'Pişirmekten çok konuşur'] },
    { id: 338, only: 'en', text: 'Babam nasıl öğüt verir?', textGuess: "{name}'in babası nasıl öğüt verir?", options: ['Uzun hikâyelerle', 'Tek cümleyle', 'Hiç vermez', 'Link/yazı gönderir'] },
  ],
  bff: [
    { id: 401, text: 'Gece 3\'te sarhoşken kimi ararım?', textGuess: '{name} gece 3\'te kimi arar?', options: ['En yakın arkadaşını', 'Eski sevgilisini', 'Annesini', 'Kimseyi, mesaj atar'] },
    { id: 402, text: 'En utanç verici anım hangi türden?', textGuess: "{name}'in en utanç verici anı ne tür?", options: ['Düşmek / sakarlık', 'Yanlış kişiye mesaj', 'Sahnede donmak', 'Yanlış isim demek'] },
    { id: 403, text: 'Gizli zevkim (guilty pleasure) nedir?', textGuess: "{name}'in gizli zevki ne?", options: ['Trash diziler', 'Abur cubur', 'Eski şarkılar', 'Dedikodu'] },
    { id: 404, text: 'Telefon duvar kağıdımda ne var?', textGuess: "{name}'in telefon duvar kağıdında ne var?", options: ['Kendi fotoğrafı', 'Sevdiği biri', 'Manzara / sanat', 'Varsayılan'] },
    { id: 405, text: 'Beni bir kelimeyle anlatsan?', textGuess: "{name}'i bir kelimeyle anlat", options: ['Enerjik', 'Sakin', 'Komik', 'Duygusal'] },
    { id: 406, text: 'Grupta benim rolüm nedir?', textGuess: '{name} grupta hangi roldedir?', options: ['Palyaço', 'Anne/baba', 'Planlayan', 'Takılan'] },
    { id: 407, text: 'Beni en çok ne sinir eder?', textGuess: "{name}'i en çok ne sinir eder?", options: ['Geç kalınması', 'Yalan', 'İlgisizlik', 'Ukalalık'] },
    { id: 408, text: 'Sırrımı kime ilk söylerim?', textGuess: '{name} sırrını ilk kime söyler?', options: ['En yakın arkadaşına', 'Kardeşine', 'Kimseye', 'Annesine'] },
    { id: 409, text: 'Dışarı çıkınca ilk ben mi hazır olurum?', textGuess: '{name} dışarı çıkınca hazır olma hızı?', options: ['Herkesten önce', 'Herkesten sonra', 'Ortalama', 'Hiç hazır olmaz'] },
    { id: 410, text: 'En büyük hayalim ne?', textGuess: "{name}'in en büyük hayali?", options: ['Zengin olmak', 'Dünyayı gezmek', 'Ünlü olmak', 'Huzurlu bir hayat'] },
    { id: 411, text: 'Beni yataktan ne çıkarır?', textGuess: "{name}'i yataktan ne çıkarır?", options: ['Yemek', 'Para', 'Arkadaşlar', 'Hiçbir şey'] },
    { id: 412, text: 'Kavga etsek küs mü kalırım?', textGuess: '{name} ile kavga etsen küs kalır mı?', options: ['5 dakika sürer', 'Günlerce', 'Hiç küsmez', 'Önce o barışır'] },
    { id: 413, text: 'Kankamla en çok ne yaparız?', textGuess: '{name} kankasıyla en çok ne yapar?', options: ['Dertleşiriz', 'Gülmekten kırılırız', 'Plan yapıp iptal ederiz', 'Sadece takılırız'] },
    { id: 414, text: '"Yapma" diye beni en iyi kim uyarır?', textGuess: "{name}'i en iyi kim 'yapma' diye uyarır?", options: ['Kankası', 'Kimse', 'Ailesi', 'Kendi bilir'] },
    { id: 415, text: 'En yakın arkadaşımla nereden tanışırız?', textGuess: '{name} en yakın arkadaşıyla nereden tanışır?', options: ['Çocukluktan', 'Lise / üniversite', 'İş / çevre', 'İnternetten'] },
    { id: 416, text: 'Ortak sırrı kim ağzından kaçırır?', textGuess: '{name} ile ortak sırrı kim kaçırır?', options: ['Ben', 'O', 'İkimiz de tutarız', 'Zaten herkes bilir'] },
    { id: 417, text: 'Arkadaşlarım arasında lakabım ne?', textGuess: "{name}'in arkadaşları arasında lakabı ne türden?", options: ['Komik bir şey', 'İsminden bozma', 'Bir huyundan', 'Lakabı yok'] },
    { id: 418, text: 'Kankamla tarzımız?', textGuess: '{name} ile kankasının tarzı?', options: ['Aynı', 'Zıt', 'Birbirini tamamlar', 'Umursamayız'] },
    { id: 419, text: 'Kankam beni en çok hangi halimle tanır?', textGuess: '{name}\'i kankası en çok hangi haliyle tanır?', options: ['Gülme krizinde', 'Dırdır ederken', 'Aç ve sinirli', 'Aşık olunca aptallaşmış'] },
    { id: 420, text: 'Ortak planı en son kim iptal eder?', textGuess: '{name} mi kankası mı planı iptal eder?', options: ['Ben', 'O', 'İkimiz de rahatlarız', 'Zaten hiç çıkmayız'] },
    { id: 421, text: 'Kankam bana en çok ne der?', textGuess: '{name}\'e kankası en çok ne der?', options: ['"Yapma etme"', '"Delisin sen"', '"Dedim sana"', '"Bir sen varsın"'] },
    { id: 422, text: 'Kavga etsek barışmayı kim başlatır?', textGuess: '{name} ile kankası barışmayı kim başlatır?', options: ['Ben', 'O', 'Bir meme atarız', 'Hiç kavga etmeyiz'] },
    { id: 423, text: 'Beni utandıran anımı kankam ne yapar?', textGuess: '{name}\'in rezilliğini kankası ne yapar?', options: ['Herkese anlatır', 'Kasaya kaldırır', 'Şantaj yapar', 'Unutmuş gibi yapar'] },
    { id: 424, text: 'Ortada birine kızdığımda kankam ne yapar?', textGuess: '{name} birine kızınca kankası ne yapar?', options: ['Sebepsiz destekler', '"Haklı mısın?" sorar', 'Benimle kızar', 'Sakinleştirir'] },
    { id: 425, text: 'Kankamla en saçma tartışma konumuz?', textGuess: '{name} ile kankasının en saçma tartışması?', options: ['Nereye yemek', 'Kim daha komik', 'Eski bir olay', 'Dizi finali'] },
    { id: 426, text: 'Kankam kaç günde bir "napıyosun" yazar?', textGuess: '{name}\'e kankası ne sıklıkla yazar?', options: ['Günde 50 kez', 'Haftada bir', 'Aylar sonra', 'Yazmaz, arar'] },
    { id: 427, text: 'Dışarıda birlikte en çok ne yaparız?', textGuess: '{name} kankasıyla dışarıda en çok ne yapar?', options: ['İnsan izleyip yorum', 'Fotoğraf çekmek', 'Yemek turu', 'Plan yapıp eve dönmek'] },
    { id: 428, text: 'Sırrımı kankam kaç saat tutabilir?', textGuess: '{name}\'in sırrını kankası ne kadar tutar?', options: ['Mezara kadar', '1 gün', 'Anında yayar', 'Ona söylemem zaten'] },
    { id: 429, text: 'Kankamla ortak "içimizden geçen bakış" olur mu?', textGuess: '{name} ile kankası bakışarak anlaşır mı?', options: ['Kelimesiz anlaşırız', 'Bazen', 'Hiç anlamaz', 'Yanlış anlar'] },
    { id: 430, text: 'Kankam beni bir yerde ekerse?', textGuess: '{name}\'i kankası ekerse ne olur?', options: ['Ömür boyu başa kakar', 'Anlarım', 'İntikam alır', 'O beni hiç ekmez'] },
    // --- ZOR
    { id: 431, text: 'Kankamın bilmediğini sandığım şey?', textGuess: '{name}, kankasının neyi bilmediğini sanıyor?', options: ['Onu kıskandığını', 'Ona imrendiğini', 'Onu ne kadar sevdiğini', 'Bir sırrını'] },
    { id: 432, text: 'Kankamla aramızda konuşulmayan konu?', textGuess: '{name} ile kankası neyi hiç konuşmaz?', options: ['Para', 'İlişkiler', 'Aile', 'Yok, her şeyi konuşurlar'] },
    { id: 433, text: 'Kankam olmasa hayatım nasıl olurdu?', textGuess: '{name}\'in hayatı kankası olmasa nasıl olurdu?', options: ['Çok daha sıkıcı', 'Daha sakin', 'Pek değişmezdi', 'Düşünmek bile istemiyor'] },
    { id: 434, text: 'Kankama en son ne zaman "teşekkürler" dedim?', textGuess: '{name} kankasına en son ne zaman teşekkür etti?', options: ['Geçenlerde', 'Aylar önce', 'Hiç demedi', 'Sürekli der'] },
    // --- KÜLTÜRE ÖZEL
    { id: 435, only: 'tr', text: 'Kankamla en çok nerede buluşuruz?', textGuess: '{name} kankasıyla en çok nerede buluşur?', options: ['Kafede', 'Evde', 'Yürüyüşte', 'Sadece telefonda'] },
    { id: 436, only: 'tr', text: 'Kankamla ortak muhabbet konumuz?', textGuess: '{name} ile kankasının ortak konusu?', options: ['Ortak arkadaşlar', 'İş/okul', 'İlişkiler', 'Saçmalıklar'] },
    { id: 437, only: 'en', text: 'Grup sohbetimiz nasıl?', textGuess: '{name}\'in arkadaş grubu sohbeti nasıl?', options: ['Kaos, 200 mesaj', 'Sadece caps', 'Aylardır ölü', 'Sadece ikimiz'] },
    { id: 438, only: 'en', text: 'Birlikte uzun yolculuğa çıksak ne olur?', textGuess: '{name} ile kankası uzun yolculuğa çıksa?', options: ['Efsane olur', 'Bir kavga, sonra tamam', 'Bir daha asla', 'Zaten çıktık'] },
  ],
  kardes: [
    { id: 701, text: 'Evde son dilimi kim kapar?', textGuess: '{name} ile kardeşinden son dilimi kim kapar?', options: ['Ben', 'Kardeşim', 'Kim önce görürse', 'Bölüşürüz (yalan)'] },
    { id: 702, text: 'Kardeşimle en çok ne yüzünden kavga ederiz?', textGuess: '{name} kardeşiyle en çok ne yüzünden kavga eder?', options: ['Eşya / kıyafet', 'Kumanda / televizyon', 'Laf sokma', 'Eski defterler'] },
    { id: 703, text: 'Aileye göre "iyi çocuk" hangimiz?', textGuess: "{name}'in ailesine göre iyi çocuk hangisi?", options: ['Kesinlikle ben', 'Kesinlikle kardeşim', 'Güne göre değişir', 'İkimiz de değiliz'] },
    { id: 704, text: 'Kardeşimin şifrelerini bilir miyim?', textGuess: '{name} kardeşinin şifrelerini bilir mi?', options: ['Hepsini', 'Birkaçını', 'Hiçbirini', 'Asıl o benimkileri biliyor'] },
    { id: 705, text: 'Evde bir şey kırıldığında kim suçlanır?', textGuess: "{name}'in evinde bir şey kırılınca kim suçlanır?", options: ['Hep ben', 'Hep kardeşim', 'Kim yakınsa', 'Kedi / görünmez el'] },
    { id: 706, text: 'Kardeşimle dışarıda nasılızdır?', textGuess: '{name} kardeşiyle dışarıda nasıldır?', options: ['Evdeki gibi kavgacı', 'Dışarıda tam takım', 'Ayrı gezeriz', 'Mecburen yan yana'] },
    { id: 707, text: 'Kardeşimden gizli en çok ne yaparım?', textGuess: '{name} kardeşinden gizli en çok ne yapar?', options: ['Atıştırmalık saklar', 'Eşyasını alır', 'Onu annemlere satar', 'Hiçbir şey, melek gibidir'] },
    { id: 708, text: 'Kardeşim benden bir şey istediğinde?', textGuess: '{name} kardeşi bir şey istediğinde ne yapar?', options: ['Hemen yapar', 'Karşılığında bir şey ister', 'Duymazdan gelir', 'Nazlanır ama yapar'] },
    { id: 709, text: 'Çocukken kardeşimle en büyük ortak suçumuz?', textGuess: '{name} ile kardeşinin çocukken ortak suçu neydi?', options: ['Bir şeyler kırmak', 'Gizli atıştırmak', 'Geç saate kadar oyun', 'Birbirini idare etmek'] },
    { id: 710, text: 'Kardeşime göre en sinir eden huyum?', textGuess: "{name}'in kardeşine göre en sinir eden huyu?", options: ['İnatçılık', 'Ukalalık', 'Eşyalarına dokunması', 'Gürültüsü'] },
    { id: 711, text: 'Kardeşimle iletişimimiz nasıldır?', textGuess: '{name} kardeşiyle nasıl iletişim kurar?', options: ['Her şeyi anlatırız', 'Sadece dalga geçeriz', 'Gerekince konuşuruz', 'Bakışarak anlaşırız'] },
    { id: 712, text: 'Başım sıkışınca ilk kime giderim?', textGuess: "{name}'in başı sıkışınca ilk kime gider?", options: ['Kardeşime', 'Anneme', 'Arkadaşıma', 'Kimseye, kendim çözerim'] },
    { id: 713, text: 'Kardeşimle en iyi yaptığımız şey?', textGuess: '{name} kardeşiyle en iyi ne yapar?', options: ['Dalga geçmek', 'Yemek yemek', 'Oyun / dizi', 'Aile dedikodusu'] },
    { id: 714, text: 'Kardeşime hediye alır mıyım?', textGuess: '{name} kardeşine hediye alır mı?', options: ['Her sene', 'Aklına gelirse', 'Ortak hediyeye ortak olur', 'O bana almaz ki'] },
    { id: 715, text: 'Arabada ön koltuk kavgasını kim kazanır?', textGuess: '{name} ile kardeşinden ön koltuğu kim kapar?', options: ['Ben', 'Kardeşim', 'Büyük olan', 'Annem çözer'] },
    { id: 716, text: 'Kardeşimin özel hayatını bilir miyim?', textGuess: '{name} kardeşinin özel hayatını bilir mi?', options: ['Her şeyi bilir', 'Şüpheleri var', 'Hiç bilmez', 'Kardeşi zaten anlatır'] },
    { id: 717, text: 'Kardeşime kızınca ne yaparım?', textGuess: '{name} kardeşine kızınca ne yapar?', options: ['Küser', 'Bağırır', 'İspiyonlar', '5 dakikada unutur'] },
    { id: 718, text: 'Kardeşim için ne kadarını yaparım?', textGuess: '{name} kardeşi için ne kadarını yapar?', options: ['Her şeyi', 'Çoğunu ama söylemez', 'Karşılıklıysa', 'Kavga ederiz ama arkasındayım'] },
    { id: 719, text: 'Anneme kim daha çok ispiyonlar?', textGuess: '{name} mı kardeşi mi daha çok ispiyonlar?', options: ['Ben', 'Kardeşim', 'İkimiz de ajanız', 'Anlaşmalıyız'] },
    { id: 720, text: 'Kardeşimin eşyasını sorunca cevabım?', textGuess: '{name}\'e kardeşi eşyasını sorunca ne der?', options: ['"Ben almadım" (almış)', 'Hemen verir', '"Nerede bilmiyorum"', 'Suçu üstüne atar'] },
    { id: 721, text: 'Ailede espri yapınca kim daha çok güldürür?', textGuess: '{name} mı kardeşi mi daha komik?', options: ['Kesin ben', 'Kesin kardeşim', 'İkimiz de', 'Kimse gülmüyor'] },
    { id: 722, text: 'Kardeşim benden habersiz ne kullanır?', textGuess: '{name}\'in kardeşi habersiz neyini kullanır?', options: ['Şarj aleti', 'Kıyafet', 'Parfüm/bakım', 'Her şeyi'] },
    { id: 723, text: 'İkimizden hangisi ailenin gözdesi?', textGuess: '{name} mı kardeşi mi ailenin gözdesi?', options: ['Ben tabii', 'Kardeşim (haksızlık)', 'Sırayla', 'İkimiz de değil'] },
    { id: 724, text: 'Kardeşimle aynı odada büyüseydik?', textGuess: '{name} kardeşiyle aynı odada nasıl olurdu?', options: ['Çizgi çekerdik', 'Savaş çıkardı', 'Gayet iyi', 'Zaten öyleydi (kabus)'] },
    { id: 725, text: 'Kardeşim sırrımı bilir mi?', textGuess: '{name}\'in sırlarını kardeşi bilir mi?', options: ['Hepsini', 'Yarısını', 'Hiç', 'Bilse şantaj yapar'] },
    { id: 726, text: 'Dışarıda kardeşimi tanır mıyım (kızgınken)?', textGuess: '{name} kızgınken kardeşini tanır mı?', options: ['"Tanımıyorum onu"', 'Yine sahiplenir', 'Kavga dışarı taşar', 'Barışıveririz'] },
    { id: 727, text: 'Kardeşim doğunca ne hissetmiştim?', textGuess: '{name} kardeşi doğunca ne hissetti?', options: ['Kıskançlık', 'Sevinç', '"Geri verin"', 'Hatırlamıyor'] },
    { id: 728, text: 'Ev işini kime yıkarım?', textGuess: '{name} ev işini kime yıkar?', options: ['Kardeşime', 'Kardeşim bana', 'Sırayla kaçarız', 'Anne yapar'] },
    { id: 729, text: 'Kardeşimle en çok neyi paylaşamayız?', textGuess: '{name} kardeşiyle neyi paylaşamaz?', options: ['Şarj kablosu', 'Son dilim', 'Kumanda', 'Anne sevgisi'] },
    { id: 730, text: 'Kardeşim başı sıkışınca bana gelir mi?', textGuess: '{name}\'e kardeşi başı sıkışınca gelir mi?', options: ['Hep gelir', 'Gururu izin vermez', 'Para lazımsa gelir', 'Ben ona giderim'] },
    // --- ZOR
    { id: 731, text: 'Kardeşimle ilgili kimseye söylemediğim duygu?', textGuess: '{name}\'in kardeşine dair söylemediği duygu?', options: ['Gurur', 'Kıskançlık', 'Endişe', 'Özlem'] },
    { id: 732, text: 'Kardeşim için yapıp hiç övünmediğim şey?', textGuess: '{name} kardeşi için ne yaptı ama hiç söylemedi?', options: ['Onu savundu', 'Suçunu üstlendi', 'Para verdi', 'Sırrını tuttu'] },
    { id: 733, text: 'Kardeşime söyleyemediğim cümle?', textGuess: '{name} kardeşine hangi cümleyi söyleyemiyor?', options: ['"Seninle gurur duyuyorum"', '"Özür dilerim"', '"Seni özlüyorum"', '"Sana ihtiyacım var"'] },
    { id: 734, text: 'Çocukken kardeşimin neyini kıskanırdım?', textGuess: '{name} çocukken kardeşinin neyini kıskanırdı?', options: ['İlgiyi', 'Eşyalarını', 'Özgürlüğünü', 'Hiçbir şeyini'] },
    // --- KÜLTÜRE ÖZEL
    { id: 735, only: 'tr', text: 'Bayram harçlığını kim daha çok toplardı?', textGuess: '{name} ile kardeşinden kim daha çok bayram harçlığı toplardı?', options: ['Ben', 'Kardeşim', 'Eşit', 'Artık almıyoruz'] },
    { id: 736, only: 'tr', text: 'Büyüklerimiz kimi daha çok sever?', textGuess: '{name}\'in ailesinin büyükleri kimi daha çok sever?', options: ['Beni', 'Kardeşimi', 'Eşit severler', 'İkimizi de idare ederler'] },
    { id: 737, only: 'en', text: 'Hangimiz "sorunlu çocuk"tu?', textGuess: '{name} ile kardeşinden hangisi "sorunlu çocuk"tu?', options: ['Ben', 'Kardeşim', 'İkimiz de', 'Hiçbirimiz, melektik'] },
    { id: 738, only: 'en', text: 'Hâlâ ön koltuk kavgası yapar mıyız?', textGuess: '{name} ile kardeşi hâlâ ön koltuk kavgası yapar mı?', options: ['Her seferinde', 'Büyüdük artık', 'Şakadan', 'Ayrı arabalarla gidiyoruz'] },
  ],
  eski: [
    { id: 501, text: 'İlişkimizde "bizim şarkımız" hangi türdendi?', textGuess: '{name} ile şarkınız hangi türdendi?', options: ['Türkçe slow', 'Yabancı pop', 'Rap', 'Rock / akustik'] },
    { id: 502, text: 'İlk "seni seviyorum"u kim söyledi?', textGuess: '{name} ile ilk "seni seviyorum"u kim söyledi?', options: ['Ben', 'O', 'Aynı anda', 'Hatırlamıyor'] },
    { id: 503, text: 'En çok ne yüzünden kavga ederdik?', textGuess: '{name} ile en çok ne yüzünden kavga edilirdi?', options: ['Kıskançlık', 'İlgisizlik', 'Arkadaşlar', 'Küçük şeyler'] },
    { id: 504, text: 'Ayrılık kimden geldi?', textGuess: '{name} ile ayrılık kimden geldi?', options: ['Benden', 'Ondan', 'Karşılıklı', 'Belli değil'] },
    { id: 505, text: 'Benden en çok özlenecek şey neydi?', textGuess: "{name}'in en çok neyi özlenir?", options: ['Sarılması', 'Esprileri', 'İlgisi', 'Sohbeti'] },
    { id: 506, text: 'Şu an bana dair aklında kalan ilk şey?', textGuess: "{name}'e dair aklında kalan ilk şey?", options: ['Gülüşü', 'Bir tartışma', 'Güzel bir an', 'Kokusu'] },
    { id: 507, text: 'İlk buluşmamız neredeydi?', textGuess: '{name} ile ilk buluşma neredeydi?', options: ['Kafe', 'Sinema', 'Yürüyüş', 'Ev / arkadaş ortamı'] },
    { id: 508, text: 'İlişkimizin en tatlı anısı?', textGuess: '{name} ile en tatlı anı ne türdendi?', options: ['Bir gezi', 'Sıradan bir gün', 'Bir sürpriz', 'İlk buluşma'] },
    { id: 509, text: 'Benim en çok battığı huyum neydi?', textGuess: "{name}'in en çok batan huyu neydi?", options: ['Kıskançlık', 'İlgisizlik', 'Geç cevap', 'İnatçılık'] },
    { id: 510, text: 'Bittikten sonra arkadaş kalabilir miyiz?', textGuess: '{name} ile ayrıldıktan sonra arkadaş kalınır mı?', options: ['Evet', 'Asla', 'Belki', 'Zaten öyleyiz'] },
    { id: 511, text: 'Bana geri dönme ihtimali?', textGuess: "{name}'e geri dönme ihtimali?", options: ['Sıfır', 'Düşük', 'Belki', 'Kalpte hep var'] },
    { id: 512, text: 'İlişkimiz ne kadar sürmüştü?', textGuess: '{name} ile ilişki ne kadar sürdü?', options: ['Birkaç ay', '1 yıl civarı', 'Yıllarca', 'Kısacık'] },
    { id: 513, text: 'İlk adımı kim atmıştı?', textGuess: '{name} ile ilk adımı kim attı?', options: ['Ben', 'O', 'Arkadaşlar ayarladı', 'Kendiliğinden'] },
    { id: 514, text: 'Ayrılığın asıl sebebi?', textGuess: '{name} ile ayrılığın asıl sebebi?', options: ['Mesafe', 'Güven', 'İlgisizlik', 'Zamanlama'] },
    { id: 515, text: 'Hâlâ takip ediyor muyuz birbirimizi?', textGuess: '{name} ile hâlâ takipleşiyor musunuz?', options: ['Evet', 'Engelli', 'Görmezden geliyoruz', 'Sessizce takipteyiz'] },
    { id: 516, text: 'Onunla en son ne zaman konuştuk?', textGuess: '{name} ile en son ne zaman konuşuldu?', options: ['Uzun zaman oldu', 'Ara sıra', 'Hiç', 'Yakın zamanda'] },
    { id: 517, text: 'Geriye kalan en güçlü his?', textGuess: '{name}\'e dair geriye kalan his?', options: ['Özlem', 'Kızgınlık', 'Vefa', 'Hiçbir şey'] },
    { id: 518, text: 'Bir daha karşılaşsak ne olur?', textGuess: '{name} ile bir daha karşılaşsanız ne olur?', options: ['Selam veririz', 'Görmezden geliriz', 'Sarılırız', 'Kaçarız'] },
    { id: 519, text: 'Gece 2\'de aklıma düşse ne yaparım?', textGuess: '{name} gece 2\'de aklına düşünce ne yapar?', options: ['Story\'sine bakar', 'Telefonu bırakır', 'Eski mesajları okur', 'Umursamaz, uyur'] },
    { id: 520, text: 'Şarkısı çalınca ne hissederim?', textGuess: '{name}, o şarkı çalınca ne hisseder?', options: ['İçi cız eder', 'Kanalı değiştirir', 'Hiçbir şey', 'Gülüp geçer'] },
    { id: 521, text: 'Onu birine anlatırken nasıl anlatırım?', textGuess: '{name} onu nasıl anlatır?', options: ['"İyiydi aslında"', '"Hiç sormayın"', 'Adını anmaz', '"Ders oldu"'] },
    { id: 522, text: 'Ortak arkadaşlar kimde kaldı?', textGuess: '{name} ile ortak arkadaşlar kimde kaldı?', options: ['Bende', 'Onda', 'Bölüşüldü', 'Kaçtılar'] },
    { id: 523, text: 'Onu engelledim mi, ayakta mı tutuyorum?', textGuess: '{name} onu engelledi mi?', options: ['Full engel', 'Sessizce takipte', 'Görmezden geliyor', 'Hâlâ konuşuyoruz'] },
    { id: 524, text: 'Ayrılırken en çok ne dedim?', textGuess: '{name} ayrılırken en çok ne dedi?', options: ['"Arkadaş kalalım"', '"Bir daha arama"', 'Hiçbir şey, gitti', '"Pişman olacaksın"'] },
    { id: 525, text: 'Şimdi geri dönmek istese ne derim?', textGuess: '{name}\'e geri dönmek isterse ne der?', options: ['"Yok artık"', 'Düşünürüm', 'Kapı hep açık', 'Güler geçer'] },
    { id: 526, text: 'En çok pişman olduğum an?', textGuess: '{name}\'in en pişman olduğu an?', options: ['O tartışma', 'Geç kalmak', 'Söylemediği söz', 'Hiç pişman değil'] },
    { id: 527, text: 'Onunla ilgili hâlâ sakladığım şey?', textGuess: '{name}\'in ondan sakladığı şey?', options: ['Bir fotoğraf', 'Bir hediye', 'Bir mesaj', 'Hiçbir şey attı'] },
    { id: 528, text: 'Yeni biriyle onu kıyaslar mıyım?', textGuess: '{name} yeni biriyle onu kıyaslar mı?', options: ['İster istemez', 'Asla', 'Bazen', 'Çoktan unuttu'] },
    { id: 529, text: 'Onun yeni sevgilisini merak eder miyim?', textGuess: '{name} onun yeni sevgilisini merak eder mi?', options: ['Gizlice stalklar', 'Hiç umursamaz', '"Kim bu?" der', 'Zaten biliyor'] },
    { id: 530, text: 'İlişkiden aklımda kalan tek kelime?', textGuess: '{name}\'in o ilişkiden aklında kalan tek kelime?', options: ['Özlem', 'Hata', 'Tecrübe', 'Neyse ki bitti'] },
    // --- ZOR
    { id: 531, text: 'O ilişkiden öğrendiğim en büyük ders?', textGuess: '{name} o ilişkiden ne öğrendi?', options: ['Kendini kaybetmemeyi', 'Erken konuşmayı', 'Beklememeyi', 'Affetmeyi'] },
    { id: 532, text: 'Ayrılıktan sonra ilk sildiğim şey?', textGuess: '{name} ayrılıktan sonra ilk neyi sildi?', options: ['Fotoğrafları', 'Mesajları', 'Şarkıları', 'Hiçbirini'] },
    { id: 533, text: 'Şu an ona söylemek istediğim tek cümle?', textGuess: '{name} şu an ona ne söylemek isterdi?', options: ['"İyi ki vardın"', '"Beni çok kırdın"', '"Umarım mutlusundur"', '"Söyleyecek bir şeyim yok"'] },
    { id: 534, text: 'O ilişkide aslında en çok neyi özledim?', textGuess: '{name} o ilişkide en çok neyi özledi?', options: ['Sohbetleri', 'Rutini', 'Sarılmayı', 'O zamanki kendini'] },
    // --- KÜLTÜRE ÖZEL
    { id: 535, only: 'tr', text: 'Ailem onu sevmiş miydi?', textGuess: "{name}'in ailesi onu sevmiş miydi?", options: ['Çok severlerdi', 'Hiç ısınamadılar', 'Hiç tanışmadılar', 'Hâlâ soruyorlar'] },
    { id: 536, only: 'tr', text: 'Ortak arkadaşlar ne dedi?', textGuess: '{name} ayrılınca ortak arkadaşlar ne dedi?', options: ['"İyi ki bitti"', '"Yazık oldu"', 'Taraf tutmadılar', 'Hiç konuşulmadı'] },
    { id: 537, only: 'en', text: 'Takipten çıktım mı, sessize mi aldım?', textGuess: '{name} onu takipten çıkardı mı?', options: ['Anında çıktım', 'Sessize aldım, izliyorum', 'Engelledim', 'Hâlâ takip ediyorum'] },
    { id: 538, only: 'en', text: 'Gece 2\'de ona yazar mıyım?', textGuess: '{name} gece 2\'de ona yazar mı?', options: ['Bir daha asla', 'Zaten yazdım', 'Aklımdan geçti', 'O bana yazıyor'] },
  ],
  anonim: [
    { id: 601, text: 'Beni en iyi anlatan tek şey?', textGuess: "{name}'i en iyi anlatan tek şey?", options: ['Enerjisi', 'Zekâsı', 'Kalbi', 'Mizahı'] },
    { id: 602, text: 'İnsanlar benim hakkımda ilk ne düşünür?', textGuess: 'İnsanlar {name} hakkında ilk ne düşünür?', options: ['Sıcakkanlı', 'Mesafeli', 'Komik', 'Ciddi'] },
    { id: 603, text: 'Kalabalıkta nasıl biriyimdir?', textGuess: '{name} kalabalıkta nasıl biridir?', options: ['Merkez', 'Sessiz', 'Gözlemci', 'Duruma göre'] },
    { id: 604, text: 'Beni kırmanın en kolay yolu?', textGuess: "{name}'i kırmanın en kolay yolu?", options: ['İlgisizlik', 'Yalan', 'Alay etmek', 'Görmezden gelmek'] },
    { id: 605, text: 'Hafta sonu beni nerede bulursun?', textGuess: "{name}'i hafta sonu nerede bulursun?", options: ['Evde', 'Dışarıda', 'Yolda / gezide', 'İşte'] },
    { id: 606, text: 'En çok hangi konuda konuşurum?', textGuess: '{name} en çok hangi konuda konuşur?', options: ['Hayaller', 'Dedikodu', 'İşi / okulu', 'Saçmalıklar'] },
    { id: 607, text: 'Bana göre mükemmel akşam?', textGuess: "{name}'e göre mükemmel akşam?", options: ['Evde huzur', 'Dışarı çıkmak', 'Sevdiğiyle', 'Yalnız kafa dinlemek'] },
    { id: 608, text: 'Beni motive eden şey?', textGuess: "{name}'i ne motive eder?", options: ['Para', 'Başarı', 'Sevdikleri', 'Kanıtlamak'] },
    { id: 609, text: 'İlk görüşte bıraktığım izlenim?', textGuess: '{name} ilk görüşte nasıl bir izlenim bırakır?', options: ['Cana yakın', 'Ciddi', 'Havalı', 'Çekingen'] },
    { id: 610, text: 'En büyük zaafım?', textGuess: "{name}'in en büyük zaafı?", options: ['Tatlı', 'Övgü', 'Sevdikleri', 'Kendini kanıtlamak'] },
    { id: 611, text: 'Bir yalanımı ele veren şey?', textGuess: '{name} yalan söylerken onu ne ele verir?', options: ['Gülüşü', 'Sesi', 'Gözleri', 'Hiç belli olmaz'] },
    { id: 612, text: 'En çok neyle övünürüm?', textGuess: '{name} en çok neyle övünür?', options: ['Zekâsı', 'Kalbi', 'Görünüşü', 'Hiç övünmez'] },
    { id: 613, text: 'İçimden geçeni yüzümden okumak?', textGuess: "{name}'in içinden geçeni yüzünden okumak?", options: ['Çok kolay', 'İmkânsız', 'Bazen', 'Poker face'] },
    { id: 614, text: 'Beni bir hayvana benzetsen?', textGuess: '{name}\'i bir hayvana benzetsen?', options: ['Kedi', 'Köpek', 'Aslan', 'Tembel hayvan'] },
    { id: 615, text: 'Bana bir renk versen hangisi olurdum?', textGuess: '{name} hangi renk olurdu?', options: ['Kırmızı (ateş)', 'Mavi (sakin)', 'Siyah (gizem)', 'Sarı (enerji)'] },
    { id: 616, text: 'Kafamda sürekli dönen şey?', textGuess: '{name}\'in kafasında sürekli dönen şey?', options: ['Geçmiş rezaletler', 'Gelecek planları', '"Acaba dese miydim"', 'Bir şarkı'] },
    { id: 617, text: 'İnsanların bende yanıldığı şey?', textGuess: 'İnsanlar {name} hakkında neyde yanılır?', options: ['Soğuk sanılır, değil', 'Güçlü sanılır, kırılgan', 'Neşeli sanılır, yorgun', 'Umursamaz sanılır, çok düşünür'] },
    { id: 618, text: 'Bir günlüğüm olsa ilk cümlesi?', textGuess: '{name}\'in günlüğünün ilk cümlesi?', options: ['"Bugün de..."', '"Kimse anlamıyor"', '"Ne güzel gün"', '"Yine aynı şey"'] },
    { id: 619, text: 'Beni en iyi anlatan mevsim?', textGuess: '{name}\'i en iyi anlatan mevsim?', options: ['Yaz (coşku)', 'Kış (dinginlik)', 'Sonbahar (hüzün)', 'İlkbahar (umut)'] },
    { id: 620, text: 'Kalabalıkta en çok korktuğum şey?', textGuess: '{name} kalabalıkta en çok neden korkar?', options: ['Fark edilmek', 'Görünmez olmak', 'Konuşmak zorunda kalmak', 'Hiç, rahattır'] },
    { id: 621, text: 'Bir dileğim kabul olsa ne dilerdim?', textGuess: '{name} tek dilek dilese ne isterdi?', options: ['Huzur', 'Para', 'Sevgi', 'Zaman'] },
    { id: 622, text: 'Sessiz kaldığımda aslında ne düşünürüm?', textGuess: '{name} sustuğunda ne düşünür?', options: ['Her şeyi', 'Hiçbir şeyi', 'Ne diyeceğini', 'Kaçmayı'] },
    { id: 623, text: 'Beni bir şarkı sözüyle anlatsan?', textGuess: '{name}\'i hangi tür şarkı sözü anlatır?', options: ['Hüzünlü slow', 'Enerjik pop', 'İsyankâr rap', 'Sakin akustik'] },
    { id: 624, text: 'Gece mi gündüz mü daha çok benim?', textGuess: '{name} gece mi gündüz mü?', options: ['Gece (derin)', 'Gündüz (canlı)', 'Gün batımı', 'İkisi de yorucu'] },
    { id: 625, text: 'İnsanlara ilk güvenir miyim?', textGuess: '{name} insanlara kolay güvenir mi?', options: ['Herkese açık', 'Kimseye kapalı', 'Test eder', 'Bir kez yanınca biter'] },
    { id: 626, text: 'Kendimi bir eşyaya benzetsem?', textGuess: '{name} kendini hangi eşyaya benzetir?', options: ['Ayna', 'Mum', 'Pusula', 'Eski bir kitap'] },
    // --- ZOR
    { id: 627, text: 'Kimsenin fark etmediğini sandığım şey?', textGuess: '{name} neyin fark edilmediğini sanıyor?', options: ['Ne kadar yorgun olduğunu', 'Ne kadar düşündüğünü', 'Ne kadar kırıldığını', 'Ne kadar çabaladığını'] },
    { id: 628, text: 'İnsanlardan en çok neyi saklarım?', textGuess: '{name} insanlardan en çok neyi saklar?', options: ['Kaygılarını', 'Hayallerini', 'Geçmişini', 'Yalnızlığını'] },
    { id: 629, text: 'Beni gerçekten tanısan şaşıracağın yanım?', textGuess: '{name}\'i tanısan neye şaşırırdın?', options: ['Çok kırılgan', 'Çok inatçı', 'Çok yalnız', 'Çok hırslı'] },
    { id: 630, text: 'Bir gün herkesin öğrenmesini istediğim şey?', textGuess: '{name} bir gün herkesin neyi öğrenmesini ister?', options: ['Ne kadar uğraştığını', 'Gerçek düşüncelerini', 'Bir sırrını', 'Hiçbir şey'] },
    // --- KÜLTÜRE ÖZEL
    { id: 631, only: 'tr', text: 'Bana söylemek isteyip söyleyemediğin şey?', textGuess: '{name}\'e söylemek isteyip söyleyemediğin şey?', options: ['Bir iltifat', 'Bir şikayet', 'Bir itiraf', 'Hiçbir şey'] },
    { id: 632, only: 'tr', text: 'Beni nereden tanıyorsun?', textGuess: '{name}\'i nereden tanıyorsun?', options: ['Okul/iş', 'Arkadaş çevresi', 'İnternet', 'Aile'] },
    { id: 633, only: 'en', text: 'Karşılaşsak beni tanır mıydın?', textGuess: 'Karşılaşsanız {name}\'i tanır mıydın?', options: ['Anında', 'Belki', 'Hiç sanmam', 'Hiç karşılaşmadık'] },
    { id: 634, only: 'en', text: 'Yüzüme asla söyleyemeyeceğin şey?', textGuess: '{name}\'in yüzüne asla söyleyemeyeceğin şey?', options: ['Bir iltifat', 'Bir şikayet', 'Bir sır', 'Yok, hepsini söylerim'] },
  ],
};

// Cihaz diline göre aktif havuz (Türkçe cihaz → TR, aksi halde EN).
// Cihaz dilindeki TÜM sorular (kültüre özel olanlar dahil).
const SHARED_RAW: Question[] = LANG === 'tr' ? SHARED_TR : SHARED_EN;
const SPECIFIC_RAW: Record<CategoryId, Question[]> =
  LANG === 'tr' ? SPECIFIC_TR : SPECIFIC_EN;

// id → Question haritası HAM listeden kurulur: kültüre özel bir soru başka
// dilde oluşturulmuş bir teste girmiş olabilir; o testi bu cihazda çözerken
// soru bulunamazsa liste kısalır, cevap dizisi kayar ve puanlama bozulur.
// Bu yüzden ALL asla filtrelenmez.
const ALL: Map<number, Question> = new Map();
for (const q of SHARED_RAW) ALL.set(q.id, q);
for (const cat of Object.keys(SPECIFIC_RAW) as CategoryId[]) {
  for (const q of SPECIFIC_RAW[cat]) ALL.set(q.id, q);
}

// SEÇİM havuzları filtrelidir: kültüre özel sorular yalnızca kendi dilinde
// yeni testlere girer (Türkçe cihaz Türk kültürüne, İngilizce cihaz batı
// kültürüne özgü soruları seçer).
const fitsLang = (q: Question) => !q.only || q.only === LANG;
const SHARED: Question[] = SHARED_RAW.filter(fitsLang);
const SPECIFIC: Record<CategoryId, Question[]> = Object.fromEntries(
  (Object.keys(SPECIFIC_RAW) as CategoryId[]).map((cat) => [
    cat,
    SPECIFIC_RAW[cat].filter(fitsLang),
  ])
) as Record<CategoryId, Question[]>;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ROTASYON: aynı cihazda üst üste test yapınca aynı soruların tekrar gelmemesi
// için son gösterilen id'ler kategori bazında tutulur. Havuz tükenince sıfırlanır,
// böylece kullanıcı önce TÜM havuzu görür, sonra baştan (karışık) döner.
const recentByCat: Record<string, Set<number>> = {};

function pickRotated(pool: Question[], need: number, used: Set<number>): Question[] {
  let fresh = shuffle(pool.filter((q) => !used.has(q.id)));
  // Yeterli taze soru yoksa bu havuz için rotasyonu sıfırla
  if (fresh.length < need) {
    for (const q of pool) used.delete(q.id);
    fresh = shuffle(pool);
  }
  return fresh.slice(0, need);
}

/**
 * Bir kategori için `count` soru seçer (özelden ağırlıklı + evrensel).
 * ROTASYONLU: her testte farklı sorular gelir; havuz bitmeden tekrar olmaz.
 * Seçilen id'ler teste kaydedilir ki tahmin eden aynı soruları görsün.
 */
export function pickQuestions(cat: CategoryId, count = 12): Question[] {
  const used = (recentByCat[cat] ??= new Set<number>());
  const half = Math.min(Math.ceil(count / 2), SPECIFIC[cat].length);

  const chosen = pickRotated(SPECIFIC[cat], half, used);
  const rest = count - chosen.length;
  // Kalanı evrensel + artan özel havuzdan, yine rotasyonlu doldur
  const fillPool = [...SHARED, ...SPECIFIC[cat].filter((q) => !chosen.includes(q))];
  for (const q of pickRotated(fillPool, rest, used)) chosen.push(q);

  chosen.forEach((q) => used.add(q.id));
  return shuffle(chosen).slice(0, count);
}

/** id listesinden soruları yeniden kurar (tahmin eden aynı soruları görsün). */
export function getQuestionsByIds(ids: number[]): Question[] {
  return ids.map((id) => ALL.get(id)).filter((q): q is Question => !!q);
}

/**
 * Bir test için soruları döndürür: q kaydı varsa ondan (yeni testler),
 * yoksa kategoriden deterministik ilk 12 (eski testler / yedek).
 */
export function questionsForQuiz(cat: CategoryId, q?: number[]): Question[] {
  if (q && q.length) {
    const byId = getQuestionsByIds(q);
    if (byId.length) return byId;
  }
  return [...SPECIFIC[cat], ...SHARED].slice(0, 12);
}

const VOWELS = 'aeıioöuüAEIİOÖUÜ';

/** İsmin son sesli harfi (küçük). */
function lastVowel(name: string): string {
  let v = '';
  for (const ch of name) if (VOWELS.includes(ch)) v = ch.toLocaleLowerCase('tr');
  return v;
}
function endsWithVowel(name: string): boolean {
  return VOWELS.includes(name[name.length - 1] ?? '');
}

/**
 * İsme Türkçe ekini ünlü uyumu + kaynaştırma harfiyle doğru ekler.
 * type: 'acc' (belirtme -ı/i), 'gen' (tamlayan -ın/in), 'dat' (yönelme -a/e).
 * Örnek: Ali'yi, Ayşe'nin, Umut'a — sesli/sessiz sona göre.
 */
function withSuffix(name: string, type: 'acc' | 'gen' | 'dat', proper = true): string {
  const lv = lastVowel(name);
  const ev = endsWithVowel(name);
  const ap = proper ? "'" : ''; // özel isimde kesme işareti, ortak isimde yok
  if (type === 'dat') {
    const s = 'aıou'.includes(lv) ? 'a' : 'e';
    return `${name}${ap}${ev ? 'y' : ''}${s}`;
  }
  const four: Record<string, string> = { a: 'ı', ı: 'ı', e: 'i', i: 'i', o: 'u', u: 'u', ö: 'ü', ü: 'ü' };
  const vw = four[lv] ?? 'i';
  if (type === 'acc') return `${name}${ap}${ev ? 'y' : ''}${vw}`;
  return `${name}${ap}${ev ? 'n' : ''}${vw}n`; // gen
}

/**
 * Tahmin edenin göreceği soru metni. {name} yerine adı, doğru Türkçe ekiyle koyar.
 * Anonimde "Gizemli kişi" kullanır. Sesli harfle biten isimlerde (Ali, Ayşe)
 * ekleri düzeltir: Ali'yi, Ayşe'nin, Ayşe'ye.
 */
export function guessText(template: string, name: string, isAnon: boolean): string {
  // İngilizcede ek mantığı yok: {name} ve {name}'s doğrudan yerine geçer.
  if (LANG === 'en') {
    const en = isAnon ? 'the mystery person' : name.trim() || 'they';
    return template.replace(/\{name\}/g, en);
  }
  const who = isAnon ? 'Gizemli kişi' : name.trim() || 'O';
  const proper = !isAnon; // anonimde ortak isim (kesme işareti yok)
  // Sıra önemli: önce 'in (tamlayan), sonra 'i (belirtme), sonra 'e (yönelme).
  return template
    .replace(/\{name\}'in\b/g, withSuffix(who, 'gen', proper))
    .replace(/\{name\}'i\b/g, withSuffix(who, 'acc', proper))
    .replace(/\{name\}'e\b/g, withSuffix(who, 'dat', proper))
    .replace(/\{name\}/g, who);
}
