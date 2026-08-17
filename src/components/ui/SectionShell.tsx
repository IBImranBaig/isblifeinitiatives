import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

type Theme = "ink" | "paper";

const themes: Record<Theme, string> = {
  // Transparent so the site-wide AmbientBackground shows through; the dark base
  // comes from that fixed layer (and the body) behind it.
  ink: "text-paper",
  paper: "bg-paper text-ink",
};

interface SectionShellProps {
  children: React.ReactNode;
  /** Used for the in-page anchor and aria-labelledby wiring. */
  id?: string;
  /** Accessible name for the landmark. */
  label?: string;
  theme?: Theme;
  /** Wrap children in the standard Container (default true). */
  contained?: boolean;
  className?: string;
}

/**
 * The standard wrapper for every stacked section (the Hero is a bespoke
 * full-bleed exception). Owns vertical rhythm + the light/dark band so the
 * page reads as a single composition. Future sections inherit spacing here.
 */
export function SectionShell({
  children,
  id,
  label,
  theme = "ink",
  contained = true,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative w-full py-section lg:py-section-lg",
        themes[theme],
        className,
      )}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
