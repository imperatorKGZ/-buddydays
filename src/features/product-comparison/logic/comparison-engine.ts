import type { Product } from "@/types/product";

/** Comparison is a projection of Product records; it has no Offer or merchant dependency. */
export function compareProducts(products: Product[]): Product[] {
  return products.filter((product) => product.status === "active");
}
