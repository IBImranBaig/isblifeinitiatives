# HANDOFF — Current State (supersedes all older PROJECT_MEMORY*.md)

Authoritative snapshot of the Imran Baig site. Read THIS first.

---

## 🔴 LATEST SESSION UPDATE (read first — supersedes older deploy notes below)

**Repo / deploy moved to a NEW account:**
- **GitHub origin:** `https://github.com/IBImranBaig/ImranBaigWebsite.git` (private). Old `lordchethan/imranbaigwebiste` kept as remote **`old-lordchethan`** (abandoned).
- **Vercel:** new project `imran-baig-website` (Hobby plan) under "Imran Baig's projects". Auto-deploys on push to `main`. Live URLs: `imran-baig-website.vercel.app`.
- **LIVE DOMAIN: `https://imranbaig.com`** (✅ live). Config in Vercel Domains: `imranbaig.com` = **Production (serves directly)**, `www.imranbaig.com` = **308 → imranbaig.com**.
- **DNS** is at **Hostomy → ioPanel → DNS Manager** (nameservers `ns1/ns2.oxygen.hosting-control.net`). Records: `A @ → 216.198.79.1` (Vercel), `CNAME www → 7f3f3b5b9d4769c8.vercel-dns-017.com.`, **AAAA `@` was DELETED** (Vercel has no IPv6 apex). **MX = Google Workspace (`smtp.google.com`) — DO NOT touch; do not switch to Vercel nameservers (breaks email).**

**⚠️ COMMIT-AUTHOR REQUIREMENT (critical):** Vercel Hobby + private repo **blocks deploys whose commit author isn't the account owner.** Repo git config is set to **`Imran Baig <support@penmanship.academy>`** — keep it. If a deploy is ever "Blocked (commit author…)", that's the cause; re-author commits to `support@penmanship.academy` and force-push.

**Known platform quirk (handled):** Vercel was serving the route's *prefetch RSC payload* as the HTML document (a `Vary` CDN glitch → a multipart/header flash before paint). Fixed by `export const dynamic = "force-dynamic"` in `app/page.tsx` (home only). Local `next start` was always clean — it's Vercel-only.

**This session's work (8 commits UNPUSHED as of handoff — user pushes via GitHub Desktop):**
- Programs → **Apple-style 2×2 bento grid** (was tall vertical stack); tiles = mosaic wall + frosted panel at bottom (`md:grid-cols-2`, `gap-4`).
- Mosaic motion: per-tile **desync** (dir/speed/offset) then settled on a **fast horizontal scroll** (`16+ri*3+index*3`s, `gap-1`) so all photos cycle; `ProgramBackdropRows` takes an `index` prop.
- Container widened: `Container` default `max-w-[100rem]` (1600px), wide `110rem` — to cut side gaps on large screens.
- Global vertical rhythm tightened: `--spacing-section: 2.25rem`, `--spacing-section-lg: 3.75rem`.
- Reviews (homepage `#testimonials`): grid → **auto-scroll marquee** + new **`TrustScore.tsx`** Trustpilot-style 5.0 card beside the 1,500+ count (static: 5.0 / Excellent / "1,000+ reviews").
- Testimonials carousel speed fix: `.press-marquee` now reads `--press-marquee-duration` (the `[animation-duration]` utility was overridden by the shorthand); pricing carousel set to `180s`; reliable hover-pause via `.group:hover .press-marquee`.
- Earlier this session (already PUSHED/live): real legal pages (privacy/terms/comment/earning/disclosure/refund — mirror imranbaig.com, **templates, need legal review**), footer lists 6 policies, contact email sitewide → **`connect@imranbaig.com`**, "Join the Masterclass" CTAs → **`https://website.imranbaig.com`** (new tab), pricing real prices (₹5,000 / ₹60,000 / ₹2,00,000 / ₹4,72,000) + live `courses.imranbaig.co` checkout links, Recognition: removed Demartini featured quote, added **Mitesh Khatri & Indu Agarwal** (Law of Attraction Coach), corrected **Ashish Vidyarthi** card + designations, pricing-card alignment, mobile menu descender fix, route scroll-to-top (`RouteScrollManager`), floating **WhatsApp button** (`wa.aisensy.com/+917411247123`).

