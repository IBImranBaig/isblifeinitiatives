import { useMemo } from "react";
import type { WordTargets } from "@/lib/three/wordTargets";

export type Quality = "low" | "high";

// Camera constants — must match ReformCanvas.
export const CAM_Z = 10;
export const CAM_FOV = 50;

export interface ReformView {
  visW: number;
  visH: number;
  aspect: number;
}

export interface ReformData {
  count: number;
  /** Scattered dust (the start state). */
  start: Float32Array;
  /** Word target (the formed state). */
  end: Float32Array;
  seed: Float32Array;
  scale: Float32Array;
  delay: Float32Array;
}

export function computeView(): ReformView {
  const aspect = window.innerWidth / Math.max(1, window.innerHeight);
  const visH = 2 * CAM_Z * Math.tan((CAM_FOV * Math.PI) / 180 / 2);
  return { visW: visH * aspect, visH, aspect };
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * start = dust scattered across the void; end = the word, placed centred in the
 * visual stage. If the word failed to sample, end falls back to a soft drifting
 * band so the field still reads as ambient light rather than vanishing.
 */
export function useReformData(
  quality: Quality,
  view: ReformView,
  word: WordTargets | null,
): ReformData {
  return useMemo(() => {
    const count = quality === "high" ? 4800 : 2400;
    const rng = mulberry32(0x5eed);

    const start = new Float32Array(count * 3);
    const end = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);
    const delay = new Float32Array(count);

    // The word sits centred; mobile gives it more of the width so it stays legible.
    const targetW = view.visW * (view.aspect < 1 ? 0.66 : 0.52);
    const cy = view.visH * 0.0;

    for (let i = 0; i < count; i++) {
      seed[i] = rng();
      scale[i] = 0.5 + rng() * 1.0;
      delay[i] = rng();

      // Scattered dust — fills the void, a touch wider than the frame.
      start[i * 3] = (rng() - 0.5) * view.visW * 1.15;
      start[i * 3 + 1] = (rng() - 0.5) * view.visH * 0.95;
      start[i * 3 + 2] = (rng() - 0.5) * 4.0;

      if (word && word.count > 0) {
        const j = i % word.count;
        end[i * 3] = word.positions[j * 2] * targetW;
        end[i * 3 + 1] = cy + word.positions[j * 2 + 1] * targetW;
        end[i * 3 + 2] = (rng() - 0.5) * 0.25;
      } else {
        // Fallback: a soft horizontal band of light.
        end[i * 3] = (rng() - 0.5) * targetW;
        end[i * 3 + 1] = cy + (rng() - 0.5) * view.visH * 0.12;
        end[i * 3 + 2] = (rng() - 0.5) * 0.25;
      }
    }

    return { count, start, end, seed, scale, delay };
  }, [quality, view, word]);
}
