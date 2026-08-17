"use client";

/**
 * /tpapaid — POST-PURCHASE ONE-TIME UPGRADE OFFER (OTO).
 *
 * Shown immediately AFTER a visitor pays ₹2,400 for "The First Step"
 * (app/tfs/offer). It offers the upgrade to the full "Professional Approach"
 * certification for a one-time ₹41,300 (value ₹1,18,000), with the ₹2,400 they
 * just paid credited in full — but only while they are on this page.
 *
 * Renders standalone (no site nav/footer): middleware tags `/tpapaid` with
 * `x-bare-chrome`, which app/layout.tsx reads to drop the chrome. This keeps the
 * funnel distraction-free with no exit links.
 *
 * ─── STILL TO CONFIGURE BEFORE PAID TRAFFIC ──────────────────────────────────
 *  1. DECLINE_URL  — where "No thanks" should go (order/access page or home).
 *  2. FAQ answers  — drafted from this page's own copy; confirm specifics
 *                    (esp. onboarding + refund/validity).
 *  3. Offer terms  — confirm the validity window, GST line and refund policy.
 *
 *  PA_CHECKOUT_URL is set to the live ₹41,300 checkout. The recognition wall now
 *  uses real student photos (press / radio / podcasts / sessions).
 */

import { useEffect, useRef, useState } from "react";
import { InkFlourish } from "@/components/motion/InkFlourish";
import { TESTIMONIALS } from "@/components/sections/Testimonials/testimonialsData";
import { ProgramBackdropRows } from "@/components/sections/Programs/ProgramBackdropRows";
import { getProgram } from "@/components/sections/Programs/programsData";

// Live Professional Approach (₹41,300) checkout.
const PA_CHECKOUT_URL = "https://courses.imranbaig.co/l/5e150b96c7";
// TODO(setup): where the "No thanks" links should go (order confirmation / home).
const DECLINE_URL = "/";

const OFFER_MINUTES = 15; // the "Offer expires in 15:00" window

// ── Pricing ───────────────────────────────────────────────────────────────────
const VALUE = 118000; // total programme value
const PAY = 41300; // one-time price today
const CREDIT = 2400; // First Step fee, credited
const SAVE = VALUE - PAY; // 76,700

const inr = (n: number) => n.toLocaleString("en-IN");

// ── The four pillars ────────────────────────────────────────────────────────
const PILLARS: { n: string; title: string; items: string[] }[] = [
  {
    n: "Pillar One",
    title: "Master the Science",
    items: [
      "Decode 128+ advanced behavioural traits",
      "Understand the power of trait stacking",
      "Learn the science behind Grapho-Therapy",
      "Create customised Grapho-Therapy for individual needs",
      "Decode handwriting beyond the English language",
      "Use handwriting analysis for compatibility",
    ],
  },
  {
    n: "Pillar Two",
    title: "Get the Blueprint to Become a Coach",
    items: [
      "Get trained in Mission 10 Clients",
      "Start earning through handwriting analysis",
      "Deliver analysis through the language of transformation",
      "Get listed on our International Council of Graphologists",
    ],
  },
  {
    n: "Pillar Three",
    title: "Live Coaching by Imran Baig",
    items: [
      "10 live sessions across one month",
      "30 days of guided Grapho-Therapy",
      "Dedicated facilitator support throughout",
      "Lifetime access to every recording",
    ],
  },
  {
    n: "Pillar Four",
    title: "Everything You Keep",
    items: [
      "Physical study material delivered to you",
      "Physical certificate of certification",
      "A complete marketing kit to launch your practice",
      "The First Step, included and fully credited",
    ],
  },
];

