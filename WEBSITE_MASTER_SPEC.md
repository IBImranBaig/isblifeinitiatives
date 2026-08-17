# WEBSITE_MASTER_SPEC.md

> The complete specification of **Imran Baig — "The Mind Decoder."** Everything a
> fresh session needs to understand and extend the site. Pair with
> `PROJECT_STATE.md` (status/ops) and `PREMIUM_ENHANCEMENT_ROADMAP.md` (future).

---

## 1. Brand & positioning
- **Name:** Imran Baig · **Title:** "The Mind Decoder"
- **Promise:** one glance at your handwriting reveals 128+ aspects of personality & health.
- **Feel:** Apple + Neuralink + MasterClass + luxury psychology. NOT a coaching site.
- **Principles:** ultra-premium, minimal, cinematic, interactive, emotional, future-forward.
- **Voice:** calm authority; short declarative sentences; no hype, no exclamation marks.

---

## 2. Section order & story flow (the running order)
Defined in `app/page.tsx`. Five-act narrative: **intrigue → believe → desire → trust → act.**

| # | Section | `id` | Act | Job | Format |
|---|---|---|---|---|---|
| — | **Nav** (global) | — | — | wayfinding + persistent CTA | sticky, glass-on-scroll |
| 1 | **Hero** | (none) | Reveal | Stop them. Plant "128 aspects." | WebGL (R3F) + Framer |
| 2 | **Graphotherapy** | `method` | Believe | *What* it is. Climax "128." | GSAP pinned scrub |
| 3 | **Dimensions** | `dimensions` | Desire | *How much it reveals* — 6 dimensions | interactive (hover) |
| 4 | **Neuroscience** | `neuroscience` | Believe | *Why* it works (Fig.01–03) | GSAP pinned scrub |
| 5 | **Journey** | `journey` | Desire | *How* you transform (3 steps) | GSAP pinned scrub |
| 6 | **About** | `about` | Trust | The guide (22+ yrs, press) | editorial reveal |
| 7 | **Recognition** | `recognition` | Trust | Experts vouch | editorial reveal |
| 8 | **Podcasts** | `podcasts` | Trust | Discussed publicly | editorial reveal |
| 9 | **Testimonials** | `testimonials` | Trust | Real client stories | editorial reveal |
| 10 | **Trustpilot** | `trustpilot` | Trust | Proof at scale (9,098+) | count-up reveal |
| 11 | **HowItWorks** | `how-it-works` | Act | The engagement (what happens) | card reveal |
| 12 | **Invitation** | `invitation` | Act | Emotional climax (bookends Hero) | reveal, void |
| 13 | **Begin** | `book` (+form `analysis`) | Act | **Conversion form** | form + API |
| — | **Footer** (global) | — | — | contact, social, legal | editorial |

**Narrative logic:** What → how-much-it-reveals → why-it's-real → how-you-change →
who (guide) → who-vouches → results → what-happens-next → the invitation → the act.

**Notes / history:** Dimensions was deliberately moved *before* Neuroscience (pacing
relief between the two long pinned sections + "128 → six dimensions" adjacency).
Graphotherapy's closing teaser now leads into Dimensions ("All six dimensions of you").
The "write ↔ think" thesis is owned by Graphotherapy; Neuroscience Fig.03 describes the
*mechanism* (two-way motor pathway), not a restatement.

---

## 3. Design system

### Color palette — "Luxury Blue" (90% darkness · 8% paper · 2% glow)
Tokens in `app/globals.css` `@theme`. Used as `text-ink`, `bg-ember`, `border-line`, `/opacity` modifiers.
```
--color-ink:        #05080f   /* deep navy-black void (body bg) */
--color-ink-2:      #0a1020
--color-graphite:   #121a2e
--color-paper:      #eef2fa   /* cool platinum white (text) */
--color-paper-dim:  #97a3bd
--color-ember:      #5b86e8   /* PRIMARY accent — royal azure */
--color-ember-soft: #a9c2ff   /* ice blue */
--color-ember-deep: #2a4ea0   /* deep sapphire */
--color-glow:       #62c0ff   /* luminous sky-blue — "data/science" accent */
--color-glow-soft:  #b8e2ff
--color-glow-deep:  #2f7fc0
--color-surface:    #0e1626   /* raised panel */
--color-surface-2:  #14203a
--color-line:       #1f2c44   /* hairline border */
```
Cards/pills also use raw `white/[0.03]` fills + `white/10` borders. Hardcoded rgba in
inline gradients use ember `rgba(91,134,232,…)` and ink `rgba(5,8,15,…)`.
**Rule:** ember = the warm-position primary; glow = reserved for data/science moments.

