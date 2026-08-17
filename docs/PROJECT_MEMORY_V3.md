# PROJECT MEMORY V3 — Imran Baig Website

Authoritative handoff. For Graphotherapy and Six Dimensions, this file supersedes `docs/PROJECT_MEMORY.md`.

---

## Project Overview

- **Brand:** Imran Baig — "The Mind Decoder." Handwriting analyst / graphotherapist, 22+ years.
- **Website purpose:** Premium single-page personal-brand site. Converts visitors into handwriting-analysis / masterclass leads.
- **Target audience:** Premium clientele seeking personal transformation, self-understanding, and insight into health, career, relationships, and parenting through handwriting analysis.
- **Design philosophy:** Dark luxury ("Luxury Blue" palette). Editorial, cinematic, Apple-level restraint. Storytelling first. Handwriting / ink motif throughout.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (tokens in `app/globals.css` `@theme`) · Framer Motion v11 · GSAP 3 + ScrollTrigger + CustomEase · Lenis · Three.js + @react-three/fiber · next/font (Playfair Display, Inter).
**Repo root:** `C:\Users\Chetan\Desktop\imran\website`
**Section composition:** `app/page.tsx`. Global chrome/fonts: `app/layout.tsx`.

---

## Approved Sections

Order per `app/page.tsx`:

| # | Section | Anchor | Status |
|---|---|---|---|
| 1 | Hero | (none) | LOCKED |
| 2 | Graphotherapy | `#method` | Approved (editorial rebuild) |
| 3 | Six Dimensions | `#dimensions` | Built — final sign-off pending |
| 4 | Neuroscience | `#neuroscience` | Approved (pinned) |
| 5 | Journey | `#journey` | Approved (pinned) |
| 6 | About | `#about` | Needs Refinement |
| 7 | Recognition | `#recognition` | Needs Refinement |
| 8 | Podcasts | `#podcasts` | Approved |
| 9 | Testimonials | `#testimonials` | Needs Refinement |
| 10 | Trustpilot | `#trustpilot` | Approved |
| 11 | HowItWorks | `#how-it-works` | Approved |
| 12 | Invitation | `#invitation` | Approved |
| 13 | Begin | `#book` (form `#analysis`) | Needs Refinement |
| — | Nav / Footer | — | Needs Refinement (placeholder links) |

---

## Hero Section — LOCKED

- **Video background:** YouTube embed, video ID `Euiukd4aeL8`, host `youtube-nocookie.com`. Params: autoplay, mute, loop, controls off. Cover-sized (vw/vh), `pointer-events-none`, behind a navy gradient overlay. Never inside a card; never right-aligned.
- **Layout:** Full-bleed `<section>` `min-h-[100svh]`. `Container size="full"`, `grid lg:grid-cols-2`, only `HeroContent` (left column). Navy gradient overlay sits above video, below content.
- **Typography:** Eyebrow "22+ Years Transforming Lives Through Handwriting"; H1 "Transform Your Life Through The Science of **Handwriting**" (last word italic `text-ember-soft`); `InkFlourish` underline; lead `text-paper-dim`; single Button `primary` "Join the Masterclass" → `#book`.
- **Mobile:** Content centered (`items-center text-center`).
- **Desktop:** Content left-anchored to 7vw content rail (`md:items-start md:text-left`).
- **Files:** `src/components/sections/Hero/index.tsx`, `src/components/sections/Hero/HeroVideo.tsx`, `src/components/sections/Hero/HeroContent.tsx`.

---

## Graphotherapy Section — `#method`

Answers ONE question: "What is Graphotherapy?" (Nav "Method" links to `#method`.)

**Current implementation (approved):** Editorial `SectionShell` (server component, no pin, no canvas).
- Eyebrow "Discover Grapho-Therapy"; Heading "The way you write influences *the way you think.*"; lead paragraph.
- "128" proof statement band (gradient numeral + supporting line).
- "The 3-step transformation journey" + three `Card`s: **01 Analyze · 02 Understand · 03 Transform**. Content carries the section; no decorative graphics.
- **File:** `src/components/sections/Graphotherapy/index.tsx`.

**Approved parts:** Editorial layout, copy, 3 cards, the 128 statement.

**Rejected experiments (removed):** Pinned scroll-scrubbed beat timeline; `InkToNeural` handwriting→neural constellation; ambient `GraphotherapyAtmosphere` (pen, side panels, ink-current wave, neural networks, motes); fountain-pen narratives; "six dimensions" copy bleed.

