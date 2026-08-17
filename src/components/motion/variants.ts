import type { Variants } from "framer-motion";
import { EASE, DURATION, TRAVEL } from "@/lib/animation/easings";

/**
 * THE ANIMATION LANGUAGE
 * One vocabulary for the whole site: "settle, never bounce."
 * Sections compose these — they never hand-roll durations or easings.
 */

export { EASE, DURATION };

/** Default reveal: rises and settles into place. */
export const rise: Variants = {
  hidden: { opacity: 0, y: TRAVEL },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.settle } },
};

/** Quieter reveal: fade only (for fine print, hairlines). */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.out } },
};

/** Scale-in for cards / media. */
export const lift: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.slow, ease: EASE.settle } },
};

export interface StaggerOptions {
  stagger?: number;
  delayChildren?: number;
}

/**
 * Orchestration parent. Children animate in sequence.
 * Accepts a numeric `custom` = delayChildren, so a section can hold its
 * reveal until an intro/overture completes.
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: (delayChildren: number = 0) => ({
    transition: { staggerChildren: 0.16, delayChildren },
  }),
};
