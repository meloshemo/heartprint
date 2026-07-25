import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { S } from '../i18n/strings';

export function Screen({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[theme.bgTop, theme.bg]}
      style={[
        styles.screen,
        {
          // Sistem çubuklarına göre dinamik boşluk (her telefonda doğru)
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 16,
        },
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.6 }}
    >
      {children}
    </LinearGradient>
  );
}

/** Alt ekranlar için yumuşak giriş animasyonu (fade + yukarı kayma). */
export function FadeIn({
  children,
  slideFrom = 24,
  style,
}: {
  children: React.ReactNode;
  slideFrom?: number;
  style?: ViewStyle;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  }, [anim]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [slideFrom, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

export function BigButton({
  label,
  onPress,
  color,
  gradient = false,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  color?: string;
  gradient?: boolean;
  disabled?: boolean;
}) {
  const inner = gradient ? (
    <LinearGradient
      colors={[...theme.brand]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bigButtonInner}
    >
      <Text style={styles.bigButtonText}>{label}</Text>
    </LinearGradient>
  ) : (
    <View
      style={[
        styles.bigButtonInner,
        { backgroundColor: color ?? theme.accent },
      ]}
    >
      <Text style={styles.bigButtonText}>{label}</Text>
    </View>
  );
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.bigButton,
        { opacity: disabled ? 0.4 : pressed ? 0.8 : 1 },
      ]}
    >
      {inner}
    </Pressable>
  );
}

/** Soru ekranları için animasyonlu ilerleme çubuğu. */
export function ProgressBar({
  step,
  total,
  color,
}: {
  step: number;
  total: number;
  color: string;
}) {
  const anim = useRef(new Animated.Value(step / total)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: (step + 1) / total,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [step, total, anim]);
  return (
    <View style={styles.progressTrack}>
      <Animated.View
        style={[
          styles.progressFill,
          {
            backgroundColor: color,
            width: anim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function BackLink({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={12} style={styles.back}>
      <Text style={styles.backText}>‹ {S.back}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    color: theme.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: theme.textDim,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  bigButton: {
    borderRadius: theme.radius,
    overflow: 'hidden',
  },
  bigButtonInner: {
    borderRadius: theme.radius,
    paddingVertical: 18,
    alignItems: 'center',
  },
  bigButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.cardBorder,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  card: {
    backgroundColor: theme.card,
    borderColor: theme.cardBorder,
    borderWidth: 1,
    borderRadius: theme.radius,
    padding: 20,
  },
  back: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backText: {
    color: theme.textDim,
    fontSize: 16,
  },
});
