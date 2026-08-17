// One-off: convert press logos to white silhouettes on a transparent
// background so they sit cleanly on the dark "As featured in" wall.
// Run: node scripts/process-press-logos.cjs
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "..", "public", "press");
const FILES = ["times-of-india", "mid-day", "bangalore-mirror", "the-hindu", "dna"];
const TARGET_H = 160; // crisp at the ~28px render size (retina headroom)

async function run() {
  for (const name of FILES) {
    const file = path.join(DIR, `${name}.png`);
    const { data, info } = await sharp(file)
      .ensureAlpha()
      .resize({ height: TARGET_H })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info; // channels = 4
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      if (a === 0) continue;
      if (r > 235 && g > 235 && b > 235) {
        data[i + 3] = 0; // near-white background -> transparent
      } else {
        data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; // content -> white
      }
    }

    await sharp(data, { raw: { width, height, channels } })
      .png()
      .toFile(file + ".tmp");

    require("fs").renameSync(file + ".tmp", file);
    console.log(`processed ${name}.png -> ${width}x${height}`);
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
