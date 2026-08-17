/**
 * Optimize the "3-step journey" images (public/method/*.png).
 *
 * The source PixelSquid renders are 2048×2048 (1.4–7.2 MB) but display at ~112px.
 * Downscale to 256px and re-compress (transparency preserved) so they load fast.
 */
const sharp = require("sharp");
const path = require("path");

const DIR = path.join(__dirname, "..", "public", "method");
const FILES = ["analyze.png", "understand.png", "transform.png"];

(async () => {
  for (const f of FILES) {
    const src = path.join(DIR, f);
    const buf = await sharp(src)
      .resize(256, 256, { fit: "inside", withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true, quality: 80 })
      .toBuffer();
    require("fs").writeFileSync(src, buf);
    console.log(`${f} -> ${(buf.length / 1024).toFixed(0)} KB`);
  }
})();
