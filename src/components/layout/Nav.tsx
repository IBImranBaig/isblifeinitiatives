"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getLenis } from "@/lib/animation/lenis";
import { EASE } from "@/lib/animation/easings";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { label: "Programs", href: "#programs" },
  { label: "About", href: "#about" },
  { label: "Podcasts", href: "#podcasts" },
  { label: "Reviews", href: "#testimonials" },
];

const NAV_OFFSET = -72; // leave room for the bar when scrolling to a section

/**
 * Global navigation — minimal, luxury. Transparent over the hero, frosted glass
 * once scrolled. Logo left, section links + "Book Analysis" right, hamburger on
 * mobile. Section jumps use Lenis for smooth scroll (native fallback).
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scrolling while the mobile menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      getLenis()?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    // The close effect unlocks the body, but only after the next commit/paint.
    // A scroll issued while the body is still `overflow: hidden` is silently
    // dropped — the cause of intermittent no-op section jumps from the mobile
    // menu. Unlock synchronously here so the jump always lands.
    document.body.style.overflow = "";
    // Sections only exist on the homepage — from another route, navigate to
    // "/#section" and let the App Router handle the jump.
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.start();
      lenis.scrollTo(el, { offset: NAV_OFFSET });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.body.style.overflow = "";
    // Already home → smooth-scroll to the top. From any other route → go home.
    if (pathname !== "/") {
      router.push("/");
      return;
    }
    const lenis = getLenis();
    if (lenis) {
      lenis.start();
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
          scrolled ? "border-white/5 bg-ink/70 backdrop-blur-xl" : "border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-[120rem] items-center justify-between px-6 py-4 sm:px-10 lg:px-[7vw]">
          <a
            href="/"
            onClick={goHome}
            className="font-display text-lg font-medium tracking-tight text-paper transition-colors duration-300 hover:text-ember-soft"
          >
            Imran Baig
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className="text-xs font-medium uppercase tracking-[0.18em] text-paper/55 transition-colors duration-300 hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://website.imranbaig.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-pill bg-paper px-5 py-2.5 text-xs font-semibold text-ink transition-transform duration-500 ease-[var(--ease-settle)] hover:scale-[1.04] sm:inline-block"
            >
              Join the Masterclass
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center text-paper md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M3 7.5h18M3 16.5h18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex w-full max-w-full flex-col overflow-x-hidden overflow-y-auto overscroll-contain bg-ink/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE.out }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-display text-lg font-medium text-paper">Imran Baig</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="-mr-2 flex h-9 w-9 items-center justify-center text-paper"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Links — single-column editorial list, aligned to the bar gutter.
                Each row carries an index + hairline for an Apple-grade rhythm. */}
            <nav className="flex flex-1 flex-col justify-center px-6 py-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => goTo(e, l.href)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: EASE.settle }}
                  className="group flex w-full items-baseline gap-4 border-t border-white/10 py-5 last:border-b"
                >
                  <span className="font-display text-xs leading-none text-ember/70 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-[clamp(1.9rem,9vw,2.75rem)] font-medium leading-tight text-paper/90 transition-colors duration-300 group-hover:text-paper">
                    {l.label}
                  </span>
                  <svg
                    className="h-4 w-4 shrink-0 -translate-x-1 self-center text-paper/30 transition-transform duration-300 group-hover:translate-x-0 group-hover:text-ember-soft"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              ))}
            </nav>

            <div className="px-6 pb-12 pt-2">
              <a
                href="https://website.imranbaig.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block w-full rounded-pill bg-paper px-8 py-4 text-center text-sm font-semibold text-ink"
              >
                Join the Masterclass
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
