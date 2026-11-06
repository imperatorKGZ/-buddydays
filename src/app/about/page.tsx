import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "About BuddyDays",
  "Learn what BuddyDays publishes and how we help dog and cat owners find practical, thoughtful guidance.",
);

export default function AboutPage() {
  return (
    <main className="page-shell stack">
      <p className="eyebrow">Better days, together.</p>
      <h1>About BuddyDays</h1>
      <p>
        BuddyDays is an independent editorial resource for people who share
        their homes with dogs and cats. We publish practical guides and
        thoughtful ideas for the everyday parts of life with pets.
      </p>
      <section>
        <h2>What you will find here</h2>
        <p>
          Our first focus is useful, easy-to-follow content about routines,
          behavior, enrichment, travel, grooming, and creating a comfortable
          home for pets.
        </p>
        <p>
          We want each article to answer a real question, explain what matters,
          and give readers sensible next steps without unnecessary complexity.
        </p>
      </section>
      <section>
        <h2>How we approach pet information</h2>
        <p>
          We aim to use reliable sources, make the limits of general guidance
          clear, and avoid claiming veterinary expertise or product testing we
          have not performed. Health concerns should be discussed with a
          qualified veterinarian who knows the animal.
        </p>
      </section>
      <section>
        <h2>Our purpose</h2>
        <p>
          Better days, together. We are building BuddyDays to make everyday
          pet care feel more informed, manageable, and rewarding.
        </p>
      </section>
    </main>
  );
}