import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { RevealItem } from "@/components/motion/RevealItem";

interface Episode {
  host: string;
  /** YouTube video id — drives the thumbnail + the outbound link. */
  id: string;
  href: string;
  /** Optional badge (e.g. an audio-only conversation). */
  tag?: string;
}

const EPISODES: Episode[] = [
  { host: "Suman Agarwal", id: "SuN_Ie6lybg", href: "https://www.youtube.com/watch?v=SuN_Ie6lybg" },
  { host: "Arvind Arora", id: "QT1m2IkFxvg", href: "https://youtu.be/QT1m2IkFxvg?si=cDeZPCINWDDvvN7L" },
  { host: "Zeeshan", id: "AmXJ3b_dUMM", href: "https://youtu.be/AmXJ3b_dUMM?si=tXGQ6P75rl5VrBbq" },
  { host: "Beer Books", id: "hfC1LTDu87w", href: "https://youtu.be/hfC1LTDu87w" },
  { host: "Ashdin Doctor", id: "7dlN2sQZRWo", href: "https://youtu.be/7dlN2sQZRWo" },
  { host: "Ashdin Doctor", id: "YQguYsptzVM", href: "https://youtu.be/YQguYsptzVM", tag: "Audio" },
];

// The flagship appearance — featured above the grid.
const FEATURED = {
  host: "Raj Shamani",
  id: "uokt0pavxhM",
  href: "https://www.youtube.com/watch?v=uokt0pavxhM",
  tagline: "Figuring Out — the science of handwriting, success & the subconscious mind.",
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/**
 * PODCAST APPEARANCES (Server Component)
 *
 * A premium video wall: each card is a YouTube thumbnail with a play affordance
 * that links out to the conversation. Thumbnails are pulled live from YouTube
 * by video id, so adding an episode is a one-line data change.
 */
export function Podcasts() {
  return (
    <SectionShell id="podcasts" label="Podcast Appearances">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow rule>Podcast Appearances</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <Heading as="h2" size="lg" className="mt-5 text-paper">
            Conversations that <span className="italic text-ember-soft">decode.</span>
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <Text variant="lead" className="mt-6 max-w-xl">
            Imran shares the science of handwriting on the world&rsquo;s most-watched
            stages — on personality, health and transformation.
          </Text>
        </Reveal>
      </div>

      {/* Featured / flagship conversation — elevated above the grid */}
      <Reveal delay={0.12}>
        <a
          href={FEATURED.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 block lg:mt-14"
        >
          <div className="relative aspect-video overflow-hidden rounded-card border border-ember/50 shadow-[0_40px_120px_-40px_rgba(91,134,232,0.6)] ring-1 ring-ember/25 transition-shadow duration-500 group-hover:shadow-[0_40px_120px_-30px_rgba(91,134,232,0.85)]">
            <img
              src={`https://i.ytimg.com/vi/${FEATURED.id}/maxresdefault.jpg`}
              alt={`${FEATURED.host} — featured podcast conversation with Imran Baig`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-settle)] group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-transparent"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-pill border border-ember/50 bg-ink/60 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ember-soft backdrop-blur-sm">
              ★ Featured Conversation
            </span>
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-ink/40 text-paper backdrop-blur-sm transition-all duration-500 ease-[var(--ease-settle)] group-hover:scale-110 group-hover:border-ember/70 group-hover:bg-ember group-hover:text-ink">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-current" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>

          {/* Title below the image — keeps the thumbnail (faces) fully visible */}
          <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-xl text-paper sm:text-2xl">{FEATURED.host}</h3>
              <p className="mt-1 max-w-xl text-sm text-paper/65">{FEATURED.tagline}</p>
            </div>
            <span className="mt-2 inline-flex shrink-0 items-center gap-1 text-sm text-ember-soft sm:mt-0">
              Watch on YouTube
              <span className="transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </div>
        </a>
      </Reveal>

      <StaggerGroup className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-8 lg:grid-cols-3">
        {EPISODES.map((e) => (
          <RevealItem key={e.id}>
            <a
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden rounded-card border border-white/10">
                {/* Thumbnail (pulled from YouTube by id) */}
                <img
                  src={`https://i.ytimg.com/vi/${e.id}/hqdefault.jpg`}
                  alt={`${e.host} — podcast conversation with Imran Baig`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-settle)] group-hover:scale-[1.06]"
                />
                {/* Legibility gradient */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent transition-opacity duration-500 group-hover:from-ink/70"
                />
                {/* Play affordance */}
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-ink/40 text-paper backdrop-blur-sm transition-all duration-500 ease-[var(--ease-settle)] group-hover:scale-110 group-hover:border-ember/70 group-hover:bg-ember group-hover:text-ink">
                  <PlayIcon />
                </span>
                {/* Optional badge */}
                {e.tag && (
                  <span className="absolute right-3 top-3 rounded-pill border border-white/20 bg-ink/50 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-paper/80 backdrop-blur-sm">
                    {e.tag}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-col gap-0.5 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <h3 className="font-display text-base text-paper/85 transition-colors duration-500 group-hover:text-paper sm:text-lg">
                  {e.host}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-paper/45 transition-colors duration-500 group-hover:text-ember-soft">
                  Watch on YouTube
                  <span className="transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
              </div>
            </a>
          </RevealItem>
        ))}
      </StaggerGroup>
    </SectionShell>
  );
}
