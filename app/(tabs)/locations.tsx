import { Ionicons } from '@expo/vector-icons';
import { Alert, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { locations, type Location } from '../../constants/locations';
import { colors, radius, spacing, type } from '../../constants/theme';

export default function LocationsScreen() {
  const openDirections = async (place: Location) => {
    const query = encodeURIComponent(place.mapsQuery);
    // Prefer the native maps app, fall back to Google Maps on the web.
    const nativeUrl = Platform.select({
      ios: `maps://?q=${query}`,
      android: `geo:0,0?q=${query}`,
      default: '',
    });
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    try {
      if (nativeUrl && (await Linking.canOpenURL(nativeUrl))) {
        await Linking.openURL(nativeUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch {
      Alert.alert('Unable to open Maps', 'No maps application is available.');
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Our Locations</Text>
      <Text style={styles.subheading}>Bargur, Krishnagiri · Tamil Nadu</Text>

      {locations.map((place) => (
        <View key={place.id} style={styles.card}>
          <Text style={styles.kind}>{place.kind}</Text>
          <Text style={styles.name}>{place.name}</Text>

          {place.addressLines.map((line) => (
            <Text key={line} style={styles.address}>
              {line}
            </Text>
          ))}

          {place.hours && (
            <View style={styles.hoursRow}>
              <Ionicons name="time-outline" size={15} color={colors.gold} />
              <Text style={styles.hours}>{place.hours}</Text>
            </View>
          )}

          <Pressable
            style={styles.directions}
            onPress={() => openDirections(place)}
            accessibilityRole="button"
            accessibilityLabel={`Get directions to ${place.kind}`}
          >
            <Ionicons name="navigate-outline" size={17} color={colors.bg} />
            <Text style={styles.directionsText}>Get Directions</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
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

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  kind: { ...type.label, color: colors.gold },
  name: {
    ...type.title,
    color: colors.text,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  address: { ...type.body, color: colors.textMuted },

  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  hours: { ...type.caption, color: colors.textMuted },

  directions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.gold,
    marginTop: spacing.lg,
  },
  directionsText: {
    ...type.caption,
    color: colors.bg,
    fontWeight: '700',
  },
});
