import type Lenis from "lenis";

/**
 * Module singleton for the active Lenis instance, set by SmoothScrollProvider.
 * Lets non-provider components (e.g. the nav) drive smooth section scrolling in
 * production — no window globals, no context plumbing. Null when reduced-motion
 * is on (callers fall back to native smooth scroll).
 */
let current: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  current = instance;
}

export function getLenis(): Lenis | null {
  return current;
}
