import { SectionShell } from "@/components/ui/SectionShell";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stars } from "./Stars";
import { TrustScore } from "./TrustScore";

const URL = "https://www.trustpilot.com/review/imranbaig.com";

interface Review {
  name: string;
  text: string;
  date: string;
  location?: string;
}

/** Placeholder reviews — swap for the real Trustpilot pulls. */
const REVIEWS: Review[] = [
  {
    name: "Neelima",
    text: "Within one session Imran read patterns in my handwriting I had never admitted to myself. The graphotherapy exercises genuinely shifted how I think.",
    date: "May 18, 2026",
  },
  {
    name: "Rohan Mehta",
    text: "I was sceptical that a few lines of writing could reveal so much — the 35-trait breakdown was uncannily accurate and incredibly useful.",
    date: "May 2, 2026",
  },
  {
    name: "Abhishek",
    text: "I came to decode my handwriting and left having decoded myself. The clarity on my strengths and fears was worth every minute.",
    date: "Apr 21, 2026",
  },
  {
    name: "Pragyan",
    text: "Truly mind-blowing. If you're serious about understanding yourself — or building a career as an analyst — this is the place to start.",
    date: "Apr 9, 2026",
  },
  {
    name: "Mahantesh",
    text: "A gifted analyst and an even better teacher. Imran has a rare ability to make the science of handwriting simple and life-changing.",
    date: "Mar 27, 2026",
  },
  {
    name: "Sahana R",
    text: "The health markers Imran spotted in my writing led me to changes I had put off for years. Graphotherapy genuinely works.",
    date: "Mar 15, 2026",
  },
  {
    name: "Ashish Pragyan",
    text: "Imran is the real deal — practical, ethical and genuinely invested in your transformation. Thank you for serving so many people.",
    date: "Feb 28, 2026",
    location: "Prayagraj, IN",
  },
  {
    name: "Verified Reviewer",
    text: "Excellent is too small a word. The clarity Imran gives across personality, health and relationships is simply unmatched.",
    date: "Feb 11, 2026",
  },
  {
    name: "Divya S",
    text: "This masterclass is beautifully designed. Day by day I am getting more clarity about myself and the path ahead.",
    date: "Jan 25, 2026",
  },
];

/** Pastel avatar swatches, picked deterministically from the reviewer name. */
const AVATAR_COLORS = [
  { bg: "#ffe0e9", fg: "#d23f6f" },
  { bg: "#e0ecff", fg: "#3f6fd2" },
  { bg: "#e3f7e8", fg: "#2f9b5a" },
  { bg: "#fff1d6", fg: "#c98a1e" },
  { bg: "#ece0ff", fg: "#7d4fd2" },
  { bg: "#d9f6f4", fg: "#1f9b94" },
];

function avatarFor(name: string) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return { initials, ...AVATAR_COLORS[sum % AVATAR_COLORS.length] };
}

const TRUSTPILOT_GREEN = "#00b67a";

/** Trustpilot's signature green star bar — five white stars on green tiles. */
function GreenStars() {
  return (
    <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="flex h-[22px] w-[22px] items-center justify-center rounded-[3px]"
          style={{ backgroundColor: TRUSTPILOT_GREEN }}
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-[15px] w-[15px] fill-white">
            <path d="M12 2.5l2.9 6.1 6.6.6-5 4.4 1.5 6.4L12 17.1 5.5 20l1.5-6.4-5-4.4 6.6-.6z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** A faithful Trustpilot review card — white surface, avatar, green stars, footer actions. */
function ReviewCard({ review }: { review: Review }) {
  const { initials, bg, fg } = avatarFor(review.name);
  return (
    <article className="flex h-full flex-col rounded-[8px] bg-white p-5 text-[#191919]">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
          style={{ backgroundColor: bg, color: fg }}
          aria-hidden
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#191919]">{review.name}</p>
          <p className="text-xs text-[#6b6b76]">{review.date}</p>
        </div>
      </div>

      <div className="mt-3.5">
        <GreenStars />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#39393c]">{review.text}</p>

      <div className="mt-auto flex items-center gap-5 pt-5 text-[#6b6b76]">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium">
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10v10H4V10h3zm3 0l3-7a2 2 0 012 2v3h4a2 2 0 012 2.2l-1 6A2 2 0 0119 20h-9V10z" />
          </svg>
          Useful
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium">
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" />
            <path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" />
          </svg>
          Share
        </span>
        <svg viewBox="0 0 24 24" aria-hidden className="ml-auto h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 21V4h11l-1.5 3.5L16 11H5" />
        </svg>
      </div>
    </article>
  );
}

function ShieldCheck() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5" fill="none">
      <path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5l8-3z" stroke="var(--color-glow)" strokeWidth="1.5" />
      <path d="M8.5 12l2.2 2.2L15.5 9.5" stroke="var(--color-glow)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * TESTIMONIALS — Trustpilot-style review wall (Server Component).
 *
 * A verified pill + scaled headline, a 3-column grid of quote cards (each with
 * a reviewer, a Verified badge, five stars and a location), and a rating
 * summary with a link out to Trustpilot.
 */
export function Testimonials() {
  return (
    <SectionShell id="testimonials" label="Reviews">
      {/* Header — verified pill + big count-up figure */}
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper/70 backdrop-blur-sm transition-colors duration-500 hover:border-glow/50 hover:text-paper"
          >
            <ShieldCheck />
            Verified on Trustpilot
            <span className="text-paper/40 transition-transform duration-500 group-hover:translate-x-0.5">↗</span>
          </a>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Reveal delay={0.05}>
            <TrustScore />
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <Text variant="lead" className="mx-auto mt-7 max-w-xl">
            Real stories from people who came to decode their handwriting — and left
            having decoded themselves.
          </Text>
        </Reveal>

        <h2 className="sr-only">Trusted by 1,469+ experts — verified reviews</h2>
      </div>

      {/* Static review grid — 3×3 on desktop, 2-up on tablet, 1-up on mobile. */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {REVIEWS.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
      </div>

      {/* Rating summary + CTA */}
      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 text-sm text-paper/60">
            <span className="font-display text-xl font-medium text-paper">5</span>
            <Stars className="scale-110" />
            <span className="text-paper/40">&middot; 1,469+ Reviews</span>
          </div>
          <Button variant="primary" href={URL} withArrow target="_blank" rel="noopener noreferrer">
            Read All Reviews
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  );
}
