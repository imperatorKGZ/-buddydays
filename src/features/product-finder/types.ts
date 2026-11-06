import type { PetSpecies, Product } from "@/types/product";

export interface ProductFinderCriteria {
  species: Exclude<PetSpecies, "both">;
  category: string;
  petSize?: string;
  petAge?: string;
  useCases?: string[];
  preferredAttributes?: Record<string, string | number | boolean>;
}

export interface ProductMatch {
  product: Product;
  score: number;
  reasons: string[];
  limitations: string[];
}
