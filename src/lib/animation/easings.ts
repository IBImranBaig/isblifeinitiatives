/**
 * Brand motion language: "settle, never bounce."
 * Heavy, slow, inevitable — like ink behaving in water.
 *
 * A pure, dependency-free token module shared by Framer Motion (DOM) and GSAP.
 * The matching GSAP `CustomEase`s for `GSAP_EASE` are registered from these
 * exact `EASE` control points in `src/lib/animation/gsap.ts` (the single GSAP
 * entry point), so this file never imports gsap.
 */
export const EASE = {
  /** Default reveal — decisive entrance, gentle settle. */
  settle: [0.16, 1, 0.3, 1] as const,
  /** Ink-like, symmetric — for draw-on / morph motions. */
  ink: [0.65, 0.05, 0.36, 1] as const,
  /** Slow luxurious out. */
  out: [0.22, 1, 0.36, 1] as const,
} as const;

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  cinematic: 1.6,
} as const;

/**
 * The one canonical entrance travel distance (px). Reveals translate this far
 * on the way in — shared by the Framer `rise` variant and the GSAP beats so
 * every entrance moves the same amount.
 */
export const TRAVEL = 30;

/**
 * Tighter entrance travel for node-anchored layouts (e.g. the Journey timeline,
 * where steps sit beside fixed rail dots and a full `TRAVEL` would detach the
 * dimmed text from its node). Same opacity + translateY gesture, shorter throw.
 */
export const TRAVEL_TIGHT = 12;

/**
 * GSAP ease NAMES. The matching `CustomEase`s are registered from `EASE`'s exact
 * control points in `src/lib/animation/gsap.ts`, so DOM and GSAP are identical.
 * Only the names live here, keeping this module dependency-free.
 */
export const GSAP_EASE = { settle: "settle", ink: "ink", out: "out" } as const;
