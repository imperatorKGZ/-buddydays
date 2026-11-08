import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

type ViewportCase = {
  name: string;
  width: number;
  height: number;
  expectedGuideColumns: number;
  isMobile: boolean;
};

const viewports: ViewportCase[] = [
  { name: "desktop-1440", width: 1440, height: 1000, expectedGuideColumns: 3, isMobile: false },
  { name: "tablet-768", width: 768, height: 1024, expectedGuideColumns: 2, isMobile: false },
  { name: "mobile-390", width: 390, height: 844, expectedGuideColumns: 1, isMobile: true },
  { name: "mobile-375", width: 375, height: 844, expectedGuideColumns: 1, isMobile: true },
  { name: "small-mobile-320", width: 320, height: 780, expectedGuideColumns: 1, isMobile: true },
];

const screenshotDirectory = path.resolve(process.cwd(), "test-results", "responsive");
const homepageHeading = "Better days with dogs and cats.";

for (const viewport of viewports) {
  test(`homepage responsive: ${viewport.name}`, async ({ page }) => {
    test.setTimeout(90_000);

    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.emulateMedia({ reducedMotion: "reduce" });

    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response, "Homepage navigation did not return a response").not.toBeNull();
    expect(response!.status(), "Homepage should return HTTP 200").toBe(200);

    // Wait for the actual homepage, not only the initial HTML or a Suspense/loading fallback.
    await expect(
      page.getByRole("heading", { name: homepageHeading, exact: true }),
    ).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText("Loading BuddyDays...", { exact: true })).toHaveCount(0, {
      timeout: 20_000,
    });

    await expect(page.locator("header.site-header")).toBeVisible();
    await expect(page.getByRole("link", { name: "BuddyDays home" })).toBeVisible();
    await expect(page.locator("#tools")).toBeAttached();
    await expect(page.locator('section[aria-labelledby="latest-guides-title"]')).toBeAttached();

    // Let web fonts and two layout frames settle before measuring or capturing screenshots.
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
    });

    await mkdir(screenshotDirectory, { recursive: true });
    await page.screenshot({
      path: path.join(screenshotDirectory, `home-${viewport.name}.png`),
      fullPage: true,
      animations: "disabled",
    });

    // Header and shared site chrome.
    await expect(page.locator("footer.site-footer")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Footer navigation" })).toBeVisible();

    if (viewport.isMobile) {
      await expect(page.locator(".desktop-nav")).toBeHidden();

      // The homepage can render the shared React menu (.menu-toggle) or the
      // legacy embedded reference menu (.mobile-menu-button). Both expose the
      // same accessible behavior; keep one selector that supports either.
      const menuToggle = page.locator(".menu-toggle");
      await expect(menuToggle).toHaveCount(1);
      await expect(menuToggle).toBeVisible();
      await expect(menuToggle).toBeEnabled();
      await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
      await expect(menuToggle).toHaveText("Menu");
      await menuToggle.click();

      const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
      await expect(mobileNavigation).toBeVisible({ timeout: 15_000 });
      await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
      await expect(menuToggle).toHaveText("Close");
      for (const label of ["Dogs", "Cats", "Journal", "Tools"]) {
        await expect(mobileNavigation.getByRole("link", { name: label, exact: true })).toBeVisible();
      }

      const mobileMenuBox = await mobileNavigation.boundingBox();
      expect(mobileMenuBox, "Mobile menu should have a measurable box").not.toBeNull();
      expect(
        mobileMenuBox!.width,
        `Mobile menu should stay inside the ${viewport.width}px viewport`,
      ).toBeLessThanOrEqual(viewport.width - 24);
      for (const link of await mobileNavigation.getByRole("link").all()) {
        const linkBox = await link.boundingBox();
        expect(linkBox, "Every mobile navigation link should have a measurable box").not.toBeNull();
        expect(linkBox!.height, "Mobile navigation links need a touch-friendly target").toBeGreaterThanOrEqual(44);
      }

      await page.screenshot({
        path: path.join(screenshotDirectory, `menu-${viewport.name}.png`),
        fullPage: false,
        animations: "disabled",
      });

      await menuToggle.click();
      // The navigation remains in the DOM and is hidden by CSS when closed.
      await expect(mobileNavigation).toBeHidden();
      await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
      await expect(menuToggle).toHaveText("Menu");
    } else {
      const desktopNavigation = page.locator(".desktop-nav");
      await expect(desktopNavigation).toBeVisible();
      for (const label of ["Dogs", "Cats", "Journal", "Tools"]) {
        await expect(desktopNavigation.getByRole("link", { name: label, exact: true })).toBeVisible();
      }
      await expect(page.locator(".mobile-menu")).toBeHidden();
    }

    // Hero and Dog/Cat composition.
    await expect(page.getByRole("heading", { name: homepageHeading, exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "More good days with your dog." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "A little more purr in every day." })).toBeVisible();

    const dogWorld = await page.locator("#dogs").boundingBox();
    const catWorld = await page.locator("#cats").boundingBox();
    expect(dogWorld, "Dog world should have a measurable layout box").not.toBeNull();
    expect(catWorld, "Cat world should have a measurable layout box").not.toBeNull();

    if (viewport.width > 820) {
      expect(
        Math.abs(dogWorld!.y - catWorld!.y),
        "At desktop width, Dog and Cat cards should sit side by side",
      ).toBeLessThan(8);
    } else {
      expect(
        catWorld!.y,
        "At tablet/mobile widths, the Cat card should stack below the Dog card",
      ).toBeGreaterThan(dogWorld!.y);
    }

    // Mobile Hero quality: artwork sits above full-width copy, instead of squeezing
    // headings and CTAs into a narrow two-column layout.
    if (viewport.width <= 560) {
      for (const worldId of ["dogs", "cats"]) {
        const world = page.locator(`#${worldId}`);
        const artwork = world.locator(".art-wrap");
        const copy = world.locator(".world-copy");
        const artworkBox = await artwork.boundingBox();
        const copyBox = await copy.boundingBox();
        expect(artworkBox, `${worldId} artwork should have a measurable box`).not.toBeNull();
        expect(copyBox, `${worldId} copy should have a measurable box`).not.toBeNull();
        expect(
          artworkBox!.y + artworkBox!.height,
          `${worldId} mascot should sit above its text on mobile`,
        ).toBeLessThanOrEqual(copyBox!.y + 2);
        expect(
          copyBox!.width,
          `${worldId} copy should use the available mobile card width`,
        ).toBeGreaterThanOrEqual(viewport.width - 72);

        const heading = world.getByRole("heading");
        const lineCount = await heading.evaluate((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          return range.getClientRects().length;
        });
        expect(lineCount, `${worldId} heading should remain readable (no more than 3 lines)`).toBeLessThanOrEqual(3);

        const cta = world.locator(".world-link");
        const ctaBox = await cta.boundingBox();
        expect(ctaBox, `${worldId} CTA should have a measurable box`).not.toBeNull();
        expect(ctaBox!.height, `${worldId} CTA text should not wrap`).toBeLessThanOrEqual(48);
        await expect(cta).toHaveCSS("white-space", "nowrap");
      }
    }

    // Latest Guides: confirm the cards use the intended 3 / 2 / 1-column layout.
    const guidesSection = page.locator('section[aria-labelledby="latest-guides-title"]');
    await expect(
      guidesSection.getByRole("heading", { name: "Good reads for better days." }),
    ).toBeVisible();

    const guideCards = guidesSection.locator("article");
    const guideCount = await guideCards.count();
    expect(guideCount, "Development preview should contain at least one guide card").toBeGreaterThan(0);
    expect(guideCount, "Latest Guides should never show more than six cards").toBeLessThanOrEqual(6);

    const guidePositions = await guideCards.evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { x: Math.round(rect.x), y: Math.round(rect.y) };
      }),
    );
    const firstRowY = Math.min(...guidePositions.map((position) => position.y));
    const firstRowColumns = guidePositions.filter(
      (position) => Math.abs(position.y - firstRowY) <= 2,
    ).length;
    expect(
      firstRowColumns,
      `Latest Guides should use ${viewport.expectedGuideColumns} column(s) at ${viewport.width}px`,
    ).toBe(viewport.expectedGuideColumns);

    // Tools: the three working tools must be linked and the pet tabs must respond.
    const toolsSection = page.locator("#tools");
    await expect(
      toolsSection.getByRole("heading", { name: "A little help for every pet parent." }),
    ).toBeVisible();
    await expect(toolsSection.locator(".tool-card")).toHaveCount(3);

    const toolLinks = toolsSection.locator(".tool-card-action");
    await expect(toolLinks).toHaveCount(3);
    await expect(toolLinks.nth(0)).toHaveAttribute("href", "/tools/pet-size-calculator");
    await expect(toolLinks.nth(1)).toHaveAttribute("href", "/tools/travel-checklist");
    await expect(toolLinks.nth(2)).toHaveAttribute("href", "/tools/pet-cost-calculator");

    for (const pet of ["cats", "both", "dogs"]) {
      const tab = toolsSection.locator(`[data-tab="${pet}"]`);
      await expect(tab).toBeVisible();
      await tab.click();
      await expect(tab).toHaveAttribute("aria-pressed", "true");
    }

    if (viewport.width <= 480) {
      const tabBoxes = await toolsSection.locator(".pet-tab").evaluateAll((elements) =>
        elements.map((element) => {
          const rect = element.getBoundingClientRect();
          return { y: Math.round(rect.y), height: rect.height, width: rect.width };
        }),
      );
      expect(tabBoxes, "All three pet filters should remain visible").toHaveLength(3);
      expect(
        Math.max(...tabBoxes.map((box) => box.y)) - Math.min(...tabBoxes.map((box) => box.y)),
        "Pet filters should stay on one row on narrow mobile screens",
      ).toBeLessThanOrEqual(2);
      for (const box of tabBoxes) {
        expect(box.height, "Pet filter buttons should remain easy to tap").toBeGreaterThanOrEqual(38);
        expect(box.width, "Pet filter buttons should have usable width").toBeGreaterThanOrEqual(68);
      }
    }

    // Catch real horizontal page overflow and report the widest document dimension.
    const dimensions = await page.evaluate(() => ({
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    }));
    expect(
      dimensions.documentWidth,
      `Horizontal overflow at ${viewport.width}px: document=${dimensions.documentWidth}px, viewport=${dimensions.viewportWidth}px`,
    ).toBeLessThanOrEqual(dimensions.viewportWidth + 1);

    expect(pageErrors, `Browser runtime errors: ${pageErrors.join(" | ")}`).toEqual([]);
  });
}

