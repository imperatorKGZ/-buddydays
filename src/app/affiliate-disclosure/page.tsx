import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...createPageMetadata("Affiliate Disclosure", "The current BuddyDays website does not use affiliate links."),
  robots: { index: false, follow: false },
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="page-shell stack">
      <p className="eyebrow">BuddyDays</p>
      <h1>Affiliate Disclosure</h1>
      <p>
        BuddyDays does not currently use affiliate links or participate in
        affiliate programs. The initial launch is focused on editorial
        content, not product sales or commissions.
      </p>
      <p>
        If this changes, we will update this page and clearly disclose any
        material relationship near the relevant link or recommendation.
      </p>
    </main>
  );
}