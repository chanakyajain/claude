/**
 * Guru Granites — shared design tokens.
 * Dark, gallery-style palette so the stone photography carries the screen.
 */

export const colors = {
  bg: '#0E0E10',
  surface: '#17171A',
  surfaceRaised: '#1F1F24',
  border: '#2A2A30',
  borderStrong: '#3A3A42',

  gold: '#C9A227',
  goldSoft: '#E0C97A',

  text: '#F5F5F0',
  textMuted: '#9A9A93',
  textFaint: '#6B6B66',

  call: '#2E7D32',
  whatsapp: '#25D366',

  overlay: 'rgba(8, 8, 10, 0.82)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  pill: 999,
} as const;

export const type = {
  display: { fontSize: 28, fontWeight: '700' as const, letterSpacing: 0.5 },
  title: { fontSize: 20, fontWeight: '700' as const, letterSpacing: 0.3 },
  heading: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 23 },
  label: { fontSize: 13, fontWeight: '600' as const, letterSpacing: 1.2 },
  caption: { fontSize: 12, fontWeight: '500' as const },
} as const;

/** Single source of truth for contact details used across the app. */
export const business = {
  name: 'Guru Granites',
  phone: '+919449445585',
  phoneDisplay: '+91 94494 45585',
  email: 'gurukrupagranites@gmail.com',
  hours: 'Open Every Day · 7:00 AM – 11:00 PM',
  whatsappText: 'Hello Guru Granites, I would like to enquire about',
} as const;
