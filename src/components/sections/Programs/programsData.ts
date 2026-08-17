export interface Program {
  n: string;
  /** URL segment: /programs/<slug> (detail pages still exist). */
  slug: string;
  /** The editorial theme for this program's row. */
  theme: string;
  title: string;
  tagline: string;
  /** Caption shown over the student photo mosaic. */
  proof?: string;
  /** Cover image at /public/programs/<file>. */
  image: string;
  /** Product-box / crest mockup shown inside the program's glass panel. */
  box?: string;
  /** Mosaic thumbnail folder under /public/mosaics. */
  mosaicDir?: string;
  mosaicCount?: number;
  /** Backdrop style: dense vertical columns (default) or a horizontal row
   * marquee that keeps natural aspect ratios (for programs with few images). */
  mosaicLayout?: "columns" | "rows";
  /** Row count for the "rows" backdrop. Fewer rows = larger images (use for
   * programs with only a handful of photos, e.g. Program 1). */
  mosaicRows?: number;
  /** Certificate set for the detail-page proof-wall. */
  certDir?: string;
  overview: string;
  outcome: string;
  /** Full value stack (drives the homepage highlights + pricing tiers). */
  features: string[];
}

export const PROGRAMS: Program[] = [
  {
    n: "01",
    slug: "first-step-program",
    theme: "Program Overview",
    title: "The First Step",
    tagline:
      "Begin your self-transformation — decode 40 behavioural traits and discover your true self.",
    image: "/programs/first-step-program.jpg",
    box: "/program/first-step.png",
    mosaicDir: "p1",
    mosaicCount: 13,
    mosaicLayout: "rows",
    mosaicRows: 2,
    overview:
      "Your entry into the world of graphotherapy. A single sample of your handwriting becomes a map of how you think, feel and decide — and the first deliberate strokes toward rewriting what no longer serves you.",
    outcome: "Walk away with an honest picture of yourself and a daily practice to begin reprogramming it.",
    features: [
      "Decode 40 different behavioural traits",
      "Understand your Emotional Quotient (EQ)",
      "Discover your Expression Quotient",
      "Understand how you learn",
      "Understand how you process information",
      "Understand why you take decisions the way you do",
      "Decode your Relationship Quotient",
      "Identify your fears & defence mechanisms",
      "Discover your natural strengths",
      "Learn the 6 traits that should never be in your handwriting",
      "21 days of guided Grapho-Therapy",
      "Decode your signature",
      "Physical study material",
      "Two-day live workshop",
      "Lifetime access to recordings",
      "Weekly Inner Circle calls",
      "Pen Stories",
      "Hand exercises",
      "E-Certificate",
    ],
  },
  {
    n: "02",
    slug: "professional-approach",
    theme: "Student Success & Outcomes",
    title: "The Professional Approach",
    tagline:
      "Become a certified analyst — turn the science of handwriting into a profession.",
    proof: "17,500+ certified students worldwide",
    image: "/programs/professional-approach.jpg",
    box: "/program/professional-approach.png",
    mosaicDir: "p2",
    mosaicCount: 48,
    mosaicLayout: "rows",
    certDir: "certificates",
    overview:
      "The bridge from self-understanding to a profession — the deeper traits, the science of why we write what we write, and the application-based coaching that turns insight into a practice you can deliver.",
    outcome: "Become a Certified Handwriting Analyst & Grapho-analytical Therapist, ready to read and coach others.",
    features: [
      "Decode 60 advanced behavioural traits",
      "Understand the power of trait stacking",
      "Learn the science behind Grapho-Therapy",
      "Create customized Grapho-Therapy for individual needs",
      "Decode handwriting beyond the English language",
      "Create your identity as a coach",
      "Start earning through handwriting analysis",
      "Get listed on our International Council of Graphologists",
      "Deliver analysis through the language of transformation",
      "Use handwriting analysis for compatibility",
      "Explore MNC opportunities for recruitment & assessment",
      "Physical study material",
      "10 live sessions across one month",
      "30 days of guided Grapho-Therapy",
      "Dedicated facilitator support",
      "Physical certificate",
      "Lifetime access to recordings",
      "Marketing kit",
    ],
  },
  {
    n: "03",
    slug: "inner-physician",
    theme: "Course Learnings",
    title: "Inner Physician",
    tagline: "Read health through handwriting — and heal, in mind and body.",
    proof: "150+ Inner Physicians certified",
    image: "/programs/inner-physician.jpg",
    box: "/program/inner-physician.png",
    mosaicDir: "p3",
    mosaicCount: 48,
    mosaicLayout: "rows",
    certDir: "certificates-ip",
    overview:
      "Where graphotherapy meets healing — decoding the root causes of health challenges and pairing 90 days of targeted graphotherapy with the science of handwriting and health.",
    outcome: "Learn to read health through handwriting and heal yourself while guiding others.",
    features: [
      "Decode health through handwriting",
      "Master the A to Z of handwriting & health",
      "Understand the root cause of ailments",
      "Decode advanced health traits",
      "Understand reductive traits",
      "Learn specific Grapho-Therapy for health",
      "Learn to decode numbers",
      "40 days of guided Grapho-Therapy",
      "Empower others through health awareness",
      "The 90-day Health Grapho-Therapy system",
      "Physical study material",
      "4 live classes",
      "Dedicated facilitator support",
      "Physical certificate",
      "Lifetime access to recordings",
    ],
  },
  {
    n: "04",
    slug: "master-practitioner",
    theme: "Awards & Recognition",
    title: "Master Practitioner of Graphology",
    tagline:
      "The pinnacle — master the craft, the stage and the business of graphology.",
    proof: "Pen Award winners & global facilitators",
    image: "/programs/master-practitioner.jpg",
    box: "/program/master-practitioner.png",
    mosaicDir: "p4",
    mosaicCount: 48,
    mosaicLayout: "rows",
    overview:
      "The summit — graphology, health, stage, coaching, affiliation and business brought together into a single mastery that lets you transform lives and scale a world-class practice.",
    outcome: "Command the full craft and business of graphology, equipped to lead, teach and scale globally.",
    features: [
      "Attain the highest level of mastery in graphology",
      "Master decoding capital letters",
      "Master decoding doodles",
      "Master signature design",
      "Become a trusted guide for children & young minds",
      "Position yourself as a recognized voice in graphology",
      "Master coaching, communication & transformation",
      "Confidence to speak, teach & inspire from the stage",
      "Build a sustainable practice around your expertise",
      "Become a facilitator with Global Penmanship Academy",
      "Expand impact through the Affiliate Partnership System",
      "Earn recognition through prestigious Pen Awards",
      "Be celebrated for professional & financial milestones",
      "Three months of advanced training",
      "Lifetime access to recordings",
      "Physical certification",
      "Awards, recognition & leadership opportunities",
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}
