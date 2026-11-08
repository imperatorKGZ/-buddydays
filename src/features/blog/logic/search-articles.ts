import type { BlogArticle } from "@/data/blog/articles";

export function searchBlogArticles(articles: readonly BlogArticle[], query: string): BlogArticle[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [...articles];

  return articles.filter((article) =>
    normalizeSearchText([article.title, article.excerpt, article.category, ...article.tags].join(" ")).includes(
      normalized,
    ),
  );
}

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/gu, " ")
    .trim()
    .toLocaleLowerCase("en-US");
}
