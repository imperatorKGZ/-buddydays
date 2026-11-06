export interface ProductCategory {
  slug: string;
  label: string;
  species: "dog" | "cat" | "both";
  description: string;
}

export const productCategories: ProductCategory[] = [
  { slug: "beds", label: "Beds", species: "dog", description: "Resting and sleeping products for dogs." },
  { slug: "travel", label: "Travel", species: "dog", description: "Travel gear and accessories for dogs." },
  { slug: "harnesses", label: "Harnesses", species: "dog", description: "Walking and restraint equipment for dogs." },
  { slug: "feeders", label: "Feeders", species: "cat", description: "Feeding equipment for cats." },
  { slug: "fountains", label: "Water Fountains", species: "cat", description: "Water and hydration products for cats." },
  { slug: "litter-boxes", label: "Litter Boxes", species: "cat", description: "Litter and waste-management products for cats." },
];
