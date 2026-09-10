import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  type ListRenderItemInfo,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import StoneImage from './StoneImage';
import { getProductPhotos } from '../constants/photos';
import { findProduct, type Product } from '../constants/products';
import { colors, radius, spacing, type } from '../constants/theme';

/** A handful of stones shown in rotation on the home screen. */
const FEATURED_SLUGS = [
  'black-galaxy-small-flower',
  'alaska-white',
  'tan-brown',
  'blue-in-the-night',
  'peacock-green',
  'diamond-black',
];

const ADVANCE_INTERVAL_MS = 2500;
/** Horizontal inset matching the screen's content padding, so the carousel
 *  measures the same width as everything else on Home. */
const SIDE_INSET = spacing.lg * 2;

export default function FeaturedCarousel() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const cardWidth = windowWidth - SIDE_INSET;

  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Product>>(null);
  const indexRef = useRef(0);

  // Skip any stone without a photo — a "Photo coming soon" placeholder is a
  // poor thing to headline the home screen with.
  const stones = FEATURED_SLUGS.map((slug) => findProduct(slug))
    .filter((p): p is Product => p !== undefined)
    .filter((p) => getProductPhotos(p.slug).length > 0);

  useEffect(() => {
    if (stones.length < 2) return;
    const timer = setInterval(() => {
      const next = (indexRef.current + 1) % stones.length;
      listRef.current?.scrollToOffset({ offset: next * cardWidth, animated: true });
    }, ADVANCE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [stones.length, cardWidth]);

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const next = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
      indexRef.current = next;
      setIndex(next);
    },
    [cardWidth]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => (
      <Pressable
        style={[styles.card, { width: cardWidth }]}
        onPress={() => router.push(`/product/${item.slug}`)}
        accessibilityRole="button"
        accessibilityLabel={`View ${item.name}`}
      >
        <StoneImage slug={item.slug} name={item.name} style={styles.image} />

        <LinearGradient
          pointerEvents="none"
          colors={['transparent', 'rgba(6,6,7,0.45)', 'rgba(6,6,7,0.85)']}
          locations={[0, 0.5, 1]}
          style={styles.scrim}
        />

        <View style={styles.overlay}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>FEATURED</Text>
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.hintRow}>
            <Text style={styles.hint}>Tap to view this granite</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.gold} />
          </View>
        </View>
      </Pressable>
    ),
    [cardWidth, router]
  );

  if (stones.length === 0) return null;

  return (
    <View>
      <FlatList
        ref={listRef}
        data={stones}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, i) => ({ length: cardWidth, offset: cardWidth * i, index: i })}
      />
      {stones.length > 1 && (
        <View style={styles.dots}>
          {stones.map((s, i) => (
            <View key={s.slug} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  image: { width: '100%', aspectRatio: 16 / 10 },
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
    marginBottom: spacing.md,
  },
  badgeText: {
    ...type.caption,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: colors.bg,
  },
  name: { ...type.display, color: colors.text },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  hint: { ...type.caption, color: 'rgba(245, 245, 240, 0.75)' },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.gold,
    width: 16,
  },
});
