import { Ionicons } from '@expo/vector-icons';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { business, colors, radius, spacing, type } from '../../constants/theme';

export default function ContactScreen() {
  const open = async (url: string, label: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open', `Could not start ${label} on this device.`);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Get in Touch</Text>
      <Text style={styles.subheading}>{business.name} · Premium Granite Suppliers</Text>

      <ContactRow
        icon="call"
        tint={colors.call}
        label="Call Us"
        value={business.phoneDisplay}
        onPress={() => open(`tel:${business.phone}`, 'the phone dialler')}
      />

      <ContactRow
        icon="logo-whatsapp"
        tint={colors.whatsapp}
        label="WhatsApp"
        value="Chat with us"
        onPress={() =>
          open(
            `whatsapp://send?phone=${business.phone.replace('+', '')}&text=${encodeURIComponent(
              `${business.whatsappText} your granite range.`
            )}`,
            'WhatsApp'
          )
        }
      />

      <ContactRow
        icon="mail"
        tint={colors.gold}
        label="Email"
        value={business.email}
        onPress={() => open(`mailto:${business.email}`, 'your email app')}
      />

      <View style={styles.hoursCard}>
        <Ionicons name="time-outline" size={18} color={colors.gold} />
        <View style={{ flex: 1 }}>
          <Text style={styles.hoursLabel}>Business Hours</Text>
          <Text style={styles.hoursValue}>{business.hours}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function ContactRow({
  icon,
  tint,
  label,
  value,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  tint: string;
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.row}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
    >
      <View style={[styles.iconBadge, { backgroundColor: tint }]}>
        <Ionicons name={icon} size={20} color={colors.bg} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },

  heading: { ...type.display, color: colors.text },
  subheading: {
    ...type.caption,
    color: colors.gold,
    letterSpacing: 1.2,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { ...type.caption, color: colors.textFaint },
  rowValue: { ...type.heading, color: colors.text, marginTop: 2 },

  hoursCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hoursLabel: { ...type.caption, color: colors.textFaint },
  hoursValue: { ...type.body, color: colors.text, marginTop: 2 },
});