/* STAGE_1_2_LAYOUT_ACCESSIBILITY_REGRESSION */
test("responsive navigation and page width remain stable across intermediate and wide viewports", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Better days with dogs and cats." })).toBeVisible();

  const widths = [1920, 1440, 1280, 1024, 900, 820, 768, 767, 760, 720, 680, 640, 600, 480, 390, 360, 320];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole("heading", { name: "Better days with dogs and cats." })).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    }));

    expect(
      dimensions.document,
      `Horizontal overflow at ${width}px: document=${dimensions.document}px, viewport=${dimensions.viewport}px`,
    ).toBeLessThanOrEqual(dimensions.viewport + 1);

    if (width <= 760) {
      await expect(page.locator(".desktop-nav")).toBeHidden();
      await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeVisible();
    } else {
      await expect(page.locator(".desktop-nav")).toBeVisible();
      await expect(page.locator(".mobile-menu")).toBeHidden();
    }
  }
});

test("desktop content rails and action baselines are aligned", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Better days with dogs and cats." })).toBeVisible();

  const headerBrand = await page.locator("header.site-header .brand").first().boundingBox();
  const footerBrand = await page.locator(".site-footer .footer-brand").first().boundingBox();
  const guides = await page.locator('section[aria-labelledby="latest-guides-title"] > div[class*="inner"]').boundingBox();
  const tools = await page.locator(".tools-inner").boundingBox();

  expect(headerBrand, "Header brand should have a measurable position").not.toBeNull();
  expect(footerBrand, "Footer brand should have a measurable position").not.toBeNull();
  expect(guides, "Latest Guides should have a measurable content rail").not.toBeNull();
  expect(tools, "Tools should have a measurable content rail").not.toBeNull();

  expect(Math.abs(headerBrand!.x - footerBrand!.x), "Footer should align with the header content rail").toBeLessThanOrEqual(8);
  expect(Math.abs(guides!.x - tools!.x), "Tools should align with Latest Guides").toBeLessThanOrEqual(8);
  expect(Math.abs(guides!.width - tools!.width), "Tools and Latest Guides should share the same maximum width").toBeLessThanOrEqual(8);

  const dogAction = await page.locator("#dogs .world-link").boundingBox();
  const catAction = await page.locator("#cats .world-link").boundingBox();
  expect(dogAction).not.toBeNull();
  expect(catAction).not.toBeNull();
  // The reference intentionally uses independent copy blocks; the differing line wraps
  // allow a small baseline delta without indicating a layout regression.
  expect(Math.abs(dogAction!.y - catAction!.y), "Dog and Cat hero actions should retain the reference spacing").toBeLessThanOrEqual(18);

  const toolActions = await page.locator("#tools .tool-card-action").evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { y: rect.y, height: rect.height };
    }),
  );
  expect(toolActions).toHaveLength(3);
  expect(
    Math.max(...toolActions.map((item) => item.y)) - Math.min(...toolActions.map((item) => item.y)),
    "Tool actions should align at the bottom of their cards",
  ).toBeLessThanOrEqual(10);
});

