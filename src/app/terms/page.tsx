import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("Terms of Use", "Terms for using BuddyDays articles and website features.");

export default function TermsPage() {
  return (
    <main className="page-shell stack">
      <p className="eyebrow">Last updated November 6, 2026</p>
      <h1>Terms of Use</h1>
      <p>
        By accessing BuddyDays, you agree to use this website in accordance with these terms. If you do not agree, do
        not use the website.
      </p>
      <section>
        <h2>Editorial information, not veterinary advice</h2>
        <p>
          BuddyDays publishes general educational information for dog and cat owners. Articles are not a diagnosis,
          treatment plan, or substitute for advice from a qualified veterinarian. Every animal and situation is
          different. Contact a veterinarian for advice about an individual pet, especially when symptoms, injury,
          poisoning, medication, or an urgent health concern is involved.
        </p>
      </section>
      <section>
        <h2>Use of website content</h2>
        <p>
          You may read and share links to BuddyDays pages for personal, non-commercial purposes. Unless a page states
          otherwise, website text, branding, and original design materials belong to BuddyDays or their respective
          rights holders. Do not republish substantial portions of the content without permission.
        </p>
      </section>
      <section>
        <h2>External links</h2>
        <p>
          BuddyDays may link to third-party websites and resources for additional information. We do not control those
          websites and are not responsible for their content, availability, or policies.
        </p>
      </section>
      <section>
        <h2>Availability and accuracy</h2>
        <p>
          We aim to keep the website useful and accurate, but content may contain errors or become outdated. Website
          features may change or become unavailable. You are responsible for evaluating information before acting on it.
        </p>
      </section>
      <section>
        <h2>Changes to these terms</h2>
        <p>
          These terms may be updated as BuddyDays changes. The date above indicates the latest revision. Continued use
          of the website after an update means you accept the revised terms.
        </p>
      </section>
    </main>
  );
}
