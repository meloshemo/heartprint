import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import { decodeQuiz, extractCode } from './encoding';
import { getQuiz } from '../backend/quizzes';
import { Quiz } from '../types';

// Backend kısa ID'si: sadece büyük harf + 2-9, 5-10 karakter (quizzes.ts ALPHABET)
const SHORT_ID = /^[A-HJ-NP-Z2-9]{5,10}$/;
// Bir URL test linki mi? (?q= / #q= / &q= içeriyorsa)
const HAS_CODE = /[?#&]q=/;

export interface InitialQuiz {
  quiz: Quiz;
  quizId: string | null; // backend ID (sonuç kaydı için); base64 legacy'de null
}

/**
 * Uygulama bir test linkiyle açıldıysa testi yükler ve karşılama ekranına götürür.
 * Kısa ID → Firestore'dan çeker (sonuç kaydı + bildirim için quizId taşınır).
 * Uzun base64 → çevrimdışı çözer (legacy/yedek).
 * notFound: bir test linkiyle gelindi ama test yüklenemedi (silinmiş/bozuk/ağ).
 */
export function useInitialQuiz(): {
  data: InitialQuiz | null;
  pending: boolean;
  notFound: boolean;
} {
  const [data, setData] = useState<InitialQuiz | null>(null);
  const [pending, setPending] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    const tryLoad = async (url: string | null): Promise<void> => {
      if (!url) return;
      const code = extractCode(url);
      const looksLikeLink = HAS_CODE.test(url) || SHORT_ID.test(code);
      if (!code) return;

      if (SHORT_ID.test(code)) {
        try {
          const quiz = await getQuiz(code);
          if (!active) return;
          if (quiz) {
            setNotFound(false);
            setData({ quiz, quizId: code });
            return;
          }
          // Kısa ID ama backend'de yok → silinmiş/bozuk
          setNotFound(true);
          return;
        } catch {
          // Ağ hatası: base64 dener; o da olmazsa link'se notFound
        }
      }

      const decoded = decodeQuiz(code);
      if (!active) return;
      if (decoded) {
        setNotFound(false);
        setData({ quiz: decoded, quizId: null });
        return;
      }

      // Bir test linkiyle gelindi ama hiçbir şekilde çözülemedi
      if (looksLikeLink) setNotFound(true);
    };

    Linking.getInitialURL()
      .then(tryLoad)
      .catch(() => {})
      .finally(() => {
        if (active) setPending(false);
      });

    const sub = Linking.addEventListener('url', ({ url }) => {
      tryLoad(url);
    });
    return () => {
      active = false;
      sub.remove();
    };
  }, []);

  return { data, pending, notFound };
}
