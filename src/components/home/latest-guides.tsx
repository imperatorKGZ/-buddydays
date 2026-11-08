import Link from "next/link";
import { blogArticles } from "@/data/blog/articles";
import { getBlogCategory } from "@/data/blog/categories";
import styles from "./latest-guides.module.css";

const isDevelopment = process.env.NODE_ENV !== "production";

const latestArticles = blogArticles
  .filter((article) => (article.status === "published" && Boolean(article.sections?.length)) || isDevelopment)
  .sort((a, b) => {
    const aDate = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bDate = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bDate - aDate || b.rank - a.rank;
  })
  .slice(0, 6);

function articleHref(article: (typeof latestArticles)[number]) {
  return "/blog/" + article.species + "/" + article.category + "/" + article.slug;
}

export function LatestGuides() {
  return (
    <section className={styles.section} aria-labelledby="latest-guides-title">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <span className={styles.kicker}>THE BUDDYDAYS JOURNAL</span>
            <h2 id="latest-guides-title">Good reads for better days.</h2>
            <p>Thoughtful guides and practical ideas for life with dogs and cats.</p>
          </div>
          <Link className={styles.viewAll} href="/blog">
            Explore the Journal <span aria-hidden="true">→</span>
          </Link>
        </div>

        {latestArticles.length > 0 ? (
          <div className={styles.grid}>
            {latestArticles.map((article) => {
              const category = getBlogCategory(article.species, article.category);
              const isPublished = article.status === "published" && Boolean(article.sections?.length);

              return (
                <article className={styles.card} key={article.id}>
                  <Link
                    className={article.species === "dogs" ? styles.dogCover : styles.catCover}
                    href={articleHref(article)}
                    aria-label={"Read: " + article.title}
                  >
                    <span className={styles.species}>{article.species === "dogs" ? "DOGS" : "CATS"}</span>
                    <span className={styles.coverTitle}>{category?.label ?? article.category}</span>
                    <span className={styles.coverMark} aria-hidden="true">
                      {article.species === "dogs" ? "◒" : "◓"}
                    </span>
                  </Link>
                  <div className={styles.cardBody}>
                    <div className={styles.meta}>
                      <span>{category?.label ?? article.category}</span>
                      <span>{article.readingMinutes} MIN READ</span>
                    </div>
                    <h3>
                      <Link href={articleHref(article)}>{article.title}</Link>
                    </h3>
                    <p>{article.excerpt}</p>
                    <Link className={styles.readLink} href={articleHref(article)}>
                      {isPublished ? "Read guide" : "Preview topic"} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>New guides are on the way.</h3>
            <p>We are preparing practical, carefully researched articles for dog and cat owners.</p>
            <Link href="/blog">Visit the Journal →</Link>
          </div>
        )}

        {isDevelopment && latestArticles.some((article) => article.status === "draft") ? (
          <p className={styles.previewNote}>
            Development preview: draft topics are shown locally and are not published.
          </p>
        ) : null}
      </div>
    </section>
  );
}
