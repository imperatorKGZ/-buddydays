import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Privacy Policy",
  "How BuddyDays handles information when you visit this website.",
);

export default function PrivacyPage() {
  return (
    <main className="page-shell stack">
      <p className="eyebrow">Last updated November 6, 2026</p>
      <h1>Privacy Policy</h1>
      <p>
        This policy describes the current BuddyDays website. BuddyDays is an editorial website for dog and cat owners.
      </p>
      <section>
        <h2>Information you provide</h2>
        <p>
          The current website does not offer user accounts, comments, newsletter subscriptions, or contact forms. Do not
          submit sensitive personal information through public website features.
        </p>
      </section>
      <section>
        <h2>Technical information</h2>
        <p>
          When a website page is requested, hosting and security providers may process technical information such as an
          IP address, browser and device details, requested page, referring page, and request time. This information may
          be used to deliver the website, maintain security, prevent abuse, and diagnose technical problems. Exact
          records and retention periods depend on the providers used to host and protect the live website.
        </p>
      </section>
      <section>
        <h2>Analytics and advertising</h2>
        <p>
          BuddyDays does not currently operate advertising pixels, user profiling, or a configured website analytics
          service. We do not currently use analytics to build advertising profiles.
        </p>
      </section>
      <section>
        <h2>External websites</h2>
        <p>
          Articles may link to external sources. Those websites have their own privacy practices, which are not
          controlled by BuddyDays.
        </p>
      </section>
      <section>
        <h2>Children</h2>
        <p>
          BuddyDays is intended for a general audience of pet owners and is not directed to children under 13. The
          current website does not intentionally collect personal information from children.
        </p>
      </section>
      <section>
        <h2>Changes to this policy</h2>
        <p>
          This policy will be updated when the website adds features or services that change how information is
          collected or used. The date above indicates the latest policy revision.
        </p>
      </section>
      <p>
        We will update this policy before introducing analytics, contact forms, user accounts, or other features that
        change how information is handled.
      </p>
    </main>
  );
}
