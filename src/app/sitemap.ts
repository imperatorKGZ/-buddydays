import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { blogArticles } from "@/data/blog/articles";
import { isPublishedArticle } from "@/features/blog/logic/article-validation";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    "",
    "/dogs",
    "/cats",
    "/blog",
    "/about",
    "/methodology",
    "/contact",
    "/privacy",
    "/terms",
    "/emergency-pet-help",
  ];
  const publishedBlogArticles = blogArticles.filter(isPublishedArticle);
  const blogRoutes = publishedBlogArticles.flatMap((article) => [
    `/blog/${article.species}/${article.category}`,
    `/blog/${article.species}/${article.category}/${article.slug}`,
  ]);
  const uniqueRoutes = [...new Set([...publicRoutes, ...blogRoutes])];

  return uniqueRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified:
      route.split("/").length > 4
        ? publishedBlogArticles.find((article) => route.endsWith(`/${article.slug}`))?.publishedAt
        : undefined,
  }));
}