### Typography
- **Display:** Playfair Display → `font-display` (`--font-playfair`). High-contrast Didone.
- **Sans/UI:** Inter → `font-sans` (`--font-inter`).
- **Display scale** (fluid clamps, paired line-heights): `text-display-sm | -md | -lg | -xl`.
  - sm `clamp(1.75,3vw,2.5rem)` · md `clamp(2.25,5vw,3.75rem)` · lg `clamp(2.75,8vw,6rem)` · xl `clamp(3,11vw,9.5rem)`
- **Body:** `text-lead` (`clamp(1,1.4vw,1.125rem)`) + Tailwind `text-base/text-sm`.
- **Heading device (overused — vary going forward):** most headings put the last word in
  *italic ember* (`<span className="italic text-ember-soft">word.</span>`). Audit flagged this.

### Radius & spacing
- `rounded-card` (1.25rem), `rounded-pill` (9999px).
- Section rhythm: `py-section` (6rem) / `py-section-lg` (10rem) via `SectionShell`.
- Page gutter (single source): `Container` = `px-6 sm:px-10 lg:px-[7vw]`, max-w default `6xl`.
- Breakpoints: Tailwind defaults (sm 640, md 768, lg 1024). Pinned/editorial go multi-column at `lg`.

### UI primitives (`src/components/ui/`)
- `Container` — gutter + max-width (`default`/`wide`/`full`).
- `SectionShell` — `<section>` landmark: vertical rhythm + `ink`/`paper` theme band + Container.
- `Heading` (`as`, `size`) · `Text` (`lead`/`body`/`fine`).
- `Eyebrow` (small-caps ember kicker, optional `rule`) · `Pill` (frosted badge, cool `dot`).
- `Button` — `primary` / `link` / `ghost`; `withArrow`; polymorphic (`href` → `<a>`, else `<button>`; supports `type`, `disabled`).
- `Card` — frosted surface (`interactive` hover-lift, `flush`).

---

## 4. Animation architecture
**One scroll clock, three engines, cleanly separated.**

- **Lenis** (smooth scroll) in `SmoothScrollProvider`:
  - ticked by `gsap.ticker`; `lenis.on('scroll', ScrollTrigger.update)`.
  - stored in a module singleton `src/lib/animation/lenis.ts` (`setLenis`/`getLenis`) so
    non-provider components (Nav, SmoothLink) can `lenis.scrollTo(el, { offset: -72 })`.
  - disabled entirely under `prefers-reduced-motion`.
- **GSAP + ScrollTrigger** via singleton `src/lib/animation/gsap.ts` (registers plugin once).
  - `src/lib/animation/useScrollStory.ts` is THE pinned-narrative engine: handles
    reduced-motion static fallback, `gsap.context` scoping + cleanup, a ScrollTrigger-scrubbed
    timeline (`start top top`, `end bottom bottom`, `scrub 0.8`), and refresh.
    Consumer provides `build(tl, root)` + `setStatic(root)`; receives `{ staticMode }`.
    **Used by:** Graphotherapy, Neuroscience, Journey, and `ImageSequence`.
  - Pattern for pinned sections: a tall track (`h-[NNNvh]`) + a sticky stage
    (`sticky top-0 h-[100svh]`); GSAP scrubs `.<prefix>-*` class targets; reduced-motion
    swaps to a normal-flow fully-revealed layout via `staticMode`.
