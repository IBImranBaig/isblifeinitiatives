"use client";

import { useEffect, useRef } from "react";

export type PointerState = { x: number; y: number };

/**
 * Tracks the global pointer position, normalized to [-1, 1] on both axes
 * (origin at viewport center, y-up). Reads via window so it works regardless
 * of which element sits on top — the WebGL canvas can live behind overlays.
 *
 * Returns a ref (no re-renders) so it can be polled inside a render loop.
 */
export function usePointer(): React.MutableRefObject<PointerState> {
  const pointer = useRef<PointerState>({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  return pointer;
}