test("mobile navigation supports backdrop, Escape, scroll lock and accessible CTA", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu", exact: true });

  await trigger.click();
  await expect(page.getByRole("button", { name: "Close", exact: true })).toHaveAttribute("aria-expanded", "true");

  const backdrop = page.getByRole("button", { name: "Close navigation menu" });
  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });

  await expect(backdrop).toBeVisible();
  await expect(dialog).toBeVisible();
  await expect(navigation).toBeVisible();
  await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  const cta = navigation.getByRole("link", { name: /Explore Guides/ });
  await expect(cta).toBeVisible();
  const ctaBox = await cta.boundingBox();
  expect(ctaBox).not.toBeNull();
  expect(ctaBox!.height).toBeGreaterThanOrEqual(44);

  for (const label of ["Dogs", "Cats", "Journal", "Tools"]) {
    const link = navigation.getByRole("link", { name: label, exact: true });
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");

  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.getByRole("button", { name: "Close navigation menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCount(0);
});

test("mobile text and links remain usable at a 200-percent-zoom equivalent viewport", async ({ page }) => {
  // A 1440px desktop viewport at 200% browser zoom exposes roughly 720 CSS pixels.
  await page.setViewportSize({ width: 720, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Better days with dogs and cats." })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
  }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport + 1);

  const firstCta = page.locator(".world-link").first();
  await firstCta.focus();
  await expect(firstCta).toBeFocused();
  await firstCta.hover();
  await expect(firstCta).toBeVisible();
});
