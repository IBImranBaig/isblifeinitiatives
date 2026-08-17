import { Monogram } from "./Monogram";

/**
 * A roster member: monogram + name + role. Hover lifts the disc and warms its
 * ring (CSS group-hover — no client state). Reads as a curated council, not a
 * logo wall.
 */
export function Medallion({
  initials,
  name,
  role,
}: {
  initials: string;
  name: string;
  role: string;
}) {
  return (
    <div className="group flex w-28 flex-col items-center text-center sm:w-32">
      <Monogram
        initials={initials}
        className="h-20 w-20 text-xl group-hover:-translate-y-1.5 group-hover:border-ember/70 group-hover:text-ember group-hover:shadow-[0_0_28px_rgba(91,134,232,0.32)]"
      />
      <span className="mt-5 font-display text-base leading-tight text-paper">{name}</span>
      <span className="mt-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-paper/45">{role}</span>
    </div>
  );
}
