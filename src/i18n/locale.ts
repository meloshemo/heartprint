import { NativeModules, Platform } from 'react-native';

/**
 * Cihazın olası tüm dil sinyallerini toplar (yeni native bağımlılık YOK).
 * Herhangi biri Türkçe'yi işaret ediyorsa Türkçe seçilir — böylece Türkçe
 * telefonlar güvenilir şekilde Türkçe görür, diğer herkes İngilizce.
 */
function deviceLocales(): string[] {
  const out: string[] = [];
  const push = (v: unknown) => {
    if (typeof v === 'string' && v) out.push(v);
    else if (Array.isArray(v)) v.forEach(push);
  };
  try {
    if (Platform.OS === 'web') {
      // Web'de ?lang=tr / ?lang=en ile dil zorlanabilir.
      if (typeof window !== 'undefined' && window.location?.search) {
        const forced = new URLSearchParams(window.location.search).get('lang');
        if (forced) out.push(forced);
      }
      if (typeof navigator !== 'undefined') {
        push(navigator.language);
        push((navigator as Navigator & { languages?: string[] }).languages);
      }
    } else {
      // iOS
      const sm = NativeModules.SettingsManager?.settings;
      push(sm?.AppleLocale);
      push(sm?.AppleLanguages);
      // Android
      push(NativeModules.I18nManager?.localeIdentifier);
    }
    // Hermes/JSC Intl — her platformda son çare
    try {
      push(Intl.DateTimeFormat().resolvedOptions().locale);
    } catch {
      /* Intl yoksa yok say */
    }
  } catch {
    /* güvenli tarafta kal */
  }
  return out;
}

export type Lang = 'tr' | 'en';

/** Sinyallerden biri bile Türkçe ise Türkçe; aksi halde İngilizce. */
export const LANG: Lang = deviceLocales().some((l) =>
  l.toLowerCase().startsWith('tr')
)
  ? 'tr'
  : 'en';
