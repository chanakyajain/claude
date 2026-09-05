/**
 * Guru Granites — photo registry.
 *
 * ── HOW TO ADD YOUR STONE PHOTOS ──────────────────────────────
 * A stone can show 1 or several photos (a swipeable gallery on the
 * product page, and one of them used as its thumbnail elsewhere).
 * 1. Drop the image(s) into  assets/stones/   (e.g. assets/stones/tan-brown-1.jpg)
 * 2. Add one line to `productPhotos` below, keyed by the stone's slug:
 *        'tan-brown': [
 *          require('../assets/stones/tan-brown-1.jpg'),
 *          require('../assets/stones/tan-brown-2.jpg'),
 *        ],
 *
 * ── HOW TO ADD "SEE IN SPACES" PHOTOS ─────────────────────────
 * These are the 3 photos of the stone installed in real spaces —
 * kitchen, flooring, cladding and so on — shown in the carousel.
 * 1. Drop them into  assets/spaces/
 * 2. Add one line to `spacePhotos`, keyed by the same slug:
 *        'tan-brown': [
 *          require('../assets/spaces/tan-brown-kitchen.jpg'),
 *          require('../assets/spaces/tan-brown-floor.jpg'),
 *          require('../assets/spaces/tan-brown-wall.jpg'),
 *        ],
 *
 * Stones with no entry fall back to a styled placeholder, so the app
 * always runs — you can add photos a few at a time.
 * ──────────────────────────────────────────────────────────────
 */

import type { ImageSourcePropType } from 'react-native';

import { productsByCategory, type CategoryKey } from './products';

/** Slug → one or more slab photos, shown as a swipeable gallery. */
export const productPhotos: Record<string, ImageSourcePropType[]> = {
  // Temporary placeholder while the owner gathers the final catalogue photos.
  'alaska-white': [require('../assets/stones/alaska-white-1.jpg')],
};

/** Slug → up to 3 photos of the stone applied in real spaces. */
export const spacePhotos: Record<string, ImageSourcePropType[]> = {
  // 'tan-brown': [
  //   require('../assets/spaces/tan-brown-kitchen.jpg'),
  //   require('../assets/spaces/tan-brown-floor.jpg'),
  //   require('../assets/spaces/tan-brown-wall.jpg'),
  // ],
};

export function getProductPhotos(slug: string): ImageSourcePropType[] {
  return productPhotos[slug] ?? [];
}

/** First available photo for a stone, used as its thumbnail in grids. */
export function getThumbnail(slug: string): ImageSourcePropType | undefined {
  return productPhotos[slug]?.[0];
}

export function getSpacePhotos(slug: string): ImageSourcePropType[] {
  return spacePhotos[slug] ?? [];
}

/** Up to 3 sample thumbnails for a category, used as a tile backdrop collage. */
export function getCategoryCollage(key: CategoryKey): ImageSourcePropType[] {
  const photos: ImageSourcePropType[] = [];
  for (const product of productsByCategory(key)) {
    const thumb = getThumbnail(product.slug);
    if (thumb) photos.push(thumb);
    if (photos.length === 3) break;
  }
  return photos;
}

/** Labels shown under each "In Spaces" carousel frame, in order. */
export const SPACE_LABELS = ['In a kitchen', 'As flooring', 'As cladding'] as const;
