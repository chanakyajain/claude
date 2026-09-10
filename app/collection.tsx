import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FloatingMenuButton from '../components/FloatingMenuButton';
import StoneImage from '../components/StoneImage';
import {
  categories,
  categoryLabel,
  products,
  type CategoryKey,
  type Product,
} from '../constants/products';
import { colors, radius, spacing, type } from '../constants/theme';

type Filter = CategoryKey | 'all';

function toFilter(value: string | string[] | undefined): Filter {
  return categories.some((c) => c.key === value) ? (value as CategoryKey) : 'all';
}

export default function CollectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ category?: string }>();

  const [filter, setFilter] = useState<Filter>(() => toFilter(params.category));

  // This screen can stay mounted between visits, so follow the incoming
  // category rather than keeping whichever one it first opened with.
  useEffect(() => {
    setFilter(toFilter(params.category));
  }, [params.category]);

  const visible = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  const renderTile = ({ item }: { item: Product }) => (
    <Pressable
      style={styles.tile}
      onPress={() => router.push(`/product/${item.slug}`)}
      accessibilityRole="button"
      accessibilityLabel={`View ${item.name}`}
    >
      <StoneImage slug={item.slug} name={item.name} style={styles.tileImage} compact />
      <View style={styles.tileFooter}>
        <Text style={styles.tileName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.tileCategory} numberOfLines={1}>
          {categoryLabel(item.category)}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      {/* Chips clear the floating menu button, which overlays this row. */}
      <View style={[styles.chipRow, { paddingTop: insets.top + 60 }]}>
        <Chip label="All" active={filter === 'all'} onPress={() => setFilter('all')} />
        {categories.map((cat) => (
          <Chip
            key={cat.key}
            label={cat.label}
            active={filter === cat.key}
            onPress={() => setFilter(cat.key)}
          />
        ))}
      </View>

      <FlatList
        data={visible}
        keyExtractor={(item) => item.slug}
        renderItem={renderTile}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="cube-outline" size={32} color={colors.textFaint} />
            <Text style={styles.emptyText}>Nothing in this category yet.</Text>
          </View>
        }
      />

      <FloatingMenuButton />
    </View>
  );
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  chipText: { ...type.caption, lineHeight: 18, color: colors.textMuted },
  chipTextActive: { color: colors.bg, fontWeight: '700' },

  grid: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  column: { gap: spacing.md },
  tile: {
    flex: 1,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  tileImage: { width: '100%', aspectRatio: 1 },
  tileFooter: { padding: spacing.md },
  tileName: { ...type.heading, color: colors.text },
  tileCategory: {
    ...type.caption,
    color: colors.textFaint,
    marginTop: 2,
  },

  empty: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.xxl,
  },
  emptyText: { ...type.body, color: colors.textMuted },
});
