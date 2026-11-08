import { describe, expect, it } from "vitest";
import { matchProducts } from "@/features/product-finder/logic/matching-engine";
import type { Product } from "@/types/product";

const fixture: Product = {
  id: "fixture-1",
  slug: "sample-feeder",
  name: "Sample Feeder",
  species: "cat",
  category: "feeders",
  brand: "Fixture Brand",
  summary: "Test fixture only; not a real product recommendation.",
  specifications: { material: "stainless-steel", capacityLiters: 3 },
  suitability: { petSizes: ["small", "medium"], petAges: ["adult"] },
  pros: [],
  cons: [],
  sourceIds: ["fixture-source"],
  lastVerifiedAt: "2026-01-01",
  status: "active",
};

describe("matchProducts", () => {
  it("matches products by species, category, and fit", () => {
    expect(
      matchProducts([fixture], { species: "cat", category: "feeders", petSize: "small", petAge: "adult" }),
    ).toHaveLength(1);
  });
  it("rejects a different species", () => {
    expect(matchProducts([fixture], { species: "dog", category: "feeders" })).toHaveLength(0);
  });
  it("excludes records needing review", () => {
    expect(
      matchProducts([{ ...fixture, status: "needs-review" }], { species: "cat", category: "feeders" }),
    ).toHaveLength(0);
  });
});
