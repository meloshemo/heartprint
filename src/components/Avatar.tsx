import React from 'react';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  Line,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import { CategoryId } from '../types';

// Kategori karakter avatarları — sevgili/anne/baba vb. karakter olarak.
// GRAD, sonuç kartının arka planında da kullanılır (kategoriye özel kart rengi).
export const GRAD: Record<CategoryId, [string, string]> = {
  sevgili: ['#FF5E7E', '#C9184A'],
  anne: ['#C77DFF', '#7B2CBF'],
  baba: ['#4CC9F0', '#3A0CA3'],
  bff: ['#FFC53D', '#FB8500'],
  kardes: ['#7C93FF', '#3B4FD8'],
  eski: ['#AAB2C0', '#5C6B7A'],
  anonim: ['#2BE5A8', '#087F5B'],
};
const SKIN = '#FFD8B8';
const SKIN2 = '#E8B48C';
const HAIR = '#3A2A20';

function Head({ cx, cy, r, skin = SKIN }: { cx: number; cy: number; r: number; skin?: string }) {
  return <Circle cx={cx} cy={cy} r={r} fill={skin} />;
}
function Eyes({ cx, cy, d = 10, r = 2.6 }: { cx: number; cy: number; d?: number; r?: number }) {
  return (
    <>
      <Circle cx={cx - d / 2} cy={cy} r={r} fill="#2A2A35" />
      <Circle cx={cx + d / 2} cy={cy} r={r} fill="#2A2A35" />
    </>
  );
}
function Smile({ cx, cy, w = 12 }: { cx: number; cy: number; w?: number }) {
  return (
    <Path
      d={`M ${cx - w / 2},${cy} Q ${cx},${cy + w * 0.7} ${cx + w / 2},${cy}`}
      fill="none"
      stroke="#B5566B"
      strokeWidth={2.4}
      strokeLinecap="round"
    />
  );
}
function Blush({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <Circle cx={cx - 11} cy={cy} r={3.4} fill="#FF9AAE" opacity={0.6} />
      <Circle cx={cx + 11} cy={cy} r={3.4} fill="#FF9AAE" opacity={0.6} />
    </>
  );
}

