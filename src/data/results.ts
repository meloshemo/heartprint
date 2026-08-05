import { CategoryId, FunnyResult } from '../types';
import { LANG } from '../i18n/locale';
import { RESULTS_EN } from './results.en';

type Band = 'low' | 'mid' | 'high' | 'perfect';

function bandOf(percent: number): Band {
  if (percent >= 90) return 'perfect';
  if (percent >= 70) return 'high';
  if (percent >= 45) return 'mid';
  return 'low';
}

// Sonuçlar kasıtlı PAYLAŞILASI: internet-doğal, sarkastik, güldüren — kırıcı
// değil. Her bantta BOL varyant (kategori başına 45) → aynı yüzde her
// seferinde farklı kart üretir, insanlar sonucu görmek için tekrar oynar.
// KURAL: her cümle SOMUT bir duruma dayanmalı; soyut metafor (anten/vida/ip)
// kimseyi güldürmüyor. Tekrar/çok benzer cümle eklenmemeli.
const RESULTS_TR: Record<CategoryId, Record<Band, FunnyResult[]>> = {
  sevgili: {
    perfect: [
      { emoji: '💍', title: 'Nikah memurunu arayın.', subtitle: 'Bu kadar bileni kaçırmak günah.' },
      { emoji: '🔍', title: 'Google seni bu kadar bilmiyor.', subtitle: 'Arama geçmişi gıpta etti.' },
      { emoji: '🧠', title: 'Beynime abonelik başlatmış.', subtitle: 'Hem de reklamsız üyelik.' },
      { emoji: '📡', title: 'Konumun sürekli açık galiba.', subtitle: 'Bu kesinlik ancak casusta olur.' },
      { emoji: '🥹', title: 'Ağlamak üzereyim.', subtitle: 'Ya çok âşık ya çok iyi stalk’çı.' },
      { emoji: '💯', title: 'Bu skora şerefine kopya verilir.', subtitle: 'Ama gerek yok, ezberlemiş.' },
      { emoji: '🔐', title: 'Telefon şifreni de biliyordur.', subtitle: 'Bu seviye biraz ürkütücü.' },
      { emoji: '🪞', title: 'Aynadaki yansımandan farksız.', subtitle: 'Seni senden iyi tanıyor.' },
      { emoji: '💌', title: 'Kalbini ezbere okuyor.', subtitle: 'Bu aşk ders kitaplarına girer.' },
      { emoji: '🍽️', title: 'Menüde ne seçeceğini biliyor.', subtitle: 'Sen bakmadan siparişi vermiş.' },
      { emoji: '🤫', title: 'Söylemediklerini de duyuyor.', subtitle: 'Sessizliğini bile çevirmiş.' },
      { emoji: '🗂️', title: 'Bu tanıma değil, resmen dosya.', subtitle: 'Kaç yıldır not tutuyorsun?' },
    ],
    high: [
      { emoji: '❤️', title: 'Neredeyse ruh eşi.', subtitle: 'O üç soru olmasa dört dörtlük.' },
      { emoji: '😍', title: 'İçten içe seviyor, belli.', subtitle: 'Ama birazını da uydurmuş.' },
      { emoji: '🎯', title: 'Az kalsın tam isabet.', subtitle: 'Son soruda paniğe kapıldı galiba.' },
      { emoji: '☕', title: 'Bir kahve, iki laf, tamamlanır.', subtitle: 'Şu an beklenenin azıcık altı.' },
      { emoji: '🧩', title: 'Puzzle neredeyse tamam.', subtitle: 'Birkaç parça koltuğun altında.' },
      { emoji: '🌡️', title: 'İlişki ateşi yüksek.', subtitle: 'Ufak birkaç üşütme var ama.' },
      { emoji: '📶', title: 'Sinyal güçlü çekiyor.', subtitle: 'Bir iki soruda çekmedi sadece.' },
      { emoji: '🎼', title: 'Sevdiğin şarkıyı biliyor, sözünü karıştırıyor.', subtitle: 'Yine de doğru şarkı.' },
      { emoji: '🧲', title: 'Aranızda ciddi bir çekim var.', subtitle: 'Birkaç soruda mıknatıs ters döndü.' },
      { emoji: '🎁', title: 'Hediyeyi doğru seçer, bedeni şaşırır.', subtitle: 'Niyet tam, detay eksik.' },
      { emoji: '☎️', title: 'Sesinin tonundan gününü anlıyor.', subtitle: 'Birkaç ayrıntıyı yine de ıskalamış.' },
    ],
    mid: [
      { emoji: '😅', title: 'İlişki idare eder.', subtitle: 'Ama telefonunu bir kontrol et.' },
      { emoji: '🍕', title: 'Ne sevdiğini biliyor ama yine soruyor.', subtitle: 'Emin olamamış işte.' },
      { emoji: '🤔', title: 'Seni tahmin ediyor, tanımıyor.', subtitle: 'İnce ama önemli fark.' },
      { emoji: '🤷', title: 'Sevdiğin rengi bildi, huyunu şaşırdı.', subtitle: 'Yarısı bilgi, yarısı tahmin.' },
      { emoji: '📵', title: 'Sen anlatırken bildirim gelmiş olabilir.', subtitle: 'O an kaçırdıkları burada çıktı.' },
      { emoji: '🧭', title: 'Yönü buluyor, adresi şaşırıyor.', subtitle: 'Az kaldı.' },
      { emoji: '🍜', title: 'İlişki az pişmiş.', subtitle: 'Biraz daha demlenmeli.' },
      { emoji: '🎢', title: 'İki tur bildi, bir tur savruldu.', subtitle: 'Duygular lunaparkta.' },
      { emoji: '🧦', title: 'Seni çorap gibi ters giymiş.', subtitle: 'Sıcak ama biraz karışık.' },
      { emoji: '🍕', title: 'Pizzanı biliyor, kalbini yarım.', subtitle: 'Fena başlangıç değil.' },
      { emoji: '💬', title: '"Sana bir şey diyeceğim"i biliyor.', subtitle: 'Devamını hiç bilmiyor.' },
    ],
    low: [
      { emoji: '💔', title: 'Aşk var, hafıza formatlı.', subtitle: 'Baştan tanışmanızı öneririm.' },
      { emoji: '🚩', title: 'Seni başkasıyla mı karıştırdı?', subtitle: 'Bu skor şüpheli... bir sor derim.' },
      { emoji: '🙈', title: 'Yan yana oturan iki yabancı.', subtitle: 'Otobüste tanışmış gibisiniz.' },
      { emoji: '🧊', title: 'İlişki buzdolabında unutulmuş.', subtitle: 'Isıtmak sana düşüyor.' },
      { emoji: '📵', title: 'Bağlantı tamamen koptu.', subtitle: 'Acilen bir konuşma şart.' },
      { emoji: '🕵️', title: '"Sen kimsin?" enerjisi.', subtitle: 'Tanışma faslına dönüldü.' },
      { emoji: '🃏', title: 'Kartları rastgele açmış.', subtitle: 'Aşk şans oyunu değil ama...' },
      { emoji: '🛰️', title: 'Uydu bağlantısı tamamen gitmiş.', subtitle: 'Seni başka gezegende arıyor.' },
      { emoji: '🎪', title: 'Cevapları sirkten seçmiş.', subtitle: 'Eğlenceli ama alakasız.' },
      { emoji: '🍽️', title: 'Sevdiğin yemeği bile bilmiyor.', subtitle: 'Bu kadarı da olmaz ki.' },
      { emoji: '👥', title: 'Sevgilin mi, tanıdığın mı belli değil.', subtitle: 'Bir baştan tanışın.' },
    ],
  },
  anne: {
    perfect: [
      { emoji: '🛰️', title: 'Anne uydusu yörüngede.', subtitle: 'Tuvalete gittiğini bile biliyor.' },
      { emoji: '🔮', title: 'Sen düşünmeden o biliyor.', subtitle: '"İçime doğdu" modu hep açık.' },
      { emoji: '👑', title: 'Annelik diploması onursal.', subtitle: 'Seni rahminden beri takipte.' },
      { emoji: '🍲', title: 'Tabağından ruh halini okuyor.', subtitle: 'Bu seviye ancak annede olur.' },
      { emoji: '🥹', title: '9 ay taşımış, boşuna değilmiş.', subtitle: 'Her virgülünü ezbere biliyor.' },
      { emoji: '📖', title: 'Seni bir kitap gibi okur.', subtitle: 'Hem de arka kapağı ezbere.' },
      { emoji: '🧿', title: 'Nazar bile ondan kaçamaz.', subtitle: 'Anne sezgisi şaşmaz.' },
      { emoji: '🕵️', title: 'Yalanını ilk cümleden anlıyor.', subtitle: 'Anne yalan detektörü hiç bozulmaz.' },
      { emoji: '📿', title: 'Duası bile sana göre ayarlı.', subtitle: 'Seni ezberden koruyor.' },
      { emoji: '📞', title: 'Sen aramadan o arıyor.', subtitle: '"İçime bir his doğdu" modu.' },
      { emoji: '🚪', title: 'Kapıdan girişinden gününü anlar.', subtitle: 'Daha "merhaba" bile demedin.' },
      { emoji: '🧺', title: 'Cebindekini çamaşırdan öğrenir.', subtitle: 'Hiçbir sır makineden kurtulmaz.' },
    ],
    high: [
      { emoji: '❤️', title: 'Anne kalbi çoğunlukla haklı.', subtitle: 'Birkaç sırrın hâlâ sende.' },
      { emoji: '🩺', title: 'Hasta olduğunu sesinden anlıyor.', subtitle: 'Ama odanı hâlâ çözememiş.' },
      { emoji: '💗', title: 'Sesini duyar duymaz "bir şey mi oldu?" diyor.', subtitle: 'Birkaç detayı yine de kaçırmış.' },
      { emoji: '🍽️', title: 'Sevmediğin yemeği asla pişirmiyor.', subtitle: 'Yeni sevdiklerini henüz öğrenmemiş.' },
      { emoji: '📞', title: 'Günde bir arama eksik.', subtitle: 'Yoksa tam bilirdi.' },
      { emoji: '🧣', title: 'Üşüyeceğini senden önce biliyor.', subtitle: 'Birkaç yeni huyun kaçmış ama.' },
      { emoji: '👀', title: 'Bir bakışta canının sıkkın olduğunu görüyor.', subtitle: 'Sebebini henüz bilmiyor ama.' },
      { emoji: '📔', title: 'Seni eski defterden okuyor.', subtitle: 'Son sayfaları güncellemeli.' },
      { emoji: '🌷', title: 'Kalbinle bilir, detayda şaşar.', subtitle: 'Sevgi tam, bilgi eksik.' },
      { emoji: '🎒', title: 'Okul çağındaki seni hâlâ anlatıyor.', subtitle: 'Bugünkü seni biraz kaçırmış.' },
      { emoji: '🕰️', title: 'Kaçta kalktığını bilir.', subtitle: 'Neden kalkamadığını bilmez.' },
    ],
    mid: [
      { emoji: '📶', title: 'Anne bugün wifi’siz kalmış.', subtitle: 'Bağlantı yarıda koptu.' },
      { emoji: '📱', title: 'Telefonu bırak, biraz konuş.', subtitle: 'Yarısını bilmiş, gerisi muamma.' },
      { emoji: '🤭', title: 'Seni son güncellemede kaçırmış.', subtitle: 'Yeni sürümü tanıtman lazım.' },
      { emoji: '📞', title: 'Telefonda hep aynı üç soruyu soruyor.', subtitle: 'Gerisini bildiğini sanıyor.' },
      { emoji: '☎️', title: 'Hat çekmiyor bugün.', subtitle: 'Yeniden aramayı dene.' },
      { emoji: '🫖', title: 'Yarını bildi, seni yarım.', subtitle: 'Bir çay demleyip anlat.' },
      { emoji: '📺', title: 'Seni ara sıra izliyor gibi.', subtitle: 'Ama son bölümü kaçırmış.' },
      { emoji: '🔋', title: 'Anne şarjı yarıda kalmış.', subtitle: 'Biraz muhabbetle dolar.' },
      { emoji: '🧺', title: 'Dolabını biliyor, kafanı bilmiyor.', subtitle: 'Çamaşır tamam, gerisi eksik.' },
      { emoji: '🎵', title: 'Mırıldandığın şarkıyı biliyor.', subtitle: 'Gerisinde biraz şaşırdı.' },
      { emoji: '🛏️', title: 'Uyku saatini bilir.', subtitle: 'Rüyanı bilmiyor ama.' },
    ],
    low: [
      { emoji: '🧬', title: 'DNA testi masada duruyor.', subtitle: 'Şaka... emin olmak istersen tabii.' },
      { emoji: '📺', title: 'Dizideki karakterleri senden iyi tanıyor.', subtitle: 'Onların derdini ezberlemiş.' },
      { emoji: '👶', title: 'Hâlâ 5 yaşında sanıyor.', subtitle: 'Büyüdüğünü nazikçe hatırlat.' },
      { emoji: '🗺️', title: 'Seni yeniden keşfe çıkmış.', subtitle: 'Kaşif ruhu güzel de...' },
      { emoji: '📼', title: 'Aklındaki sen eski kaset.', subtitle: 'Güncelleme zamanı.' },
      { emoji: '📰', title: 'Seni sosyal medyadan takip ediyor.', subtitle: 'Konuşsanız çok daha fazlasını öğrenecek.' },
      { emoji: '📭', title: 'Mesajını almamış gibi.', subtitle: 'Seni yeniden tanıtman lazım.' },
      { emoji: '👯', title: 'Arkadaşlarının adını karıştırıyor.', subtitle: 'Hepsine "o kız/o oğlan" diyor.' },
      { emoji: '🥗', title: 'Sevmediğin yemeği hâlâ pişiriyor.', subtitle: '"Ama sen bunu severdin" diyor.' },
      { emoji: '👗', title: 'Sana hâlâ 3 beden büyük alıyor.', subtitle: 'Aklındaki sen daha küçük.' },
      { emoji: '🗣️', title: 'Seni komşuya yanlış anlatıyor.', subtitle: 'Bambaşka birini tarif ediyor.' },
    ],
  },
  baba: {
    perfect: [
      { emoji: '🕵️', title: 'Az konuştu, çok bildi.', subtitle: 'Baba sessizliği aldatmasın.' },
      { emoji: '🎯', title: '12’den, hem de gözü kapalı.', subtitle: 'Baba içgüdüsü GPS gibi.' },
      { emoji: '🦅', title: 'Kartal baba devrede.', subtitle: 'Uzaktan bile tarıyor seni.' },
      { emoji: '💸', title: 'Para isteyeceğini yüzünden anlıyor.', subtitle: 'Sen ağzını açmadan cüzdanı çıkarmış.' },
      { emoji: '🧰', title: 'Seni alet çantası gibi biliyor.', subtitle: 'Her vidanın yerini bilir.' },
      { emoji: '📞', title: '"İyiyim" dediğinde inanmıyor.', subtitle: 'Sesinden her şeyi çözüyor.' },
      { emoji: '💡', title: 'Işığı açık unuttuğunu bilir.', subtitle: 'Seni senden iyi tanıyor.' },
      { emoji: '🔦', title: 'Gece kaçta geldiğini duymadan bilir.', subtitle: 'Uyuyor gibi yapıyordu sadece.' },
      { emoji: '🎓', title: 'Neyi başaracağını senden önce görmüş.', subtitle: 'Sessizce hep inanmış.' },
      { emoji: '🚗', title: 'Arabada tek bakışta anlıyor.', subtitle: 'Konuşmaya bile gerek yok.' },
      { emoji: '🤝', title: 'Söylemez ama her şeyi bilir.', subtitle: 'Baba tarzı sevgi tam olarak bu.' },
      { emoji: '🧭', title: 'Yolunu senden iyi biliyor.', subtitle: 'Navigasyona ihtiyacı yok.' },
    ],
    high: [
      { emoji: '🫡', title: 'Baba radarı iyi çekiyor.', subtitle: 'Birkaç detay reklam arasında kaçmış.' },
      { emoji: '🚗', title: 'Yol boyu seni anlatabilir.', subtitle: 'Ama son çıkışı kaçırdı.' },
      { emoji: '☕', title: 'Bir çay eşliğinde tam olur.', subtitle: 'Şu an azıcık eksik.' },
      { emoji: '🧭', title: 'Yönü doğru, virajı kaçırdı.', subtitle: 'Neredeyse tam isabet.' },
      { emoji: '📺', title: 'Maçtan başını kaldırıp bildi.', subtitle: 'Bir iki soruda gol yedi.' },
      { emoji: '🛏️', title: 'Kaçta uyuduğunu bile biliyor.', subtitle: 'Birkaç detay gözünden kaçmış.' },
      { emoji: '🗝️', title: 'Kapıların çoğunu açtı.', subtitle: 'Bir iki oda kilitli kaldı.' },
      { emoji: '🤫', title: 'Anneme söylemediklerini biliyor.', subtitle: 'Bir iki tanesini kaçırmış ama.' },
      { emoji: '🧥', title: 'Üşüyeceğin günü önceden biliyor.', subtitle: 'Bir iki yeni huyunu kaçırmış.' },
      { emoji: '🎂', title: 'Doğum gününü hiç unutmuyor.', subtitle: 'Kaç yaşına girdiğini karıştırıyor ama.' },
      { emoji: '🧢', title: 'Seni iyi tanıyor.', subtitle: 'Yeni huylarını henüz görmemiş.' },
    ],
    mid: [
      { emoji: '🔧', title: 'Bozulan her şeyi tamir eder, seni çözemedi.', subtitle: 'Bu sefer alet işe yaramadı.' },
      { emoji: '🤍', title: 'İyi olduğunu sanıyor, hiç sormuyor.', subtitle: 'Bir sorsa çoğunu bilecek.' },
      { emoji: '👟', title: 'Ayakkabı numaranı bilir.', subtitle: 'Hayalini hiç sormamış ama.' },
      { emoji: '📼', title: 'Aklındaki sen biraz eski.', subtitle: 'Güncelleme gerekiyor.' },
      { emoji: '📺', title: 'Maç varken sorulmuş gibi cevapladı.', subtitle: 'Gözü tam sende değildi.' },
      { emoji: '🎧', title: 'Ne dinlediğini hiç anlamıyor.', subtitle: 'Gerisini gayet iyi biliyor ama.' },
      { emoji: '💬', title: 'Sohbeti hep aynı soruyla açıyor.', subtitle: 'Derine inse çoğunu bilecek.' },
      { emoji: '📱', title: 'Seni "geldin mi, yedin mi?" kadar biliyor.', subtitle: 'Gerisi için sohbet lazım.' },
      { emoji: '📰', title: 'Manşetini okumuş, haberini geçmiş.', subtitle: 'Biraz detaya insin.' },
      { emoji: '💼', title: 'Ne iş yaptığını tam bilmiyor.', subtitle: 'Ama herkese övünerek anlatıyor.' },
      { emoji: '📸', title: 'Seni eski fotoğraftan tanıyor.', subtitle: 'Güncel hali biraz eksik.' },
    ],
    low: [
      { emoji: '😂', title: 'Seni hâlâ ilkokul çocuğu sanıyor.', subtitle: 'Büyüdüğünü resmen duyur.' },
      { emoji: '🤷', title: 'Baba pas geçti.', subtitle: 'Kalbi doğru yerde, bilgi eksik.' },
      { emoji: '📇', title: 'Arkadaşlarının adını bilmiyor.', subtitle: 'Hayatının yarısı ona kapalı.' },
      { emoji: '🧩', title: 'Seni parça parça biliyor.', subtitle: 'Resmin tamamı eksik.' },
      { emoji: '🤐', title: 'Az konuştu, seni de az tanıdı.', subtitle: 'Biraz muhabbet iyi gelir.' },
      { emoji: '👔', title: 'Seni hâlâ çocukluk halinle biliyor.', subtitle: 'Büyüdüğünü bir hatırlat.' },
      { emoji: '🚪', title: 'Seni "hoş geldin" kadar tanıyor.', subtitle: 'Bir sofra sohbeti şart.' },
      { emoji: '🪑', title: 'Aynı sofrada oturup tanışmamışsınız.', subtitle: 'Bir muhabbet şart.' },
      { emoji: '📵', title: 'Numaranı bilir, seni bilmez.', subtitle: 'Arayıp bir konuşun.' },
      { emoji: '🧳', title: 'Aklındaki sen yıllar önce kalmış.', subtitle: 'Ciddi bir güncelleme lazım.' },
      { emoji: '🎁', title: 'Hediyeni hep tahminle alıyor.', subtitle: 'Ve hep ıskalıyor.' },
    ],
  },
  bff: {
    perfect: [
      { emoji: '🫀', title: 'Böbrek listesinde ilk sıradasın.', subtitle: 'Bu dostluk noter onaylı.' },
      { emoji: '🧬', title: 'Doğumhanede karışmışsınız.', subtitle: 'Bunu ancak ikiz bilir.' },
      { emoji: '🔥', title: 'Ruh ikizi tescillendi.', subtitle: 'Sırların onda kasada.' },
      { emoji: '🫂', title: 'Seni ezbere, hem de akapella biliyor.', subtitle: 'Efsane kanka çıktı.' },
      { emoji: '📿', title: 'Kanka değil, kader ortağı.', subtitle: 'Bu bağ kopmaz.' },
      { emoji: '🕵️', title: 'Bütün sırlarının bekçisi.', subtitle: 'Devlet sırrı gibi saklıyor.' },
      { emoji: '📞', title: 'Gece 3’ün ilk numarası.', subtitle: 'Seni ezbere arıyor.' },
      { emoji: '🔐', title: 'Sırların onda çelik kasada.', subtitle: 'Şifreyi bile unutmuş, açılmıyor.' },
      { emoji: '🪞', title: 'Aynan gibi seni yansıtıyor.', subtitle: 'Bu dostluk tescilli.' },
      { emoji: '🍟', title: 'Patatesini paylaşmadan bilir.', subtitle: 'Bu dostluk mühürlü.' },
      { emoji: '😐', title: 'Bakışından her şeyi anlıyor.', subtitle: 'Konuşmaya gerek bile kalmıyor.' },
      { emoji: '🚨', title: 'Kötü kararını önceden görüyor.', subtitle: '"Yapma" demişti, dinlemedin.' },
    ],
    high: [
      { emoji: '💛', title: 'Gerçek dost çıktı.', subtitle: 'Bir iki sırrını es geçmiş.' },
      { emoji: '😎', title: 'Sağlam kanka.', subtitle: 'Birkaç soruda "ya bu neydi" demiş.' },
      { emoji: '🍻', title: 'Dostluk güzel demlenmiş.', subtitle: 'Şekeri az ama içilir.' },
      { emoji: '🤝', title: 'Sağlam ekip.', subtitle: 'Bir iki soru tökezletti.' },
      { emoji: '📸', title: 'Seni iyi kadrajlıyor.', subtitle: 'Birkaç kare bulanık çıkmış.' },
      { emoji: '🧩', title: 'Neredeyse tam çözmüş.', subtitle: 'Bir iki parça koltuk altında.' },
      { emoji: '☕', title: 'Bir kahvede tamamlanır.', subtitle: 'Şu an azıcık eksik.' },
      { emoji: '🎧', title: 'Aynı frekanstasınız.', subtitle: 'Nadiren parazit giriyor.' },
      { emoji: '🤙', title: 'Sağlam kanka enerjisi.', subtitle: 'Birkaç detay atlamış.' },
      { emoji: '🎤', title: 'Şarkını biliyor.', subtitle: 'Ama sözlerini karıştırıyor.' },
      { emoji: '🍿', title: 'Film zevkini bildi.', subtitle: 'Finali tahmin edemedi ama.' },
    ],
    mid: [
      { emoji: '😬', title: 'Dostluk servise girmiş.', subtitle: 'Bir buluşma bakım yapar.' },
      { emoji: '📆', title: 'Görüşmeyeli epey olmuş.', subtitle: 'Ancak yarısını tutturdu.' },
      { emoji: '🎂', title: 'Doğum gününü Instagram hatırlatıyor.', subtitle: 'Gerisini de oradan öğreniyor.' },
      { emoji: '📉', title: 'Dostluk borsası düşüşte.', subtitle: 'Bir hafta sonu alım yapın.' },
      { emoji: '🧃', title: 'Dostluk biraz sulanmış.', subtitle: 'Taze kan lazım.' },
      { emoji: '📻', title: 'Sinyal cızırtılı geliyor.', subtitle: 'Anteni birlikte oynatın.' },
      { emoji: '🍟', title: 'Ne yediğini biliyor, ne düşündüğünü değil.', subtitle: 'Menü ezberde, sen değilsin.' },
      { emoji: '💬', title: 'Son mesajlaşmanıza bakma, utanırsın.', subtitle: 'Yine de yarısını bildi.' },
      { emoji: '🎭', title: 'Dışarıdan kanka, detayda yabancı.', subtitle: 'Biraz derine insin.' },
      { emoji: '🪫', title: 'Dostluk şarjı azalmış.', subtitle: 'Bir buluşma tam doldurur.' },
      { emoji: '🧭', title: 'Yönünü bildi, huyunu bilmedi.', subtitle: 'Yarı yolda kaldı.' },
    ],
    low: [
      { emoji: '😂', title: 'Story izliyor ama tanımıyor.', subtitle: 'Klasik "izleyen kanka".' },
      { emoji: '👋', title: '"Naber" arkadaşı seviyesi.', subtitle: 'Tanışma faslı sizi bekliyor.' },
      { emoji: '🫥', title: 'Bu kanka ismini karıştırıyor olabilir.', subtitle: 'Yeni baştan tanışın hadi.' },
      { emoji: '📇', title: 'Rehberde var, kalpte taslak.', subtitle: 'Şaka... belki.' },
      { emoji: '🧊', title: 'Bu dostluk buzlukta unutulmuş.', subtitle: 'Çözülmesi lazım.' },
      { emoji: '👻', title: 'Ortalıkta yok, kalpte hayalet.', subtitle: 'Yeniden tanışma vakti.' },
      { emoji: '🎭', title: 'Seni tahmin etmeye çalışmış.', subtitle: 'Ama rolü hiç ezberlememiş.' },
      { emoji: '🥶', title: 'Bu dostluk açık havada kalmış.', subtitle: 'Isıtmak lazım.' },
      { emoji: '📲', title: 'Sadece doğum gününde yazan tip.', subtitle: 'O da hatırlatma gelince.' },
      { emoji: '🛒', title: 'Seni market listesi gibi bilmiş.', subtitle: 'Üstelik listeyi evde bırakmış.' },
      { emoji: '🚏', title: 'Aynı durakta bekleyen iki yabancı.', subtitle: 'Sohbet başlasın artık.' },
    ],
  },
  kardes: {
    perfect: [
      { emoji: '🎞️', title: 'Bütün rezalet arşivin onda.', subtitle: 'Sakın kızdırma, hepsini biliyor.' },
      { emoji: '🧬', title: 'Aynı evin çıktısı belli.', subtitle: 'Ezbere biliyor, üstelik zorla.' },
      { emoji: '🤜', title: 'Kavga eder ama şifreni bilir.', subtitle: 'Kardeşlik tam olarak bu.' },
      { emoji: '📂', title: 'Elinde tam dosyan var.', subtitle: 'İstihbarat teşkilatı kıskanır.' },
      { emoji: '🗃️', title: 'Çocukluğunun canlı arşivi.', subtitle: 'Her sırrı klasörlemiş.' },
      { emoji: '🃏', title: 'Bütün kozların onda.', subtitle: 'Aman arayı bozma.' },
      { emoji: '🎮', title: 'Aynı ekranda büyümüşsünüz.', subtitle: 'Hamleni önceden biliyor.' },
      { emoji: '🔓', title: 'Bütün şifrelerini biliyor.', subtitle: 'Hatta senin bildiğinden fazlasını.' },
      { emoji: '🛎️', title: 'Rezalet arşivi 7/24 açık.', subtitle: 'Aranı bozma, hepsi kayıtlı.' },
      { emoji: '🍫', title: 'Sakladığın çikolatanın yerini bilir.', subtitle: 'Hiçbir zula ondan kaçmaz.' },
      { emoji: '🗣️', title: '"Anneme söylerim" silahı hazır.', subtitle: 'Çünkü gerçekten her şeyi biliyor.' },
      { emoji: '👀', title: 'Yalanını gözünden anlıyor.', subtitle: 'Aynı evde büyümenin bedeli.' },
    ],
    high: [
      { emoji: '👊', title: 'Sağlam kardeş.', subtitle: 'Birkaç sırrın hâlâ sende, şanslısın.' },
      { emoji: '🛋️', title: 'Aynı kanepede büyümüşsünüz.', subtitle: 'Ufak detaylar kaçmış.' },
      { emoji: '😌', title: 'İyi tanıyor.', subtitle: 'Arşivde birkaç boşluk var.' },
      { emoji: '🍕', title: 'Son dilimi paylaşacak kadar biliyor.', subtitle: 'Yani neredeyse tam.' },
      { emoji: '📼', title: 'Çocukluk rezaletlerini tek tek sayabilir.', subtitle: 'Bugünkü halini biraz kaçırmış.' },
      { emoji: '🤼', title: 'Kavga eder ama tanır.', subtitle: 'Birkaç soruda ringde kaldı.' },
      { emoji: '🧦', title: 'Çoraplarını karıştıracak kadar biliyor.', subtitle: 'Yani neredeyse tam.' },
      { emoji: '🎯', title: 'İsabet iyi ama tam değil.', subtitle: 'Son atışta savruldu.' },
      { emoji: '🍜', title: 'Sofrada nasılsın biliyor, dışarıda bilmiyor.', subtitle: 'Ev seni, dünya başkasını tanıyor.' },
      { emoji: '🎧', title: 'Müzik zevkini bildi.', subtitle: 'Gerisinde biraz karıştı.' },
      { emoji: '🚪', title: 'Odana girmeden ne yaptığını bilir.', subtitle: 'Birkaç detay kaçmış ama.' },
    ],
    mid: [
      { emoji: '🪐', title: 'Aynı ev, ayrı gezegen.', subtitle: 'Ancak yarısını bildi.' },
      { emoji: '🚪', title: 'Oda kapıları fazla kapalı kalmış.', subtitle: 'Bir oyun gecesi şart.' },
      { emoji: '📶', title: 'Kardeş sinyali zayıf.', subtitle: 'Aynı evde misiniz cidden?' },
      { emoji: '🚪', title: 'Kapıyı çalmayı öğrenmiş, seni öğrenmemiş.', subtitle: 'İçeride kim var bilmiyor.' },
      { emoji: '🍽️', title: 'Sofrada tanıdık, gerisi muamma.', subtitle: 'Biraz vakit geçirin.' },
      { emoji: '🎮', title: 'Oyunda takım arkadaşı, hayatta yabancı.', subtitle: 'Aynı evde iki ayrı sekme.' },
      { emoji: '🧦', title: 'Çorabını bulur, derdini bulamaz.', subtitle: 'Ev bilgisi tam, sen eksiksin.' },
      { emoji: '📺', title: 'Aynı diziyi izlemişsiniz.', subtitle: 'Ama aynı evde yaşamamış gibisiniz.' },
      { emoji: '🔇', title: 'Kulaklık takıp büyümüşsünüz.', subtitle: 'Ancak yarısını duymuş.' },
      { emoji: '🧺', title: 'Çamaşırlarınız karışmış.', subtitle: 'Ama hayatlarınız karışmamış.' },
      { emoji: '🚗', title: 'Arka koltuğu paylaştınız.', subtitle: 'Hayatı pek paylaşmamışsınız.' },
    ],
    low: [
      { emoji: '📸', title: 'Seni en son çocukluk fotoğrafından hatırlıyor.', subtitle: 'Güncelleme hiç gelmemiş.' },
      { emoji: '🧾', title: 'Nüfus kâğıdı dışında kanıt yok.', subtitle: 'Biraz takılın artık.' },
      { emoji: '📦', title: 'Seni kargo sanmış.', subtitle: 'Tanıdık geldi ama emin olamadı.' },
      { emoji: '🚪', title: 'Yıllardır kapı komşususunuz sadece.', subtitle: 'Tanışma vakti.' },
      { emoji: '🛸', title: 'Aynı evde ama ayrı boyutta.', subtitle: 'Işınlanıp bir tanışın.' },
      { emoji: '🎭', title: 'Seni tahmin etti, tanıyamadı.', subtitle: 'Kardeşlik teoride kalmış.' },
      { emoji: '🏠', title: 'Aynı çatı, sıfır muhabbet.', subtitle: 'Bir oyun gecesi kurun.' },
      { emoji: '📵', title: 'Sadece wifi’yi paylaşıyorsunuz.', subtitle: 'Gerisi tamamen kopuk.' },
      { emoji: '🍽️', title: 'Sofrada karşı karşıya.', subtitle: 'Hayatta ise yan yana değil.' },
      { emoji: '🧊', title: 'Kardeşlik dondurucuda unutulmuş.', subtitle: 'Çözülmeye ihtiyacı var.' },
      { emoji: '🤨', title: 'Kardeş olduğunuza emin misiniz?', subtitle: 'Kanıtlar biraz zayıf.' },
    ],
  },
  eski: {
    perfect: [
      { emoji: '🔁', title: 'Silmemiş, hâlâ replay’de.', subtitle: 'Bu detaylar tesadüf olamaz.' },
      { emoji: '😶', title: 'Seni hâlâ ezbere biliyor.', subtitle: 'Kapatılmamış sekmesin resmen.' },
      { emoji: '📼', title: 'Arşiv HD kalitede duruyor.', subtitle: 'Format bile atmamış.' },
      { emoji: '💭', title: 'Aklından hiç çıkmamışsın.', subtitle: 'Yorum yapmıyorum, o yapsın.' },
      { emoji: '🕰️', title: 'Geçmiş taze kalmış.', subtitle: 'Zaman durmuş sanki.' },
      { emoji: '📌', title: 'Hafızada hâlâ sabitli.', subtitle: 'Kaydırmamış bile.' },
      { emoji: '💾', title: 'Seni buluta yedeklemiş.', subtitle: 'Silmek elinden gelmemiş.' },
      { emoji: '🔖', title: 'O sayfayı ayraçla işaretlemiş.', subtitle: 'Kitabı kapatamamış.' },
      { emoji: '🎬', title: 'Anıları hâlâ tekrar izliyor.', subtitle: 'Final sahnesini ezbere biliyor.' },
      { emoji: '🌙', title: 'Gece 2’de aklına gelen kişisin.', subtitle: 'Bu detaylar öyle unutulmaz.' },
      { emoji: '🎧', title: 'Şarkınız hâlâ çalma listesinde.', subtitle: 'Silmeye eli varmamış.' },
      { emoji: '📱', title: 'Numaranı silmiş ama ezberden gitmemiş.', subtitle: 'Bir yerlerde hâlâ kayıtlı.' },
    ],
    high: [
      { emoji: '🙂', title: 'Arşiv büyük oranda sağlam.', subtitle: 'Birkaç anı soluklaşmış.' },
      { emoji: '🍂', title: 'Hâlâ hatırlıyor ama soluk.', subtitle: 'Üstüne biraz toz konmuş.' },
      { emoji: '📮', title: 'Eski mektuplar duruyor.', subtitle: 'Mürekkep biraz solmuş.' },
      { emoji: '📷', title: 'Anılar hâlâ net.', subtitle: 'Birkaç kare bulanık.' },
      { emoji: '🕯️', title: 'Anı hâlâ yanıyor ama kısık.', subtitle: 'Birkaç detay is tutmuş.' },
      { emoji: '🎞️', title: 'Filmin çoğu duruyor.', subtitle: 'Birkaç sahne kesilmiş.' },
      { emoji: '📻', title: 'Eski şarkınız hâlâ aklında.', subtitle: 'Ama sözlerin yarısını unutmuş.' },
      { emoji: '🧭', title: 'Seni hâlâ iyi biliyor.', subtitle: 'Ama bazı yolları unutmuş.' },
      { emoji: '💌', title: 'Eski mesajları silmemiş.', subtitle: 'Birkaçını yanlış hatırlıyor ama.' },
      { emoji: '🕶️', title: 'Seni tanıyor ama biraz bulanık.', subtitle: 'Zaman filtresi devrede.' },
      { emoji: '🪞', title: 'Hâlâ net bir yansıma.', subtitle: 'Kenarları biraz solmuş.' },
    ],
    mid: [
      { emoji: '🗑️', title: 'Sildiklerini gerçekten silmiş.', subtitle: 'Hatırladıkları da pek doğru değil.' },
      { emoji: '🌫️', title: 'Puslu hatırlıyor.', subtitle: 'Zaman işini yapmış.' },
      { emoji: '🧽', title: 'Bir kısmını silmiş, kalanı duruyor.', subtitle: 'İşte tam bir "eski".' },
      { emoji: '📻', title: 'Anılar parazitli çekiyor.', subtitle: 'Net değil ama var.' },
      { emoji: '📑', title: 'Bazı sayfalar yırtık.', subtitle: 'Hikâye eksik ama okunuyor.' },
      { emoji: '⏳', title: 'Kum yarıya inmiş.', subtitle: 'Hatıra yavaşça eriyor.' },
      { emoji: '🪫', title: 'Anı şarjı yarıda.', subtitle: 'Yakında kapanabilir.' },
      { emoji: '🎞️', title: 'Anlattığı hikâyedeki olaylar başkasına ait.', subtitle: 'Karıştırmış olabilir.' },
      { emoji: '🚪', title: 'Kapıyı kapatmış ama tam değil.', subtitle: 'Bir aralık kalmış.' },
      { emoji: '🧠', title: 'Hatırlamadığı yerleri kendi doldurmuş.', subtitle: 'Uydurduğu kısım daha iyiydi.' },
      { emoji: '📉', title: 'Hatıralar değer kaybetmiş.', subtitle: 'Ama tamamen bitmemiş.' },
    ],
    low: [
      { emoji: '😂', title: 'Eski olmakta haklıymış.', subtitle: 'Yeniden tanışmanıza gerek yok.' },
      { emoji: '🗑️', title: 'Arşivi komple boşaltmış.', subtitle: 'Temiz başlangıç, tebrikler.' },
      { emoji: '❓', title: '"Bu kim, ne zaman oldu?" modunda.', subtitle: 'Geçmiş tamamen geçmişte kalmış.' },
      { emoji: '🧹', title: 'Hafızayı süpürmüş.', subtitle: 'Tozunu bile bırakmamış.' },
      { emoji: '📴', title: 'O sekme çoktan kapanmış.', subtitle: 'Bir daha da açılmıyor.' },
      { emoji: '🧯', title: 'O ateşi çoktan söndürmüş.', subtitle: 'Duman bile kalmamış.' },
      { emoji: '🚪', title: 'Kapıyı çekip gitmiş.', subtitle: 'Anahtarı da atmış.' },
      { emoji: '🫙', title: 'Hatıra kavanozu bomboş.', subtitle: 'Kapağını bile açmamış.' },
      { emoji: '🆕', title: 'Seni sıfırlayıp devam etmiş.', subtitle: 'Fabrika ayarlarına dönmüş.' },
      { emoji: '🌑', title: 'Adını duysa tanımaz.', subtitle: 'Zaman gerçekten geçmiş.' },
      { emoji: '🧊', title: 'O defter çoktan kapanmış.', subtitle: 'Üstelik dondurulmuş.' },
    ],
  },
  anonim: {
    perfect: [
      { emoji: '🕵️', title: 'Seni ürkütücü derecede biliyor.', subtitle: 'Yakın çevrenden, garanti.' },
      { emoji: '🔍', title: 'Bu kadar isabet tesadüf değil.', subtitle: 'Çok yakın biri... kim acaba?' },
      { emoji: '👀', title: 'Gizli hayranın ödevini yapmış.', subtitle: 'Seni ezberlemiş resmen.' },
      { emoji: '🎭', title: 'Maske düşmek üzere.', subtitle: 'Seni bu kadar bilen sıradan biri değil.' },
      { emoji: '🧩', title: 'Seni tamamen çözmüş.', subtitle: 'Bu profil çok tanıdık geliyor.' },
      { emoji: '📡', title: 'Frekansına kilitlenmiş.', subtitle: 'Bu takip amatör işi değil.' },
      { emoji: '🪬', title: 'Seni içeriden biliyor.', subtitle: 'Bu yakınlık tesadüf değil.' },
      { emoji: '🧠', title: 'Aklını okumuş resmen.', subtitle: 'Kim bu telepatik kişi?' },
      { emoji: '🎯', title: 'Her ok tam ortadan.', subtitle: 'Bu isabet çok tanıdık geliyor.' },
      { emoji: '🤫', title: 'Bu kişi çok yakınında.', subtitle: 'Belki de tam tahmin ettiğin kişi.' },
      { emoji: '🔗', title: 'Aranızda görünmez bir bağ var.', subtitle: 'Bu tanıma hiç sıradan değil.' },
      { emoji: '🗝️', title: 'Kilidini açacak anahtar onda.', subtitle: 'Kim olduğunu bir düşün.' },
    ],
    high: [
      { emoji: '👀', title: 'Sandığından yakın biri.', subtitle: 'Tahmin edebilecek misin?' },
      { emoji: '🧩', title: 'Parçalar birleşiyor.', subtitle: 'Neredeyse çözmüş seni.' },
      { emoji: '🤔', title: 'Seni iyi izlemiş.', subtitle: 'Birkaç detay gözünden kaçmış.' },
      { emoji: '🔦', title: 'Karanlıkta bile seni buluyor.', subtitle: 'Birkaç köşe eksik kalmış.' },
      { emoji: '👣', title: 'İzini iyi sürmüş.', subtitle: 'Son birkaç adımda kaybetti.' },
      { emoji: '🔭', title: 'Uzaktan bile seni görüyor.', subtitle: 'Birkaç detay bulanık kalmış.' },
      { emoji: '🕯️', title: 'Karanlığı iyi aydınlatmış.', subtitle: 'Bir köşe gölgede kaldı.' },
      { emoji: '🧲', title: 'Sana çok yakın duruyor.', subtitle: 'Bir iki soruda uzaklaştı.' },
      { emoji: '🎣', title: 'İpuçlarını iyi yakalamış.', subtitle: 'Birkaçı elinden kaçtı.' },
      { emoji: '📖', title: 'Seni okumuş.', subtitle: 'Ama son sayfayı görmemiş.' },
      { emoji: '🚪', title: 'Kapıya çok yaklaşmış.', subtitle: 'Anahtarı bulamadı sadece.' },
    ],
    mid: [
      { emoji: '🕵️', title: 'Seni tanıyor ama nereden belli değil.', subtitle: 'Asıl soru da bu.' },
      { emoji: '🎭', title: 'Kalabalıktaki halini tanımış.', subtitle: 'Yalnızkini hiç görmemiş.' },
      { emoji: '🎭', title: 'Ne tam tanıdık ne tam meçhul.', subtitle: 'Gizem sürüyor.' },
      { emoji: '🌫️', title: 'Silueti görüyor, yüzü seçemiyor.', subtitle: 'Kim bu acaba?' },
      { emoji: '🔮', title: 'Tahminlerinin çoğu mantıklıydı.', subtitle: 'Sen o kadar mantıklı değilsin.' },
      { emoji: '🧭', title: 'Yönünü buldu, seni bulamadı.', subtitle: 'Ortalarda bir yerde.' },
      { emoji: '🗿', title: 'Doğru insanı tarif etti, yanlış detaylarla.', subtitle: 'Yakın ama tam değil.' },
      { emoji: '📻', title: 'Seni ara frekanstan yakalıyor.', subtitle: 'Net değil, cızırtılı.' },
      { emoji: '🎈', title: 'Bazı ipuçlarını yakaladı.', subtitle: 'Gerisi havaya uçtu.' },
      { emoji: '🪞', title: 'Bulanık bir yansıma görüyor.', subtitle: 'Kim olduğu hâlâ muamma.' },
      { emoji: '🧊', title: 'Buzun üstünü görmüş.', subtitle: 'Ama altını hiç bilmiyor.' },
    ],
    low: [
      { emoji: '😂', title: 'Seni Google’dan araştırsa daha iyiydi.', subtitle: 'En azından denedi.' },
      { emoji: '🎲', title: 'Resmen zar atmış.', subtitle: 'Tanıdık biri değil galiba.' },
      { emoji: '🫥', title: 'Kimliği de tahmini de karanlık.', subtitle: 'Gizem ikiye katlandı.' },
      { emoji: '🌑', title: 'Tam bir yabancı enerjisi.', subtitle: 'Seni yeni keşfediyor.' },
      { emoji: '🎰', title: 'Kolu çekmiş, şansa bırakmış.', subtitle: 'Tanıdık biri değil galiba.' },
      { emoji: '🛰️', title: 'Sinyal bambaşka yöne gitmiş.', subtitle: 'Seni tamamen ıskalamış.' },
      { emoji: '❔', title: 'Ne o seni biliyor, ne sen onu.', subtitle: 'İki taraf da tamamen meçhul.' },
      { emoji: '🙃', title: 'Bu kişi seni hiç tanımıyor.', subtitle: 'Yanlış numara olabilir.' },
      { emoji: '🕳️', title: 'Karanlığa ateş etmiş.', subtitle: 'Hiçbiri tutmadı.' },
      { emoji: '🗺️', title: 'Seni bambaşka bir haritada aramış.', subtitle: 'Yanlış kıta bile olabilir.' },
      { emoji: '🤖', title: 'Rastgele cevap makinesi gibi.', subtitle: 'Tanışıklık sıfır.' },
    ],
  },
};

