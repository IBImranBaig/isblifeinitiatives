import type { ReactNode } from "react";
import Link from "next/link";

/**
 * "What's Inside" — a visual spec-sheet for each program.
 *
 * Renders the program's full value stack as an icon + short-label grid so a
 * visitor grasps the offering at a glance, without reading every line. Icons
 * are chosen automatically from each feature's wording (see `iconFor`), so the
 * same component drives every program straight from `programsData.ts`.
 */

/* ------------------------------------------------------------------ icons -- */

const ICONS: Record<string, ReactNode> = {
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.5 8.5l5 3.5-5 3.5z" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.2L8 21l4-2 4 2-1-7.8" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 01-10 0V4z" />
      <path d="M7 6H4.5v1A3 3 0 007 10" />
      <path d="M17 6h2.5v1a3 3 0 01-2.5 3" />
      <path d="M9.5 20h5M12 14v6" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L12 17l-5.5 3.1 1.4-6.1L3.2 9.8l6.2-.6z" />,
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3.5 12.5L12 17l8.5-4.5" />
    </>
  ),
  type: (
    <>
      <path d="M5 7V5h14v2" />
      <path d="M12 5v14" />
      <path d="M9.5 19h5" />
    </>
  ),
  scribble: <path d="M3 14c1.8-3.5 3.6-3.5 4.6 0s2.8 3.5 4 0 2.8-3.5 4-1 2.4 2 3.4.5" />,
  pen: (
    <>
      <path d="M4 20l1-4L16 5a2 2 0 013 3L8 19l-4 1z" />
      <path d="M14 7l3 3" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M8.5 3v4M15.5 3v4" />
    </>
  ),
  support: (
    <>
      <path d="M4 13a8 8 0 0116 0" />
      <rect x="3" y="13" width="3.5" height="6" rx="1.5" />
      <rect x="17.5" y="13" width="3.5" height="6" rx="1.5" />
      <path d="M20 19a3 3 0 01-3 3h-2" />
    </>
  ),
  cap: (
    <>
      <path d="M3 9l9-4 9 4-9 4-9-4z" />
      <path d="M7 11v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4" />
      <path d="M21 9v4.5" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4l9 4V6l-9 4z" />
      <path d="M13 7.5l5-2v13l-5-2" />
      <path d="M6 14.5v2.5a1.2 1.2 0 002.4 0V15.5" />
    </>
  ),
  network: (
    <>
      <circle cx="6" cy="6.5" r="2.5" />
      <circle cx="18" cy="6.5" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7.6 8.4L11 15.8M16.4 8.4L13 15.8M8.5 6.5h7" />
    </>
  ),
  microphone: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11.5a6 6 0 0012 0" />
      <path d="M12 17.5V21M9 21h6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0111 0" />
      <path d="M16 5.5a3 3 0 010 5.6" />
      <path d="M17.5 14.2a5.5 5.5 0 013.5 4.8" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5M4 19h16" />
      <path d="M7.5 15l3.5-3.5 3 3L20 8" />
      <path d="M16.5 8H20v3.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8.5 7.5V5.5a2 2 0 012-2h3a2 2 0 012 2v2" />
      <path d="M3 12.5h18" />
    </>
  ),
  money: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 9.5v5M18 9.5v5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" />
    </>
  ),
  heart: (
    <path d="M12 20.5l-1.4-1.3C5.7 14.9 3 12.4 3 9.3 3 6.9 4.9 5 7.3 5c1.4 0 2.7.7 3.5 1.7L12 8l1.2-1.3C14 5.7 15.3 5 16.7 5 19.1 5 21 6.9 21 9.3c0 3.1-2.7 5.6-7.6 9.9L12 20.5z" />
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14a4 4 0 007 0" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4.5" />
    </>
  ),
  gem: (
    <>
      <path d="M6 4.5h12l3 4.5-9 10.5L3 9l3-4.5z" />
      <path d="M3 9h18M9 4.5L8 9l4 10.5L16 9l-1-4.5" />
    </>
  ),
  hash: <path d="M5 9h14M5 15h14M9.5 4l-2 16M16.5 4l-2 16" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M15.5 15.5L20 20" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3h5M10.5 3v6L5.5 17a2 2 0 001.8 3h9.4a2 2 0 001.8-3l-5-8V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10.5 5.4 8 5 5.5 5v13c2.5 0 5 .4 6.5 1.5 1.5-1.1 4-1.5 6.5-1.5V5c-2.5 0-5 .4-6.5 1.5z" />
      <path d="M12 6.5V19.5" />
    </>
  ),
  phone: (
    <path d="M6 4h2.5l1.4 4-2 1.4a11 11 0 005 5l1.4-2 4 1.4V19a2 2 0 01-2.2 2A15.5 15.5 0 014 6.2 2 2 0 016 4z" />
  ),
  hand: (
    <>
      <path d="M7 12.5V7a1.3 1.3 0 012.6 0v4.5" />
      <path d="M9.6 11.5V5.5a1.3 1.3 0 012.6 0v5.5" />
      <path d="M12.2 11.5V6.5a1.3 1.3 0 012.6 0V12" />
      <path d="M14.8 12V9a1.3 1.3 0 012.6 0v4.5c0 3.6-2.6 6.5-6.2 6.5-2.3 0-3.8-1-5-3L4.7 13c-.6-1 .1-2 1.2-2 .7 0 1.3.3 1.7 1l.4.7" />
    </>
  ),
  bulb: (
    <>
      <path d="M9.5 17.5h5M10 21h4" />
      <path d="M12 3a6 6 0 00-3.8 10.6c.7.6 1.1 1.3 1.2 2.1h5.2c.1-.8.5-1.5 1.2-2.1A6 6 0 0012 3z" />
    </>
  ),
};

