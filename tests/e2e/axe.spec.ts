import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/blog",
  "/dogs",
  "/cats",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/methodology",
  "/emergency-pet-help",
  "/tools",
  "/tools/pet-cost-calculator",
  "/tools/pet-size-calculator",
  "/tools/travel-checklist",
  "/products",
  "/comparisons",
] as const;

for (const route of routes) {
  test(`axe: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      results.violations.map((violation) => `${violation.id}: ${violation.help}`).join("\n"),
    ).toEqual([]);
  });
}
