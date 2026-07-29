import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  ClipPath,
  Defs,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import { CategoryId, FunnyResult } from '../types';
import { GRAD } from './Avatar';
import { S } from '../i18n/strings';
import { Logo } from './Logo';
import { WEB_BASE_URL } from '../config';

// Paylaşılan kartta gösterilecek marka adresi ("https://" olmadan, sade).
const BRAND_DOMAIN = WEB_BASE_URL.replace(/^https?:\/\//, '');

const GOLD = '#FFCE4F';
const BG = '#0A0A16';

// Kalp path'i (merkez 0,0; y ∈ [-185, 235], yükseklik 420).
function heartPath(s: number): string {
  return `M 0,${-95 * s}
    C ${-55 * s},${-185 * s} ${-210 * s},${-165 * s} ${-230 * s},${-40 * s}
    C ${-243 * s},${45 * s} ${-140 * s},${140 * s} 0,${235 * s}
    C ${140 * s},${140 * s} ${243 * s},${45 * s} ${230 * s},${-40 * s}
    C ${210 * s},${-165 * s} ${55 * s},${-185 * s} 0,${-95 * s} Z`;
}
function up(s: string, max = 10): string {
  const t = s.trim();
  return (t.length > max ? t.slice(0, max) : t).toLocaleUpperCase('tr');
}

/** Parmak izi kalbi — yüzdeye göre altınla dolan görsel skor. */
function HeartFill({ percent }: { percent: number }) {
  const top = 235 - (420 * Math.max(percent, 0)) / 100; // dolgunun üst kenarı
  return (
    <Svg width="100%" height="100%" viewBox="-260 -205 520 470">
      <Defs>
        <ClipPath id="hc">
          <Path d={heartPath(1)} />
        </ClipPath>
      </Defs>
      {/* Kalp içi: koyu taban + alttan yükselen altın dolgu */}
      <Path d={heartPath(1)} fill="#151528" />
      <Rect x={-260} y={top} width={520} height={265 - top} fill={GOLD} clipPath="url(#hc)" />
      {/* Kalp konturu */}
      <Path d={heartPath(1)} fill="none" stroke={GOLD} strokeWidth={9} strokeLinejoin="round" />
    </Svg>
  );
}

/**
 * "İlişkinin Parmak İzi" Story kartı. Metinler RN katmanında (native'de emoji
 * renkli, hizalama doğru); kalp + altın dolgu SVG. 1080x1920 yakalanır.
 */
export function StoryCard({
  cat,
  percent,
  correct,
  total,
  solverName,
  targetName,
  isAnon,
  result,
}: {
  cat: CategoryId;
  percent: number;
  correct: number;
  total: number;
  solverName: string;
  targetName: string;
  isAnon: boolean;
  result: FunnyResult;
}) {
  const [c0, c1] = GRAD[cat];
  const left = isAnon || !solverName.trim() ? S.cardYou : up(solverName);
  const right = isAnon ? '?' : up(targetName);
  const sub = isAnon ? S.cardSubAnon : S.cardSub;
  const tFont = result.title.length > 30 ? 17 : result.title.length > 22 ? 19 : 22;

  return (
    <View style={styles.wrap}>
      {/* Aurora zemin */}
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 178" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <RadialGradient id="a1" cx="15%" cy="8%" r="55%">
            <Stop offset="0%" stopColor={c0} stopOpacity={0.5} />
            <Stop offset="100%" stopColor={c0} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="a2" cx="90%" cy="60%" r="60%">
            <Stop offset="0%" stopColor={c1} stopOpacity={0.45} />
            <Stop offset="100%" stopColor={c1} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="a3" cx="45%" cy="100%" r="55%">
            <Stop offset="0%" stopColor="#FF3E6C" stopOpacity={0.25} />
            <Stop offset="100%" stopColor="#FF3E6C" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width={100} height={178} fill={BG} />
        <Rect width={100} height={178} fill="url(#a1)" />
        <Rect width={100} height={178} fill="url(#a2)" />
        <Rect width={100} height={178} fill="url(#a3)" />
      </Svg>

      {/* İçerik */}
      <View style={styles.content}>
        {/* Afiş */}
        <View style={styles.center}>
          <Text style={styles.kicker}>{isAnon ? S.cardKickerAnon : S.cardKicker}</Text>
          <Text style={styles.versus} numberOfLines={1} adjustsFontSizeToFit>
            {left} <Text style={{ color: GOLD }}>✕</Text> {right}
          </Text>
          <Text style={styles.bannerSub}>{sub}</Text>
        </View>

        {/* Yüzde (kalbin ÜSTÜNDE). Sağda görünmez ayna "%" ile blok simetrik
            hale getirilir — yoksa soldaki "%" rakamı sola kaydırır. */}
        <View style={styles.percentRow}>
          <Text style={styles.percentSign}>%</Text>
          <Text style={styles.percentNum}>{percent}</Text>
          <Text style={[styles.percentSign, styles.percentSignGhost]}>%</Text>
        </View>

        {/* Parmak izi kalbi — altın dolgu */}
        <View style={styles.heartBox}>
          <HeartFill percent={percent} />
        </View>

        {/* Skor (kalbin ALTINDA) */}
        <Text style={styles.score}>{S.cardCorrect(correct, total)}</Text>

        {/* Verdict sticker */}
        <View style={styles.sticker}>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>{result.emoji}</Text>
          </View>
          <Text style={[styles.verdict, { fontSize: tFont }]} numberOfLines={2}>
            {result.title}
          </Text>
          <Text style={styles.verdictSub} numberOfLines={2}>
            {result.subtitle}
          </Text>
        </View>

        {/* CTA — sade tek satır kanca (URL pili ve "YOUR TURN?" kaldırıldı) */}
        <Text style={styles.hook}>{S.cardHook2}</Text>

        {/* Marka damgası: kartı gören herkes hangi uygulama olduğunu ve nereden
            bulacağını anlasın (ekran görüntüsü / repost olsa bile kalıcı). */}
        <View style={styles.brandRow}>
          <Logo size={16} color="#FFFFFF" />
          <Text style={styles.brandText}>{BRAND_DOMAIN}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    // Story tam-taşma (9:16): köşeler yuvarlatılmaz → yakalanan PNG'de şeffaf
    // köşe boşluğu oluşmaz. Ekrandaki yuvarlak görünüm ResultScreen'de sağlanır.
    width: '100%',
    aspectRatio: 9 / 16,
    overflow: 'hidden',
    backgroundColor: BG,
  },
  content: {
    flex: 1,
    paddingVertical: '7%',
    paddingHorizontal: '6%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: { alignItems: 'center' },
  kicker: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 6,
  },
  versus: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  bannerSub: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
  },
  percentRow: { flexDirection: 'row', alignItems: 'flex-start' },
  percentSign: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 10,
    marginRight: 2,
    opacity: 0.9,
  },
  percentSignGhost: {
    marginRight: 0,
    marginLeft: 2,
    opacity: 0, // sadece simetri için — görünmez
  },
  percentNum: {
    color: '#fff',
    fontSize: 82,
    fontWeight: '900',
    lineHeight: 86,
    letterSpacing: -3,
  },
  heartBox: { width: '58%', aspectRatio: 1.05 },
  score: { color: GOLD, fontSize: 17, fontWeight: '800', marginBottom: 14 },
  sticker: {
    width: '92%',
    backgroundColor: GOLD,
    borderRadius: 22,
    marginTop: 18,
    paddingTop: 26,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -26,
    left: '50%',
    marginLeft: -26, // tam yatay ortalama (genişliğin yarısı)
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: BG,
    borderWidth: 4,
    borderColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: { fontSize: 26 },
  verdict: {
    color: '#14142A',
    fontWeight: '900',
    textAlign: 'center',
  },
  verdictSub: {
    color: 'rgba(20,20,42,0.75)',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 3,
  },
  hook: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    opacity: 0.6,
  },
  brandText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
