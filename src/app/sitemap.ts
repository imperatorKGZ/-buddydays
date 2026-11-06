import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { productCategories } from "@/data/catalog/categories";
import { blogArticles } from "@/data/blog/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/dogs", "/cats", "/tools", "/blog", "/products", "/guides", "/comparisons", "/about", "/methodology", "/affiliate-disclosure", "/privacy", "/terms", "/contact"];
  const productCategoryRoutes = productCategories.map((item) => `/${item.species === "dog" ? "dogs" : "cats"}/${item.slug}`);
  const publishedBlogArticles = blogArticles.filter((article) => article.status === "published" && Boolean(article.sections?.length));
  const blogRoutes = publishedBlogArticles.flatMap((article) => [
    `/blog/${article.species}/${article.category}`,
    `/blog/${article.species}/${article.category}/${article.slug}`,
  ]);
  const uniqueRoutes = [...new Set([...routes, ...productCategoryRoutes, ...blogRoutes])];

  return uniqueRoutes.map((route) => ({ url: new URL(route, siteConfig.url).toString(), lastModified: new Date() }));
}
