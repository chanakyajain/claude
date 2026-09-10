import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FloatingMenuButton from '../components/FloatingMenuButton';
import StoneImage from '../components/StoneImage';
import { saleItems } from '../constants/sales';
import { colors, radius, spacing, type } from '../constants/theme';

export default function SalesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: typeof saleItems[0] }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/product/${item.slug}`)}
      accessibilityRole="button"
      accessibilityLabel={`View ${item.name}`}
    >
      <View style={styles.imageContainer}>
        <StoneImage slug={item.slug} name={item.name} style={styles.image} compact />
        <View style={styles.saleBadge}>
          <Ionicons name="pricetag" size={14} color={colors.bg} />
          <Text style={styles.saleBadgeText}>SALE</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.priceRow}>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>Rs.{item.originalPrice}</Text>
          )}
          <Text style={styles.currentPrice}>Rs.{item.currentPrice}</Text>
        </View>

        <View style={styles.stockRow}>
          <Ionicons name="cube-outline" size={14} color={colors.textFaint} />
          <Text style={styles.stockText}>{item.squareFeetRemaining} sq ft left</Text>
        </View>
      </View>

      <Pressable
        style={styles.viewButton}
        onPress={() => router.push(`/product/${item.slug}`)}
        accessibilityLabel={`View ${item.name} details`}
      >
        <Text style={styles.viewButtonText}>View</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.gold} />
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <Text style={styles.title}>On Sale</Text>
        <Text style={styles.subtitle}>{saleItems.length} items available</Text>
      </View>

      <FlatList
        data={saleItems}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <FloatingMenuButton />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },

  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { ...type.display, color: colors.text, marginBottom: spacing.sm },
  subtitle: { ...type.caption, color: colors.textFaint },

  list: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  card: {
    flexDirection: 'row',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    alignItems: 'center',
  },

  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  image: { width: '100%', height: '100%' },
  saleBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
  },
  saleBadgeText: {
    ...type.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.bg,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  name: { ...type.heading, color: colors.text },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  originalPrice: {
    ...type.caption,
    color: colors.textFaint,
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    ...type.heading,
    color: colors.gold,
  },

  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  stockText: { ...type.caption, color: colors.textFaint, fontSize: 11 },

  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  viewButtonText: {
    ...type.caption,
    color: colors.gold,
    fontWeight: '600',
  },
});
