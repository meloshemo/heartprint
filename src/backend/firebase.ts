import { Platform } from 'react-native';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';
import {
  Auth,
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  initializeAuth,
  // @ts-expect-error - getReactNativePersistence tip tanımı bazı sürümlerde eksik ama runtime'da var
  getReactNativePersistence,
  onAuthStateChanged,
  signInAnonymously,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AUTH_EMULATOR_PORT,
  EMULATOR_HOST,
  FIRESTORE_EMULATOR_PORT,
  USE_EMULATOR,
  firebaseConfig,
} from './firebaseConfig';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Auth: web'de tarayıcı kalıcılığı, native'de AsyncStorage kalıcılığı.
// Böylece anonim kullanıcı kimliği (creatorId) oturumlar arası sabit kalır.
let auth: Auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence).catch(() => {});
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    // Zaten başlatılmışsa (Fast Refresh) mevcut örneği al
    auth = getAuth(app);
  }
}
export { auth };

if (USE_EMULATOR) {
  connectFirestoreEmulator(db, EMULATOR_HOST, FIRESTORE_EMULATOR_PORT);
  connectAuthEmulator(auth, `http://${EMULATOR_HOST}:${AUTH_EMULATOR_PORT}`, {
    disableWarnings: true,
  });
}

/**
 * Anonim oturumu garanti eder ve sabit kullanıcı kimliğini (uid) döndürür.
 * Her cihaz için tek seferlik oluşturulur, sonra kalıcıdır.
 */
export function ensureAuth(): Promise<string> {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          unsub();
          resolve(user.uid);
        } else {
          signInAnonymously(auth).catch((e) => {
            unsub();
            reject(e);
          });
        }
      },
      reject
    );
  });
}
