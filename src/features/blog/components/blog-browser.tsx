"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, type ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { blogArticles, type BlogArticle } from "@/data/blog/articles";
import { blogCategories, type BlogSpecies } from "@/data/blog/categories";
import {
  filterAndSortBlogArticles,
  paginateBlogArticles,
  parseBlogQuery,
  serializeBlogQuery,
  type BlogQuery,
} from "@/features/blog/logic/blog-browser";
import styles from "./blog-browser.module.css";

type SpeciesFilter = "all" | BlogSpecies;
type SortMode = "latest" | "oldest" | "az" | "za" | "editors";
type BlogBrowserProps = {
  variant?: "home" | "page";
  initialSpecies?: SpeciesFilter;
  initialCategory?: string;
};

const PAGE_SIZE = 12;
const HOME_PAGE_SIZE = 6;

function categoryHref(species: BlogSpecies, category: string) {
  return `/blog/${species}/${category}`;
}

function getArticleHref(article: BlogArticle) {
  return `/blog/${article.species}/${article.category}/${article.slug}`;
}

function categoryLabel(article: BlogArticle) {
  return (
    blogCategories.find((item) => item.species === article.species && item.id === article.category)?.label ??
    article.category
  );
}

export function BlogBrowser({ variant = "page", initialSpecies = "all", initialCategory = "all" }: BlogBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlState = useMemo(
    () =>
      parseBlogQuery(new URLSearchParams(searchParams.toString()), {
        species: initialSpecies,
        category: initialCategory,
      }),
    [searchParams, initialCategory, initialSpecies],
  );
  const effectiveQuery = urlState.query;
  const effectiveSpecies = urlState.species;
  const effectiveCategory = urlState.category;
  const effectiveSort = urlState.sort;
  const effectivePage = urlState.page;
  const queryRef = useRef<BlogQuery>(urlState);
  useEffect(() => {
    queryRef.current = urlState;
  }, [urlState]);
  const isHome = variant === "home";
  const pageHeading = isHome
    ? "Good reads for better days."
    : effectiveSpecies === "dogs"
      ? "Dog stories & guides"
      : effectiveSpecies === "cats"
        ? "Cat stories & guides"
        : "The BuddyDays Journal";
  const pageDescription = isHome
    ? undefined
    : effectiveSpecies === "dogs"
      ? "Practical ideas, thoughtful guides and everyday help for life with your dog."
      : effectiveSpecies === "cats"
        ? "Helpful guides, ideas and everyday inspiration for life with your cat."
        : "Helpful ideas and thoughtful guides for life with dogs and cats.";
  const availableArticles = useMemo(
    () =>
      blogArticles.filter(
        (article) =>
          (article.status === "published" && Boolean(article.sections?.length)) ||
          process.env.NODE_ENV !== "production",
      ),
    [],
  );

  const visibleArticles = useMemo(() => {
    const labels = new Map(blogCategories.map((item) => [`${item.species}:${item.id}`, item.label]));
    return filterAndSortBlogArticles(
      availableArticles,
      {
        species: effectiveSpecies,
        category: effectiveCategory,
        query: effectiveQuery,
        sort: effectiveSort,
        page: effectivePage,
      },
      labels,
    );
  }, [availableArticles, effectiveCategory, effectivePage, effectiveQuery, effectiveSort, effectiveSpecies]);

  const hasPublishedArticles = blogArticles.some(
    (article) => article.status === "published" && Boolean(article.sections?.length),
  );
  const productionLibraryIsEmpty = process.env.NODE_ENV === "production" && !hasPublishedArticles;
  const pageSize = isHome ? HOME_PAGE_SIZE : PAGE_SIZE;
  const pagination = paginateBlogArticles(visibleArticles, effectivePage, pageSize);
  const pageCount = pagination.pageCount;
  const safePage = pagination.page;
  const pageArticles = pagination.items;
  const species = effectiveSpecies;
  const category = effectiveCategory;
  const query = effectiveQuery;
  const sort = effectiveSort;
  const showingFrom = visibleArticles.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const showingTo = Math.min(safePage * pageSize, visibleArticles.length);

  const dogCategories = blogCategories.filter((item) => item.species === "dogs");
  const catCategories = blogCategories.filter((item) => item.species === "cats");
  const scopedArticleCount =
    effectiveSpecies === "all"
      ? availableArticles.length
      : availableArticles.filter((article) => article.species === effectiveSpecies).length;

  function navigate(next: Partial<BlogQuery>, replace = false) {
    const current = queryRef.current;
    const nextState: BlogQuery = {
      ...current,
      ...next,
    };
    const queryString = serializeBlogQuery(nextState);
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    queryRef.current = nextState;
    (replace ? router.replace : router.push)(url, { scroll: false });
  }

  function updateSpecies(next: SpeciesFilter) {
    navigate({ species: next, category: "all", page: 1 });
  }

  function updateCategory(next: string, nextSpecies?: BlogSpecies) {
    navigate({ species: nextSpecies ?? effectiveSpecies, category: next, page: 1 });
  }

  function resetFilters() {
    navigate({ species: "all", category: "all", query: "", sort: "latest", page: 1 }, true);
  }

  const startPage = Math.max(1, Math.min(safePage - 2, pageCount - 4));
  const pageNumbers = Array.from({ length: Math.min(5, pageCount) }, (_, index) => startPage + index);

  return (
    <section
      id={isHome ? "blog" : undefined}
      className={`${styles.blogSection} ${isHome ? styles.homeVariant : styles.pageVariant}`}
      aria-labelledby={isHome ? "home-blog-title" : "blog-page-title"}
    >
      <div className={styles.blogOuter}>
        <div className={styles.blogPanel}>
          <div className={styles.panelHeader}>
            <div className={styles.headingGroup}>
              <span className={styles.kicker}>THE BUDDYDAYS JOURNAL</span>
              <h2 id={isHome ? "home-blog-title" : "blog-page-title"}>{pageHeading}</h2>
              {!isHome && pageDescription && <p className={styles.pageLead}>{pageDescription}</p>}
            </div>
            <label className={styles.searchBox}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.6" />
                <path d="m16 16 4.1 4.1" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  navigate({ query: event.target.value, page: 1 });
                }}
                placeholder="Search articles, topics or questions"
                aria-label="Search articles, topics or questions"
              />
              {query && (
                <button
                  type="button"
                  className={styles.clearSearch}
                  onClick={() => {
                    navigate({ query: "", page: 1 }, true);
                  }}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>
          </div>

          <div className={styles.toolbar}>
            <div className={styles.speciesTabs} role="group" aria-label="Filter articles by pet">
              {(["all", "dogs", "cats"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={species === item ? styles.activeTab : styles.tab}
                  aria-pressed={species === item}
                  onClick={() => updateSpecies(item)}
                >
                  {item === "all" ? "All stories" : item === "dogs" ? "Dogs" : "Cats"}
                </button>
              ))}
            </div>
            <label className={styles.sortControl}>
              <span>Sort</span>
              <select
                value={sort}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  navigate({ sort: event.target.value as SortMode, page: 1 });
                }}
                aria-label="Sort articles"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="az">Title A–Z</option>
                <option value="za">Title Z–A</option>
                <option value="editors">Editor&apos;s picks</option>
              </select>
            </label>
          </div>

          <div className={styles.browserBody}>
            <aside className={styles.sidebar} aria-label="Browse article categories">
              <button
                type="button"
                className={`${styles.topicButton} ${category === "all" ? styles.topicActive : ""}`}
                onClick={() => updateCategory("all")}
              >
                <span>All topics</span>
                <span>{scopedArticleCount}</span>
              </button>
              {(species === "all" || species === "dogs") && (
                <div className={styles.topicGroup}>
                  <h3>For dogs</h3>
                  {dogCategories.map((item) => {
                    const count = availableArticles.filter(
                      (article) => article.species === "dogs" && article.category === item.id,
                    ).length;
                    return (
                      <button
                        key={`dogs-${item.id}`}
                        type="button"
                        className={`${styles.topicButton} ${species === "dogs" && category === item.id ? styles.topicActive : ""}`}
                        onClick={() => updateCategory(item.id, "dogs")}
                      >
                        <span>{item.label}</span>
                        <span>{count}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              {(species === "all" || species === "cats") && (
                <div className={styles.topicGroup}>
                  <h3>For cats</h3>
                  {catCategories.map((item) => {
                    const count = availableArticles.filter(
                      (article) => article.species === "cats" && article.category === item.id,
                    ).length;
                    return (
                      <button
                        key={`cats-${item.id}`}
                        type="button"
                        className={`${styles.topicButton} ${species === "cats" && category === item.id ? styles.topicActive : ""}`}
                        onClick={() => updateCategory(item.id, "cats")}
                      >
                        <span>{item.label}</span>
                        <span>{count}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              <div className={styles.sidebarNote}>New stories are added as our editorial library grows.</div>
            </aside>

            <div className={styles.resultsArea}>
              <div className={styles.resultsHeader}>
                <div>
                  <h3>
                    {category === "all"
                      ? species === "all"
                        ? "All articles"
                        : species === "dogs"
                          ? "Dog articles"
                          : "Cat articles"
                      : `${category[0].toUpperCase()}${category.slice(1).replaceAll("-", " ")}`}
                  </h3>
                  <p aria-live="polite">
                    {visibleArticles.length
                      ? `Showing ${showingFrom}–${showingTo} of ${visibleArticles.length} ${visibleArticles.length === 1 ? "article" : "articles"}`
                      : "No matching articles"}
                  </p>
                </div>
                {(species !== "all" || category !== "all" || query) && (
                  <button type="button" className={styles.resetButton} onClick={resetFilters}>
                    Clear filters
                  </button>
                )}
              </div>

              {pageArticles.length > 0 ? (
                <div className={styles.articleGrid}>
                  {pageArticles.map((article) => (
                    <article className={styles.articleCard} key={article.id}>
                      <Link
                        className={`${styles.articleCover} ${styles[`cover_${article.species}`]}`}
                        href={getArticleHref(article)}
                        aria-label={`Open: ${article.title}`}
                      >
                        <span className={styles.coverSpecies}>
                          {article.species === "dogs" ? "DOG STORY" : "CAT STORY"}
                        </span>
                        <span className={styles.coverWord}>{categoryLabel(article)}</span>
                        <span className={styles.coverOrbit} />
                      </Link>
                      <div className={styles.cardContent}>
                        <div className={styles.cardMeta}>
                          <Link href={categoryHref(article.species, article.category)}>
                            {article.species === "dogs" ? "DOGS" : "CATS"} · {categoryLabel(article).toUpperCase()}
                          </Link>
                          <span>{article.readingMinutes} MIN READ</span>
                        </div>
                        <h4>
                          <Link href={getArticleHref(article)}>{article.title}</Link>
                        </h4>
                        <p>{article.excerpt}</p>
                        <Link className={styles.readLink} href={getArticleHref(article)}>
                          {article.status === "published" && article.sections?.length ? "Read story" : "Preview topic"}{" "}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <h4>
                    {productionLibraryIsEmpty && !query && category === "all"
                      ? "Our first stories are on the way"
                      : "No stories found"}
                  </h4>
                  <p>
                    {productionLibraryIsEmpty && !query && category === "all"
                      ? "The BuddyDays editorial library is being prepared. New guides will appear here after review."
                      : "Try another search or clear your filters to browse all topics."}
                  </p>
                  {(!productionLibraryIsEmpty || query || category !== "all" || species !== "all") && (
                    <button type="button" onClick={resetFilters}>
                      Show all stories
                    </button>
                  )}
                </div>
              )}

              {pageCount > 1 && (
                <nav className={styles.pagination} aria-label="Article pages">
                  <button
                    type="button"
                    disabled={safePage === 1}
                    onClick={() => navigate({ page: Math.max(1, safePage - 1) })}
                  >
                    Previous
                  </button>
                  {startPage > 1 && (
                    <>
                      <button type="button" onClick={() => navigate({ page: 1 })}>
                        1
                      </button>
                      <span>…</span>
                    </>
                  )}
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      type="button"
                      className={number === safePage ? styles.currentPage : ""}
                      aria-current={number === safePage ? "page" : undefined}
                      onClick={() => navigate({ page: number })}
                    >
                      {number}
                    </button>
                  ))}
                  {startPage + pageNumbers.length - 1 < pageCount && (
                    <>
                      <span>…</span>
                      <button type="button" onClick={() => navigate({ page: pageCount })}>
                        {pageCount}
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    disabled={safePage === pageCount}
                    onClick={() => navigate({ page: Math.min(pageCount, safePage + 1) })}
                  >
                    Next
                  </button>
                </nav>
              )}

              {isHome && (
                <div className={styles.viewAllRow}>
                  <Link href="/blog">
                    View all articles <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
              {process.env.NODE_ENV !== "production" &&
                visibleArticles.some((article) => article.status === "draft") && (
                  <p className={styles.previewNotice}>
                    Local preview: sample topics are editorial placeholders, not publication-ready articles.
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
