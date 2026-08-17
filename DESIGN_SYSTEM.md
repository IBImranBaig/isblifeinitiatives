# Design System — "The Mind Decoder"

All tokens live in `app/globals.css` (`@theme`). All sections compose the
primitives below — **no section hand-rolls color, spacing, type, buttons,
cards, or motion.** The Hero is the reference implementation.

## Tokens (`@theme` in `app/globals.css`)

**Color** — `ink`, `ink-2`, `graphite` (void) · `paper`, `paper-dim` (light) ·
`ember`, `ember-soft`, `ember-deep` (warm) · `glow`, `glow-soft`, `glow-deep`
(the lone cold "data" accent) · `surface`, `surface-2`, `line` (cards/hairlines).
Used as `text-ember`, `bg-ink`, `border-line`, with `/opacity` modifiers.

**Type scale** → `text-display-sm | -md | -lg | -xl` (fluid clamps, paired
line-heights) and `text-lead`. Families: `font-display` (Playfair), `font-sans` (Inter).

**Radius** → `rounded-card`, `rounded-pill`.

**Spacing rhythm** → `py-section`, `py-section-lg` (applied by `SectionShell`);
gutter is owned by `Container` (`px-6 sm:px-10 lg:px-[7vw]`).

**Easing** → `--ease-settle`, `--ease-ink`, `--ease-out` (CSS) /
`EASE`, `DURATION` (TS, `src/lib/animation/easings.ts`).

## Primitives

| Component | Path | Purpose |
|---|---|---|
| `Container` | `ui/Container` | Page gutter + max-width (`default/wide/full`). |
| `SectionShell` | `ui/SectionShell` | Section landmark: vertical rhythm + `ink`/`paper` band. |
| `Heading` | `ui/Heading` | Display titles (`as`, `size`). |
| `Text` | `ui/Text` | Body copy (`lead`/`body`/`fine`). |
| `Eyebrow` | `ui/Eyebrow` | Small-caps section kicker (+ optional `rule`). |
| `Pill` | `ui/Pill` | Frosted badge; `dot` = cold accent. |
| `Button` | `ui/Button` | CTAs: `primary` / `link` / `ghost` (+ `withArrow`, polymorphic `a`/`button`). |
| `Card` | `ui/Card` | Frosted surface (`interactive`, `flush`). |

## Animation language

| Component | Path | Purpose |
|---|---|---|
| `StaggerGroup` | `motion/StaggerGroup` | Orchestrates a sequence (`trigger`, `delayChildren`). |
| `RevealItem` | `motion/RevealItem` | A single staggered child (inherits timing). |
| `Reveal` | `motion/Reveal` | Standalone scroll-reveal for one element. |
| `InkFlourish` | `motion/InkFlourish` | The handwritten signature stroke. |
| `variants.ts` | `motion/variants` | `rise` / `fade` / `lift` / `staggerContainer`. |

## How a future section is built

```tsx
<SectionShell id="method" label="Discover Grapho-Therapy" theme="ink">
  <StaggerGroup>
    <RevealItem><Eyebrow rule>The Science of Subconscious</Eyebrow></RevealItem>
    <RevealItem><Heading as="h2" size="lg">It Looks Like Magic.</Heading></RevealItem>
    <RevealItem><Text variant="lead">…</Text></RevealItem>
    <RevealItem><Button variant="primary" href="#book" withArrow>Book a Consultation</Button></RevealItem>
  </StaggerGroup>
</SectionShell>
```
