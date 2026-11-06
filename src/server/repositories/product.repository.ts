import "server-only";
import { allProducts } from "@/data";
import type { Product, PetSpecies } from "@/types/product";

export interface ProductQuery { species?: PetSpecies; category?: string; status?: Product["status"]; }
export const productRepository = {
  async findMany(query: ProductQuery = {}): Promise<Product[]> {
    return allProducts.filter((product) => {
      if (query.species && product.species !== query.species && product.species !== "both") return false;
      if (query.category && product.category !== query.category) return false;
      if (query.status && product.status !== query.status) return false;
      return true;
    });
  },
  async findBySlug(slug: string): Promise<Product | null> {
    return allProducts.find((product) => product.slug === slug) ?? null;
  },
};
