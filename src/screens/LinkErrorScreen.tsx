import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { BigButton, FadeIn, Screen, Subtitle, Title } from '../components/ui';
import { Logo } from '../components/Logo';
import { S } from '../i18n/strings';

/**
 * Bir test linkiyle gelindi ama test yüklenemedi (silinmiş, süresi geçmiş,
 * bozuk kod ya da ağ hatası). Kullanıcıyı çıkmaza sokmayıp yönlendirir.
 */
export function LinkErrorScreen({ onHome }: { onHome: () => void }) {
  return (
    <Screen>
      <FadeIn>
        <View style={styles.top}>
          <Logo size={56} gradient />
          <Text style={styles.brand}>heartprint</Text>
        </View>
        <Text style={styles.emoji}>🔍</Text>
        <Title>{S.linkErrorTitle}</Title>
        <Subtitle>{S.linkErrorSub}</Subtitle>
        <BigButton label={S.linkErrorHome} gradient onPress={onHome} />
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  brand: {
    color: theme.text,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 12,
  },
});
