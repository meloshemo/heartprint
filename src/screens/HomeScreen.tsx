import React, { useEffect, useRef } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CATEGORIES } from '../data/categories';
import { theme } from '../theme';
import { Category } from '../types';
import { Screen } from '../components/ui';
import { Logo } from '../components/Logo';
import { Avatar } from '../components/Avatar';
import { S } from '../i18n/strings';

function CategoryCard({
  item,
  index,
  onPress,
}: {
  item: Category;
  index: number;
  onPress: () => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      delay: index * 70,
      useNativeDriver: true,
      tension: 70,
      friction: 10,
    }).start();
  }, [anim, index]);

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            }),
          },
        ],
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.catCard,
          { transform: [{ scale: pressed ? 0.97 : 1 }] },
        ]}
      >
        <View style={[styles.catAccent, { backgroundColor: item.color }]} />
        <Avatar cat={item.id} size={52} />
        <View style={{ flex: 1 }}>
          <Text style={styles.catTitle}>{item.title}</Text>
          <Text style={styles.catSubtitle}>{item.subtitle}</Text>
        </View>
        <Text style={[styles.catArrow, { color: item.color }]}>›</Text>
      </Pressable>
    </Animated.View>
  );
}

export function HomeScreen({
  onSelectCategory,
  onEnterCode,
  onMyTests,
}: {
  onSelectCategory: (cat: Category) => void;
  onEnterCode: () => void;
  onMyTests: () => void;
}) {
  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Logo size={52} gradient />
          <Text style={styles.brand}>heartprint</Text>
          <View style={{ flex: 1 }} />
          <Pressable onPress={onMyTests} hitSlop={10} style={styles.myTestsBtn}>
            <Text style={styles.myTestsText}>{S.myTests}</Text>
          </Pressable>
        </View>
        <Text style={styles.tagline}>{S.homeTagline}</Text>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(c) => c.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryCard
            item={item}
            index={index}
            onPress={() => onSelectCategory(item)}
          />
        )}
      />

      <Pressable
        onPress={onEnterCode}
        style={({ pressed }) => [styles.codeButton, { opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={styles.codeButtonText}>{S.gotCode}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brand: {
    color: theme.text,
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -1.8,
  },
  tagline: {
    color: theme.textDim,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
  },
  myTestsBtn: {
    borderWidth: 1.5,
    borderColor: theme.cardBorder,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  myTestsText: {
    color: theme.text,
    fontSize: 13,
    fontWeight: '700',
  },
  catCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: theme.radius,
    padding: 16,
    paddingLeft: 20,
    marginBottom: 12,
    gap: 14,
    overflow: 'hidden',
  },
  catAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  catEmoji: {
    fontSize: 32,
  },
  catTitle: {
    color: theme.text,
    fontSize: 17,
    fontWeight: '700',
  },
  catSubtitle: {
    color: theme.textDim,
    fontSize: 13,
    marginTop: 2,
  },
  catArrow: {
    fontSize: 28,
    fontWeight: '700',
  },
  codeButton: {
    marginTop: 8,
    borderRadius: theme.radius,
    borderWidth: 1.5,
    borderColor: theme.success,
    paddingVertical: 16,
    alignItems: 'center',
  },
  codeButtonText: {
    color: theme.success,
    fontSize: 15,
    fontWeight: '700',
  },
});
