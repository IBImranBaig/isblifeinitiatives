"use client";

/**
 * Animated "wall of students" backdrop for a program row. Columns of real
 * student/certificate thumbnails drift vertically (alternating directions) on a
 * seamless loop, behind a scrim that keeps the foreground text readable.
 * Thumbnails: /public/mosaics/<dir>/m-1.jpg … m-<count>.jpg.
 *
 * Each thumbnail fades in once it has decoded, so the wall settles in smoothly
 * instead of flashing/popping as the lazy images arrive.
 */
const COLS = 10;
// Each column must be tall enough that one image "set" exceeds the row height,
// or the vertical loop shows a gap. Programs with few images (e.g. Program 1)
// repeat their thumbnails up to this count so the wall still fills and wraps.
const MIN_PER_COL = 6;

/** Reveal cached images immediately (their onLoad may never fire). */
function revealIfCached(el: HTMLImageElement | null) {
  if (el && el.complete && el.naturalWidth > 0) el.dataset.loaded = "true";
}

/** Repeat a column's images until it has at least MIN_PER_COL entries. */
function fillColumn(col: string[]): string[] {
  if (col.length === 0) return col;
  const out: string[] = [];
  while (out.length < MIN_PER_COL) out.push(...col);
  return out;
}

export function ProgramBackdrop({ dir, count }: { dir: string; count: number }) {
  const images = Array.from({ length: count }, (_, i) => `/mosaics/${dir}/m-${i + 1}.jpg`);
  const columns = Array.from({ length: COLS }, () => [] as string[]);
  images.forEach((src, i) => columns[i % COLS].push(src));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Drifting mosaic. Each column is `self-start` so its box height equals
          its content (two image sets) rather than being stretched to the row —
          that keeps the `translateY(-50%)` loop landing exactly on one set, for
          a seamless wrap instead of a visible cut. */}
      <div className="absolute inset-0 flex gap-1.5 opacity-[0.5]">
        {columns.map((col, ci) => (
          <div
            key={ci}
            className={`flex flex-1 flex-col self-start ${ci % 2 === 0 ? "mosaic-col-up" : "mosaic-col-down"}`}
            style={{ animationDuration: `${34 + ci * 4}s` }}
          >
            {(() => { const set = fillColumn(col); return [...set, ...set]; })().map((src, i) => (
              <div key={i} className="mb-1.5 shrink-0 overflow-hidden rounded-md">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  ref={revealIfCached}
                  onLoad={(e) => {
                    e.currentTarget.dataset.loaded = "true";
                  }}
                  className="aspect-[3/4] w-full object-cover object-[50%_30%] opacity-0 transition-opacity duration-700 ease-out data-[loaded=true]:opacity-100"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Scrim — keeps the copy readable while the faces stay visible */}
      <div className="absolute inset-0 bg-ink/55" />
      {/* Blue wash — ties the student wall into the brand palette */}
      <div className="absolute inset-0 bg-ember-deep/35 mix-blend-multiply" />
      <div className="absolute inset-0 bg-ember/10" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(115% 115% at 50% 50%, rgba(10,16,32,0.25) 25%, rgba(8,14,40,0.82) 100%)" }}
      />
    </div>
  );
}
