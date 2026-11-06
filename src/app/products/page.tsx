import { ProductGrid } from "@/features/product-catalog/components/product-grid";
import { productRepository } from "@/server/repositories/product.repository";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata("Product Catalog", "Explore researched products for dogs and cats.");
export default async function ProductsPage() {
  const products = await productRepository.findMany({ status: "active" });
  return <main className="page-shell"><p className="eyebrow">BuddyDays catalog</p><h1>Products, researched with care.</h1><p>Our catalog is built from traceable product information. Merchant offers are separate from product facts.</p><ProductGrid products={products}/></main>;
}
