import type { Metadata } from "next";
import { BlogBrowser } from "@/features/blog/components/blog-browser";

export const metadata: Metadata = {
  title: "The BuddyDays Journal",
  description: "Helpful ideas and thoughtful guides for life with dogs and cats.",
  openGraph: {
    title: "The BuddyDays Journal",
    description: "Helpful ideas and thoughtful guides for life with dogs and cats.",
    type: "website",
  },
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
};

export default function BlogPage() {
  return (
    <main>
      <BlogBrowser variant="page" />
    </main>
  );
}
