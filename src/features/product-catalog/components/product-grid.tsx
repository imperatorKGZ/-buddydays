import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <div className="empty-state"><h2>Catalog coming together</h2><p>We are adding products with traceable specifications and source notes. No product is listed until its information has been checked.</p></div>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
