"use client";

import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { RevealItem } from "@/components/motion/RevealItem";
import { InkFlourish } from "@/components/motion/InkFlourish";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

/**
 * Hero copy — the offer, stated plainly. Composed from the shared design system
 * (StaggerGroup / RevealItem / InkFlourish + Eyebrow / Heading / Text / Button).
 * Within three seconds: handwriting + graphotherapy, personal transformation,
 * and a single next step — the masterclass. One CTA, no competing paths.
 */
export function HeroContent() {
  return (
    <StaggerGroup
      trigger="mount"
      className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left"
    >
      <RevealItem className="mb-7">
        <Eyebrow rule>22+ Years Transforming Lives Through Handwriting</Eyebrow>
      </RevealItem>

      <RevealItem>
        <Heading as="h1" size="md" className="leading-[1.08]">
          Transform Your Life Through The Science of{" "}
          <span className="italic text-ember-soft">Handwriting</span>
        </Heading>
      </RevealItem>

      {/* Handwritten underline — reinforces the subject, drawn after the headline */}
      <InkFlourish className="mt-4" trigger="mount" delay={0.7} />

      <RevealItem className="mt-8">
        <Text variant="lead" className="max-w-lg text-balance text-paper-dim">
          Discover how handwriting reveals subconscious patterns and learn practical
          techniques used to create lasting personal change.
        </Text>
      </RevealItem>

      <RevealItem className="mt-10">
        <Button
          variant="primary"
          href="https://website.imranbaig.com"
          target="_blank"
          rel="noopener noreferrer"
          withArrow
        >
          Join the free masterclass
        </Button>
      </RevealItem>
    </StaggerGroup>
  );
}
