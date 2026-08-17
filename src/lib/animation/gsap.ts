import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { EASE, GSAP_EASE } from "@/lib/animation/easings";

/**
 * Single GSAP entry point. Registers plugins exactly once (client-only).
 * Every scroll-driven section imports gsap/ScrollTrigger from here so the
 * plugins are guaranteed registered and we never double-register.
 */

// A CSS cubic-bezier(x1,y1,x2,y2) is the bézier P0(0,0) P1(x1,y1) P2(x2,y2)
// P3(1,1) — so this path is mathematically identical to the Framer curve.
const toPath = (c: readonly [number, number, number, number]) =>
  `M0,0 C${c[0]},${c[1]} ${c[2]},${c[3]} 1,1`;

let brandEasesRegistered = false;

/**
 * Register the brand curves as named GSAP `CustomEase`s, built from the EXACT
 * same control points as the Framer `EASE` tokens. Idempotent + client-only.
 */
export function registerBrandEases() {
  if (brandEasesRegistered || typeof window === "undefined") return;
  gsap.registerPlugin(CustomEase);
  CustomEase.create(GSAP_EASE.settle, toPath(EASE.settle));
  CustomEase.create(GSAP_EASE.ink, toPath(EASE.ink));
  CustomEase.create(GSAP_EASE.out, toPath(EASE.out));
  brandEasesRegistered = true;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  registerBrandEases();
  // Dev-only handle for tooling/debugging scroll-driven sections.
  if (process.env.NODE_ENV === "development") {
    (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
  }
}

export { gsap, ScrollTrigger };
