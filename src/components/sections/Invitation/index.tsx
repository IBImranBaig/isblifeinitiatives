import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { InkFlourish } from "@/components/motion/InkFlourish";
import { ReformField } from "./ReformField";

/**
 * THE FINAL INVITATION (Server Component)
 *
 * The website's climax — a return to the void. The film's last chapter:
 * everything has been shown; the camera turns to the viewer. This is the
 * Masterclass conversion path — every "Join the Masterclass" CTA scrolls here.
 *
 * The void mounts <ReformField /> — scattered particles reassemble into a
 * handwritten word, lazy + WebGL-guarded with the gradient as the poster.
 */
export function Invitation() {
  return (
    <section
      id="invitation"
      aria-label="The invitation"
      className="grain relative flex min-h-[92svh] w-full items-center justify-center overflow-hidden bg-ink px-6 py-28"
    >
      {/* The void — same depth that opened the film */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 48%, rgba(91,134,232,0.14) 0%, transparent 60%), radial-gradient(120% 90% at 50% 42%, #101d38 0%, #0a1326 44%, #05080f 80%)",
        }}
      />
      {/* ENHANCEMENT SLOT — the hero's scattered minds reassemble into a word.
          Lazy, WebGL-guarded, offscreen-paused; the void gradient is the poster. */}
      <ReformField />

      {/* Grounding + edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 75% at 50% 50%, transparent 55%, rgba(5,8,15,0.7) 100%)",
        }}
      />

      <Container>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow rule className="justify-center">
              The Invitation
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 text-sm leading-relaxed tracking-wide text-paper/45">
              You&rsquo;ve seen the science, the method, the proof — what handwriting
              reveals in others.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Heading as="h2" size="lg" className="mt-6 text-balance text-paper">
              Now learn to decode <span className="italic text-ember-soft">your own</span>{" "}
              handwriting.
            </Heading>
          </Reveal>

          <Reveal delay={0.15}>
            <InkFlourish className="mt-6" trigger="inView" />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row">
              <Button
                variant="primary"
                href="https://website.imranbaig.com"
                target="_blank"
                rel="noopener noreferrer"
                withArrow
              >
                Join the Masterclass
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-12 text-[0.7rem] uppercase tracking-[0.3em] text-paper/35">
              Live &nbsp;·&nbsp; Online &nbsp;·&nbsp; Limited seats
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