// ── Everything you receive ──────────────────────────────────────────────────
const RECEIVE: { title: string; desc?: string; tag?: string }[] = [
  { title: "Learn 128+ Advanced Behavioural Traits", desc: "The complete professional analyst curriculum" },
  {
    title: "Learn Trait Stacking & the Language of Communication",
    desc: "Read the whole person, and deliver it through the language of transformation",
  },
  { title: "Learn the Gestalt Method of Analysis" },
  { title: "Decode Handwriting Beyond the English Language" },
  { title: "30 Days of Dedicated Facilitator Support", desc: "Guided Grapho-Therapy, with you every day" },
  {
    title: "Create Your Identity as a Coach",
    desc: "Get the blueprint of Mission 10 Clients — start coaching others and earning",
  },
  { title: "Council Listing", desc: "Listed on the International Council of Graphologists" },
  { title: "Physical Study Material & Certificate", desc: "Delivered to your door" },
  { title: "The First Step Programme", desc: `The ₹${inr(CREDIT)} you already paid — credited in full`, tag: "Credited" },
];

// ── Comparison table ──────────────────────────────────────────────────────────
type Cell = boolean | string;
const COMPARE: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "First Step access (40 traits)", cells: [true, true, true] },
  { label: "128+ advanced traits + certification", cells: [false, true, true] },
  { label: "10 live sessions + facilitator support", cells: [false, true, true] },
  { label: "Start earning as a certified analyst", cells: [false, true, true] },
  { label: "Marketing kit + Council listing", cells: [false, true, true] },
  { label: `Your ₹${inr(CREDIT)} First Step fee absorbed`, cells: [false, "Lost", "Credited"] },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
// DRAFT answers, grounded in this page's own copy. Have the client confirm the
// specifics — especially Q6 (onboarding) and the refund/validity window.
const FAQS: { q: string; a: string }[] = [
  {
    q: "So what happens to the ₹2,400 I just paid?",
    a: "It’s credited back in full — but only today. The ₹2,400 you paid for The First Step is folded straight into your Professional Approach upgrade on this page, so it isn’t an extra cost on top. The First Step itself stays included.",
  },
  {
    q: "Can I take this offer tomorrow or next week instead?",
    a: "You can still upgrade later and you’ll keep your First Step access — but the ₹2,400 credit only lives on this page. Upgrade tomorrow, next week or next month and you pay the full Professional Approach fee on top of what you’ve already paid. This session is the one and only place the two are folded together.",
  },
  {
    q: "What exactly do I pay today?",
    a: `₹${inr(PAY)} — one time. That’s the ₹${inr(VALUE)} programme value with your ₹${inr(CREDIT)} First Step fee credited and today’s saving applied.`,
  },
  {
    q: "What’s actually included in the Professional Approach?",
    a: "Everything across four pillars: the full science (128+ advanced traits, trait stacking, Grapho-Therapy and the Gestalt method), the coaching blueprint (Mission 10 Clients, Council listing and a complete marketing kit), 10 live sessions with Imran plus 30 days of facilitator support, and everything you keep — physical study material, a physical certificate and lifetime access to recordings.",
  },
  {
    q: "Will I really be able to earn from this?",
    a: "You’ll be trained and equipped to. You become a certified analyst, get the Mission 10 Clients blueprint, a complete marketing kit and a listing on the International Council of Graphologists — the same path our students have used to build a practice. What you earn depends on the work you put in.",
  },
  {
    q: "What happens right after I upgrade?",
    a: "You’ll receive your access details and your facilitator will help you get started, while your physical study material and certificate are dispatched to your address.",
  },
];

// Income/profession transformation stories — most relevant to an upgrade that
// turns the science into a profession. Pulled from the shared testimonials.
const PICKED = ["Rajat Katiyar", "Pooja Srivastava", "Kapeel Gupta", "Maneesha Rajpal"];
const UPSELL_TESTIMONIALS = PICKED.map((name) => TESTIMONIALS.find((t) => t.name === name)).filter(
  (t): t is (typeof TESTIMONIALS)[number] => Boolean(t),
);

