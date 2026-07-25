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
import { theme } from '../theme';
import { BackLink, Card, FadeIn, Screen, Subtitle, Title } from '../components/ui';
import { Avatar } from '../components/Avatar';
import { S } from '../i18n/strings';

function ResultsList({ quizId, isAnon }: { quizId: string; isAnon: boolean }) {
  const [results, setResults] = useState<QuizResult[] | null>(null);

  useEffect(() => {
    const unsub = listenResults(quizId, setResults);
    return unsub;
  }, [quizId]);

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
        return (
          <View key={r.id} style={styles.resultRow}>
            <Text style={styles.resultName}>{name}</Text>
            <Text style={styles.resultScore}>
              {r.correct}/{r.total}
            </Text>
            <Text style={[styles.resultPct, { color }]}>%{r.percent}</Text>
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
                    <ResultsList quizId={item.id} isAnon={item.cat === 'anonim'} />
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
});
