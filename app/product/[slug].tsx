import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProductHero from '../../components/ProductHero';
import SpacesModal from '../../components/SpacesModal';
import { getProductPhotos, getSpacePhotos } from '../../constants/photos';
import { CARE_NOTE, categoryLabel, findProduct } from '../../constants/products';
import { business, colors, radius, spacing, type } from '../../constants/theme';

export default function ProductScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const product = findProduct(slug ?? '');
  const [spacesOpen, setSpacesOpen] = useState(false);

  if (!product) {
    return (
      <View style={styles.missing}>
        <Ionicons name="alert-circle-outline" size={36} color={colors.textFaint} />
        <Text style={styles.missingText}>This granite could not be found.</Text>
      </View>
    );
  }

  const openUrl = async (url: string, label: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open', `Could not start ${label} on this device.`);
    }
  };

  const callUs = () => openUrl(`tel:${business.phone}`, 'the phone dialler');

  const messageUs = () => {
    const text = encodeURIComponent(`${business.whatsappText} ${product.name}.`);
    openUrl(
      `whatsapp://send?phone=${business.phone.replace('+', '')}&text=${text}`,
      'WhatsApp'
    );
  };

  const needsCareNote = product.type === 'marble' || product.type === 'onyx';

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <ProductHero
            slug={product.slug}
            name={product.name}
            photos={getProductPhotos(product.slug)}
          />

          {/* Transparent overlay header, floating over the hero photo. */}
          <View style={[styles.overlayHeader, { top: insets.top + spacing.sm }]}>
            <Pressable
              onPress={() => router.back()}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.circleButton}
            >
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </Pressable>

            <View style={styles.titlePill}>
              <Text style={styles.titlePillCategory}>
                {categoryLabel(product.category)}
              </Text>
              <Text style={styles.titlePillName} numberOfLines={1}>
                {product.name}
              </Text>
            </View>
          </View>

          {/* Floating Call · In Spaces · WhatsApp row, overlapping the photo's bottom edge. */}
          <View style={styles.floatingActions}>
            <LinearGradient
              pointerEvents="none"
              colors={['transparent', 'rgba(6,6,7,0.65)']}
              style={styles.floatingActionsScrim}
            />
            <Pressable
              style={[styles.actionCircle, { backgroundColor: colors.call }]}
              onPress={callUs}
              accessibilityRole="button"
              accessibilityLabel="Call us"
            >
              <Ionicons name="call" size={22} color={colors.text} />
            </Pressable>

            <Pressable
              style={[styles.actionCircle, styles.actionCircleLarge, { backgroundColor: colors.gold }]}
              onPress={() => setSpacesOpen(true)}
              accessibilityRole="button"
              accessibilityLabel={`See ${product.name} in spaces`}
            >
              <Ionicons name="images" size={24} color={colors.bg} />
            </Pressable>

            <Pressable
              style={[styles.actionCircle, { backgroundColor: colors.whatsapp }]}
              onPress={messageUs}
              accessibilityRole="button"
              accessibilityLabel="Message us on WhatsApp"
            >
              <Ionicons name="logo-whatsapp" size={22} color={colors.text} />
            </Pressable>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.description}>{product.description}</Text>

          {needsCareNote && (
            <View style={styles.careNote}>
              <Ionicons name="information-circle-outline" size={18} color={colors.gold} />
              <Text style={styles.careNoteText}>{CARE_NOTE}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <SpacesModal
        visible={spacesOpen}
        onClose={() => setSpacesOpen(false)}
        stoneName={product.name}
        photos={getSpacePhotos(product.slug)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxl },

  overlayHeader: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  circleButton: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(14, 14, 16, 0.55)',
  },
  titlePill: {
    flexShrink: 1,
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: 'rgba(14, 14, 16, 0.55)',
  },
  titlePillCategory: {
    ...type.caption,
    color: colors.goldSoft,
    fontSize: 10,
    letterSpacing: 1,
  },
  titlePillName: {
    ...type.heading,
    color: colors.text,
    marginTop: 1,
  },

  floatingActions: {
    position: 'absolute',
    bottom: -26,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
    paddingTop: spacing.xxl,
  },
  floatingActionsScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 26,
    height: 70,
  },
  actionCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  actionCircleLarge: {
    width: 56,
    height: 56,
  },

  details: {
    padding: spacing.lg,
    paddingTop: spacing.xxl + spacing.md,
  },
  description: {
    ...type.body,
    color: colors.textMuted,
  },

  careNote: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  careNoteText: {
    ...type.caption,
    color: colors.textMuted,
    flex: 1,
    lineHeight: 19,
  },

  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    backgroundColor: colors.bg,
  },
  missingText: { ...type.body, color: colors.textMuted },
});
