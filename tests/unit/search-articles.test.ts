import { describe, expect, it } from "vitest";
import { searchBlogArticles } from "@/features/blog/logic/search-articles";
import type { BlogArticle } from "@/data/blog/articles";

const articles: BlogArticle[] = [
  {
    id: "one", slug: "rainy-dog-days", title: "Keeping a Dog Busy on Rainy Days", excerpt: "Indoor games for a wet afternoon.",
    species: "dogs", category: "lifestyle", tags: ["indoor activities", "play"], readingMinutes: 5, rank: 2, editorPick: false, status: "draft", outline: [],
  },
  {
    id: "two", slug: "cat-carrier", title: "Making a Cat Carrier Familiar", excerpt: "Gentle preparation for travel.",
    species: "cats", category: "behavior", tags: ["carrier", "travel"], readingMinutes: 4, rank: 1, editorPick: false, status: "draft", outline: [],
  },
];

describe("searchBlogArticles", () => {
  it("matches article titles regardless of case", () => {
    expect(searchBlogArticles(articles, "DOG BUSY").map((article) => article.id)).toEqual(["one"]);
  });

  it("matches tags and excerpts", () => {
    expect(searchBlogArticles(articles, "indoor activities").map((article) => article.id)).toEqual(["one"]);
    expect(searchBlogArticles(articles, "preparation").map((article) => article.id)).toEqual(["two"]);
  });

  it("returns all articles for an empty query", () => {
    expect(searchBlogArticles(articles, "  ")).toHaveLength(2);
  });
});
