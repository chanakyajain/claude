import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Modal,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { business, colors, radius, spacing, type } from '../constants/theme';

interface MenuSheetProps {
  visible: boolean;
  onClose: () => void;
}

/** Fraction of the screen the drawer covers, leaving the page visible behind. */
const PANEL_RATIO = 0.78;

export default function MenuSheet({ visible, onClose }: MenuSheetProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const panelWidth = width * PANEL_RATIO;

  const slide = useRef(new Animated.Value(-panelWidth)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: visible ? 0 : -panelWidth,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, panelWidth, slide]);

  // `navigate` reuses a screen already in the stack instead of pushing a
  // duplicate, so reopening the menu doesn't pile up history.
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
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Animated.View
          style={[
            styles.panel,
            { width: panelWidth, paddingTop: insets.top + spacing.lg },
            { transform: [{ translateX: slide }] },
          ]}
        >
          <Pressable style={styles.panelInner} onPress={(e) => e.stopPropagation()}>
            <View style={styles.header}>
              <View style={styles.logoTile}>
                <Image
                  source={require('../assets/brand/logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.brand}>GURU GRANITES</Text>
                <Text style={styles.tagline}>Premium Stone Collection</Text>
              </View>
              <Pressable
                onPress={onClose}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Close menu"
                style={styles.closeButton}
              >
                <Ionicons name="close" size={22} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.divider} />

            <MenuRow
              icon="home"
              tint="#D9A94A"
              label="Home"
              onPress={() => go('/')}
            />
            <MenuRow
              icon="pricetag"
              tint="#F0554E"
              label="Browse Collection"
              onPress={() => go('/collection')}
            />
            <MenuRow
              icon="location"
              tint="#3B9BE8"
              label="Store Locator"
              onPress={() => go('/locations')}
            />
            <MenuRow
              icon="share-social"
              tint="#9B7BE8"
              label="Share This App"
              onPress={share}
            />
            <MenuRow
              icon="call"
              tint="#3DDC6E"
              label="Contact Us"
              onPress={() => go('/contact')}
            />
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

function MenuRow({
  icon,
  tint,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  tint: string;
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
      <View style={[styles.iconTile, { backgroundColor: `${tint}22` }]}>
        <Ionicons name={icon} size={24} color={tint} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(6, 6, 7, 0.6)',
  },
  panel: {
    flex: 1,
    backgroundColor: '#0A0A0B',
  },
  panelInner: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  logoTile: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 34, height: 34 },
  headerText: { flex: 1 },
  brand: {
    ...type.heading,
    color: colors.gold,
    letterSpacing: 2,
    fontWeight: '800',
  },
  tagline: {
    ...type.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceRaised,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    ...type.title,
    color: colors.text,
    flex: 1,
  },
});
