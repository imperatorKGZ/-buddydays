export type PetSpecies = "dog" | "cat" | "both";
export type ProductStatus = "active" | "discontinued" | "needs-review";

export interface ProductSuitability {
  petSizes?: string[];
  petAges?: string[];
  useCases?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  species: PetSpecies;
  category: string;
  brand: string;
  summary: string;
  specifications: Record<string, string | number | boolean>;
  suitability: ProductSuitability;
  pros: string[];
  cons: string[];
  sourceIds: string[];
  image?: { src: string; alt: string; rightsNote: string };
  lastVerifiedAt: string;
  status: ProductStatus;
}
