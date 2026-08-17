# PREMIUM_ENHANCEMENT_ROADMAP.md

> Forward plan for **Imran Baig — "The Mind Decoder."** The structure is complete
> and build-green; this is how to elevate it from "stunning demo" to "elite,
> converting brand." Ordered by impact. Pair with `PROJECT_STATE.md` (ops) and
> `WEBSITE_MASTER_SPEC.md` (current spec).

---

## 0. Enhancement primitives already in place (use these)
Two reusable, documented primitives exist but are **not yet wired into any section** —
they're the runway for the upgrades below:
- **`src/components/story/ImageSequence.tsx`** — pinned, DPR-aware, cover-fit `<canvas>`
  that paints one frame per scroll position (Apple-style). Driven by `useScrollStory`
  (inherits reduced-motion = last frame). Props: `frameCount`, `getFrameSrc(i)`, `heightVh`.
- **`src/components/three/LazyScene.tsx`** — mounts any R3F `<Canvas>` lazily: code-split
  (`dynamic ssr:false`), post-paint, WebGL-guarded, with a static `poster` fallback.
  Props: `load: () => import(...)`, `poster`.

Each section was built with a **documented swappable visual slot** (search code for
`ENHANCEMENT SLOT`):
| Section | Slot component | Swap target |
|---|---|---|
| Hero | `SceneCanvas`/`NeuralNetwork` | already 3D; add ink→data handoff |
| Neuroscience | `BrainScan` (SVG) | real fMRI `ImageSequence` / 3D brain `LazyScene` |
| About | `PortraitFrame` (+`Signature`) | cinematic portrait `ImageSequence` / 3D bust |
| Recognition | `Monogram` discs | real headshots / 3D medallion ring |
| Podcasts | `Waveform` | hover video-thumbnail `ImageSequence` / 3D visualiser |
| Testimonials | `VideoTestimonial` poster | real `<video>` / `ImageSequence` |
| Trustpilot | `ScaleField` point-field | drifting/3D "swarm of minds" `LazyScene` |
| Invitation | the void | particles "reforming into a word" `LazyScene`/`ImageSequence` |

**Performance budget when adding WebGL:** prefer ONE shared context; lazy-mount via
`LazyScene` (post-paint, on-approach); pause render loops offscreen; clamp DPR;
always ship a CSS/SVG poster fallback + reduced-motion path. Keep `/` First Load JS lean
(three.js must stay code-split, not in the main bundle).

---

## 1. Substance — REQUIRED before launch (highest impact, not optional)
These were flagged in the full-site audit; they're the gap between "demo" and "brand."
1. **Deliver leads.** Wire `app/api/lead/route.ts` (TODO) to a real channel — e.g. Resend
   (email Imran) + object storage (S3 / Drive / UploadThing) for the sample, or a form
   provider. Add spam protection (honeypot / rate-limit / Turnstile). The form already POSTs here.
2. **Real assets:**
   - A true **chiaroscuro portrait of Imran** for About (`PortraitFrame`).
   - Real **expert photos** for Recognition (or keep monograms as a deliberate style).
   - **Genuine testimonials** (named, ideally one real video) — current names read placeholder.
3. **Reconcile & substantiate claims:** Hero "300,000+ minds" vs Trustpilot "9,098+" vs
   "22+ years"; back the "2025 Neuroscience Research" line with real citations or soften it.
4. **Replace placeholder links:** contact email, social URLs, Privacy Policy, Terms.
5. **Legal pages:** real `/privacy` + `/terms` (handwriting = personal data — make privacy prominent).

## 2. Quick craft wins (low effort, high polish)
- **Vary the heading formula** — ~8 headings use *italic-ember-last-word*; diversify 2–3.
- **Shorten pinned tracks on mobile** (Graphotherapy/Neuroscience/Journey) so the mobile
  scroll journey isn't fatiguing.
- **SEO scaffolding:** `app/sitemap.ts`, `robots.ts`, `manifest.ts`, JSON-LD
  (`Person`, `ProfessionalService`, `Review`/`AggregateRating`, `FAQPage` for method),
  and a dynamic `opengraph-image.tsx`.
- **Active-section nav state** (highlight the current section in the nav via ScrollTrigger/IO).
- **Free-analysis as the hero lead magnet** — make "Try Free Analysis" feel distinct from
  "Book a Consultation" (it's the low-friction entry).

## 3. Image-sequence plans (use `ImageSequence`)
- **Neuroscience → fMRI scan loop:** drop a real frame sequence behind `BrainScan`; keep
  the `.ns-region` overlays + Fig copy on top. The single most "documentary" upgrade.
- **About → cinematic portrait reveal:** a slow dolly/parallax of editorial portrait frames
  scrubbed on scroll; signature + caption + "22+" badge stay as overlays.
- **Hero → ink-writing sequence (optional):** a frame sequence of a pen writing the wordmark
  as the overture, handing off to the WebGL field.
- **Podcasts → hover video previews:** a short `ImageSequence` per row on hover (waveform as poster).

## 4. 3D plans (use `LazyScene`)
- **Invitation → "reforming into a word":** the hero's scattered particles converge into a
  single handwritten word — the literal full-circle bookend. Highest narrative payoff.
- **Neuroscience → 3D brain:** rotatable/illuminating regions; `BrainScan` SVG as poster.
- **Dimensions → 3D constellation:** the six-node ring in depth, cursor-orbited.
- **Trustpilot → 3D point-cloud swarm:** `ScaleField` becomes a living "cloud of minds."
- **Recognition → 3D medallion ring:** the council as floating discs.
- **Foundation work:** add offscreen render-loop pausing + a capability/quality tier
  (`PerformanceMonitor`-style) before shipping multiple contexts; keep Hero as the reference.

## 5. Premium interaction plans
- **The "reading lens"** (from the brand brief): near the cursor on the Hero handwriting,
  surface faint analytical annotations/ticks — "something here can see me."
- **Magnetic buttons** + refined hover micro-physics (extend `Button`).
- **Ink-trail cursor** / cursor-reactive light beyond the current `CursorGlow`.
- **Scroll-velocity effects** (skew/elongation tied to Lenis velocity) — used sparingly.
- **Section-to-section cinematic transitions** (cross-fades / shared-element handoffs;
  the dark palette already lets sections dissolve).
- **Sound design (optional, off by default):** a subtle ambient + UI ticks; respect a mute
  preference and reduced-motion.
- **Micro-interactions on the form** (Begin): animated upload success, field focus motion.

## 6. Possible structural/content additions (evaluate, not committed)
- **"The 128 aspects"** explorable index (an interactive grid of what handwriting reveals) —
  the brand's signature scale claim, currently only stated.
- **An "Is this you?" empathy beat** (name the visitor's pain) between Hero and the method —
  sharpens the emotional hook.
- **Journal / essays** route for thought-leadership SEO ("graphotherapy", "handwriting analysis").
- **Booking/scheduler integration** (Cal.com / Calendly) as the consultation path, alongside
  the free-analysis capture.

---

## Guardrails (keep the bar high)
- Maintain the design system + tokens; new work composes primitives.
- Every enhancement needs a **reduced-motion fallback** and a **mobile** check.
- Keep `/` static and three.js code-split; lazy + poster everything heavy.
- Verify each change: `typecheck` → clean `.next` build (see PROJECT_STATE quirk #3) →
  screenshot desktop + mobile → console clean.
- Content authenticity > visual flourish: ship the real portrait/testimonials/lead-delivery
  before adding more 3D.
