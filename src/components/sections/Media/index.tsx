import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { DragMarquee } from "@/components/motion/DragMarquee";

interface Clip {
  src: string;
  label: string;
}

const CLIPPINGS: Clip[] = [
  { src: "/media/m-1.jpg", label: "The Hindu" },
  { src: "/media/m-2.jpg", label: "DNA" },
  { src: "/media/m-3.jpg", label: "Indian Express" },
  { src: "/media/m-4.jpg", label: "Mid-Day" },
  { src: "/media/m-5.jpg", label: "The New Indian Express" },
  { src: "/media/m-6.jpg", label: "Bangalore Mirror" },
  { src: "/media/m-7.jpg", label: "Bangalore Mirror" },
  { src: "/media/m-8.jpg", label: "Featured" },
];

/**
 * MEDIA COVERAGE (Server Component)
 *
 * Real press clippings of Imran's work, scrolling in a seamless horizontal
 * marquee — the proof behind the "As featured in" mastheads. Pauses on hover,
 * reduced-motion safe.
 */
export function Media() {
  // No top padding: the press logos at the end of About flow straight into
  // these press clippings as one connected "in the press" beat.
  return (
    <SectionShell id="media" label="Media Coverage" className="pt-0 lg:pt-0">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow rule className="justify-center">
            Media Coverage
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" size="lg" className="mt-5 text-paper">
            In the national <span className="italic text-ember-soft">headlines.</span>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mx-auto mt-6 max-w-xl">
            Imran&rsquo;s work decoding minds through handwriting has been featured across
            India&rsquo;s leading dailies.
          </Text>
        </Reveal>
      </div>

      {/* Drag to scrub; releases back into the auto-scroll loop. */}
      <DragMarquee className="press-marquee-mask mt-12 lg:mt-16" trackClassName="items-start">
        {CLIPPINGS.map((c, i) => (
          <div key={`${c.src}-${i}`} className="shrink-0 pr-5">
            <div className="overflow-hidden rounded-card border border-white/10 bg-white shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]">
              <img
                src={c.src}
                alt={`Imran Baig featured in ${c.label}`}
                loading="lazy"
                draggable={false}
                className="pointer-events-none h-72 w-auto sm:h-80"
              />
            </div>
            <p className="mt-3 text-center text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper/45">
              {c.label}
            </p>
          </div>
        ))}
      </DragMarquee>
    </SectionShell>
  );
}
