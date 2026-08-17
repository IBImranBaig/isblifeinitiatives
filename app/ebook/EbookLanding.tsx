"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/* ── Funnel constants ─────────────────────────────────────────────── */
const SETTLE = [0.16, 1, 0.3, 1] as const;

const TAKEAWAYS = [
  {
    n: "01",
    title: "Behavioural science, not pseudoscience",
    body: "The neurological link between your handwriting and your subconscious — and why a few strokes reveal more than a 60-minute conversation.",
  },
  {
    n: "02",
    title: "The signature mistakes 9 in 10 people make",
    body: "The common signature traps that quietly sabotage confidence, money, and relationships — and the simple corrections that change the trajectory.",
  },
  {
    n: "03",
    title: "Your handwriting & your health",
    body: "How graphotherapy supports emotional regulation, focus, and even physical wellbeing — backed by patterns Imran has seen across thousands of clients.",
  },
];

/* ── Small primitives ─────────────────────────────────────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: SETTLE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#E6C879]">
      <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#C9A84C]/70" />
      {children}
      <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#C9A84C]/70" />
    </p>
  );
}

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent ${className}`}
      aria-hidden
    />
  );
}

function scrollToClaim(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("claim")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const PrimaryCTA = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <a
    href="#claim"
    onClick={scrollToClaim}
    className={`tfs-pulse-glow inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] px-9 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#0B0B0B] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </a>
);

/* ── Page ─────────────────────────────────────────────────────────── */
export function EbookLanding() {
  return (
    <main className="relative overflow-hidden text-paper" style={{ background: "#0B0B0B" }}>
      {/* Atmospheric warm glow, top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.04) 38%, transparent 70%)",
        }}
      />

      <Hero />
      <Takeaways />
      <About />
      <Podcast />
      <ClaimForm />
      <ClosingCTA />
      <FunnelFooter />
    </main>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
function scrollToId(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

function Stat({ n, accent, label }: { n: string; accent?: string; label: string }) {
  return (
    <div>
      <p className="font-sans text-2xl font-extrabold tracking-tight text-paper md:text-[1.75rem]">
        {n}
        {accent && <span className="text-[#EBCB6B]">{accent}</span>}
      </p>
      <p className="mt-1 text-[0.66rem] font-medium uppercase tracking-[0.18em] text-[#8C8678]">
        {label}
      </p>
    </div>
  );
}

function Hero() {
  const item = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: SETTLE, delay },
  });

  return (
    <section className="relative isolate flex flex-col overflow-hidden">
      {/* warm glow, upper-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -z-10 h-[60vh] w-[70vw]"
        style={{ background: "radial-gradient(45% 50% at 28% 22%, rgba(201,168,76,0.16), transparent 72%)" }}
      />
      {/* warm glow behind the cutout (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 -z-10 hidden h-[85vh] w-[48vw] lg:block"
        style={{ background: "radial-gradient(48% 52% at 62% 58%, rgba(201,168,76,0.18), transparent 70%)" }}
      />

      {/* Mobile cutout — centered on top, copy below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: SETTLE }}
        className="relative z-0 mt-10 flex w-full justify-center lg:hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ebook/hero-imran.png"
          alt="Imran Baig — handwriting analysis coach"
          className="h-auto w-[86%] max-w-[360px] select-none object-contain"
          loading="eager"
        />
      </motion.div>

      {/* Copy + desktop cutout in one width-driven row, so text and image scale
          together at any zoom level (no viewport-height sizing). */}
      <div className="relative z-10 mx-auto flex w-full max-w-[84rem] flex-col px-6 pb-16 pt-10 lg:flex-row lg:items-center lg:justify-center lg:gap-14 lg:py-20">
        <div className="mx-auto max-w-[34rem] text-center lg:mx-0 lg:text-left">
          <motion.p
            {...item(0)}
            className="flex items-center justify-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#E6C879] lg:justify-start"
          >
            <span className="h-px w-9 bg-[#C9A84C]" />
            Free Signature Workbook
          </motion.p>

          <motion.h1
            {...item(0.08)}
            className="mt-6 font-sans text-[clamp(2.7rem,6.4vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-paper"
          >
            Your Pen Is a<br />
            <span className="text-[#EBCB6B]">Window</span> Into<br />
            Your Mind
          </motion.h1>

          <motion.p
            {...item(0.2)}
            className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-[#B8AD92] md:text-lg lg:mx-0"
          >
            Discover what graphologists see in just{" "}
            <span className="font-semibold text-paper">three strokes</span> — and what your
            signature is silently saying about your{" "}
            <span className="font-semibold text-[#E6C879]">confidence, money, and relationships</span>.
          </motion.p>

          <motion.div
            {...item(0.3)}
            className="mt-9 flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-7 lg:gap-y-4"
          >
            <PrimaryCTA className="w-full lg:w-auto">Claim My Free Workbook</PrimaryCTA>
            <a
              href="#podcast"
              onClick={scrollToId("podcast")}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-paper/90 transition-colors hover:text-[#EBCB6B]"
            >
              Watch the Podcast
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
          </motion.div>

          <motion.div {...item(0.42)} className="mt-12 flex items-center justify-center gap-6 sm:gap-9 lg:justify-start">
            <Stat n="1,000" accent="+" label="Community" />
            <span className="h-9 w-px bg-white/12" aria-hidden />
            <Stat n="128" accent="+" label="Traits Decoded" />
            <span className="h-9 w-px bg-white/12" aria-hidden />
            <Stat n="3" label="Strokes To Read You" />
          </motion.div>
        </div>

        {/* Desktop cutout — width-driven, scales with the layout (not viewport height) */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: SETTLE }}
          className="relative hidden shrink-0 self-end lg:block lg:w-[40%] lg:max-w-[30rem]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ebook/hero-imran.png"
            alt="Imran Baig — handwriting analysis coach"
            className="block w-full select-none object-contain"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Featured strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: SETTLE, delay: 0.6 }}
        className="relative z-10 border-t border-white/5 bg-[#0B0B0B]/70 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-[84rem] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-5 lg:justify-start">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#6f6a60]">
            As Featured On
          </span>
          <span className="text-sm text-[#A99F86]">Figuring Out with Raj Shamani</span>
          <span className="text-[#3a342a]" aria-hidden>
            ·
          </span>
          <span className="text-sm text-[#8C8678]">The Mind Decoder Podcast</span>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Takeaways ────────────────────────────────────────────────────── */
function Takeaways() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <Eyebrow>From the Podcast</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight text-paper">
            Three truths Imran shared on Figuring Out
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TAKEAWAYS.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.1}>
              <article
                className="group h-full rounded-[1.5rem] border border-[#C9A84C]/15 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A84C]/45"
                style={{ background: "linear-gradient(180deg, #15110A 0%, #0E0C07 100%)" }}
              >
                <div className="font-display text-5xl text-[#C9A84C]/70 transition-colors duration-500 group-hover:text-[#EBCB6B]">
                  {t.n}
                </div>
                <h3 className="mt-5 font-display text-xl leading-snug text-paper md:text-2xl">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#A99F86] md:text-[0.95rem]">
                  {t.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About ────────────────────────────────────────────────────────── */
function About() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>What is Graphotherapy</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight text-paper">
            A behavioural science —<br className="hidden sm:block" /> not pseudoscience.
          </h2>
          <div className="mt-8 flex justify-center">
            <GoldDivider className="w-28" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-[#B8AD92] md:text-lg">
            <p>
              Every stroke you make is a snapshot of your subconscious. Handwriting and signatures
              are produced by the same brain pathways that shape your beliefs, emotions, and
              decisions — which is why graphologists can read patterns you don&apos;t even know you
              have.
            </p>
            <p>
              Graphotherapy is the practice of{" "}
              <span className="text-paper">re-training those strokes</span> to rewire the patterns
              underneath. Done right, it&apos;s one of the most elegant tools in modern behavioural
              change — and it leaves a visible trail you can measure.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Podcast ──────────────────────────────────────────────────────── */
function Podcast() {
  return (
    <section id="podcast" className="scroll-mt-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <Eyebrow>As Featured On</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight text-paper">
            Figuring Out with Raj Shamani
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A99F86]">
            Imran sat down with Raj to break down graphotherapy, the science behind your signature,
            and the small strokes that quietly shape your life.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {["/ebook/raj-shamani-1.jpg", "/ebook/raj-shamani-2.jpg"].map((src, i) => (
            <Reveal key={src} delay={i * 0.1}>
              <figure className="overflow-hidden rounded-[1.5rem] ring-1 ring-[#C9A84C]/15 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Imran Baig with Raj Shamani on the Figuring Out podcast"
                  className={`aspect-[3/2] w-full object-cover ${i === 1 ? "object-[center_22%]" : "object-center"}`}
                  loading="lazy"
                />
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mx-auto mt-6 max-w-4xl">
          <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-[#C9A84C]/15 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/uokt0pavxhM"
                title="Imran Baig on Figuring Out with Raj Shamani"
                className="h-full w-full"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Claim form (conversion centerpiece) ──────────────────────────── */
type Errors = Partial<
  Record<"name" | "email" | "phone" | "profession" | "consent" | "form", string>
>;

function ClaimForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      profession: String(fd.get("profession") ?? "").trim(),
      consent: fd.get("consent") === "on",
    };

    const next: Errors = {};
    if (!data.name) next.name = "Please enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) next.email = "Enter a valid email";
    if (!/^[+0-9\s\-()]{5,}$/.test(data.phone)) next.phone = "Enter a valid phone number";
    if (!data.profession) next.profession = "Please enter your profession";
    if (!data.consent) next.consent = "Please tick the box to continue";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ebook-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !json.ok) {
        setErrors({ form: json.error ?? "Something went wrong. Please try again." });
        setLoading(false);
        return;
      }
      try {
        sessionStorage.setItem("ebookFirstName", data.name.split(/\s+/)[0] ?? "");
      } catch {}
      // Clean URL on the subdomain (ebook.imranbaig.com/thank-you); path route locally.
      const onSubdomain =
        typeof window !== "undefined" && window.location.hostname.startsWith("ebook.");
      router.push(onSubdomain ? "/thank-you" : "/ebook/thank-you");
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setLoading(false);
    }
  }

  return (
    <section id="claim" className="scroll-mt-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-[#C9A84C]/40 px-6 py-10 shadow-[0_40px_120px_-40px_rgba(201,168,76,0.4)] sm:px-10 md:py-12"
            style={{ background: "linear-gradient(180deg, #161009 0%, #0B0B0B 100%)" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(201,168,76,0.28), transparent 70%)" }}
            />

            <div className="text-center">
              <Eyebrow>Instant Access</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium leading-tight text-paper">
                Unlock Your Free Signature Workbook
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#A99F86] md:text-base">
                Drop your details below and instantly access the same workbook Imran uses with his
                private clients.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="relative">
                {/* divine golden halo */}
                <div
                  aria-hidden
                  className="ebook-halo pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(242,217,141,0.55) 0%, rgba(201,168,76,0.22) 45%, transparent 70%)",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ebook/workbook-cover.png"
                  alt="Decoding Signatures — the free Signature Workbook"
                  className="ebook-float h-auto w-40 select-none drop-shadow-[0_26px_50px_rgba(201,168,76,0.4)] sm:w-44"
                  loading="lazy"
                />
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" type="text" autoComplete="name" error={errors.name} />
                <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Phone (with country code)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98xxxxxxxx"
                  error={errors.phone}
                />
                <Field
                  label="Profession"
                  name="profession"
                  type="text"
                  autoComplete="organization-title"
                  placeholder="Founder, Designer…"
                  error={errors.profession}
                />
              </div>

              <label className="flex items-start gap-3 pt-1 text-sm leading-relaxed text-[#A99F86]">
                <input
                  type="checkbox"
                  name="consent"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#C9A84C]"
                />
                <span>
                  Yes, send me the workbook plus occasional handwriting insights from Imran. I can
                  unsubscribe anytime.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-[#E0857A]">{errors.consent}</p>}

              {errors.form && (
                <p className="rounded-lg border border-[#E0857A]/40 bg-[#E0857A]/10 p-3 text-sm text-[#E0857A]">
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="tfs-pulse-glow mt-2 w-full rounded-full bg-gradient-to-r from-[#C9A84C] via-[#F2D98D] to-[#C9A84C] py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#0B0B0B] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? "Sending…" : "Send Me The Workbook"}
              </button>
              <p className="text-center text-xs text-[#8C8678]">
                100% free · No spam · Unsubscribe anytime
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#8C8678]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#C9A84C]/20 bg-black/40 px-4 py-3 text-sm text-paper outline-none transition-colors duration-300 placeholder:text-[#8C8678]/60 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/40"
      />
      {error && <p className="mt-1.5 text-xs text-[#E0857A]">{error}</p>}
    </div>
  );
}

/* ── Closing CTA ──────────────────────────────────────────────────── */
function ClosingCTA() {
  return (
    <section className="px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight text-paper">
          Your next breakthrough is one <span className="italic text-[#EBCB6B]">stroke</span> away.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#B8AD92] md:text-lg">
          Download the free Signature Workbook and start practising the exact strokes Imran uses
          with private clients.
        </p>
        <div className="mt-10">
          <PrimaryCTA>Send Me The Workbook</PrimaryCTA>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Slim funnel footer ───────────────────────────────────────────── */
function FunnelFooter() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <p className="font-display text-lg font-medium text-paper">Imran Baig</p>
        <GoldDivider className="w-20" />
        <p className="text-xs text-[#8C8678]">
          © {new Date().getFullYear()} Imran Baig · The Mind Decoder
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#8C8678]">
          <a href="mailto:admin@penmanship.academy" className="transition-colors hover:text-[#EBCB6B]">
            admin@penmanship.academy
          </a>
          <a
            href="https://imranbaig.com/privacy"
            className="transition-colors hover:text-[#EBCB6B]"
          >
            Privacy
          </a>
          <a href="https://imranbaig.com" className="transition-colors hover:text-[#EBCB6B]">
            imranbaig.com
          </a>
        </div>
      </div>
    </footer>
  );
}
