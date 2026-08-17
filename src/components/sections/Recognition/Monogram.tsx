import { cn } from "@/lib/utils/cn";

/**
 * An expert's initials in a ringed disc — an elegant, photo-free stand-in.
 *
 * ── ENHANCEMENT SLOT ───────────────────────────────────────────────────────
 * Each monogram is a portrait slot. Swap in a real headshot, a cinematic
 * <ImageSequence> (a slow portrait reveal), or — for the whole roster — a 3D
 * ring of busts via <LazyScene>, keeping these as the instant poster/fallback.
 * `bg-ink` lets the disc sit over the connecting thread without breaking it.
 */
export function Monogram({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full border border-ember/30 bg-ink font-display text-ember-soft transition-all duration-500",
        className,
      )}
    >
      {initials}
    </span>
  );
}
