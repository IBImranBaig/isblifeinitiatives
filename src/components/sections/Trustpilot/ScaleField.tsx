import { cn } from "@/lib/utils/cn";

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const COUNT = 150;

// Phyllotaxis scatter — an organic, even "cloud of many" (deterministic, so
// no hydration mismatch). Each point reads as one of the multitude.
const DOTS = Array.from({ length: COUNT }, (_, i) => {
  const r = Math.sqrt((i + 0.5) / COUNT);
  const a = i * GOLDEN;
  return {
    x: 500 + Math.cos(a) * r * 480,
    y: 300 + Math.sin(a) * r * 260,
    rad: 0.8 + (1 - r) * 1.4,
  };
});

/**
 * The "thousands" made visible — a faint point-field framing the figure.
 *
 * ── ENHANCEMENT SLOT ───────────────────────────────────────────────────────
 * Currently a static SVG scatter. Future motion: drift/parallax the field, or
 * mount a 3D point-cloud "swarm of minds" via <LazyScene> with this as the
 * instant poster. Centre is masked so the number stays legible.
 */
export function ScaleField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={{
        maskImage: "radial-gradient(62% 62% at 50% 50%, transparent 0%, transparent 32%, #000 78%)",
        WebkitMaskImage:
          "radial-gradient(62% 62% at 50% 50%, transparent 0%, transparent 32%, #000 78%)",
      }}
    >
      <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.rad} fill="var(--color-glow)" opacity={0.32} />
        ))}
      </svg>
    </div>
  );
}
