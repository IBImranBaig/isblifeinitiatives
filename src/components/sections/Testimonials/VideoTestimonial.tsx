import { Stars } from "./Stars";

/**
 * Wide cinematic video testimonial.
 *
 * ── ENHANCEMENT SLOT ───────────────────────────────────────────────────────
 * The poster is the swappable visual: drop a real <video>, a hover
 * <ImageSequence> preview, or a 3D scene via <LazyScene> — the play affordance
 * + caption stay as overlays. Currently a chiaroscuro poster placeholder.
 */
export function VideoTestimonial() {
  return (
    <a
      href="#"
      aria-label="Watch Michael Roberts's testimonial"
      className="group grain relative block aspect-[16/10] w-full overflow-hidden rounded-card border border-white/10 sm:aspect-[21/9]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 110% at 72% 22%, rgba(91,134,232,0.16) 0%, transparent 55%), linear-gradient(150deg, #0c1730 0%, #080e1c 60%, #05080f 100%)",
        }}
      />

      {/* Play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-white/5 text-paper backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-ember/60 group-hover:bg-ember group-hover:text-ink">
          <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-current" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 sm:p-9">
        <div>
          <Stars />
          <div className="mt-3 font-display text-xl text-paper">Michael Roberts</div>
          <div className="text-sm text-paper/50">Attorney at Law · Roberts &amp; Associates</div>
        </div>
        <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.25em] text-ember-soft/80 sm:block">
          Watch his story
        </span>
      </div>
    </a>
  );
}
