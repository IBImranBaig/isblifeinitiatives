"use client";

import { motion, type Variants } from "framer-motion";
import { CountUp } from "@/components/sections/About/CountUp";

const TRUSTPILOT_GREEN = "#00b67a";

const DISTRIBUTION = [
  { label: "5-star", pct: 98 },
  { label: "4-star", pct: 2 },
  { label: "3-star", pct: 0 },
  { label: "2-star", pct: 0 },
  { label: "1-star", pct: 0 },
];

/** Stars pop in one-by-one as the card scrolls into view. */
const starsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const starItem: Variants = {
  hidden: { scale: 0.2, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 420, damping: 16 } },
};

function StarGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-white">
      <path d="M12 2.5l2.9 6.1 6.6.6-5 4.4 1.5 6.4L12 17.1 5.5 20l1.5-6.4-5-4.4 6.6-.6z" />
    </svg>
  );
}

/**
 * Trustpilot-style TrustScore card — wide rectangle. The score counts up, the
 * five stars pop in with a stagger, and the distribution bars fill, all on
 * scroll-in. Score left, distribution right.
 */
export function TrustScore() {
  return (
    <div className="w-full max-w-xl rounded-card border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-sm sm:p-7">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        {/* Left: overall score */}
        <div className="shrink-0 sm:border-r sm:border-white/10 sm:pr-8">
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl font-medium leading-none text-paper">
              <CountUp to={5} decimals={1} />
            </span>
            <div>
              <motion.div
                className="flex gap-0.5"
                variants={starsContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    variants={starItem}
                    className="flex h-5 w-5 items-center justify-center rounded-[3px]"
                    style={{ backgroundColor: TRUSTPILOT_GREEN }}
                  >
                    <StarGlyph />
                  </motion.span>
                ))}
              </motion.div>
              <p className="mt-1.5 text-sm font-medium text-paper">Excellent</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-paper/45">Based on 1,000+ reviews</p>
        </div>

        {/* Right: star distribution (bars fill on scroll-in) */}
        <div className="flex-1 space-y-1.5">
          {DISTRIBUTION.map((d) => (
            <div key={d.label} className="flex items-center gap-3 text-[0.68rem] text-paper/50">
              <span className="w-10 shrink-0">{d.label}</span>
              <span className="relative h-2 flex-1 overflow-hidden rounded-[3px] bg-white/12">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-[3px]"
                  style={{ backgroundColor: TRUSTPILOT_GREEN }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.pct}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
