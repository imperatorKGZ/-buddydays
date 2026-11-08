# Audit status and verification boundary

## Confirmed from the Stage 1.2 source

- The Hero wrapper used a responsive horizontal padding, and `.worldGrid` then applied a second `calc(100% - 2 * gutter)` width reduction. This caused an additional inset on intermediate widths.
- A later `.worldGrid :global(.world-inner) { width: 100%; }` rule overrode the earlier inner width and the Stage 1.1 mobile width rules. Removing that override restores the card's content inset and does not alter the Stage 1.1 stacked mobile order.
- A global `section[aria-labelledby="latest-guides-title"]` selector constrained the outer section while the CSS Module already owned the `.inner` content rail. That outer selector is removed; the inner container remains the sole width owner.
- The small kicker color `#718076` did not meet 4.5:1 on the light paper backgrounds. The replacement `#5f6c61` exceeds 4.5:1 on `#f7f3ed`, `#f8f5ef`, and `#faf8f3`.
- The mobile menu referenced `mobile-navigation` through `aria-controls` even while the controlled navigation node was not mounted. The attribute is now conditional.

## Included verification

The added Playwright test captures full-page screenshots at the ten requested widths, captures open-menu screenshots for mobile widths, checks horizontal overflow, compares actual content rails, validates the Dog/Cat composition, checks menu keyboard behavior and verifies route selection closes the menu.

## Not executed in this environment

- `git status` on a local checkout
- ESLint
- TypeScript typecheck
- Vitest
- Next.js production build
- Playwright and screenshot generation
- Browser visual inspection of the generated screenshots

No PASS result is claimed for these checks. The GitHub read-only connector permitted source inspection, but branch creation returned HTTP 403 (`Resource not accessible by integration`). The runtime also could not resolve `github.com` for a local clone. Apply the package in a local checkout and run the commands in `README-APPLY.md`.
