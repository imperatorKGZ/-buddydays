import type { Product } from "@/types/product";
import type { ProductFinderCriteria, ProductMatch } from "../types";

/** Preference-fit score, not an objective product-quality rating. Unknown data earns no points. */
export function scoreProduct(product: Product, criteria: ProductFinderCriteria): ProductMatch {
  const preferences = Object.entries(criteria.preferredAttributes ?? {});
  const reasons: string[] = [];
  const limitations: string[] = [];
  let matched = 0;

  if (criteria.petSize && product.suitability.petSizes?.includes(criteria.petSize))
    reasons.push(`Suitable for selected size: ${criteria.petSize}.`);
  else if (criteria.petSize && !product.suitability.petSizes?.length)
    limitations.push("Pet-size compatibility has not been verified.");

  if (criteria.petAge && product.suitability.petAges?.includes(criteria.petAge))
    reasons.push(`Suitable for selected age: ${criteria.petAge}.`);
  else if (criteria.petAge && !product.suitability.petAges?.length)
    limitations.push("Pet-age suitability has not been verified.");

  for (const [key, expected] of preferences) {
    if (product.specifications[key] === expected) {
      matched += 1;
      reasons.push(`Matches preference: ${key}.`);
    } else if (!(key in product.specifications)) limitations.push(`No verified data for ${key}.`);
  }

  const baseScore = preferences.length ? Math.round((matched / preferences.length) * 100) : 0;
  const score = Math.max(0, baseScore - Math.min(20, limitations.length * 5));
  return { product, score, reasons, limitations };
}

export function scoreProducts(products: Product[], criteria: ProductFinderCriteria): ProductMatch[] {
  return products.map((product) => scoreProduct(product, criteria)).sort((a, b) => b.score - a.score);
}
