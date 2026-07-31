import { Linking, Platform, Share } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import { S } from '../i18n/strings';
import { WEB_BASE_URL } from '../config';

/**
 * Bir uygulamayı şemasıyla doğrudan açmayı dener; açılamazsa false döner.
 *
 * HIZ NOTU: eskiden önce canOpenURL sorulup sonra openURL çağrılıyordu — bu,
 * her dokunuşta iki ayrı native köprü turu demekti ve butona basınca gözle
 * görülür bir takılma yaratıyordu. Tek adımda deneyip hatayı yakalamak hem
 * daha hızlı hem de daha doğru (canOpenURL, AndroidManifest'teki <queries>
 * listesine bağlıdır; openURL gerçekte ne olduğunu söyler).
 */
async function tryOpen(url: string): Promise<boolean> {
  try {
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Metni (davet linki dahil) WhatsApp'ta paylaşır. WhatsApp yoksa web'e / genel
 * paylaşım sayfasına düşer.
 */
export async function shareTextWhatsApp(text: string): Promise<void> {
  if (Platform.OS === 'web') {
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
    return;
  }
  const encoded = encodeURIComponent(text);
  if (!(await tryOpen('whatsapp://send?text=' + encoded))) {
    await Linking.openURL('https://wa.me/?text=' + encoded);
  }
}

/**
 * Web'de kart görselini (data URI) native paylaşım sayfasına gönderir.
 * Mobil tarayıcılarda (Android Chrome / iOS Safari) Instagram, TikTok, WhatsApp
 * burada çıkar — sitede IG/TikTok paylaşımının GERÇEK yolu budur.
 * Desteklenmiyorsa görseli indirir + linki panoya kopyalar (yedek).
 * true = paylaşım/indirme başladı.
 */
async function shareImageWeb(dataUri: string, text?: string): Promise<boolean> {
  try {
    const res = await fetch(dataUri);
    const blob = await res.blob();
    const file = new File([blob], 'heartprint.png', { type: 'image/png' });
    const nav = navigator as Navigator & {
      canShare?: (d: unknown) => boolean;
      share?: (d: unknown) => Promise<void>;
    };
    if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
      await nav.share({ files: [file], text });
      return true;
    }
    // Yedek: görseli indir + metni kopyala, kullanıcı Story'sine ekler
    if (text) await Clipboard.setStringAsync(text).catch(() => {});
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = 'heartprint.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  } catch {
    return false;
  }
}

/**
 * Bir görsel dosyasını sistem paylaşım sayfasıyla paylaşır (Instagram, TikTok,
 * WhatsApp vb. hepsi burada çıkar — görsel için EN güvenilir yol).
 * text: paylaşıma eklenecek/kopyalanacak davet metni (link).
 */
export async function shareImage(uri: string, text?: string): Promise<void> {
  if (Platform.OS === 'web') {
    await shareImageWeb(uri, text);
    return;
  }
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: S.shareCard });
  } else {
    await Share.share({ url: uri });
  }
}

// file:// URI'yi content:// URI'ye çevirir (intent için gerekli).
// ÖNEMLİ: SDK 57'de "expo-file-system" (yeni API) içindeki getContentUriAsync
// kasıtlı olarak HER ZAMAN hata fırlatan bir uyumluluk stub'ı (gerçek native
// çağrıyı yapmıyor) — bu yüzden gerçek implementasyonu taşıyan
// "expo-file-system/legacy" ÖNCE denenir. Yeni modül sadece son çare yedek.
async function toContentUri(fileUri: string): Promise<string> {
  let fn: ((u: string) => Promise<string>) | undefined;
  try {
    fn = require('expo-file-system/legacy').getContentUriAsync;
  } catch {
    // yok say
  }
  if (!fn) {
    try {
      fn = require('expo-file-system').getContentUriAsync;
    } catch {
      // yok say
    }
  }
  if (!fn) throw new Error('getContentUriAsync yok');
  return fn(fileUri);
}

/**
 * Sonuç kartı görselini DOĞRUDAN Instagram Story'ye gönderir (Android).
 * content_url ile Story'ye tıklanabilir bir "Link" etiketi eklenir (izleyen
 * kişi dokununca heartprint.app'e gider — Android'de mağazaya, iOS'ta web'e
 * yönlenir, bkz config.ts storeUrl()).
 * Instagram yoksa ya da hata olursa sistem paylaşım sayfasına düşer
 * (orada da Instagram/TikTok görsel ile çıkar; metinde link zaten var).
 */
export async function shareToInstagramStory(
  imageUri: string,
  text?: string
): Promise<void> {
  if (Platform.OS === 'android') {
    try {
      const IntentLauncher = require('expo-intent-launcher');
      const contentUri = await toContentUri(imageUri);
      await IntentLauncher.startActivityAsync('com.instagram.share.ADD_TO_STORY', {
        data: contentUri,
        type: 'image/*',
        flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
        packageName: 'com.instagram.android',
        extra: {
          source_application: 'app.heartprint',
          content_url: WEB_BASE_URL,
        },
      });
      return;
    } catch (e) {
      // Instagram yok / intent başarısız → paylaşım sayfası
      console.log('Instagram Story intent başarısız, paylaşım sayfasına düşülüyor:', e);
    }
  }
  await shareImage(imageUri, text);
}

/**
 * Instagram'ı açar. Görsel paylaşımı için linki panoya kopyalar (kullanıcı
 * story/DM'ine yapıştırır). Instagram yoksa web'e düşer.
 * text: panoya kopyalanacak (link).
 */
export async function openInstagram(text: string): Promise<'opened' | 'copied' | 'web'> {
  if (text) await Clipboard.setStringAsync(text).catch(() => {});
  if (Platform.OS === 'web') {
    window.open('https://instagram.com', '_blank');
    return 'web';
  }
  if (await tryOpen('instagram://app')) return 'copied';
  await Linking.openURL('https://instagram.com');
  return 'web';
}

/** TikTok'u açar; linki panoya kopyalar. TikTok yoksa web'e düşer. */
export async function openTikTok(text: string): Promise<'opened' | 'copied' | 'web'> {
  if (text) await Clipboard.setStringAsync(text).catch(() => {});
  if (Platform.OS === 'web') {
    window.open('https://www.tiktok.com', '_blank');
    return 'web';
  }
  for (const scheme of ['snssdk1233://', 'tiktok://', 'musically://']) {
    if (await tryOpen(scheme)) return 'copied';
  }
  await Linking.openURL('https://www.tiktok.com');
  return 'web';
}
