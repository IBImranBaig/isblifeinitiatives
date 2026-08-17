"use client";

/**
 * OFFER POPUP + BANNER — the ₹2,400 "First Step" special offer for the home page.
 *
 * Flow designed to grab attention once, then stop disturbing the visitor:
 *   1. A few seconds after the home page loads, a small, offer-styled popup
 *      appears (core offer up front; a "Get 10 extra bonuses — FREE" button
 *      expands it in place to show the full details, bonuses and physical kit).
 *   2. Once the visitor closes it, it does NOT pop up again. Instead it settles
 *      into a slim gold banner pinned directly BELOW the nav bar that stays
 *      visible as they scroll. Hovering the banner drops down the complete offer
 *      details; the banner's × dismisses it for the session.
 *
 * The banner pushes page content down by its height (body padding) so nothing is
 * hidden under it, and positions itself just under the measured nav height.
 *
 * Mounted only on the home page (app/page.tsx). No auto-expiry — to end the
 * campaign later, just unmount it from app/page.tsx.
 */

import { useEffect, useRef, useState } from "react";

// Live checkout (same as the /tfs/offer landing page).
const CHECKOUT_URL = "https://courses.imranbaig.co/l/40338c4b66";
const FIRST_DELAY_MS = 6000; // wait before the first (and only) automatic popup

const INCLUDES = [
  "Learn 40+ things to evaluate in your handwriting",
  "21-day guided practice book",
  "Lifetime access — your journey of self-mastery",
  "Physical book delivered to your doorstep (India)",
];

type Phase = "hidden" | "popup" | "banner";

function GoldCTA({ label }: { label: string }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="tfs-pulse-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#0B0B0B] transition-transform hover:-translate-y-0.5"
    >
      {label}
    </a>
  );
}

/** The complete offer details — reused by the popup's expander and the banner's
 *  hover dropdown so both always show the same thing. */
function OfferDetails() {
  return (
    <>
      {/* Everything you get */}
      <div className="rounded-xl border border-[#C9A84C]/30 bg-black/30 p-4 text-left">
        <p className="mb-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E6C879]">
          Here&apos;s Everything You Get
        </p>
        <ul className="space-y-2">
          {INCLUDES.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[10px] text-[#EBCB6B]">
                ✓
              </span>
              <span className="text-[13px] text-paper">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 10 bonuses */}
      <div className="mt-4">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E6C879]">
          Plus — 10 Bonuses, Free
        </p>
        <div className="mx-auto mt-2.5 rounded-xl bg-gradient-to-b from-white to-[#FBF7EC] p-1.5 ring-1 ring-[#C9A84C]/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tfs/bonuses-grid.jpeg"
            alt="10 free bonuses included with the offer"
            className="mx-auto block w-full rounded-lg object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Physical kit */}
      <div className="mt-4">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E6C879]">
          Physical Material — Included
        </p>
        <div className="mx-auto mt-2.5 max-w-[12rem] rounded-xl bg-gradient-to-b from-white to-[#FBF7EC] p-2.5 ring-1 ring-[#C9A84C]/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tfs/product-kit-box.jpeg"
            alt="Physical product kit by Imran Baig"
            className="mx-auto block w-full object-contain"
            style={{ maxHeight: "150px" }}
            loading="lazy"
          />
        </div>
        <p className="mt-2 text-center text-xs text-[#A99F86]">
          Delivered to your doorstep anywhere in India · ∞ Lifetime access
        </p>
      </div>

      <div className="mt-4">
        <GoldCTA label="Claim Offer Now!" />
      </div>
    </>
  );
}