function Character({ cat }: { cat: CategoryId }) {
  switch (cat) {
    case 'sevgili':
      return (
        <>
          <Path d="M 60,22 C 55,14 44,17 46,26 C 47,32 56,36 60,42 C 64,36 73,32 74,26 C 76,17 65,14 60,22 Z" fill="#fff" />
          <G transform="translate(-6, 8)">
            <Head cx={46} cy={60} r={20} />
            <Path d="M 26,58 a 20 20 0 0 1 40 0 v -7 a 20 20 0 0 0 -40 0 z" fill={HAIR} />
            <Eyes cx={46} cy={58} d={11} />
            <Smile cx={46} cy={68} w={11} />
            <Blush cx={46} cy={64} />
          </G>
          <G transform="translate(10, 8)">
            <Head cx={74} cy={60} r={20} skin={SKIN2} />
            <Path d="M 54,66 c -2,-20 8,-24 20,-24 c 12,0 22,4 20,24 l -5,-2 c 1,-14 -5,-17 -15,-17 c -10,0 -16,3 -15,17 z" fill="#5A3A28" />
            <Path d="M 55,60 c -3,8 -2,18 0,24 l 4,-2 c -2,-8 -2,-16 -1,-22 z" fill="#5A3A28" />
            <Path d="M 93,60 c 3,8 2,18 0,24 l -4,-2 c 2,-8 2,-16 1,-22 z" fill="#5A3A28" />
            <Eyes cx={74} cy={58} d={11} />
            <Smile cx={74} cy={68} w={11} />
            <Blush cx={74} cy={64} />
          </G>
        </>
      );
    case 'anne':
      return (
        <>
          <Head cx={60} cy={50} r={24} />
          <Circle cx={60} cy={22} r={9} fill={HAIR} />
          <Path d="M 36,52 a 24 24 0 0 1 48 0 v -4 a 24 24 0 0 0 -48 0 z" fill={HAIR} />
          <Eyes cx={60} cy={48} d={13} r={3} />
          <Smile cx={60} cy={60} w={14} />
          <Blush cx={60} cy={55} />
          <G transform="translate(0, 4)">
            <Head cx={60} cy={86} r={14} skin={SKIN2} />
            <Path d="M 47,84 a 14 14 0 0 1 26 0 z" fill="#5A3A28" />
            <Eyes cx={60} cy={84} d={8} r={2} />
            <Path d="M 55,90 Q 60,94 65,90" stroke="#B5566B" strokeWidth={1.8} fill="none" strokeLinecap="round" />
          </G>
        </>
      );
    case 'baba':
      return (
        <>
          <Path d="M 40,84 c -6,-6 -6,-22 2,-30 l 36,0 c 8,8 8,24 2,30 c -4,4 -34,4 -40,0 z" fill="#4A342A" />
          <Head cx={60} cy={52} r={25} />
          <Path d="M 36,46 c 2,-16 12,-22 24,-22 c 12,0 22,6 24,22 c -4,-8 -10,-11 -12,-11 l -3,5 -9,-4 -9,4 -3,-5 c -2,0 -8,3 -12,11 z" fill="#3A2A20" />
          <Circle cx={51} cy={50} r={8} fill="#fff" opacity={0.35} />
          <Circle cx={69} cy={50} r={8} fill="#fff" opacity={0.35} />
          <Circle cx={51} cy={50} r={8} fill="none" stroke="#2A2A35" strokeWidth={2.4} />
          <Circle cx={69} cy={50} r={8} fill="none" stroke="#2A2A35" strokeWidth={2.4} />
          <Line x1={59} y1={50} x2={61} y2={50} stroke="#2A2A35" strokeWidth={2.4} />
          <Circle cx={51} cy={50} r={2.6} fill="#2A2A35" />
          <Circle cx={69} cy={50} r={2.6} fill="#2A2A35" />
          <Path d="M 49,64 Q 60,68 71,64 Q 60,71 49,64" fill="#3A2A20" />
          <Path d="M 54,72 Q 60,75 66,72" stroke="#B5566B" strokeWidth={2} fill="none" strokeLinecap="round" />
        </>
      );
    case 'bff':
      return (
        <>
          <Path d="M 60,26 C 56,20 48,22 49,29 C 50,34 57,37 60,42 C 63,37 70,34 71,29 C 72,22 64,20 60,26 Z" fill="#fff" opacity={0.9} />
          <G transform="translate(-8, 10)">
            <Head cx={44} cy={58} r={19} />
            <Path d="M 25,56 a 19 19 0 0 1 38 0 v -5 a 19 19 0 0 0 -38 0 z" fill="#6B3A1E" />
            <Eyes cx={44} cy={56} d={10} />
            <Smile cx={44} cy={66} w={10} />
          </G>
          <G transform="translate(10, 8)">
            <Head cx={76} cy={58} r={19} skin={SKIN2} />
            <Path d="M 57,54 a 19 19 0 0 1 38 0 c 0,-14 -38,-14 -38,0 z M 58,54 c -1,6 0,12 2,16 l 3,-2 c -2,-5 -2,-9 -1,-13 z" fill="#1E1E28" />
            <Eyes cx={76} cy={56} d={10} />
            <Smile cx={76} cy={66} w={10} />
          </G>
        </>
      );
    case 'kardes':
      return (
        <>
          {/* Büyük kardeş (solda), kolu küçüğün başının üstünde */}
          <G transform="translate(-8, 2)">
            <Head cx={46} cy={54} r={21} />
            <Path d="M 25,52 c 1,-14 9,-19 21,-19 c 12,0 20,5 21,19 c -4,-7 -9,-9 -11,-9 l -2,4 -8,-3 -8,3 -2,-4 c -2,0 -7,2 -11,9 z" fill={HAIR} />
            <Eyes cx={46} cy={53} d={11} />
            <Smile cx={46} cy={63} w={11} />
          </G>
          {/* Kol: büyükten küçüğün başına */}
          <Path d="M 52,68 Q 68,60 80,64" stroke={SKIN} strokeWidth={8} fill="none" strokeLinecap="round" />
          {/* Küçük kardeş (sağda), sırıtıyor */}
          <G transform="translate(6, 14)">
            <Head cx={74} cy={62} r={16} skin={SKIN2} />
            <Path d="M 58,60 a 16 16 0 0 1 32 0 v -4 a 16 16 0 0 0 -32 0 z" fill="#5A3A28" />
            <Eyes cx={74} cy={60} d={9} r={2.2} />
            <Path d="M 69,68 Q 74,73 79,68 Z" fill="#B5566B" />
            <Blush cx={74} cy={65} />
          </G>
          {/* Oyunbaz kıvılcım */}
          <Path d="M 92,26 l 2,6 6,2 -6,2 -2,6 -2,-6 -6,-2 6,-2 z" fill="#fff" opacity={0.9} />
          <Path d="M 24,30 l 1.4,4 4,1.4 -4,1.4 -1.4,4 -1.4,-4 -4,-1.4 4,-1.4 z" fill="#fff" opacity={0.7} />
        </>
      );
    case 'eski':
      return (
        <>
          <Head cx={56} cy={52} r={23} />
          <Path d="M 33,50 a 23 23 0 0 1 46 0 v -4 a 23 23 0 0 0 -46 0 z" fill={HAIR} />
          <Eyes cx={56} cy={50} d={12} r={2.8} />
          <Path d="M 46,64 Q 56,60 66,64" stroke="#7A8290" strokeWidth={2.4} fill="none" strokeLinecap="round" />
          <G transform="translate(78, 78)">
            <Path d="M 0,-6 C -5,-13 -16,-8 -14,1 C -13,7 -4,10 0,16 L -3,2 L 4,-3 L -1,-8 Z" fill="#E23A4E" />
            <Path d="M 2,-8 C 7,-13 17,-8 15,1 C 14,7 4,10 0,16 L 3,2 L -4,-3 L 1,-8 Z" fill="#C42438" />
          </G>
        </>
      );
    case 'anonim':
      return (
        <>
          <Path d="M 60,20 C 34,20 28,52 30,74 C 30,80 34,84 40,84 L 80,84 C 86,84 90,80 90,74 C 92,52 86,20 60,20 Z" fill="#12352B" />
          <Path d="M 60,30 C 44,30 40,52 42,70 L 78,70 C 80,52 76,30 60,30 Z" fill="#0A1F19" />
          <Ellipse cx={52} cy={56} rx={4} ry={5} fill="#3BF0B0" />
          <Ellipse cx={68} cy={56} rx={4} ry={5} fill="#3BF0B0" />
          <Circle cx={52} cy={56} r={1.6} fill="#fff" />
          <Circle cx={68} cy={56} r={1.6} fill="#fff" />
        </>
      );
  }
}

/** Kategoriye özel, gradyanlı yuvarlak karo içinde karakter avatarı. */
export function Avatar({ cat, size = 56 }: { cat: CategoryId; size?: number }) {
  const [c0, c1] = GRAD[cat];
  const gid = `av_${cat}`;
  const radius = size * 0.23;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <RadialGradient id={gid} cx="35%" cy="28%" r="85%">
          <Stop offset="0%" stopColor={c0} />
          <Stop offset="100%" stopColor={c1} />
        </RadialGradient>
      </Defs>
      <Rect width={120} height={120} rx={radius * (120 / size)} fill={`url(#${gid})`} />
      <Character cat={cat} />
    </Svg>
  );
}
