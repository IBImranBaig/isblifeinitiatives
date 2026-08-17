"use client";

import { getLenis } from "@/lib/animation/lenis";

const NAV_OFFSET = -72;

/**
 * Anchor that smooth-scrolls in-page links via Lenis (matching the nav).
 * External / mailto links behave natively. Used by the footer's section links.
 */
export function SmoothLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const onClick = (e: React.MouseEvent) => {
    if (!href.startsWith("#")) return; // let the browser handle external/mailto
    e.preventDefault();
    const lenis = getLenis();
    if (href === "#") {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(href.slice(1));
    if (el && lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
    else if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
