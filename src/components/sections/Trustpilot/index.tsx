import { SectionShell } from "@/components/ui/SectionShell";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/sections/About/CountUp";
import { Stars } from "@/components/sections/Testimonials/Stars";
import { ScaleField } from "./ScaleField";

const URL = "https://www.trustpilot.com/review/imranbaig.com";

function ShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5" fill="none">
      <path
        d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5l8-3z"
        stroke="var(--color-glow)"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 12l2.2 2.2L15.5 9.5"
        stroke="var(--color-glow)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * TRUSTPILOT — large-scale social proof.
 *
 * Not a widget, green wall, or review grid. One cinematic figure (9,098+,
 * counting up) framed by a faint "cloud of many" point-field, with a refined
 * azure verified mark. Scale + credibility + human transformation in the
 * brand's own dark-luxury language.
 */
export function Trustpilot() {
  return (
    <SectionShell id="trustpilot" label="Trusted at scale — verified reviews">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Backdrop: the multitude + a soft azure glow */}
        <ScaleField className="absolute left-1/2 top-1/2 h-[120%] w-[130%] -translate-x-1/2 -translate-y-1/2" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[700px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(91,134,232,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative">
          <Reveal>
            <a
              href={URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper/70 backdrop-blur-sm transition-colors duration-500 hover:border-glow/50 hover:text-paper"
            >
              <ShieldCheck />
              Verified on Trustpilot
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-12 text-[0.7rem] font-medium uppercase tracking-[0.42em] text-paper/45">
              Trusted by
            </p>
            <div className="mt-3 flex items-start justify-center font-display font-medium leading-none tracking-[-0.02em]">
              <span className="bg-gradient-to-b from-paper to-ember-soft bg-clip-text pb-[0.12em] text-transparent text-[clamp(4.5rem,18vw,12rem)]">
                <CountUp to={1500} grouped />
              </span>
              <span className="ml-1 mt-3 bg-gradient-to-b from-paper to-ember-soft bg-clip-text text-transparent text-[clamp(2rem,7vw,4.5rem)]">
                +
              </span>
            </div>
            <p className="mt-5 text-[0.72rem] font-medium uppercase tracking-[0.32em] text-paper/50">
              experts &amp; seekers worldwide
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-11 flex flex-col items-center gap-3">
              <Stars className="scale-110" />
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-paper/55">
                Rated Excellent
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Text variant="lead" className="mx-auto mt-12 max-w-xl text-balance">
              Not a handful of testimonials. Thousands have arrived to decode their
              handwriting — and left having decoded themselves. Every review,
              independently verified.
            </Text>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-paper/80 transition-colors duration-500 hover:text-paper"
            >
              Read the reviews on Trustpilot
              <span className="transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
