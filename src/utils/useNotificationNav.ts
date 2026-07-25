import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { track } from '../backend/analytics';

/**
 * Kullanıcı "X testini çözdü" bildirimine dokununca ilgili testin quizId'siyle
 * callback'i çağırır. Uygulama kapalıyken açıldıysa da (son bildirim) yakalar.
 */
export function useNotificationNav(onOpenQuiz: (quizId: string) => void) {
  const cb = useRef(onOpenQuiz);
  cb.current = onOpenQuiz;

  useEffect(() => {
    if (Platform.OS === 'web') return;

    // Uygulama açıkken/arka plandayken bildirime dokunma
    const sub = Notifications.addNotificationResponseReceivedListener((resp) => {
      const quizId = resp.notification.request.content.data?.quizId;
      if (typeof quizId === 'string') {
        track('bildirim_acildi');
        cb.current(quizId);
      }
    });

    // Uygulama tamamen kapalıyken bildirimle açıldıysa
    Notifications.getLastNotificationResponseAsync().then((resp) => {
      const quizId = resp?.notification.request.content.data?.quizId;
      if (typeof quizId === 'string') cb.current(quizId);
    });

    return () => sub.remove();
  }, []);
}
