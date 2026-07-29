import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateQuizScreen } from './src/screens/CreateQuizScreen';
import { ShareScreen } from './src/screens/ShareScreen';
import { EnterCodeScreen } from './src/screens/EnterCodeScreen';
import { PlayQuizScreen } from './src/screens/PlayQuizScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { MyTestsScreen } from './src/screens/MyTestsScreen';
import { LinkErrorScreen } from './src/screens/LinkErrorScreen';
import { Category, Quiz } from './src/types';
import { useInitialQuiz } from './src/utils/useInitialQuiz';
import { useNotificationNav } from './src/utils/useNotificationNav';
import { SmartBanner } from './src/components/SmartBanner';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { initAds, maybeShowInterstitial } from './src/ads/ads';

type Route =
  | { name: 'home' }
  | { name: 'create'; category: Category }
  | { name: 'share'; quiz: Quiz }
  | { name: 'enterCode' }
  | { name: 'play'; quiz: Quiz; quizId: string | null; invited?: boolean }
  | {
      name: 'result';
      quiz: Quiz;
      correctCount: number;
      quizId: string | null;
      guesserName: string | null;
      guesses: number[];
    }
  | { name: 'myTests'; focusQuizId?: string }
  | { name: 'linkError'; reason: 'notFound' | 'limitReached' };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'home' });
  const { data: invited, notFound, limitReached } = useInitialQuiz();

  // Reklam SDK'sını başta hazırla (web'de no-op)
  useEffect(() => {
    initAds();
  }, []);

  // Bir test linkiyle açıldıysa doğrudan teste başlat
  useEffect(() => {
    if (invited) {
      setRoute({
        name: 'play',
        quiz: invited.quiz,
        quizId: invited.quizId,
        invited: true,
      });
    }
  }, [invited]);

  // Link vardı ama test yüklenemedi → dostça hata ekranı
  useEffect(() => {
    if (notFound) setRoute({ name: 'linkError', reason: 'notFound' });
  }, [notFound]);

  // Link geçerli ama hakkı dolmuş (MAX_PLAYS kez çözülmüş) → ayrı mesaj
  useEffect(() => {
    if (limitReached) setRoute({ name: 'linkError', reason: 'limitReached' });
  }, [limitReached]);

  // Bildirime dokunulunca "Testlerim" ekranını ilgili teste odaklı aç
  useNotificationNav((quizId) => {
    setRoute({ name: 'myTests', focusQuizId: quizId });
  });

  // Donanım geri tuşu: ana ekran değilse uygulamadan çıkmak yerine ana ekrana dön
  useEffect(() => {
    const onBack = () => {
      if (route.name !== 'home') {
        setRoute({ name: 'home' });
        return true; // geri tuşunu biz ele aldık
      }
      return false; // ana ekranda: varsayılan (uygulamadan çık)
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => sub.remove();
  }, [route.name]);

  return (
    <SafeAreaProvider>
    <ErrorBoundary>
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <SmartBanner />
      {route.name === 'home' && (
        <HomeScreen
          onSelectCategory={(category) => setRoute({ name: 'create', category })}
          onEnterCode={() => setRoute({ name: 'enterCode' })}
          onMyTests={() => setRoute({ name: 'myTests' })}
        />
      )}
      {route.name === 'create' && (
        <CreateQuizScreen
          category={route.category}
          onDone={(quiz) => setRoute({ name: 'share', quiz })}
          onBack={() => setRoute({ name: 'home' })}
        />
      )}
      {route.name === 'share' && (
        <ShareScreen
          quiz={route.quiz}
          onPlaySamePhone={(quizId) =>
            // Aynı telefonda da link gelmiş gibi: karşılama + isim ekranı göster
            setRoute({ name: 'play', quiz: route.quiz, quizId, invited: true })
          }
          onBack={() => setRoute({ name: 'home' })}
        />
      )}
      {route.name === 'enterCode' && (
        <EnterCodeScreen
          onQuizLoaded={(quiz, quizId) =>
            setRoute({ name: 'play', quiz, quizId, invited: true })
          }
          onBack={() => setRoute({ name: 'home' })}
        />
      )}
      {route.name === 'play' && (
        <PlayQuizScreen
          quiz={route.quiz}
          invited={route.invited}
          onDone={async (correctCount, guesserName, guesses) => {
            const q = route.quiz;
            const qid = route.quizId;
            // Sonucu göstermeden önce geçiş reklamı (ilk oyun hariç, web'de no-op)
            await maybeShowInterstitial();
            setRoute({
              name: 'result',
              quiz: q,
              correctCount,
              quizId: qid,
              guesserName,
              guesses,
            });
          }}
          onBack={() => setRoute({ name: 'home' })}
        />
      )}
      {route.name === 'result' && (
        <ResultScreen
          quiz={route.quiz}
          correctCount={route.correctCount}
          quizId={route.quizId}
          guesserName={route.guesserName}
          guesses={route.guesses}
          onRestart={() => setRoute({ name: 'home' })}
        />
      )}
      {route.name === 'myTests' && (
        <MyTestsScreen
          focusQuizId={route.focusQuizId}
          onBack={() => setRoute({ name: 'home' })}
        />
      )}
      {route.name === 'linkError' && (
        <LinkErrorScreen
          reason={route.reason}
          onHome={() => setRoute({ name: 'home' })}
        />
      )}
    </View>
    </ErrorBoundary>
    </SafeAreaProvider>
  );
}
