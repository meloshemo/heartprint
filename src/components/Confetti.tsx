import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const COLORS = ['#FF3E6C', '#B033D9', '#6A2BF2', '#FFB703', '#06D6A0', '#4CC9F0'];
const PIECES = 26;

function Piece({ index }: { index: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window');
  const startX = Math.random() * width;
  const drift = (Math.random() - 0.5) * 120;
  const size = 6 + Math.random() * 8;
  const color = COLORS[index % COLORS.length];
  const duration = 2200 + Math.random() * 1800;
  const delay = Math.random() * 700;
  const isRound = index % 3 === 0;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [anim, duration, delay]);

  return (
    <Animated.View
      style={[
        styles.piece,
        {
          left: startX,
          width: size,
          height: isRound ? size : size * 2.2,
          borderRadius: isRound ? size / 2 : 2,
          backgroundColor: color,
          opacity: anim.interpolate({
            inputRange: [0, 0.75, 1],
            outputRange: [1, 1, 0],
          }),
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [-40, height * 0.9],
              }),
            },
            { translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [0, drift] }) },
            {
              rotate: anim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', `${360 + Math.random() * 360}deg`],
              }),
            },
          ],
        },
      ]}
    />
  );
}

/** Sonuç ekranında bir kez yağan konfeti. */
export function Confetti() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.noTouch]}>
      {Array.from({ length: PIECES }, (_, i) => (
        <Piece key={i} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  noTouch: {
    pointerEvents: 'none',
  },
  piece: {
    position: 'absolute',
    top: 0,
    pointerEvents: 'none',
  },
});
