# Visual Storytelling Architecture

## The contract

**No ordinary content sections.** Every section is a *stage*, not a text block.
Before building a section, name its **single visual story** and the gesture that
carries it (an ink stroke becoming a network, a number resolving, a step
igniting). If a section is just copy in a box, it isn't done.

Each section must be **enhancement-ready** along these five vectors. The
primitives below exist so adding them is composition, not new plumbing.

| Vector | Primitive | Status |
|---|---|---|
| Scroll narratives | `useScrollStory` (`lib/animation`) | ✅ in use (Graphotherapy, Journey) |
| GSAP timelines | `useScrollStory` + `lib/animation/gsap` singleton | ✅ |
| Image sequences | `ImageSequence` (`components/story`) | ✅ ready (awaiting frames) |
| 3D interactions | `LazyScene` (`components/three`) + `three/scenes/*` | ✅ ready (Hero is reference) |
| Cinematic transitions | shared dark palette + pinned overlap + `motion/*` | ✅ pattern documented below |

## Primitives

### `useScrollStory({ trackRef, build, setStatic })`
The backbone for any pinned, scroll-scrubbed section. Owns reduced-motion
fallback, `gsap.context` scoping + cleanup, the ScrollTrigger scrub, and
`refresh()`. The section supplies only its timeline (`build`) and resolved
static state (`setStatic`), and reads back `staticMode` to swap layout.

```tsx
const trackRef = useRef<HTMLDivElement>(null);
const { staticMode } = useScrollStory({
  trackRef,
  setStatic: (root) => gsap.set(root.querySelectorAll(".x-thing"), { opacity: 1 }),
  build: (tl) => tl.to(".x-thing", { opacity: 1, duration: 1 }, 0),
});
```

### `ImageSequence`
Pinned, DPR-aware, cover-fit `<canvas>` that paints one frame per scroll
position. Give it `frameCount` + `getFrameSrc`. Inherits reduced-motion (last
frame) via `useScrollStory`.

### `LazyScene`
Mounts any R3F `<Canvas>` lazily: code-split, post-paint, WebGL-guarded, with a
static `poster` fallback. Generalises the Hero's WebGL strategy.

### Motion language (`components/motion`)
`StaggerGroup` / `RevealItem` / `Reveal` for entrance choreography;
`InkFlourish` for the handwriting motif; `variants.ts` for the shared
`rise`/`fade`/`lift` vocabulary.

## Cinematic transitions (between sections)

Achieved by convention, not a heavy engine:
- **One palette** — every section sits on `bg-ink`, so section boundaries
  dissolve rather than cut. Light "exhale" bands (`SectionShell theme="paper"`)
  are deliberate, rare punctuation.
- **Pinned overlap** — a pinned section's last beat seeds the next section's
  first (e.g. Graphotherapy ends on "The 3-Step Transformation Journey", which
  *is* the next section's subject). End each story on the next one's hook.
- **Reveal on enter** — non-pinned sections use `Reveal`/`StaggerGroup`
  (`trigger="inView"`) so content arrives, never just appears.

## Checklist for a new section

1. State the one visual story + carrying gesture.
2. Build the static, SSR'd copy first (SEO + reduced-motion truth).
3. Choose a primitive: `useScrollStory` (narrative), `ImageSequence` (frames),
   `LazyScene` (3D), or `Reveal`/`StaggerGroup` (entrance).
4. Compose design-system tokens/components only — no bespoke styling.
5. Provide a reduced-motion static state.
6. Verify: `typecheck` → `build` → screenshot each beat → fix.