const RESULTS = LANG === 'tr' ? RESULTS_TR : RESULTS_EN;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ROTASYON — saf rastgele seçim (eski hâli) aynı cümleyi üst üste
// gösterebiliyordu. Bunun yerine her (kategori+bant) için KARIŞTIRILMIŞ bir
// sıra tutulur ve baştan sona gezilir:
//  • Havuz bitmeden hiçbir cümle tekrar etmez (11 sonuç = 11 farklı kart).
//  • Karıştırma her cihazda/oturumda bağımsız olduğu için iki cihaz asla
//    aynı sırayı görmez.
//  • Yeni tur başlarken ilk cümle, önceki turun sonuncusuyla aynıysa sona
//    atılır — tur sınırında da arka arkaya tekrar olmaz.
const queues: Record<string, number[]> = {};
const lastShown: Record<string, number> = {};

function nextIndex(key: string, len: number): number {
  let q = queues[key];
  if (!q || q.length === 0) {
    q = shuffle(Array.from({ length: len }, (_, i) => i));
    if (len > 1 && q[0] === lastShown[key]) q.push(q.shift() as number);
    queues[key] = q;
  }
  const i = q.shift() as number;
  lastShown[key] = i;
  return i;
}

export function getFunnyResult(cat: CategoryId, percent: number): FunnyResult {
  const band = bandOf(percent);
  const pool = RESULTS[cat][band];
  return pool[nextIndex(`${cat}:${band}`, pool.length)];
}
