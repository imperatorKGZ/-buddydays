import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata(
  "Product Comparisons",
  "Compare product specifications and suitability for dogs and cats.",
);
export default function ComparisonsPage() {
  return (
    <main className="page-shell">
      <p className="eyebrow">BuddyDays comparisons</p>
      <h1>Understand the differences before you choose.</h1>
      <p>
        Comparisons use verified Product records and a published methodology. Merchant offers do not affect comparison
        scores.
      </p>
      <div className="empty-state">
        <h2>Comparisons are being prepared</h2>
        <p>No comparison is published until its product data and criteria are reviewed.</p>
      </div>
    </main>
  );
}
