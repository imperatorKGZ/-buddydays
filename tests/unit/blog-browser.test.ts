import { describe, expect, it } from "vitest";
import {
  filterAndSortBlogArticles,
  paginateBlogArticles,
  parseBlogQuery,
  serializeBlogQuery,
} from "@/features/blog/logic/blog-browser";
import { blogArticles } from "@/data/blog/articles";

describe("blog browser query state", () => {
  it("round-trips URL filters and pagination", () => {
    const query = parseBlogQuery(new URLSearchParams("species=dogs&category=care&q=  coat &sort=az&page=3"));
    expect(query).toEqual({ species: "dogs", category: "care", query: "  coat ", sort: "az", page: 3 });
    expect(serializeBlogQuery(query)).toBe("species=dogs&category=care&q=coat&sort=az&page=3");
  });

  it("composes species, category, search, and deterministic sorting", () => {
    const labels = new Map([["dogs:care", "Care"]]);
    const result = filterAndSortBlogArticles(
      blogArticles,
      { species: "dogs", category: "care", query: "DOG", sort: "az", page: 1 },
      labels,
    );
    expect(result.every((article) => article.species === "dogs" && article.category === "care")).toBe(true);
    expect(result.map((article) => article.title)).toEqual(
      [...result].map((article) => article.title).sort((a, b) => a.localeCompare(b, "en")),
    );
  });

  it("clamps pages outside the result range", () => {
    const result = paginateBlogArticles([1, 2, 3], 99, 2);
    expect(result.page).toBe(2);
    expect(result.items).toEqual([3]);
  });
});
