import type { Metadata } from "next";
import { TpaPaid } from "./TpaPaid";

export const metadata: Metadata = {
  title: "Professional Approach — One-Time Upgrade",
  description:
    "Your First Step is confirmed. Upgrade to the Professional Approach certification for a one-time ₹41,300 — your ₹2,400 First Step fee credited in full, only on this page.",
  robots: { index: false, follow: false },
};

/**
 * Pull the buyer's first name from the checkout redirect's query string so the
 * offer reads as 1-of-1. Configure the ₹2,400 checkout's post-purchase redirect
 * as e.g. https://imranbaig.com/tpapaid?name={first_name} (the merge-tag syntax
 * varies by platform). Accepts name / fname / first_name / firstname / fullname.
 */
function firstNameFrom(sp: Record<string, string | string[] | undefined>): string {
  const keys = ["name", "fname", "first_name", "firstname", "fullname", "full_name"];
  let raw = "";
  for (const k of keys) {
    const v = sp[k];
    if (typeof v === "string" && v.trim()) {
      raw = v;
      break;
    }
    if (Array.isArray(v) && v[0]?.trim()) {
      raw = v[0];
      break;
    }
  }
  const first = raw.trim().split(/\s+/)[0]?.replace(/[^\p{L}'-]/gu, "") ?? "";
  if (!first) return "";
  return first.charAt(0).toLocaleUpperCase() + first.slice(1, 24).toLocaleLowerCase();
}

export default async function TpaPaidPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const name = firstNameFrom(await searchParams);
  return <TpaPaid name={name} />;
}
