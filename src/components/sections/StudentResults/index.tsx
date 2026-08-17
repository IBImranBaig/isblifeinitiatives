"use client";

import { useEffect, useRef, useState } from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { DragMarquee } from "@/components/motion/DragMarquee";

/** Student testimonial Shorts (vertical reels). */
const REELS = ["iUJ5KxHd7Kc", "XkUNNniLUvA", "mRv9GqU3JkU", "4IEGfwPfE-g"];

// Repeat the set so the marquee loop is seamless even on wide screens.
const TRACK = [0, 1, 2].flatMap((rep) => REELS.map((id) => ({ id, key: `${rep}-${id}` })));

/**
 * STUDENT RESULTS — a draggable, auto-scrolling carousel of vertical testimonial
 * Shorts. Drag to scrub (the loop pauses, then resumes on release); tap a reel
 * to play it inline in a vertical lightbox. Sits right above the Trustpilot
 * review wall.
 */
export function StudentResults() {
  const [active, setActive] = useState<string | null>(null);
  // Distinguish a tap (play) from a drag (scrub) — ignore clicks that moved.
  const down = useRef({ x: 0, y: 0 });

  const onCardDown = (e: React.PointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY };
  };
  const onCardClick = (id: string, e: React.MouseEvent) => {
    if (Math.hypot(e.clientX - down.current.x, e.clientY - down.current.y) > 8) return;
    setActive(id);
  };

  return (
    <SectionShell id="results" label="Student results">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow rule className="justify-center">
            Student Results
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" size="lg" className="mt-5 text-paper">
            Real people. <span className="italic text-ember-soft">Real transformations.</span>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mx-auto mt-6 max-w-xl">
            Short, unfiltered stories from students who changed their handwriting — and
            their lives. Drag to browse, tap any reel to watch.
          </Text>
        </Reveal>
      </div>

      <DragMarquee className="press-marquee-mask mt-12 lg:mt-16" speed={32} trackClassName="items-stretch">
        {TRACK.map(({ id, key }) => (
          <div key={key} className="shrink-0 pr-5">
            <button
              type="button"
              onPointerDown={onCardDown}
              onClick={(e) => onCardClick(id, e)}
              aria-label="Play student testimonial"
              className="group relative block aspect-[9/16] w-44 overflow-hidden rounded-card border border-white/10 sm:w-52"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.fb) {
                    t.dataset.fb = "1";
                    t.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
                  }
                }}
                alt=""
                draggable={false}
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full scale-[1.35] object-cover transition-transform duration-700 ease-[var(--ease-settle)] group-hover:scale-[1.42]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/30"
              />
              {/* Play */}
              <span className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full border border-white/25 bg-white/10 text-paper backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-ember/60 group-hover:bg-ember group-hover:text-ink">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute inset-x-0 bottom-0 p-4 text-left text-[0.62rem] font-medium uppercase tracking-[0.22em] text-paper/70">
                Watch story
              </span>
            </button>
          </div>
        ))}
      </DragMarquee>

      {active && <ReelLightbox id={active} onClose={() => setActive(null)} />}
    </SectionShell>
  );
}

function ReelLightbox({ id, onClose }: { id: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Student testimonial"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} aria-hidden />
      <div className="relative z-10 aspect-[9/16] h-[85vh] max-h-[85vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-paper transition-colors hover:bg-white hover:text-ink"
        >
          ✕
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title="Student testimonial"
          className="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
