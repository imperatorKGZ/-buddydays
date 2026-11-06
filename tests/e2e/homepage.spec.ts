import { expect, test } from "@playwright/test";

test("homepage matches the BuddyDays dog and cat reference", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /BuddyDays home/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "More good days with your dog." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A little more purr in every day." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore the blog/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A little help for every pet parent." })).toHaveCount(0);
  await expect(page.getByText("A concept homepage.")).toHaveCount(0);
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Tools" })).toHaveCount(0);

  await expect(page.getByRole("heading", { name: "A little more purr in every day." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore Cat World/i })).toBeVisible();
});


test("homepage blog filters articles across dog and cat topics", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Good reads for better days." })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search articles, topics or questions" }).fill("carrier");
  await expect(page.getByRole("heading", { name: "Making a Cat Carrier Feel More Familiar" })).toBeVisible();
  await expect(page.getByText("Showing 1–1 of 1 article")).toBeVisible();
});

test("blog page paginates the editorial library", async ({ page }) => {
  await page.goto("/blog");

  await expect(page.getByRole("heading", { name: "The BuddyDays Journal" })).toBeVisible();
  await expect(page.getByText("Showing 1–12 of 18 articles")).toBeVisible();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByText("Showing 13–18 of 18 articles")).toBeVisible();
});


test("mobile menu exposes the main editorial navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Menu" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();

  const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNavigation.getByRole("link", { name: "For dogs" })).toBeVisible();
  await expect(mobileNavigation.getByRole("link", { name: "For cats" })).toBeVisible();
  await expect(mobileNavigation.getByRole("link", { name: "Blog" })).toBeVisible();
  await expect(mobileNavigation.getByRole("link", { name: "Tools" })).toHaveCount(0);
});