/* --------------------------------------------------------------- matching -- */

/** Ordered keyword → icon rules. First match wins, so specific rules lead. */
const RULES: [RegExp, string][] = [
  [/lifetime|recordings/i, "play"],
  [/certificat/i, "award"],
  [/pen award|prestigious|recognition|celebrated|milestone|leadership/i, "trophy"],
  [/highest level|pinnacle|attain/i, "star"],
  [/trait stacking|stacking/i, "layers"],
  [/capital letters/i, "type"],
  [/doodle/i, "scribble"],
  [/signature/i, "pen"],
  [/\blive\b|workshop/i, "video"],
  [/\bdays\b|month|90-day|three months|guided grapho-therapy|training/i, "calendar"],
  [/facilitator support|dedicated/i, "support"],
  [/facilitator/i, "cap"],
  [/how you learn/i, "cap"],
  [/marketing/i, "megaphone"],
  [/affiliate|partnership/i, "network"],
  [/stage|speak|inspire/i, "microphone"],
  [/coach/i, "users"],
  [/voice|communication|language of transformation|deliver analysis/i, "megaphone"],
  [/sustainable practice|practice around|business/i, "chart"],
  [/mnc|recruitment|assessment|opportunit/i, "briefcase"],
  [/earning|earn through|financial/i, "money"],
  [/international|council|english language|beyond the|\blanguage\b|global/i, "globe"],
  [/relationship|compatibility|children|young minds|empower others|guide for/i, "users"],
  [/emotional|\beq\b|health through handwriting|decode health/i, "heart"],
  [/expression/i, "smile"],
  [/process information/i, "gear"],
  [/decisions/i, "compass"],
  [/fears|defence|defense|should never|6 traits/i, "shield"],
  [/strengths/i, "gem"],
  [/numbers/i, "hash"],
  [/root cause|ailments/i, "search"],
  [/science|grapho-therapy/i, "flask"],
  [/study material|a to z|study/i, "book"],
  [/calls|inner circle/i, "phone"],
  [/hand exercise|exercise/i, "hand"],
  [/pen stories|stories/i, "pen"],
  [/traits|decode|understand|master|graphology|mastery/i, "bulb"],
];

function iconFor(feature: string): string {
  for (const [re, name] of RULES) if (re.test(feature)) return name;
  return "check";
}

function FeatureIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-6 w-6 shrink-0 text-ember-soft"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name] ?? ICONS.check}
    </svg>
  );
}

/* ------------------------------------------------------------- component -- */

export function ProgramHighlights({ features }: { features: string[] }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-surface/40 p-5 backdrop-blur-sm sm:p-7">
      <p className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-paper/50">
        <span className="h-px w-6 bg-ember/40" />
        What&rsquo;s Inside
      </p>

      <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 sm:mt-6 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-6 lg:grid-cols-4">
        {features.map((f) => (
          <li key={f} className="flex flex-col gap-2.5">
            <FeatureIcon name={iconFor(f)} />
            <span className="text-[0.82rem] leading-snug text-paper/70">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-end">
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-1.5 text-sm text-ember-soft transition-colors hover:text-paper"
        >
          Explore this program
          <span className="transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
