export interface Location {
  id: string;
  kind: string;
  name: string;
  addressLines: string[];
  hours?: string;
  /** Search string handed to the maps app. */
  mapsQuery: string;
}

export const locations: Location[] = [
  {
    id: 'showroom',
    kind: 'SHOWROOM',
    name: 'Guru Granites',
    addressLines: [
      'Sr.No-4/197C, Kottavur Village',
      'Bargur Taluk, Krishnagiri – 635104',
      'Tamil Nadu',
    ],
    hours: 'Open Every Day · 7:00 AM – 11:00 PM',
    mapsQuery: 'Guru Granites, Kottavur Village, Bargur, Krishnagiri, Tamil Nadu',
  },
  {
    id: 'factory-1',
    kind: 'FACTORY UNIT I',
    name: 'Guru Granites',
    addressLines: ['Kottavur Village', 'Bargur Taluk, Krishnagiri', 'Tamil Nadu'],
    mapsQuery: 'Guru Granites Factory, Kottavur Village, Bargur Taluk, Krishnagiri',
  },
  {
    id: 'factory-2',
    kind: 'FACTORY UNIT II',
    name: 'Guru Krupa Granites',
    addressLines: ['Kottavur Village', 'Bargur Taluk, Krishnagiri', 'Tamil Nadu'],
    mapsQuery: 'Guru Krupa Granites, Bargur, Krishnagiri, Tamil Nadu',
  },
];
