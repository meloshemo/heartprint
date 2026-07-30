import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { db, ensureAuth } from './firebase';
import { CategoryId, Quiz } from '../types';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // karışabilen 0/O/1/I çıkarıldı

function shortId(len = 7): string {
  let s = '';
  for (let i = 0; i < len; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return s;
}

export interface QuizResult {
  id: string;
  guesserName: string | null;
  correct: number;
  total: number;
  percent: number;
  /** Çözenin işaretlediği şıklar — "hangi soruda yanıldı" ekranı için. */
  guesses: number[];
  createdAt: number | null; // ms epoch
}

export interface MyQuiz {
  id: string;
  cat: CategoryId;
  name: string;
  playCount: number;
  /** Testi oluşturanın doğru cevapları — yanlışları karşılaştırmak için. */
  answers: number[];
  /** Teste seçilen soru id'leri (eski testlerde yok). */
  q?: number[];
  createdAt: number | null;
}

/**
 * Testi Firestore'a kaydeder ve kısa paylaşım ID'sini döndürür.
 * pushToken verilirse, bu testi biri çözünce sahibine bildirim gidebilir.
 */
export async function createQuiz(
  quiz: Quiz,
  pushToken: string | null
): Promise<string> {
  const uid = await ensureAuth();
  // Çakışmayı önlemek için boş bir ID bulana kadar dene
  for (let attempt = 0; attempt < 5; attempt++) {
    const id = shortId();
    const ref = doc(db, 'quizzes', id);
    const existing = await getDoc(ref);
    if (existing.exists()) continue;
    await setDoc(ref, {
      cat: quiz.cat,
      name: quiz.name,
      answers: quiz.answers,
      q: quiz.q ?? [],
      creatorId: uid,
      playCount: 0,
      createdAt: serverTimestamp(),
    });
    // Push token GİZLİ tutulur: herkesin okuyabildiği quiz dokümanına değil,
    // yalnızca sahibin okuyabildiği alt dokümana yazılır. Cloud Function
    // (admin) buradan okuyup bildirimi gönderir. Bkz. functions/index.js.
    if (pushToken) {
      try {
        await setDoc(doc(db, 'quizzes', id, 'private', 'meta'), {
          pushToken,
          creatorId: uid,
        });
      } catch (e) {
        console.log('Push token kaydedilemedi (bildirim gitmeyebilir):', e);
      }
    }
    return id;
  }
  throw new Error('Test ID üretilemedi, tekrar dene');
}

/**
 * Push token'ı testin gizli alt dokümanına sonradan ekler (link oluşturmayı
 * bloke etmemek için token async alınır). Sessizce başarısız olur.
 */
export async function savePushToken(quizId: string, token: string): Promise<void> {
  const uid = await ensureAuth();
  await setDoc(doc(db, 'quizzes', quizId, 'private', 'meta'), {
    pushToken: token,
    creatorId: uid,
  }).catch((e) => console.log('Token eklenemedi:', e));
}

/**
 * Bir testi siler (yalnızca sahibi — kurallar zorunlu kılar). Gizli push token
 * alt dokümanını da temizler. Sonuç alt-koleksiyonu okunamaz hâle gelir
 * (üst doküman silinince read kuralı başarısız olur), veri fiilen erişilemez.
 * Play "kullanıcı verisini silebilir" gereksinimini karşılar.
 */
export async function deleteQuiz(quizId: string): Promise<void> {
  await ensureAuth();
  await deleteDoc(doc(db, 'quizzes', quizId, 'private', 'meta')).catch(() => {});
  await deleteDoc(doc(db, 'quizzes', quizId));
}

/** Kısa ID'den testi çeker. Bulunamazsa null. */
export async function getQuiz(id: string): Promise<Quiz | null> {
  const snap = await getDoc(doc(db, 'quizzes', id));
  if (!snap.exists()) return null;
  const d = snap.data();
  if (
    typeof d.cat !== 'string' ||
    typeof d.name !== 'string' ||
    !Array.isArray(d.answers)
  ) {
    return null;
  }
  return {
    v: 1,
    cat: d.cat as CategoryId,
    name: d.name,
    answers: d.answers,
    q: Array.isArray(d.q) ? d.q : undefined,
  };
}

/**
 * Bu cihaz bu testi LİNK/KOD ile daha önce çözdü mü?
 * Sonuç dokümanının kimliği çözenin uid'si olduğu için tek okumayla anlaşılır.
 * Ağ hatasında false döner — kullanıcıyı boşuna engellememek için.
 */
export async function hasSolved(quizId: string): Promise<boolean> {
  try {
    const uid = await ensureAuth();
    const snap = await getDoc(doc(db, 'quizzes', quizId, 'results', uid));
    return snap.exists();
  } catch {
    return false;
  }
}

/**
 * Bir testin çözüm sonucunu kaydeder.
 * Bu yazma, Cloud Function'ı tetikler: fonksiyon playCount'u artırır ve
 * test sahibine "testini çözdü" bildirimini gönderir.
 *
 * CİHAZ BAŞINA TEK ÇÖZÜM: link/kod ile gelen çözümde doküman kimliği
 * çözenin uid'sidir. Kurallarda update kapalı olduğu için aynı cihaz aynı
 * testi ikinci kez çözüp kaydedemez (sunucu tarafında garanti).
 *
 * AYNI TELEFONDA OYNA istisnası: kurucu telefonu arkadaşına uzatabilsin diye
 * bu akış sınırsızdır — kimliğe zaman damgası eklenir, her seferinde yeni
 * doküman oluşur (bildirim de her seferinde gider).
 */
export async function saveResult(
  quizId: string,
  correct: number,
  total: number,
  guesserName: string | null,
  samePhone = false,
  guesses: number[] = []
): Promise<void> {
  const uid = await ensureAuth();
  const percent = Math.round((correct / total) * 100);
  const resultId = samePhone ? `${uid}_${Date.now()}` : uid;
  await setDoc(doc(db, 'quizzes', quizId, 'results', resultId), {
    solverId: uid,
    guesserName: guesserName ?? null,
    correct,
    total,
    percent,
    // Test sahibi "hangi soruda yanıldı" ekranını görebilsin diye saklanır.
    guesses,
    createdAt: serverTimestamp(),
  });
}

function tsToMs(v: unknown): number | null {
  if (v && typeof (v as { toMillis?: () => number }).toMillis === 'function') {
    return (v as { toMillis: () => number }).toMillis();
  }
  return null;
}

/** Mevcut kullanıcının oluşturduğu testleri (yeniden eskiye) getirir. */
export async function getMyQuizzes(): Promise<MyQuiz[]> {
  const uid = await ensureAuth();
  const q = query(
    collection(db, 'quizzes'),
    where('creatorId', '==', uid),
    orderBy('createdAt', 'desc'),
    // Ölçek koruması: en yeni 100 test yeter; hepsini çekmek maliyet + yavaşlık.
    limit(100)
  );
  const snap = await getDocs(q);
  return snap.docs.map((docSnap) => {
    const d = docSnap.data();
    return {
      id: docSnap.id,
      cat: d.cat as CategoryId,
      name: d.name,
      playCount: d.playCount ?? 0,
      answers: Array.isArray(d.answers) ? d.answers : [],
      q: Array.isArray(d.q) ? d.q : undefined,
      createdAt: tsToMs(d.createdAt),
    };
  });
}

/**
 * Bir testin sonuçlarını gerçek zamanlı dinler ("kim çözdü" ekranı).
 * Aboneliği kapatan fonksiyonu döndürür.
 */
export function listenResults(
  quizId: string,
  cb: (results: QuizResult[]) => void
): () => void {
  const q = query(
    collection(db, 'quizzes', quizId, 'results'),
    orderBy('createdAt', 'desc'),
    // Ölçek koruması: viral bir testte 100k sonuç olabilir; ekranda son 50 yeter.
    // playCount toplamı Cloud Function sayacından geliyor, liste kısıtlı olsa da doğru.
    limit(50)
  );
  return onSnapshot(q, (snap) => {
    cb(
      snap.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          guesserName: d.guesserName ?? null,
          correct: d.correct ?? 0,
          total: d.total ?? 0,
          percent: d.percent ?? 0,
          guesses: Array.isArray(d.guesses) ? d.guesses : [],
          createdAt: tsToMs(d.createdAt),
        };
      })
    );
  });
}
