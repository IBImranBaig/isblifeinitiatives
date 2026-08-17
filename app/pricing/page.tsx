import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { RevealItem } from "@/components/motion/RevealItem";
import { PROGRAMS } from "@/components/sections/Programs/programsData";
import { TESTIMONIALS } from "@/components/sections/Testimonials/testimonialsData";

export const metadata: Metadata = {
  title: "Pricing — Choose your program",
  description:
    "Four tiers, one continuous journey — from The First Step to Master Practitioner of Graphology.",
};

// Live checkout pages + confirmed prices per tier.
const TIERS = [
  { label: "Tier 1", price: "₹5,000", note: "one-time", payment: "https://courses.imranbaig.co/l/4bd4c97851", featured: false, badge: "" },
  { label: "Tier 2", price: "₹60,000", note: "one-time", payment: "https://courses.imranbaig.co/l/0e476e47d9", featured: true, badge: "Most popular" },
  { label: "Tier 3", price: "₹2,00,000", note: "one-time", payment: "https://courses.imranbaig.co/l/abc0739bfc", featured: false, badge: "" },
  { label: "Tier 4", price: "₹4,72,000", note: "all-inclusive", payment: "https://courses.imranbaig.co/l/8937602cd2", featured: false, badge: "Best value" },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-glow">
      <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <main className="text-paper">
      {/* Header */}
      <section className="relative w-full overflow-hidden pb-12 pt-32 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] max-w-[130vw] -translate-x-1/2"
          style={{ background: "radial-gradient(50% 50% at 50% 30%, rgba(91,134,232,0.14) 0%, transparent 70%)" }}
        />
        <Container className="relative">
          <Reveal>
            <Link
              href="/#programs"
              className="group inline-flex items-center gap-2 text-sm text-paper/55 transition-colors duration-300 hover:text-paper"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
              Back to programs
            </Link>
          </Reveal>
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <Reveal>
              <Eyebrow rule className="justify-center">
                Choose your path
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading as="h1" size="lg" className="mt-5 text-paper">
                One journey, <span className="italic text-ember-soft">four tiers.</span>
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <Text variant="lead" className="mx-auto mt-6 max-w-xl">
                Each tier builds on the one before — start where you are, and grow all the
                way to Master Practitioner.
              </Text>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Tiers */}
      <section className="w-full pb-section lg:pb-section-lg">
        <Container size="wide">
          <StaggerGroup trigger="mount" className="grid gap-6 lg:grid-cols-4 lg:gap-5">
            {PROGRAMS.map((p, i) => {
              const tier = TIERS[i];
              return (
                <RevealItem key={p.slug}>
                  <div
                    className={
                      "flex h-full flex-col rounded-card border p-7 backdrop-blur-sm " +
                      (tier.featured
                        ? "border-ember/50 bg-ember/[0.06] shadow-[0_0_40px_-12px_rgba(91,134,232,0.4)]"
                        : "border-white/10 bg-white/[0.03]")
                    }
                  >
                    {/* Cover — original artwork, framed */}
                    <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-[#e7e9ee]">
                      <img
                        src={`/programs/${p.slug}.jpg`}
                        alt={p.title}
                        loading="lazy"
                        className="aspect-[5/4] w-full object-cover"
                      />
                    </div>

                    {/* Head */}
                    <div className="flex min-h-[1.75rem] items-center justify-between">
                      <span className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-ember-soft/80">
                        {tier.label}
                      </span>
                      {tier.badge && (
                        <span className="rounded-pill bg-ember/20 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-ember-soft">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-4 min-h-[3rem] font-display text-2xl font-medium leading-tight text-paper lg:min-h-[6rem]">
                      {p.title}
                    </h2>
                    <p className="mt-1 min-h-0 text-sm leading-relaxed text-paper/55 lg:min-h-[7.5rem]">{p.tagline}</p>

                    {/* Price */}
                    <div className="mt-4 flex items-end gap-2 border-t border-white/10 pt-5">
                      <span className="font-display text-3xl font-medium text-paper">{tier.price}</span>
                      <span className="pb-1 text-[0.7rem] uppercase tracking-[0.2em] text-paper/40">{tier.note}</span>
                    </div>

                    {/* Includes + features */}
                    <p className="mt-6 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/45">
                      {i === 0 ? "What's included" : `Everything in ${PROGRAMS[i - 1].title}, plus`}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[0.83rem] leading-snug text-paper/75">
                          <Check />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA — pinned to the bottom so all four align */}
                    <div className="mt-auto pt-8">
                      <a
                        href={tier.payment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          "group flex w-full items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-sm font-semibold transition-transform duration-500 ease-[var(--ease-settle)] hover:scale-[1.02] " +
                          (tier.featured ? "bg-paper text-ink" : "border border-white/20 text-paper hover:border-white/40")
                        }
                      >
                        Enrol now
                        <span className="transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </StaggerGroup>

          <Reveal>
            <p className="mt-10 text-center text-[0.7rem] uppercase tracking-[0.28em] text-paper/35">
              Lifetime access &nbsp;·&nbsp; Physical certificate &nbsp;·&nbsp; Facilitator support
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Testimonials carousel */}
      <section className="w-full border-t border-white/10 py-section">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow rule className="justify-center">
                Loved by students
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading as="h2" size="sm" className="mt-5 text-paper">
                Stories from the <span className="italic text-ember-soft">journey.</span>
              </Heading>
            </Reveal>
          </div>
        </Container>

        <div className="group press-marquee-mask relative mt-12 overflow-hidden">
          {/* Much slower than the default 32s so the longer testimonials are easy to read
              as they scroll; hovering the group pauses the track entirely. */}
          <div
            className="press-marquee flex w-max"
            style={{ "--press-marquee-duration": "180s" } as React.CSSProperties}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div key={`${t.name}-${i}`} className="w-[340px] shrink-0 pr-5">
                <div className="flex h-full flex-col rounded-card border border-white/10 bg-white/[0.03] p-7">
                  <span aria-hidden className="font-display text-4xl leading-[0.5] text-ember/25">&ldquo;</span>
                  <p className="mt-4 text-sm leading-relaxed text-paper/75">{t.text}</p>
                  <div className="mt-auto pt-6 font-display text-base text-paper">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
