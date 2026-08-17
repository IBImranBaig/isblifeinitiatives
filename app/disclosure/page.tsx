import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/sections/LegalDocument";

export const metadata: Metadata = {
  title: "Disclosure",
  description:
    "Disclosure of relationships, compensation and editorial independence for this website.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "About This Site",
    body: (
      <p>
        This website is personally authored and edited by Imran Baig. The views
        expressed here are his own and do not necessarily represent those of any
        employer, client or partner organisation.
      </p>
    ),
  },
  {
    heading: "Advertising & Compensation",
    body: (
      <p>
        This site does not accept cash advertising, sponsorships or paid content
        placements. From time to time, the author may receive complimentary
        products, services, travel, event tickets or other non-monetary
        compensation from organisations in exchange for a possible review or
        feature.
      </p>
    ),
  },
  {
    heading: "Our Recommendations",
    body: (
      <p>
        The author endorses only products or services he genuinely believes merit
        recommendation based on his expertise. Readers should nonetheless verify
        any product claims, statistics or representations directly with the
        relevant manufacturer or provider.
      </p>
    ),
  },
  {
    heading: "Relationships",
    body: (
      <p>
        For transparency, we disclose relationships that could influence content on
        this site: Imran Baig founded Global Penmanship Academy, a training
        organisation delivering programs to individuals as well as national and
        multinational companies.
      </p>
    ),
  },
  {
    heading: "Copyright",
    body: (
      <p>
        © Global Penmanship Academy and KUFIC IZAZ PROJECT MANAGEMENT EST. All
        rights reserved.
      </p>
    ),
  },
];

export default function DisclosurePage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Disclosure"
      updated="5 June 2026"
      intro="In the interest of transparency, here is how this site handles compensation, recommendations and relationships."
      sections={SECTIONS}
      numbered
    />
  );
}
