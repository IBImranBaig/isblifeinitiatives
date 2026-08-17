/**
 * Optimize + rename the program product-box images (public/program/*.jpeg with
 * spaces in their names) into clean, web-sized files the site references.
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const DIR = path.join(__dirname, "..", "public", "program");
const MAP = [
  ["WhatsApp Image 2026-06-04 at 5.17.59 PM.jpeg", "first-step.png"],
  ["WhatsApp Image 2026-06-04 at 5.18.07 PM.jpeg", "professional-approach.png"],
  ["WhatsApp Image 2026-06-04 at 5.18.16 PM.jpeg", "inner-physician.png"],
  ["WhatsApp Image 2026-06-04 at 5.18.30 PM.jpeg", "master-practitioner.png"],
];

(async () => {
  for (const [src, out] of MAP) {
    const buf = await sharp(path.join(DIR, src))
      .resize(560, 560, { fit: "inside", withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 82 })
      .toBuffer();
    fs.writeFileSync(path.join(DIR, out), buf);
    console.log(`${out} -> ${(buf.length / 1024).toFixed(0)} KB`);
  }
})();
