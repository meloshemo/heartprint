// Canlı Firebase projesine karşı hızlı duman testi (emülatör DEĞİL).
// Anonymous auth açık mı + kurallar deploy oldu mu + bağlantı var mı doğrular.
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDdDdlBf3w4CETCq85PEb9OdyJCCVFs6rs',
  authDomain: 'heartprint-c15f2.firebaseapp.com',
  projectId: 'heartprint-c15f2',
  storageBucket: 'heartprint-c15f2.firebasestorage.app',
  messagingSenderId: '727011236274',
  appId: '1:727011236274:web:77dcbc7412536c8a062cab',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function main() {
  console.log('1) Anonim giriş deneniyor...');
  const cred = await signInAnonymously(auth);
  console.log('   OK — uid:', cred.user.uid);

  const id = 'SMOKE' + Math.floor(Math.random() * 1000);
  console.log('2) Test yazılıyor:', id);
  await setDoc(doc(db, 'quizzes', id), {
    cat: 'anne',
    name: 'SmokeTest',
    answers: [0, 1, 2],
    creatorId: cred.user.uid,
    pushToken: null,
    playCount: 0,
    createdAt: serverTimestamp(),
  });
  console.log('   OK — yazıldı');

  console.log('3) Geri okunuyor...');
  const snap = await getDoc(doc(db, 'quizzes', id));
  console.log('   OK —', snap.data().name);

  console.log('4) Temizlik (siliniyor)...');
  await deleteDoc(doc(db, 'quizzes', id));
  console.log('   OK — silindi');

  console.log('\n✔ Canlı backend çalışıyor: Auth açık, kurallar aktif.');
  process.exit(0);
}

main().catch((e) => {
  console.error('\n✘ HATA:', e.code || e.message);
  if (String(e).includes('admin-restricted') || String(e).includes('operation-not-allowed')) {
    console.error('→ Authentication → Sign-in method → Anonymous AÇIK DEĞİL.');
  }
  process.exit(1);
});