export function OfferPopup() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [shown, setShown] = useState(false); // popup enter transition
  const [expanded, setExpanded] = useState(false); // popup detail expander
  const [navH, setNavH] = useState(64);
  const bannerRef = useRef<HTMLDivElement>(null);

  // First automatic appearance.
  useEffect(() => {
    const t = window.setTimeout(() => setPhase("popup"), FIRST_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Popup: enter animation + lock background scroll while it's open.
  useEffect(() => {
    if (phase !== "popup") return;
    const raf = requestAnimationFrame(() => setShown(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, [phase]);

  // Banner: sit just under the nav and push content down by the strip height so
  // nothing is hidden underneath it. Re-measure on resize.
  useEffect(() => {
    if (phase !== "banner") return;
    const measure = () => {
      const nav = document.querySelector("header");
      setNavH(nav ? nav.offsetHeight : 64);
      const h = bannerRef.current?.offsetHeight ?? 0;
      document.body.style.paddingTop = `${h}px`;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      document.body.style.paddingTop = "";
    };
  }, [phase]);

  function openPopup() {
    setExpanded(true); // opened from the banner → show the full details right away
    setPhase("popup");
  }
  function closePopup() {
    setShown(false);
    setExpanded(false);
    setPhase("banner");
  }

  // ── Banner (permanent strip below the nav) ───────────────────────────────────
  // No close button — it stays. Clicking it re-opens the full offer popup.
  if (phase === "banner") {
    return (
      <div
        ref={bannerRef}
        role="region"
        aria-label="Special offer"
        className="fixed inset-x-0 z-[45]"
        style={{ top: navH }}
      >
        <button
          type="button"
          onClick={openPopup}
          className="block w-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] text-[#0B0B0B] shadow-[0_8px_24px_-10px_rgba(201,168,76,0.8)] transition-[filter] hover:brightness-[1.05]"
        >
          <div className="mx-auto flex max-w-[120rem] items-center gap-3 px-4 py-2 sm:px-8">
            <span aria-hidden className="text-base leading-none">✦</span>
            <span className="min-w-0 flex-1 truncate text-left text-xs font-semibold sm:text-sm">
              <span className="font-bold uppercase tracking-wide">₹2,400 Offer</span>
              <span className="hidden sm:inline"> — Fix your signature &amp; handwriting in 2 days</span>
              <span className="ml-1.5 line-through opacity-60">₹25,000</span>
              <span className="ml-1.5 font-bold">· Save 90%</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#0B0B0B] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F2D98D] sm:text-xs">
              View Offer
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </button>
      </div>
    );
  }

  if (phase !== "popup") return null;

  // ── Popup ──────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop — visual only, does NOT close the popup. */}
      <div
        aria-hidden
        className={
          "absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 " +
          (shown ? "opacity-100" : "opacity-0")
        }
      />

      {/* Small offer card. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Special offer — The First Step"
        className={
          "relative flex max-h-[88vh] w-full max-w-[21rem] flex-col overflow-hidden rounded-3xl border border-[#C9A84C]/50 sm:max-h-[84vh] sm:max-w-3xl " +
          "shadow-[0_30px_90px_-30px_rgba(201,168,76,0.6)] transition-all duration-300 ease-[var(--ease-settle)] " +
          (shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0")
        }
        style={{ background: "linear-gradient(180deg, #15110A 0%, #0B0B0B 100%)" }}
      >
        {/* Close — pinned to the card corner. */}
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close offer"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-black/60 text-[#C9A84C] backdrop-blur-sm transition-colors hover:bg-[#C9A84C]/20 hover:text-[#EBCB6B]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* On desktop this lays out as a wider, landscape two-column card:
            offer summary on the left, the full details on the right. On mobile
            it stays a compact single column with the bonuses expander. */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto sm:flex-row sm:overflow-hidden">
          {/* Left — offer summary */}
          <div className="flex flex-col px-5 pb-5 pt-8 text-center sm:w-[42%] sm:shrink-0 sm:justify-center sm:border-r sm:border-[#C9A84C]/20 sm:px-8 sm:py-10 sm:text-left">
            {/* Ribbon */}
            <div className="mb-4 flex justify-center sm:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-4 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B0B0B] shadow-[0_10px_30px_-10px_rgba(201,168,76,0.8)]">
                ✦ Special One-Time Offer
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-xl leading-tight text-paper sm:text-3xl">
              Fix Your Signature &amp; Handwriting
            </h2>
            <p className="mx-auto mt-1.5 max-w-[16rem] text-xs text-[#A99F86] sm:mx-0 sm:max-w-none sm:text-sm">
              Learn &amp; practise in just 2 days — carry it for life.
            </p>

            {/* Price */}
            <div className="mt-3 flex flex-col items-center gap-1 sm:mt-5 sm:items-start">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-[#8C8678] line-through">₹25,000</span>
                <span className="rounded-md bg-gradient-to-br from-[#F2D98D] to-[#C9A84C] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#0B0B0B]">
                  Save 90%
                </span>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="text-4xl font-extrabold leading-none tracking-tight tabular-nums text-[#EBCB6B] sm:text-5xl"
                  style={{ textShadow: "0 0 30px rgba(242, 217, 141, 0.45)" }}
                >
                  ₹2,400
                </span>
                <span className="text-xl font-bold text-[#EBCB6B]/70">/-</span>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C8678]">
                You save ₹22,600 today
              </p>
            </div>

            {/* Primary CTA */}
            <div className="mt-4 sm:mt-6">
              <GoldCTA label="Claim Offer Now!" />
              <p className="mt-1.5 text-[10px] text-[#8C8678]">Secure payment · Fast delivery</p>
            </div>

            {/* Expander — mobile only (desktop shows the details column already). */}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-[#C9A84C]/50 bg-[#C9A84C]/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#EBCB6B] transition-colors hover:bg-[#C9A84C]/12 sm:hidden"
            >
              ✦ Get 10 extra bonuses — Free
              <svg
                viewBox="0 0 24 24"
                className={"h-3.5 w-3.5 transition-transform duration-300 " + (expanded ? "rotate-180" : "")}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dismiss → becomes the top banner */}
            <button
              type="button"
              onClick={closePopup}
              className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#8C8678] transition-colors hover:text-[#A99F86] sm:mt-6"
            >
              No thanks, maybe later
            </button>
          </div>

          {/* Right — full details. Collapsible on mobile; always shown on desktop. */}
          <div
            className={
              "px-5 text-center transition-all duration-500 ease-[var(--ease-settle)] " +
              (expanded ? "mt-1 max-h-[46vh] overflow-y-auto pb-6 opacity-100" : "max-h-0 overflow-hidden opacity-0") +
              " sm:mt-0 sm:max-h-[84vh] sm:flex-1 sm:overflow-y-auto sm:px-7 sm:py-8 sm:opacity-100"
            }
          >
            <OfferDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
