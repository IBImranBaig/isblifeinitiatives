"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils/cn";

interface LazySceneProps {
  /** Dynamic import of a client module default-exporting an R3F <Canvas>. */
  load: () => Promise<{ default: ComponentType }>;
  /** Painted instantly + kept as the no-WebGL / loading fallback. */
  poster?: React.ReactNode;
  className?: string;
}

/**
 * ENHANCEMENT PRIMITIVE — lazy, performance-safe mount for any 3D interaction.
 *
 * Generalises the Hero's WebGL strategy so every future R3F scene inherits it:
 *   • three.js is code-split (`dynamic`, `ssr:false`) — never blocks first paint
 *   • the scene mounts only after first paint (idle) and only if WebGL exists
 *   • a static `poster` paints immediately and remains the graceful fallback
 *
 * Usage:
 *   <LazyScene load={() => import("@/components/three/scenes/Foo/FooCanvas")}
 *              poster={<div className="…gradient…" />} />
 */
export function LazyScene({ load, poster, className }: LazySceneProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      try {
        const canvas = document.createElement("canvas");
        if (canvas.getContext("webgl2") || canvas.getContext("webgl")) setReady(true);
      } catch {
        /* no WebGL — poster remains */
      }
    };
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 600 })
      : window.setTimeout(start, 200);
    return () => {
      if (hasIdle) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, []);

  // Create the code-split component exactly once, when first needed.
  const sceneRef = useRef<ComponentType | null>(null);
  if (ready && !sceneRef.current) sceneRef.current = dynamic(load, { ssr: false });
  const Scene = sceneRef.current;

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden>
      {poster}
      {Scene && <Scene />}
    </div>
  );
}
