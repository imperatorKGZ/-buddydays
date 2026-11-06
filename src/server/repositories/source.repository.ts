import "server-only";
import { productSources } from "@/data/catalog/sources";
export const sourceRepository = {
  async findManyByIds(ids: string[]) {
    const selected = new Set(ids);
    return productSources.filter((source) => selected.has(source.id));
  },
};
