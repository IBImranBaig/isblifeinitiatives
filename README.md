# Imran Baig — The Mind Decoder

Premium personal brand website. **Hero section only** (per current scope).

Stack: Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Three.js · React Three Fiber · Lenis.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## Verify

```bash
npm run typecheck   # tsc --noEmit
npm run build       # production build
```

## What's built

- `app/` — root layout (fonts, smooth-scroll provider, metadata) + page mounting only the Hero.
- `src/components/sections/Hero/` — server shell + content island + lazy WebGL mount.
- `src/components/three/` — single shared `<Canvas>`, the neural-network lattice, floating particles.

### Hero feature checklist
- Full-screen (`100svh`), responsive typography (`clamp()`), mobile quality tier.
- Three.js neural-network background (nodes + connecting lines) on one GL context.
- Floating particle dust on a separate parallax plane.
- Smooth parallax: mouse (springed) + scroll (Framer `useScroll`).
- Luxury type: Playfair Display (display) + Inter (UI).
- Performance: lazy/post-paint canvas, DPR clamp `[1, 1.75]`, static gradient poster as the no-WebGL/LCP fallback.
- Accessibility: server-rendered copy, semantic `<h1>`, `prefers-reduced-motion` freezes the scene and disables parallax.

> Note: `requestIdleCallback` types may need `dom` lib (already enabled in `tsconfig.json`).
