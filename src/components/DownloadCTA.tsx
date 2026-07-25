import React from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { detectMobileOS, storeUrl, IOS_LIVE } from '../config';
import { track } from '../backend/analytics';
import { Logo } from './Logo';
import { S } from '../i18n/strings';

/**
 * Web'de oynayan (indirmemiş) kullanıcıyı en yüksek niyet anında —
 * sonuç ekranında — uygulamaya çeken kart. Native'de hiç render olmaz.
 */
export function DownloadCTA() {
  if (Platform.OS !== 'web') return null;

  const os = detectMobileOS();
  const label =
    os === 'ios'
      ? IOS_LIVE
        ? S.dlAppStore
        : S.dlWeb // iOS henüz yayında değil: web'e yönlendir
      : os === 'android'
        ? S.dlPlay
        : S.dlGeneric;

  return (
    <LinearGradient
      colors={[...theme.brand]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.wrap}
    >
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Logo size={40} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{S.dlTitle}</Text>
          <Text style={styles.sub}>{S.dlSub}</Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          track('uygulama_indir_tiklandi', { os });
          Linking.openURL(storeUrl(os));
        }}
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.85 : 1 }]}
      >
        <Text style={styles.btnText}>{label}</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: theme.radius,
    padding: 18,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  sub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
  btn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnText: {
    color: theme.brand[1],
    fontSize: 16,
    fontWeight: '800',
  },
});
