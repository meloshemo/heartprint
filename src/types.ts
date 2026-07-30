export type CategoryId =
  | 'sevgili'
  | 'anne'
  | 'baba'
  | 'bff'
  | 'kardes'
  | 'eski'
  | 'anonim';

export interface Category {
  id: CategoryId;
  emoji: string;
  title: string;
  subtitle: string;
  /** Yönelme hâli: "Şimdi {toWhom} gönder" cümlesinde kullanılır. */
  toWhom: string;
  color: string;
}

export interface Question {
  id: number;
  /** Testi oluşturan kişinin gördüğü metin (birinci şahıs). */
  text: string;
  /** Tahmin edenin gördüğü metin; {name} gönderenin adıyla değiştirilir. */
  textGuess: string;
  options: [string, string, string, string];
  /**
   * Kültüre özel soru: YALNIZCA bu dildeki cihazlarda test oluştururken
   * SEÇİLİR. Ama soru her iki dilde de tanımlıdır ve id ile her cihazda
   * ÇÖZÜLEBİLİR — aksi halde soru düşer, cevap dizisi kayar ve puanlama
   * sessizce bozulurdu (bkz. PlayQuizScreen: questions[step] ↔ answers[step]).
   */
  only?: 'tr' | 'en';
}

/** Testi oluşturan kişinin paketi — kısa ID veya base64 kod olarak paylaşılır. */
export interface Quiz {
  v: 1;
  cat: CategoryId;
  name: string;
  /** Her soru için doğru seçeneğin indeksi (0-3). */
  answers: number[];
  /** Bu teste seçilen soruların id'leri (rastgele havuzdan). Eski testlerde yok. */
  q?: number[];
}

export interface FunnyResult {
  emoji: string;
  title: string;
  subtitle: string;
}
