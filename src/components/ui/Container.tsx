import { cn } from "@/lib/utils/cn";

type Size = "default" | "wide" | "full";

const sizes: Record<Size, string> = {
  default: "max-w-[100rem]",
  wide: "max-w-[110rem]",
  full: "max-w-none",
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

/**
 * Horizontal rhythm. The single source of the page gutter — every section's
 * content is measured against this so left/right edges align site-wide.
 */
export function Container({ size = "default", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-6 sm:px-10 lg:px-[7vw]", sizes[size], className)}
      {...props}
    />
  );
}
