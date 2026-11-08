"use client";

import { useState } from "react";
import { dogProducts } from "@/data/catalog/products/dogs";
import { catProducts } from "@/data/catalog/products/cats";
import { FinderForm } from "./finder-form";
import { FinderResults } from "./finder-results";
import { matchProducts } from "../logic/matching-engine";
import { scoreProducts } from "../logic/scoring-engine";
import type { ProductFinderCriteria, ProductMatch } from "../types";

const products = [...dogProducts, ...catProducts];

export function ProductFinderClient() {
  const [results, setResults] = useState<ProductMatch[] | null>(null);
  function handleSubmit(criteria: ProductFinderCriteria) {
    const eligible = matchProducts(products, criteria);
    setResults(scoreProducts(eligible, criteria));
  }
  return (
    <>
      <FinderForm onSubmit={handleSubmit} />
      {results ? (
        <section className="stack" aria-live="polite">
          <h2>Matching products</h2>
          <FinderResults results={results} />
        </section>
      ) : null}
    </>
  );
}
