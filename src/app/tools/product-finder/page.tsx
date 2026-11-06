import { ProductFinderClient } from "@/features/product-finder/components/product-finder-client";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata("Pet Product Finder", "Find products that fit your pet and your needs using BuddyDays product research.");

export default function ProductFinderPage() {
  return <main className="page-shell"><p className="eyebrow">BuddyDays tool</p><h1>Find products that fit your pet and your needs.</h1><p>The matching engine uses BuddyDays product records. It does not depend on a store's live offers, prices, or API.</p><ProductFinderClient/></main>;
}