- **Framer Motion** (DOM): `src/components/motion/`
  - `variants.ts` — `rise` / `fade` / `lift` / `staggerContainer` + re-exports `EASE`/`DURATION`.
  - `StaggerGroup` (orchestrator: `trigger` mount|inView, `delayChildren`) + `RevealItem` (child) + `Reveal` (standalone inView).
  - `InkFlourish` — the brand's handwritten swash (SVG `pathLength` draw-on); reusable.
- **R3F (Hero only):** single `<Canvas>` (`three/Canvas/SceneCanvas.tsx`) with the
  NeuralNetwork lattice + FloatingParticles + custom point shader. Mounted lazily by
  `Hero/HeroCanvas.tsx` via `dynamic(ssr:false)` AFTER first paint, behind a CSS poster,
  with a WebGL-support guard + DPR clamp `[1,1.75]`. Reduced motion freezes it.
- **Easing language** (`src/lib/animation/easings.ts`): `EASE.settle / .ink / .out`,
  `DURATION.fast/base/slow/cinematic`. CSS mirrors: `--ease-settle/-ink/-out`.
  Brand rule: **"settle, never bounce"** — heavy, slow, inevitable.
- **CSS keyframes** in `globals.css`: `ns-scan-sweep` (Neuroscience MRI line),
  `wave-pulse` (Podcasts waveform, on hover). `.grain` utility = film grain overlay.
- **Reduced motion:** every section has a static fallback; a global media query also
  neutralizes CSS animations/transitions.

---

## 5. Per-section reference (visual + content + interaction)
GSAP class prefixes in parentheses.

