import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const viewports = [320, 390, 480, 600, 768, 900, 1024, 1280, 1440, 1920] as const;
const screenshotDirectory = path.resolve(process.cwd(), "test-results", "visual-audit");
const homepageHeading = "Better days with dogs and cats.";

for (const width of viewports) {
  test(`BuddyDays visual audit at ${width}px`, async ({ page }) => {
    test.setTimeout(90_000);

    const runtimeErrors: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(message.text());
    });

    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });

    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response, "Homepage navigation should return a response").not.toBeNull();
    expect(response!.status(), "Homepage should return HTTP 200").toBe(200);

    await expect(page.getByRole("heading", { name: homepageHeading, exact: true })).toBeVisible();
    await expect(page.locator("#dogs")).toBeVisible();
    await expect(page.locator("#cats")).toBeVisible();
    await expect(page.locator("#tools")).toBeVisible();
    await expect(page.locator('section[aria-labelledby="latest-guides-title"]')).toBeVisible();
    await expect(page.locator("footer.site-footer")).toBeVisible();

    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
    });

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    }));
    expect(
      dimensions.document,
      `Horizontal overflow at ${width}px: document=${dimensions.document}px, viewport=${dimensions.viewport}px`,
    ).toBeLessThanOrEqual(dimensions.viewport + 1);

    // Compare the real content rails rather than padded outer section boxes.
    const rails = await page.evaluate(() => {
      const selectors = {
        header: "header.site-header .brand",
        hero: ".worldGrid",
        guides: 'section[aria-labelledby="latest-guides-title"] .inner',
        tools: ".tools-inner",
        footer: ".site-footer .footer-brand",
      } as const;

      return Object.fromEntries(
        Object.entries(selectors).map(([name, selector]) => {
          const element = document.querySelector<HTMLElement>(selector);
          if (!element) return [name, null];
          const rect = element.getBoundingClientRect();
          return [name, { x: rect.x, width: rect.width }];
        }),
      ) as Record<string, { x: number; width: number } | null>;
    });

    for (const name of ["header", "hero", "guides", "tools", "footer"] as const) {
      expect(rails[name], `${name} content rail should be measurable`).not.toBeNull();
    }

    const railValues = Object.values(rails).filter(
      (value): value is { x: number; width: number } => value !== null,
    );
    const leftEdges = railValues.map((value) => value.x);
    expect(
      Math.max(...leftEdges) - Math.min(...leftEdges),
      `Header, Hero, Guides, Tools and Footer should share a content rail at ${width}px`,
    ).toBeLessThanOrEqual(8);

    const guideRail = rails.guides!;
    const toolsRail = rails.tools!;
    expect(
      Math.abs(guideRail.width - toolsRail.width),
      `Guides and Tools content widths should agree at ${width}px`,
    ).toBeLessThanOrEqual(8);

    const dog = await page.locator("#dogs").boundingBox();
    const cat = await page.locator("#cats").boundingBox();
    expect(dog, "Dog World should have a measurable box").not.toBeNull();
    expect(cat, "Cat World should have a measurable box").not.toBeNull();

    if (width > 820) {
      expect(
        Math.abs(dog!.y - cat!.y),
        "Dog and Cat cards should be side by side above the 820px breakpoint",
      ).toBeLessThanOrEqual(2);
    } else {
      expect(cat!.y, "Cat World should stack below Dog World at 820px and below").toBeGreaterThan(dog!.y);
    }

    for (const worldId of ["dogs", "cats"]) {
      const world = page.locator(`#${worldId}`);
      const card = await world.boundingBox();
      const copy = await world.locator(".world-copy").boundingBox();
      expect(card, `${worldId} card should have a measurable box`).not.toBeNull();
      expect(copy, `${worldId} copy should have a measurable box`).not.toBeNull();
      expect(
        copy!.x - card!.x,
        `${worldId} text should not be flush against the card edge`,
      ).toBeGreaterThanOrEqual(8);
      expect(
        card!.x + card!.width - (copy!.x + copy!.width),
        `${worldId} copy should preserve a right-side inset`,
      ).toBeGreaterThanOrEqual(8);

      if (width <= 560) {
        const artwork = await world.locator(".art-wrap").boundingBox();
        expect(artwork, `${worldId} artwork should have a measurable box`).not.toBeNull();
        expect(
          artwork!.y + artwork!.height,
          `${worldId} mobile artwork should appear above its text`,
        ).toBeLessThanOrEqual(copy!.y + 2);
      }
    }

    // Capture every requested viewport as an actual full-page browser screenshot.
    await mkdir(screenshotDirectory, { recursive: true });
    await page.screenshot({
      path: path.join(screenshotDirectory, `homepage-${width}.png`),
      fullPage: true,
      animations: "disabled",
    });

    const menuToggle = page.locator(".menu-toggle");
    if (width <= 760) {
      await expect(page.locator(".desktop-nav")).toBeHidden();
      await expect(menuToggle).toBeVisible();
      await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
      expect(await menuToggle.getAttribute("aria-controls")).toBeNull();

      await menuToggle.click();
      const dialog = page.getByRole("dialog", { name: "Site navigation" });
      const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
      await expect(dialog).toBeVisible();
      await expect(navigation).toBeVisible();
      await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
      await expect(menuToggle).toHaveAttribute("aria-controls", "mobile-navigation");
      await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
      await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

      for (const label of ["Dogs", "Cats", "Journal", "Tools"]) {
        const link = navigation.getByRole("link", { name: label, exact: true });
        await expect(link).toBeVisible();
        const box = await link.boundingBox();
        expect(box, `${label} menu link should have a measurable touch target`).not.toBeNull();
        expect(box!.height, `${label} menu link should be at least 44px high`).toBeGreaterThanOrEqual(44);
      }

      await page.screenshot({
        path: path.join(screenshotDirectory, `mobile-menu-${width}.png`),
        fullPage: false,
        animations: "disabled",
      });

      const menuLinks = navigation.getByRole("link");
      await menuLinks.first().focus();
      await page.keyboard.press("Shift+Tab");
      await expect(menuLinks.last()).toBeFocused();
      await page.keyboard.press("Tab");
      await expect(menuLinks.first()).toBeFocused();

      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
      expect(await menuToggle.getAttribute("aria-controls")).toBeNull();
      await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
      await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
      await expect(menuToggle).toBeFocused();

      await menuToggle.click();
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCount(0);
      await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
    } else {
      await expect(page.locator(".desktop-nav")).toBeVisible();
      await expect(page.locator(".mobile-menu")).toBeHidden();
    }

    expect(runtimeErrors, `Browser runtime errors at ${width}px: ${runtimeErrors.join(" | ")}`).toEqual([]);
  });
}

test("mobile navigation closes after selecting a route", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await navigation.getByRole("link", { name: "Dogs", exact: true }).click();

  await expect(page).toHaveURL(/\/dogs$/);
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
});
