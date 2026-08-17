import { CountUp } from "./CountUp";
import { cn } from "@/lib/utils/cn";

/**
 * The authority stat — a light "paper" badge that overhangs the portrait
 * (a premium, recognisable device). Counts up to 22 on scroll-in.
 */
export function YearsBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-paper px-6 py-5 text-ink shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <div className="flex items-baseline gap-0.5 font-display text-4xl font-medium leading-none">
        <CountUp to={22} />
        <span className="text-ember-deep">+</span>
      </div>
      <span className="mt-2 block text-[0.6rem] font-medium uppercase tracking-[0.28em] text-ink/60">
        Years of Excellence
      </span>
    </div>
  );
}
