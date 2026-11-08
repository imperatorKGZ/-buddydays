import { blogArticles } from "@/data/blog/articles";
import { isPublishedArticle } from "@/features/blog/logic/article-validation";
import { siteConfig } from "@/config/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = blogArticles
    .filter(isPublishedArticle)
    .map((article) => {
      const url = new URL(`/blog/${article.species}/${article.category}/${article.slug}`, siteConfig.url).toString();
      return `<item><title>${escapeXml(article.title)}</title><description>${escapeXml(article.excerpt)}</description><link>${url}</link><guid isPermaLink="true">${url}</guid>${article.publishedAt ? `<pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>` : ""}</item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>BuddyDays Journal</title><link>${siteConfig.url}/blog</link><description>${escapeXml(siteConfig.description)}</description>${items}</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
