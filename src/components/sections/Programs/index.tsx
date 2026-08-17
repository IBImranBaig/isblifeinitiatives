import Link from "next/link";
import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { PROGRAMS } from "./programsData";
import { ProgramBackdrop } from "./ProgramBackdrop";
import { ProgramBackdropRows } from "./ProgramBackdropRows";
import { ProgramHighlights } from "./ProgramHighlights";

/**
 * THE PROGRAMS — four cinematic tiles (Server Component).
 *
 * Each program is a full-bleed wall of real students/certificates running at
 * full opacity. The details live INSIDE the imagery on a frosted-glass panel
 * whose content reveals with staggered, premium motion as the tile scrolls in —
 * no product cover, no flat overlay. A single CTA leads to the pricing page.
 */
export function Programs() {
  return (
    <SectionShell id="programs" label="The Programs">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow rule>The Programs</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" size="lg" className="mt-5 text-paper">
            Your pathway to <span className="italic text-ember-soft">mastery.</span>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mt-6 max-w-xl">
            Four programs, one continuous journey — from your first step in
            self-transformation to the pinnacle of professional practice.
          </Text>
        </Reveal>
      </div>

      {/* Single column: each program stacked one below another. */}
      <div className="mt-14 grid gap-8 lg:mt-16">
        {PROGRAMS.map((p, i) => (
          <div key={p.slug}>
            {/* No scroll-fade here: an opacity/transform animation on this ancestor
                makes the glass panel's backdrop-blur snap in late. Cards are static. */}
            <div className="flex h-full flex-col gap-4">
            <div className="relative isolate flex min-h-[15rem] items-start overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface/40 p-4 sm:min-h-[25rem] sm:items-end sm:p-5">
              {/* Full-bleed "wall of students" backdrop */}
              {p.mosaicDir && p.mosaicCount && (
                p.mosaicLayout === "rows" ? (
                  <ProgramBackdropRows dir={p.mosaicDir} count={p.mosaicCount} rows={p.mosaicRows} index={i} />
                ) : (
                  <ProgramBackdrop dir={p.mosaicDir} count={p.mosaicCount} />
                )
              )}

              {/* Frosted-glass detail panel pinned to the bottom of the tile.
                  Static (no reveal) so the title + tagline always show. */}
              <div className="relative z-10 flex w-full max-w-[14rem] flex-col justify-center overflow-hidden rounded-[1.4rem] border border-white/15 bg-ink/40 p-4 ring-1 ring-inset ring-white/5 backdrop-blur-2xl shadow-[0_30px_70px_-25px_rgba(0,0,0,0.95)] sm:max-w-[19rem] sm:p-6">
                {/* Top sheen — a thin lit edge sells the glass */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />

                {p.box && (
                  <img
                    src={p.box}
                    alt=""
                    aria-hidden
                    className="mb-3 h-20 w-auto self-start rounded-lg object-contain sm:mb-4 sm:h-28"
                  />
                )}

                <h3 className="font-display text-lg font-medium tracking-[-0.02em] text-paper sm:text-2xl lg:text-[1.9rem]">
                  {p.title}
                </h3>

                <p className="mt-2 text-[0.8rem] leading-relaxed text-paper/75 sm:mt-2.5 sm:text-[0.95rem]">
                  {p.tagline}
                </p>
              </div>
            </div>

            {/* Visual "What's Inside" spec-sheet — understand the program at a glance */}
            <ProgramHighlights features={p.features} />
            </div>
          </div>
        ))}
      </div>

      {/* Single CTA → unified pricing page */}
      <Reveal>
        <div className="mt-14 flex flex-col items-center text-center lg:mt-16">
          <Link
            href="/pricing"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-paper px-9 py-4 text-sm font-semibold text-ink transition-transform duration-700 ease-[var(--ease-settle)] hover:scale-[1.03]"
          >
            Begin your first step here.
            <span className="transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-x-1">
              →
            </span>
          </Link>
          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.3em] text-paper/35">
            One step. Four programs. A lifetime of mastery.
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
