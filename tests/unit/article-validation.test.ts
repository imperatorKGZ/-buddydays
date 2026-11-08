import { describe, expect, it } from "vitest";
import { validateBlogArticles } from "@/features/blog/logic/article-validation";
import type { BlogArticle } from "@/data/blog/articles";

const draft: BlogArticle = {
  id: "test-draft",
  slug: "test-draft",
  title: "Test draft",
  excerpt: "Test fixture only.",
  species: "dogs",
  category: "care",
  tags: ["test"],
  readingMinutes: 1,
  rank: 1,
  editorPick: false,
  status: "draft",
  outline: ["Test outline"],
};

describe("validateBlogArticles", () => {
  it("accepts a draft fixture", () => {
    expect(() => validateBlogArticles([draft])).not.toThrow();
  });

  it("rejects duplicate slugs", () => {
    expect(() => validateBlogArticles([draft, { ...draft, id: "another" }])).toThrow("Duplicate blog slug");
  });

  it("requires complete published records", () => {
    expect(() => validateBlogArticles([{ ...draft, status: "published" }])).toThrow("Published articles require");
  });
});