**Remaining issues:** None outstanding (content-only section).

---

## Six Dimensions Section — `#dimensions`

**Current implementation status:** Built; rendered; verified for Mind and Career visuals. Final sign-off pending.

**Files involved:**
- `src/components/sections/Dimensions/index.tsx` (server) — full-width intro + `<DimensionsExperience/>`.
- `src/components/sections/Dimensions/DimensionsExperience.tsx` (client) — nav + hero, active state, cross-fade.
- `src/components/sections/Dimensions/DimensionVisual.tsx` (client) — SVG visual story per dimension.
- `src/components/sections/Dimensions/dimensionsData.ts` — content data.

**Current architecture:** Server `index.tsx` renders the full-width introduction (Eyebrow "Six Dimensions", Heading "All six dimensions of *human experience.*", lead) then mounts the client island `DimensionsExperience`. `DimensionsExperience` holds `active` state and renders a 2-column grid `lg:grid-cols-[3fr_7fr]` (30% nav / 70% hero). Selecting a dimension cross-fades the hero via `AnimatePresence mode="wait"`. `DimensionVisual` renders one SVG per dimension with finite Framer draw-on; reduced-motion shows the fully-drawn static frame.

**`dimensionsData` structure** (`DIMENSIONS: Dimension[]`):
```
interface Dimension { id: DimensionId; n: string; title: string; statement: string; body: string; }
type DimensionId = "mind" | "body" | "soul" | "career" | "relationships" | "parenting";
```
Six entries: `n` = "01"–"06"; `title` = Mind/Body/Soul/Career/Relationships/Parenting; `statement` = short promise; `body` = paragraph (existing site copy; Career = "Elevate performance, decision speed, and financial mindset.").

**Editorial navigation approach (left, 30%):** Plain list `01 Mind … 06 Parenting`. No cards/boxes/backgrounds/shadows. Inactive = small, muted. Active = larger, brighter (`text-paper`), champagne numeral + a thin champagne indicator line (`#cdb78a`). Hairline divider (`lg:border-r`).

**Narrative panel approach (right hero, 70%):** Magazine spread `lg:grid-cols-[0.9fr_1.1fr]`. Text side = number · title (Playfair `clamp`) · statement (italic `text-ember-soft`) · body. Visual side = `DimensionVisual`. One constant handwriting flourish (warm ink, `--color-ember`) evolves into each dimension's metaphor (cool insight line-art):
- Mind → neural pathways · Body → biological rhythm · Soul → resonance waves · Career → ascending opportunity pathways · Relationships → connection bridge · Parenting → generational lineage.
- Vector SVG only (no particles, no canvas). Draw-on `EASE.ink` (hand) + `EASE.settle` (metaphor).

**Approved:** 2-column editorial layout (30/70); left editorial navigation; right narrative hero; one-handwriting-evolves-into-six-metaphors visual concept (SVG); the `dimensionsData` content.

**Rejected:** All canvas/rAF particle systems; generative "atmospheres"/nebulae; sacred-geometry visuals; 3-column canvas-stage layout; the ink-toolkit script accents and `ScriptAccent`/`Manuscript`; hand-authored cursive-word and drop-cap-initial letterforms; oversized decorative typography.

**Needs Refinement:** Final visual sign-off; only Mind and Career were screenshot-verified (other four verified by DOM only); possible polish to champagne weighting, visual scale, and vertical reserve for short dimensions.

---

## Locked Design Rules

- Apple-level editorial design.
- Luxury minimalism.
- No SaaS UI.
- No dashboard aesthetics.
- No cards unless explicitly approved.
- No decorative effects without meaning.
- Storytelling first.
- Hero, Navigation, typography system, color tokens, and existing spacing rhythm are not to be redesigned.
- Palette tokens fixed (`app/globals.css` `@theme`): ink `#05080f`, ink-2 `#0a1020`, graphite `#121a2e`, paper `#eef2fa`, paper-dim `#97a3bd`, ember `#5b86e8`, ember-soft `#a9c2ff`, ember-deep `#2a4ea0`, glow `#62c0ff`, glow-soft `#b8e2ff`, glow-deep `#2f7fc0`, surface `#0e1626`, surface-2 `#14203a`, line `#1f2c44`.
- Type: Playfair Display (display) + Inter (sans).
- Unified motion vocabulary: `EASE.settle` `[0.16,1,0.3,1]`, `EASE.ink` `[0.65,0.05,0.36,1]`, `EASE.out` `[0.22,1,0.36,1]`; `DURATION` (fast .4 / base .8 / slow 1.2 / cinematic 1.6); entrance travel tokens `TRAVEL = 30`, `TRAVEL_TIGHT = 12`.
- GSAP timelines route through brand eases registered as `CustomEase` ("settle"/"ink"/"out") in `src/lib/animation/gsap.ts`, built from the same `EASE` control points. `easings.ts` is dependency-free (no gsap import).
- `prefers-reduced-motion` respected in all motion (static/fully-revealed fallback).
- No horizontal overflow at any breakpoint (`overflow-x: clip` on `html` + `body`).

