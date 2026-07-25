import React, { useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { detectMobileOS, storeUrl } from '../config';
import { theme } from '../theme';
import { Logo } from './Logo';
import { S } from '../i18n/strings';

const DISMISS_KEY = 'hp_banner_dismissed';

function wasDismissed(): boolean {
  try {
    return (
      Platform.OS === 'web' &&
      typeof localStorage !== 'undefined' &&
      localStorage.getItem(DISMISS_KEY) === '1'
    );
  } catch {
    return false;
  }
}

/**
 * Web'de tüm ekranların üstünde duran ince "uygulamada aç" çubuğu (App Store'un
 * smart banner'ı gibi). Native'de veya kapatıldıysa render olmaz.
 */
export function SmartBanner() {
  const [hidden, setHidden] = useState(wasDismissed());
  if (Platform.OS !== 'web' || hidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // localStorage engelliyse yine de bu oturumda gizle
    }
    setHidden(true);
  };

  return (
    <View style={styles.bar}>
      <Pressable onPress={dismiss} hitSlop={10} style={styles.close}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>
      <View style={styles.iconBox}>
        <Logo size={26} color="#FFFFFF" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Heartprint</Text>
        <Text style={styles.sub}>{S.bannerText}</Text>
      </View>
      <Pressable
        onPress={() => Linking.openURL(storeUrl(detectMobileOS()))}
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.85 : 1 }]}
      >
        <Text style={styles.btnText}>{S.bannerOpen}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingLeft: 6,
    paddingRight: 12,
    backgroundColor: theme.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.cardBorder,
  },
  close: {
    paddingHorizontal: 8,
  },
  closeText: {
    color: theme.textDim,
    fontSize: 16,
    fontWeight: '700',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.brand[1],
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '800',
  },
  sub: {
    color: theme.textDim,
    fontSize: 12,
    marginTop: 1,
  },
  btn: {
    backgroundColor: theme.success,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 9,
  },
  btnText: {
    color: '#04231A',
    fontSize: 14,
    fontWeight: '800',
  },
});
