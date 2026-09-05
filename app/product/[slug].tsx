import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GlassButton from '../../components/GlassButton';
import InfoSheet from '../../components/InfoSheet';
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
  const [infoOpen, setInfoOpen] = useState(false);

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
    <View style={styles.screen}>
      <ProductHero
        slug={product.slug}
        name={product.name}
        photos={getProductPhotos(product.slug)}
      />

      {/* Transparent overlay header, floating over the full-screen photo. */}
      <View style={[styles.overlayHeader, { top: insets.top + spacing.sm }]}>
        <GlassButton
          icon="arrow-back"
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        />

        <View style={styles.titleBlock}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{categoryLabel(product.category)}</Text>
            </View>
            <GlassButton
              icon="information"
              size={32}
              onPress={() => setInfoOpen(true)}
              accessibilityLabel={`About ${product.name}`}
            />
          </View>
        </View>
      </View>

      {/* Floating glass action bar, pinned near the bottom of the screen. */}
      <View style={[styles.floatingActions, { bottom: insets.bottom + spacing.xl }]}>
        <LinearGradient
          pointerEvents="none"
          colors={['transparent', 'rgba(6,6,7,0.55)']}
          style={styles.floatingActionsScrim}
        />
        <GlassButton
          icon="call"
          onPress={callUs}
          accessibilityLabel="Call us"
        />
        <GlassButton
          icon="images"
          size={58}
          tint="rgba(201, 162, 39, 0.4)"
          onPress={() => setSpacesOpen(true)}
          accessibilityLabel={`See ${product.name} in spaces`}
        />
        <GlassButton
          icon="logo-whatsapp"
          tint="rgba(37, 211, 102, 0.4)"
          onPress={messageUs}
          accessibilityLabel="Message us on WhatsApp"
        />
      </View>

      <InfoSheet
        visible={infoOpen}
        onClose={() => setInfoOpen(false)}
        categoryLabel={categoryLabel(product.category)}
        name={product.name}
        description={product.description}
        careNote={needsCareNote ? CARE_NOTE : undefined}
      />

      <SpacesModal
        visible={spacesOpen}
        onClose={() => setSpacesOpen(false)}
        stoneName={product.name}
        photos={getSpacePhotos(product.slug)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },

  overlayHeader: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  titleBlock: {
    flexShrink: 1,
    alignItems: 'flex-end',
  },
  name: {
    ...type.title,
    color: colors.text,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: 'rgba(14, 14, 16, 0.55)',
  },
  categoryText: {
    ...type.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.goldSoft,
  },

  floatingActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
  },
  floatingActionsScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -70,
    bottom: -20,
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
