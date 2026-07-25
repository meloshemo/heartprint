import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { S } from '../i18n/strings';

/**
 * Viral döngü kancası: birinin testini çözen kişiyi "şimdi sen de yap"a
 * yönlendirir — alan kişi kurucuya dönüşür. Kendi LinearGradient'ini import
 * eden ayrı bileşen (ResultScreen'i sade tutar; DownloadCTA ile aynı desen).
 */
export function LoopCard({
  targetName,
  onPress,
}: {
  targetName: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={[...theme.brand]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.title}>{S.loopTitle}</Text>
        <Text style={styles.sub}>{S.loopSub(targetName)}</Text>
        <Text style={styles.btn}>{S.loopBtn}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '900' },
  sub: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  btn: {
    color: theme.brand[2],
    backgroundColor: '#fff',
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 16,
    fontSize: 15,
    fontWeight: '900',
  },
});
