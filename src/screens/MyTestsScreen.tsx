import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getCategory } from '../data/categories';
import { deleteQuiz, getMyQuizzes, listenResults, MyQuiz, QuizResult } from '../backend/quizzes';
import { questionsForQuiz, guessText } from '../data/questions';
import { showRewarded } from '../ads/ads';
import { theme } from '../theme';
import { BackLink, Card, FadeIn, Screen, Subtitle, Title } from '../components/ui';
import { Avatar } from '../components/Avatar';
import { S } from '../i18n/strings';
import { LANG } from '../i18n/locale';

/** Türkçe'de "%100", İngilizce'de "100%". */
const pct = (n: number) => (LANG === 'tr' ? `%${n}` : `${n}%`);

/** Bir çözümün yanlışları — ödüllü reklamdan sonra açılır. */
function Mismatches({
  quiz,
  result,
}: {
  quiz: MyQuiz;
  result: QuizResult;
}) {
  const questions = questionsForQuiz(quiz.cat, quiz.q);
  const isAnon = quiz.cat === 'anonim';
  const rows: { text: string; correct: string; guessed: string }[] = [];
  const n = Math.min(quiz.answers.length, questions.length, result.guesses.length);
  for (let i = 0; i < n; i++) {
    const g = result.guesses[i];
    const c = quiz.answers[i];
    if (g === undefined || g === c) continue;
    const q = questions[i];
    if (!q) continue;
    rows.push({
      text: guessText(q.textGuess, quiz.name, isAnon),
      correct: q.options[c],
      guessed: q.options[g],
    });
  }
  if (!rows.length) {
    return <Text style={styles.empty}>{S.noMismatches}</Text>;
  }
  return (
    <View style={styles.mismatchBox}>
      {rows.map((w, i) => (
        <View key={i} style={[styles.mismatchItem, i === 0 && { borderTopWidth: 0 }]}>
          <Text style={styles.mismatchQ}>{w.text}</Text>
          <Text style={styles.mismatchCorrect}>{S.correctLabel}{w.correct}</Text>
          <Text style={styles.mismatchGuess}>{S.guessedLabel}{w.guessed}</Text>
        </View>
      ))}
    </View>
  );
}

function ResultsList({ quiz, isAnon }: { quiz: MyQuiz; isAnon: boolean }) {
  const [results, setResults] = useState<QuizResult[] | null>(null);
  // Hangi sonucun yanlışları açıldı (ödüllü reklam izlendi)
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = listenResults(quiz.id, setResults);
    return unsub;
  }, [quiz.id]);

  const reveal = async (id: string) => {
    setLoadingId(id);
    try {
      const earned = await showRewarded();
      if (earned) setRevealed((m) => ({ ...m, [id]: true }));
    } finally {
      setLoadingId(null);
    }
  };

  if (results === null) {
    return <ActivityIndicator color={theme.accent} style={{ marginVertical: 16 }} />;
  }
  if (results.length === 0) {
    return (
      <Text style={styles.empty}>{S.noneSolved}</Text>
    );
  }
  return (
    <View style={{ gap: 8, marginTop: 4 }}>
      {results.map((r) => {
        const name = isAnon ? S.mysteryOne : r.guesserName || S.someone;
        const color =
          r.percent >= 70 ? theme.success : r.percent >= 45 ? '#FFB703' : theme.accent;
        const wrongCount = Math.max(r.total - r.correct, 0);
        // Eski sonuçlarda guesses yok → yanlışlar gösterilemez
        const canReveal = wrongCount > 0 && r.guesses.length > 0;
        const isOpen = revealed[r.id];
        return (
          <View key={r.id}>
            <View style={styles.resultRow}>
              <Text style={styles.resultName}>{name}</Text>
              <Text style={styles.resultScore}>
                {r.correct}/{r.total}
              </Text>
              <Text style={[styles.resultPct, { color }]}>{pct(r.percent)}</Text>
            </View>
            {canReveal && !isOpen && (
              <Pressable
                onPress={() => reveal(r.id)}
                disabled={loadingId === r.id}
                style={({ pressed }) => [
                  styles.revealBtn,
                  { opacity: pressed || loadingId === r.id ? 0.6 : 1 },
                ]}
              >
                <Text style={styles.revealText}>
                  {loadingId === r.id ? S.adLoading : S.revealWrong(wrongCount)}
                </Text>
              </Pressable>
            )}
            {isOpen && <Mismatches quiz={quiz} result={r} />}
          </View>
        );
      })}
      {results.length >= 50 && (
        <Text style={styles.empty}>{S.showingLast50}</Text>
      )}
    </View>
  );
}

