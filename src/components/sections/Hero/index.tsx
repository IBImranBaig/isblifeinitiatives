import { Container } from "@/components/ui/Container";
import { HeroContent } from "./HeroContent";
import { HeroVideo } from "./HeroVideo";

/**
 * HERO (Server Component)
 *
 * The existing premium typography floats above a full-bleed cinematic background
 * video. The video fills the entire section behind the copy / CTA / navigation;
 * a dark-navy overlay keeps the type highly readable. Layout, type, spacing,
 * copy, CTA and content hierarchy are unchanged.
 */
export function Hero() {
  return (
    <section
      aria-label="Imran Baig — Transform your life through the science of handwriting"
      className="grain relative flex min-h-[100svh] w-full items-center overflow-hidden bg-ink py-28 lg:py-0"
    >
      {/* 1 · Full-bleed background video */}
      <HeroVideo />

      {/* 2 · Dark navy overlay — keeps typography highly readable over the video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,8,15,0.92) 0%, rgba(5,8,15,0.72) 42%, rgba(5,8,15,0.46) 100%), linear-gradient(180deg, rgba(5,8,15,0.45) 0%, transparent 22%, transparent 66%, #05080f 100%)",
        }}
      />

      {/* 3 · Content — anchored to the left content rail (editorial), centered on mobile */}
      <Container size="full" className="relative z-10 w-full">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <HeroContent />
        </div>
      </Container>
    </section>
  );
}
