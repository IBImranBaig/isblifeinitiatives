> SUPERSEDED for Graphotherapy and Six Dimensions — see `docs/PROJECT_MEMORY_V3.md` for the current state of those two sections and the unified motion vocabulary.

# Project Overview

- Single-page personal-brand site for Imran Baig ("The Mind Decoder"), handwriting analyst / graphotherapist.
- Stack: Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (tokens in `app/globals.css` `@theme`) · Framer Motion v11 · GSAP 3 + ScrollTrigger · Three.js + @react-three/fiber v9 · Lenis · next/font (Playfair Display, Inter).
- Repo root: `C:\Users\Chetan\Desktop\imran\website`.
- Section composition: `app/page.tsx`. Global metadata/fonts/Nav/Footer: `app/layout.tsx`.
- Status: build-green. Hero = video background (current). Pinned narratives + editorial sections present.

# Approved Design Direction

- Dark luxury "Luxury Blue" palette. Playfair Display (display) + Inter (sans).
- Editorial, cinematic, full-bleed hero with premium typography over video.
- Tight inter-section rhythm (one continuous narrative).

# Approved Hero Section

- File: `src/components/sections/Hero/index.tsx` (server). Children: `HeroVideo`, navy overlay, `HeroContent`.
- Section classes: `grain relative flex min-h-[100svh] w-full items-center overflow-hidden bg-ink py-28 lg:py-0`.

## Video background implementation
- File: `src/components/sections/Hero/HeroVideo.tsx`.
- Source: YouTube embed, video ID `Euiukd4aeL8`, host `https://www.youtube-nocookie.com/embed/`.
- Params: `autoplay=1&mute=1&loop=1&playlist=Euiukd4aeL8&controls=0&disablekb=1&fs=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&showinfo=0`.
- iframe: `tabIndex=-1`, `allow="autoplay; encrypted-media; picture-in-picture"`, `loading="eager"`, `border:0`.
- Wrapper: `pointer-events-none absolute inset-0 overflow-hidden bg-ink`, `aria-hidden`.
- Cover sizing (object-fit:cover equivalent): iframe centered `translate(-50%,-50%)`; `width:100vw; height:56.25vw; minWidth:177.78vh; minHeight:100vh`.
- No card, no box, not right-aligned. Behind headline/subheadline/CTA/navigation.

## Desktop behavior
- Content anchored to left content rail (7vw gutter). `Container size="full"`, grid `lg:grid-cols-2`, only `HeroContent` rendered (left column).
- h1 left edge = 7vw (134px @1920, 101px @1440, 96px @1366).

## Mobile behavior
- Content centered. `HeroContent` is `items-center text-center` below `md`.

## Overlays
- Navy gradient overlay above video, below content: `linear-gradient(90deg, rgba(5,8,15,0.92) 0%, rgba(5,8,15,0.72) 42%, rgba(5,8,15,0.46) 100%), linear-gradient(180deg, rgba(5,8,15,0.45) 0%, transparent 22%, transparent 66%, #05080f 100%)`. `pointer-events-none`.

## Typography rules
- `HeroContent` (`src/components/sections/Hero/HeroContent.tsx`): Eyebrow (rule) "22+ Years Transforming Lives Through Handwriting"; H1 `size="md" leading-[1.08]` "Transform Your Life Through The Science of **Handwriting**" (last word `italic text-ember-soft`); `InkFlourish` underline; lead Text `text-paper-dim`; Button `primary` withArrow "Join the Masterclass" → `#book`.
- Block: `max-w-xl`, `items-center text-center md:items-start md:text-left`.

## Spacing rules
- Section padding: `py-28 lg:py-0` on the hero `<section>`.
- Content gutter via `Container` (`px-6 sm:px-10 lg:px-[7vw]`).

# Approved Visual System

- Color tokens (`app/globals.css` `@theme`): `--color-ink #05080f`, `--color-ink-2 #0a1020`, `--color-graphite #121a2e`, `--color-paper #eef2fa`, `--color-paper-dim #97a3bd`, `--color-ember #5b86e8`, `--color-ember-soft #a9c2ff`, `--color-ember-deep #2a4ea0`, `--color-glow #62c0ff`, `--color-glow-soft #b8e2ff`, `--color-glow-deep #2f7fc0`, `--color-surface #0e1626`, `--color-surface-2 #14203a`, `--color-line #1f2c44`.
- Radius: `rounded-card` 1.25rem, `rounded-pill` 9999px.
- Spacing tokens: `--spacing-section 3.25rem`, `--spacing-section-lg 6rem`, `--spacing-gutter 1.5rem`.
- Fonts: `--font-playfair` (Playfair Display), `--font-inter` (Inter).
- UI primitives: `src/components/ui/` — Container, SectionShell, Eyebrow, Pill, Heading, Text, Button, Card.
- `.grain` film-grain utility; CSS keyframes `ns-scan-sweep`, `wave-pulse`.

