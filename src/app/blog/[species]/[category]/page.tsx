import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogBrowser } from "@/features/blog/components/blog-browser";
import { getBlogCategory, type BlogSpecies } from "@/data/blog/categories";

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
