import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Platform } from 'react-native';
import { db, ensureAuth } from './firebase';

/**
 * Hafif huni analitiği — native reklam/analytics SDK'sı EKLEMEDEN (build
 * kırılganlığını önlemek için) mevcut Firebase SDK'sıyla sadece kritik olayları
 * kaydeder. Ateşle-unut: asla akışı bloklamaz, asla hata fırlatmaz.
 *
 * Olaylar Firestore `events` koleksiyonuna yazılır (yalnızca create — istemci
 * okuyamaz, bkz. firestore.rules). Firebase Console'dan veya BigQuery dışa
 * aktarımıyla incelenir.
 *
 * VİRAL HUNİ (sırayla):
 *   test_olusturuldu → test_paylasildi → link_acildi → test_baslatildi
 *   → test_cozuldu → sonuc_paylasildi
 * link_acildi/test_baslatildi olmadan "linke tıklayanların kaçı bitirdi"
 * sorusu cevaplanamaz — viral üründe ölçülmesi gereken 1 numaralı dönüşüm.
 */
export type AnalyticsEvent =
  | 'test_olusturuldu'
  | 'test_paylasildi'
  | 'link_acildi'
  | 'test_baslatildi'
  | 'test_cozuldu'
  | 'sonuc_paylasildi'
  | 'bildirim_acildi'
  | 'uygulama_indir_tiklandi';

export function track(
  event: AnalyticsEvent,
  props: Record<string, string | number | boolean> = {}
): void {
  // Ateşle-unut: await edilmez, hata yakalanıp yutulur.
  // Kurallar artık kimlik doğrulaması istiyor (maliyet saldırısına karşı),
  // bu yüzden anonim oturum hazır olana kadar beklenir — yoksa uygulamanın
  // ilk saniyelerindeki olaylar sessizce reddedilirdi.
  ensureAuth()
    .then(() =>
      addDoc(collection(db, 'events'), {
        event,
        platform: Platform.OS,
        ...props,
        at: serverTimestamp(),
      })
    )
    .catch(() => {
      /* analitik asla kullanıcı akışını etkilemez */
    });
}
