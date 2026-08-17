"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation/easings";

/**
 * Imran Baig's handwritten signature — drawn on scroll-in. Doubles as an
 * intentional, on-brand placeholder inside the portrait slot (handwriting IS
 * the brand), so the frame never reads as a "missing photo".
 */
export function Signature({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 300 110" aria-hidden className={className} fill="none">
      <motion.path
        d="M18 78 C 30 30, 52 26, 56 52 C 60 78, 48 92, 58 96 C 74 100, 84 44, 100 40 C 116 36, 104 92, 122 90 C 140 88, 138 46, 156 44 C 172 42, 160 86, 178 84 C 196 82, 196 44, 214 46 C 230 48, 222 82, 240 78 C 256 74, 258 50, 274 44"
        stroke="var(--color-ember-soft)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ pathLength: { duration: 2, ease: EASE.ink }, opacity: { duration: 0.4 } }}
        style={{ filter: "drop-shadow(0 0 7px rgba(91,134,232,0.45))" }}
      />
      <motion.path
        d="M22 92 C 100 104, 210 104, 286 86"
        stroke="var(--color-ember)"
        strokeWidth={1.25}
        strokeLinecap="round"
        pathLength={1}
        initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ pathLength: { duration: 1, ease: EASE.ink, delay: 1.4 }, opacity: { duration: 0.3, delay: 1.4 } }}
      />
    </svg>
  );
}
