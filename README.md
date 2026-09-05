# Guru Granites — Mobile App

Product showcase app for Guru Granites, Bargur, Krishnagiri, Tamil Nadu.
Built with Expo (React Native) and TypeScript.

## Running the app on your phone

You need **Node.js** installed once: <https://nodejs.org> (take the LTS version).

Then, in a terminal:

```bash
git clone https://github.com/chanakyajain/claude.git guru-granites
cd guru-granites
npm install
npx expo start
```

A QR code appears in the terminal. Open **Expo Go** on your phone and scan it —
the app loads over your local Wi-Fi. Both devices must be on the same network.

If the QR code will not connect, use a tunnel instead:

```bash
npx expo start --tunnel
```

## What's in here

| Path | What it holds |
| --- | --- |
| `app/(tabs)/index.tsx` | Home — featured stone and category grid |
| `app/(tabs)/collection.tsx` | Browse all 80 varieties, with search and filters |
| `app/(tabs)/locations.tsx` | Showroom and both factory units, with directions |
| `app/(tabs)/contact.tsx` | Call, WhatsApp, email and opening hours |
| `app/product/[slug].tsx` | Product page — photo, actions, description |
| `components/SpacesModal.tsx` | The "In Spaces" full-screen carousel |
| `constants/products.ts` | All 80 stones with their client-facing descriptions |
| `constants/photos.ts` | **Where you add your photos** — see below |

## Adding your photos

The app runs with placeholders so nothing breaks while photos are still going
in. You can add them a few at a time.

**Slab photos** (the swipeable gallery on each product page — one photo is enough, or add several):

1. Put the image(s) in `assets/stones/` — for example `assets/stones/tan-brown-1.jpg`
2. Add one entry to `productPhotos` in `constants/photos.ts`:

```ts
'tan-brown': [
  require('../assets/stones/tan-brown-1.jpg'),
  require('../assets/stones/tan-brown-2.jpg'),
],
```

The first photo in the list is also used as the stone's thumbnail in the
Collection grid and as one of the 3 photos on its category tile.

**"In Spaces" photos** (the 3-image carousel showing the stone installed):

1. Put the images in `assets/spaces/`
2. Add one entry to `spacePhotos` in `constants/photos.ts`:

```ts
'tan-brown': [
  require('../assets/spaces/tan-brown-kitchen.jpg'),
  require('../assets/spaces/tan-brown-floor.jpg'),
  require('../assets/spaces/tan-brown-wall.jpg'),
],
```

The key on the left is the stone's `slug` from `constants/products.ts`.

## Checks

```bash
npx tsc --noEmit     # type check
npx expo export --platform android   # verify it bundles
```
