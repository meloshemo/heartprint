import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { questionsForQuiz, guessText } from '../data/questions';
import { getCategory } from '../data/categories';
import { track } from '../backend/analytics';
import { theme } from '../theme';
import { Quiz } from '../types';
import {
  BackLink,
  BigButton,
  FadeIn,
  ProgressBar,
  Screen,
  Subtitle,
  Title,
} from '../components/ui';
import { Logo } from '../components/Logo';
import { Avatar } from '../components/Avatar';
import { S } from '../i18n/strings';

export function PlayQuizScreen({
  quiz,
  invited = false,
  onDone,
  onBack,
}: {
  quiz: Quiz;
  invited?: boolean;
  onDone: (
    correctCount: number,
    guesserName: string | null,
    guesses: number[]
  ) => void;
  onBack: () => void;
}) {
  // Link ile gelindiyse önce karşılama ekranı göster
  const [started, setStarted] = useState(!invited);
  const [guesserName, setGuesserName] = useState('');
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [guesses, setGuesses] = useState<number[]>([]);
  const category = getCategory(quiz.cat);
  const questions = questionsForQuiz(quiz.cat, quiz.q);
  const total = Math.min(quiz.answers.length, questions.length);
  const question = questions[step];
  const isAnon = quiz.cat === 'anonim';
  const who = isAnon ? S.mysteryOne : quiz.name;
  // İSİM ZORUNLU: anonim testte GİZLİ OLAN test SAHİBİDİR, çözen değil.
  // Sahibi "kim çözdü" görebilsin diye ad her durumda istenir.
  const finalGuesser = guesserName.trim() || null;
  const nameOk = guesserName.trim().length >= 2;

  if (!started) {
    return (
      <Screen>
        <FadeIn>
          <View style={styles.introTop}>
            <Logo size={64} gradient />
            <Text style={styles.introBrand}>heartprint</Text>
          </View>
          <View style={styles.introIcon}>
            <Avatar cat={quiz.cat} size={92} />
          </View>
          <Title>
            {isAnon ? S.playIntroAnonTitle : S.playIntroTitle(who)}
          </Title>
          <Subtitle>
            {isAnon ? S.playIntroAnonSub(total) : S.playIntroSub(total)}
          </Subtitle>
          <TextInput
            value={guesserName}
            onChangeText={setGuesserName}
            placeholder={S.guesserNamePlaceholder}
            placeholderTextColor={theme.textDim}
            style={styles.nameInput}
            maxLength={20}
          />
          <BigButton
            label={S.startQuiz}
            gradient
            disabled={!nameOk}
            onPress={() => {
              // Huninin kritik adımı: linke tıklayanların kaçı gerçekten
              // başlıyor? Bu olay olmadan bitirme oranı hesaplanamaz.
              track('test_baslatildi', { cat: quiz.cat });
              setStarted(true);
            }}
          />
        </FadeIn>
      </Screen>
    );
  }

  const pick = (index: number) => {
    const isCorrect = index === quiz.answers[step];
    const nextCorrect = correct + (isCorrect ? 1 : 0);
    const nextGuesses = [...guesses, index];
    if (step + 1 < total) {
      setCorrect(nextCorrect);
      setGuesses(nextGuesses);
      setStep(step + 1);
    } else {
      onDone(nextCorrect, finalGuesser, nextGuesses);
    }
  };

  return (
    <Screen>
      <BackLink onPress={onBack} />
      <ProgressBar step={step} total={total} color={category.color} />
      <FadeIn key={step} slideFrom={40}>
        <Text style={[styles.progress, { color: category.color }]}>
          {S.progress(step + 1, total)}
        </Text>
        <Title>{guessText(question.textGuess, quiz.name, isAnon)}</Title>
        <Subtitle>{S.playHint}</Subtitle>
        <View style={{ gap: 12 }}>
          {question.options.map((opt, i) => (
            <Pressable
              key={i}
              onPress={() => pick(i)}
              style={({ pressed }) => [
                styles.option,
                {
                  borderColor: pressed ? category.color : theme.cardBorder,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </Pressable>
          ))}
        </View>
      </FadeIn>
    </Screen>
  );
}

const styles = StyleSheet.create({
  introTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  introBrand: {
    color: theme.text,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  introIcon: {
    marginBottom: 16,
  },
  nameInput: {
    backgroundColor: theme.card,
    borderColor: theme.cardBorder,
    borderWidth: 1,
    borderRadius: theme.radius,
    color: theme.text,
    fontSize: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 16,
  },
  progress: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  option: {
    backgroundColor: theme.card,
    borderWidth: 1.5,
    borderRadius: theme.radius,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  optionText: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
