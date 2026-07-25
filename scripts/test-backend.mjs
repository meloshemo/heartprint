// Firebase backend entegrasyon testi — emülatöre karşı çalışır.
// quizzes.ts ile birebir aynı işlemleri yapar (RN import'undan kaçınmak için kopyalanmış).
import { initializeApp } from 'firebase/app';
import {
  connectFirestoreEmulator,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  connectAuthEmulator,
  getAuth,
  signInAnonymously,
} from 'firebase/auth';

const app = initializeApp({ projectId: 'demo-heartprint', apiKey: 'demo' });
const db = getFirestore(app);
const auth = getAuth(app);
connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0,
  fail = 0;
function check(name, cond) {
  if (cond) {
    pass++;
    console.log('OK  ', name);
  } else {
    fail++;
    console.log('FAIL', name);
  }
}

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const shortId = (n = 7) =>
  Array.from({ length: n }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');

async function main() {
  // 1) Anonim giriş
  const cred = await signInAnonymously(auth);
  const uid = cred.user.uid;
  check('anonim giriş uid var', !!uid);

  // 2) createQuiz
  const id = shortId();
  await setDoc(doc(db, 'quizzes', id), {
    cat: 'anne',
    name: 'Melih',
    answers: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
    creatorId: uid,
    pushToken: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
    playCount: 0,
    createdAt: serverTimestamp(),
  });
  check('createQuiz yazıldı', true);

  // 3) getQuiz (link ile açan — public read)
  const snap = await getDoc(doc(db, 'quizzes', id));
  check('getQuiz okunabiliyor', snap.exists() && snap.data().name === 'Melih');
  check('answers 12 elemanlı', snap.data().answers.length === 12);

  // 4) saveResult (çözen kişi — anonim de olabilir)
  await addDoc(collection(db, 'quizzes', id, 'results'), {
    guesserName: 'Ayşe',
    correct: 7,
    total: 12,
    percent: 58,
    createdAt: serverTimestamp(),
  });
  check('saveResult yazıldı', true);

  // 5) Cloud Function tetiklendi mi? playCount 1 olmalı
  let playCount = 0;
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    const s = await getDoc(doc(db, 'quizzes', id));
    playCount = s.data().playCount;
    if (playCount >= 1) break;
  }
  check('Cloud Function playCount artırdı (1)', playCount === 1);

  // 6) getMyQuizzes (composite index: creatorId + createdAt desc)
  const myQ = query(
    collection(db, 'quizzes'),
    where('creatorId', '==', uid),
    orderBy('createdAt', 'desc')
  );
  const mySnap = await getDocs(myQ);
  check('getMyQuizzes en az 1 test döndü', mySnap.size >= 1);
  check('testlerim doğru sahibe ait', mySnap.docs.every((d) => d.data().creatorId === uid));

  // 7) Güvenlik: başka kullanıcı testi güncelleyemez
  const otherAuth = getAuth(initializeApp({ projectId: 'demo-heartprint', apiKey: 'demo' }, 'other'));
  connectAuthEmulator(otherAuth, 'http://localhost:9099', { disableWarnings: true });
  const otherDb = getFirestore(otherAuth.app);
  connectFirestoreEmulator(otherDb, 'localhost', 8080);
  await signInAnonymously(otherAuth);
  let denied = false;
  try {
    await updateDoc(doc(otherDb, 'quizzes', id), { name: 'HACK' });
  } catch {
    denied = true;
  }
  check('başkası testi güncelleyemedi (kural)', denied);

  // 8) Güvenlik: sahibi olmayan sonuçları okuyamaz
  let readDenied = false;
  try {
    await getDocs(collection(otherDb, 'quizzes', id, 'results'));
  } catch {
    readDenied = true;
  }
  check('başkası sonuçları okuyamadı (kural)', readDenied);

  console.log(`\n${pass} geçti, ${fail} kaldı`);
  process.exit(fail === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error('TEST HATASI:', e);
  process.exit(1);
});
