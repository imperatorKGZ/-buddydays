export type MerchantId = "amazon" | "chewy" | "walmart";
export type OfferStatus = "active" | "inactive" | "needs-review";

export interface Offer {
  id: string;
  productId: string;
  merchant: MerchantId;
  marketplace: "US";
  /** ASIN or merchant SKU; identifier only, not price or availability. */
  externalProductId?: string;
  /** Store only if the merchant's current program permits it. */
  destinationUrl?: string;
  status: OfferStatus;
  linkVerifiedAt?: string;
}
