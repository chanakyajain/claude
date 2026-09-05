import { Ionicons } from '@expo/vector-icons';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, type } from '../constants/theme';

interface InfoSheetProps {
  visible: boolean;
  onClose: () => void;
  categoryLabel: string;
  name: string;
  description: string;
  careNote?: string;
}

/**
 * Bottom sheet revealing the full description for a stone — kept off the
 * main photo view so that view can stay an uninterrupted, full-screen image.
 */
export default function InfoSheet({
  visible,
  onClose,
  categoryLabel,
  name,
  description,
  careNote,
}: InfoSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.handle} />

          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.category}>{categoryLabel.toUpperCase()}</Text>
              <Text style={styles.name}>{name}</Text>
            </View>
            <Pressable
              onPress={onClose}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Close"
              style={styles.closeButton}
            >
              <Ionicons name="close" size={20} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <Text style={styles.description}>{description}</Text>

            {careNote && (
              <View style={styles.careNote}>
                <Ionicons name="information-circle-outline" size={18} color={colors.gold} />
                <Text style={styles.careNoteText}>{careNote}</Text>
              </View>
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(6, 6, 7, 0.55)',
  },
  sheet: {
    maxHeight: '70%',
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
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  category: {
    ...type.label,
    color: colors.gold,
  },
  name: {
    ...type.title,
    color: colors.text,
    marginTop: spacing.xs,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceRaised,
  },
  scroll: { flexGrow: 0 },
  description: {
    ...type.body,
    color: colors.textMuted,
    paddingBottom: spacing.lg,
  },
  careNote: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
  },
  careNoteText: {
    ...type.caption,
    color: colors.textMuted,
    flex: 1,
    lineHeight: 19,
  },
});
