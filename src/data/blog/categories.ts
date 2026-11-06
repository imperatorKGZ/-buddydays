export type BlogSpecies = "dogs" | "cats";

export interface BlogCategory {
  id: string;
  label: string;
  species: BlogSpecies;
  description: string;
}

export const blogCategories: BlogCategory[] = [
  { id: "care", label: "Care", species: "dogs", description: "Everyday care and routines" },
  { id: "behavior", label: "Behavior", species: "dogs", description: "Understand your dog's signals" },
  { id: "training", label: "Training", species: "dogs", description: "Practical learning and habits" },
  { id: "travel", label: "Travel", species: "dogs", description: "Walks, trips and days out" },
  { id: "home", label: "Home", species: "dogs", description: "A comfortable shared space" },
  { id: "lifestyle", label: "Lifestyle", species: "dogs", description: "Making everyday life easier" },
  { id: "care", label: "Care", species: "cats", description: "Everyday care and routines" },
  { id: "behavior", label: "Behavior", species: "cats", description: "Understand your cat's signals" },
  { id: "indoor-cats", label: "Indoor cats", species: "cats", description: "Ideas for life inside" },
  { id: "enrichment", label: "Enrichment", species: "cats", description: "Play, curiosity and activity" },
  { id: "home", label: "Home", species: "cats", description: "A comfortable cat-friendly space" },
  { id: "lifestyle", label: "Lifestyle", species: "cats", description: "Making everyday life easier" },
];

export function getBlogCategories(species?: BlogSpecies) {
  return species ? blogCategories.filter((category) => category.species === species) : blogCategories;
}

export function getBlogCategory(species: BlogSpecies, categoryId: string) {
  return blogCategories.find((category) => category.species === species && category.id === categoryId);
}
