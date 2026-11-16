/**
 * KİŞİYE ÖZEL LİNK ÖNİZLEMESİ  (Vercel sunucu fonksiyonu)
 *
 * NEDEN VAR: test linki (heartprint.app/?q=KOD) WhatsApp / Instagram / iMessage'a
 * yapıştırıldığında o uygulamalar sayfanın <meta property="og:..."> etiketlerini
 * okuyup bir önizleme kartı çizer. Site tek sayfalık bir uygulama olduğu için
 * her link AYNI genel kartı gösterirdi. Bu fonksiyon, test linklerinde kartı
 * teste göre yazar:  "Melih seni test ediyor 👀".
 * Kişinin adını gören arkadaşın linke dokunma ihtimali, çıplak bir URL'ye
 * dokunma ihtimalinden kat kat yüksek — viral döngünün ilk halkası burası.
 *
 * NASIL ÇALIŞIR: vercel.json, "/?q=..." isteklerini buraya yönlendirir.
 * Fonksiyon derlenmiş index.html'i alır, <!--OG_START--> ... <!--OG_END-->
 * arasını değiştirir ve AYNI sayfayı döndürür. Uygulamanın kendisi (script)
 * dokunulmadan kalır; insanlar için hiçbir şey değişmez.
 *
 * GİZLİLİK: anonim testte kurucunun adı ASLA karta yazılmaz.
 * DAYANIKLILIK: herhangi bir adım patlarsa sayfa yine açılır (genel kartla).
 */

const PROJECT = 'heartprint-c15f2';
const ORIGIN = 'https://heartprint.app';
// quizzes.ts'teki kısa ID alfabesiyle aynı (0/O/1/I yok).
const SHORT_ID = /^[A-HJ-NP-Z2-9]{5,10}$/;

const EMOJI = {
  sevgili: '💘',
  anne: '🤱',
  baba: '👨‍👧',
  bff: '👯',
  kardes: '🧬',
  eski: '💔',
  anonim: '🕵️',
};

let cachedHtml = null;
let cachedAt = 0;

async function getTemplate(host) {
  const now = Date.now();
  if (cachedHtml && now - cachedAt < 5 * 60 * 1000) return cachedHtml;
  // Önce isteğin geldiği host (önizleme dağıtımlarında da doğru sürümü alır).
  const bases = [];
  if (host && /^[a-z0-9.-]+$/i.test(host)) bases.push('https://' + host);
  bases.push(ORIGIN);
  for (const base of bases) {
    try {
      const r = await fetch(base + '/index.html', { redirect: 'follow' });
      if (!r.ok) continue;
      const html = await r.text();
      if (html.includes('<!--OG_START-->') && html.includes('<div id="root">')) {
        cachedHtml = html;
        cachedAt = now;
        return html;
      }
    } catch (_) {
      // sıradaki adresi dene
    }
  }
  return null;
}

async function getQuizMeta(id) {
  try {
    const url =
      'https://firestore.googleapis.com/v1/projects/' +
      PROJECT +
      '/databases/(default)/documents/quizzes/' +
      encodeURIComponent(id) +
      '?mask.fieldPaths=name&mask.fieldPaths=cat&mask.fieldPaths=lang';
    const r = await fetch(url);
    if (!r.ok) return null;
    const f = (await r.json()).fields || {};
    return {
      name: (f.name && f.name.stringValue) || '',
      cat: (f.cat && f.cat.stringValue) || '',
      lang: (f.lang && f.lang.stringValue) || '',
    };
  } catch (_) {
    return null;
  }
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cleanName(raw) {
  // Kontrol karakterlerini at, tek satıra indir, makul uzunlukta kes.
  const s = String(raw || '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return s.length > 28 ? s.slice(0, 27) + '…' : s;
}

function buildCopy(meta) {
  const en = meta && meta.lang === 'en';
  const cat = meta ? meta.cat : '';
  const emoji = EMOJI[cat] || '👀';
  const name = meta ? cleanName(meta.name) : '';

  // Anonim: kurucunun adı kartta YOK.
  if (cat === 'anonim') {
    return en
      ? {
          title: 'Someone is testing you ' + emoji,
          desc: 'They left you a quiz without saying who they are. Take it and see how well you know them.',
        }
      : {
          title: 'Biri seni test ediyor ' + emoji,
          desc: 'Adını vermeden sana bir test bıraktı. Çöz, onu ne kadar tanıdığını gör.',
        };
  }
  if (name) {
    return en
      ? {
          title: name + ' is testing you ' + emoji,
          desc: '12 questions about ' + name + '. How well do you really know them? Takes a minute, no download.',
        }
      : {
          title: name + ' seni test ediyor ' + emoji,
          desc: name + ' hakkında 12 soru. Bakalım onu ne kadar tanıyorsun? 1 dakika sürer, indirme yok.',
        };
  }
  // Test bulunamadı / çevrimdışı (uzun) kod: adsız ama yine davetkâr.
  return {
    title: 'Sana bir test gönderildi 👀',
    desc: 'Bakalım onu ne kadar tanıyorsun? Çöz, sonucunu gör. How well do you know them?',
  };
}

function ogBlock(copy, pageUrl) {
  const t = esc(copy.title);
  const d = esc(copy.desc);
  const u = esc(pageUrl);
  const img = ORIGIN + '/og.png';
  return [
    '<!--OG_START-->',
    '<title>' + t + '</title>',
    '<meta name="description" content="' + d + '" />',
    '<meta name="robots" content="noindex" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Heartprint" />',
    '<meta property="og:url" content="' + u + '" />',
    '<meta property="og:title" content="' + t + '" />',
    '<meta property="og:description" content="' + d + '" />',
    '<meta property="og:image" content="' + img + '" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + t + '" />',
    '<meta name="twitter:description" content="' + d + '" />',
    '<meta name="twitter:image" content="' + img + '" />',
    '<!--OG_END-->',
  ].join('\n    ');
}

module.exports = async (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : '';
  const html = await getTemplate(req.headers.host);

  if (!html) {
    // Şablon alınamadı: uygulamayı yine de aç (statik dosya, döngü oluşmaz
    // çünkü yönlendirme kuralı yalnızca "/" yoluna uygulanır).
    res.statusCode = 302;
    res.setHeader('Location', '/index.html?q=' + encodeURIComponent(q));
    res.end();
    return;
  }

  const meta = SHORT_ID.test(q) ? await getQuizMeta(q) : null;
  const copy = buildCopy(meta);
  const pageUrl = ORIGIN + '/?q=' + encodeURIComponent(q);
  const out = html.replace(/<!--OG_START-->[\s\S]*?<!--OG_END-->/, () => ogBlock(copy, pageUrl));

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // Kısa süre CDN'de tut: önizleme botları aynı linki art arda ister.
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
  res.end(out);
};
