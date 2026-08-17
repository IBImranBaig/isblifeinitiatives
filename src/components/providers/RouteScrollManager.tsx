"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/animation/lenis";

/**
 * Resets the scroll position to the top whenever the route (pathname) changes.
 *
 * Lenis lives in {@link SmoothScrollProvider}, which is mounted once in the root
 * layout and never unmounts — so it keeps its virtual scroll position across
 * client navigations and silently defeats Next's default scroll-to-top. This
 * snaps both Lenis and the window back to the top on every pathname change.
 *
 * Hash navigations (e.g. "/#programs" from a sub-page) are skipped so deep-links
 * still land on their target section instead of being yanked to the top.
 */
export function RouteScrollManager() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    // Don't fight the initial load (and any intended hash anchor on first paint).
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (typeof window !== "undefined" && window.location.hash) return;

    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
