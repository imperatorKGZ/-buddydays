import Link from "next/link";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return <article className="surface product-card">
    {product.image ? <img src={product.image.src} alt={product.image.alt} /> : <div className="image-placeholder" aria-hidden="true">BuddyDays</div>}
    <div><p className="eyebrow">{product.brand} · {product.category}</p><h3>{product.name}</h3><p className="muted">{product.summary}</p><Link className="text-link" href={`/products/${product.slug}`}>Product details →</Link></div>
  </article>;
}
