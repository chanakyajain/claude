/**
 * Guru Granites — photo registry.
 *
 * ── HOW TO ADD YOUR STONE PHOTOS ──────────────────────────────
 * 1. Drop the image into  assets/stones/   (e.g. assets/stones/tan-brown.jpg)
 * 2. Add one line to `stonePhotos` below, keyed by the stone's slug:
 *        'tan-brown': require('../assets/stones/tan-brown.jpg'),
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

/** Slug → the main slab photo shown on the product page. */
export const stonePhotos: Record<string, ImageSourcePropType> = {
  // 'tan-brown': require('../assets/stones/tan-brown.jpg'),
};

/** Slug → up to 3 photos of the stone applied in real spaces. */
export const spacePhotos: Record<string, ImageSourcePropType[]> = {
  // 'tan-brown': [
  //   require('../assets/spaces/tan-brown-kitchen.jpg'),
  //   require('../assets/spaces/tan-brown-floor.jpg'),
  //   require('../assets/spaces/tan-brown-wall.jpg'),
  // ],
};

export function getStonePhoto(slug: string): ImageSourcePropType | undefined {
  return stonePhotos[slug];
}

export function getSpacePhotos(slug: string): ImageSourcePropType[] {
  return spacePhotos[slug] ?? [];
}

/** Labels shown under each carousel frame, in order. */
export const SPACE_LABELS = ['In a kitchen', 'As flooring', 'As cladding'] as const;
