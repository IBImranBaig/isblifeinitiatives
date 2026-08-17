"use client";

import { motion, type MotionStyle } from "framer-motion";
import { staggerContainer } from "./variants";

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  /** "mount" = animate on load (above the fold). "inView" = on scroll-in. */
  trigger?: "mount" | "inView";
  /** Hold the first child until this many seconds (e.g. after an overture). */
  delayChildren?: number;
  /** Passthrough for parallax MotionValues, etc. */
  style?: MotionStyle;
  once?: boolean;
  /**
   * How much of the group must be in view before it reveals. Defaults to
   * "some" (any part visible) — a fixed fraction like 0.3 silently never
   * fires when the group stacks taller than the viewport on mobile, leaving
   * the content invisible.
   */
  amount?: "some" | "all" | number;
}

/**
 * Orchestrates a sequence of <RevealItem> children using the shared
 * animation language. The default building block for any section that
 * reveals its content in order.
 */
export function StaggerGroup({
  children,
  className,
  trigger = "inView",
  delayChildren = 0,
  style,
  once = true,
  amount = "some",
}: StaggerGroupProps) {
  const animateProps =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once, amount } };

  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerContainer}
      custom={delayChildren}
      initial="hidden"
      {...animateProps}
    >
      {children}
    </motion.div>
  );
}
