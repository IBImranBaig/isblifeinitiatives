import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "./gsap";

interface ScrollStoryOptions {
  /** The tall scroll track (pin happens via the consumer's sticky stage). */
  trackRef: React.RefObject<HTMLElement | null>;
  /** Define the scrubbed timeline. Selectors resolve within the track. */
  build: (tl: gsap.core.Timeline, root: HTMLElement) => void;
  /** Reveal the final, fully-resolved state for reduced-motion users. */
  setStatic?: (root: HTMLElement) => void;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  defaults?: gsap.TweenVars;
}

/**
 * The scroll-narrative engine, factored out of the section components so every
 * cinematic/pinned section shares ONE implementation of:
 *   • prefers-reduced-motion fallback (static, fully-revealed, no pin)
 *   • gsap.context scoping + automatic cleanup (revert on unmount)
 *   • a ScrollTrigger-scrubbed timeline tied to the track
 *   • a refresh once layout settles
 *
 * Sections supply only their timeline (`build`) and their resolved static
 * state (`setStatic`). Returns `staticMode` so the section can swap its layout
 * (absolute/pinned → normal flow) when motion is disabled.
 *
 * This is the backbone for "scroll narratives" + "GSAP timelines" — new
 * storytelling sections compose it instead of re-implementing the boilerplate.
 */
export function useScrollStory({
  trackRef,
  build,
  setStatic,
  scrub = 0.8,
  start = "top top",
  end = "bottom bottom",
  defaults = { ease: "power2.inOut" },
}: ScrollStoryOptions) {
  const [staticMode, setStaticMode] = useState(false);

  // Keep latest callbacks without re-running the one-shot setup effect.
  const buildRef = useRef(build);
  buildRef.current = build;
  const staticRef = useRef(setStatic);
  staticRef.current = setStatic;

  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStaticMode(true);
      staticRef.current?.(root);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults,
        scrollTrigger: { trigger: root, start, end, scrub },
      });
      buildRef.current(tl, root);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, trackRef);

    return () => ctx.revert();
    // One-shot setup; callbacks are read via refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { staticMode };
}
