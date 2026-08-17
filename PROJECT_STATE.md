# PROJECT_STATE.md

> Snapshot for continuing **Imran Baig — "The Mind Decoder"** in a fresh session
> with zero prior context. Read this first, then `WEBSITE_MASTER_SPEC.md` and
> `PREMIUM_ENHANCEMENT_ROADMAP.md`.

## What this is
A premium, single-page personal-brand website for **Imran Baig**, a handwriting
analyst / graphotherapist ("The Mind Decoder"). Cinematic, dark-luxury,
documentary-grade. Apple × Neuralink × MasterClass × luxury-psychology feel.

## Status: structurally complete, build-green
All 13 sections + nav + footer + a working conversion endpoint are built. The
site reads top-to-bottom as a five-act narrative and the funnel is wired end to
end. Remaining work is **substance, not structure** (real assets, lead
delivery) + optional premium enhancements (see roadmap).

## Tech stack
- **Next.js 15** (App Router; resolved 15.5.18) · **React 19** · **TypeScript (strict)**
- **Tailwind CSS v4** — tokens live in `app/globals.css` `@theme` (no tailwind.config for tokens)
- **Framer Motion v11** — DOM micro-motion / reveals
- **GSAP 3 + ScrollTrigger** — pinned scroll-scrub narratives
- **Three.js + @react-three/fiber v9** — Hero WebGL only (one canvas)
- **Lenis** — inertia smooth scroll (synced to GSAP ticker + ScrollTrigger)
- Self-hosted Google fonts via `next/font`: Playfair Display (display), Inter (sans)

## Repo layout
```
app/
  layout.tsx          # fonts, <SmoothScrollProvider>, <Nav>, {children}, <Footer>, metadata
  page.tsx            # section composition (the running order)
  globals.css         # @theme design tokens + keyframes + base
  api/lead/route.ts   # conversion endpoint (POST multipart)
src/components/
  layout/   Nav.tsx, Footer.tsx, SmoothLink.tsx
  providers/ SmoothScrollProvider.tsx
  motion/   variants.ts, StaggerGroup.tsx, RevealItem.tsx, Reveal.tsx, InkFlourish.tsx
  ui/       Container, SectionShell, Eyebrow, Pill, Heading, Text, Button, Card
  story/    ImageSequence.tsx        # enhancement primitive (unused, ready)
  three/    LazyScene.tsx            # enhancement primitive (unused, ready)
            Canvas/SceneCanvas.tsx
            scenes/NeuralNetwork/ (NeuralNetwork, FloatingParticles, particleMaterial, useNeuralData)
  sections/ Hero, Graphotherapy, Neuroscience, Dimensions, Journey, About,
            Recognition, Podcasts, Testimonials, Trustpilot, HowItWorks,
            Invitation, Begin
src/lib/
  animation/ easings.ts, gsap.ts, useScrollStory.ts, lenis.ts
  hooks/    usePointer.ts
  utils/    cn.ts
Docs: PROJECT_STATE.md, WEBSITE_MASTER_SPEC.md, PREMIUM_ENHANCEMENT_ROADMAP.md,
      DESIGN_SYSTEM.md, STORYTELLING.md, README.md
```

## ⚠️ Environment quirks (Windows machine — READ before running anything)
1. **Node is NOT on PATH.** It lives at `C:\Program Files\nodejs`. In every
   PowerShell/Bash call, prepend it first:
   `$env:Path = "$env:ProgramFiles\nodejs;$env:Path"; npm run ...`
   (`python`/`python3` are non-functional Microsoft Store stubs — ignore them.)
2. **Preview dev server** is launched by the Claude Preview MCP via
   `.claude/launch.json`, which points `runtimeExecutable` at **`scripts/dev.cmd`**
   (a wrapper that fixes PATH then runs `npm run dev`). Don't change it back to bare `npm`.
3. **The `.next` build race (the #1 recurring failure).** `next build` fails with
   `__webpack_modules__[moduleId] is not a function`, `PageNotFoundError /_not-found`,
   or `.nft.json ENOENT` **when an orphaned `next dev` process is alive** (the
   preview "stop" sometimes leaves `start-server.js` running) or when build/dev
   share `.next`. **Fix / prevention before any build:**
   ```powershell
   $env:Path = "$env:ProgramFiles\nodejs;$env:Path"
   $c = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
   if($c){ $c.OwningProcess | Select-Object -Unique | % { Stop-Process -Id $_ -Force } }
   Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
     ? { $_.CommandLine -like '*imran*' } | % { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
   Remove-Item "C:\Users\Chetan\Desktop\imran\website\.next" -Recurse -Force -ErrorAction SilentlyContinue
   npm run typecheck; npm run build
   ```
   Never run `next build` while the preview dev server is running.
4. **Screenshot tool is flaky:** scroll drifts during capture, custom viewport
   widths desync the capture surface (content renders in a corner / clipped), and
   it occasionally times out (retry, or inject `*{animation:none!important}` to
   reach a stable frame). **Most reliable pattern:** to screenshot a below-the-fold
   section, temporarily reorder it FIRST in `page.tsx`, capture at native size,
   then revert. Verify true layout with DOM `getBoundingClientRect` evals.
5. **Dev-only debug handles:** `window.__lenis` and `window.ScrollTrigger` are
   exposed when `NODE_ENV === "development"` (in `SmoothScrollProvider` /
   `lib/animation/gsap.ts`) for driving scroll in tests. Harmless in prod.

## Commands
```
npm install
npm run dev         # http://localhost:3000  (or via Preview MCP using scripts/dev.cmd)
npm run typecheck   # tsc --noEmit
npm run build       # production build (do the cleanup in quirk #3 first)
```

## Verification status
- `typecheck` ✅ · `build` ✅ (page `/` static-prerendered; `/api/lead` dynamic).
- Every section verified desktop + mobile, console clean, no horizontal overflow.
- Conversion endpoint tested: valid → `{ok:true}`, invalid → `400`; client validation fires.

## Git
- Repo initialized; default branch `main`. Two commits exist:
  `hero-complete-design-system-complete`, `storytelling-foundation-complete`.
- **Everything after the second commit is uncommitted** in the working tree
  (Neuroscience, About, Recognition, Podcasts, Testimonials, Trustpilot, HowItWorks,
  Invitation, Begin/endpoint, Nav, Footer, the luxury-blue palette, the reorder).
- `.gitignore` excludes node_modules, .next, *.tsbuildinfo. Commit messages end with:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. Only commit when asked.

## Known placeholders to replace with real content
- `/api/lead` **acknowledges but does not deliver** leads — wire to email/storage (TODO in file).
- Contact email `hello@imranbaig.com`, all **social links** (`#`), **Privacy/Terms** (`#`) — placeholders.
- **No real portrait of Imran** (About uses a signature placeholder).
- **Recognition** uses monogram initials, not expert photos.
- **Testimonials** names (Sarah Chen / Dr. Emily Watson / Michael Roberts) read as
  placeholders + the video is an empty poster — confirm/replace with real ones.
- Reconcile claim numbers: Hero "300,000+ minds" vs Trustpilot "9,098+" vs "22+ years";
  substantiate "2025 Neuroscience Research".
