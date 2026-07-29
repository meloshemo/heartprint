import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { encodeQuiz } from '../utils/encoding';
import { getCategory } from '../data/categories';
import { quizLink } from '../config';
import { createQuiz, savePushToken } from '../backend/quizzes';
import { track } from '../backend/analytics';
import { registerForPush } from '../backend/notifications';
import {
  openInstagram,
  openTikTok,
  shareTextWhatsApp,
} from '../utils/share';
import { theme } from '../theme';
import { Quiz } from '../types';
import {
  BackLink,
  BigButton,
  Card,
  FadeIn,
  Screen,
  Subtitle,
  Title,
} from '../components/ui';
import { S } from '../i18n/strings';

export function ShareScreen({
  quiz,
  onPlaySamePhone,
  onBack,
}: {
  quiz: Quiz;
  onPlaySamePhone: (quizId: string | null) => void;
  onBack: () => void;
}) {
  const category = getCategory(quiz.cat);
  const isAnon = quiz.cat === 'anonim';
  const [link, setLink] = useState<string | null>(null);
  // Backend'e kaydedilen testin kısa ID'si (aynı telefonda çözünce de sonuç
  // kaydı bu ID ile Testlerim'e düşsün). Base64 yedekte null kalır.
  const [quizId, setQuizId] = useState<string | null>(null);
  const [copied, setCopied] = useState<null | 'link'>(null);

  // Testi backend'e kaydet, kısa link üret. Backend erişilemezse base64 yedek.
  // HIZ: push token'ı BEKLEMEDEN testi oluştur (token izin/ağ çağrısı yavaş);
  // link anında görünsün, token arka planda eklensin.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const id = await createQuiz(quiz, null);
        track('test_olusturuldu', { cat: quiz.cat });
        if (active) {
          setQuizId(id);
          setLink(quizLink(id));
        }
        // Bildirim token'ını arka planda al ve teste ekle (linki bloklamaz)
        registerForPush()
          .then((token) => {
            if (token) savePushToken(id, token);
          })
          .catch(() => {});
      } catch (e) {
        console.log('Backend kaydı başarısız, çevrimdışı linke düşülüyor:', e);
        if (active) setLink(quizLink(encodeQuiz(quiz)));
      }
    })();
    return () => {
      active = false;
    };
  }, [quiz]);

  const message = isAnon
    ? S.shareMsgAnon(link ?? '')
    : S.shareMsg(quiz.name, category.emoji, link ?? '');

  const copy = () => {
    if (!link) return;
    Clipboard.setStringAsync(link);
    setCopied('link');
    setTimeout(() => setCopied(null), 1800);
  };

  const ready = link !== null;

  return (
    <Screen>
      <BackLink onPress={onBack} />
      <FadeIn>
        <Title>{S.shareReady}</Title>
        <Subtitle>{S.shareSub(category.toWhom)}</Subtitle>

        <Card style={{ marginBottom: 16, minHeight: 92, justifyContent: 'center' }}>
          {ready ? (
            <>
              <Text style={styles.codeLabel}>{S.yourLink}</Text>
              <Text style={styles.code} numberOfLines={2} ellipsizeMode="middle">
                {link}
              </Text>
            </>
          ) : (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={theme.accent} />
              <Text style={styles.loadingText}>{S.linkPreparing}</Text>
            </View>
          )}
        </Card>

        <BigButton
          label={S.share}
          gradient
          disabled={!ready}
          onPress={() => {
            track('test_paylasildi', { cat: quiz.cat, via: 'sistem' });
            Share.share({ message });
          }}
        />

        {/* Platform butonları */}
        <View style={styles.platformRow}>
          <PlatformBtn
            label="WhatsApp"
            emoji="💬"
            color="#25D366"
            disabled={!ready}
            onPress={() => {
              track('test_paylasildi', { cat: quiz.cat, via: 'whatsapp' });
              shareTextWhatsApp(message);
            }}
          />
          <PlatformBtn
            label="Instagram"
            emoji="📸"
            color="#E1306C"
            disabled={!ready}
            onPress={() => {
              track('test_paylasildi', { cat: quiz.cat, via: 'instagram' });
              if (link) openInstagram(link);
            }}
          />
          <PlatformBtn
            label="TikTok"
            emoji="🎵"
            color="#000000"
            disabled={!ready}
            onPress={() => {
              track('test_paylasildi', { cat: quiz.cat, via: 'tiktok' });
              if (link) openTikTok(link);
            }}
          />
        </View>

        <Text style={styles.or}>{S.or}</Text>
        <BigButton
          label={copied === 'link' ? S.copied : S.copyLink}
          color={theme.card}
          disabled={!ready}
          onPress={copy}
        />
        <Text style={styles.or}>{S.or}</Text>
        <BigButton
          label={S.playSamePhone}
          color={theme.success}
          onPress={() => onPlaySamePhone(quizId)}
        />
      </FadeIn>
    </Screen>
  );
}

function PlatformBtn({
  label,
  emoji,
  color,
  disabled,
  onPress,
}: {
  label: string;
  emoji: string;
  color: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.platformBtn,
        { borderColor: color, opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={styles.platformEmoji}>{emoji}</Text>
      <Text style={styles.platformLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  platformRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  platformBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: theme.radius,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: theme.card,
  },
  platformEmoji: { fontSize: 22 },
  platformLabel: {
    color: theme.text,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  codeLabel: {
    color: theme.textDim,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  code: {
    color: theme.text,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: theme.textDim,
    fontSize: 15,
  },
  or: {
    color: theme.textDim,
    textAlign: 'center',
    marginVertical: 10,
  },
});
