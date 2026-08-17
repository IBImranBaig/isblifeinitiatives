"use client";

import { useEffect, useRef } from "react";
import { MOSAIC_DIMS } from "./mosaicDims";

type Tile = { src: string; w: number; h: number };

/**
 * Horizontal "wall" backdrop for a program row with FEW, mixed-aspect images
 * (e.g. Program 1 — handwriting samples, live sessions, stage shots).
 *
 * Unlike the dense vertical {@link ProgramBackdrop}, this keeps each image at its
 * natural aspect ratio and drifts them sideways across a couple of rows (each set
 * shown once per pass, then duplicated only for the seamless wrap). Larger images
 * read better when there aren't many of them. The wall now runs at FULL opacity
 * as the hero of the card — no blue wash — with only a faint neutral edge
 * vignette for framing; legibility is handled by the frosted panel on top.
 *
 * `rows` controls density: many rows = a dense crowd (programs with lots of
 * photos); few rows = larger images (programs with only a handful, e.g. p1).
 */
const DEFAULT_ROWS = 5;

/** Fallback loop duration (seconds) used until widths are measured client-side. */
const ROW_DURATION = 28;

/** Pixels travelled per second — shared by EVERY row/direction so a row's speed
 *  no longer depends on how wide its images happen to be. Duration is derived
 *  from each row's measured width: duration = oneCopyWidth / PX_PER_SEC. */
const PX_PER_SEC = 45;

/**
 * Repeat a row's images until it has at least `min` entries — a row must span
 * wider than the card or its horizontal loop shows a gap. Denser rows (more
 * rows) use smaller, narrower images, so they need more per row to span.
 */
function fillRow(row: Tile[], min: number): Tile[] {
  if (row.length === 0) return row;
  const out: Tile[] = [];
  while (out.length < min) out.push(...row);
  return out;
}

export function ProgramBackdropRows({
  dir,
  count,
  rows: rowCount = DEFAULT_ROWS,
  index = 0,
  eager = false,
}: {
  dir: string;
  count: number;
  rows?: number;
  /** Tile position — used to desync this tile's scroll from its neighbours
   *  (different speed, start offset and direction) so the grid doesn't read as
   *  one continuous left-to-right scroll. */
  index?: number;
  /** Load tiles eagerly. The right-scrolling rows start showing the duplicated
   *  copy, whose tiles are laid out off-screen — native lazy-loading skips them,
   *  leaving those rows blank. Pass `eager` for walls that must fill reliably
   *  (e.g. the focused /tpapaid walls). Homepage stays lazy. */
  eager?: boolean;
}) {
  const dims = MOSAIC_DIMS[dir] ?? [];
  const images: Tile[] = Array.from({ length: count }, (_, i) => {
    const [w, h] = dims[i] ?? [480, 640];
    return { src: `/mosaics/${dir}/m-${i + 1}.jpg`, w, h };
  });
  const rows = Array.from({ length: rowCount }, () => [] as Tile[]);
  images.forEach((t, i) => rows[i % rowCount].push(t));

  // Each row's single (pre-duplicate) copy must be wider than the widest the card
  // can ever get (~1600px at the max content width) or the -50% loop reveals a gap.
  // Denser rows = smaller images, so they need many per row. Scales with row count.
  const minPerRow = Math.max(8, rowCount * 6);

  // Normalise speed: set each row's duration from its real width so all rows
  // (left- AND right-moving) drift at the same px/sec. Re-runs as images load.
  const trackRefs = useRef<Array<HTMLDivElement | null>>([]);
  useEffect(() => {
    const tracks = trackRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!tracks.length) return;
    const apply = () => {
      for (const t of tracks) {
        const oneCopy = t.scrollWidth / 2; // track holds two identical copies
        if (oneCopy > 0) t.style.animationDuration = `${(oneCopy / PX_PER_SEC).toFixed(2)}s`;
      }
    };
    apply();
    const ro = new ResizeObserver(apply);
    tracks.forEach((t) => ro.observe(t));
    return () => ro.disconnect();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 flex flex-col gap-1 opacity-100">
        {rows.map((row, ri) => (
          <div key={ri} className="relative flex-1 overflow-hidden">
            <div
              ref={(el) => { trackRefs.current[ri] = el; }}
              className={`absolute inset-y-0 flex w-max ${(ri + index) % 2 === 0 ? "mosaic-row-left" : "mosaic-row-right"}`}
              style={{
                // Uniform speed on every row; only the direction alternates and the
                // start is offset so neighbouring rows don't look phase-locked.
                animationDuration: `${ROW_DURATION}s`,
                animationDelay: `-${index * 5 + ri * 2}s`,
              }}
            >
              {(() => { const set = fillRow(row, minPerRow); return [...set, ...set]; })().map((t, i) => (
                <img
                  key={i}
                  src={t.src}
                  width={t.w}
                  height={t.h}
                  alt=""
                  loading={eager ? "eager" : "lazy"}
                  decoding="async"
                  className="mr-1 h-full w-auto shrink-0 rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Faint neutral edge vignette — frames the wall against the rounded card
          without tinting it; the imagery stays bright and full-opacity. */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 120% at 50% 45%, transparent 55%, rgba(5,8,18,0.55) 100%)" }}
      />
    </div>
  );
}
