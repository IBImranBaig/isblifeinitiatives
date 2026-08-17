import type { Metadata } from "next";
import { TfsOffer } from "./TfsOffer";

export const metadata: Metadata = {
  title: "The First Step — Special Offer",
  description:
    "Fix your signature & handwriting in just 2 days. One-time price: ₹2,400 (was ₹25,000) — plus 10 free bonuses and a physical book delivered to your doorstep.",
  robots: { index: false, follow: false },
};

export default function TfsOfferPage() {
  return <TfsOffer />;
}
