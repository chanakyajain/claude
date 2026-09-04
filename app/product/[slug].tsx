import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
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

import SpacesModal from '../../components/SpacesModal';
import StoneImage from '../../components/StoneImage';
import { getSpacePhotos } from '../../constants/photos';
import { CARE_NOTE, categoryLabel, findProduct } from '../../constants/products';
import { business, colors, radius, spacing, type } from '../../constants/theme';

export default function ProductScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
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
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <StoneImage slug={product.slug} name={product.name} style={styles.hero} />

        {/* Call · See in Spaces · WhatsApp */}
        <View style={styles.actionRow}>
          <Pressable
            style={[styles.action, styles.actionCall]}
            onPress={callUs}
            accessibilityRole="button"
            accessibilityLabel="Call us"
          >
            <Ionicons name="call" size={20} color={colors.text} />
            <Text style={styles.actionText}>Call</Text>
          </Pressable>

          <Pressable
            style={[styles.action, styles.actionSpaces]}
            onPress={() => setSpacesOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={`See ${product.name} in spaces`}
          >
            <Ionicons name="images" size={20} color={colors.bg} />
            <Text style={[styles.actionText, styles.actionTextSpaces]}>In Spaces</Text>
          </Pressable>

          <Pressable
            style={[styles.action, styles.actionWhatsapp]}
            onPress={messageUs}
            accessibilityRole="button"
            accessibilityLabel="Message us on WhatsApp"
          >
            <Ionicons name="logo-whatsapp" size={20} color={colors.text} />
            <Text style={styles.actionText}>WhatsApp</Text>
          </Pressable>
        </View>

        <View style={styles.details}>
          <Text style={styles.category}>
            {categoryLabel(product.category).toUpperCase()}
          </Text>
          <Text style={styles.name}>{product.name}</Text>
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

  hero: { width: '100%', aspectRatio: 4 / 3 },

  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    height: 48,
    borderRadius: radius.md,
  },
  actionCall: { backgroundColor: colors.call },
  actionWhatsapp: { backgroundColor: colors.whatsapp },
  actionSpaces: { backgroundColor: colors.gold },
  actionText: {
    ...type.caption,
    color: colors.text,
    fontWeight: '700',
  },
  actionTextSpaces: { color: colors.bg },

  details: { padding: spacing.lg },
  category: {
    ...type.label,
    color: colors.gold,
    marginBottom: spacing.xs,
  },
  name: { ...type.display, color: colors.text },
  description: {
    ...type.body,
    color: colors.textMuted,
    marginTop: spacing.lg,
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
