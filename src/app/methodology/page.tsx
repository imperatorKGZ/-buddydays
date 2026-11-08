import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata(
  "Editorial Standards",
  "How BuddyDays researches, writes, checks, and updates its dog and cat care content.",
);

export default function MethodologyPage() {
  return (
    <main className="page-shell stack">
      <p className="eyebrow">How we work</p>
      <h1>Our editorial standards</h1>
      <p>
        BuddyDays articles are written to help dog and cat owners make sense of everyday questions. We prioritize
        accuracy, clear explanations, and practical usefulness over publishing volume.
      </p>
      <section>
        <h2>Research and sources</h2>
        <p>
          We prioritize primary sources and established organizations with relevant expertise. For health, nutrition,
          medication, behavior, and safety topics, we use additional care and rely on qualified veterinary or
          animal-welfare sources wherever appropriate.
        </p>
      </section>
      <section>
        <h2>What we do not claim</h2>
        <ul>
          <li>We do not invent studies, sources, product specifications, or statistics.</li>
          <li>We do not claim personal experience or hands-on testing that did not happen.</li>
          <li>We do not present general information as a diagnosis or a substitute for veterinary care.</li>
        </ul>
      </section>
      <section>
        <h2>Updates and corrections</h2>
        <p>
          Content may be reviewed and updated when reliable information changes or an error is identified. Publication
          and update dates should reflect the actual editorial work performed.
        </p>
      </section>
      <section>
        <h2>Commercial independence</h2>
        <p>
          BuddyDays is launching as an editorial resource. Product catalogs and affiliate recommendations are not part
          of the initial launch. Any future commercial relationship will be disclosed clearly where it is relevant to
          readers.
        </p>
      </section>
    </main>
  );
}