**OPEN / PENDING:**
1. **Push the 8 unpushed commits** (GitHub Desktop → Push origin → Vercel auto-deploys).
2. **Real Trustpilot review text** still needed — homepage `#testimonials` still uses **placeholder `REVIEWS`** (Neelima, Rohan Mehta…); pricing carousel uses real `testimonialsData.ts` (10 client stories). Trustpilot blocks scraping (403) — client must paste reviews.
3. `TrustScore` card numbers are static (5.0 / 1,000+); update if needed.
4. Legal pages are templates — have them legally reviewed.

---

Stack: Next.js 15 (App Router) · React 19 · TS strict · Tailwind v4 (`@theme` tokens
in `app/globals.css`) · Framer Motion v11 · GSAP + Lenis (smooth scroll, native mode)
· next/font (Playfair Display + Inter). Dark "Luxury Blue" palette.
Repo root: `C:\Users\Chetan\Desktop\imran\website`.

> `three` + `@react-three/fiber` are in package.json but **no longer used** (the
> scroll pen is image-based now). Safe to remove later.

---

## ⚠️ DEPLOYMENT — read this
- **GitHub:** `https://github.com/lordchethan/imranbaigwebiste.git` (origin, branch `main`, private).
- **Live site:** **https://imranbaigwebiste-nx4h.vercel.app** (Vercel project `imranbaigwebiste-nx4h`).
  There are TWO Vercel projects for this repo (`imranbaigwebiste` + `-nx4h`); `-nx4h` is the live one.
  Deployment Protection is OFF (public). Auto-deploys on push to `main`.
- **Publish flow (user does this in GitHub Desktop):** Commit to main → Push origin → Vercel auto-builds (~1–2 min) → hard-refresh (Ctrl+Shift+R).
- **Auto-deploy occasionally misses the webhook** — if no new deployment appears after a push, make a trivial commit and push again, OR Vercel → Settings → Git → reconnect.
- `.gitignore` + `.vercelignore` exclude the heavy raw-source folders: `public/Program Videos`,
  `public/TPA Certificates`, `public/IP Certificates`, `public/Media Coverage` (~323MB, build-time only).
- **As of this session's end there is a LARGE batch of UNPUSHED local work** (ambient bg, scroll pen,
  program mosaics, nav/footer/About/Recognition edits, heading fix). User must Commit+Push to go live.

---

## NEW this session (all the major work)

### Scroll pen 🖊️ (the big one — heavily iterated, feel is subjective)
- `src/components/three/ScrollPen.tsx` + `ScrollPenMount.tsx`, mounted in `app/layout.tsx`.
- A realistic pen IMAGE (`public/pen.png` — from PixelSquid "Fountain Pen Black", Lifetime
  Commercial License; optimized to 18KB). NOT WebGL/3D anymore.
