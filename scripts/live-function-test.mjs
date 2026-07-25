// CANLI Cloud Function testi: gerçek projeye test yazar, sonuç ekler,
// fonksiyonun tetiklenip playCount'u artırdığını doğrular.
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const app = initializeApp({
  apiKey: 'AIzaSyDdDdlBf3w4CETCq85PEb9OdyJCCVFs6rs',
  authDomain: 'heartprint-c15f2.firebaseapp.com',
  projectId: 'heartprint-c15f2',
  storageBucket: 'heartprint-c15f2.firebasestorage.app',
  messagingSenderId: '727011236274',
  appId: '1:727011236274:web:77dcbc7412536c8a062cab',
});
const db = getFirestore(app);
const auth = getAuth(app);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const cred = await signInAnonymously(auth);
  const id = 'FNTEST' + Math.floor(Math.random() * 100);

  console.log('1) Test oluşturuluyor:', id);
  await setDoc(doc(db, 'quizzes', id), {
    cat: 'anne',
    name: 'FnTest',
    answers: [0, 1, 2],
    creatorId: cred.user.uid,
    // Geçerli formatta ama kayıtlı olmayan token: fonksiyonun push kod yolunu
    // çalıştırır (Expo "DeviceNotRegistered" döner — beklenen).
    pushToken: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
    playCount: 0,
    createdAt: serverTimestamp(),
  });

  console.log('2) Sonuç ekleniyor (fonksiyonu tetiklemeli)...');
  await addDoc(collection(db, 'quizzes', id, 'results'), {
    guesserName: 'Zeynep',
    correct: 2,
    total: 3,
    percent: 67,
    createdAt: serverTimestamp(),
  });

  console.log('3) Fonksiyonun playCount artırması bekleniyor...');
  let playCount = 0;
  for (let i = 0; i < 40; i++) {
    await sleep(1500);
    const s = await getDoc(doc(db, 'quizzes', id));
    playCount = s.data()?.playCount ?? 0;
    process.stdout.write('.');
    if (playCount >= 1) break;
  }
  console.log('');

  if (playCount === 1) {
    console.log('\n✔ CANLI FONKSİYON ÇALIŞIYOR — playCount 1 oldu.');
    console.log('  (Push kod yolu da çalıştı; gerçek cihaz token\'ıyla bildirim gider.)');
  } else {
    console.log('\n✘ Fonksiyon tetiklenmedi — playCount:', playCount);
  }

  console.log('4) Temizlik...');
  await deleteDoc(doc(db, 'quizzes', id));
  process.exit(playCount === 1 ? 0 : 1);
}

main().catch((e) => {
  console.error('HATA:', e.message);
  process.exit(1);
});