# Approved Animations

- Hero: background video autoplay/loop (no scrubbed animation).
- Pinned scroll-scrub narratives via `useScrollStory` (GSAP ScrollTrigger, scrub): Graphotherapy (`gt-`), Neuroscience (`ns-`), Journey (`jt-`). Track heights: Graphotherapy 260vh, Neuroscience 260vh, Journey 190vh (reduced-motion fallback `py-section`).
- Framer Motion DOM reveals: `StaggerGroup`, `RevealItem`, `Reveal`, `InkFlourish` (SVG pathLength draw-on).
- Dimensions: interactive radial constellation (hover) — `src/components/sections/Dimensions/`.
- Invitation: WebGL particle reform into word "you" — `Invitation/ReformField.tsx` → `three/Canvas/ReformCanvas.tsx` → `three/scenes/Reform/*` + `lib/three/wordTargets.ts`. Lazy mount, WebGL-guarded, IntersectionObserver render-loop pause, reduced-motion static, transparent canvas.
- About: `CountUp` "22+". Trustpilot: `CountUp` "9,098+", `ScaleField` point-field. Podcasts: `Waveform` (hover). Recognition: `Medallion` monograms.
- Lenis smooth scroll (disabled under reduced-motion); `window.__lenis` / `window.ScrollTrigger` exposed in dev.

# Approved Components

- Hero: `Hero/index.tsx`, `Hero/HeroVideo.tsx`, `Hero/HeroContent.tsx`.
- Sections (`src/components/sections/`): Graphotherapy, Dimensions, Neuroscience, Journey, About, Recognition, Podcasts, Testimonials, Trustpilot, HowItWorks, Invitation, Begin.
- Global: `layout/Nav.tsx`, `layout/Footer.tsx`, `layout/SmoothLink.tsx`, `providers/SmoothScrollProvider.tsx`.
- Three primitives: `three/LazyScene.tsx`; Reform scene (`three/scenes/Reform/`), `three/Canvas/ReformCanvas.tsx`.
- Conversion: `Begin/index.tsx` + `Begin/ConversionForm.tsx` → `POST app/api/lead/route.ts`.

# Files Modified

- `app/globals.css` — spacing tokens (`--spacing-section 3.25rem`, `--spacing-section-lg 6rem`).
- `src/components/sections/Hero/index.tsx` — video background + navy overlay + `Container size="full"`.
- `src/components/sections/Hero/HeroContent.tsx` — alignment breakpoint `md:items-start md:text-left`.
- `src/components/sections/Graphotherapy/GraphotherapyExperience.tsx` — track `h-[260vh]`.
- `src/components/sections/Neuroscience/NeuroscienceExperience.tsx` — track `h-[260vh]`.
- `src/components/sections/Journey/JourneyExperience.tsx` — track `h-[190vh]`.
- `src/components/sections/About/index.tsx` — masthead gap `mt-12 ... pt-8 lg:mt-16`.
- `src/components/sections/Recognition/index.tsx` — council gap `mt-14 lg:mt-18`.
- `src/components/sections/Podcasts/index.tsx` — content gap `mt-9 lg:mt-12`.
- `src/components/sections/Testimonials/index.tsx` — content gap `mt-9 lg:mt-12`.
- `src/components/sections/HowItWorks/index.tsx` — content gap `mt-9 lg:mt-12`.
- `src/components/sections/Dimensions/DimensionsGrid.tsx` — content gap `mt-10 lg:mt-16`.
- `src/components/sections/Invitation/index.tsx` — mounts `ReformField` in void slot.

# Files Created

- `src/components/sections/Hero/HeroVideo.tsx`
- `src/components/sections/Invitation/ReformField.tsx`
- `src/components/three/Canvas/ReformCanvas.tsx`
- `src/components/three/scenes/Reform/reformMaterial.ts`
- `src/components/three/scenes/Reform/useReformData.ts`
- `src/components/three/scenes/Reform/ReformParticles.tsx`
- `src/lib/three/wordTargets.ts`
- `docs/PROJECT_MEMORY.md`

# Files Removed

- Hero card/signature/human system: `Hero/HeroManuscript.tsx`, `Hero/HeroHuman.tsx`, `Hero/HeroTransition.tsx`, `Hero/HeroEye.tsx`, `Hero/HeroFigure.tsx`, `Hero/ConstellationField.tsx`, `Hero/signaturePath.ts`, `Hero/signatureFont.ts`.
- Three: `three/Canvas/MindCanvas.tsx`, `three/Canvas/SceneCanvas.tsx`, `three/Canvas/ConstellationCanvas.tsx`, `three/scenes/Mind/*`, `three/scenes/NeuralNetwork/*`, `three/scenes/Constellation/*`.
- Lib: `lib/three/overturePath.ts`, `lib/three/profileShape.ts`, `lib/three/sampleImageTargets.ts`, `lib/handwriting/sampleSignature.ts`.
- `scripts/bake-signature.cjs`.

