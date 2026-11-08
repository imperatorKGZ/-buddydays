import type { BlogArticle } from "@/data/blog/articles";
import { normalizeSearchText } from "./search-articles";

export type SpeciesFilter = "all" | "dogs" | "cats";
export type SortMode = "latest" | "oldest" | "az" | "za" | "editors";
export type BlogQuery = { species: SpeciesFilter; category: string; query: string; sort: SortMode; page: number };

const sorts = new Set<SortMode>(["latest", "oldest", "az", "za", "editors"]);
export function parseBlogQuery(params: URLSearchParams, defaults: Partial<BlogQuery> = {}): BlogQuery {
  const parsedPage = Number.parseInt(params.get("page") ?? "1", 10);
  const species = params.get("species");
  const sort = params.get("sort") as SortMode | null;
  return {
    species: species === "dogs" || species === "cats" ? species : (defaults.species ?? "all"),
    category: params.get("category")?.trim() || defaults.category || "all",
    query: params.get("q") ?? defaults.query ?? "",
    sort: sort && sorts.has(sort) ? sort : (defaults.sort ?? "latest"),
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1,
  };
}

export function serializeBlogQuery(query: BlogQuery): string {
  const params = new URLSearchParams();
  if (query.species !== "all") params.set("species", query.species);
  if (query.category !== "all") params.set("category", query.category);
  if (query.query.trim()) params.set("q", query.query.trim());
  if (query.sort !== "latest") params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));
  return params.toString();
}

export function filterAndSortBlogArticles(
  articles: readonly BlogArticle[],
  query: BlogQuery,
  labels = new Map<string, string>(),
) {
  const needle = normalizeSearchText(query.query);
  return articles
    .filter((article) => {
      const searchable = normalizeSearchText(
        [
          article.title,
          article.excerpt,
          article.category,
          labels.get(`${article.species}:${article.category}`) ?? "",
          ...article.tags,
        ].join(" "),
      );
      return (
        (query.species === "all" || article.species === query.species) &&
        (query.category === "all" || article.category === query.category) &&
        (!needle || searchable.includes(needle))
      );
    })
    .toSorted((a, b) => {
      if (query.sort === "az")
        return a.title.localeCompare(b.title, "en", { sensitivity: "base" }) || a.id.localeCompare(b.id);
      if (query.sort === "za")
        return b.title.localeCompare(a.title, "en", { sensitivity: "base" }) || a.id.localeCompare(b.id);
      const aDate = a.publishedAt ? Date.parse(a.publishedAt) : a.rank;
      const bDate = b.publishedAt ? Date.parse(b.publishedAt) : b.rank;
      if (query.sort === "oldest") return aDate - bDate || a.id.localeCompare(b.id);
      if (query.sort === "editors")
        return Number(b.editorPick) - Number(a.editorPick) || bDate - aDate || a.id.localeCompare(b.id);
      return bDate - aDate || a.id.localeCompare(b.id);
    });
}

export function paginateBlogArticles<T>(items: readonly T[], requestedPage: number, pageSize: number) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), pageCount);
  return { page, pageCount, items: items.slice((page - 1) * pageSize, page * pageSize) };
}
