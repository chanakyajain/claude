import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import StoneImage from '../../components/StoneImage';
import {
  categories,
  categoryLabel,
  products,
  searchProducts,
  type CategoryKey,
  type Product,
} from '../../constants/products';
import { colors, radius, spacing, type } from '../../constants/theme';

type Filter = CategoryKey | 'all';

export default function CollectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();

  const initialFilter = useMemo<Filter>(() => {
    const fromParam = params.category;
    return categories.some((c) => c.key === fromParam)
      ? (fromParam as CategoryKey)
      : 'all';
  }, [params.category]);

  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const matched = searchProducts(query);
    return filter === 'all' ? matched : matched.filter((p) => p.category === filter);
  }, [query, filter]);

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
      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color={colors.textFaint} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search granite…"
          placeholderTextColor={colors.textFaint}
          style={styles.searchInput}
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} hitSlop={10}>
            <Ionicons name="close-circle" size={18} color={colors.textFaint} />
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroller}
        contentContainerStyle={styles.chipRow}
      >
        <Chip label="All" active={filter === 'all'} onPress={() => setFilter('all')} />
        {categories.map((cat) => (
          <Chip
            key={cat.key}
            label={cat.label}
            active={filter === cat.key}
            onPress={() => setFilter(cat.key)}
          />
        ))}
      </ScrollView>

      <Text style={styles.resultCount}>
        {visible.length} of {products.length} varieties
      </Text>

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
            <Ionicons name="search-outline" size={32} color={colors.textFaint} />
            <Text style={styles.emptyText}>No granite matches “{query}”</Text>
          </View>
        }
      />
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

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    padding: 0,
  },

  chipScroller: { flexGrow: 0, marginTop: spacing.md },
  chipRow: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
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
  chipText: { ...type.caption, color: colors.textMuted },
  chipTextActive: { color: colors.bg, fontWeight: '700' },

  resultCount: {
    ...type.caption,
    color: colors.textFaint,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },

  grid: {
    padding: spacing.lg,
    paddingTop: spacing.md,
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
