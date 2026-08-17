/**
 * THE WORD RECEIVER — the Invitation bookend.
 *
 * Rasterises a single word in the site's loaded italic Playfair face onto an
 * offscreen canvas and samples its glyph pixels into particle target positions.
 * The Reform scene morphs its scattered "dust of minds" onto these targets, so
 * the field reassembles into language — the full-circle answer to the Hero's
 * ink-stroke→mind overture.
 *
 * Rendering the word in the brand display face (the same italic used for the
 * headline's emphasis words) ties the moment to the type system rather than a
 * stray script font. Coordinates are normalised, aspect-preserved and y-up.
 */

export interface WordTargets {
  /** Flattened [x,y, x,y, …] normalised by the longest side, y-up, centred at 0. */
  positions: Float32Array;
  /** Sampled word box aspect (w / h) so the scene can place it in the void. */
  aspect: number;
  count: number;
}

/** Resolve the next/font Playfair family token (e.g. "__Playfair_Display_abc"). */
function playfairFamily(): string {
  const fam = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-playfair")
    .trim();
  return fam || "Georgia, serif";
}

export async function sampleWordTargets(
  text: string,
  count: number,
): Promise<WordTargets | null> {
  if (typeof document === "undefined") return null;
  try {
    const px = 280;
    const font = `italic 600 ${px}px ${playfairFamily()}`;

    // Make sure the webfont is actually loaded before we measure/rasterise it,
    // otherwise the fallback metrics produce a different shape.
    if (document.fonts?.load) {
      try {
        await document.fonts.load(font, text);
      } catch {
        /* fall through — fallback face still rasterises */
      }
    }

    const meas = document.createElement("canvas").getContext("2d");
    if (!meas) return null;
    meas.font = font;
    const m = meas.measureText(text);
    const ascent = m.actualBoundingBoxAscent || px * 0.75;
    const descent = m.actualBoundingBoxDescent || px * 0.3;
    const pad = Math.ceil(px * 0.18);
    const W = Math.ceil(m.width) + pad * 2;
    const H = Math.ceil(ascent + descent) + pad * 2;

    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.font = font;
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(text, pad, pad + ascent);

    const data = ctx.getImageData(0, 0, W, H).data;
    const xs: number[] = [];
    const ys: number[] = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (data[(y * W + x) * 4 + 3] > 40) {
          xs.push(x);
          ys.push(y);
        }
      }
    }
    if (xs.length < 32) return null;

    // True ink bounds (the padding was only to avoid clipping anti-aliasing).
    let minX = W;
    let maxX = 0;
    let minY = H;
    let maxY = 0;
    for (let i = 0; i < xs.length; i++) {
      if (xs[i] < minX) minX = xs[i];
      if (xs[i] > maxX) maxX = xs[i];
      if (ys[i] < minY) minY = ys[i];
      if (ys[i] > maxY) maxY = ys[i];
    }
    const bw = maxX - minX || 1;
    const bh = maxY - minY || 1;
    const maxDim = Math.max(bw, bh);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    const positions = new Float32Array(count * 2);
    for (let k = 0; k < count; k++) {
      const i = (Math.random() * xs.length) | 0;
      const sx = xs[i] + Math.random() - 0.5;
      const sy = ys[i] + Math.random() - 0.5;
      positions[k * 2] = (sx - cx) / maxDim; // x, normalised, centred
      positions[k * 2 + 1] = (cy - sy) / maxDim; // y, y-up
    }
    return { positions, aspect: bw / bh, count };
  } catch {
    return null; // any failure → caller keeps the plain void
  }
}