---

## Files Modified

- `app/globals.css`
- `src/lib/animation/easings.ts`
- `src/lib/animation/gsap.ts`
- `src/components/motion/variants.ts`
- `src/components/layout/Nav.tsx`
- `src/components/sections/Neuroscience/NeuroscienceExperience.tsx`
- `src/components/sections/Journey/JourneyExperience.tsx`
- `src/components/sections/Graphotherapy/index.tsx`
- `src/components/sections/Dimensions/index.tsx`

## Files Created

- `src/components/sections/Dimensions/dimensionsData.ts`
- `src/components/sections/Dimensions/DimensionsExperience.tsx`
- `src/components/sections/Dimensions/DimensionVisual.tsx`
- `docs/PROJECT_MEMORY_V3.md`

## Files Removed

- `src/components/sections/Graphotherapy/GraphotherapyExperience.tsx`
- `src/components/sections/Graphotherapy/InkToNeural.tsx`
- `src/components/sections/Graphotherapy/GraphotherapyAtmosphere.tsx`
- `src/components/sections/Graphotherapy/InkMarginalia.tsx`
- `src/components/sections/Dimensions/DimensionsGrid.tsx`
- `src/components/sections/Dimensions/DimensionCanvas.tsx`
- `src/components/sections/Dimensions/dimensionSystems.ts`
- `src/components/sections/Dimensions/ink.ts`
- `src/components/sections/Dimensions/ScriptAccent.tsx`
- `src/components/sections/Dimensions/Manuscript.tsx`
- `src/components/sections/Dimensions/dimensionGlyphs.ts`
- `src/components/sections/Dimensions/Constellation.tsx`
- `public/dimensions/` (six dimension JPGs)

---

## Remaining Tasks

- Wire `app/api/lead/route.ts` to real lead delivery (email + sample storage) and add spam protection.
- Replace placeholder contact email `hello@imranbaig.com`.
- Replace placeholder social links (`#`) and legal links Privacy/Terms (`#`).
- Add real About portrait (currently `PortraitFrame`/`Signature` placeholder).
- Add real Recognition expert photos (currently monogram/`Medallion` placeholders).
- Add real Testimonials names and video (currently placeholders; empty video poster).
- Reconcile/substantiate claim numbers ("300,000+", "9,098+", "22+") and "2025 Neuroscience Research".
- Six Dimensions: obtain final visual sign-off; screenshot-verify Body, Soul, Relationships, Parenting visuals.
- Restart dev server / delete `.next` to clear stale phantom compile error referencing deleted `Manuscript.tsx` (production build unaffected).
- Optional: replace Hero YouTube iframe with a local `/public/videos/` native `<video>`.
- SEO scaffolding: `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, JSON-LD, dynamic OpenGraph image.
- Legal routes: `/privacy`, `/terms`.
- Active-section nav highlighting.

---

## Commands

- `npm run dev` — `http://localhost:3000` (Preview MCP launches via `scripts/dev.cmd`).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run build` — production build (clean `.next`; never run while the dev server is running).

## Environment Notes

- Node.js at `C:\Program Files\nodejs` (Node v24, npm 11), NOT on PATH. Prepend per shell call: PowerShell `$env:Path = "$env:ProgramFiles\nodejs;$env:Path"; npm ...`.
- Preview MCP uses `.claude/launch.json` → `scripts/dev.cmd` (sets PATH then runs `npm run dev`). Do not change to bare `npm`.
- Preview screenshots time out on the Hero (YouTube iframe) and can desync from Lenis scroll after multiple evals; verify via `eval`/computed styles, or stop Lenis (`window.__lenis.stop()/destroy()`) and use native scroll before screenshotting.
