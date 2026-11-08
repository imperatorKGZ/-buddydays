import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="surface product-card">
      {product.image ? (
        <Image src={product.image.src} alt={product.image.alt} width={600} height={400} />
      ) : (
        <div className="image-placeholder" aria-hidden="true">
          BuddyDays
        </div>
      )}
      <div>
        <p className="eyebrow">
          {product.brand} · {product.category}
        </p>
        <h3>{product.name}</h3>
        <p className="muted">{product.summary}</p>
        <Link className="text-link" href={`/products/${product.slug}`}>
          Product details →
        </Link>
      </div>
    </article>
  );
}
