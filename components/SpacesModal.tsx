import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  type ImageSourcePropType,
  type ListRenderItemInfo,
  Modal,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { SPACE_LABELS } from '../constants/photos';
import { colors, radius, spacing, type } from '../constants/theme';

interface SpacesModalProps {
  visible: boolean;
  onClose: () => void;
  stoneName: string;
  /** Up to 3 photos of the stone installed in real spaces. */
  photos: ImageSourcePropType[];
}

/** Always render three frames so the carousel shape is consistent. */
const FRAME_COUNT = 3;

/**
 * Full-screen translucent overlay showing the selected granite applied in
 * real spaces. The panel is deliberately see-through with a thick gold
 * border, so the slab photo on the product page stays visible behind it.
 */
export default function SpacesModal({
  visible,
  onClose,
  stoneName,
  photos,
}: SpacesModalProps) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<number>>(null);

  // Panel sits inset from the screen edge so the granite shows around it too.
  const panelWidth = width - spacing.xl * 2;
  const frames = Array.from({ length: FRAME_COUNT }, (_, i) => i);

  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const next = Math.round(e.nativeEvent.contentOffset.x / panelWidth);
      setIndex(Math.max(0, Math.min(FRAME_COUNT - 1, next)));
    },
    [panelWidth]
  );

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      listRef.current?.scrollToOffset({ offset: i * panelWidth, animated: true });
    },
    [panelWidth]
  );

  // Reset to the first frame each time the overlay is dismissed.
  const handleClose = useCallback(() => {
    setIndex(0);
    onClose();
  }, [onClose]);

  const renderFrame = useCallback(
    ({ item }: ListRenderItemInfo<number>) => {
      const photo = photos[item];
      return (
        <View style={[styles.frame, { width: panelWidth }]}>
          {photo ? (
            <Image source={photo} style={styles.photo} resizeMode="cover" />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="image-outline" size={40} color={colors.textFaint} />
              <Text style={styles.placeholderTitle}>{SPACE_LABELS[item]}</Text>
              <Text style={styles.placeholderHint}>
                Add a photo of {stoneName} installed here
              </Text>
            </View>
          )}
        </View>
      );
    },
    [panelWidth, photos, stoneName]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      {/* Tapping anywhere outside the panel dismisses the overlay. */}
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <BlurView intensity={38} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.scrim} />

        {/* Stop presses inside the panel from closing the overlay. */}
        <Pressable
          style={[styles.panel, { width: panelWidth }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.eyebrow}>SEEN IN SPACES</Text>
              <Text style={styles.stoneName} numberOfLines={1}>
                {stoneName}
              </Text>
            </View>
            <Pressable
              onPress={handleClose}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Close"
              style={styles.closeButton}
            >
              <Ionicons name="close" size={22} color={colors.text} />
            </Pressable>
          </View>

          <FlatList
            ref={listRef}
            data={frames}
            keyExtractor={(i) => String(i)}
            renderItem={renderFrame}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScrollEnd}
            getItemLayout={(_, i) => ({
              length: panelWidth,
              offset: panelWidth * i,
              index: i,
            })}
          />

          <View style={styles.footer}>
            <Text style={styles.caption}>{SPACE_LABELS[index]}</Text>
            <View style={styles.dots}>
              {frames.map((i) => (
                <Pressable
                  key={i}
                  onPress={() => goTo(i)}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={`View ${SPACE_LABELS[i]}`}
                >
                  <View style={[styles.dot, i === index && styles.dotActive]} />
                </Pressable>
              ))}
            </View>
          </View>
        </Pressable>

        <Text style={styles.dismissHint}>Tap anywhere to close</Text>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Light additional dim on top of the blur — keeps the slab visible behind.
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(8, 8, 10, 0.45)',
  },
  panel: {
    // The thick border that frames the translucent panel.
    borderWidth: 4,
    borderColor: colors.gold,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(23, 23, 26, 0.55)',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201, 162, 39, 0.35)',
  },
  headerText: { flex: 1 },
  eyebrow: {
    ...type.caption,
    color: colors.goldSoft,
    letterSpacing: 1.6,
  },
  stoneName: {
    ...type.title,
    color: colors.text,
    marginTop: 2,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },
  frame: {
    aspectRatio: 4 / 3,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    backgroundColor: 'rgba(14, 14, 16, 0.55)',
  },
  placeholderTitle: {
    ...type.heading,
    color: colors.textMuted,
  },
  placeholderHint: {
    ...type.caption,
    color: colors.textFaint,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(201, 162, 39, 0.35)',
  },
  caption: {
    ...type.caption,
    color: colors.textMuted,
  },
  dots: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(245, 245, 240, 0.30)',
  },
  dotActive: {
    backgroundColor: colors.gold,
    width: 22,
  },
  dismissHint: {
    ...type.caption,
    color: 'rgba(245, 245, 240, 0.45)',
    marginTop: spacing.lg,
  },
});
