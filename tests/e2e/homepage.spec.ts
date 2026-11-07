import { expect, test } from "@playwright/test";

test("homepage presents the content-first BuddyDays experience", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("link", { name: "BuddyDays home" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Better days with dogs and cats." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "More good days with your dog." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A little more purr in every day." })).toBeVisible();

  await expect(page.getByRole("link", { name: /Explore the Journal/i })).toBeVisible();
  await expect(page.locator('section[aria-labelledby="latest-guides-title"] article').first()).toBeVisible();
  await expect(page.getByRole("searchbox", { name: "Search articles, topics or questions" })).toHaveCount(0);

  await expect(page.getByRole("heading", { name: "A little help for every pet parent." })).toBeVisible();
  await expect(page.locator("#tools .tool-card")).toHaveCount(3);
  await expect(page.locator("#tools .tool-card-action")).toHaveCount(3);
  await expect(page.getByText("A concept homepage.")).toHaveCount(0);
  await expect(page.getByText("In development", { exact: true })).toHaveCount(0);

  const desktopNavigation = page.getByRole("navigation", { name: "Main navigation" });
  for (const label of ["Dogs", "Cats", "Journal", "Tools"]) {
    await expect(desktopNavigation.getByRole("link", { name: label, exact: true })).toBeVisible();
  }
});


test("Journal search filters dog and cat topics", async ({ page }) => {
  await page.goto("/blog");

  await expect(page.getByRole("heading", { name: "The BuddyDays Journal" })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search articles, topics or questions" }).fill("carrier");
  await expect(page.getByRole("heading", { name: "Making a Cat Carrier Feel More Familiar" })).toBeVisible();
  await expect(page.getByText("Showing 1–1 of 1 article")).toBeVisible();
});


test("Journal page paginates the editorial library", async ({ page }) => {
  await page.goto("/blog");

  await expect(page.getByRole("heading", { name: "The BuddyDays Journal" })).toBeVisible();
  await expect(page.getByText("Showing 1–12 of 18 articles")).toBeVisible();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByText("Showing 13–18 of 18 articles")).toBeVisible();
});


test("mobile menu exposes the current site navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Menu", exact: true });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Close", exact: true })).toHaveAttribute("aria-expanded", "true");

  const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
  for (const label of ["Dogs", "Cats", "Journal", "Tools"]) {
    await expect(mobileNavigation.getByRole("link", { name: label, exact: true })).toBeVisible();
  }
  await expect(mobileNavigation.getByRole("link", { name: /Explore Guides/ })).toBeVisible();

  await page.getByRole("button", { name: "Close", exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
});

/* STAGE_1_2_LAYOUT_ACCESSIBILITY_REGRESSION: keyboard dismissal and scroll restoration */
test("mobile navigation closes on Escape and restores page scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.goto("/");

  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
  await expect(page.locator("html")).toHaveCSS("overflow", "hidden");

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
});
