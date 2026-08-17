import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "link" | "ghost";

const base = "group relative inline-flex items-center gap-2 text-sm transition-all";

const variants: Record<Variant, string> = {
  // The invitation — warm paper capsule.
  primary:
    "overflow-hidden rounded-pill bg-paper px-8 py-3.5 font-semibold text-ink duration-700 ease-[var(--ease-settle)] hover:scale-[1.03]",
  // The quiet alternative — text with an ink-underline draw.
  link: "py-2 font-medium text-paper/75 duration-500 hover:text-paper",
  // Bordered capsule — neutral secondary action.
  ghost:
    "rounded-pill border border-white/15 px-8 py-3.5 font-medium text-paper/90 backdrop-blur-sm duration-500 hover:border-white/35 hover:text-paper",
};

type CommonProps = {
  variant?: Variant;
  /** Show the trailing arrow that nudges on hover. */
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  (
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

/**
 * The one button. Renders an <a> when `href` is set, otherwise a <button>.
 * Every CTA across the site is one of these three variants — no bespoke
 * button styling in sections.
 */
export function Button({ variant = "primary", withArrow = false, className, children, ...props }: ButtonProps) {
  const content = (
    <>
      {children}
      {withArrow && (
        <span className="transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-x-1">
          →
        </span>
      )}
      {variant === "link" && (
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ember/70 transition-transform duration-500 ease-[var(--ease-ink)] group-hover:scale-x-100" />
      )}
    </>
  );

  const classes = cn(base, variants[variant], className);

  if (typeof props.href === "string") {
    return (
      <a className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
