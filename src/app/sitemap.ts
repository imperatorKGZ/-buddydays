import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { blogArticles } from "@/data/blog/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = ["", "/dogs", "/cats", "/blog", "/about", "/methodology", "/contact", "/privacy", "/terms"];
  const publishedBlogArticles = blogArticles.filter(
    (article) => article.status === "published" && Boolean(article.sections?.length),
  );
  const blogRoutes = publishedBlogArticles.flatMap((article) => [
    `/blog/${article.species}/${article.category}`,
    `/blog/${article.species}/${article.category}/${article.slug}`,
  ]);
  const uniqueRoutes = [...new Set([...publicRoutes, ...blogRoutes])];

  return uniqueRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
  }));
}