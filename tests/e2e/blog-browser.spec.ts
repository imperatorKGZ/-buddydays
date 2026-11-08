import { expect, test } from "@playwright/test";

test("blog filters compose in URL and browser history", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "The BuddyDays Journal" })).toBeVisible();
  await page.getByRole("button", { name: "Dogs", exact: true }).click();
  await expect(page).toHaveURL(/species=dogs/);
  await page.getByRole("button", { name: "Care" }).first().click();
  await expect(page).toHaveURL(/category=care/);
  await page.getByRole("combobox", { name: "Sort articles" }).selectOption("az");
  await expect(page).toHaveURL(/sort=az/);
  await page.getByRole("searchbox", { name: "Search articles, topics or questions" }).fill("dog");
  await expect(page).toHaveURL(/q=dog/);
  await page.goBack();
  await expect(page).toHaveURL(/sort=az/);
  await expect(page).not.toHaveURL(/q=dog/);
});
