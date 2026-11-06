export type ProductSourceType = "manufacturer" | "manual" | "editorial-test" | "regulatory" | "other";

export interface ProductSource {
  id: string;
  productId: string;
  type: ProductSourceType;
  title: string;
  url?: string;
  documentPath?: string;
  supportsFields: string[];
  checkedAt: string;
  notes?: string;
}
