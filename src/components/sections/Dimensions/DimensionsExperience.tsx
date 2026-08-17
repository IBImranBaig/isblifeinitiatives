"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { EASE } from "@/lib/animation/easings";
import { DIMENSIONS } from "./dimensionsData";
import { DimensionVisual } from "./DimensionVisual";

// A single warm "champagne" accent (the one luxe note over the navy palette),
// for the active marker — used sparingly.
const CHAMPAGNE = "#cdb78a";

export function DimensionsExperience() {
  const [active, setActive] = useState(0);
  const d = DIMENSIONS[active];

  return (
    <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[3fr_7fr] lg:items-center lg:gap-16">
      {/* ── LEFT · editorial navigation ───────────────────────────────── */}
      <nav aria-label="Dimensions" className="lg:border-r lg:border-white/8 lg:pr-8">
        <ul className="flex flex-col">
          {DIMENSIONS.map((dim, i) => {
            const on = active === i;
            return (
              <li key={dim.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className="group flex w-full items-center gap-4 py-4 text-left"
                >
                  <span
                    className="font-display text-xs tabular-nums transition-colors duration-500"
                    style={{ color: on ? CHAMPAGNE : "rgba(151,163,189,0.4)" }}
                  >
                    {dim.n}
                  </span>
                  <span
                    className={cn(
                      "font-display font-medium transition-all duration-500 ease-[var(--ease-settle)]",
                      on ? "translate-x-0 text-2xl text-paper lg:text-[1.75rem]" : "text-lg text-paper/40 group-hover:text-paper/70",
                    )}
                  >
                    {dim.title}
                  </span>
                  <span
                    className="ml-auto h-px shrink-0 transition-all duration-500 ease-[var(--ease-settle)]"
                    style={{ width: on ? "2.5rem" : "0", backgroundColor: CHAMPAGNE, opacity: on ? 1 : 0 }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── RIGHT · the hero spread ───────────────────────────────────── */}
      <div className="relative flex min-h-[20rem] items-center lg:min-h-[19rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE.settle }}
            className="grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12"
          >
            {/* Text side */}
            <div>
              <span className="font-display text-base tabular-nums" style={{ color: CHAMPAGNE }}>{d.n}</span>
              <h3 className="mt-2 font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.02] text-paper">{d.title}</h3>
              <p className="mt-4 font-display text-xl italic text-ember-soft">{d.statement}</p>
              <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60">{d.body}</p>
            </div>

            {/* Visual side */}
            <div className="flex items-center justify-center">
              <DimensionVisual id={d.id} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
