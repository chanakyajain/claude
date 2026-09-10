import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GlassButton from '../components/GlassButton';
import { locations, type Location } from '../constants/locations';
import { colors, radius, spacing, type } from '../constants/theme';
import { openMaps } from '../lib/links';

/** Faint blueprint grid behind the header. */
function HeaderGrid() {
  return (
    <View style={styles.grid} pointerEvents="none">
      {[0, 1, 2, 3, 4].map((i) => (
        <View key={`h${i}`} style={[styles.gridLine, { top: `${(i + 1) * 18}%` }]} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <View key={`v${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 22}%` }]} />
      ))}
    </View>
  );
}

export default function LocationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#131C28', '#0E1420', colors.bg]}
        style={[styles.header, { paddingTop: insets.top + spacing.sm }]}
      >
        <HeaderGrid />

        <View style={styles.headerTopRow}>
          <GlassButton
            icon="arrow-back"
            onPress={() => router.back()}
            accessibilityLabel="Go back"
          />
          <View style={styles.pinBadge}>
            <Ionicons name="location" size={30} color={colors.gold} />
          </View>
          {/* Balances the back button so the badge stays centred. */}
          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.title}>Our Locations</Text>
        <Text style={styles.subtitle}>Bargur, Krishnagiri · Tamil Nadu</Text>
      </LinearGradient>

      <View style={styles.cards}>
        {locations.map((place) => (
          <LocationCard key={place.id} place={place} />
        ))}
      </View>
    </ScrollView>
  );
}

function LocationCard({ place }: { place: Location }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconTile, { backgroundColor: `${place.tint}22` }]}>
          <Ionicons name={place.icon} size={24} color={place.tint} />
        </View>

        <View style={styles.cardHeaderText}>
          <Text style={styles.kind}>{place.kind}</Text>
          <Text style={styles.name}>{place.name}</Text>
        </View>

        {place.rating && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color={colors.gold} />
            <Text style={styles.ratingScore}>{place.rating.score}</Text>
            <Text style={styles.ratingCount}>({place.rating.count})</Text>
          </View>
        )}
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.detailRow}>
        <Ionicons name="location-outline" size={18} color={colors.textFaint} />
        <View style={{ flex: 1 }}>
          {place.addressLines.map((line) => (
            <Text key={line} style={styles.address}>
              {line}
            </Text>
          ))}
        </View>
      </View>

      {place.hours && (
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={18} color={colors.textFaint} />
          <Text style={styles.hours}>{place.hours}</Text>
        </View>
      )}

      <Pressable
        style={styles.directions}
        onPress={() => openMaps(place.mapsQuery)}
        accessibilityRole="button"
        accessibilityLabel={`Get directions to ${place.kind}`}
      >
        <Ionicons name="navigate" size={18} color={colors.bg} />
        <Text style={styles.directionsText}>Get Directions</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxl },

  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    overflow: 'hidden',
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.035)',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.035)',
  },

  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinBadge: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: 'rgba(10,10,11,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: { width: 48 },

  title: {
    ...type.display,
    fontSize: 34,
    color: colors.text,
    marginTop: spacing.xl,
  },
  subtitle: {
    ...type.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  cards: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderText: { flex: 1 },
  kind: {
    ...type.label,
    fontSize: 11,
    color: colors.gold,
  },
  name: {
    ...type.title,
    color: colors.text,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: 'rgba(201,162,39,0.12)',
  },
  ratingScore: { ...type.heading, color: colors.text },
  ratingCount: { ...type.caption, color: colors.textMuted },

  cardDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  address: { ...type.body, color: colors.textMuted },
  hours: { ...type.body, color: colors.textMuted, flex: 1 },

  directions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.gold,
    marginTop: spacing.sm,
  },
  directionsText: {
    ...type.heading,
    fontSize: 17,
    color: colors.bg,
    fontWeight: '700',
  },
});
