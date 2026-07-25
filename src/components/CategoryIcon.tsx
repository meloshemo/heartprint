import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { CategoryId } from '../types';
import { getCategory } from '../data/categories';

// Merkezlenmiş kalp yolu (parmak izi-kalp markasıyla uyumlu organik biçim)
function heart(cx: number, cy: number, s: number): string {
  return `M ${cx},${cy - 20 * s}
   C ${cx - 14 * s},${cy - 34 * s} ${cx - 34 * s},${cy - 20 * s} ${cx - 34 * s},${cy - 2 * s}
   C ${cx - 34 * s},${cy + 16 * s} ${cx - 12 * s},${cy + 26 * s} ${cx},${cy + 38 * s}
   C ${cx + 12 * s},${cy + 26 * s} ${cx + 34 * s},${cy + 16 * s} ${cx + 34 * s},${cy - 2 * s}
   C ${cx + 34 * s},${cy - 20 * s} ${cx + 14 * s},${cy - 34 * s} ${cx},${cy - 20 * s} Z`;
}

/** Kategoriye özel çizgi-sanatı glyph'i (emoji değil). */
function Glyph({ cat, color }: { cat: CategoryId; color: string }) {
  const sw = 7;
  const st = {
    fill: 'none',
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (cat) {
    case 'sevgili':
      return (
        <>
          <Path d={heart(42, 44, 0.85)} {...st} />
          <Path d={heart(62, 56, 0.7)} {...st} />
        </>
      );
    case 'anne':
      return (
        <>
          <Path d={heart(50, 48, 1.02)} {...st} />
          <Path d={heart(50, 44, 0.4)} fill={color} />
        </>
      );
    case 'baba':
      return (
        <>
          <Path
            d="M 50,16 C 66,26 80,26 84,26 C 84,52 76,76 50,88 C 24,76 16,52 16,26 C 20,26 34,26 50,16 Z"
            {...st}
          />
          <Path d={heart(50, 46, 0.42)} fill={color} />
        </>
      );
    case 'bff':
      return (
        <>
          <G transform="rotate(-32 50 64)">
            <Path d={heart(40, 46, 0.58)} {...st} />
          </G>
          <G transform="rotate(32 50 64)">
            <Path d={heart(60, 46, 0.58)} {...st} />
          </G>
        </>
      );
    case 'eski':
      return (
        <>
          <Path
            d="M 46,14 C 34,4 12,10 12,32 C 12,50 32,60 46,74 L 40,50 L 52,40 L 44,30 Z"
            {...st}
          />
          <Path
            d="M 54,14 C 66,4 88,10 88,32 C 88,50 68,60 54,74 L 60,50 L 48,40 L 56,30 Z"
            {...st}
          />
        </>
      );
    case 'anonim':
      return (
        <>
          <Path d={heart(50, 48, 1.0)} {...st} />
          <Path
            d="M 40,40 C 40,30 60,30 58,42 C 57,49 50,49 50,57"
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle cx={50} cy={68} r={3.4} fill={color} />
        </>
      );
  }
}

/** Sadece glyph (istenen renkte). */
export function CategoryIcon({
  cat,
  size = 40,
  color = '#FFFFFF',
}: {
  cat: CategoryId;
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Glyph cat={cat} color={color} />
    </Svg>
  );
}

/** Kategori renginde yuvarlak karo içinde beyaz glyph (mini uygulama ikonu gibi). */
export function CategoryTile({
  cat,
  size = 56,
  radius,
}: {
  cat: CategoryId;
  size?: number;
  radius?: number;
}) {
  const color = getCategory(cat).color;
  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: radius ?? size * 0.28,
          backgroundColor: color,
        },
      ]}
    >
      <CategoryIcon cat={cat} size={size * 0.72} color="#FFFFFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
