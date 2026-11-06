import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("Our Methodology", "We explain how products are selected, compared, and matched to user needs.");

export default function Page() {
  return <main className="page-shell"><p className="eyebrow">BuddyDays</p><h1>Our Methodology</h1><p>We explain how products are selected, compared, and matched to user needs.</p><div className="surface"><p>A match is a measure of fit against stated preferences—not a universal quality score. We identify sources, note missing information, and avoid claiming tests we did not conduct.</p></div></main>;
}
