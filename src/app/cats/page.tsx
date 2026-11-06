import type { Metadata } from "next";
import { BlogBrowser } from "@/features/blog/components/blog-browser";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(
  "Cat World | BuddyDays",
  "Helpful guides, ideas and everyday inspiration for life with your cat.",
);

export default function CatsPage() {
  return <BlogBrowser variant="page" initialSpecies="cats" />;
}
