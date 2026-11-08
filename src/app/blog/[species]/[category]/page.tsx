import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogBrowser } from "@/features/blog/components/blog-browser";
import { getBlogCategory, type BlogSpecies } from "@/data/blog/categories";
import { blogArticles } from "@/data/blog/articles";
import { isPublishedArticle } from "@/features/blog/logic/article-validation";

interface CategoryPageProps {
  params: Promise<{ species: string; category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { species, category } = await params;
  if (species !== "dogs" && species !== "cats") return {};
  const item = getBlogCategory(species as BlogSpecies, category);
  if (!item) return {};
  const title = `${item.label} ${species === "dogs" ? "Dog" : "Cat"} Guides`;
  const description = `${item.description}. Browse helpful BuddyDays stories and practical ideas.`;
  return { title, description, alternates: { canonical: `/blog/${species}/${category}` } };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { species, category } = await params;
  if (species !== "dogs" && species !== "cats") notFound();
  if (!getBlogCategory(species as BlogSpecies, category)) notFound();
  return <BlogBrowser variant="page" initialSpecies={species as BlogSpecies} initialCategory={category} />;
}

export function generateStaticParams() {
  return Array.from(
    new Set(blogArticles.filter(isPublishedArticle).map((article) => `${article.species}/${article.category}`)),
  ).map((route) => {
    const [species, category] = route.split("/");
    return { species, category };
  });
}
