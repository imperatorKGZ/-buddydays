# BuddyDays — Agent Instructions

## Product
BuddyDays is an editorial content platform for US dog and cat owners. Phase 1 focuses on useful articles, clear topic navigation, and validating organic demand before building product catalogs or affiliate monetization. Interface/content language: English (US).

## Stack
Next.js App Router, React, TypeScript strict, Tailwind CSS v4, Zod, MDX, Vitest, Playwright.

## Architecture
1. Keep `src/app` route files thin.
2. Reusable primitives belong in `src/components/ui`.
3. Product capabilities belong in `src/features`.
4. Server-only code belongs in `src/server`; use `import "server-only"`.
5. Navigation has one source of truth: `src/config/navigation.ts`.
6. Shared domain contracts belong in `src/types`. Avoid duplicated types and rules.

## Content-first launch
- The first release is a blog and editorial library. Do not add product cards, affiliate calls to action, merchant pricing, or Amazon integrations to the blog unless explicitly requested.
- Draft topic previews are for local development only. Production listings, article routes, and sitemap must expose published content only.
- Search must cover title, summary, category, and tags; filters and sorting must compose rather than overwrite one another.

## Product vs Offer
- Product is BuddyDays-owned product information.
- Offer is a merchant-specific purchase destination.
- Matching, scoring, filtering, and comparison accept Product only. Never import Offer, merchant adapters, or Amazon API into these algorithms.
- Attach available Offers only after product matching.
- Do not store Amazon prices, availability, ratings, reviews, or Amazon images in static catalog data.
- Do not implement price filters until an allowed and current source is selected.

## Research integrity
- Do not invent specifications, tests, personal experience, ratings, or availability.
- Record sources and verification dates for important product claims.
- Distinguish manufacturer claims from editorial assessment and independent tests.
- Use original, licensed, or explicitly permitted images.

## Affiliate compliance
- Amazon Special Links must be direct; no BuddyDays redirect wrapper.
- Include the correct Associate tracking ID when enabled.
- Display required disclosures clearly and near affiliate links.
- Treat each merchant according to its own current program terms.
- Creators API is optional. Verify current eligibility, licensing, mobile usage, display, and cache rules before implementation.

## Homepage visual reference
- Treat the owner-supplied full homepage HTML as the source of truth for the homepage layout, SVG mascots, copy, colors, spacing, responsive breakpoints, tool tabs, header, and footer.
- Preserve that design exactly when changing framework code; do not substitute a new visual interpretation, simplify the composition, add decorative elements, or rewrite copy unless explicitly requested.
- The BuddyDays name replaces the former reference brand name; all other copy and visual details remain as supplied.

## UI, security, privacy
- Mobile-first; test from 320 CSS px to desktop.
- All primary actions work with keyboard and touch; hover is enhancement only.
- Respect `prefers-reduced-motion`; show focus states.
- Never expose server secrets to client code.
- Do not collect analytics until provider, consent, and retention are configured.

## Workflow
Read relevant docs, inspect current code, reuse components, update tests, then run `npm run lint`, `npm run typecheck`, and `npm test`. Do not claim checks passed unless executed.
