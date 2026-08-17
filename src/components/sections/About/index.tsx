import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { PortraitFrame } from "./PortraitFrame";
import { YearsBadge } from "./YearsBadge";

const PRESS = [
  { name: "Times of India", src: "/press/times-of-india.png", h: "h-7 sm:h-8" },
  { name: "Mid-Day", src: "/press/mid-day.png", h: "h-6 sm:h-7" },
  { name: "Bangalore Mirror", src: "/press/bangalore-mirror.png", h: "h-5 sm:h-6" },
  { name: "The Hindu", src: "/press/the-hindu.png", h: "h-7 sm:h-8" },
  { name: "DNA", src: "/press/dna.png", h: "h-7 sm:h-8" },
  { name: "The New Indian Express", src: "/press/the-new-indian-express.png", h: "h-4 sm:h-5" },
];

/**
 * ABOUT IMRAN BAIG (Server Component)
 *
 * Method → mentor. A cinematic editorial spread — chiaroscuro portrait, one
 * narrative, one pull quote, an authority stat, and a press masthead — built
 * to feel like a documentary profile, never a coach bio or résumé.
 * Copy is server-rendered; motion is layered via client islands.
 */
export function About() {
  // Trimmed bottom padding so the "As featured in" logos sit close to the
  // Media clippings that follow (Media drops its top padding to match).
  return (
    <SectionShell id="about" label="About Imran Baig" className="pb-8 lg:pb-10">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Portrait — static (no scroll-reveal) so the image doesn't blank-then-pop. */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <PortraitFrame />
            <YearsBadge className="absolute -bottom-6 right-4 lg:-right-8" />
          </div>
        </div>

        {/* Narrative */}
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow rule>The Mind Decoder</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" size="lg" className="mt-5 text-paper">
              Meet your partner in <span className="italic text-ember-soft">transformation.</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text variant="lead" className="mt-7 max-w-xl">
              A single line of handwriting exposes the architecture of the subconscious
              mind. For over twenty-two years, Imran Baig has looked beyond ink on paper
              to read the silent language of human emotion, behaviour and health. Through
              the precise science of Graphotherapy, his work proves that altering the way
              we write can fundamentally restructure how we think and heal.
            </Text>
          </Reveal>
          <Reveal delay={0.12}>
            <Text variant="lead" className="mt-5 max-w-xl">
              This is not merely the study of a skill; it is a profound catalyst for
              personal evolution. By uncovering the hidden patterns within their own
              writing, hundreds of thousands of people worldwide have mended strained
              relationships, unlocked buried potential, and reconciled with parts of
              themselves they could never quite name. Visitors arrive to decode
              handwriting. They leave having decoded themselves.
            </Text>
          </Reveal>

          <Reveal delay={0.15}>
            <blockquote className="relative mt-12 max-w-xl">
              <span
                aria-hidden
                className="absolute -left-1 -top-9 font-display text-7xl leading-none text-ember/30"
              >
                &ldquo;
              </span>
              <p className="font-display text-2xl font-medium italic leading-snug text-paper sm:text-[1.7rem]">
                The most divine education a person can have is the education of self.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>

      {/* Press masthead */}
      <div className="mt-12 border-t border-white/10 pt-8 lg:mt-16">
        <Reveal>
          <Eyebrow>As featured in</Eyebrow>
        </Reveal>
        {/* Seamless horizontal marquee. The logo set is repeated several times so
            one half of the track always exceeds the viewport width — the `-50%`
            loop then never reveals a gap, even on wide screens. Pauses on hover.
            Monochrome (white) keeps the mixed-colour mastheads on-brand. */}
        <Reveal>
          <div className="relative mt-7 overflow-hidden press-marquee-mask">
            <div className="press-marquee flex w-max items-center">
              {[...PRESS, ...PRESS, ...PRESS, ...PRESS].map((p, i) => {
                const dup = i >= PRESS.length;
                return (
                  <div key={`${p.name}-${i}`} className="shrink-0 pr-14" aria-hidden={dup}>
                    <img
                      src={p.src}
                      alt={dup ? "" : p.name}
                      loading="lazy"
                      className={`${p.h} w-auto object-contain opacity-50 brightness-0 invert transition-opacity duration-500 hover:opacity-90`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
