import type { Ionicons } from '@expo/vector-icons';

export interface Location {
  id: string;
  kind: string;
  name: string;
  addressLines: string[];
  hours?: string;
  /** Search string handed to the maps app. */
  mapsQuery: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  /** Accent colour for this location's icon tile. */
  tint: string;
  /**
   * Google Business Profile rating. Entered by hand, so it drifts as new
   * reviews come in — update it here when it changes.
   */
  rating?: { score: number; count: number };
}

export const locations: Location[] = [
  {
    id: 'showroom',
    kind: 'SHOWROOM',
    name: 'Guru Granites',
    addressLines: [
      '4/197 C, Kottavur Village',
      'Bargur, Krishnagiri – 635104',
      'Tamil Nadu',
    ],
    hours: 'Open Every Day  •  7 AM – 11 PM',
    mapsQuery: 'Guru Granites, Kottavur Village, Bargur, Krishnagiri, Tamil Nadu',
    icon: 'storefront',
    tint: '#D9A94A',
    rating: { score: 4.9, count: 242 },
  },
  {
    id: 'factory-1',
    kind: 'FACTORY UNIT I',
    name: 'Guru Granites',
    addressLines: ['Kottavur Village', 'Bargur Taluk, Krishnagiri', 'Tamil Nadu'],
    mapsQuery: 'Guru Granites Factory, Kottavur Village, Bargur Taluk, Krishnagiri',
    icon: 'business',
    tint: '#3B9BE8',
  },
  {
    id: 'factory-2',
    kind: 'FACTORY UNIT II',
    name: 'Guru Krupa Granites',
    addressLines: ['Kottavur Village', 'Bargur Taluk, Krishnagiri', 'Tamil Nadu'],
    mapsQuery: 'Guru Krupa Granites, Bargur, Krishnagiri, Tamil Nadu',
    icon: 'business',
    tint: '#9B7BE8',
  },
];
