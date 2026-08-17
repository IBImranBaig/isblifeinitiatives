/**
 * Certificate proof-wall — an ambient mosaic of real certified students that
 * drifts vertically behind the program hero. Columns scroll in alternating
 * directions on a seamless loop; a dark scrim keeps the foreground readable.
 * Pure CSS animation (no video), neutralised under prefers-reduced-motion.
 *
 * Thumbnails live at /public/certificates/cert-1.jpg … cert-<COUNT>.jpg.
 */
const COUNT = 54;
const COLS = 6;
/** Bump when the certificate thumbnails are regenerated to bust the cache. */
const VERSION = 2;

interface CertificateMosaicProps {
  /** Thumbnail set under /public (e.g. "certificates" or "certificates-ip"). */
  dir?: string;
  count?: number;
}

export function CertificateMosaic({ dir = "certificates", count = COUNT }: CertificateMosaicProps = {}) {
  const images = Array.from({ length: count }, (_, i) => `/${dir}/cert-${i + 1}.jpg?v=${VERSION}`);
  const columns = Array.from({ length: COLS }, () => [] as string[]);
  images.forEach((src, i) => columns[i % COLS].push(src));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The drifting mosaic */}
      <div className="absolute inset-0 flex justify-center gap-3 opacity-[0.3] blur-[0.5px]">
        {columns.map((col, ci) => (
          <div
            key={ci}
            className={`flex flex-1 flex-col ${ci % 2 === 0 ? "mosaic-col-up" : "mosaic-col-down"}`}
            style={{ animationDuration: `${42 + ci * 7}s` }}
          >
            {[...col, ...col].map((src, i) => (
              <div key={i} className="mb-3 shrink-0 overflow-hidden rounded-lg border border-white/5">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="block aspect-[3/4] w-full object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Scrim — denser at the centre where the copy sits, lighter at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 60% at 50% 38%, rgba(5,8,15,0.94) 0%, rgba(5,8,15,0.78) 52%, rgba(5,8,15,0.6) 100%)",
        }}
      />
      {/* Bottom fade into the page */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, #05080f)" }}
      />
    </div>
  );
}
