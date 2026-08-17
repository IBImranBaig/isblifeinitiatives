import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/sections/LegalDocument";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of the Imran Baig website, programs and services.",
};

function NoItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-paper/70">
      <span aria-hidden className="mt-0.5 text-sm font-semibold text-[#e2657a]">
        ✕
      </span>
      <span>{children}</span>
    </div>
  );
}

const SECTIONS: LegalSection[] = [
  {
    heading: "Agreement & Age Requirement",
    body: (
      <p>
        By accessing or using this Site and our Services, you agree to be bound by
        these Terms &amp; Conditions. You agree that by using the Service you
        represent that you are at least 18 years old. If you do not agree, please do
        not use the Service.
      </p>
    ),
  },
  {
    heading: "Payments & GST Invoice",
    body: (
      <p>
        Payments must be made only through the links on our checkout page or the
        specified bank details. We do NOT send bank details on WhatsApp. For a GST
        invoice with your GST number included, send your GST certificate to{" "}
        <a href="mailto:support@successgyan.com">support@successgyan.com</a> within
        48 hours of purchase. Requests made after this period can still receive an
        invoice, but without the GST number.
      </p>
    ),
  },
  {
    heading: "Course Fees & Access",
    body: (
      <p>
        Your course fee covers the recorded course materials, with lifetime access
        for as long as the platform remains available. Live sessions, support calls
        and Q&amp;A sessions are complimentary bonuses and are not included as part
        of the fee.
      </p>
    ),
  },
  {
    heading: "Changes To Bonus Services",
    body: (
      <p>
        Imran Baig reserves the right to modify, discontinue or temporarily halt any
        of the bonus services at any time without prior notice. You will have no
        claims or refunds for such changes.
      </p>
    ),
  },
  {
    heading: "Support & Course Access",
    body: (
      <p>
        No personal support is provided via WhatsApp or phone calls, except for
        scheduled graphotherapy sessions. All courses are recorded, with live
        sessions held per Indian Standard Time (IST) schedules. Our team responds to
        queries within 48–72 hours.
      </p>
    ),
  },
  {
    heading: "Mental Health Disclaimer",
    body: (
      <p>
        We advise against enrolment for individuals who are under psychiatric
        treatment or experiencing psychological challenges. Participants must not
        discontinue any medication without consulting their doctor. These programs
        are designed to support your healing and are not a replacement for medical
        treatment.
      </p>
    ),
  },
  {
    heading: "Emotional Well-Being & Healing Techniques",
    body: (
      <p>
        The company is not responsible for your emotional well-being, and the healing
        techniques shared are not a substitute for medical treatment.
      </p>
    ),
  },
  {
    heading: "Community Guidelines",
    body: (
      <>
        <p>Within our community and programs, the following conduct is prohibited:</p>
        <div className="mt-3 space-y-2.5">
          <NoItem>Promoting your own personal business or services.</NoItem>
          <NoItem>Sending inappropriate messages to female members.</NoItem>
        </div>
        <p>
          Violation of these guidelines will result in immediate removal from the
          Course or Platinum Membership without any prior notice. No refunds will be
          provided.
        </p>
      </>
    ),
  },
  {
    heading: "Refund & Cancellation",
    body: (
      <p>
        Please refer to our <a href="/refund-policy">Refund Policy</a> for refund and
        cancellation terms.
      </p>
    ),
  },
  {
    heading: "Monthly Subscriptions",
    body: (
      <p>
        Subscriptions are billed automatically on a recurring basis every 30 days.
        Each automatic recurring billing of the subscription fee is non-refundable
        and will not be prorated. You may cancel at any time by emailing{" "}
        <a href="mailto:admin@penmanship.academy">admin@penmanship.academy</a>.
      </p>
    ),
  },
  {
    heading: "Intellectual Property License",
    body: (
      <p>
        The company owns or licenses all content, trademarks and copyrights on the
        Site. You are granted a limited, revocable licence to use the content for its
        intended purposes only. Reproduction, distribution, sublicensing or creation
        of derivative works is prohibited. All rights not expressly granted remain
        with the company.
      </p>
    ),
  },
  {
    heading: "Confidential Information",
    body: (
      <p>
        You must not disclose or reverse-engineer confidential materials without our
        written consent. This includes trade secrets, software, strategies, financial
        data and customer information. Non-solicitation obligations apply with respect
        to our employees and customers.
      </p>
    ),
  },
  {
    heading: "Prohibited Site Uses",
    body: (
      <>
        <p>You may not:</p>
        <div className="mt-3 space-y-2.5">
          <NoItem>Promote an existing business through the Site.</NoItem>
          <NoItem>Introduce viruses or any disruptive technology.</NoItem>
          <NoItem>Impersonate others or send spam.</NoItem>
          <NoItem>Frame the Site or hyperlink without express prior written permission.</NoItem>
        </div>
        <p>All activities must comply with applicable laws.</p>
      </>
    ),
  },
  {
    heading: "No Derogatory Statements",
    body: (
      <p>
        You agree not to disparage the company or its products. The company may
        determine to recover damages sustained as a result of any breach of this
        provision.
      </p>
    ),
  },
  {
    heading: "Password & Account Responsibility",
    body: (
      <p>
        You are responsible for maintaining the confidentiality of your password and
        for all activities and fees that occur under your account.
      </p>
    ),
  },
  {
    heading: "Testimonials & FTC Compliance",
    body: (
      <p>
        Any claims or testimonials must be based on actual experiences. Connections
        to advertisers must be disclosed, and pricing statements must be truthful and
        accurate, with no false scarcity claims.
      </p>
    ),
  },
  {
    heading: "VIP Text Alerts",
    body: (
      <p>
        Phone numbers provided for alerts are kept 100% secure and are never shared.
        You may receive up to 7 messages per week, and can unsubscribe at any time by
        replying to a message.
      </p>
    ),
  },
  {
    heading: "User Content",
    body: (
      <p>
        By posting content, you grant the company a transferable, perpetual,
        irrevocable, worldwide and royalty-free non-exclusive licence to use that
        content in any media. The company has no obligation to post your content and
        may remove it without notice.
      </p>
    ),
  },
  {
    heading: "Inappropriate Content",
    body: (
      <p>
        You may not upload libelous, obscene, pornographic or otherwise illegal
        material. The company reserves the right to terminate access and may
        cooperate with law enforcement where appropriate.
      </p>
    ),
  },
  {
    heading: "Copyright Infringement",
    body: (
      <>
        <p>
          To report alleged copyright infringement, provide: an authorised signature;
          identification of the copyrighted work; identification of the infringing
          material; a good-faith belief statement; and a statement of accuracy under
          penalty of perjury. Notices may be sent to our designated agent:
        </p>
        <p>
          Global Penmanship Academy, Bangalore, India
          <br />
          KUFIC IZAZ PROJECT MANAGEMENT EST., Dubai
        </p>
        <p className="text-paper/45">Effective Date: July 30, 2022.</p>
      </>
    ),
  },
  {
    heading: "Investigation & Suspension Rights",
    body: (
      <p>
        The company may investigate complaints and suspend accounts immediately, with
        or without prior notice, for violations, false information or interference
        with the Services.
      </p>
    ),
  },
  {
    heading: "Disclaimer Of Warranties",
    body: (
      <p>
        The Site, content and Services are provided &ldquo;AS IS&rdquo;, with all
        faults, and &ldquo;as available&rdquo;. The company makes no warranties
        regarding success, compatibility or uninterrupted service. Individual results
        may vary and depend on many factors.
      </p>
    ),
  },
  {
    heading: "Limited Liability",
    body: (
      <p>
        The company&rsquo;s maximum liability is the lesser of your actual damages or
        the charges paid by you to us for the Site for a period of two months. The
        company is not liable for network interruptions, technical failures or data
        loss.
      </p>
    ),
  },
  {
    heading: "Income Disclosure",
    body: (
      <p>
        Our income disclosure is incorporated by reference — see our{" "}
        <a href="/earning-policy">Earning Policy</a>. You acknowledge that you have
        read it.
      </p>
    ),
  },
  {
    heading: "Third-Party Sites",
    body: (
      <p>
        The company has no control over, and no liability for, any third-party sites.
        Links do not imply authorization or endorsement. The company may receive
        affiliate commissions on recommended products.
      </p>
    ),
  },
  {
    heading: "Termination",
    body: (
      <p>
        The company may suspend or terminate your access in its sole discretion. Upon
        termination, your licence ends, although your content may remain in caches or
        backups temporarily.
      </p>
    ),
  },
  {
    heading: "Notices",
    body: (
      <p>
        Written notices may be sent by mail, overnight courier or email. Physical
        address: Imran Baig, Elegant Smith Apartments, 401, 4th Floor, Benson Town,
        #17 Harris Road, Bangalore, 560046, India. Email notice is deemed received
        within 24 hours unless a system error occurs.
      </p>
    ),
  },
  {
    heading: "Indemnity",
    body: (
      <p>
        You agree to indemnify the company against claims arising from your
        negligence, breach of these Terms or non-compliance. The company will receive
        notice and may participate in the defence at its own expense.
      </p>
    ),
  },
  {
    heading: "Governing Law",
    body: (
      <p>
        These Terms are governed by the laws of India and the State of Karnataka,
        with exclusive jurisdiction in the courts of Karnataka. Disputes involving
        affiliates will first attempt mediation, then arbitration per our policies.
        Either party may seek injunctions to protect intellectual property.
      </p>
    ),
  },
  {
    heading: "Severability & Waiver",
    body: (
      <p>
        If any term is unenforceable, the remaining terms are unaffected. Any waiver
        must be in writing and signed.
      </p>
    ),
  },
  {
    heading: "Modifications",
    body: (
      <p>
        The company may revise these Terms, modify the Site, or discontinue Services
        in its sole discretion and without prior notice. Continued use constitutes
        acceptance of the changes.
      </p>
    ),
  },
  {
    heading: "Miscellaneous",
    body: (
      <p>
        This agreement supersedes prior understandings and is not assignable without
        consent. No partnership or employment relationship is created. The disclaimer,
        indemnity, intellectual-property and governing-law provisions survive
        termination.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="30 July 2022"
      intro="Please read these terms carefully — they govern your use of our website, programs and services. By using the Service you confirm that you are at least 18 years old and agree to these terms."
      sections={SECTIONS}
      numbered
    />
  );
}
