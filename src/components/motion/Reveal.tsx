"use client";

import { motion, type Variants } from "framer-motion";
import { rise } from "./variants";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating. */
  delay?: number;
  variants?: Variants;
  once?: boolean;
  /** How much of the element must be in view to trigger (Framer `viewport.amount`).
   * Use "some" for tall elements so they reveal as soon as they start entering. */
  amount?: number | "some" | "all";
}

/**
 * Standalone scroll-reveal for a single element (no parent orchestration).
 * Use inside sections for one-off reveals; use <StaggerGroup> for sequences.
 */
export function Reveal({ children, className, delay = 0, variants = rise, once = true, amount = 0.3 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
