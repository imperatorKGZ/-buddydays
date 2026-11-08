import type { Product } from "@/types/product";
import type { ProductFinderCriteria } from "../types";

/** Hard eligibility filter. Product only: never read Offers, prices, or merchant APIs here. */
export function matchProducts(products: Product[], criteria: ProductFinderCriteria): Product[] {
  return products.filter((product) => {
    if (product.status !== "active") return false;
    if (product.species !== criteria.species && product.species !== "both") return false;
    if (product.category !== criteria.category) return false;
    if (
      criteria.petSize &&
      product.suitability.petSizes?.length &&
      !product.suitability.petSizes.includes(criteria.petSize)
    )
      return false;
    if (
      criteria.petAge &&
      product.suitability.petAges?.length &&
      !product.suitability.petAges.includes(criteria.petAge)
    )
      return false;
    return true;
  });
}
