import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import StoneImage from '../../components/StoneImage';
import {
  categories,
  countByCategory,
  findProduct,
  products,
} from '../../constants/products';
import { business, colors, radius, spacing, type } from '../../constants/theme';

/** The stone shown in the featured slot on the home screen. */
const FEATURED_SLUG = 'black-galaxy-small-flower';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const featured = findProduct(FEATURED_SLUG) ?? products[0];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.brandBlock}>
        <Text style={styles.brand}>GURU GRANITES</Text>
        <Text style={styles.tagline}>Premium Granite Suppliers</Text>
      </View>

      <Text style={styles.sectionLabel}>FEATURED</Text>
      <Pressable
        style={styles.featuredCard}
        onPress={() => router.push(`/product/${featured.slug}`)}
        accessibilityRole="button"
        accessibilityLabel={`View ${featured.name}`}
      >
        <StoneImage
          slug={featured.slug}
          name={featured.name}
          style={styles.featuredImage}
        />
        <View style={styles.featuredFooter}>
          <View style={{ flex: 1 }}>
            <Text style={styles.featuredName}>{featured.name}</Text>
            <Text style={styles.featuredHint}>Tap to view this granite</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={colors.gold} />
        </View>
      </Pressable>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <Text style={styles.totalCount}>{products.length} varieties</Text>
      </View>

      <View style={styles.categoryGrid}>
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={{ pathname: '/collection', params: { category: cat.key } }}
            asChild
          >
            <Pressable style={styles.categoryCard}>
              <Text style={styles.categoryCount}>{countByCategory(cat.key)}</Text>
              <Text style={styles.categoryName}>{cat.label}</Text>
              <Text style={styles.categoryBlurb} numberOfLines={2}>
                {cat.blurb}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <View style={styles.hoursCard}>
        <Ionicons name="time-outline" size={18} color={colors.gold} />
        <Text style={styles.hoursText}>{business.hours}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  brandBlock: { marginBottom: spacing.xl },
  brand: { ...type.display, color: colors.text },
  tagline: {
    ...type.caption,
    color: colors.gold,
    letterSpacing: 1.6,
    marginTop: spacing.xs,
    textTransform: 'uppercase',
  },

  sectionLabel: {
    ...type.label,
    color: colors.textFaint,
    marginBottom: spacing.sm,
  },
  featuredCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
  },
  featuredImage: { width: '100%', aspectRatio: 16 / 10 },
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  featuredName: { ...type.title, color: colors.text },
  featuredHint: {
    ...type.caption,
    color: colors.textMuted,
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: { ...type.title, color: colors.text },
  totalCount: { ...type.caption, color: colors.textFaint },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryCard: {
    flexGrow: 1,
    flexBasis: '46%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  categoryCount: { ...type.display, color: colors.gold },
  categoryName: {
    ...type.heading,
    color: colors.text,
    marginTop: spacing.xs,
  },
  categoryBlurb: {
    ...type.caption,
    color: colors.textFaint,
    marginTop: 2,
  },

  hoursCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xxl,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hoursText: { ...type.caption, color: colors.textMuted },
});
