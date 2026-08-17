"use client";

import { useEffect, useState } from "react";
import { InkFlourish } from "@/components/motion/InkFlourish";

const CHECKOUT_URL = "https://courses.imranbaig.co/l/e39eaf0b63";

const includes = [
  "Learn 40+ things to evaluate in your handwriting",
  "21-day guided practice book",
  "Lifetime access — your journey of self-mastery",
  "Physical book delivered to your doorstep (India)",
  "Plus 10 premium bonuses — absolutely free",
];

function CountDown({
  from,
  to,
  duration = 1700,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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

const GoldCTA = ({ label }: { label: string }) => (
  <a
    href={CHECKOUT_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="tfs-pulse-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-8 py-4 text-base font-bold uppercase tracking-wider text-[#0B0B0B] transition-transform hover:-translate-y-0.5 md:text-lg"
  >
    {label}
  </a>
);

export function TfsOffer() {
  return (
    <main className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <section
          className="relative overflow-hidden rounded-3xl border border-[#C9A84C]/50 px-5 pb-8 pt-10 text-center shadow-[0_30px_90px_-30px_rgba(201,168,76,0.5)] md:px-10 md:pb-10 md:pt-12"
          style={{ background: "linear-gradient(180deg, #15110A 0%, #0B0B0B 100%)" }}
        >
          {/* Ribbon */}
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0B0B0B] shadow-[0_10px_30px_-10px_rgba(201,168,76,0.8)] md:text-xs">
              ✦ Special One-Time Offer
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl leading-tight text-paper md:text-4xl">
            Fix Your Signature &amp; Handwriting
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#A99F86] md:text-base">
            Learn &amp; practise in just 2 days — and carry it for life.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#E6C879]">
            Your one-time price — you won&apos;t find it anywhere else.
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

          {/* CTA — the scroll-pen traces this flourish on load (resting near the
              button), then roams on scroll like the homepage. */}
          <div className="mt-5">
            <div className="mb-4 flex justify-center">
              <InkFlourish trigger="mount" className="[&_path]:stroke-[#C9A84C]" />
            </div>
            <GoldCTA label="Claim Offer Now!" />
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
          <div className="mt-6">
            <GoldCTA label="Claim Offer Now!" />
            <p className="mt-2 text-xs text-[#8C8678]">
              ✓ Secure payment · ✓ Premium material · ✓ Fast delivery
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
