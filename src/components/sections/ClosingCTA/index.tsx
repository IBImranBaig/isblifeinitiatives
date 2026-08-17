import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { InkFlourish } from "@/components/motion/InkFlourish";

/**
 * CLOSING CTA — the final, decisive invitation. Restates the offer after all the
 * proof has landed and points to the programs (the paid path). The masterclass
 * stays as a quiet secondary route for those not ready to buy.
 */
export function ClosingCTA() {
  return (
    <SectionShell id="start" label="Begin your transformation">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow rule className="justify-center">
            Your Next Chapter
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" size="lg" className="mt-5 text-paper">
            Decode yourself. <span className="italic text-ember-soft">Rewrite your life.</span>
          </Heading>
        </Reveal>
        <Reveal>
          <InkFlourish className="mx-auto mt-5" />
        </Reveal>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mx-auto mt-7 max-w-xl">
            Choose the program that meets you where you are — and learn the exact science
            Imran uses to transform confidence, relationships, money, and health.
          </Text>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Button variant="primary" href="/pricing" withArrow>
              Explore Programs
            </Button>
            <Button
              variant="link"
              href="https://website.imranbaig.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Or join the free masterclass
            </Button>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
