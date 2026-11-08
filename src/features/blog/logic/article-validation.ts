import { z } from "zod";
import { blogCategories, type BlogSpecies } from "../../../data/blog/categories.ts";
import type { BlogArticle } from "../../../data/blog/articles.ts";

const isoDate = z.string().date();

export const blogArticleSchema = z
  .object({
    id: z.string().trim().min(1),
    slug: z
      .string()
      .trim()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().trim().min(1),
    excerpt: z.string().trim().min(1),
    species: z.enum(["dogs", "cats"]),
    category: z.string().trim().min(1),
    tags: z.array(z.string().trim().min(1)).min(1),
    readingMinutes: z.number().int().positive(),
    publishedAt: isoDate.optional(),
    updatedAt: isoDate.optional(),
    sections: z
      .array(
        z.object({
          heading: z.string().trim().min(1),
          paragraphs: z.array(z.string().trim().min(1)).min(1),
          bullets: z.array(z.string().trim().min(1)).optional(),
        }),
      )
      .optional(),
    sources: z.array(z.object({ label: z.string().trim().min(1), url: z.url() })).optional(),
    rank: z.number().finite(),
    editorPick: z.boolean(),
    status: z.enum(["draft", "published"]),
    outline: z.array(z.string().trim().min(1)),
  })
  .superRefine((article, ctx) => {
    const categoryExists = blogCategories.some(
      (category) => category.species === article.species && category.id === article.category,
    );
    if (!categoryExists)
      ctx.addIssue({ code: "custom", path: ["category"], message: "Category must belong to the article species." });
    if (article.updatedAt && article.publishedAt && article.updatedAt < article.publishedAt)
      ctx.addIssue({ code: "custom", path: ["updatedAt"], message: "updatedAt cannot precede publishedAt." });
    if (
      article.status === "published" &&
      (!article.publishedAt || !article.sections?.length || !article.sources?.length)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Published articles require publishedAt, complete sections, and sources.",
      });
    }
  });

export function validateBlogArticles(articles: readonly BlogArticle[]): void {
  const slugs = new Set<string>();
  for (const article of articles) {
    blogArticleSchema.parse(article);
    if (slugs.has(article.slug)) throw new Error(`Duplicate blog slug: ${article.slug}`);
    slugs.add(article.slug);
  }
}

export function isPublishedArticle(article: BlogArticle): boolean {
  return article.status === "published" && Boolean(article.sections?.length);
}

export function isBlogSpecies(value: string): value is BlogSpecies {
  return value === "dogs" || value === "cats";
}
