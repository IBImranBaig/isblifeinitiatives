import type { Metadata } from "next";
import { EbookLanding } from "./EbookLanding";

export const metadata: Metadata = {
  title: "Free Signature Workbook — Imran Baig",
  description:
    "Discover what graphologists see in just three strokes. Claim your free Signature Workbook from handwriting analysis coach Imran Baig — as featured on Figuring Out with Raj Shamani.",
  robots: { index: false, follow: false },
};

export default function EbookLandingPage() {
  return <EbookLanding />;
}
