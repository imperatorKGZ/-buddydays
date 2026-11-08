# BuddyDays Architecture

## Shape

BuddyDays is a modular monolith. Next.js owns routes and rendering; `features` owns business capabilities; repositories isolate storage; merchant integrations are isolated under `src/server/integrations/merchants`.

## Layers

1. Presentation: `app`, `components`, feature UI.
2. Features: pure matching, scoring, comparison, calculators, planners.
3. Domain/data: `types` and BuddyDays-owned `data`.
4. Repositories: stable access boundary between app and storage.
5. Integrations: external merchant links and APIs.

## Product and Offer

Product is the canonical BuddyDays catalog record: sourced product attributes, suitability notes, editorial fields, and source references. It contains no merchant price, inventory, or affiliate URL. Offer connects a Product to a merchant and contains only fields allowed by that merchant program. A stored Offer does not prove price or stock is current.

Product finder, matching, scoring, filters, and comparison operate exclusively on Product. Query Offers only after calculating product matches. A price filter must wait until a compliant current price source is chosen.

## Storage

The starter uses typed local data behind repositories. No database is configured. PostgreSQL can be added later without changing feature algorithms.

## Amazon

Amazon Special Links must be direct, not hidden behind a BuddyDays redirect. Creators API is optional. Amazon Product Advertising Content has specific eligibility, license, caching, display, image, and mobile-use rules. Re-check the current agreement and API license before implementing the integration. Never copy licensed Amazon content into the BuddyDays-owned catalog.

## Analytics

Outbound analytics is disabled until a consent-aware provider and persistence layer are configured. The API route currently returns 501 and does not persist events.

## Rendering

Prefer Server Components. Use Client Components only for interaction. Keep algorithms pure and testable.

## Blog architecture

- Blog article metadata lives in `src/data/blog/articles.ts`; topic taxonomy lives in `src/data/blog/categories.ts`.
- `BlogBrowser` is a client-side view over this data. It combines pet filters, category filters, text search, sorting, and pagination without duplicating data.
- Draft topic previews are shown only in development. Production pages and sitemap include published records only.
- Article URLs use `/blog/{species}/{category}/{slug}`. Category archives use `/blog/{species}/{category}`.
- Search and filter logic must remain independent of affiliate offers and product data.
