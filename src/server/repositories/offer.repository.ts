import "server-only";
import { allOffers } from "@/data";
export const offerRepository = {
  async findByProductId(productId: string) {
    return allOffers.filter((offer) => offer.productId === productId && offer.status === "active");
  },
};
