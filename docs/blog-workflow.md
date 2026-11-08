# BuddyDays Blog workflow

## Current implementation

- `src/data/blog/articles.ts` stores the blog index records.
- `src/data/blog/categories.ts` stores the Dogs/Cats category taxonomy.
- `BlogBrowser` provides search, pet filters, category filters, sorting, and pagination.
- The homepage shows 6 records per page; `/blog` shows 12.
- The initial records are editorial topic previews with `status: "draft"`. They appear only in local development. Drafts are excluded from production listing, detail routes, and sitemap.
- Draft detail pages show an outline only. They are not publishable articles.

## Publishing an article

1. Write the complete article and review every factual statement.
2. Add appropriate primary/authoritative sources for health, nutrition, behavior, or safety topics.
3. Add the final title, excerpt, species, category, tags, and reading time to `articles.ts`.
4. Add an ISO date in `publishedAt` (for example `2026-11-05`).
5. Add the complete article body and rendering support before changing its `status` to `published`.
6. Verify the canonical route `/blog/{species}/{category}/{slug}`, related category links, metadata, and sitemap entry.
7. Never mark an outline-only preview as published.

## Required verification

Run `npm run content:validate` before opening a pull request. The validator
checks slugs, taxonomy, dates, required metadata, and the requirements for
published records without modifying article data. Each published article needs
rights-cleared imagery and meaningful alt text before it is released.

## Browser behavior

- Search matches title, excerpt, category, and tags.
- Pet tabs and category filters compose with search.
- Sorting: Latest, Oldest, A–Z, Z–A, and Editor's picks.
- “Most popular” is intentionally omitted until real, consent-aware engagement data exists.
- Pagination is 12 items per page on `/blog`; the homepage preview uses 6.
