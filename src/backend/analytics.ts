import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Platform } from 'react-native';
import { db } from './firebase';

/**
 * Hafif huni analitiği — native reklam/analytics SDK'sı EKLEMEDEN (build
 * kırılganlığını önlemek için) mevcut Firebase SDK'sıyla sadece kritik olayları
 * kaydeder. Ateşle-unut: asla akışı bloklamaz, asla hata fırlatmaz.
 *
 * Olaylar Firestore `events` koleksiyonuna yazılır (yalnızca create — istemci
 * okuyamaz, bkz. firestore.rules). Firebase Console'dan veya BigQuery dışa
 * aktarımıyla incelenir.
 *
 * Kritik olaylar: test_olusturuldu → paylasildi → cozuldu → bildirim_acildi.
 */
export type AnalyticsEvent =
  | 'test_olusturuldu'
  | 'test_paylasildi'
  | 'test_cozuldu'
  | 'sonuc_paylasildi'
  | 'bildirim_acildi'
  | 'uygulama_indir_tiklandi';

export function track(
  event: AnalyticsEvent,
  props: Record<string, string | number | boolean> = {}
): void {
  // Ateşle-unut: await edilmez, hata yakalanıp yutulur.
  addDoc(collection(db, 'events'), {
    event,
    platform: Platform.OS,
    ...props,
    at: serverTimestamp(),
  }).catch(() => {
    /* analitik asla kullanıcı akışını etkilemez */
  });
}
