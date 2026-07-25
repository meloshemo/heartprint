import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { pickQuestions } from '../data/questions';
import { theme } from '../theme';
import { Category, Quiz } from '../types';
import {
  BackLink,
  BigButton,
  FadeIn,
  ProgressBar,
  Screen,
  Subtitle,
  Title,
} from '../components/ui';
import { Avatar } from '../components/Avatar';
import { S } from '../i18n/strings';

export function CreateQuizScreen({
  category,
  onDone,
  onBack,
}: {
  category: Category;
  onDone: (quiz: Quiz) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState('');
  const [step, setStep] = useState(-1); // -1: isim ekranı, 0..n-1: sorular
  const [answers, setAnswers] = useState<number[]>([]);
  // Bu test için rastgele 12 soru — bir kez seçilir, sabit kalır
  const questions = useMemo(() => pickQuestions(category.id, 12), [category.id]);

  if (step === -1) {
    return (
      <Screen>
        <BackLink onPress={onBack} />
        <FadeIn>
          <View style={styles.catBadgeRow}>
            <Avatar cat={category.id} size={40} />
            <Text style={styles.catBadge}>{category.title}</Text>
          </View>
          <Title>{S.createNameTitle}</Title>
          <Subtitle>{S.createNameSub}</Subtitle>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={S.yourName}
              placeholderTextColor={theme.textDim}
              style={styles.input}
              maxLength={20}
            />
            <BigButton
              label={S.toQuestions}
              gradient
              disabled={name.trim().length < 2}
              onPress={() => setStep(0)}
            />
          </KeyboardAvoidingView>
        </FadeIn>
      </Screen>
    );
  }

  const question = questions[step];

  const pick = (index: number) => {
    const next = [...answers, index];
    if (step + 1 < questions.length) {
      setAnswers(next);
      setStep(step + 1);
    } else {
      onDone({
        v: 1,
        cat: category.id,
        name: name.trim(),
        answers: next,
        q: questions.map((q) => q.id),
      });
    }
  };

  return (
    <Screen>
      <BackLink
        onPress={() => {
          if (step === 0) {
            setStep(-1);
            setAnswers([]);
          } else {
            setStep(step - 1);
            setAnswers(answers.slice(0, -1));
          }
        }}
      />
      <ProgressBar step={step} total={questions.length} color={category.color} />
      <FadeIn key={step} slideFrom={40}>
        <Text style={[styles.progress, { color: category.color }]}>
          {S.progress(step + 1, questions.length)}
        </Text>
        <Title>{question.text}</Title>
        <Subtitle>{S.createHint}</Subtitle>
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
  catBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  catBadge: {
    color: theme.text,
    fontSize: 17,
    fontWeight: '800',
  },
  input: {
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
