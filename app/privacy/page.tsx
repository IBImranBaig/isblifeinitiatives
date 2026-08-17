import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/sections/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this site collects, uses, maintains and discloses information collected from users of imranbaig.com and globalpenmanship.academy.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Personal Identification Information",
    body: (
      <p>
        We may collect personal identification information from Users in a variety
        of ways, including, but not limited to, when Users visit our site, register
        on the site, and in connection with other activities, services, features or
        resources we make available on our Site. Users may be asked for, as
        appropriate, name, email address, mailing address, phone number. Users may,
        however, visit our Site anonymously. We will collect personal identification
        information from Users only if they voluntarily submit such information to
        us. Users can always refuse to supply personally identification information,
        except that it may prevent them from engaging in certain Site related
        activities.
      </p>
    ),
  },
  {
    heading: "Non-Personal Identification Information",
    body: (
      <p>
        We may collect non-personal identification information about Users whenever
        they interact with our Site. Non-personal identification information may
        include the browser name, the type of computer and technical information
        about Users means of connection to our Site, such as the operating system
        and the Internet service providers utilized and other similar information.
      </p>
    ),
  },
  {
    heading: "Web Browser Cookies",
    body: (
      <p>
        Our Site may use &ldquo;cookies&rdquo; to enhance User experience.
        User&rsquo;s web browser places cookies on their hard drive for
        record-keeping purposes and sometimes to track information about them. User
        may choose to set their web browser to refuse cookies, or to alert you when
        cookies are being sent. If they do so, note that some parts of the Site may
        not function properly.
      </p>
    ),
  },
  {
    heading: "How We Use Collected Information",
    body: (
      <>
        <p>Imran Baig collects and uses Users personal information for the following purposes:</p>
        <ul className="space-y-1.5">
          <li>
            <strong className="text-paper/85">To personalize user experience</strong> — we may
            use information in the aggregate to understand how our Users as a group use the
            services and resources provided on our Site.
          </li>
          <li>
            <strong className="text-paper/85">To improve our Site</strong> — we continually
            strive to improve our website offerings based on the information and feedback we
            receive from you.
          </li>
          <li>
            <strong className="text-paper/85">To improve customer service</strong> — your
            information helps us to more effectively respond to your customer service requests
            and support needs.
          </li>
          <li>
            <strong className="text-paper/85">To send periodic emails</strong> — the email
            address Users provide will only be used to respond to their inquiries, and/or other
            requests or questions.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "How We Protect Your Information",
    body: (
      <p>
        We adopt appropriate data collection, storage and processing practices and
        security measures to protect against unauthorized access, alteration,
        disclosure or destruction of your personal information, username, password,
        transaction information and data stored on our Site.
      </p>
    ),
  },
  {
    heading: "Sharing Your Personal Information",
    body: (
      <p>
        We do not sell, trade, or rent Users personal identification information to
        others. We may share generic aggregated demographic information not linked
        to any personal identification information regarding visitors and users with
        our business partners, trusted affiliates and advertisers for the purposes
        outlined above.
      </p>
    ),
  },
  {
    heading: "Advertising",
    body: (
      <p>
        Ads appearing on our site may be delivered to Users by advertising partners,
        who may set cookies. These cookies allow the ad server to recognize your
        computer each time they send you an online advertisement to compile non
        personal identification information about you or others who use your
        computer. This information allows ad networks to, among other things, deliver
        targeted advertisements that they believe will be of most interest to you.
        This privacy policy does not cover the use of cookies by any advertisers.
      </p>
    ),
  },
  {
    heading: "Google AdSense",
    body: (
      <p>
        Some of the ads may be served by Google. Google&rsquo;s use of the DART
        cookie enables it to serve ads to Users based on their visit to our Site and
        other sites on the Internet. DART uses &ldquo;non personally identifiable
        information&rdquo; and does NOT track personal information about you, such as
        your name, email address, physical address, etc. You may opt out of the use
        of the DART cookie by visiting the Google ad and content network privacy
        policy at{" "}
        <a href="http://www.google.com/privacy_ads.html" target="_blank" rel="noopener noreferrer">
          google.com/privacy_ads.html
        </a>
        .
      </p>
    ),
  },
  {
    heading: "Changes To This Privacy Policy",
    body: (
      <p>
        Imran Baig has the discretion to update this privacy policy at any time. When
        we do, we will post a notification on the main page of our Site, revise the
        updated date at the bottom of this page. We encourage Users to frequently
        check this page for any changes to stay informed about how we are helping to
        protect the personal information we collect. You acknowledge and agree that it
        is your responsibility to review this privacy policy periodically and become
        aware of modifications.
      </p>
    ),
  },
  {
    heading: "Your Acceptance Of These Terms",
    body: (
      <p>
        By using this Site, you signify your acceptance of this policy. If you do not
        agree to this policy, please do not use our Site. Your continued use of the
        Site following the posting of changes to this policy will be deemed your
        acceptance of those changes.
      </p>
    ),
  },
  {
    heading: "Contacting Us",
    body: (
      <>
        <p>
          If you have any questions about this Privacy Policy, the practices of this
          site, or your dealings with this site, please contact us at:
        </p>
        <p>
          Imran Baig, Bangalore – 560046, Karnataka, India
          <br />
          or KUFIC IZAZ PROJECT MANAGEMENT EST. – Dubai
          <br />
          <a href="mailto:admin@penmanship.academy">admin@penmanship.academy</a>
        </p>
        <p className="text-paper/45">
          This document was last updated on August 13, 2025.
        </p>
        <p className="text-paper/45">
          © Copyright Global Penmanship Academy and KUFIC IZAZ PROJECT MANAGEMENT EST.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy"
      title="Privacy Policy"
      updated="13 August 2025"
      intro="This Privacy Policy governs the manner in which this site collects, uses, maintains and discloses information collected from users (each, a “User”) of the imranbaig.com or globalpenmanship.academy website (“Site”). This privacy policy applies to the Site and all products and services offered by Imran Baig."
      sections={SECTIONS}
      numbered
    />
  );
}
