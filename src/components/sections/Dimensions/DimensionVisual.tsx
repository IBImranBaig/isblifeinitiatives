"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation/easings";
import type { DimensionId } from "./dimensionsData";

/**
 * The Visual Story — one clear, recognizable line icon per dimension, drawn in
 * the brand's cool "insight" glow, anchored by a warm handwriting flourish that
 * keeps the penmanship motif. Icons are hand-authored vector line-art (no
 * external/licensed assets). Reduced motion → static, fully revealed.
 *
 *   Mind          → lightbulb (the spark of awareness)
 *   Body          → heart + pulse (health & vitality)
 *   Soul          → lotus (inner stillness)
 *   Career        → rising bars + ascent (growth)
 *   Relationships → two figures joined by a heart
 *   Parenting     → parent & child
 */

const INK = "var(--color-ember)";
const GLOW = "var(--color-glow)";
const GLOW_SOFT = "var(--color-glow-soft)";

type DrawProps = { d: string; stroke?: string; w?: number; dur?: number; delay?: number; reduce: boolean; opacity?: number };
function Draw({ d, stroke = GLOW, w = 2.4, dur = 0.9, delay = 0, reduce, opacity = 1 }: DrawProps) {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? opacity : 0 }}
      animate={{ pathLength: 1, opacity }}
      transition={{
        pathLength: { duration: reduce ? 0 : dur, ease: EASE.ink, delay: reduce ? 0 : delay },
        opacity: { duration: reduce ? 0 : 0.3, delay: reduce ? 0 : delay },
      }}
    />
  );
}

/* Recognizable line icons, centred at (280, ~170) within the 560×392 canvas. */
function DimensionIcon({ id }: { id: DimensionId }) {
  switch (id) {
    case "mind":
      return (
        <>
          <circle cx="280" cy="150" r="46" />
          <path d="M268 150 L276 164 L284 150 L292 164" />
          <path d="M262 200 H298" />
          <path d="M266 210 H294" />
          <path d="M272 220 H288" />
          <path d="M280 90 V80" />
          <path d="M236 106 L229 99" />
          <path d="M324 106 L331 99" />
          <path d="M220 150 H210" />
          <path d="M340 150 H350" />
        </>
      );
    case "body":
      return (
        <>
          <path d="M280 216 C 230 181 237 127 268 127 C 277 127 280 136 280 143 C 280 136 283 127 292 127 C 323 127 330 181 280 216 Z" />
          <path d="M234 166 H260 L266 144 L277 192 L286 156 L292 166 H326" stroke={GLOW_SOFT} />
        </>
      );
    case "soul":
      return (
        <>
          <path d="M280 238 C 268 200 268 173 280 150 C 292 173 292 200 280 238 Z" />
          <path d="M280 238 C 251 215 241 188 241 165 C 266 171 280 209 280 238 Z" />
          <path d="M280 238 C 309 215 319 188 319 165 C 294 171 280 209 280 238 Z" />
          <path d="M280 238 C 239 227 213 209 201 190 C 230 186 266 209 280 238 Z" />
          <path d="M280 238 C 321 227 347 209 359 190 C 330 186 294 209 280 238 Z" />
          <circle cx="280" cy="238" r="3.5" fill={GLOW_SOFT} stroke="none" />
        </>
      );
    case "career":
      return (
        <>
          <path d="M204 254 H356" />
          <path d="M232 254 V226" strokeWidth={9} />
          <path d="M268 254 V200" strokeWidth={9} />
          <path d="M304 254 V172" strokeWidth={9} />
          <path d="M340 254 V144" strokeWidth={9} />
          <path d="M214 218 L290 160 L348 118" stroke={GLOW_SOFT} />
          <path d="M325 114 L350 117 L347 142" stroke={GLOW_SOFT} />
        </>
      );
    case "relationships":
      return (
        <>
          <circle cx="244" cy="158" r="20" />
          <path d="M210 232 C 210 191 278 191 278 232" />
          <circle cx="316" cy="158" r="20" />
          <path d="M282 232 C 282 191 350 191 350 232" />
          <path d="M280 120 C 274 111 262 115 262 125 C 262 135 280 146 280 146 C 280 146 298 135 298 125 C 298 115 286 111 280 120 Z" stroke={GLOW_SOFT} />
        </>
      );
    case "parenting":
      return (
        <>
          <circle cx="244" cy="136" r="22" />
          <path d="M206 246 C 206 193 282 193 282 246" />
          <circle cx="324" cy="182" r="14" />
          <path d="M300 246 C 300 211 348 211 348 246" />
          <path d="M270 216 L304 224" stroke={GLOW_SOFT} />
        </>
      );
  }
}

export function DimensionVisual({ id }: { id: DimensionId }) {
  const reduce = !!useReducedMotion();
  return (
    <svg
      viewBox="0 0 560 392"
      aria-hidden
      className="h-auto w-full"
      fill="none"
      style={{ filter: "drop-shadow(0 0 30px rgba(91,134,232,0.12))" }}
    >
      {/* The icon — cool insight line-art */}
      <motion.g
        stroke={GLOW}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: EASE.settle, delay: reduce ? 0 : 0.1 }}
      >
        <DimensionIcon id={id} />
      </motion.g>

      {/* The constant: a warm handwriting flourish underline (penmanship motif) */}
      <Draw
        d="M196 304 C 224 290 246 316 280 302 C 314 288 336 314 364 300"
        stroke={INK}
        w={2.4}
        dur={1.1}
        delay={0.25}
        reduce={reduce}
        opacity={0.9}
      />
    </svg>
  );
}
