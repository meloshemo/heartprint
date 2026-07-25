import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Bildirim geldiğinde uygulama önplandaysa da göster
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let cachedToken: string | null | undefined;

/**
 * Cihazın Expo push token'ını alır (test sahibine bildirim göndermek için).
 * Web'de veya emülatörde/izin yoksa null döner — uygulama yine çalışır.
 * Sonuç cache'lenir; tekrar tekrar izin sorulmaz.
 */
export async function registerForPush(): Promise<string | null> {
  if (cachedToken !== undefined) return cachedToken;

  // Web'de push token yok; gerçek cihaz da değilse (simülatör) atla
  if (Platform.OS === 'web' || !Device.isDevice) {
    cachedToken = null;
    return null;
  }

  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Bildirimler',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    const existing = await Notifications.getPermissionsAsync();
    let status = existing.status;
    if (status !== 'granted') {
      const req = await Notifications.requestPermissionsAsync();
      status = req.status;
    }
    if (status !== 'granted') {
      cachedToken = null;
      return null;
    }

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;
    const token = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );
    cachedToken = token.data;
    return cachedToken;
  } catch (e) {
    console.log('Push token alınamadı:', e);
    cachedToken = null;
    return null;
  }
}
