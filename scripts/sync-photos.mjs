#!/usr/bin/env node
/**
 * Regenerates the productPhotos map in constants/photos.ts from whatever
 * is sitting in assets/stones/.
 *
 * Usage:  node scripts/sync-photos.mjs
 *
 * Name files  <slug>-<n>.jpg  (e.g. tan-brown-1.jpg, tan-brown-2.jpg).
 * The slug must match a stone's `slug` in constants/products.ts.
 * Only the marked block in photos.ts is rewritten — spacePhotos and any
 * hand-written code around it are left alone.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const stonesDir = join(root, 'assets/stones');
const productsFile = join(root, 'constants/products.ts');
const photosFile = join(root, 'constants/photos.ts');

const START = '// <generated:product-photos>';
const END = '// </generated:product-photos>';

const knownSlugs = new Set(
  [...readFileSync(productsFile, 'utf8').matchAll(/^\s*slug: '([^']+)'/gm)].map((m) => m[1])
);

/** slug -> [filename, ...] in numeric order */
const bySlug = new Map();
const unmatched = [];

for (const file of readdirSync(stonesDir).sort()) {
  if (!file.endsWith('.jpg')) continue;
  const match = file.match(/^(.+)-(\d+)\.jpg$/);
  if (!match || !knownSlugs.has(match[1])) {
    unmatched.push(file);
    continue;
  }
  const [, slug, index] = match;
  if (!bySlug.has(slug)) bySlug.set(slug, []);
  bySlug.get(slug).push({ file, index: Number(index) });
}

const lines = [];
for (const slug of [...bySlug.keys()].sort()) {
  const files = bySlug.get(slug).sort((a, b) => a.index - b.index);
  const requires = files.map((f) => `require('../assets/stones/${f.file}')`);
  lines.push(
    requires.length === 1
      ? `  '${slug}': [${requires[0]}],`
      : `  '${slug}': [\n${requires.map((r) => `    ${r},`).join('\n')}\n  ],`
  );
}

const source = readFileSync(photosFile, 'utf8');
const startAt = source.indexOf(START);
const endAt = source.indexOf(END);
if (startAt === -1 || endAt === -1) {
  console.error(`Could not find ${START} / ${END} markers in constants/photos.ts`);
  process.exit(1);
}

const updated =
  source.slice(0, startAt + START.length) +
  '\n' +
  lines.join('\n') +
  '\n  ' +
  source.slice(endAt);

writeFileSync(photosFile, updated);

const missing = [...knownSlugs].filter((s) => !bySlug.has(s)).sort();
console.log(`Wired ${bySlug.size} of ${knownSlugs.size} stones.`);
if (unmatched.length) {
  console.log(`\nIgnored (filename does not match a stone slug):`);
  unmatched.forEach((f) => console.log(`  ${f}`));
}
if (missing.length) {
  console.log(`\nStill without a photo (${missing.length}):`);
  missing.forEach((s) => console.log(`  ${s}`));
}
