import { cn } from "@/lib/utils/cn";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show the cool "data" dot (the lone cold accent). */
  dot?: boolean;
}

/**
 * Frosted badge / chip. The cool dot is the single cold accent in an
 * otherwise warm system — reserved for "data/science" signposting.
 */
export function Pill({ dot = false, className, children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-paper/55 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {dot && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_12px_var(--color-glow)]" />
      )}
      {children}
    </span>
  );
}