// The homepage "Professional Approach" program (02) — its scrolling wall of
// certified-student photos (mosaic p2) is reused in the hero below. Pulled from
// the shared data so it stays in sync if the mosaic is regenerated.
const PA_PROGRAM = getProgram("professional-approach");
const PA_MOSAIC_DIR = PA_PROGRAM?.mosaicDir ?? "p2";
const PA_MOSAIC_COUNT = PA_PROGRAM?.mosaicCount ?? 48;

// Real student-recognition photos — press clippings, radio/podcast appearances
// and their own sessions — extracted from the client's deck into
// public/mosaics/recognition. Shown in the "recognised analyst" wall.
const RECOGNITION_MOSAIC_DIR = "recognition";
const RECOGNITION_MOSAIC_COUNT = 24;

// Recognition categories shown above the "recognised analyst" wall.
const RECOGNITION = ["Featured in Newspapers", "Invited on Podcasts", "Conducting Their Own Sessions"];

// "The moment you upgrade" — what happens right after payment.
const UPGRADE_STEPS: { title: string; desc: string }[] = [
  { title: "You get instant confirmation", desc: "The moment your payment goes through, your upgrade is confirmed." },
  { title: "Check your email for the details", desc: "Your welcome email lands with everything you need to know to begin." },
  {
    title: "Your facilitator reaches out",
    desc: "A dedicated facilitator connects with you personally and stays with you throughout.",
  },
  {
    title: "Check your online access for the videos",
    desc: "Your course videos are ready inside your online access, waiting for you to begin.",
  },
  { title: "Apply for your study material", desc: "Request your physical study material to be delivered to your door." },
];

// ── Animated price count (ease toward the final number) ──────────────────────
function CountUp({ from, to, duration = 1800 }: { from: number; to: number; duration?: number }) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration]);
  return <>{inr(val)}</>;
}

