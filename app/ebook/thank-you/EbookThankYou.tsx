"use client";

import { useEffect, useState } from "react";

const WHATSAPP_URL = "https://chat.whatsapp.com/J8MeBOpTdUhLMNumF8Oc38";
const PDF_URL = "https://imranbaig.co/Ebook";
const CHECKOUT_URL = "https://courses.imranbaig.co/l/714bec576a";

const TESTIMONIAL_IDS = ["SuN_Ie6lybg", "QT1m2IkFxvg", "AmXJ3b_dUMM", "7dlN2sQZRWo"];

const includes = [
  "Learn 40+ things to evaluate in your handwriting",
  "21-day guided practice book",
  "Lifetime access — your journey of self-mastery",
  "Physical book delivered to your doorstep (India)",
  "Plus 10 premium bonuses — absolutely free",
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function CountDown({
  from,
  to,
  duration = 1800,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (prefersReducedMotion()) {
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
  return <>{val.toLocaleString("en-IN")}</>;
}

const GoldDivider = ({ className = "" }: { className?: string }) => (
  <div
    className={`h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent ${className}`}
    aria-hidden
  />
);

const Flourish = () => (
  <div className="flex items-center justify-center gap-4" aria-hidden>
    <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]/60 md:w-28" />
    <span className="font-display text-2xl text-[#EBCB6B]">✦</span>
    <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]/60 md:w-28" />
  </div>
);

export function EbookThankYou() {
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    try {
      setFirstName(sessionStorage.getItem("ebookFirstName") ?? "");
    } catch {}
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col text-paper"
      style={{ background: "#0B0B0B" }}
    >
      <section className="flex-1 px-6 py-20 md:py-28">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#E6C879]">You&apos;re In</p>
          <h1 className="font-display text-4xl leading-tight text-paper md:text-6xl">
            {firstName ? `You're in, ${firstName}.` : "You're in."}
          </h1>
          <GoldDivider className="mx-auto mt-8 w-32" />
          <p className="mx-auto mt-6 max-w-xl text-base text-[#A99F86] md:text-lg">
            Your next chapter starts with one stroke. Take these three steps right now to lock in
            your momentum —
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-14 grid max-w-2xl gap-6">
          <article
            className="rounded-2xl border border-[#C9A84C]/15 p-8 text-center"
            style={{ background: "linear-gradient(180deg, #15110A 0%, #0E0C07 100%)" }}
          >
            <div className="font-display text-5xl text-[#EBCB6B]">01</div>
            <h2 className="mt-3 font-display text-2xl text-paper">Join the WhatsApp Community</h2>
            <p className="mt-3 text-sm text-[#A99F86] md:text-base">
              Get weekly handwriting insights, live Q&amp;As, and breakthroughs from people on the
              same journey as you.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "#25D366", boxShadow: "0 12px 40px -10px rgba(37, 211, 102, 0.5)" }}
            >
              <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.302.158-.66.158-.99 0-.674-1.978-1.59-2.622-1.59zm-2.15 7.382c-1.918 0-3.79-.61-5.34-1.733l-3.726.973 1-3.62a9.292 9.292 0 0 1-1.85-5.582c0-5.146 4.196-9.342 9.342-9.342 5.147 0 9.343 4.196 9.343 9.342 0 5.147-4.196 9.342-9.343 9.342zm0-20.43c-6.123 0-11.087 4.965-11.087 11.087 0 1.974.516 3.825 1.42 5.43L4 28l5.444-1.42a11.057 11.057 0 0 0 5.518 1.418c6.122 0 11.087-4.964 11.087-11.087 0-6.122-4.965-11.087-11.087-11.087z" />
              </svg>
              Join the Community
            </a>
          </article>

          <article
            className="rounded-2xl border border-[#C9A84C]/15 p-8 text-center"
            style={{ background: "linear-gradient(180deg, #15110A 0%, #0E0C07 100%)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tfs/scientific-signature-book.png"
              alt="Scientific Signature Workbook by Imran Baig"
              className="mx-auto mb-4 h-48 w-auto object-contain drop-shadow-[0_20px_40px_rgba(201,168,76,0.25)]"
              loading="lazy"
            />
            <div className="font-display text-5xl text-[#EBCB6B]">02</div>
            <h2 className="mt-3 font-display text-2xl text-paper">Download Your Workbook</h2>
            <p className="mt-3 text-sm text-[#A99F86] md:text-base">
              Print it. Practise the strokes. Watch your signature — and your mindset — shift in
              real time.
            </p>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#C9A84C] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#EBCB6B] transition-colors hover:bg-[#C9A84C] hover:text-[#0B0B0B]"
            >
              Download the PDF
            </a>
          </article>
        </div>

        {/* One-time offer */}
        <OfferSection />

        {/* Testimonials */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E6C879]">Real Stories</p>
            <h2 className="mt-3 font-display text-3xl text-paper md:text-4xl">
              Hear From People Who&apos;ve Experienced It
            </h2>
            <GoldDivider className="mx-auto mt-6 w-24" />
            <p className="mx-auto mt-5 max-w-xl text-sm text-[#A99F86] md:text-base">
              Watch a few short testimonials from clients whose handwriting — and lives — changed
              after working with Imran.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {TESTIMONIAL_IDS.map((id) => (
              <div
                key={id}
                className="aspect-video overflow-hidden rounded-2xl border border-[#C9A84C]/15 bg-black/30"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title="Client testimonial"
                  className="h-full w-full"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-16 text-center text-sm text-[#A99F86]">
          <a
            href="https://imranbaig.com"
            className="underline-offset-4 hover:text-[#EBCB6B] hover:underline"
          >
            ← Back to imranbaig.com
          </a>
        </p>
      </section>
    </main>
  );
}

function OfferSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show the upsell shortly after the page paints (every visit).
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="mx-auto mt-16 max-w-2xl px-4">
        <div className="mb-4">
          <Flourish />
        </div>

        <section
          className="relative overflow-hidden rounded-3xl border border-[#C9A84C]/50 px-5 pb-8 pt-10 shadow-[0_30px_90px_-30px_rgba(201,168,76,0.5)] md:px-10 md:pb-10 md:pt-12"
          style={{ background: "linear-gradient(180deg, #15110A 0%, #0B0B0B 100%)" }}
        >
          {/* Ribbon */}
          <div className="mb-6 flex justify-center">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B0B0B] shadow-[0_10px_30px_-10px_rgba(201,168,76,0.8)] md:px-5 md:text-xs">
              ✓ Unlocked for you
            </span>
          </div>

          <OfferBody />
        </section>

        <div className="mt-4">
          <Flourish />
        </div>
      </div>

      <OfferPopup open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function OfferPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Compact corner card — no full-screen overlay or scroll lock, so the
  // thank-you page stays visible behind it. The full offer lives inline below.
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-label="Your personal offer"
    >
      {/* light frosted backdrop — page stays visible, just softened */}
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />
      <div className="ebook-pop-in relative z-10 w-full max-w-sm rounded-2xl border border-[#C9A84C]/60 bg-[#0c0b08]/95 p-5 text-center shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-black/60 text-xs text-[#EBCB6B] transition-colors hover:bg-[#C9A84C] hover:text-[#0B0B0B]"
        >
          ✕
        </button>

        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B0B0B]">
          ✓ Unlocked specially for you
        </div>

        <h3 className="mt-3 font-display text-xl leading-tight text-paper">
          Fix Your Signature &amp; Handwriting
        </h3>

        <div className="mt-3 flex items-center justify-center gap-2.5">
          <span className="text-sm text-[#8C8678] line-through">₹25,000</span>
          <span
            className="text-4xl font-extrabold tracking-tight text-[#EBCB6B]"
            style={{ textShadow: "0 0 30px rgba(242,217,141,0.4)" }}
          >
            ₹2,400
          </span>
          <span className="rounded-md bg-gradient-to-br from-[#F2D98D] to-[#C9A84C] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#0B0B0B]">
            Save 90%
          </span>
        </div>
        <p className="mt-1.5 text-[11px] text-[#A99F86]">
          <span className="tracking-[0.1em] text-[#EBCB6B]">★★★★★</span> Loved by 1,000+ learners
        </p>

        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="tfs-pulse-glow mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#0B0B0B] transition-transform hover:-translate-y-0.5"
        >
          Claim Offer Now!
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-2.5 block w-full text-[11px] text-[#A99F86]/70 underline-offset-2 hover:underline"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

function OfferBody() {
  return (
    <>
      {/* Headline */}
      <h2 className="text-center font-display text-2xl leading-tight text-paper md:text-3xl">
        Fix Your Signature &amp; Handwriting
      </h2>
      <p className="mx-auto mt-2 max-w-md text-center text-sm text-[#A99F86] md:text-base">
        Learn &amp; practise in just 2 days — and carry it for life.
      </p>
      <p className="mx-auto mt-3 max-w-md text-center text-sm text-[#E6C879]">
        You just claimed your free workbook — so this one-time price is yours.
      </p>

      {/* Price + proof */}
      <div className="mt-5 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-2.5">
          <span className="text-base text-[#8C8678] line-through md:text-lg">₹25,000</span>
          <span className="rounded-md bg-gradient-to-br from-[#F2D98D] to-[#C9A84C] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0B0B0B] shadow-[0_8px_24px_-8px_rgba(201,168,76,0.7)]">
            Save 90%
          </span>
        </div>
        <div className="tfs-price-reveal flex items-baseline justify-center gap-1">
          <span
            className="text-6xl font-extrabold leading-none tracking-tight tabular-nums text-[#EBCB6B] md:text-7xl"
            style={{ textShadow: "0 0 40px rgba(242, 217, 141, 0.45)" }}
          >
            ₹<CountDown from={25000} to={2400} />
          </span>
          <span className="text-2xl font-bold text-[#EBCB6B]/70 md:text-3xl">/-</span>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C8678]">
          You save ₹22,600 today
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="tracking-[0.15em] text-[#EBCB6B]" aria-hidden>
            ★★★★★
          </span>
          <span className="text-xs text-[#A99F86]">Loved by 1,000+ learners</span>
        </div>
      </div>

      {/* CTA under price */}
      <div className="mt-5 text-center">
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="tfs-pulse-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#0B0B0B] transition-transform hover:-translate-y-0.5 md:text-base"
        >
          Claim Offer Now!
        </a>
        <p className="mt-2 text-[11px] text-[#8C8678]">Secure payment · Fast delivery</p>
      </div>

      {/* Everything you get */}
      <div className="mt-6 rounded-xl border border-[#C9A84C]/30 bg-black/30 p-4 text-left md:p-5">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#E6C879]">
          Here&apos;s Everything You Get
        </p>
        <ul className="space-y-2.5">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-xs text-[#EBCB6B]">
                ✓
              </span>
              <span className="text-sm text-paper md:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bonuses */}
      <div className="mt-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#E6C879]">
          Plus — 10 Bonuses, Free
        </p>
        <div className="mx-auto mt-3 max-w-md rounded-2xl bg-gradient-to-b from-white to-[#FBF7EC] p-2 ring-1 ring-[#C9A84C]/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tfs/bonuses-grid.jpeg"
            alt="10 free bonuses included with the offer"
            className="mx-auto block w-full rounded-xl object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Physical material */}
      <div className="mt-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#E6C879]">
          Claim Your Physical Material
        </p>
        <p className="mt-1 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-[#E6C879]/70">
          (Included in the Fee)
        </p>
        <div className="mx-auto mt-3 max-w-xs rounded-2xl bg-gradient-to-b from-white to-[#FBF7EC] p-3 shadow-[0_20px_60px_-20px_rgba(201,168,76,0.45)] ring-1 ring-[#C9A84C]/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tfs/product-kit-box.jpeg"
            alt="Physical product kit by Imran Baig"
            className="mx-auto block w-full object-contain"
            style={{ maxHeight: "170px" }}
            loading="lazy"
          />
        </div>
        <p className="mt-2 text-center text-sm text-[#A99F86]">
          Physical book delivered to your doorstep anywhere in India
        </p>
        <div className="mt-2 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#EBCB6B]">
            ∞ Lifetime access
          </span>
        </div>
      </div>

      {/* Promise */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#C9A84C]/40 bg-[#C9A84C]/5 px-4 py-3 text-left">
        <span className="text-2xl leading-none text-[#EBCB6B]" aria-hidden>
          ✦
        </span>
        <p className="text-sm text-paper md:text-base">
          Practise the fastest, easiest way to reprogram your subconscious mind.
        </p>
      </div>

      {/* Final CTA */}
      <div className="mt-6 text-center">
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="tfs-pulse-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-8 py-4 text-base font-bold uppercase tracking-wider text-[#0B0B0B] transition-transform hover:-translate-y-0.5 md:text-lg"
        >
          Claim Offer Now!
        </a>
        <p className="mt-2 text-xs text-[#8C8678]">✓ Secure payment · ✓ Fast delivery</p>
      </div>
    </>
  );
}
