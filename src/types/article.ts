export interface ArticleFrontmatter {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  species?: "dog" | "cat" | "both";
  category?: string;
  author?: string;
  sources?: string[];
}
