// One-off: build the Program 1 ("The First Step") mosaic backdrop thumbnails.
// Keeps each image's NATURAL aspect ratio (resized by height only, no crop) for
// the horizontal-marquee backdrop, and writes optimized JPEGs to
// /public/mosaics/p1/m-1.jpg … m-N.jpg.
// Run: node scripts/process-p1-mosaic.cjs
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const SRC_DIR = path.join(__dirname, "..", "public", "Program Videos", "Program 1 - The First Step");
const OUT_DIR = path.join(__dirname, "..", "public", "mosaics", "p1");

const H = 640; // uniform height; width follows the image's natural aspect ratio

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();

  let n = 0;
  for (const f of files) {
    n += 1;
    const out = path.join(OUT_DIR, `m-${n}.jpg`);
    await sharp(path.join(SRC_DIR, f))
      .rotate() // respect EXIF orientation
      .resize({ height: H, withoutEnlargement: true }) // height only → natural aspect, no crop
      .jpeg({ quality: 74, mozjpeg: true })
      .toFile(out);
    console.log(`m-${n}.jpg <- ${f}`);
  }
  console.log(`Done: ${n} images -> ${OUT_DIR}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
