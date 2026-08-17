import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { RevealItem } from "@/components/motion/RevealItem";

/**
 * A dense photo collage of real students/certificates — every thumbnail stays
 * clearly visible (only a light corner caption sits on top). Thumbnails live at
 * /public/mosaics/<dir>/m-1.jpg … m-<count>.jpg.
 */
export function ProgramMosaic({
  dir,
  count,
  caption,
}: {
  dir: string;
  count: number;
  caption?: string;
}) {
  const images = Array.from({ length: count }, (_, i) => `/mosaics/${dir}/m-${i + 1}.jpg`);

  return (
    <div className="relative overflow-hidden rounded-card border border-white/10">
      <StaggerGroup className="grid grid-cols-6 gap-1 sm:grid-cols-9 lg:grid-cols-12">
        {images.map((src, i) => (
          <RevealItem key={i}>
            <img
              src={src}
              alt=""
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-500 ease-[var(--ease-settle)] hover:z-10 hover:scale-110"
            />
          </RevealItem>
        ))}
      </StaggerGroup>

      {caption && (
        <div className="pointer-events-none absolute left-4 top-4">
          <span className="inline-flex items-center gap-2 rounded-pill bg-ink/80 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-glow" />
            {caption}
          </span>
        </div>
      )}
    </div>
  );
}
