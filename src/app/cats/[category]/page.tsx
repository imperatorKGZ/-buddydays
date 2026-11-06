import { notFound } from "next/navigation";
import { productCategories } from "@/data/catalog/categories";
import { productRepository } from "@/server/repositories/product.repository";
import { ProductGrid } from "@/features/product-catalog/components/product-grid";
import { createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() { return productCategories.filter((item) => item.species === "cat").map((item) => ({ category: item.slug })); }
export default async function CatCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = productCategories.find((item) => item.slug === slug && item.species === "cat");
  if (!category) notFound();
  const products = await productRepository.findMany({ species: "cat", category: slug, status: "active" });
  return <main className="page-shell"><p className="eyebrow">Cat World / {category.label}</p><h1>{category.label} for cats</h1><p>{category.description}</p><ProductGrid products={products}/></main>;
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = productCategories.find((item) => item.slug === slug && item.species === "cat");
  return category ? createPageMetadata(`${category.label} for Cats`, category.description) : {};
}
