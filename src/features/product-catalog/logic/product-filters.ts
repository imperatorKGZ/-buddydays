import type { Product } from "@/types/product";

export interface ProductFilters { species?: "dog" | "cat"; category?: string; brand?: string; }
export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    if (filters.species && product.species !== filters.species && product.species !== "both") return false;
    if (filters.category && product.category !== filters.category) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    return product.status === "active";
  });
}
