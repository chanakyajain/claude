import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { getThumbnail } from '../constants/photos';
import { colors, spacing, type } from '../constants/theme';

interface StoneImageProps {
  slug: string;
  name: string;
  style?: StyleProp<ViewStyle>;
  /** Compact placeholder for grid tiles; full placeholder for the product page. */
  compact?: boolean;
}

/**
 * Renders a stone's thumbnail photo, falling back to a styled placeholder
 * when no photo has been registered yet — so the app runs with photos
 * added over time.
 */
export default function StoneImage({ slug, name, style, compact }: StoneImageProps) {
  const photo = getThumbnail(slug);

  if (photo) {
    return (
      <View style={[styles.base, style]}>
        <Image source={photo} style={styles.image} resizeMode="cover" />
      </View>
    );
  }

  return (
    <View style={[styles.base, styles.placeholder, style]}>
      <Ionicons
        name="diamond-outline"
        size={compact ? 22 : 40}
        color={colors.textFaint}
      />
      {!compact && <Text style={styles.placeholderName}>{name}</Text>}
      <Text style={compact ? styles.hintCompact : styles.hint}>Photo coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surfaceRaised,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  placeholderName: {
    ...type.heading,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  hint: {
    ...type.caption,
    color: colors.textFaint,
  },
  hintCompact: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.textFaint,
  },
});
