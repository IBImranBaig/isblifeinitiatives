"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// three.js is quarantined in its own chunk and never server-rendered.
const ReformCanvas = dynamic(() => import("@/components/three/Canvas/ReformCanvas"), {
  ssr: false,
});

/**
 * THE REFORM FIELD — the void slot of the Invitation.
 *
 * Mounts the reform WebGL scene the same way the Hero does: code-split, after
 * first paint, only if WebGL exists — the void gradient is the instant poster
 * and the graceful fallback. An IntersectionObserver gates the render loop so
 * the second context costs nothing until the closing section is on screen, and
 * triggers the one-shot "dust → word" convergence the first time it is seen.
 *
 * Decorative only: aria-hidden, pointer-events-none — copy and CTAs untouched.
 */
export function ReformField() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  // WebGL-guarded, idle-deferred mount — never blocks first paint.
  useEffect(() => {
    const start = () => {
      try {
        const c = document.createElement("canvas");
        if (c.getContext("webgl2") || c.getContext("webgl")) setReady(true);
      } catch {
        /* no WebGL — void gradient remains */
      }
    };
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 800 })
      : window.setTimeout(start, 300);
    return () => {
      if (hasIdle) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, []);

  // Run the loop only while the section is on screen.
  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "10% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {ready && <ReformCanvas active={active} />}
    </div>
  );
}
