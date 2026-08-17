import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/sections/About/CountUp";

interface Stat {
  to: number;
  grouped?: boolean;
  decimals?: number;
  suffix?: string;
  label: string;
}

/**
 * STATS BAR — instant credibility, high on the page. A quiet row of authority
 * numbers (each counts up on scroll-in) that frames everything below as proven,
 * not promised. Figures track the copy used elsewhere on the site.
 */
const STATS: Stat[] = [
  { to: 22, suffix: "+", label: "Years of Mastery" },
  { to: 100000, grouped: true, suffix: "+", label: "Lives Transformed" },
  { to: 128, suffix: "+", label: "Traits Decoded" },
  { to: 5, decimals: 1, suffix: "★", label: "Client Rating" },
];

export function Stats() {
  return (
    <SectionShell label="By the numbers" className="py-10 lg:py-14">
      <Reveal>
        <div className="grid grid-cols-2 gap-y-10 rounded-card border border-white/10 bg-white/[0.03] px-6 py-10 backdrop-blur-sm sm:px-10 lg:grid-cols-4 lg:gap-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center lg:px-8 ${
                i > 0 ? "lg:border-l lg:border-white/10" : ""
              }`}
            >
              <p className="font-display text-4xl font-medium leading-none text-paper sm:text-5xl">
                <CountUp to={s.to} grouped={s.grouped} decimals={s.decimals} />
                <span className="text-ember-soft">{s.suffix}</span>
              </p>
              <p className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
