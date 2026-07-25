import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { S } from '../i18n/strings';

/**
 * Tüm uygulamayı saran çökme koruması. Bir ekranda render hatası olursa
 * beyaz ekran yerine dostça bir "tekrar dene" ekranı gösterir — launch'ta
 * tek bir hata bütün uygulamayı kilitlemesin.
 */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.log('Beklenmeyen hata:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <View style={styles.wrap}>
        <Text style={styles.emoji}>😵‍💫</Text>
        <Text style={styles.title}>{S.crashTitle}</Text>
        <Text style={styles.sub}>{S.crashSub}</Text>
        <Pressable
          onPress={() => this.setState({ hasError: false })}
          style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.8 : 1 }]}
        >
          <Text style={styles.btnText}>{S.crashRetry}</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: theme.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emoji: { fontSize: 56, marginBottom: 16 },
  title: { color: theme.text, fontSize: 22, fontWeight: '800' },
  sub: {
    color: theme.textDim,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  btn: {
    backgroundColor: theme.accent,
    borderRadius: theme.radius,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