// ── Live MM:SS countdown. The deadline is persisted in sessionStorage so a
//    REFRESH continues the same countdown instead of resetting it; a fresh
//    browser session starts a new window. When it reaches 00:00 it simply stops
//    there — nothing is gated on the timer (the offer, the price and the CTAs
//    stay available), so letting it expire changes nothing for the buyer.
function useOfferCountdown(minutes: number) {
  const [remaining, setRemaining] = useState(minutes * 60);
  useEffect(() => {
    const KEY = "tpa_oto_deadline";
    let deadline = Number(sessionStorage.getItem(KEY));
    if (!deadline || Number.isNaN(deadline)) {
      deadline = Date.now() + minutes * 60 * 1000;
      sessionStorage.setItem(KEY, String(deadline));
    }
    const tick = () => setRemaining(Math.max(0, Math.round((deadline - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [minutes]);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return { mm, ss };
}

// ── Shared UI bits ────────────────────────────────────────────────────────────
function GoldCTA({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a
      href={PA_CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "tfs-pulse-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-8 py-4 text-base font-bold uppercase tracking-wider text-[#0B0B0B] transition-transform hover:-translate-y-0.5 md:text-lg " +
        className
      }
    >
      {label}
    </a>
  );
}

function DeclineLink({ label }: { label: string }) {
  return (
    <a
      href={DECLINE_URL}
      className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] text-[#8C8678] underline-offset-4 transition-colors hover:text-[#A99F86] hover:underline"
    >
      {label}
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
      {children}
    </p>
  );
}

const Check = () => (
  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-xs text-[#EBCB6B]">
    ✓
  </span>
);

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#C9A84C]/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-semibold text-paper md:text-base">{q}</span>
        <svg
          viewBox="0 0 24 24"
          className={"h-4 w-4 shrink-0 text-[#C9A84C] transition-transform duration-300 " + (open ? "rotate-180" : "")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={
          "overflow-hidden text-sm leading-relaxed text-[#A99F86] transition-all duration-300 " +
          (open ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0")
        }
      >
        {a}
      </div>
    </div>
  );
}

export function TpaPaid({ name = "" }: { name?: string }) {
  const { mm, ss } = useOfferCountdown(OFFER_MINUTES);
  const topRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative min-h-screen text-paper"
      style={{ background: "radial-gradient(120% 80% at 50% 0%, #15110A 0%, #0B0B0B 55%, #070707 100%)" }}
    >
      {/* ── Sticky offer bar (the page's own header) ───────────────────────── */}
      <div
        ref={topRef}
        className="sticky top-0 z-50 border-b-2 border-[#E6C879]/40 bg-gradient-to-b from-[#D11F2A] to-[#B41420] shadow-[0_10px_30px_-12px_rgba(193,18,31,0.65)]"
      >
        {/* Wraps on mobile: brand + timer on the top line, the offer message
            centered on its own second line. Single row on sm+. */}
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-3 gap-y-1.5 px-4 py-2 sm:flex-nowrap sm:py-2.5">
          <a href="/" className="order-1 font-display text-sm text-white transition-opacity hover:opacity-80 md:text-base">
            Imran&nbsp;Baig
          </a>
          <span className="order-2 inline-flex shrink-0 items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-1 sm:order-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/85">Expires in</span>
            <span className="font-mono text-sm font-bold tabular-nums text-[#FFE08A]">
              {mm}:{ss}
            </span>
          </span>
          <span
            className="order-3 w-full text-center text-[10px] font-extrabold uppercase tracking-[0.12em] text-white sm:order-2 sm:w-auto sm:text-[11px] sm:tracking-[0.25em]"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
          >
            One-Time Offer — Gone When You Leave
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 md:pt-14">
        {/* ── Hero / confirmation ──────────────────────────────────────────── */}
        <section className="text-center">
          <div className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B0B0B] shadow-[0_10px_30px_-10px_rgba(201,168,76,0.8)] md:text-xs">
              ✦ {name ? `Reserved for ${name}` : "One-Time Invitation"}
            </span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E6C879]">
            {name ? `${name}, your First Step is confirmed` : "Your First Step is Confirmed"}
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl font-display text-3xl leading-tight text-paper md:text-5xl">
            {name ? `${name}, before you close this page, read this carefully.` : "Before you close this page, read this carefully."}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#C7BFAE] md:text-lg">
            You have just begun decoding yourself. There is a door open right now that you will not see again — and the
            choice you make in the next few minutes could shape the next ten years of your life.
          </p>
          <p className="mx-auto mt-6 inline-block rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/[0.06] px-4 py-2 text-xs text-[#E6C879] md:text-[13px]">
            ✦ This page was opened for one person only — the moment you leave, it closes for good.
          </p>
        </section>

        {/* ── Savings (NO pricing up top) — lead with what they save; the actual
            ₹ price is revealed only at the Investment section near the end, so the
            reader weighs the value before the cost. ────────────────────────── */}
        <section className="mt-10">
          <div
            className="relative overflow-hidden rounded-3xl border border-[#C9A84C]/50 px-6 py-8 text-center shadow-[0_30px_90px_-30px_rgba(201,168,76,0.5)] md:px-10 md:py-10"
            style={{ background: "linear-gradient(180deg, #15110A 0%, #0B0B0B 100%)" }}
          >
            {/* The Professional Approach product box — same image as the homepage. */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl bg-gradient-to-b from-white to-[#FBF7EC] p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] ring-1 ring-[#C9A84C]/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/program/professional-approach.png"
                  alt="The Professional Approach programme"
                  className="mx-auto block w-auto rounded-xl object-contain"
                  style={{ maxHeight: "180px" }}
                  loading="eager"
                />
              </div>
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8C8678]">
              Your one-time upgrade saving
            </p>
            <div className="tfs-price-reveal mt-3 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
              <span className="text-xl font-bold text-[#6FCF97]/80 md:text-2xl">You save</span>
              <span
                className="text-6xl font-extrabold leading-none tracking-tight tabular-nums text-[#4ADE80] md:text-7xl"
                style={{ textShadow: "0 0 44px rgba(74, 222, 128, 0.5)" }}
              >
                ₹<CountUp from={0} to={SAVE} />
              </span>
              <span className="text-xl font-bold text-[#6FCF97]/80 md:text-2xl">today</span>
            </div>
            <p className="mx-auto mt-4 max-w-md text-sm text-[#C7BFAE] md:text-base">
              Step into Imran Baig&apos;s best-selling <span className="text-paper">Professional Approach</span> programme
              at a special one-time upgrade offer — with your First Step fee already credited inside.
            </p>

            {/* No CTA here on purpose — the client's flow is: savings + what the
                programme is first, decision/pricing only at the end. A closing ink
                flourish (on-theme for handwriting) finishes the card; urgency is
                carried by the countdown bar. */}
            <div className="mt-6 flex justify-center">
              <InkFlourish trigger="mount" className="[&_path]:stroke-[#C9A84C]" />
            </div>
          </div>
        </section>

        {/* ── 3-step credit strip ──────────────────────────────────────────── */}
        <section className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { k: "You just paid", v: `₹${inr(CREDIT)}`, sub: "for The First Step" },
            { k: "We credit it", v: "100%", sub: "toward your upgrade" },
            { k: "You step into", v: "Professional Approach", sub: "First Step included, free" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-[#C9A84C]/25 bg-black/30 px-4 py-5 text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8C8678]">{s.k}</p>
              <p className="mt-1.5 font-display text-xl text-[#EBCB6B] md:text-2xl">{s.v}</p>
              <p className="mt-1 text-xs text-[#A99F86]">{s.sub}</p>
            </div>
          ))}
        </section>

        {/* ── The upgrade pitch ────────────────────────────────────────────── */}
        <section className="mt-16">
          <Eyebrow>The Upgrade</Eyebrow>
          <h2 className="mx-auto max-w-2xl text-center font-display text-2xl leading-tight text-paper md:text-4xl">
            Turn the science you just touched into a profession.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-[#A99F86]">
            The First Step taught you to decode yourself. The Professional Approach makes you a certified analyst — with
            the skill, the certification and the marketing kit to start earning through handwriting analysis. And right
            now, the ₹{inr(CREDIT)} you already paid is folded straight into it.
          </p>

          <div className="mx-auto mt-6 flex max-w-xl items-center gap-3 rounded-2xl border border-[#C9A84C]/40 bg-[#C9A84C]/5 px-5 py-4">
            <span className="text-2xl leading-none text-[#EBCB6B]" aria-hidden>
              ✦
            </span>
            <p className="text-sm font-semibold text-paper md:text-base">
              If you leave this page, this credit is gone.
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-[#8C8678]">
            To be completely honest with you: in our normal pricing, we do not absorb the fee you paid for The First Step
            when you upgrade later. If you close this window and decide to upgrade tomorrow, next week, or next month, you
            pay the full Professional Approach fee on top of what you have already paid. This page is the one and only
            place that credit lives. Once you click away, it cannot be brought back.
          </p>
        </section>

        {/* ── Certified analyst — wall of certified students ───────────────── */}
        <section className="mt-16 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-2xl leading-tight text-paper md:text-4xl">
            Become a Certified Handwriting Analyst &amp; a Grapho-Analytical Therapist
          </h2>
          <div className="mt-6">
            <p
              className="font-display text-5xl font-bold tracking-tight text-[#EBCB6B] md:text-6xl"
              style={{ textShadow: "0 0 40px rgba(242, 217, 141, 0.4)" }}
            >
              17,500+
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A99F86]">
              Students Already Certified &amp; Practising
            </p>
          </div>
          {/* The same scrolling student/certificate wall as the homepage
              Professional Approach program (mosaic p2). */}
          <div className="relative isolate mt-6 h-72 overflow-hidden rounded-2xl border border-[#C9A84C]/30 bg-black/30 ring-1 ring-[#C9A84C]/20 sm:h-96">
            <ProgramBackdropRows dir={PA_MOSAIC_DIR} count={PA_MOSAIC_COUNT} eager />
          </div>
        </section>

        {/* ── What you step into — pillars ─────────────────────────────────── */}
        <section className="mt-16">
          <Eyebrow>What You Step Into</Eyebrow>
          <h2 className="mx-auto max-w-2xl text-center font-display text-2xl leading-tight text-paper md:text-4xl">
            The Professional Approach isn&apos;t a course. It&apos;s a profession in a box.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.n} className="rounded-2xl border border-[#C9A84C]/25 bg-black/30 p-5 md:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">{p.n}</p>
                <h3 className="mt-1.5 font-display text-xl text-paper">{p.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <Check />
                      <span className="text-sm text-[#CFC8B8]">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Everything you receive ───────────────────────────────────────── */}
        <section className="mt-16">
          <Eyebrow>Everything You Receive</Eyebrow>
          <h2 className="mx-auto max-w-2xl text-center font-display text-2xl leading-tight text-paper md:text-4xl">
            Everything inside the Professional Approach.
          </h2>
          <div className="mx-auto mt-8 max-w-2xl divide-y divide-[#C9A84C]/15 rounded-2xl border border-[#C9A84C]/25 bg-black/30">
            {RECEIVE.map((r) => (
              <div key={r.title} className="flex items-start gap-3 px-5 py-4">
                <Check />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-paper md:text-base">{r.title}</p>
                  {r.desc && <p className="mt-0.5 text-xs text-[#A99F86]">{r.desc}</p>}
                </div>
                {r.tag && (
                  <span className="shrink-0 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#EBCB6B]">
                    {r.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── From student to recognised analyst ───────────────────────────── */}
        <section className="mt-16 text-center">
          <Eyebrow>From Student to Recognised Analyst</Eyebrow>
          {/* Real student recognition photos (press clippings, radio/podcasts and
              their own sessions, from the client's deck) scroll behind a dark centre
              scrim that carries the headline + proof — photos frame it top & bottom. */}
          <div className="relative isolate mt-6 h-[26rem] overflow-hidden rounded-2xl border border-[#C9A84C]/30 bg-black/40 ring-1 ring-[#C9A84C]/20 sm:h-[32rem]">
            <ProgramBackdropRows dir={RECOGNITION_MOSAIC_DIR} count={RECOGNITION_MOSAIC_COUNT} eager />
            <div
              className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(7,6,5,0) 0%, rgba(7,6,5,0.85) 24%, rgba(7,6,5,0.92) 50%, rgba(7,6,5,0.85) 76%, rgba(7,6,5,0) 100%)",
              }}
            >
              <h2 className="mx-auto max-w-2xl font-display text-2xl leading-tight text-paper md:text-4xl">
                They didn&apos;t just get certified.{" "}
                <span className="italic text-[#EBCB6B]">They became somebody.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#CFC8B8] md:text-base">
                Our students go on to be featured in the press, invited onto podcasts, and lead their own sessions — the
                same recognition that built Imran&apos;s name, now in their hands.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {RECOGNITION.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-[#C9A84C]/40 bg-black/40 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E6C879] sm:text-[11px]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Comparison table ─────────────────────────────────────────────── */}
        <section className="mt-16">
          <Eyebrow>Why This Page Is Different</Eyebrow>
          <h2 className="mx-auto max-w-2xl text-center font-display text-2xl leading-tight text-paper md:text-4xl">
            Three paths. Only one closes the door today.
          </h2>
          {/* Fits all 4 columns within the mobile width — headers + labels wrap,
              no horizontal scroll — so it's understood at a glance. */}
          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-[#C9A84C]/25">
            {/* header row */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1.15fr] bg-black/40 text-center">
              <div className="px-2.5 py-3 text-left text-[9px] font-bold uppercase tracking-wide text-[#8C8678] sm:px-4 sm:text-[10px] sm:tracking-wider">
                What you get
              </div>
              <div className="px-1 py-3 text-[9px] font-bold uppercase leading-tight tracking-wide text-[#A99F86] sm:px-2 sm:text-[10px]">
                Just First Step
              </div>
              <div className="px-1 py-3 text-[9px] font-bold uppercase leading-tight tracking-wide text-[#A99F86] sm:px-2 sm:text-[10px]">
                Upgrade Later
              </div>
              <div className="bg-[#C9A84C]/15 px-1 py-3 text-[9px] font-extrabold uppercase leading-tight tracking-wide text-[#EBCB6B] sm:px-2 sm:text-[10px]">
                Upgrade Now
              </div>
            </div>
            {COMPARE.map((row, i) => (
              <div
                key={row.label}
                className={
                  "grid grid-cols-[1.6fr_1fr_1fr_1.15fr] items-center text-center " +
                  (i % 2 ? "bg-black/20" : "bg-black/10")
                }
              >
                <div className="px-2.5 py-3 text-left text-[11px] leading-snug text-[#CFC8B8] sm:px-4 sm:text-xs">
                  {row.label}
                </div>
                {row.cells.map((c, ci) => (
                  <div key={ci} className={"px-1 py-3 sm:px-2 " + (ci === 2 ? "bg-[#C9A84C]/10" : "")}>
                    {c === true ? (
                      <span className="text-base text-[#6FCF97]">✓</span>
                    ) : c === false ? (
                      <span className="text-[#5a5446]">—</span>
                    ) : c === "Credited" ? (
                      <span className="text-[10px] font-bold text-[#6FCF97] sm:text-xs">✓&nbsp;Credited</span>
                    ) : (
                      <span className="text-[10px] font-medium text-[#C77]/80 sm:text-xs">—&nbsp;{c}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-xl text-center text-xs text-[#8C8678]">
            Upgrade later and you keep your First Step access, but you pay the full Professional Approach fee on top. Only
            this page folds the two together.
          </p>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
        <section className="mt-16">
          <Eyebrow>Real People. Real Transformations.</Eyebrow>
          <h2 className="mx-auto max-w-2xl text-center font-display text-2xl leading-tight text-paper md:text-4xl">
            When people decided on this page, this is what they built.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {UPSELL_TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-[#C9A84C]/25 bg-black/30 p-5 md:p-6">
                <span className="tracking-[0.15em] text-[#EBCB6B]" aria-hidden>
                  ★★★★★
                </span>
                <blockquote className="mt-3 text-sm leading-relaxed text-[#CFC8B8]">{t.text}</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-paper">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Investment ───────────────────────────────────────────────────── */}
        <section className="mt-16">
          <Eyebrow>Your Investment Today</Eyebrow>
          <h2 className="mx-auto max-w-2xl text-center font-display text-2xl leading-tight text-paper md:text-4xl">
            The easiest yes you&apos;ll make today.
          </h2>
          <div
            className="mx-auto mt-8 max-w-lg rounded-3xl border border-[#C9A84C]/50 px-6 py-8 shadow-[0_30px_90px_-30px_rgba(201,168,76,0.5)] md:px-10"
            style={{ background: "linear-gradient(180deg, #15110A 0%, #0B0B0B 100%)" }}
          >
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[#E6C879]">
              Your best-selling programme · one-time price
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between text-[#A99F86]">
                <dt>Total programme value</dt>
                <dd className="tabular-nums">₹{inr(VALUE)}</dd>
              </div>
              <div className="flex items-center justify-between text-[#A99F86]">
                <dt>First Step fee you already paid — credited</dt>
                <dd className="tabular-nums text-[#EBCB6B]">− ₹{inr(CREDIT)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-[#C9A84C]/20 pt-3 font-semibold text-paper">
                <dt>You save today</dt>
                <dd className="tabular-nums text-[#EBCB6B]">₹{inr(SAVE)}</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-baseline justify-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C8678]">You pay only</span>
              <span
                className="text-5xl font-extrabold tabular-nums text-[#EBCB6B] md:text-6xl"
                style={{ textShadow: "0 0 40px rgba(242, 217, 141, 0.4)" }}
              >
                ₹{inr(PAY)}
              </span>
            </div>
            <div className="mt-6">
              <GoldCTA label={`Yes! Claim My Upgrade for ₹${inr(PAY)}`} />
              <p className="mt-2 text-center text-[11px] text-[#8C8678]">
                Secure checkout · Inclusive of GST · First Step credited inside
              </p>
            </div>
            <div className="text-center">
              <DeclineLink label="No thanks, I'll consider the full programme later" />
            </div>
          </div>
        </section>

        {/* ── The moment you upgrade ───────────────────────────────────────── */}
        <section className="mt-16">
          <Eyebrow>The Moment You Upgrade</Eyebrow>
          <h2 className="mx-auto max-w-2xl text-center font-display text-2xl leading-tight text-paper md:text-4xl">
            Here&apos;s exactly what happens next.
          </h2>
          <ol className="mx-auto mt-8 max-w-2xl space-y-3">
            {UPGRADE_STEPS.map((s, i) => (
              <li
                key={s.title}
                className="flex items-start gap-4 rounded-2xl border border-[#C9A84C]/25 bg-black/30 px-5 py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 font-display text-sm font-bold text-[#EBCB6B]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-paper md:text-base">{s.title}</p>
                  <p className="mt-0.5 text-sm text-[#A99F86]">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-[#C9A84C]/40 bg-[#C9A84C]/5 px-5 py-5 text-center">
            <p className="font-display text-lg text-paper md:text-xl">You&apos;re not stepping in alone.</p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#A99F86]">
              From the moment you upgrade, our team and your facilitator are with you every step of the way. If anything
              ever feels unclear, simply reach out and talk to us — we&apos;re here to support your journey, not leave you
              to it.
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="mt-16">
          <Eyebrow>Honest Answers</Eyebrow>
          <h2 className="mx-auto max-w-2xl text-center font-display text-2xl leading-tight text-paper md:text-4xl">
            Questions you&apos;re probably asking right now.
          </h2>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#C9A84C]/25 bg-black/30 px-5 md:px-7">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section className="mt-16 text-center">
          <Eyebrow>One Last Thing</Eyebrow>
          <h2 className="mx-auto max-w-2xl font-display text-2xl leading-tight text-paper md:text-4xl">
            {name
              ? `${name}, you can keep what you have — or change everything in the next 60 seconds.`
              : "You can keep what you have. Or you can change everything in the next 60 seconds."}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#A99F86]">
            The ₹{inr(CREDIT)} you paid for the First Step has already left your account. The only question is whether it
            becomes one programme, or the first step of a profession — with your First Step fee folded in.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <GoldCTA label="Yes — Upgrade Me Now" />
            <div>
              <DeclineLink label="No thanks, I'll pay the full fee later" />
            </div>
            <p className="mt-3 text-[11px] text-[#8C8678]">
              This page closes the moment you leave. The credit goes with it.
            </p>
          </div>
        </section>

        {/* ── Footer note ──────────────────────────────────────────────────── */}
        <footer className="mt-16 border-t border-[#C9A84C]/15 pt-8 text-center">
          <p className="font-display text-sm text-[#A99F86]">Imran Baig — The Mind Decoder</p>
          <p className="mx-auto mt-4 max-w-2xl text-[11px] leading-relaxed text-[#6f6a5e]">
            Note: This credit-back offer is available only during this session, immediately after your First Step
            enrolment. If you return later, the First Step fee will not be adjusted and the full Professional Approach fee
            will apply.
          </p>
          <p className="mt-4 text-[11px] text-[#6f6a5e]">
            © Imran Baig — Decoding personality, health and the subconscious mind.
          </p>
        </footer>
      </main>
    </div>
  );
}
