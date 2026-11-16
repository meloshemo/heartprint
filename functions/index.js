const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { Expo } = require('expo-server-sdk');

initializeApp();
const db = getFirestore();
const expo = new Expo();

/**
 * Biri bir testi çözünce (results alt-koleksiyonuna yeni doküman) tetiklenir:
 *  1. Testin playCount sayacını artırır.
 *  2. Test sahibine push bildirimi gönderir ("X testini çözdü, %Y aldı").
 */
exports.onQuizResult = onDocumentCreated(
  {
    document: 'quizzes/{quizId}/results/{resultId}',
    // Firestore veritabanıyla aynı bölge: düşük gecikme + bölgeler arası
    // Eventarc tetikleyicisi karmaşasından kaçınır
    region: 'europe-west3',
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const result = snap.data();
    const { quizId } = event.params;

    const quizRef = db.doc(`quizzes/${quizId}`);
    const quizSnap = await quizRef.get();
    if (!quizSnap.exists) return;
    const quiz = quizSnap.data();

    // Oynama sayacını admin yetkisiyle artır
    await quizRef.update({ playCount: FieldValue.increment(1) });

    // Push token gizli alt dokümanda tutulur (herkese açık quiz dokümanında
    // DEĞİL — token sızıntısını önlemek için). Eski testlerde quiz.pushToken
    // hâlâ olabilir; geriye dönük uyumluluk için ikisine de bak.
    let token = null;
    try {
      const metaSnap = await db.doc(`quizzes/${quizId}/private/meta`).get();
      if (metaSnap.exists) token = metaSnap.data().pushToken;
    } catch (e) {
      console.error('Gizli token okunamadı:', e);
    }
    if (!token) token = quiz.pushToken || null;

    if (!token || !Expo.isExpoPushToken(token)) {
      console.log('Geçerli push token yok, bildirim atlanıyor:', quizId);
      return;
    }

    // Ad bildirim başlığına giriyor: istemciden gelen değere güvenme,
    // kırp ve kısalt (kurallar da 40 karakterle sınırlıyor).
    const rawName = result.guesserName ? String(result.guesserName).trim() : '';
    const who = rawName ? rawName.slice(0, 40) : 'Biri';
    const percent = Number(result.percent) || 0;

    const message = {
      to: token,
      sound: 'default',
      title: `${who} testini çözdü! 👀`,
      body: `Seni %${percent} tanıdı. Sonucu gör →`,
      data: { quizId },
      channelId: 'default',
    };

    try {
      const tickets = await expo.sendPushNotificationsAsync([message]);
      console.log('Bildirim gönderildi:', JSON.stringify(tickets));
    } catch (e) {
      console.error('Push gönderim hatası:', e);
    }
  }
);
