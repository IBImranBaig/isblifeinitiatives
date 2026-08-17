import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/sections/LegalDocument";

export const metadata: Metadata = {
  title: "Earning Policy",
  description:
    "Income disclaimer for Imran Baig products and services — no earnings projections, promises or guarantees.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "No Earnings Projections, Promises or Representations",
    body: (
      <p>
        We have made no implications, warranties, promises, suggestions,
        projections, representations or guarantees whatsoever to you about future
        prospects or earnings in connection with any Imran Baig product or service,
        and we have made no promises or representations regarding future income.
      </p>
    ),
  },
  {
    heading: "Earnings Examples & Prior Results",
    body: (
      <p>
        Any income statements or examples we provide are only estimates of what we
        think you could possibly earn. There is no assurance you will do as well as
        any example stated, and past results are not a reliable indicator of future
        success. You accept the risk that earnings and income differ by individual.
      </p>
    ),
  },
  {
    heading: "Risk Factors",
    body: <p>Your results depend on factors that include, but are not limited to, the following:</p>,
    subsections: [
      {
        heading: "The Economy",
        body: (
          <p>
            The economy, both locally and globally, creates uncertainty and may
            negatively affect results, regardless of the quality of any product or
            service.
          </p>
        ),
      },
      {
        heading: "Your Success Or Lack Of It",
        body: (
          <p>
            Your success depends on factors personal to you — your work ethic,
            background, skills, knowledge, motivation, dedication and finances. We do
            not know you or these factors, and therefore we do not guarantee or imply
            that you will get rich, that you will do as well, or that you will make
            any money at all.
          </p>
        ),
      },
      {
        heading: "Forward-Looking Statements",
        body: (
          <p>
            Statements using words such as &ldquo;anticipate&rdquo;,
            &ldquo;estimate&rdquo;, &ldquo;expect&rdquo;, &ldquo;project&rdquo; or
            &ldquo;intend&rdquo; are forward-looking opinions only and are not a
            guarantee that you will achieve the stated results.
          </p>
        ),
      },
      {
        heading: "Due Diligence",
        body: (
          <p>
            You are advised to do your own due diligence and to consult your
            accountant, lawyer or professional advisor before acting on any
            information we provide. Nothing on this site or in our materials
            constitutes professional advice, and we assume no responsibility for any
            losses or damages resulting from your use of the information provided.
          </p>
        ),
      },
      {
        heading: "Purchase Price",
        body: (
          <p>
            The purchase price for our products and services has been arbitrarily set
            and bears no relationship to any objective standard of value.
          </p>
        ),
      },
    ],
  },
];

export default function EarningPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Earning Policy"
      updated="5 June 2026"
      intro="Please read this income disclaimer carefully. Nothing on this site is a promise or guarantee of earnings."
      sections={SECTIONS}
      numbered
    />
  );
}
