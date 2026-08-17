import { cn } from "@/lib/utils/cn";

type Variant = "lead" | "body" | "fine";

const variants: Record<Variant, string> = {
  // Subheadlines / intros — the larger reading voice.
  lead: "text-lead leading-relaxed text-paper/65",
  // Default paragraph copy.
  body: "text-base leading-relaxed text-paper/70",
  // Trust lines / captions — faint, tracked.
  fine: "text-[0.7rem] uppercase tracking-[0.3em] text-paper/30",
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: Variant;
}

/**
 * Body typography in three registers. Sections compose these instead of
 * hand-setting size/leading/opacity.
 */
export function Text({ variant = "body", className, children, ...props }: TextProps) {
  return (
    <p className={cn(variants[variant], className)} {...props}>
      {children}
    </p>
  );
}
