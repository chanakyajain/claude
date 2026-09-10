import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GlassButton from '../components/GlassButton';
import MenuSheet from '../components/MenuSheet';
import StoneImage from '../components/StoneImage';
import {
  categories,
  categoryLabel,
  searchProducts,
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
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // This screen can stay mounted between visits, so follow the incoming
  // category rather than keeping whichever one it first opened with.
  useEffect(() => {
    setFilter(toFilter(params.category));
  }, [params.category]);

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
    <View style={[styles.screen, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.header}>
        <GlassButton
          icon="menu"
          onPress={() => setMenuOpen(true)}
          accessibilityLabel="Open menu"
        />
        <Text style={styles.headerTitle}>Collection</Text>
        <Text style={styles.headerCount}>{visible.length} varieties</Text>
      </View>

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

      {/* Wraps onto as many rows as needed so no chip is ever cut off. */}
      <View style={styles.chipRow}>
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
            <Ionicons name="search-outline" size={32} color={colors.textFaint} />
            <Text style={styles.emptyText}>No granite matches “{query}”</Text>
          </View>
        }
      />

      <MenuSheet visible={menuOpen} onClose={() => setMenuOpen(false)} />
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerTitle: { ...type.title, color: colors.text, flex: 1 },
  headerCount: { ...type.caption, color: colors.gold },

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

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
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
