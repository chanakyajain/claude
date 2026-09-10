import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GlassButton from './GlassButton';
import MenuSheet from './MenuSheet';
import { spacing } from '../constants/theme';

/**
 * The menu button, pinned over the top-left of whatever screen renders it.
 * Floats above the content rather than taking a row of its own, so screens
 * can run their content all the way to the top.
 */
export default function FloatingMenuButton() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* box-none lets taps outside the button reach the content beneath. */}
      <View
        pointerEvents="box-none"
        style={[styles.wrap, { top: insets.top + spacing.sm }]}
      >
        <GlassButton
          icon="menu"
          onPress={() => setOpen(true)}
          accessibilityLabel="Open menu"
        />
      </View>

      <MenuSheet visible={open} onClose={() => setOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: spacing.lg,
    zIndex: 10,
  },
});
