import Image from "next/image";

/**
 * Chiaroscuro portrait frame — the section's cinematic visual.
 *
 * Renders Imran's editorial portrait inside a 4:5 frame, blended into the
 * brand's dark-luxury palette with a key-light wash and a bottom vignette so
 * the caption (and the YearsBadge overlaid by the parent) stays legible.
 *
 * The photo lives at `public/imran-baig.jpg`. To swap it, replace that file
 * (keep the name) — no layout change required.
 */
export function PortraitFrame() {
  return (
    <div className="grain relative aspect-[4/5] w-full overflow-hidden rounded-card border border-white/10">
      {/* Chiaroscuro base — shows around/behind the portrait while it loads */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 90% at 22% 18%, rgba(91,134,232,0.20) 0%, rgba(42,78,160,0.10) 32%, transparent 58%), linear-gradient(155deg, #0c1730 0%, #080e1c 55%, #05080f 100%)",
        }}
      />

      {/* Portrait */}
      <Image
        src="/imran-baig.jpg"
        alt="Imran Baig — Master Penman & Behavioural Profiler"
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-cover object-top"
        priority
      />

      {/* Warm key-light wash to marry the photo to the palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ background: "radial-gradient(120% 90% at 22% 12%, rgba(91,134,232,0.28) 0%, transparent 55%)" }}
      />

      {/* Vignette for depth + caption legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(5,8,15,0.55) 0%, transparent 30%, transparent 55%, rgba(5,8,15,0.92) 100%)" }}
      />

      {/* Caption (top — leaves the bottom corner for the years badge) */}
      <div className="absolute inset-x-0 top-0 p-7">
        <span className="block text-[0.65rem] font-medium uppercase tracking-[0.32em] text-ember-soft/70">
          Master Penman &amp; Behavioural Profiler
        </span>
        <span className="mt-2 block font-display text-2xl font-medium text-paper">Imran Baig</span>
      </div>
    </div>
  );
}
