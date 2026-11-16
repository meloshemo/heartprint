/**
 * ARAMA AÇILIŞ SAYFALARI ÜRETİCİSİ
 *
 * Çalıştır:  node scripts/build-landing.mjs
 * Çıktı:     public/<slug>/index.html  +  public/sitemap.xml  +  public/robots.txt
 *
 * NEDEN: uygulama tek sayfalık bir JS uygulaması; Google'ın okuyabileceği
 * metin yoktu, bu yüzden "sevgili testi", "arkadaşlık testi" gibi aramalarda
 * hiç görünmüyordu. Bu sayfalar düz HTML: her biri bir arama niyetine cevap
 * verir, gerçek örnek sorular gösterir ve tek dokunuşla web uygulamasına
 * (indirme yok) götürür.
 *
 * Örnek sorular elle yazılmaz, soru havuzundan (src/data/questions*.ts)
 * id ile çekilir; böylece sayfa ile uygulama asla birbirinden kopmaz.
 * Soru metni değişirse bu betiği yeniden çalıştırmak yeterli.
 * (Vercel build'i public/ klasörünü olduğu gibi yayınlar; üretilen dosyalar
 * repoya commit edilir.)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://heartprint.app';
const PLAY = 'https://play.google.com/store/apps/details?id=app.heartprint';

// ── Soru havuzunu oku (id → {text, options}) ───────────────────────────────
function loadQuestions(file) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const map = new Map();
  for (const line of src.split('\n')) {
    const id = line.match(/\{ id: (\d+),/);
    if (!id) continue;
    const text = line.match(/ text: (['"])((?:\\.|(?!\1).)*)\1/);
    const opts = line.match(/options: \[(.*)\] \}/);
    if (!text || !opts) continue;
    const options = [...opts[1].matchAll(/(['"])((?:\\.|(?!\1).)*)\1/g)].map((m) =>
      m[2].replace(/\\(['"])/g, '$1')
    );
    map.set(Number(id[1]), { text: text[2].replace(/\\(['"])/g, '$1'), options });
  }
  return map;
}
const Q = { tr: loadQuestions('src/data/questions.ts'), en: loadQuestions('src/data/questions.en.ts') };

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── Sayfalar ───────────────────────────────────────────────────────────────
const UI = {
  tr: {
    how: 'Nasıl çalışır?',
    steps: [
      ['Kendin hakkında 12 soruyu cevapla', 'Doğru cevap senin cevabın. Bir dakikadan kısa sürer.'],
      ['Linki gönder', 'WhatsApp, Instagram ya da istediğin yerden. Karşı tarafın hiçbir şey indirmesi gerekmez, link tarayıcıda açılır.'],
      ['Sonucu gör', 'Yüzde kaç bildiğini, hangi sorularda yanıldığını görürsün. Sonuç kartı Story için hazır gelir.'],
    ],
    samples: 'Testten örnek sorular',
    faq: 'Sık sorulanlar',
    more: 'Diğer testler',
    cta: 'Testini şimdi oluştur',
    ctaSub: 'Ücretsiz, üyelik yok, indirme yok.',
    app: "Android uygulamasını Google Play'den indir",
    privacy: 'Gizlilik',
    home: 'Ana sayfa',
  },
  en: {
    how: 'How it works',
    steps: [
      ['Answer 12 questions about yourself', 'The right answer is your answer. It takes under a minute.'],
      ['Send the link', 'WhatsApp, Instagram, anywhere. They do not need to install anything; it opens in the browser.'],
      ['See the result', 'You see their score and exactly which questions they got wrong. The result card is ready for your Story.'],
    ],
    samples: 'Sample questions from the quiz',
    faq: 'Frequently asked',
    more: 'More quizzes',
    cta: 'Create your quiz now',
    ctaSub: 'Free. No sign-up. No download.',
    app: 'Get the Android app on Google Play',
    privacy: 'Privacy',
    home: 'Home',
  },
};

const FAQ_COMMON = {
  tr: [
    ['Ücretli mi?', 'Hayır. Test oluşturmak, göndermek ve sonucu görmek tamamen ücretsiz.'],
    ['Üye olmam gerekiyor mu?', 'Hayır. E-posta ya da telefon numarası istenmez. Adını yazıp başlarsın.'],
    ['Karşı tarafın uygulamayı indirmesi gerekiyor mu?', 'Hayır. Link telefonun tarayıcısında açılır ve test orada çözülür.'],
    ['Biri testimi çözünce haberim olur mu?', 'Android uygulamasında testini biri çözdüğü an bildirim gelir. Web sürümünde sonuçları "Testlerim" bölümünden görürsün.'],
  ],
  en: [
    ['Is it free?', 'Yes. Creating a quiz, sending it and seeing the result are all free.'],
    ['Do I need an account?', 'No. No email or phone number. Type your name and start.'],
    ['Does the other person need to install an app?', 'No. The link opens in their phone browser and they take the quiz right there.'],
    ['Will I know when someone finishes?', 'In the Android app you get a notification the moment someone finishes your quiz. On the web you see results under "My tests".'],
  ],
};

const PAGES = [
  {
    lang: 'tr', slug: 'beni-ne-kadar-taniyorsun-testi', nav: 'Beni ne kadar tanıyorsun?',
    title: 'Beni Ne Kadar Tanıyorsun Testi: Kendi Testini Oluştur ve Gönder',
    desc: 'Kendin hakkında 12 soruluk bir test hazırla, linki gönder, seni kim gerçekten tanıyor gör. Ücretsiz, üyeliksiz, indirmeden tarayıcıda oynanır.',
    h1: 'Beni ne kadar tanıyorsun testi',
    intro: [
      'Yıllardır tanıdığın insanlar seni gerçekten tanıyor mu, yoksa sadece tanıdığını mı sanıyor? Bunu öğrenmenin en eğlenceli yolu onlara sormak. Heartprint ile kendin hakkında 12 soruluk bir test hazırlarsın, linki istediğin kişiye gönderirsin ve yüzde kaç bildiğini görürsün.',
      'Sorular hazır gelir; sen sadece kendi cevabını işaretlersin. Sevgilin, annen, baban, kardeşin, en yakın arkadaşın ve hatta eski sevgilin için ayrı soru setleri var. Her testte sorular havuzdan rastgele seçilir, yani iki test birbirinin aynısı olmaz.',
    ],
    ids: [41, 56, 62, 905, 911, 913],
    faq: [['Soruları ben mi yazıyorum?', 'Hayır, 400\'den fazla hazır soru var. Sen kategoriyi seçersin, 12 soru rastgele gelir ve her birinde kendi cevabını işaretlersin.']],
  },
  {
    lang: 'tr', slug: 'sevgili-testi', nav: 'Sevgili testi',
    title: 'Sevgili Testi: Sevgilin Seni Ne Kadar Tanıyor?',
    desc: 'Sevgilin seni gerçekten tanıyor mu? İlişkinize özel 12 soruluk testi hazırla, linki gönder, yüzde kaç bildiğini gör. Ücretsiz ve indirmesiz.',
    h1: 'Sevgili testi: sevgilin seni ne kadar tanıyor?',
    intro: [
      '"Bir şey yok" dediğinde gerçekten bir şey olmadığını biliyor mu? Küstüğünde seni neyin yumuşattığını, kıskandığını nasıl belli ettiğini, tartışmadan sonra aslında ne duymak istediğini? Sevgili testi tam olarak bunları soruyor.',
      'Sen kendi cevaplarını işaretliyorsun, sevgilin tahmin ediyor. Sonunda hem yüzdeyi hem de hangi sorularda yanıldığını görüyorsunuz. Çoğu çift için asıl eğlence yanlış cevapların üzerine konuşmak oluyor.',
    ],
    ids: [120, 104, 131, 142, 144, 145],
    faq: [['Sonucu sadece ben mi görüyorum?', 'Sevgilin testi bitirince kendi sonucunu görür. Sen de "Testlerim" bölümünden onun puanını ve yanıldığı soruları görürsün.']],
  },
  {
    lang: 'tr', slug: 'arkadaslik-testi', nav: 'Arkadaşlık testi',
    title: 'Arkadaşlık Testi: En Yakın Arkadaşın Seni Ne Kadar Tanıyor?',
    desc: 'En yakın arkadaşın seni gerçekten tanıyor mu? Kanka testini hazırla, gruba at, kim daha iyi tanıyor gör. Ücretsiz, indirmeden oynanır.',
    h1: 'Arkadaşlık testi: kankan seni ne kadar tanıyor?',
    intro: [
      'Mezara kadar mı, yoksa sadece Instagram arkadaşı mı? Arkadaşlık testi bunu acımasızca ortaya çıkarıyor. Gizli zevkini, grupta hangi rolde olduğunu, kötü gününde ne yaptığını gerçekten biliyor mu?',
      'Linki tek bir kişiye de atabilirsin, arkadaş grubuna da. Aynı testi birden fazla kişi çözebilir; kimin seni daha iyi tanıdığını "Testlerim" bölümünde yan yana görürsün.',
    ],
    ids: [403, 406, 442, 444, 445, 440],
    faq: [['Aynı testi birden fazla arkadaşım çözebilir mi?', 'Evet. Linki gruba atabilirsin; her arkadaşın kendi telefonundan çözer ve hepsinin puanını ayrı ayrı görürsün.']],
  },
  {
    lang: 'tr', slug: 'anne-testi', nav: 'Anne testi',
    title: 'Anne Testi: Annen Seni Ne Kadar Tanıyor?',
    desc: 'Annen seni gerçekten tanıyor mu, yoksa hâlâ çocuk mu sanıyor? Anne testini hazırla, linki gönder, sonucu birlikte görün. Ücretsiz.',
    h1: 'Anne testi: annen seni ne kadar tanıyor?',
    intro: [
      'Anneler her şeyi bildiğini söyler. Bu test bunu sınıyor. Ondan en çok neyi gizlediğini, derdini ona anlatıp anlatmadığını, onun gözünde kaç yaşında olduğunu soruyor.',
      'Link WhatsApp\'tan gönderilir ve tarayıcıda açılır; annenin bir şey indirmesine ya da bir yere üye olmasına gerek yok. Şıklar büyük ve okunaklı, tek dokunuşla cevaplanıyor.',
    ],
    ids: [201, 241, 244, 246, 240, 221],
    faq: [['Annem teknolojiyle arası iyi değil, yapabilir mi?', 'Evet. WhatsApp\'tan gelen linke dokunması yeterli. Uygulama indirmek ya da hesap açmak gerekmiyor.']],
  },
  {
    lang: 'tr', slug: 'baba-testi', nav: 'Baba testi',
    title: 'Baba Testi: Baban Seni Ne Kadar Tanıyor?',
    desc: 'Baban seni ne kadar tanıyor? Baba testini hazırla, linki gönder, yüzde kaç bildiğini gör. Ücretsiz, üyeliksiz, indirmeden.',
    h1: 'Baba testi: baban seni ne kadar tanıyor?',
    intro: [
      'Babalar az konuşur ama çok şey bildiğini düşünür. Baba testi; ondan bir şey isteyince ne olduğunu, gurur duyduğunu nasıl belli ettiğini, telefonda kaç dakika konuşabildiğinizi soruyor.',
      'Bu testin sonuçları genellikle en çok güldüren sonuçlar oluyor, çünkü babaların tahminleri çoğu zaman çocuklarının on yıl önceki hâline ait.',
    ],
    ids: [339, 341, 340, 344, 322, 313],
    faq: [['Baba testi diğerlerinden farklı mı?', 'Soruları farklı. Her kategori için ayrı yazılmış sorular var; baba testinde baba-çocuk ilişkisine özel sorular gelir.']],
  },
  {
    lang: 'tr', slug: 'kardes-testi', nav: 'Kardeş testi',
    title: 'Kardeş Testi: Kardeşin Seni Ne Kadar Tanıyor?',
    desc: 'Aynı evde büyüdünüz ama seni tanıyor mu? Kardeş testini hazırla, linki gönder, sonucu gör. Ücretsiz ve indirmesiz.',
    h1: 'Kardeş testi: kardeşin seni ne kadar tanıyor?',
    intro: [
      'Aynı evde büyümek birini tanımak anlamına gelmiyor. Kardeş testi; evde bir şey kırılınca kimin suçlandığını, kimin daha çok ispiyonladığını, ıssız bir adaya düşseniz ne olacağını soruyor.',
      'Kardeşler arasında bu test çoğu zaman karşılıklı oynanıyor: önce sen onu test ediyorsun, sonra o seni. Kimin daha iyi tanıdığı tartışması da böylece rakamla bitiyor.',
    ],
    ids: [705, 719, 746, 740, 723, 741],
    faq: [['Kardeşim de bana test gönderebilir mi?', 'Evet. Testi çözdükten sonra "Sıra sende" seçeneğiyle kendi testini oluşturup sana gönderebilir.']],
  },
  {
    lang: 'tr', slug: 'anonim-test', nav: 'Anonim test',
    title: 'Anonim Test: Kim Olduğunu Söylemeden Test Gönder',
    desc: 'Adını vermeden birine test gönder. Seni ne kadar tanıdığını gör, kim olduğunu tahmin etmeye çalışsın. Ücretsiz, üyeliksiz.',
    h1: 'Anonim test: kim olduğunu söylemeden test et',
    intro: [
      'Anonim testte karşı taraf testi kimin gönderdiğini görmez. Link "biri seni test ediyor" diye gider; sorular "gizemli kişi" hakkında sorulur. O kişi hem soruları cevaplar hem de testin kimden geldiğini çözmeye çalışır.',
      'Sen ise sonucu görürsün: seni ne kadar tanıyor? Adın link önizlemesinde, test ekranında ya da sonuç kartında hiçbir yerde gösterilmez.',
    ],
    ids: [603, 610, 628, 635, 637, 638],
    faq: [['Karşı taraf kim olduğumu öğrenebilir mi?', 'Hayır. Adın anonim testte hiçbir ekranda gösterilmez. Kim olduğunu ancak cevaplarından tahmin edebilir.']],
  },
  {
    lang: 'tr', slug: 'eski-sevgili-testi', nav: 'Eski sevgili testi',
    title: 'Eski Sevgili Testi: Eski Sevgilin Seni Hâlâ Tanıyor mu?',
    desc: 'Bazı şeyler unutulmuyor mu? Eski sevgili testini hazırla, gönder, seni hâlâ ne kadar tanıdığını gör. Ücretsiz.',
    h1: 'Eski sevgili testi: seni hâlâ tanıyor mu?',
    intro: [
      'Bitmiş bir ilişkiden geriye ne kaldığını merak ediyorsan bu test onu ölçüyor. Ayrılığın kimden geldiğini, ortak fotoğrafların şu an nerede olduğunu, adını duyunca ilk ne yaptığını soruyor.',
      'Göndermek cesaret ister. İstersen anonim testi de seçebilirsin; o zaman test kimden geldiğini söylemeden gider.',
    ],
    ids: [504, 542, 540, 544, 545, 510],
    faq: [['Adımı göstermeden gönderebilir miyim?', 'Evet, bunun için anonim testi seç. Eski sevgili testinde adın görünür.']],
  },
  {
    lang: 'en', slug: 'en/how-well-do-you-know-me', nav: 'How well do you know me?',
    title: 'How Well Do You Know Me Quiz: Make Your Own and Send It',
    desc: 'Make a 12-question quiz about yourself, send the link, and find out who really knows you. Free, no sign-up, plays in the browser.',
    h1: 'How well do you know me? quiz',
    intro: [
      'The people who have known you for years: do they actually know you, or do they just think they do? The fun way to find out is to ask. With Heartprint you answer 12 questions about yourself, send the link to anyone, and see how many they get right.',
      'The questions are ready-made, so you only pick your own answers. There are separate sets for your partner, mom, dad, sibling, best friend and even your ex, and each quiz draws a random mix so no two are the same.',
    ],
    ids: [41, 56, 62, 905, 911, 913],
    faq: [['Do I write the questions myself?', 'No. There are over 400 ready-made questions. You choose a category, 12 are picked at random, and you mark your own answer on each.']],
  },
  {
    lang: 'en', slug: 'en/couples-quiz', nav: 'Couples quiz',
    title: 'Couples Quiz: How Well Does Your Partner Know You?',
    desc: 'Does your partner really know you? Make a 12-question couples quiz, send the link, and see their score. Free, no download.',
    h1: 'Couples quiz: how well does your partner know you?',
    intro: [
      'When you say "nothing is wrong", do they know whether anything is wrong? Do they know what softens you after a fight, how your jealousy shows, or what you actually want to hear afterwards? That is what the couples quiz asks.',
      'You mark your answers, your partner guesses. At the end you both see the score and exactly which questions they missed. For most couples the wrong answers are the fun part.',
    ],
    ids: [120, 104, 131, 142, 144, 145],
    faq: [['Who sees the result?', 'Your partner sees their own score when they finish. You see their score and the questions they missed under "My tests".']],
  },
  {
    lang: 'en', slug: 'en/best-friend-quiz', nav: 'Best friend quiz',
    title: 'Best Friend Quiz: How Well Does Your Bestie Know You?',
    desc: 'Ride or die, or just an Instagram friend? Make a best friend quiz, drop it in the group chat, and see who knows you best. Free.',
    h1: 'Best friend quiz: how well does your bestie know you?',
    intro: [
      'Ride or die, or just an Instagram friend? The best friend quiz finds out. Do they know your guilty pleasure, your role in the group, what you do on your worst day?',
      'Send the link to one person or to the whole group chat. Several people can take the same quiz, and you can compare their scores side by side.',
    ],
    ids: [403, 406, 442, 444, 445, 440],
    faq: [['Can several friends take the same quiz?', 'Yes. Drop the link in a group chat; everyone takes it on their own phone and you see each score separately.']],
  },
];

// ── Şablon ─────────────────────────────────────────────────────────────────
const CSS = `
:root{color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:#0F0F1A;color:#F3F1FA;font:17px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
background-image:radial-gradient(900px 500px at 10% -10%,rgba(176,51,217,.35),transparent 60%),radial-gradient(800px 500px at 100% 0,rgba(106,43,242,.30),transparent 60%);background-repeat:no-repeat}
a{color:#FFCE4F}
.wrap{max-width:720px;margin:0 auto;padding:24px 20px 64px}
header{display:flex;align-items:center;gap:10px;margin-bottom:28px}
header img{width:40px;height:40px;border-radius:10px}
header a{color:#fff;text-decoration:none;font-weight:900;letter-spacing:4px;font-size:14px}
h1{font-size:clamp(30px,6vw,44px);line-height:1.12;margin:0 0 18px;letter-spacing:-.5px}
h2{font-size:23px;margin:44px 0 14px}
p{margin:0 0 16px;color:#D9D4EA}
.cta{display:block;text-align:center;text-decoration:none;color:#fff;font-weight:900;font-size:19px;padding:18px 20px;border-radius:18px;
background:linear-gradient(90deg,#FF3E6C,#B033D9,#6A2BF2);margin:26px 0 8px}
.sub{text-align:center;color:#A9A3C2;font-size:14px;margin:0}
ol.steps{list-style:none;padding:0;margin:0;counter-reset:s}
ol.steps li{counter-increment:s;background:#1A1A2B;border-radius:16px;padding:16px 18px 16px 62px;margin-bottom:10px;position:relative}
ol.steps li::before{content:counter(s);position:absolute;left:16px;top:16px;width:32px;height:32px;border-radius:50%;background:#B033D9;display:grid;place-items:center;font-weight:900}
ol.steps b{display:block}
ol.steps span{color:#B9B3D0;font-size:15px}
.q{background:#1A1A2B;border-radius:16px;padding:16px 18px;margin-bottom:10px}
.q b{display:block;margin-bottom:10px}
.q ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:8px}
.q li{border:1px solid #33334d;border-radius:12px;padding:8px 12px;font-size:15px;color:#D9D4EA}
@media(max-width:480px){.q ul{grid-template-columns:1fr}}
details{background:#1A1A2B;border-radius:14px;padding:14px 18px;margin-bottom:8px}
summary{cursor:pointer;font-weight:700}
details p{margin:10px 0 0}
nav.more{display:flex;flex-wrap:wrap;gap:8px}
nav.more a{background:#1A1A2B;border:1px solid #33334d;border-radius:999px;padding:8px 14px;text-decoration:none;color:#F3F1FA;font-size:15px}
footer{margin-top:48px;padding-top:20px;border-top:1px solid #26263a;color:#8f89a8;font-size:14px;display:flex;flex-wrap:wrap;gap:16px}
footer a{color:#B9B3D0}
`.trim();

function render(p) {
  const ui = UI[p.lang];
  const url = `${SITE}/${p.slug}/`;
  const faq = [...p.faq, ...FAQ_COMMON[p.lang]];
  const qs = p.ids.map((id) => {
    const q = Q[p.lang].get(id);
    if (!q) throw new Error(`${p.slug}: soru ${id} havuzda yok`);
    return q;
  });
  const others = PAGES.filter((o) => o.lang === p.lang && o.slug !== p.slug);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  return `<!DOCTYPE html>
<html lang="${p.lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#0F0F1A" />
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Heartprint" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${esc(p.title)}" />
<meta property="og:description" content="${esc(p.desc)}" />
<meta property="og:image" content="${SITE}/og.png" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<style>${CSS}</style>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<div class="wrap">
<header><img src="/apple-touch-icon.png" alt="" width="40" height="40" /><a href="/">HEARTPRINT</a></header>
<main>
<h1>${esc(p.h1)}</h1>
${p.intro.map((t) => `<p>${esc(t)}</p>`).join('\n')}
<a class="cta" href="/">${esc(ui.cta)}</a>
<p class="sub">${esc(ui.ctaSub)}</p>

<h2>${esc(ui.how)}</h2>
<ol class="steps">
${ui.steps.map(([b, s]) => `<li><b>${esc(b)}</b><span>${esc(s)}</span></li>`).join('\n')}
</ol>

<h2>${esc(ui.samples)}</h2>
${qs.map((q) => `<div class="q"><b>${esc(q.text)}</b><ul>${q.options.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>`).join('\n')}
<a class="cta" href="/">${esc(ui.cta)}</a>
<p class="sub">${esc(ui.ctaSub)}</p>

<h2>${esc(ui.faq)}</h2>
${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}

<h2>${esc(ui.more)}</h2>
<nav class="more">
${others.map((o) => `<a href="/${o.slug}/">${esc(o.nav)}</a>`).join('\n')}
</nav>
</main>
<footer>
<a href="/">${esc(ui.home)}</a>
<a href="${PLAY}">${esc(ui.app)}</a>
<a href="/privacy/">${esc(ui.privacy)}</a>
</footer>
</div>
</body>
</html>
`;
}

// ── Yaz ────────────────────────────────────────────────────────────────────
for (const p of PAGES) {
  const dir = path.join(ROOT, 'public', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), render(p));
}

const today = new Date().toISOString().slice(0, 10);
const urls = [`${SITE}/`, ...PAGES.map((p) => `${SITE}/${p.slug}/`)];
fs.writeFileSync(
  path.join(ROOT, 'public', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`
);
fs.writeFileSync(
  path.join(ROOT, 'public', 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`
);

console.log(`${PAGES.length} sayfa + sitemap.xml + robots.txt yazildi`);
