import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";
import { DragMarquee } from "@/components/motion/DragMarquee";

interface Expert {
  name: string;
  role: string;
  /** Portrait file at /public/experts/<slug>.png (monogram shows until added). */
  slug: string;
  initials: string;
  /** Optional explicit image path (overrides the /experts/<slug>.png default). */
  img?: string;
}

const COUNCIL: Expert[] = [
  { name: "Surendran Jayasekar", role: "Founder, Success Gyan", slug: "surendran-jayasekar", initials: "SJ", img: "/experts/surendran-jayasekar.jpg" },
  { name: "Dr. John Demartini", role: "Human Behaviour Specialist", slug: "john-demartini", initials: "JD" },
  { name: "Jack Canfield", role: "Author of Chicken Soup for the Soul series", slug: "jack-canfield", initials: "JC" },
  { name: "Marisa Peer", role: "Author & Therapist", slug: "marisa-peer", initials: "MP" },
  { name: "Russell Brunson", role: "Founder of ClickFunnels", slug: "russell-brunson", initials: "RB" },
  { name: "Mitesh Khatri", role: "Law of Attraction Coach", slug: "mitesh-khatri", initials: "MK" },
  { name: "Indu Agarwal", role: "Law of Attraction Coach", slug: "indu-agarwal", initials: "IA" },
  { name: "Vikrant Massey", role: "Film Actor", slug: "vikrant-massey", initials: "VM" },
  { name: "Ashish Vidyarthi", role: "World Renowned Actor", slug: "ashish-vidyarthi", initials: "AV" },
  { name: "Kiccha Sudeep", role: "Film Actor", slug: "kiccha-sudeep", initials: "KS" },
  { name: "Raj Shamani", role: "Entrepreneur & Podcaster", slug: "raj-shamani", initials: "RS" },
  { name: "Siddharth Rajsekar", role: "Digital & AI Coach", slug: "siddharth-rajshekar", initials: "SR" },
];

/**
 * Portrait card — a person shown at portrait ratio. The photo is layered as a
 * CSS background over a monogram base, so a missing file degrades gracefully to
 * the initials (no broken-image icon). Drop /public/experts/<slug>.png to fill.
 */
function ExpertCard({ e }: { e: Expert }) {
  return (
    <div className="group/card grain relative aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-card border border-white/10 sm:w-60">
      {/* Base wash + monogram fallback */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(155deg, #0c1730 0%, #080e1c 55%, #05080f 100%)" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display text-6xl font-medium text-white/[0.06]"
      >
        {e.initials}
      </span>
      {/* Portrait photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-top transition-transform duration-700 ease-[var(--ease-settle)] group-hover/card:scale-[1.05]"
        style={{ backgroundImage: `url(${e.img ?? `/experts/${e.slug}.jpg`})` }}
      />
      {/* Legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
      />
      {/* Caption — frosted glass box (matches the Programs detail panel) */}
      <div className="absolute inset-x-3 bottom-3">
        <div className="relative overflow-hidden rounded-[1rem] border border-white/15 bg-ink/40 px-4 py-3 ring-1 ring-inset ring-white/5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          {/* Top sheen — a thin lit edge sells the glass */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
          <div className="font-display text-lg leading-tight text-paper">{e.name}</div>
          <div className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-paper/55">{e.role}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * EXPERT RECOGNITION (Server Component)
 *
 * An editorial intro, then a horizontally-looping wall of portrait cards for the
 * leaders who vouch for Imran. The marquee reuses the shared `.press-marquee`
 * loop (paused on hover, reduced-motion safe).
 */
export function Recognition() {
  return (
    <SectionShell id="recognition" label="Expert Recognition">
      {/* Spotlight + featured endorsement */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[820px] max-w-[120vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(91,134,232,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow rule className="justify-center">
              Expert Recognition
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" size="lg" className="mt-5 text-paper">
              Recognised by those who <span className="italic text-ember-soft">shape minds.</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-paper/65">
              A global circle of leaders, authors and changemakers who know Imran&rsquo;s
              work first-hand.
            </p>
          </Reveal>
        </div>
      </div>

      {/* The council — portrait marquee */}
      <div className="mt-16 lg:mt-20">
        <Reveal>
          <Eyebrow className="justify-center">Trusted by global leaders</Eyebrow>
        </Reveal>

        {/* No scroll-reveal here: an opacity/transform animation on this ancestor
            makes the cards' glass backdrop-blur snap in and pop. Always visible. */}
        <DragMarquee className="press-marquee-mask mt-10 lg:mt-12">
          {COUNCIL.map((e, i) => (
            <div key={`${e.slug}-${i}`} className="shrink-0 pr-6">
              <ExpertCard e={e} />
            </div>
          ))}
        </DragMarquee>
      </div>
    </SectionShell>
  );
}
