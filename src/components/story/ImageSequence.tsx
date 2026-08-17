"use client";

import { useEffect, useRef } from "react";
import { useScrollStory } from "@/lib/animation/useScrollStory";
import { cn } from "@/lib/utils/cn";

interface ImageSequenceProps {
  /** Number of frames in the sequence. */
  frameCount: number;
  /** Resolve a frame URL from its 0-based index (e.g. `/seq/${i}.jpg`). */
  getFrameSrc: (index: number) => string;
  /** Scroll length of the pinned scrub, in viewport heights. */
  heightVh?: number;
  className?: string;
  /** Optional overlay (copy, gradients) rendered above the canvas. */
  children?: React.ReactNode;
}

/**
 * ENHANCEMENT PRIMITIVE — cinematic scroll-scrubbed image sequence.
 *
 * A pinned <canvas> that paints one frame per scroll position (the Apple
 * "AirPods/MacBook" effect). Frames cover-fit, redraw on resize (DPR-aware),
 * and the scrub is driven by the shared `useScrollStory` engine — so it
 * inherits the reduced-motion fallback (last frame, static) automatically.
 *
 * Drop-in ready: give it a `frameCount` + `getFrameSrc` and a sticky stage
 * appears. No section currently ships frames; this is the runway for them.
 */
export function ImageSequence({
  frameCount,
  getFrameSrc,
  heightVh = 300,
  className,
  children,
}: ImageSequenceProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRef = useRef(0);

  // Preload all frames once mounted.
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      imgs.push(img);
    }
    imagesRef.current = imgs;
    if (imgs[0]) imgs[0].onload = () => draw(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, getFrameSrc]);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // cover-fit
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = w / h;
    let dw: number, dh: number;
    if (ir > cr) {
      dh = h;
      dw = h * ir;
    } else {
      dw = w;
      dh = w / ir;
    }
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    currentRef.current = index;
  };

  // Redraw current frame on resize.
  useEffect(() => {
    const onResize = () => draw(currentRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { staticMode } = useScrollStory({
    trackRef,
    setStatic: () => draw(frameCount - 1),
    build: (tl) => {
      const state = { frame: 0 };
      tl.to(state, {
        frame: frameCount - 1,
        ease: "none",
        snap: { frame: 1 },
        duration: 1,
        onUpdate: () => draw(Math.round(state.frame)),
      });
    },
  });

  return (
    <div
      ref={trackRef}
      className={cn("relative w-full bg-ink", className)}
      style={staticMode ? undefined : { height: `${heightVh}vh` }}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center overflow-hidden",
          staticMode ? "relative h-[100svh]" : "sticky top-0 h-[100svh]",
        )}
      >
        <canvas ref={canvasRef} className="h-full w-full" />
        {children && <div className="absolute inset-0">{children}</div>}
      </div>
    </div>
  );
}
