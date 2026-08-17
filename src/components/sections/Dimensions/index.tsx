import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { DimensionsExperience } from "./DimensionsExperience";

/**
 * ALL SIX DIMENSIONS OF HUMAN EXPERIENCE (Server Component)
 *
 * A luxury editorial chapter. A full-width introduction states the idea — one
 * handwriting sample reveals all six dimensions of a life — then a 2-column
 * experience: an editorial dimension list (left) drives a magazine-style hero
 * (right) where the same handwriting stroke evolves into each dimension's
 * visual story. Copy is server-rendered; the interaction is a client island.
 */
export function Dimensions() {
  return (
    <SectionShell id="dimensions" label="All Six Dimensions of Human Experience">
      {/* Full-width introduction */}
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow rule>Six Dimensions</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" size="lg" className="mt-5 text-paper">
            All six dimensions of{" "}
            <span className="italic text-ember-soft">human experience.</span>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mt-6 max-w-2xl">
            Handwriting doesn&apos;t touch one corner of your life — it reaches every part
            of it. Explore what a single sample reveals across the six dimensions that
            shape who you are.
          </Text>
        </Reveal>
      </div>

      <DimensionsExperience />
    </SectionShell>
  );
}
