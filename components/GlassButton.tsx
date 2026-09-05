import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

interface GlassButtonProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  /** Faint colour tint over the glass, hinting at the action (e.g. WhatsApp green). Omit for a neutral look. */
  tint?: string;
  iconColor?: string;
  size?: number;
  onPress: () => void;
  accessibilityLabel: string;
}

/**
 * A frosted, translucent circular button — the app's "glass" style for
 * controls that float directly over a photo, so the image stays visible
 * through them rather than being covered by a flat colour.
 */
export default function GlassButton({
  icon,
  tint,
  iconColor = '#F5F5F0',
  size = 48,
  onPress,
  accessibilityLabel,
}: GlassButtonProps) {
  const circle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[styles.button, circle]}
    >
      <BlurView intensity={45} tint="dark" style={styles.fill} />
      {tint && <View style={[styles.fill, { backgroundColor: tint }]} />}
      <Ionicons name={icon} size={size * 0.42} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