export function MyTestsScreen({
  focusQuizId,
  onBack,
}: {
  focusQuizId?: string;
  onBack: () => void;
}) {
  const [quizzes, setQuizzes] = useState<MyQuiz[] | null>(null);
  const [openId, setOpenId] = useState<string | undefined>(focusQuizId);
  const [error, setError] = useState(false);

  const removeQuiz = (id: string) => {
    deleteQuiz(id)
      .then(() =>
        setQuizzes((list) => (list ? list.filter((q) => q.id !== id) : list))
      )
      .catch(() => {
        if (Platform.OS === 'web') window.alert(S.deleteFailed);
        else Alert.alert('!', S.deleteFailed);
      });
  };

  // Silmeden önce onay — web'de window.confirm, native'de Alert.
  const confirmDelete = (id: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm(S.deleteConfirm)) removeQuiz(id);
      return;
    }
    Alert.alert(S.deleteTitle, S.deleteConfirm, [
      { text: S.deleteCancel, style: 'cancel' },
      { text: S.deleteDo, style: 'destructive', onPress: () => removeQuiz(id) },
    ]);
  };

  useEffect(() => {
    let active = true;
    getMyQuizzes()
      .then((list) => active && setQuizzes(list))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  return (
    <Screen>
      <BackLink onPress={onBack} />
      <FadeIn>
        <Title>{S.myTestsTitle}</Title>
        <Subtitle>{S.myTestsSub}</Subtitle>
      </FadeIn>

      {quizzes === null && !error && (
        <ActivityIndicator color={theme.accent} style={{ marginTop: 32 }} />
      )}

      {error && (
        <Text style={styles.empty}>{S.loadFailed}</Text>
      )}

      {quizzes && quizzes.length === 0 && (
        <Text style={styles.empty}>{S.noTests}</Text>
      )}

      {quizzes && quizzes.length > 0 && (
        <FlatList
          data={quizzes}
          keyExtractor={(q) => q.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8, gap: 12 }}
          renderItem={({ item }) => {
            const cat = getCategory(item.cat);
            const open = openId === item.id;
            return (
              <Card style={{ borderColor: open ? cat.color : theme.cardBorder }}>
                <Pressable
                  onPress={() => setOpenId(open ? undefined : item.id)}
                  style={styles.quizHead}
                >
                  <Avatar cat={item.cat} size={44} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.quizTitle}>{cat.title}</Text>
                    <Text style={styles.quizMeta}>
                      {S.solvedCount(item.playCount)}
                    </Text>
                  </View>
                  <Text style={[styles.chevron, { color: cat.color }]}>
                    {open ? '▾' : '›'}
                  </Text>
                </Pressable>
                {open && (
                  <>
                    <ResultsList quiz={item} isAnon={item.cat === 'anonim'} />
                    <Pressable
                      onPress={() => confirmDelete(item.id)}
                      style={({ pressed }) => [
                        styles.deleteBtn,
                        { opacity: pressed ? 0.6 : 1 },
                      ]}
                    >
                      <Text style={styles.deleteText}>{S.deleteTest}</Text>
                    </Pressable>
                  </>
                )}
              </Card>
            );
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    color: theme.textDim,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 22,
  },
  quizHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quizEmoji: {
    fontSize: 28,
  },
  quizTitle: {
    color: theme.text,
    fontSize: 17,
    fontWeight: '700',
  },
  quizMeta: {
    color: theme.textDim,
    fontSize: 13,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '700',
  },
  deleteBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  deleteText: {
    color: theme.textDim,
    fontSize: 13,
    fontWeight: '700',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.bg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  resultName: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  resultScore: {
    color: theme.textDim,
    fontSize: 14,
  },
  resultPct: {
    fontSize: 16,
    fontWeight: '800',
    width: 56,
    textAlign: 'right',
  },
  revealBtn: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  revealText: {
    color: theme.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  mismatchBox: {
    marginTop: 6,
    backgroundColor: theme.bg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  mismatchItem: {
    borderTopWidth: 1,
    borderTopColor: theme.cardBorder,
    paddingVertical: 10,
    gap: 3,
  },
  mismatchQ: {
    color: theme.text,
    fontSize: 14,
    fontWeight: '700',
  },
  mismatchCorrect: { color: theme.success, fontSize: 13 },
  mismatchGuess: { color: theme.accent, fontSize: 13 },
});
