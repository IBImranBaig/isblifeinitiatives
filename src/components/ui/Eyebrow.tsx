import { cn } from "@/lib/utils/cn";

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Show the editorial rule line before the label (desktop only). */
  rule?: boolean;
}

/**
 * Small-caps section label — the editorial byline. Warm ember, wide tracking.
 * Consistent kicker above every section's heading.
 */
export function Eyebrow({ rule = false, className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.45em] text-ember-soft/80",
        className,
      )}
      {...props}
    >
      {rule && <span className="hidden h-px w-8 bg-ember/40 lg:inline-block" />}
      {children}
    </p>
  );
}
