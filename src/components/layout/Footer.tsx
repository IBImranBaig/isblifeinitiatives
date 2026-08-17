import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InkFlourish } from "@/components/motion/InkFlourish";
import { SmoothLink } from "./SmoothLink";

const EXPLORE = [
  { label: "The Method", href: "#method" },
  { label: "Programs", href: "#programs" },
  { label: "About Imran", href: "#about" },
  { label: "Podcasts", href: "#podcasts" },
  { label: "Reviews", href: "#testimonials" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/imranbaig.ib?igsh=bWFydXZwYWNlbDUy" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ibimranbaig/" },
  { label: "YouTube", href: "https://imranbaig.co/YouTube" },
  { label: "Facebook", href: "https://imranbaig.co/Facebook" },
];

const POLICIES = [
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Comment Policy", href: "/comment-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Earning Policy", href: "/earning-policy" },
  { label: "Disclosure", href: "/disclosure" },
];

const linkClass = "text-sm text-paper/55 transition-colors duration-300 hover:text-paper";
const colHeadClass = "text-[0.7rem] font-medium uppercase tracking-[0.28em] text-paper/40";

/**
 * FOOTER — quiet, architectural close. Editorial, consistent with the system:
 * wordmark + brand statement + signature flourish, then Explore / Connect /
 * Contact columns, a privacy note (handwriting is personal data), and a legal
 * bottom bar. Server-rendered; section links smooth-scroll via <SmoothLink>.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink">
      <Container className="py-20 lg:py-28">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-5">
            <Eyebrow>The Mind Decoder</Eyebrow>
            <p className="mt-4 font-display text-3xl font-medium text-paper">Imran Baig</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/50">
              Decoding personality, health and the subconscious — one line of
              handwriting at a time.
            </p>
            <InkFlourish className="mt-7 w-40" trigger="inView" />
          </div>

          {/* Explore */}
          <nav className="col-span-1 lg:col-span-3" aria-label="Explore">
            <h3 className={colHeadClass}>Explore</h3>
            <ul className="mt-5 space-y-3.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <SmoothLink href={l.href} className={linkClass}>
                    {l.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <nav className="col-span-1 lg:col-span-2" aria-label="Social">
            <h3 className={colHeadClass}>Connect</h3>
            <ul className="mt-5 space-y-3.5">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className={colHeadClass}>Contact</h3>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a href="mailto:admin@penmanship.academy" className={linkClass}>
                  admin@penmanship.academy
                </a>
              </li>
              <li className="text-sm text-paper/40">Live masterclass, worldwide</li>
              <li>
                <a
                  href="https://website.imranbaig.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ember-soft transition-colors duration-300 hover:text-paper"
                >
                  Join the Masterclass →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Privacy note */}
        <p className="mt-16 text-xs text-paper/35 lg:mt-24">
          Your handwriting is personal. We treat it with care.
        </p>

        {/* Legal bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/40">
            © 2026 Imran Baig. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-paper/50">
            {POLICIES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="transition-colors duration-300 hover:text-paper"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
