import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/sections/LegalDocument";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Our refund policy for programs and courses offered by Imran Baig.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "All Courses Are Non-Refundable",
    body: (
      <>
        <p>We encourage you to carefully consider your options before making a purchase.</p>
        <p>
          Thank you for choosing Imran Baig. Your trust and satisfaction are our top
          priorities.
        </p>
      </>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Refund Policy"
      updated="5 June 2026"
      intro="At Imran Baig, we are dedicated to providing exceptional service and ensuring your satisfaction with our offerings. We understand that making a purchase is a significant decision, and we want you to feel confident in your choice."
      sections={SECTIONS}
    />
  );
}
