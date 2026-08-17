"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts from 0 → `to` once scrolled into view. Jumps straight to the value
 * for reduced-motion users. Shared atom — used by the "22+ Years" stat and the
 * Trustpilot "9,098+" scale figure (`format` adds thousands separators).
 */
export function CountUp({
  to,
  duration = 1.6,
  grouped = false,
  decimals = 0,
}: {
  to: number;
  duration?: number;
  /** Add thousands separators (serializable — safe across the server boundary). */
  grouped?: boolean;
  /** Fixed decimal places (e.g. 1 → "5.0"). */
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(eased * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  const display =
    decimals > 0
      ? n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : grouped
        ? Math.round(n).toLocaleString()
        : String(Math.round(n));

  return <span ref={ref}>{display}</span>;
}
