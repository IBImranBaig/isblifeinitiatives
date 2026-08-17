"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/animation/easings";
import { cn } from "@/lib/utils/cn";

interface InkFlourishProps {
  className?: string;
  /** Seconds to wait before the stroke draws on. */
  delay?: number;
  /** "mount" draws immediately; "inView" draws when scrolled into view. */
  trigger?: "mount" | "inView";
}

/**
 * The brand's handwritten signature stroke — a warm ink swash that draws
 * itself on. Reusable accent for any section that wants the "ink" motif.
 */
export function InkFlourish({ className, delay = 0, trigger = "inView" }: InkFlourishProps) {
  const draw = {
    pathLength: { delay, duration: 1.2, ease: EASE.ink },
    opacity: { delay, duration: 0.3 },
  };

  const animateProps =
    trigger === "mount"
      ? { animate: { pathLength: 1, opacity: 1 } }
      : { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true } };

  return (
    <svg
      viewBox="0 0 320 40"
      aria-hidden
      data-flourish
      className={cn("h-7 w-[min(72vw,320px)] overflow-visible", className)}
    >
      <motion.path
        d="M6 26 C 70 6, 150 6, 210 20 S 300 34, 314 12"
        fill="none"
        stroke="var(--color-ember)"
        strokeWidth={2.25}
        strokeLinecap="round"
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0 }}
        transition={draw}
        style={{ filter: "drop-shadow(0 0 6px rgba(91,134,232,0.45))" }}
        {...animateProps}
      />
    </svg>
  );
}
