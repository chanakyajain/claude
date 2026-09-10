import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CategoryTile from '../../components/CategoryTile';
import FeaturedCarousel from '../../components/FeaturedCarousel';
import GlassButton from '../../components/GlassButton';
import MenuSheet from '../../components/MenuSheet';
import { categories, products } from '../../constants/products';
import { business, colors, radius, spacing, type } from '../../constants/theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.lg },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <GlassButton
            icon="menu"
            onPress={() => setMenuOpen(true)}
            accessibilityLabel="Open menu"
          />
        </View>

        <FeaturedCarousel />

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
              <Pressable style={styles.categoryTilePressable}>
                <CategoryTile category={cat} />
              </Pressable>
            </Link>
          ))}
        </View>

        <View style={styles.hoursCard}>
          <Ionicons name="time-outline" size={18} color={colors.gold} />
          <Text style={styles.hoursText}>{business.hours}</Text>
        </View>
      </ScrollView>

      <MenuSheet visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  topRow: {
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  sectionTitle: { ...type.title, color: colors.text },
  totalCount: { ...type.caption, color: colors.textFaint },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryTilePressable: {
    flexGrow: 1,
    flexBasis: '46%',
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
