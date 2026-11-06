BuddyDays Blog integration patch
================================

This patch adds the editorial blog block after Cat World and before the existing Tools section.
It preserves the supplied Dog/Cat homepage composition and the full-section mascot gaze tracking.

Included:
- Wide blog panel with search, All/Dogs/Cats filters, category sidebar and counts.
- Sorting: Latest, Oldest, Title A-Z, Title Z-A, Editor's picks.
- 6 cards per homepage page; 12 cards per /blog page.
- Pagination, empty states, responsive desktop/tablet/mobile layouts.
- Category archive routes: /blog/{species}/{category}.
- Article routes: /blog/{species}/{category}/{slug}.
- Header navigation links to Blog.
- Sitemap includes published blog content only.
- Unit and Playwright tests for search, filtering and pagination.

Important editorial behavior:
- 18 starter topic records are marked status: "draft".
- Draft topics are visible locally in development so the interface can be tested.
- Drafts are excluded from production listings, article pages and sitemap.
- Their detail pages show an editorial outline preview, not a finished article.
- Do not change a topic to status: "published" until a complete, reviewed body has been added to its sections field.

No dependencies or environment variables were added. Do not run npm install again just for this patch.

Install:
1. Stop the dev server with Ctrl+C.
2. Extract this archive into the BuddyDays project root (the folder containing package.json).
3. Allow files to merge/replace.
4. Run: npm run dev
5. Open: http://localhost:3000

Full blog: http://localhost:3000/blog

After installation, run when convenient:
- npm run typecheck
- npm run lint
- npm test
- npm run test:e2e

The full Next.js build and Playwright suite were not executed in the patch-building environment because npm dependency installation timed out there.
