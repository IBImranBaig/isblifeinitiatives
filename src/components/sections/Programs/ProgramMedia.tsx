/**
 * Swappable media frame for a program — an intentional placeholder.
 * Replace the inner gradient with real imagery later without touching layout.
 */
export function ProgramMedia({ n }: { n: string }) {
  return (
    <div className="grain relative h-full w-full overflow-hidden rounded-card border border-white/10">
      {/* Cinematic base wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 28% 18%, rgba(91,134,232,0.18) 0%, rgba(42,78,160,0.07) 38%, transparent 64%), linear-gradient(155deg, #0c1730 0%, #080e1c 55%, #05080f 100%)",
        }}
      />
      {/* Oversized index watermark */}
      <span
        aria-hidden
        className="absolute -right-3 -top-10 select-none font-display text-[11rem] font-medium leading-none text-white/[0.04] sm:text-[14rem]"
      >
        {n}
      </span>
      {/* Placeholder affordance */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-paper/25">
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="M21 16l-5-5L5 20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[0.62rem] uppercase tracking-[0.32em]">Image</span>
      </div>
      {/* Edge vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(80% 80% at 50% 50%, transparent 60%, rgba(5,8,15,0.55) 100%)" }}
      />
    </div>
  );
}
