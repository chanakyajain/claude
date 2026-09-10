import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Modal, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { business, colors, radius, spacing, type } from '../constants/theme';

interface MenuSheetProps {
  visible: boolean;
  onClose: () => void;
}

/** Slide-up navigation menu, opened from the hamburger button on Home. */
export default function MenuSheet({ visible, onClose }: MenuSheetProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // `navigate` reuses a screen already in the stack instead of pushing a
  // duplicate, so repeatedly opening the menu doesn't pile up history.
  const go = (path: '/' | '/collection' | '/locations' | '/contact') => {
    onClose();
    router.navigate(path);
  };

  const share = async () => {
    onClose();
    try {
      await Share.share({
        message: `${business.name} — Premium Granite Suppliers. Call us on ${business.phoneDisplay}.`,
      });
    } catch {
      // User dismissed the share sheet — nothing to do.
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.handle} />

          <Text style={styles.brand}>{business.name}</Text>
          <Text style={styles.tagline}>Premium Granite Suppliers</Text>

          <MenuRow icon="home-outline" label="Home" onPress={() => go('/')} />
          <MenuRow icon="grid-outline" label="Browse Collection" onPress={() => go('/collection')} />
          <MenuRow icon="location-outline" label="Our Locations" onPress={() => go('/locations')} />
          <MenuRow icon="call-outline" label="Contact Us" onPress={() => go('/contact')} />
          <MenuRow icon="share-social-outline" label="Share This App" onPress={share} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function MenuRow({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.row}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name={icon} size={20} color={colors.gold} />
      <Text style={styles.rowLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(6, 6, 7, 0.55)',
  },
  sheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderTopWidth: 2,
    borderColor: colors.gold,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  brand: { ...type.title, color: colors.text },
  tagline: {
    ...type.caption,
    color: colors.gold,
    letterSpacing: 1.2,
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  rowLabel: {
    ...type.body,
    color: colors.text,
    flex: 1,
  },
});
