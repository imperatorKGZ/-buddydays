import { notFound } from "next/navigation";
import { productCategories } from "@/data/catalog/categories";
import { productRepository } from "@/server/repositories/product.repository";
import { ProductGrid } from "@/features/product-catalog/components/product-grid";
import { createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() { return productCategories.filter((item) => item.species === "dog").map((item) => ({ category: item.slug })); }
export default async function DogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = productCategories.find((item) => item.slug === slug && item.species === "dog");
  if (!category) notFound();
  const products = await productRepository.findMany({ species: "dog", category: slug, status: "active" });
  return <main className="page-shell"><p className="eyebrow">Dog World / {category.label}</p><h1>{category.label} for dogs</h1><p>{category.description}</p><ProductGrid products={products}/></main>;
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = productCategories.find((item) => item.slug === slug && item.species === "dog");
  return category ? { ...createPageMetadata(`${category.label} for Dogs`, category.description), robots: { index: false, follow: false } } : {};
}
