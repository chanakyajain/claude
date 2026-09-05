import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';

import { getCategoryCollage } from '../constants/photos';
import { countByCategory, type Category } from '../constants/products';
import { colors, radius, spacing, type } from '../constants/theme';

interface CategoryTileProps {
  category: Category;
}

/**
 * Home-screen category card. Shows a 3-photo collage backdrop once photos
 * exist for that category; until then, a plain surface keeps the tile
 * legible so the grid never looks broken.
 */
export default function CategoryTile({ category }: CategoryTileProps) {
  const collage = getCategoryCollage(category.key);
  const count = countByCategory(category.key);

  return (
    <View style={styles.card}>
      {collage.length > 0 ? (
        <View style={styles.collage}>
          {collage.map((photo, i) => (
            <Image
              key={i}
              source={photo}
              style={styles.collageSlice}
              resizeMode="cover"
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyBackdrop} />
      )}

      {/* Scrim keeps the text legible over a bright photo. */}
      <LinearGradient
        colors={['transparent', 'rgba(6,6,7,0.55)', 'rgba(6,6,7,0.92)']}
        locations={[0, 0.45, 1]}
        style={styles.scrim}
      />

      <View style={styles.textBlock}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.name}>{category.label}</Text>
        <Text style={styles.blurb} numberOfLines={1}>
          {category.blurb}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 1.15,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  collage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  collageSlice: {
    flex: 1,
    height: '100%',
  },
  emptyBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceRaised,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.md,
  },
  count: { ...type.display, color: colors.gold },
  name: { ...type.heading, color: colors.text, marginTop: 2 },
  blurb: { ...type.caption, color: colors.textMuted, marginTop: 2 },
});
