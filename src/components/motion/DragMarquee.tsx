"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface DragMarqueeProps {
  /** One set of items — they're duplicated internally for a seamless loop. */
  children: ReactNode;
  /** Auto-scroll speed in px/second. */
  speed?: number;
  className?: string;
  /** Extra classes for each item group (e.g. "items-start"). */
  trackClassName?: string;
}

/**
 * A horizontally auto-looping row you can grab and drag. It scrolls left on its
 * own; while you press and drag it follows your pointer and the loop pauses; on
 * release it resumes from wherever you left it. Two copies of the children make
 * the wrap seamless in both directions. Reduced-motion: no auto-scroll, still
 * draggable.
 */
export function DragMarquee({ children, speed = 40, className, trackClassName }: DragMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const setW = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      setW.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      if (!dragging.current && !reduce) offset.current -= speed * dt;
      const w = setW.current || 1;
      if (offset.current <= -w) offset.current += w;
      else if (offset.current > 0) offset.current -= w;
      track.style.transform = `translate3d(${offset.current}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed]);

  // NB: we intentionally do NOT setPointerCapture here — capturing on the wrapper
  // swallows click events on child cards (so tap-to-open wouldn't fire). Drag
  // still works because pointermove bubbles from the children to this wrapper;
  // leaving the wrapper just ends the drag (onPointerLeave).
  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    offset.current += e.clientX - lastX.current;
    lastX.current = e.clientX;
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <div
      className={cn(
        "relative cursor-grab select-none overflow-hidden active:cursor-grabbing",
        className,
      )}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onPointerCancel={onUp}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className={cn("flex shrink-0", trackClassName)}>{children}</div>
        <div className={cn("flex shrink-0", trackClassName)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
