import type { Metadata } from "next";
import { BlogBrowser } from "@/features/blog/components/blog-browser";

export const metadata: Metadata = {
  title: "The BuddyDays Journal",
  description: "Helpful ideas and thoughtful guides for life with dogs and cats.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "The BuddyDays Journal",
    description: "Helpful ideas and thoughtful guides for life with dogs and cats.",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogBrowser variant="page" />;
}
