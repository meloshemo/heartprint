import React from 'react';
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

// Uygulama ikonundaki parmak izi kalp — marka logosu.
// Native (react-native-svg) uyumlu: Mask / strokeDasharray YOK. Bunlar bazı
// cihazlarda render olmuyordu ve logo minik görünüyordu. Bunun yerine dolu
// gradyan kalp + üstünde ince eşmerkezli kalp çizgileri (parmak izi hissi).
const HEART =
  'M 0 -35 C 30 -75, 90 -55, 90 -10 C 90 30, 40 55, 0 85 C -40 55, -90 30, -90 -10 C -90 -55, -30 -75, 0 -35 Z';

// Parmak izi hissi için eşmerkezli iç kalp çizgileri (dolu kalbin üstünde).
const RIDGES = [0.72, 0.5, 0.28];

export function Logo({
  size = 64,
  color,
  gradient = false,
}: {
  size?: number;
  color?: string;
  gradient?: boolean;
}) {
  const fill = gradient ? 'url(#lg)' : (color ?? '#FFFFFF');
  // Dolu kalbi kutunun büyük kısmını dolduracak şekilde ölçekle (net görünür).
  const S = 5.2;
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024">
      {gradient && (
        <Defs>
          <LinearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FF3E6C" />
            <Stop offset="0.55" stopColor="#B033D9" />
            <Stop offset="1" stopColor="#6A2BF2" />
          </LinearGradient>
        </Defs>
      )}
      <G transform={`translate(512 500) scale(${S})`}>
        {/* Dolu kalp — marka gövdesi */}
        <Path d={HEART} fill={fill} />
        {/* Parmak izi çizgileri: dolu kalbin içinde ince beyaz eşmerkezli hatlar */}
        {RIDGES.map((r, i) => (
          <G key={i} transform={`scale(${r})`}>
            <Path
              d={HEART}
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity={0.45}
              strokeWidth={7 / (S * r)}
              strokeLinejoin="round"
            />
          </G>
        ))}
      </G>
    </Svg>
  );
}
