import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";

export interface LegalSubsection {
  heading: string;
  body: ReactNode;
}

export interface LegalSection {
  heading: string;
  /** Optional lead copy shown before any subsections. */
  body?: ReactNode;
  /** Nested sub-clauses (e.g. "Your Account" → Account Security, …). */
  subsections?: LegalSubsection[];
}

// Shared prose styling for body blocks (paragraphs, links, bullet lists).
const bodyClass =
  "space-y-3 leading-relaxed text-paper/65 [&_a]:text-ember-soft [&_a:hover]:text-paper [&_li]:ml-5 [&_li]:list-disc";

/**
 * Shared layout for legal / policy pages (Privacy, Terms). Editorial dark theme
 * consistent with the rest of the site: brand eyebrow + serif title, then a
 * single readable column of numbered sections, each able to carry sub-clauses.
 */
export function LegalDocument({
  eyebrow,
  title,
  updated,
  intro,
  sections,
  numbered = false,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
  /** Show "01, 02, …" indices beside each top-level section. */
  numbered?: boolean;
}) {
  return (
    <main className="text-paper">
      <section className="relative w-full overflow-hidden pb-10 pt-32 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] max-w-[130vw] -translate-x-1/2"
          style={{ background: "radial-gradient(50% 50% at 50% 30%, rgba(91,134,232,0.14) 0%, transparent 70%)" }}
        />
        <Container className="relative">
          <Reveal>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-paper/55 transition-colors duration-300 hover:text-paper"
            >
              <span className="transition-transform duration-500 ease-[var(--ease-settle)] group-hover:-translate-x-0.5">
                ←
              </span>
              Back to home
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow rule>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading as="h1" size="lg" className="mt-5 text-paper">
              {title}
            </Heading>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-sm text-paper/45">Last updated: {updated}</p>
          </Reveal>
          {intro && (
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl leading-relaxed text-paper/70">{intro}</p>
            </Reveal>
          )}
        </Container>
      </section>

      <Container className="pb-28 lg:pb-36">
        <div className="max-w-3xl space-y-12 lg:space-y-14">
          {sections.map((s, i) => (
            <Reveal key={s.heading}>
              <section className="border-t border-white/10 pt-8">
                <div className="flex items-baseline gap-4">
                  {numbered && (
                    <span className="font-display text-sm tabular-nums text-ember">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <Heading as="h2" size="sm" className="text-paper">
                    {s.heading}
                  </Heading>
                </div>

                {s.body && <div className={`mt-4 ${bodyClass}`}>{s.body}</div>}

                {s.subsections && (
                  <div className="mt-6 space-y-6">
                    {s.subsections.map((sub) => (
                      <div key={sub.heading}>
                        <h3 className="text-[0.78rem] font-medium uppercase tracking-[0.2em] text-ember-soft/90">
                          {sub.heading}
                        </h3>
                        <div className={`mt-2.5 ${bodyClass}`}>{sub.body}</div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
    </main>
  );
}
