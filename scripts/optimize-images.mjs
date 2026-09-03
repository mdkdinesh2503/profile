/**
 * scripts/optimize-images.mjs
 *
 * Converts large PNG/JPG images in public/ to WebP using `sharp`.
 * Originals are kept intact. Run once before committing.
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { existsSync, readdirSync, statSync, mkdirSync } from "fs";
import { join, dirname, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const TARGETS = [
  // Profile photos (LCP images — biggest wins)
  { src: "profile/mdk_3.png", quality: 82, width: 800 },
  { src: "profile/mdk.png", quality: 80, width: 800 },
  { src: "profile/mdk_1.png", quality: 80, width: 800 },
  // App icon / avatar / logo
  { src: "default/Avatar.png", quality: 85, width: 256 },
  { src: "default/Logo.png", quality: 85, width: 512 },
  // Blog cover
  { src: "blog/my-journey.jpg", quality: 80, width: 1200 },
];

let totalSaved = 0;

for (const { src, quality, width } of TARGETS) {
  const input = join(publicDir, src);
  if (!existsSync(input)) {
    console.warn(`⚠  Skipping (not found): ${src}`);
    continue;
  }

  const ext = extname(src);
  const outName = basename(src, ext) + ".webp";
  const outDir = join(publicDir, dirname(src));
  const output = join(outDir, outName);

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const before = statSync(input).size;

  await sharp(input)
    .resize(width, null, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality })
    .toFile(output);

  const after = statSync(output).size;
  const saved = before - after;
  totalSaved += saved;

  console.log(
    `✓ ${src.padEnd(30)} ${kb(before).padStart(8)} → ${kb(after).padStart(8)}  saved ${kb(saved)}`
  );
}

console.log(`\n✓ Total saved: ${kb(totalSaved)} across ${TARGETS.length} images`);

function kb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}
