import { expect, test } from "@playwright/test";

test.describe("Home Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4000/");
    await page.waitForLoadState("domcontentloaded");
  });

  //  Test: Navbar should be visible
  test("should display the navbar", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
  });

  //  Test: Footer should be visible
  test("should display the footer", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
