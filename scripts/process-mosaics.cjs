// One-off: (re)build the program mosaic backdrops at NATURAL aspect ratio
// (resized by height only, no crop) for the horizontal-row backdrop. Samples
// evenly across each source folder for variety. Writes /public/mosaics/pN/m-*.jpg.
// Run: node scripts/process-mosaics.cjs
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const BASE = path.join(__dirname, "..", "public");
const H = 640; // uniform height; width follows each image's natural aspect ratio

const JOBS = [
  { src: "Program Videos/Program 2 - The Professional Approach", out: "p2", count: 48 },
  { src: "Program Videos/Program 3 - Inner Physician", out: "p3", count: 48 },
  { src: "Program Videos/Program 4 - Master Practitioner Of Graphology", out: "p4", count: 48 },
];

/** Recursively collect image files under a directory (handles subfolders). */
function walkImages(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkImages(full));
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) out.push(full);
  }
  return out.sort();
}

/** Evenly sample n items across the array (keeps variety, stable order). */
function sample(arr, n) {
  if (arr.length <= n) return arr;
  const out = [];
  for (let i = 0; i < n; i++) out.push(arr[Math.floor((i * arr.length) / n)]);
  return out;
}

(async () => {
  for (const job of JOBS) {
    const srcDir = path.join(BASE, job.src);
    const outDir = path.join(BASE, "mosaics", job.out);
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(outDir, { recursive: true });

    const all = walkImages(srcDir);
    const picked = sample(all, job.count);

    let n = 0;
    for (const f of picked) {
      n += 1;
      try {
        await sharp(f)
          .rotate()
          .resize({ height: H, withoutEnlargement: true })
          .jpeg({ quality: 72, mozjpeg: true })
          .toFile(path.join(outDir, `m-${n}.jpg`));
      } catch (e) {
        console.log(`  skip ${f}: ${e.message}`);
        n -= 1;
      }
    }
    console.log(`${job.out}: wrote ${n} images (from ${all.length} usable in source)`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
