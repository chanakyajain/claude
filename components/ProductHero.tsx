import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import {
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
}

/**
 * Full-bleed hero for the product page. Swipes through every photo
 * registered for the stone, with dot pagination; falls back to a single
 * placeholder frame so the layout holds before photos are added.
 */
export default function ProductHero({ name, photos }: ProductHeroProps) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const frames = photos.length > 0 ? photos : [null];

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
    },
    [width]
  );

  const renderFrame = useCallback(
    ({ item }: ListRenderItemInfo<ImageSourcePropType | null>) => (
      <View style={[styles.frame, { width }]}>
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
    [width, name]
  );

  return (
    <View>
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
        <View style={styles.dots}>
          {frames.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    aspectRatio: 4 / 3,
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
    bottom: spacing.md,
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
});
