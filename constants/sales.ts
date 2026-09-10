export interface SaleItem {
  slug: string;
  name: string;
  originalPrice?: number;
  currentPrice: number;
  squareFeetRemaining: number;
}

export const saleItems: SaleItem[] = [
  {
    slug: 'era-white',
    name: 'ERA White',
    originalPrice: 185,
    currentPrice: 75,
    squareFeetRemaining: 4500,
  },
  {
    slug: 'arctic-white',
    name: 'Arctic White',
    originalPrice: 220,
    currentPrice: 140,
    squareFeetRemaining: 1000,
  },
  {
    slug: 'glacier-white',
    name: 'Glacier White',
    originalPrice: 250,
    currentPrice: 140,
    squareFeetRemaining: 1300,
  },
  {
    slug: 'k-white',
    name: 'K White',
    originalPrice: 85,
    currentPrice: 50,
    squareFeetRemaining: 1000,
  },
  {
    slug: 'pista-green',
    name: 'Pista White',
    originalPrice: 165,
    currentPrice: 120,
    squareFeetRemaining: 800,
  },
];
