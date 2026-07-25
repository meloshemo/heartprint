import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ViewShot, { ViewShotRef } from 'react-native-view-shot';
import { StoryCard } from '../components/StoryCard';
import { LoopCard } from '../components/LoopCard';
import { S } from '../i18n/strings';
import { getFunnyResult } from '../data/results';
import { getCategory } from '../data/categories';
import { questionsForQuiz, guessText } from '../data/questions';
import { WEB_BASE_URL } from '../config';
import { theme } from '../theme';
import { Quiz } from '../types';
import { BigButton, Screen } from '../components/ui';
import { Confetti } from '../components/Confetti';
import { DownloadCTA } from '../components/DownloadCTA';
import { saveResult } from '../backend/quizzes';
import { track } from '../backend/analytics';
import { showRewarded } from '../ads/ads';
import {
  openInstagram,
  openTikTok,
  shareImage,
  shareTextWhatsApp,
  shareToInstagramStory,
} from '../utils/share';

export function ResultScreen({
  quiz,
  correctCount,
  quizId = null,
  guesserName = null,
  guesses = [],
  onRestart,
}: {
  quiz: Quiz;
  correctCount: number;
  quizId?: string | null;
  guesserName?: string | null;
  guesses?: number[];
  onRestart: () => void;
}) {
  const category = getCategory(quiz.cat);
  const questions = useMemo(
    () => questionsForQuiz(quiz.cat, quiz.q),
    [quiz.cat, quiz.q]
  );
  const total = Math.min(quiz.answers.length, questions.length);
  const percent = Math.round((correctCount / total) * 100);
  const isAnon = quiz.cat === 'anonim';
  const who = isAnon ? S.mysteryOne : quiz.name;

  const result = useMemo(
    () => getFunnyResult(quiz.cat, percent),
    [quiz.cat, percent]
  );

  // Yanlış cevaplanan sorular (tahmin ≠ doğru)
  const wrongList = useMemo(() => {
    const out: { text: string; correct: string; guessed: string }[] = [];
    for (let i = 0; i < total; i++) {
      const g = guesses[i];
      const correctIdx = quiz.answers[i];
      if (g === undefined || g === correctIdx) continue;
      const q = questions[i];
      if (!q) continue;
      out.push({
        text: guessText(q.textGuess, quiz.name, isAnon),
        correct: q.options[correctIdx],
        guessed: q.options[g],
      });
    }
    return out;
  }, [total, guesses, quiz.answers, questions, who]);

  const cardRef = useRef<ViewShotRef>(null);
  const [sharing, setSharing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  // Link ile gelinen bir testse sonucu backend'e yaz → sahibine bildirim gider.
  useEffect(() => {
    track('test_cozuldu', { cat: quiz.cat, percent, linkli: !!quizId });
    if (!quizId) return;
    saveResult(quizId, correctCount, total, guesserName).catch((e) =>
      console.log('Sonuç kaydedilemedi:', e)
    );
  }, [quizId, correctCount, total, guesserName]);

  // Kart giriş animasyonu (hafif büyüme)
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const whose = isAnon ? S.fromTestAnon : S.fromTest(who);
  const shareMessage =
    percent >= 70
      ? S.resultShareHigh(whose, percent, result.title, WEB_BASE_URL)
      : S.resultShareLow(whose, percent, result.title, WEB_BASE_URL);

  const captureCard = async (): Promise<string | undefined> => {
    try {
      return await cardRef.current?.capture?.();
    } catch {
      return undefined;
    }
  };

  // Story kartını görsel olarak paylaş (sistem paylaşım sayfası: IG/TikTok/WA)
  const shareCard = async () => {
    try {
      setSharing(true);
      track('sonuc_paylasildi', { cat: quiz.cat, via: 'kart', percent });
      const uri = await captureCard();
      if (uri) await shareImage(uri, shareMessage);
      else await shareTextWhatsApp(shareMessage);
    } finally {
      setSharing(false);
    }
  };

  // Instagram: kartı DOĞRUDAN Story'ye gönder (Android) / paylaşım sayfası
  const onInstagram = async () => {
    try {
      setSharing(true);
      track('sonuc_paylasildi', { cat: quiz.cat, via: 'instagram', percent });
      const uri = await captureCard();
      if (uri) await shareToInstagramStory(uri, shareMessage);
      else await openInstagram(WEB_BASE_URL);
    } finally {
      setSharing(false);
    }
  };

  // WhatsApp: metin/link değil, KART görselini paylaş (çözen kişi için mantıklı).
  const onWhatsApp = async () => {
    try {
      setSharing(true);
      track('sonuc_paylasildi', { cat: quiz.cat, via: 'whatsapp', percent });
      const uri = await captureCard();
      if (uri) await shareImage(uri, shareMessage);
      else await shareTextWhatsApp(shareMessage);
    } finally {
      setSharing(false);
    }
  };

  // TikTok: kartı görsel olarak paylaşım sayfasıyla (TikTok orada çıkar)
  const onTikTok = async () => {
    try {
      setSharing(true);
      track('sonuc_paylasildi', { cat: quiz.cat, via: 'tiktok', percent });
      const uri = await captureCard();
      if (uri) await shareImage(uri, shareMessage);
      else await openTikTok(WEB_BASE_URL);
    } finally {
      setSharing(false);
    }
  };

  // Ödüllü reklam → yanlış cevaplanan soruları göster (web'de reklamsız)
  const revealWrong = async () => {
    setUnlocking(true);
    try {
      const earned = await showRewarded();
      if (earned) setRevealed(true);
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.cardDisplay, { transform: [{ scale: scaleAnim }] }]}>
          {/* Instagram Story kartı (9:16) — yüksek çözünürlükte yakalanıp paylaşılır.
              Yakalanan görsel TAM DÖRTGEN (köşe boşluğu olmasın); yuvarlak görünüm
              yalnızca ekran önizlemesinde (cardDisplay). */}
          <ViewShot
            ref={cardRef}
            options={{ format: 'png', quality: 1, width: 1080, height: 1920 }}
            style={styles.cardWrap}
          >
            <StoryCard
              cat={quiz.cat}
              percent={percent}
              correct={correctCount}
              total={total}
              solverName={guesserName || ''}
              targetName={who}
              isAnon={isAnon}
              result={result}
            />
          </ViewShot>
        </Animated.View>

        <View style={{ height: 20 }} />

        {/* Story kartını paylaş (görsel — tüm uygulamalar) */}
        <BigButton
          label={sharing ? S.preparing : S.shareCard}
          gradient
          disabled={sharing}
          onPress={shareCard}
        />

        {/* Platform butonları */}
        <View style={styles.platformRow}>
          <PlatformButton
            label="WhatsApp"
            emoji="💬"
            color="#25D366"
            onPress={onWhatsApp}
          />
          <PlatformButton
            label="Instagram"
            emoji="📸"
            color="#E1306C"
            onPress={onInstagram}
          />
          <PlatformButton
            label="TikTok"
            emoji="🎵"
            color="#000000"
            onPress={onTikTok}
          />
        </View>

        {/* Yanlış cevapları göster (ödüllü reklam) */}
        {wrongList.length > 0 && !revealed && (
          <>
            <View style={{ height: 12 }} />
            <BigButton
              label={unlocking ? S.adLoading : S.revealWrong(wrongList.length)}
              color={theme.card}
              disabled={unlocking}
              onPress={revealWrong}
            />
          </>
        )}

        {revealed && wrongList.length > 0 && (
          <View style={styles.wrongBox}>
            <Text style={styles.wrongTitle}>{S.mismatches}</Text>
            {wrongList.map((w, i) => (
              <View key={i} style={styles.wrongItem}>
                <Text style={styles.wrongQ}>{w.text}</Text>
                <Text style={styles.wrongCorrect}>{S.correctLabel}{w.correct}</Text>
                <Text style={styles.wrongGuess}>{S.guessedLabel}{w.guessed}</Text>
              </View>
            ))}
          </View>
        )}

        {/* VİRAL DÖNGÜ: birinin testini çözdüysen (quizId), şimdi seni
            teste sokan bir "sıra sende" kancası — alan kişi de kurucu olur. */}
        {quizId && (
          <LoopCard targetName={isAnon ? S.loopTargetThey : who} onPress={onRestart} />
        )}

        <View style={{ height: 12 }} />
        {/* Web'de (indirmemiş oyuncu) uygulamaya çeken kart; native'de null */}
        <DownloadCTA />
        <View style={{ height: 12 }} />
        <BigButton
          label={quizId ? S.home : S.newTest}
          color={theme.card}
          onPress={onRestart}
        />
      </ScrollView>
      <Confetti />
    </Screen>
  );
}

function PlatformButton({
  label,
  emoji,
  color,
  onPress,
}: {
  label: string;
  emoji: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.platformBtn,
        { borderColor: color, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={styles.platformEmoji}>{emoji}</Text>
      <Text style={styles.platformLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },
  // Ekran önizlemesi: yuvarlak köşe + taşmayı gizle (yakalanan PNG'yi etkilemez)
  cardDisplay: {
    borderRadius: 26,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },
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
  wrongBox: {
    marginTop: 14,
    backgroundColor: theme.card,
    borderColor: theme.cardBorder,
    borderWidth: 1,
    borderRadius: theme.radius,
    padding: 16,
    gap: 12,
  },
  wrongTitle: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '800',
  },
  wrongItem: {
    borderTopWidth: 1,
    borderTopColor: theme.cardBorder,
    paddingTop: 10,
    gap: 3,
  },
  wrongQ: {
    color: theme.text,
    fontSize: 14,
    fontWeight: '700',
  },
  wrongCorrect: { color: theme.success, fontSize: 13 },
  wrongGuess: { color: theme.accent, fontSize: 13 },
});
