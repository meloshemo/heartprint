import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { BigButton, FadeIn, Screen, Subtitle, Title } from '../components/ui';
import { Logo } from '../components/Logo';
import { S } from '../i18n/strings';

/**
 * Bir test linkiyle gelindi ama test açılamadı. İki durum:
 * - 'notFound': silinmiş, süresi geçmiş, bozuk kod ya da ağ hatası.
 * - 'limitReached': test zaten MAX_PLAYS kez çözülmüş (bkz quizzes.ts).
 * Kullanıcıyı çıkmaza sokmayıp yönlendirir.
 */
export function LinkErrorScreen({
  onHome,
  reason = 'notFound',
}: {
  onHome: () => void;
  reason?: 'notFound' | 'limitReached';
}) {
  const isLimit = reason === 'limitReached';
  return (
    <Screen>
      <FadeIn>
        <View style={styles.top}>
          <Logo size={56} gradient />
          <Text style={styles.brand}>heartprint</Text>
        </View>
        <Text style={styles.emoji}>{isLimit ? '🔒' : '🔍'}</Text>
        <Title>{isLimit ? S.linkLimitTitle : S.linkErrorTitle}</Title>
        <Subtitle>{isLimit ? S.linkLimitSub : S.linkErrorSub}</Subtitle>
        <BigButton
          label={isLimit ? S.linkLimitHome : S.linkErrorHome}
          gradient
          onPress={onHome}
        />
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
