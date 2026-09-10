import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GlassButton from '../components/GlassButton';
import MenuSheet from '../components/MenuSheet';
import { locations } from '../constants/locations';
import { business, colors, radius, spacing, type } from '../constants/theme';
import { callUs, emailUs, openMaps, whatsAppUs } from '../lib/links';

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.sm },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <GlassButton
            icon="menu"
            onPress={() => setMenuOpen(true)}
            accessibilityLabel="Open menu"
          />
        </View>

        <View style={styles.brandBlock}>
          <Image
            source={require('../assets/brand/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brand}>GURU GRANITES</Text>
          <Text style={styles.tagline}>Premium Granite Suppliers</Text>
        </View>

        <Text style={styles.sectionLabel}>GET IN TOUCH</Text>

        <ContactRow
          icon="call"
          tint="#3DDC6E"
          title="Call Us"
          subtitle={business.phoneDisplay}
          onPress={callUs}
        />
        <ContactRow
          icon="logo-whatsapp"
          tint="#25D366"
          title="WhatsApp"
          subtitle="Chat with us"
          onPress={() => whatsAppUs()}
        />
        <ContactRow
          icon="mail"
          tint={colors.gold}
          title="Email"
          subtitle={business.email}
          onPress={emailUs}
        />

        <Text style={[styles.sectionLabel, { marginTop: spacing.xxl }]}>VISIT US</Text>

        <View style={styles.visitCard}>
          <View style={styles.visitRow}>
            <View style={styles.visitIcon}>
              <Ionicons name="time-outline" size={18} color={colors.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.visitLabel}>Business Hours</Text>
              <Text style={styles.visitValue}>{business.hours}</Text>
            </View>
          </View>

          <View style={styles.visitDivider} />

          <View style={styles.visitRow}>
            <View style={styles.visitIcon}>
              <Ionicons name="location-outline" size={18} color={colors.gold} />
            </View>
            <Text style={styles.visitLabel}>Locations</Text>
          </View>

          {locations.map((place) => (
            <Pressable
              key={place.id}
              style={styles.locationRow}
              onPress={() => openMaps(place.mapsQuery)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${place.name} in Maps`}
            >
              <View style={styles.bullet} />
              <View style={{ flex: 1 }}>
                <Text style={styles.locationName}>
                  {place.name}
                  {place.id === 'showroom' ? ' Showroom' : ''}
                </Text>
                <Text style={styles.locationAddress}>
                  {place.addressLines.join(', ')}
                </Text>
                <Text style={styles.locationHint}>Tap to open in Maps ↗</Text>
              </View>
              <Ionicons name="navigate" size={20} color={colors.gold} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <MenuSheet visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function ContactRow({
  icon,
  tint,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  tint: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.row}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${subtitle}`}
    >
      <View style={[styles.rowIcon, { backgroundColor: `${tint}22` }]}>
        <Ionicons name={icon} size={26} color={tint} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  topRow: { alignItems: 'flex-start' },

  brandBlock: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  logo: { width: 64, height: 64, marginBottom: spacing.lg },
  brand: {
    ...type.display,
    fontSize: 30,
    color: colors.gold,
    letterSpacing: 3,
    fontWeight: '800',
  },
  tagline: {
    ...type.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  sectionLabel: {
    ...type.label,
    color: colors.textFaint,
    marginBottom: spacing.md,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  rowIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { ...type.title, color: colors.text },
  rowSubtitle: {
    ...type.body,
    color: colors.textMuted,
    marginTop: 2,
  },

  visitCard: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  visitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  visitIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(201,162,39,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitLabel: { ...type.body, color: colors.textMuted },
  visitValue: { ...type.body, color: colors.text, marginTop: 2 },
  visitDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  bullet: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
  },
  locationName: { ...type.heading, color: colors.gold },
  locationAddress: {
    ...type.body,
    color: colors.goldSoft,
    marginTop: 2,
  },
  locationHint: {
    ...type.caption,
    color: colors.textFaint,
    marginTop: 4,
  },
});
