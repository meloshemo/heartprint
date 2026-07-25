// ⚠️ BURAYI KENDİ FIREBASE PROJENLE DOLDUR
// Firebase Console → Proje ayarları → "Uygulamalarınız" → Web uygulaması → SDK yapılandırması
// (apiKey vb. gizli değildir; güvenlik Firestore kurallarıyla sağlanır — firestore.rules)
export const firebaseConfig = {
  apiKey: 'AIzaSyDdDdlBf3w4CETCq85PEb9OdyJCCVFs6rs',
  authDomain: 'heartprint-c15f2.firebaseapp.com',
  projectId: 'heartprint-c15f2',
  storageBucket: 'heartprint-c15f2.firebasestorage.app',
  messagingSenderId: '727011236274',
  appId: '1:727011236274:web:77dcbc7412536c8a062cab',
  measurementId: 'G-7JZ95BHWVW',
};

// Yerel geliştirme: Firebase emülatörüne bağlan (gerçek projeye dokunmadan test).
// Üretimde false OLMALI.
export const USE_EMULATOR = false;
export const EMULATOR_HOST = 'localhost';
export const FIRESTORE_EMULATOR_PORT = 8080;
export const AUTH_EMULATOR_PORT = 9099;
