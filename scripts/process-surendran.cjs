const sharp = require("sharp");
const path = require("path");

const DIR = path.join(__dirname, "..", "public", "experts");
const SRC = path.join(DIR, "Surendran Jayasekar.jpeg");
const OUT = path.join(DIR, "surendran-jayasekar.jpg");

(async () => {
  const m = await sharp(SRC).metadata();
  // Trim ~16% off the top (green backdrop headroom) so the people sit higher in
  // the bg-top card crop, then size down for the web.
  const top = Math.round(m.height * 0.16);
  const buf = await sharp(SRC)
    .extract({ left: 0, top, width: m.width, height: m.height - top })
    .resize(640, null, { withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  require("fs").writeFileSync(OUT, buf);
  console.log(`source ${m.width}x${m.height} -> surendran-jayasekar.jpg ${(buf.length / 1024).toFixed(0)} KB`);
})();
