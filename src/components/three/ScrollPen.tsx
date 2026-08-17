"use client";

/**
 * SCROLL PEN — on load the pen rides the hero ink-flourish's drawing tip (synced
 * to the actual stroke progress) and holds at the stroke end. Once the user
 * scrolls, all of the old floaty/inertial/deflection behavior is gone: the pen
 * simply flows straight down the page tied to scroll progress, lightly eased so
 * the follow stays smooth (no tumble, no idle drift, no text deflection).
 * Renders on all screens; skipped for reduced-motion (see ScrollPenMount).
 */

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef } from "react";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// Nib position within the pen image (measured from public/pen.png).
const NIB_X = 0.047;
const NIB_Y = 0.493;

// Per-frame smoothing of the pen toward its scroll target. Higher = tighter
// tracking; lower = a longer, softer glide. Keeps motion smooth without inertia.
const FLOW_SMOOTH = 0.085;

export function ScrollPen() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rot = useMotionValue(-26);
  const pen = useRef<HTMLImageElement>(null);
  const base = useRef({ x: 0, y: 0, r: -26 });
  const init = useRef(false);

  useAnimationFrame(() => {
    const penW = pen.current?.offsetWidth ?? 170;
    const penH = pen.current?.offsetHeight ?? 170;
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const b = base.current;
    const sy = window.scrollY;

    const placeNib = (px: number, py: number, deg: number) => {
      const th = (deg * Math.PI) / 180;
      const nlx = (NIB_X - 0.5) * penW;
      const nly = (NIB_Y - 0.5) * penH;
      const tx = nlx * Math.cos(th) - nly * Math.sin(th);
      const ty = nlx * Math.sin(th) + nly * Math.cos(th);
      return { x: px - tx - penW / 2, y: py - ty - penH / 2 };
    };

    const atTop = sy < 40;
    const pathEl = document.querySelector("[data-flourish] path") as SVGPathElement | null;
    const ctm = pathEl?.getScreenCTM();
    // Live draw progress straight from the stroke (so the pen matches its speed).
    // Framer draws the path by animating the dash-array's "on" length (the first
    // value) from 0 → 1 (pathLength is normalised to 1); dash-offset stays 0.
    let frac = 1;
    if (pathEl) {
      const on = parseFloat(getComputedStyle(pathEl).strokeDasharray);
      if (!Number.isNaN(on)) frac = clamp(on, 0, 1);
    }

    // ── Phase 1: ride the drawing tip exactly (snap = same speed as stroke). ──
    if (atTop && pathEl && ctm && frac < 0.999) {
      const p = pathEl.getPointAtLength(frac * pathEl.getTotalLength()).matrixTransform(ctm);
      const pos = placeNib(p.x, p.y, -26);
      b.x = pos.x;
      b.y = pos.y;
      b.r = -26;
      x.set(pos.x);
      y.set(pos.y);
      rot.set(-26);
      init.current = true;
      return;
    }

    let tX: number;
    let tY: number;
    let tR: number;

    if (atTop) {
      // ── Phase 2: rest at the stroke end. ──
      if (pathEl && ctm) {
        const p = pathEl.getPointAtLength(pathEl.getTotalLength()).matrixTransform(ctm);
        const pos = placeNib(p.x, p.y, -26);
        tX = pos.x;
        tY = pos.y;
        tR = -26;
      } else {
        tX = b.x;
        tY = b.y;
        tR = b.r;
      }
    } else {
      // ── Phase 3: free scroll-driven roam — the pen wanders and tumbles all
      //    over the viewport as you scroll, instead of just gliding down. ──
      const docH = document.documentElement.scrollHeight;
      const prog = clamp(sy / Math.max(1, docH - vh), 0, 1);
      const eased = prog * prog * (3 - 2 * prog); // smoothstep baseline descent
      // Roam: a broad drift across the page plus a faster looping wander, so the
      // pen swings left↔right and dips up/down freely rather than tracking a line.
      tX =
        vw * 0.5 +
        Math.sin(prog * Math.PI * 2.4) * vw * 0.34 +
        Math.cos(prog * Math.PI * 6.1) * vw * 0.08;
      tY =
        lerp(vh * 0.32, vh * 0.78, eased) +
        Math.cos(prog * Math.PI * 3.2) * vh * 0.16;
      // Free rotation: spins continuously with scroll (several turns top→bottom)
      // and adds a faster wobble so it tumbles loosely as it roams.
      tR = -20 + prog * 720 + Math.sin(prog * Math.PI * 5) * 28;
    }

    // Single light smoothing toward the target — keeps the follow smooth while
    // staying locked to scroll (no spring overshoot, no momentum).
    if (!init.current) {
      init.current = true;
      b.x = tX;
      b.y = tY;
      b.r = tR;
    } else {
      b.x = lerp(b.x, tX, FLOW_SMOOTH);
      b.y = lerp(b.y, tY, FLOW_SMOOTH);
      b.r = lerp(b.r, tR, FLOW_SMOOTH);
    }

    x.set(b.x);
    y.set(b.y);
    rot.set(b.r);
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-30 [perspective:1100px]">
      <motion.img
        ref={pen}
        src="/pen.png"
        alt=""
        aria-hidden
        style={{ x, y, rotate: rot }}
        className="absolute left-0 top-0 w-[clamp(92px,13vw,175px)] origin-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] will-change-transform"
      />
    </div>
  );
}
