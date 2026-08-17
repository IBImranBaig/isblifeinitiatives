/**
 * AMBIENT BACKGROUND — the site-wide premium canvas behind all content.
 *
 * A fixed, non-interactive layer that gives every section depth without
 * competing with the copy. Three slow-drifting "aurora" glows in the luxury-blue
 * palette, a single ghosted cursive flourish (the handwriting signature), and a
 * fine film grain — all extremely subtle so the content stays the star.
 *
 * Sits at -z-10 over the dark base; sections render transparently above it.
 * Pure CSS animation (no JS); frozen automatically under prefers-reduced-motion.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* Aurora depth glows */}
      <div className="ambient-aurora ambient-aurora--a" />
      <div className="ambient-aurora ambient-aurora--b" />
      <div className="ambient-aurora ambient-aurora--c" />

      {/* Ghosted cursive flourish — the handwriting identity */}
      <svg
        className="ambient-script"
        viewBox="0 0 1200 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-40 250 C 110 110 215 110 295 215 C 355 295 300 365 238 335 C 182 308 240 196 360 206 C 486 217 540 305 640 252 C 742 198 760 104 858 146 C 952 186 918 305 1004 302 C 1110 298 1140 168 1260 150"
          stroke="url(#ambient-ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ambient-ink" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5b86e8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#a9c2ff" stopOpacity="1" />
            <stop offset="1" stopColor="#5b86e8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Fine film grain */}
      <div className="ambient-grain" />
    </div>
  );
}
