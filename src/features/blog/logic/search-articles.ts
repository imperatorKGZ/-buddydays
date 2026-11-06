import type { BlogArticle } from "@/data/blog/articles";

export function searchBlogArticles(articles: readonly BlogArticle[], query: string): BlogArticle[] {
  const normalized = query.trim().toLocaleLowerCase("en-US");
  if (!normalized) return [...articles];

  return articles.filter((article) =>
    [article.title, article.excerpt, article.category, ...article.tags]
      .join(" ")
      .toLocaleLowerCase("en-US")
      .includes(normalized),
  );
}
