import { cn } from "@/lib/utils/cn";

/** Five ember stars — the lightweight review signal. */
export function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-1", className)} role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5 fill-ember">
          <path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z" />
        </svg>
      ))}
    </div>
  );
}
