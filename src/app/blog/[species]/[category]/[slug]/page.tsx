import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogArticles, getBlogArticleBySlug } from "@/data/blog/articles";
import { getBlogCategory } from "@/data/blog/categories";
import { isPublishedArticle } from "@/features/blog/logic/article-validation";
import styles from "./article-page.module.css";

interface ArticlePageProps {
  params: Promise<{ species: string; category: string; slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { species, category, slug } = await params;
  if (species !== "dogs" && species !== "cats") return {};
  const article = getBlogArticleBySlug(slug);
  if (!article || article.species !== species || article.category !== category || !isPublishedArticle(article))
    return { robots: { index: false, follow: false } };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${species}/${category}/${slug}` },
    openGraph: { title: article.title, description: article.excerpt, type: "article" },
  };
}

export function generateStaticParams() {
  return blogArticles.filter(isPublishedArticle).map((article) => ({
    species: article.species,
    category: article.category,
    slug: article.slug,
  }));
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { species, category, slug } = await params;
  if (species !== "dogs" && species !== "cats") notFound();

  const article = getBlogArticleBySlug(slug);
  if (!article || article.species !== species || article.category !== category) notFound();
  const isDraft = article.status !== "published" || !article.sections?.length;
  if (isDraft && process.env.NODE_ENV === "production") notFound();

  const categoryInfo = getBlogCategory(article.species, article.category);

  return (
    <main className={`page-shell ${styles.page}`}>
      <Link className="text-link" href={`/blog/${article.species}/${article.category}`}>
        ← Back to {categoryInfo?.label ?? "stories"}
      </Link>
      <div className={styles.header}>
        <span className="badge">
          {article.species === "dogs" ? "DOGS" : "CATS"} · {categoryInfo?.label.toUpperCase()}
        </span>
        {isDraft && <span className={styles.draftLabel}>EDITORIAL PREVIEW — NOT PUBLISHED</span>}
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.lead}>{article.excerpt}</p>
        <span className={styles.readingTime}>{article.readingMinutes} min read</span>
      </div>

      {isDraft ? (
        <div className={styles.draftPanel}>
          <h2>Editorial outline</h2>
          <p>
            This is a topic preview used while the BuddyDays editorial library is being built. It is not a finished care
            guide and should not be published as-is.
          </p>
          <ol>
            {article.outline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className={styles.articleBody}>
          {article.sections?.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          {article.sources?.length ? (
            <section className={styles.sources}>
              <h2>Sources and further reading</h2>
              <ul>
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </main>
  );
}
