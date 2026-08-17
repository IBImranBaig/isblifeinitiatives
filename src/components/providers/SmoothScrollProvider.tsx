"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animation/gsap";
import { setLenis } from "@/lib/animation/lenis";

/**
 * Inertia smooth-scroll that drives a single virtual scroll position.
 * Lenis is ticked by GSAP's ticker so the whole site shares ONE clock —
 * Framer Motion, GSAP timelines, and R3F all read from the same scroll.
 * Lenis scroll events feed ScrollTrigger, so pinned/scrubbed sections stay
 * in perfect sync with smooth scrolling.
 *
 * Disabled automatically for users who prefer reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    setLenis(lenis);

    // Dev-only handle for tooling/debugging (e.g. driving scroll in tests).
    if (process.env.NODE_ENV === "development") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
