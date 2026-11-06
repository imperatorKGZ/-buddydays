import type { Metadata } from "next";
import { BlogBrowser } from "@/features/blog/components/blog-browser";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(
  "Dog World | BuddyDays",
  "Practical ideas, thoughtful guides and everyday help for life with your dog.",
);

export default function DogsPage() {
  return <BlogBrowser variant="page" initialSpecies="dogs" />;
}
