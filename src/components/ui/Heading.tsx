import { cn } from "@/lib/utils/cn";

type Size = "sm" | "md" | "lg" | "xl";

const sizes: Record<Size, string> = {
  sm: "text-display-sm",
  md: "text-display-md",
  lg: "text-display-lg",
  xl: "text-display-xl",
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  size?: Size;
}

/**
 * Display headings — high-contrast serif, drawn from the shared type scale.
 * Every section title uses this so sizing/leading/tracking stay consistent.
 */
export function Heading({ as: Tag = "h2", size = "lg", className, children, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display font-medium tracking-[-0.02em] text-balance text-current",
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
