# BuddyDays

BuddyDays is an editorial platform for dog and cat owners in the US. The first release focuses on useful articles, clear topic navigation, and validating organic traffic before product and affiliate features are built.

## Stack
- Next.js App Router, React, TypeScript (strict)
- Tailwind CSS v4, Zod, MDX
- Vitest and Playwright

## Requirements
- Node.js 20.19+ (Node 22 LTS recommended)
- npm

## Start locally
No `.env.local` file or external service credentials are required for the initial local development setup. The project pins Vitest to `4.1.11` and overrides that version to avoid a known npm 10.9.3 peer-resolution crash.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands
```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Core rules
1. Product is BuddyDays-owned researched data; it has no merchant-specific offer, live inventory, or Amazon price.
2. Offer is a merchant-specific purchase destination and is separate from Product.
3. Matching, scoring, filtering, and comparison use Product only. Attach Offers after matching.
4. Amazon API is optional; BuddyDays must work without it.
5. Never copy Amazon product images or other Product Advertising Content outside the current license.
6. Every important product claim must have a traceable source.
7. Amazon Special Links must be direct; do not hide them behind BuddyDays redirects.
8. Do not invent product specifications, tests, ratings, or review counts.
9. Never expose server secrets in client components.
10. Respect accessibility, touch input, and prefers-reduced-motion.

Read `AGENTS.md` and `docs/` before implementing features. See `docs/blog-workflow.md` for adding and publishing articles.


## Homepage design reference

The homepage is a direct port of the supplied full HTML reference. Its CSS, copy, SVG mascots, header, responsive layout, tool tabs, footer, and pointer interactions are preserved. The brand name is adapted to BuddyDays. Avoid replacing it with a new interpretation of the design.


## Blog preview

The BuddyDays Blog is data-driven and currently contains editorial topic previews in `src/data/blog/articles.ts`. These records are marked `draft`: they are visible in local development so search, category filters, sorting, and pagination can be tested, but they are automatically excluded from production. Set an entry to `published` only after its full article is written, reviewed, and ready to publish.

The blog browser supports search across titles, summaries, categories, and tags; All/Dogs/Cats filters; category navigation; Latest/Oldest/A–Z/Z–A/Editor's picks sorting; and pagination.
