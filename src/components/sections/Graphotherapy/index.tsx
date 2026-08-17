import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { RevealItem } from "@/components/motion/RevealItem";

/**
 * DISCOVER GRAPHO-THERAPY — Section 2 (Server Component)
 *
 * One job: answer "What is Graphotherapy?". A calm, editorial explanation —
 * a short definition, the single striking proof point (128 aspects from one
 * sample), and the three-step journey expressed as cards. The content carries
 * the section; there are no decorative graphics. Emotion lives in the Hero;
 * the six dimensions live in the next section.
 */

const STEPS = [
  {
    n: "01",
    title: "Analyze",
    desc: "We read one handwriting sample — its pressure, slant, spacing and form — to surface the subconscious patterns shaping how you think and act.",
    img: "/method/analyze.png",
  },
  {
    n: "02",
    title: "Understand",
    desc: "Those patterns map to 128 aspects of your personality, health and life — an honest, precise picture of what is quietly holding you back.",
    img: "/method/understand.png",
  },
  {
    n: "03",
    title: "Transform",
    desc: "Targeted handwriting exercises retrain those strokes at the source — rewiring the mind by retraining the hand, one intentional stroke at a time.",
    img: "/method/transform.png",
  },
];

export function Graphotherapy() {
  return (
    <SectionShell id="method" label="Discover Grapho-Therapy">
      {/* Definition — what graphotherapy is */}
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow rule>Discover Grapho-Therapy</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" size="lg" className="mt-5 text-paper">
            The way you write influences{" "}
            <span className="italic text-ember-soft">the way you think.</span>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mt-6 max-w-xl">
            Graphotherapy is the science of reshaping the mind through handwriting.
            Every stroke you make is a signal from your nervous system — and by
            retraining those strokes, you rewire the subconscious patterns beneath them.
          </Text>
        </Reveal>
      </div>

      {/* The proof point — 128 aspects from a single sample */}
      <Reveal delay={0.12}>
        <div className="mt-14 grid items-center gap-6 border-y border-white/10 py-10 lg:mt-20 lg:grid-cols-[auto_1fr] lg:gap-14">
          <span className="bg-gradient-to-b from-paper to-ember bg-clip-text font-display text-display-lg font-medium leading-none text-transparent">
            128
          </span>
          <Text variant="lead" className="max-w-md text-paper-dim">
            aspects of your personality, health and life — revealed from a single
            sample of your handwriting.
          </Text>
        </div>
      </Reveal>

      {/* The three-step transformation journey — the cards are the visual system */}
      <div className="mt-14 lg:mt-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-paper/45">
            The 3-step transformation journey
          </p>
        </Reveal>

        <StaggerGroup className="mt-7 grid gap-4 md:grid-cols-3 lg:gap-6">
          {STEPS.map((s) => (
            <RevealItem key={s.n}>
              <Card className="relative h-full overflow-hidden">
                {/* 3D image, overlaid in the top-right corner of the card */}
                <img
                  src={s.img}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute -right-2 top-2 h-28 w-28 object-contain"
                />

                <div className="relative">
                  <span className="font-display text-base font-medium text-ember">{s.n}</span>
                  <h3 className="mt-3 font-display text-2xl font-medium text-paper">{s.title}</h3>
                  <span className="mt-5 block h-px w-10 bg-gradient-to-r from-ember/60 to-transparent" />
                  <p className="mt-5 text-sm leading-relaxed text-paper/60">{s.desc}</p>
                </div>
              </Card>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </SectionShell>
  );
}
