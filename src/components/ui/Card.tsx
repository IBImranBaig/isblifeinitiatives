import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: "article" | "div" | "li";
  /** Adds the hover lift + border/glow response. */
  interactive?: boolean;
  /** Remove default padding (for full-bleed media cards). */
  flush?: boolean;
}

/**
 * The surface primitive. One frosted panel treatment for every card on the
 * site — testimonials, podcasts, dimension tiles — so they all share the
 * same radius, hairline, padding, and hover behaviour.
 */
export function Card({
  as: Tag = "article",
  interactive = false,
  flush = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        !flush && "p-6 sm:p-8",
        interactive &&
          "transition-[transform,border-color,background-color] duration-500 ease-[var(--ease-settle)] hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