- Behavior: on load it **traces the hero ink-flourish stroke** as it draws (synced via the live
  `stroke-dasharray` of `[data-flourish] path`), **rests at the stroke end**, then on scroll
  **flows continuously down the page** (no section snapping) with **zero-gravity inertial rotation**
  (scroll velocity spins it, coasts to rest), gentle idle drift, and a soft **deflection off nearby
  text** (text doesn't move; the pen does). Shows on mobile; skipped for reduced-motion.
- Nib measured at `NIB_X=0.047, NIB_Y=0.493` of the image; placement is rotation-aware (`placeNib`).
- Tuning knobs (all in ScrollPen.tsx, commented): base spring `BK=0.014`, rotation impulse `sv*0.004`
  / coast `0.965`, idle drift amplitudes, `tY` flow range `0.5→0.82`, deflection `HIT_PUSH/HIT_RADIUS`.
- `InkFlourish.tsx` gained a `data-flourish` attribute so the pen can find the stroke.

### Ambient background
- `src/components/layout/AmbientBackground.tsx` (in `app/layout.tsx`): fixed site-wide layer —
  3 slow aurora glows + ghosted cursive flourish + film grain. CSS in `globals.css` (`.ambient-*`).
- To let it show through, `SectionShell` "ink" theme is now **transparent** (`text-paper`, no `bg-ink`);
  body `bg-ink` is the base. `app/pricing/page.tsx` main is transparent too.

### Programs mosaics → horizontal rows
- `src/components/sections/Programs/ProgramBackdropRows.tsx` (NEW): horizontal multi-row marquee,
  **natural aspect (no crop)**, used for ALL programs via `mosaicLayout: "rows"` in `programsData.ts`.
  `DEFAULT_ROWS=8` (dense crowd for p2/p3/p4, 48 imgs each); **p1 = `mosaicRows: 2`** (13 imgs, larger).
  CSS `.mosaic-row-left/right` in globals.css. Rows self-fill so the loop is gap-free on wide desktops.
- Regenerated thumbnails: `scripts/process-mosaics.cjs` (p2/p3/p4, recurses subfolders — p4 = its
  MPG Certificates / Money Wins / Pen Awards) and `scripts/process-p1-mosaic.cjs` (p1).
- Old vertical `ProgramBackdrop.tsx` still exists but is **unused** now.

### Other changes
- **Heading scale bug FIXED** (`src/lib/utils/cn.ts`): registered `text-display-*` as font-size in
  `extendTailwindMerge` — they were colliding with `text-{color}` and silently rendering at 16px.
  Also reduced `--text-display-lg` in globals.css.
- **Nav** (`Nav.tsx`): route-aware (logo → home; section links → `/#section` from sub-pages); links =
  **Programs · About · Podcasts · Reviews** (Method removed); mobile-menu jump fix (unlock body before scroll).
- **Footer** Explore: The Method · Programs · About Imran · Podcasts · Reviews.
- **About** (`About/index.tsx`): new 2-paragraph copy + quote "The most divine education a person can
  have is the education of self."
- **Recognition**: decorative quote mark removed; **Dr. John Demartini added to the council marquee**.
- **Hero video** (`HeroVideo.tsx`): muted autoplay + a **sound toggle** button (YouTube IFrame API,
  `enablejsapi=1`). (Auto-unmute-on-gesture was tried then reverted — it's manual toggle only.)
- **StaggerGroup**: default `amount: "some"` (fixes reveals never firing on tall mobile stacks);
  pricing tier cards use `trigger="mount"`.

---

## GOTCHAS (important)
- **Never run `npm run build` while the preview dev server is running** — it corrupts `.next` →
  "Internal Server Error". Fix: stop preview, `rm -rf .next`, restart. If `preview_start` "reuses" a
  broken process, kill port 3000 (PowerShell: `Stop-Process` on `Get-NetTCPConnection -LocalPort 3000`).
- **Preview harness tab is hidden** (`document.hidden=true`) → IntersectionObserver / Framer
  `whileInView` don't fire, and screenshots desync after deep scroll/Lenis. Verify scroll-reveals &
  pen motion in the USER's real browser; use DOM `getBoundingClientRect`/transform reads, not screenshots.
- Node not on PATH; preview runs via `scripts/dev.cmd`. For Bash/PS prepend `"$env:ProgramFiles\nodejs"`.

---

## OPEN TODOs
1. **Push the pending work** (see Deployment warning above).
2. **Pricing**: real tier prices (currently `₹ ——`) + real `payment` links (`#`) in `app/pricing/page.tsx`.
3. **Real testimonials** (homepage + pricing carousels use placeholders).
4. **Scroll-pen feel** is still being tuned to taste — knobs documented in ScrollPen.tsx.
5. Optional cleanup: remove unused `three`/`@react-three/fiber` deps; delete orphaned `ProgramBackdrop.tsx`.
6. Image perf: homepage carries many mosaic thumbnails (lazy-loaded, but heavy on mobile data).
