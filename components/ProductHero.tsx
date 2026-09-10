import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  type ImageSourcePropType,
  type ListRenderItemInfo,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { colors, spacing, type } from '../constants/theme';

interface ProductHeroProps {
  slug: string;
  name: string;
  photos: ImageSourcePropType[];
  /** Distance from the screen bottom for the dots, so they clear the action row. */
  dotsBottom?: number;
}

/**
 * Full-bleed hero for the product page. Swipes through every photo
 * registered for the stone, with dot pagination; falls back to a single
 * placeholder frame so the layout holds before photos are added.
 */
export default function ProductHero({ name, photos, dotsBottom = 128 }: ProductHeroProps) {
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const frames = photos.length > 0 ? photos : [null];
  const arrowOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Only show arrow if there are multiple photos
    if (frames.length <= 1) return;

    // Fade out arrow after 2 seconds
    Animated.timing(arrowOpacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [frames.length, arrowOpacity]);

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
    },
    [width]
  );

  const renderFrame = useCallback(
    ({ item }: ListRenderItemInfo<ImageSourcePropType | null>) => (
      <View style={[styles.frame, { width, height }]}>
        {item ? (
          <Image source={item} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="diamond-outline" size={44} color={colors.textFaint} />
            <Text style={styles.placeholderName}>{name}</Text>
            <Text style={styles.placeholderHint}>Photo coming soon</Text>
          </View>
        )}
      </View>
    ),
    [width, height, name]
  );

  return (
    <View style={{ height }}>
      <FlatList
        data={frames}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderFrame}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
      />

      {frames.length > 1 && (
        <>
          <Animated.View
            style={[styles.swipeHint, { opacity: arrowOpacity }]}
            pointerEvents="none"
          >
            <Ionicons name="chevron-forward" size={40} color="rgba(255, 255, 255, 0.7)" />
          </Animated.View>

          <View style={[styles.dots, { bottom: dotsBottom }]}>
            {frames.map((_, i) => (
              <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: colors.surfaceRaised,
  },
  image: { width: '100%', height: '100%' },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  placeholderName: { ...type.heading, color: colors.textMuted, marginTop: spacing.xs },
  placeholderHint: { ...type.caption, color: colors.textFaint },

  dots: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(245, 245, 240, 0.35)',
  },
  dotActive: {
    backgroundColor: colors.gold,
    width: 16,
  },

  swipeHint: {
    position: 'absolute',
    right: spacing.lg,
    top: '50%',
    marginTop: -20,
    zIndex: 5,
  },
});
