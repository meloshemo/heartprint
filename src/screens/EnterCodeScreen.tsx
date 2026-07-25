import React, { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { decodeQuiz, extractCode } from '../utils/encoding';
import { getQuiz } from '../backend/quizzes';
import { theme } from '../theme';
import { Quiz } from '../types';
import {
  BackLink,
  BigButton,
  FadeIn,
  Screen,
  Subtitle,
  Title,
} from '../components/ui';
import { S } from '../i18n/strings';

const SHORT_ID = /^[A-HJ-NP-Z2-9]{5,10}$/;

export function EnterCodeScreen({
  onQuizLoaded,
  onBack,
}: {
  onQuizLoaded: (quiz: Quiz, quizId: string | null) => void;
  onBack: () => void;
}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError(false);
    setBusy(true);
    try {
      const raw = extractCode(code);
      // Kısa ID → backend'den çek (sonuç kaydı için quizId taşınır)
      if (SHORT_ID.test(raw)) {
        const quiz = await getQuiz(raw);
        if (quiz) {
          onQuizLoaded(quiz, raw);
          return;
        }
      }
      // Uzun base64 → çevrimdışı çöz
      const decoded = decodeQuiz(raw);
      if (decoded) {
        onQuizLoaded(decoded, null);
        return;
      }
      setError(true);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <BackLink onPress={onBack} />
      <FadeIn>
        <Title>{S.enterCodeTitle} 🎯</Title>
        <Subtitle>{S.enterCodeSub}</Subtitle>
        <TextInput
          value={code}
          onChangeText={(t) => {
            setCode(t);
            setError(false);
          }}
          placeholder={S.enterCodePlaceholder}
          placeholderTextColor={theme.textDim}
          style={styles.input}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
        />
        {error && <Text style={styles.error}>{S.enterCodeError}</Text>}
        <BigButton
          label={busy ? S.preparing : S.enterCodeBtn}
          gradient
          disabled={code.trim().length === 0 || busy}
          onPress={submit}
        />
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.card,
    borderColor: theme.cardBorder,
    borderWidth: 1,
    borderRadius: theme.radius,
    color: theme.text,
    fontSize: 14,
    fontFamily: 'monospace',
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  error: {
    color: theme.accent,
    marginBottom: 12,
  },
});
