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
      { emoji: '🎼', title: 'Şarkının çoğunu ezbere biliyor.', subtitle: 'Nakaratta bir yerde şaşırdı.' },
      { emoji: '🧲', title: 'Aranızda ciddi bir çekim var.', subtitle: 'Birkaç soruda mıknatıs ters döndü.' },
      { emoji: '🎁', title: 'Hediyeyi doğru seçer, bedeni şaşırır.', subtitle: 'Niyet tam, detay eksik.' },
      { emoji: '🛋️', title: 'Kanepedeki yerini biliyor.', subtitle: 'Kumandayı hâlâ öğrenememiş.' },
    ],
    mid: [
      { emoji: '😅', title: 'İlişki idare eder.', subtitle: 'Ama telefonunu bir kontrol et.' },
      { emoji: '🎲', title: 'Yarısı sevgi, yarısı zar.', subtitle: 'İkisi de tutmuş sayılır.' },
      { emoji: '🤔', title: 'Seni tahmin ediyor, tanımıyor.', subtitle: 'İnce ama önemli fark.' },
      { emoji: '📉', title: 'Radar yağmurda kalmış.', subtitle: 'Sinyal zayıf ama var.' },
      { emoji: '🫠', title: 'Yarı âşık, yarı dalgın.', subtitle: 'Bir romantik akşam iyi gelir.' },
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
      { emoji: '🫙', title: 'Ne yediğini kavanozdan anlar.', subtitle: 'Buzdolabı ona rapor veriyor.' },
      { emoji: '📿', title: 'Duası bile sana göre ayarlı.', subtitle: 'Seni ezberden koruyor.' },
      { emoji: '📞', title: 'Sen aramadan o arıyor.', subtitle: '"İçime bir his doğdu" modu.' },
      { emoji: '🚪', title: 'Kapıdan girişinden gününü anlar.', subtitle: 'Daha "merhaba" bile demedin.' },
      { emoji: '🧺', title: 'Cebindekini çamaşırdan öğrenir.', subtitle: 'Hiçbir sır makineden kurtulmaz.' },
    ],
    high: [
      { emoji: '❤️', title: 'Anne kalbi çoğunlukla haklı.', subtitle: 'Birkaç sırrın hâlâ sende.' },
      { emoji: '🍲', title: 'Mutfaktan seni okuyor.', subtitle: 'Ama odanı hâlâ çözememiş.' },
      { emoji: '😌', title: 'Gayet iyi biliyor.', subtitle: '"Sen küçükken..." diye başlayabilir.' },
      { emoji: '🧶', title: 'Çoğunu örmüş, ucu açık.', subtitle: 'Bir aile yemeği tamamlar.' },
      { emoji: '📞', title: 'Günde bir arama eksik.', subtitle: 'Yoksa tam bilirdi.' },
      { emoji: '🧣', title: 'Üşürsün diye seni ezbere biliyor.', subtitle: 'Birkaç yeni huyun kaçmış.' },
      { emoji: '🥄', title: 'Kaşığından modunu anlıyor.', subtitle: 'Yeni sevdiklerini not almamış.' },
      { emoji: '📔', title: 'Seni eski defterden okuyor.', subtitle: 'Son sayfaları güncellemeli.' },
      { emoji: '🌷', title: 'Kalbinle bilir, detayda şaşar.', subtitle: 'Sevgi tam, bilgi eksik.' },
      { emoji: '🎒', title: 'Okul çağını ezbere biliyor.', subtitle: 'Bugünkü seni biraz kaçırmış.' },
      { emoji: '🕰️', title: 'Kaçta kalktığını bilir.', subtitle: 'Neden kalkamadığını bilmez.' },
    ],
    mid: [
      { emoji: '📶', title: 'Anne bugün wifi’siz kalmış.', subtitle: 'Bağlantı yarıda koptu.' },
      { emoji: '📱', title: 'Telefonu bırak, biraz konuş.', subtitle: 'Yarısını bilmiş, gerisi muamma.' },
      { emoji: '🤭', title: 'Seni son güncellemede kaçırmış.', subtitle: 'Yeni sürümü tanıtman lazım.' },
      { emoji: '🧩', title: 'Yarısı tanıdık, yarısı yabancı.', subtitle: 'Sohbet güncellemesi şart.' },
      { emoji: '☎️', title: 'Hat çekmiyor bugün.', subtitle: 'Yeniden aramayı dene.' },
      { emoji: '🫖', title: 'Yarını bildi, seni yarım.', subtitle: 'Bir çay demleyip anlat.' },
      { emoji: '📺', title: 'Seni ara sıra izliyor gibi.', subtitle: 'Ama son bölümü kaçırmış.' },
      { emoji: '🔋', title: 'Anne şarjı yarıda kalmış.', subtitle: 'Biraz muhabbetle dolar.' },
      { emoji: '🌫️', title: 'Yarısı net, yarısı sisli.', subtitle: 'Güncelleme zamanı geldi.' },
      { emoji: '🥘', title: 'Sevdiğin yemeği bildi.', subtitle: 'Gerisinde biraz şaşırdı.' },
      { emoji: '🛏️', title: 'Uyku saatini bilir.', subtitle: 'Rüyanı bilmiyor ama.' },
    ],
    low: [
      { emoji: '🧬', title: 'DNA testi masada duruyor.', subtitle: 'Şaka... emin olmak istersen tabii.' },
      { emoji: '😂', title: 'Komşu teyze seni daha iyi biliyor.', subtitle: 'O da story’den takip ediyor.' },
      { emoji: '👶', title: 'Hâlâ 5 yaşında sanıyor.', subtitle: 'Büyüdüğünü nazikçe hatırlat.' },
      { emoji: '🗺️', title: 'Seni yeniden keşfe çıkmış.', subtitle: 'Kaşif ruhu güzel de...' },
      { emoji: '📼', title: 'Aklındaki sen eski kaset.', subtitle: 'Güncelleme zamanı.' },
      { emoji: '🍼', title: 'Zihninde hâlâ bebeksin.', subtitle: 'Sevimli ama gerçek dışı.' },
      { emoji: '📭', title: 'Mesajını almamış gibi.', subtitle: 'Seni yeniden tanıtman lazım.' },
      { emoji: '🛝', title: 'Hâlâ parktaki çocuk sanıyor.', subtitle: 'Büyüdün, nazikçe duyur.' },
      { emoji: '🎂', title: 'Yaşını bile şaşırabilir.', subtitle: 'Sen büyüdün, o fark etmedi.' },
      { emoji: '👗', title: 'Sana hâlâ 3 beden büyük alıyor.', subtitle: 'Aklındaki sen daha küçük.' },
      { emoji: '📚', title: 'Seni hâlâ ders çalışıyor sanıyor.', subtitle: 'Yıllar geçmiş anne!' },
    ],
  },
  baba: {
    perfect: [
      { emoji: '🕵️', title: 'Az konuştu, çok bildi.', subtitle: 'Baba sessizliği aldatmasın.' },
      { emoji: '🎯', title: '12’den, hem de gözü kapalı.', subtitle: 'Baba içgüdüsü GPS gibi.' },
      { emoji: '🦅', title: 'Kartal baba devrede.', subtitle: 'Uzaktan bile tarıyor seni.' },
      { emoji: '📺', title: 'Maçtan başını kaldırmadan bildi.', subtitle: 'Efsane refleks.' },
      { emoji: '🧰', title: 'Seni alet çantası gibi biliyor.', subtitle: 'Her vidanın yerini bilir.' },
      { emoji: '📻', title: 'Frekansını ezbere biliyor.', subtitle: 'Parazit bile giremedi.' },
      { emoji: '🧱', title: 'Az laf, sağlam bilgi.', subtitle: 'Temeli seninle atmış resmen.' },
      { emoji: '🛠️', title: 'Seni çakı gibi biliyor.', subtitle: 'Her ayarını tanır.' },
      { emoji: '⚓', title: 'Sessiz ama demir gibi biliyor.', subtitle: 'Fırtınada bile şaşmaz.' },
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
      { emoji: '🔧', title: 'Çoğunu söktü, biri elinde kaldı.', subtitle: 'Neredeyse tam iş.' },
      { emoji: '🗝️', title: 'Kapıların çoğunu açtı.', subtitle: 'Bir iki oda kilitli kaldı.' },
      { emoji: '🎣', title: 'İyi olta attı.', subtitle: 'Birkaç balık elinden kaçtı.' },
      { emoji: '⚽', title: 'Doksandan bildi.', subtitle: 'Ama biri direkten döndü.' },
      { emoji: '📏', title: 'Ölçüyü doğru aldı, biraz şaştı.', subtitle: 'Marangoz değil sonuçta.' },
      { emoji: '🧢', title: 'Seni iyi tanıyor.', subtitle: 'Yeni huylarını henüz görmemiş.' },
    ],
    mid: [
      { emoji: '😅', title: 'Baba yarı yolda mola verdi.', subtitle: 'Bir çay, bir sohbet iyi gelir.' },
      { emoji: '📻', title: 'Frekansı zor buldu.', subtitle: 'Anteni birlikte oynatın.' },
      { emoji: '🪛', title: 'Yarısını söktü, yarısı duruyor.', subtitle: 'Biraz vakit lazım.' },
      { emoji: '📼', title: 'Aklındaki sen biraz eski.', subtitle: 'Güncelleme gerekiyor.' },
      { emoji: '📺', title: 'Yarısını maça, yarısını sana ayırmış.', subtitle: 'Devre arası biraz konuşun.' },
      { emoji: '🚙', title: 'Seni yarı yolda tanıdı.', subtitle: 'Kalan yolu birlikte gidin.' },
      { emoji: '🍵', title: 'Çay molasında yarını kaçırmış.', subtitle: 'Bir demli çay iyi gelir.' },
      { emoji: '📱', title: 'Seni "geldin mi, yedin mi?" kadar biliyor.', subtitle: 'Gerisi için sohbet lazım.' },
      { emoji: '📰', title: 'Manşetini okumuş, haberini geçmiş.', subtitle: 'Biraz detaya insin.' },
      { emoji: '🔌', title: 'Fişi taktı ama kanalı bulamadı.', subtitle: 'Yarı yolda kaldı.' },
      { emoji: '📸', title: 'Seni eski fotoğraftan tanıyor.', subtitle: 'Güncel hali biraz eksik.' },
    ],
    low: [
      { emoji: '😂', title: 'Seni hâlâ ilkokul çocuğu sanıyor.', subtitle: 'Büyüdüğünü resmen duyur.' },
      { emoji: '🤷', title: 'Baba pas geçti.', subtitle: 'Kalbi doğru yerde, bilgi eksik.' },
      { emoji: '📡', title: 'Sinyal babaya ulaşmamış.', subtitle: 'Anteni yükseltme vakti.' },
      { emoji: '🧩', title: 'Seni parça parça biliyor.', subtitle: 'Resmin tamamı eksik.' },
      { emoji: '🤐', title: 'Az konuştu, seni de az tanıdı.', subtitle: 'Biraz muhabbet iyi gelir.' },
      { emoji: '👔', title: 'Seni hâlâ çocukluk halinle biliyor.', subtitle: 'Büyüdüğünü bir hatırlat.' },
      { emoji: '🚪', title: 'Seni "hoş geldin" kadar tanıyor.', subtitle: 'Bir sofra sohbeti şart.' },
      { emoji: '🪑', title: 'Aynı sofrada oturup tanışmamışsınız.', subtitle: 'Bir muhabbet şart.' },
      { emoji: '📵', title: 'Numaranı bilir, seni bilmez.', subtitle: 'Arayıp bir konuşun.' },
      { emoji: '🧳', title: 'Aklındaki sen yıllar önce kalmış.', subtitle: 'Ciddi bir güncelleme lazım.' },
      { emoji: '🗿', title: 'Sessizlik bilgiye dönüşmemiş.', subtitle: 'Konuşmadan tanınmıyor.' },
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
      { emoji: '🫠', title: 'Yarı kanka, yarı yabancı.', subtitle: 'Bir kahve toparlar.' },
      { emoji: '📉', title: 'Dostluk borsası düşüşte.', subtitle: 'Bir hafta sonu alım yapın.' },
      { emoji: '🧃', title: 'Dostluk biraz sulanmış.', subtitle: 'Taze kan lazım.' },
      { emoji: '📻', title: 'Sinyal cızırtılı geliyor.', subtitle: 'Anteni birlikte oynatın.' },
      { emoji: '🚧', title: 'Yolun yarısında kalmış.', subtitle: 'Biraz emek ister.' },
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
      { emoji: '🛒', title: 'Seni market listesi gibi bilmiş.', subtitle: 'Yarısını unutmuş.' },
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
      { emoji: '📼', title: 'Çocukluğunu ezbere biliyor.', subtitle: 'Bugünkü halini biraz kaçırmış.' },
      { emoji: '🤼', title: 'Kavga eder ama tanır.', subtitle: 'Birkaç soruda ringde kaldı.' },
      { emoji: '🧦', title: 'Çoraplarını karıştıracak kadar biliyor.', subtitle: 'Yani neredeyse tam.' },
      { emoji: '🎯', title: 'İsabet iyi ama tam değil.', subtitle: 'Son atışta savruldu.' },
      { emoji: '🍜', title: 'Sofradaki halini ezbere biliyor.', subtitle: 'Dışarıdaki seni az tanıyor.' },
      { emoji: '🎧', title: 'Müzik zevkini bildi.', subtitle: 'Gerisinde biraz karıştı.' },
      { emoji: '🚪', title: 'Odana girmeden ne yaptığını bilir.', subtitle: 'Birkaç detay kaçmış ama.' },
    ],
    mid: [
      { emoji: '🪐', title: 'Aynı ev, ayrı gezegen.', subtitle: 'Ancak yarısını bildi.' },
      { emoji: '🚪', title: 'Oda kapıları fazla kapalı kalmış.', subtitle: 'Bir oyun gecesi şart.' },
      { emoji: '📶', title: 'Kardeş sinyali zayıf.', subtitle: 'Aynı evde misiniz cidden?' },
      { emoji: '🧩', title: 'Yarı tanıdık, yarı esrarengiz.', subtitle: 'Biraz muhabbet lazım.' },
      { emoji: '🍽️', title: 'Sofrada tanıdık, gerisi muamma.', subtitle: 'Biraz vakit geçirin.' },
      { emoji: '🕹️', title: 'Hamlelerinin yarısını bildi.', subtitle: 'Diğer yarısı sürpriz oldu.' },
      { emoji: '🗺️', title: 'Aynı evin yarısını keşfetmiş.', subtitle: 'Diğer yarısı bilinmez.' },
      { emoji: '📺', title: 'Aynı diziyi izlemişsiniz.', subtitle: 'Ama aynı evde yaşamamış gibisiniz.' },
      { emoji: '🔇', title: 'Kulaklık takıp büyümüşsünüz.', subtitle: 'Ancak yarısını duymuş.' },
      { emoji: '🧺', title: 'Çamaşırlarınız karışmış.', subtitle: 'Ama hayatlarınız karışmamış.' },
      { emoji: '🚗', title: 'Arka koltuğu paylaştınız.', subtitle: 'Hayatı pek paylaşmamışsınız.' },
    ],
    low: [
      { emoji: '😂', title: 'Komşunun çocuğu seni daha iyi biliyor.', subtitle: 'Aynı evde mi büyüdünüz?' },
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
      { emoji: '📱', title: 'Numaranı hâlâ ezbere biliyor.', subtitle: 'Silmiş ama ezberden gitmemiş.' },
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
      { emoji: '🙃', title: 'Yarısı silinmiş.', subtitle: 'Hafıza da ilişki gibi: yarım kalmış.' },
      { emoji: '🌫️', title: 'Puslu hatırlıyor.', subtitle: 'Zaman işini yapmış.' },
      { emoji: '🧽', title: 'Bir kısmını silmiş, kalanı duruyor.', subtitle: 'İşte tam bir "eski".' },
      { emoji: '📻', title: 'Anılar parazitli çekiyor.', subtitle: 'Net değil ama var.' },
      { emoji: '📑', title: 'Bazı sayfalar yırtık.', subtitle: 'Hikâye eksik ama okunuyor.' },
      { emoji: '⏳', title: 'Kum yarıya inmiş.', subtitle: 'Hatıra yavaşça eriyor.' },
      { emoji: '🪫', title: 'Anı şarjı yarıda.', subtitle: 'Yakında kapanabilir.' },
      { emoji: '🎞️', title: 'Anıların yarısı kesik film gibi.', subtitle: 'Bir kısmı hafızadan silinmiş.' },
      { emoji: '🚪', title: 'Kapıyı kapatmış ama tam değil.', subtitle: 'Bir aralık kalmış.' },
      { emoji: '🧩', title: 'Yarısını hatırlıyor.', subtitle: 'Diğer yarısını uyduruyor.' },
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
      { emoji: '🌓', title: 'Yarısı aydınlık, yarısı sır.', subtitle: 'Kim bu acaba?' },
      { emoji: '🤨', title: 'Yarı tanıdık, yarı yabancı.', subtitle: 'İlginç bir profil çiziyor.' },
      { emoji: '🎭', title: 'Ne tam tanıdık ne tam meçhul.', subtitle: 'Gizem sürüyor.' },
      { emoji: '🌫️', title: 'Silueti görüyor, yüzü seçemiyor.', subtitle: 'Kim bu acaba?' },
      { emoji: '🔮', title: 'Yarısını sezmiş, yarısı bulanık.', subtitle: 'Kristal küre kısmen çalışıyor.' },
      { emoji: '🧭', title: 'Yönünü buldu, seni bulamadı.', subtitle: 'Ortalarda bir yerde.' },
      { emoji: '🗿', title: 'Yarı tanıdık bir enerji.', subtitle: 'Ama tam oturmuyor.' },
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
