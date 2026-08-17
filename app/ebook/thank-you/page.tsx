import type { Metadata } from "next";
import { EbookThankYou } from "./EbookThankYou";

export const metadata: Metadata = {
  title: "You're In — Free Signature Workbook",
  description:
    "Your free Signature Workbook is ready. Join the WhatsApp community, download your PDF, and unlock a one-time offer.",
  robots: { index: false, follow: false },
};

export default function EbookThankYouPage() {
  return <EbookThankYou />;
}