1. **Hero** — full-screen void. WebGL neural network + warm/cool ink-dust (now blue),
   springed mouse parallax, scroll-indicator. SVG ink overture (2s draw-on intro,
   `InkOverture`), cursor reading-light (`CursorGlow`). Copy: eyebrow "Imran Baig",
   H1 "The Mind / *Decoder*", lead with "128 aspects", CTAs "Book a Consultation" (#book) +
   "Try Free Analysis" (#analysis), trust line "22+ Years · 300,000+ Minds Decoded".
2. **Graphotherapy** (`gt-`) — pinned 5-beat: hook ("…cross your t's…") → explanation →
   key message "the way you write influences the way you think" → "128" climax →
   transition "All six dimensions of you". Visual: ink stroke → neural network (`InkToNeural`).
3. **Dimensions** — interactive radial **constellation** (`Constellation`) + 6 hover cards
   (Mind/Body/Soul/Career/Relationships/Parenting); hovering a card ignites its node.
4. **Neuroscience** (`ns-`) — pinned documentary. Brain scan (`BrainScan`, ambient MRI
   scan-line) + Fig.01 Whole-Brain Activation, Fig.02 Deep Neural Encoding, Fig.03
   Bidirectional Influence (mechanism copy) → "a pen can rewrite a life". "2025 Neuroscience
   Research" pill. Warm-ember "THE HAND" node vs cool brain.
5. **Journey** (`jt-`) — pinned vertical timeline; progress rail fills warm→cool; 3 steps
   (Analyze / Understand / Transform) activate in turn; nodes ignite + sprout branches.
6. **About** — editorial 2-col: chiaroscuro `PortraitFrame` (drawn `Signature` placeholder)
   + "22+" `CountUp` badge; narrative; pull quote "Visitors arrive to decode handwriting…";
   press masthead (Times of India, Mid-Day, Bangalore Mirror, The Hindu, DNA, The New Indian Express).
7. **Recognition** — featured Demartini quote + "council" of monogram `Medallion`s (JC, MP,
   RB, VM, MV) linked by a faint "thread of trust". Not a logo wall.
8. **Podcasts** — editorial index rows (Figuring Out/Raj Shamani, Marketing Secrets/Russell
   Brunson, Let's Talk Clarity/Suman Agarwal [real YT link], The Habit Coach/Ashdin Doctor
   [real YT link]) with `Waveform` that "plays" on hover + play button.
9. **Testimonials** — quote-led asymmetric: featured skeptic→believer (Dr. Emily Watson) +
   Sarah Chen + wide `VideoTestimonial` (Michael Roberts, poster placeholder).
10. **Trustpilot** — giant "9,098+" `CountUp` + azure "Verified on Trustpilot" shield (links
    `trustpilot.com/review/imranbaig.com`) + 5 stars + phyllotaxis `ScaleField` point-cloud.
11. **HowItWorks** — 3 cards (First "Share a sample" / Then "A private decoding" / Finally
    "Your graphotherapy") + "Private · By appointment · Online or in person". (The *engagement*,
    distinct from the Journey *method*.)
12. **Invitation** — return to the void; recap pivot ("…what handwriting reveals in others") →
    "Now discover what *your own* handwriting reveals." + `InkFlourish`; CTAs "Decode Yourself"
    (#book) + "Begin with a free analysis" (#analysis); whisper "Private · Confidential · …".
13. **Begin** — the conversion form (see §7).

---

## 6. Navigation structure (`src/components/layout/Nav.tsx`)
- Global, fixed top, `z-50`. **Transparent at top → frosted glass** (`bg-ink/70 backdrop-blur-xl`
  + hairline) once `window.scrollY > 24`.
- Logo "Imran Baig" (serif) → smooth-scroll to top.
- Desktop links: **Method** (#method) · **About** (#about) · **Podcasts** (#podcasts) · **Reviews** (#testimonials).
- Right: **"Book Analysis"** pill → `#book`.
- Mobile (`<md`): hamburger → full-screen glass menu (links + CTA), scroll-locked while open.
- All in-page links smooth-scroll via `getLenis().scrollTo(el, { offset: -72 })` (native fallback).
- Overture covers nav during the 2s intro (`z-[60] > z-50`).

---

## 7. CTA flow & conversion flow
**All CTAs funnel to the Begin form** (`#book` = section, `#analysis` = the `<form>`):
- Nav "Book Analysis" → `#book`
- Hero "Book a Consultation" → `#book` · "Try Free Analysis" → `#analysis`
- Invitation "Decode Yourself" → `#book` · "Begin with a free analysis" → `#analysis`
- Footer "Begin a free analysis" → `#book`
- HowItWorks → (no CTA; flows into Invitation → Begin)

**Conversion form** (`src/components/sections/Begin/` — `index.tsx` server shell +
`ConversionForm.tsx` client):
- Fields: **Handwriting sample** (drag-&-drop / browse; image preview; PNG/JPG/PDF; 10MB cap) →
  **Name** (req) → **Email** (req, validated) → **Phone** (opt) → **Message** (opt).
- Client validation; states: idle / submitting / success ("Received, {first name}.") / error.
- Submits multipart `FormData` to **`POST /api/lead`** (`app/api/lead/route.ts`).
- API validates name+email, logs the lead (file metadata), returns `{ ok }`.
  **TODO:** deliver the lead (email Imran + store sample) — currently acknowledge-only.

---

## 8. SEO / rendering
- Page is **server-rendered & static-prerendered**; all copy is real HTML (client islands
  are SSR'd too) — readable without JS. `/api/lead` is the only dynamic route.
- Metadata + viewport in `app/layout.tsx` (title template, description, OpenGraph, themeColor `#05080f`).
- Semantic landmarks: one `<h1>` (Hero), `<section aria-label>` per section, `<nav>`/`<footer>`.
- **Not yet added:** sitemap.ts, robots.ts, manifest.ts, JSON-LD (Person/Org/Review/FAQ),
  dynamic OG image. (See roadmap.)

---

## 9. Conventions for new sections (the contract)
1. Name the section's **single visual story** + carrying gesture (no plain content blocks).
2. Server shell renders copy (SEO); wrap interactivity in client islands.
3. Compose **design-system primitives + tokens only** — no bespoke colors/spacing/buttons.
4. Pinned/scrubbed? use `useScrollStory`. Entrance? `Reveal`/`StaggerGroup`. Provide a
   **reduced-motion static state**.
5. Give it an `id` and add to `app/page.tsx` in narrative order.
6. Verify: `typecheck` → `build` (after the `.next` cleanup) → screenshot each beat → fix.
See `STORYTELLING.md` for the contract and `DESIGN_SYSTEM.md` for the token/primitive map.