# Responsive Rules

- Breakpoints (Tailwind defaults): sm 640, md 768, lg 1024.
- Container: `mx-auto w-full px-6 sm:px-10 lg:px-[7vw]`; sizes `default` max-w-6xl, `wide` max-w-[100rem], `full` max-w-none.
- Hero content: centered `< md`; left-aligned `md+`; anchored to 7vw rail `lg+` (`Container size="full"`).
- SectionShell padding: `py-section` (`3.25rem`) mobile, `lg:py-section-lg` (`6rem`) desktop. Verified: `#about` padding 96px desktop / 52px mobile.
- Hero video cover: vw/vh sizing (above).
- Pinned sections: vh tracks (animated) / `py-section` (reduced-motion static).
- Verified viewports: 1920×1080, 1440×900, 1366×768, 390×844. Page height @1440 reduced 21,414px → 15,921px (~26%).

# Section Status

- Hero — Approved.
- Graphotherapy (`#method`) — Approved.
- Dimensions (`#dimensions`) — Approved.
- Neuroscience (`#neuroscience`) — Approved.
- Journey (`#journey`) — Approved.
- About (`#about`) — Needs Refinement (no real portrait; `PortraitFrame`/`Signature` placeholder).
- Recognition (`#recognition`) — Needs Refinement (monogram placeholders, no real expert photos).
- Podcasts (`#podcasts`) — Approved.
- Testimonials (`#testimonials`) — Needs Refinement (placeholder names; empty video poster).
- Trustpilot (`#trustpilot`) — Approved.
- HowItWorks (`#how-it-works`) — Approved.
- Invitation (`#invitation`) — Approved.
- Begin (`#book` / form `#analysis`) — Needs Refinement (lead delivery not wired).
- Nav / Footer — Needs Refinement (placeholder contact/social/legal links).

# Locked Decisions

- Hero = full-bleed background video (YouTube embed ID `Euiukd4aeL8`); never inside a card/box; never right-side.
- Hero content left-anchored on desktop (7vw rail), centered on mobile.
- Navy gradient overlay sits above the video, below content.
- Signature / pen / SVG signature / human-materialization / black-card system is removed; do not reintroduce.
- Hero copy fixed: eyebrow "22+ Years Transforming Lives Through Handwriting"; H1 "Transform Your Life Through The Science of Handwriting" (last word italic ember-soft); single CTA "Join the Masterclass" → `#book`.
- Typography, colors, layouts, cards, content, animation effects, imagery, video: unchanged.
- Spacing tokens fixed: `--spacing-section 3.25rem`, `--spacing-section-lg 6rem`.
- Pinned track heights fixed: Graphotherapy 260vh, Neuroscience 260vh, Journey 190vh; pinned animation timelines unchanged.
- Section order in `app/page.tsx` fixed.
- Luxury Blue palette tokens fixed.

# Known Issues

- `public/human.png` exists but is unused (no references).
- Hero video is a YouTube iframe (branding/quality limits); no local file. Native `<video>` path: add file to `/public/videos/` and replace `HeroVideo` iframe with `<video autoplay muted loop playsInline className="… object-cover">`.
- `app/api/lead/route.ts` acknowledges leads but does not deliver (TODO).
- Placeholder content: contact `hello@imranbaig.com`; social links `#`; Privacy/Terms `#`; About has no real portrait; Recognition uses monograms; Testimonials use placeholder names + empty video; claim numbers ("300,000+", "9,098+", "22+") unreconciled; "2025 Neuroscience Research" unsubstantiated.
- Preview screenshot tool times out on the hero (YouTube iframe); verify via `eval`/computed styles.
- Node not on PATH (`C:\Program Files\nodejs`); prepend in every shell call. `python`/`python3` are non-functional Store stubs.
- `.next` build race: kill orphaned `next dev` on port 3000 + `node.exe` with `*imran*` cmdline, delete `.next`, then `typecheck` + `build`. Never `build` while preview dev server runs.

# Next Priorities

- Wire `app/api/lead/route.ts` to real delivery (email + sample storage) + spam protection.
- Replace placeholders: contact email, social URLs, Privacy/Terms; About portrait; Recognition expert photos; Testimonials real names/video.
- Reconcile/substantiate claim numbers and "2025 Neuroscience Research".
- Optional: replace hero YouTube iframe with local `/public/videos/` native `<video>`.

# Future Roadmap

- SEO scaffolding: `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, JSON-LD (Person, ProfessionalService, Review/AggregateRating, FAQPage), dynamic `opengraph-image.tsx`.
- Legal routes: `/privacy`, `/terms`.
- Active-section nav highlighting.

# Commands

- `npm run dev` — `http://localhost:3000` (Preview MCP via `scripts/dev.cmd`).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run build` — production build (run `.next` cleanup first).
