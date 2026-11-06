"use client";

import { useState, type FormEvent } from "react";
import { finderCriteriaSchema } from "../schemas/finder.schema";
import type { ProductFinderCriteria } from "../types";

export function FinderForm({ onSubmit }: { onSubmit: (criteria: ProductFinderCriteria) => void }) {
  const [species, setSpecies] = useState<"dog" | "cat">("dog");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = finderCriteriaSchema.safeParse({ species, category });
    if (!parsed.success) { setError("Choose a product category to continue."); return; }
    setError("");
    onSubmit(parsed.data);
  }

  return <form onSubmit={handleSubmit} className="tool-form">
    <label>Pet<select value={species} onChange={(event) => setSpecies(event.target.value as "dog" | "cat")}><option value="dog">Dog</option><option value="cat">Cat</option></select></label>
    <label>Product category<input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="e.g. feeders" /></label>
    {error ? <p className="form-error" role="alert">{error}</p> : null}
    <button className="button button-primary" type="submit">Find products</button>
  </form>;
}
