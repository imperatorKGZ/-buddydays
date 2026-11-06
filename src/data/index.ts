import { dogProducts } from "@/data/catalog/products/dogs";
import { catProducts } from "@/data/catalog/products/cats";
import { amazonOffers } from "@/data/offers/amazon";
import { chewyOffers } from "@/data/offers/chewy";
import { walmartOffers } from "@/data/offers/walmart";

export const allProducts = [...dogProducts, ...catProducts];
export const allOffers = [...amazonOffers, ...chewyOffers, ...walmartOffers];
