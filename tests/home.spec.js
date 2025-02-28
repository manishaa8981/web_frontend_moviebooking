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

  //  Test: Verify navigation to login page
  test("should navigate to login page", async ({ page }) => {
    await page.click("text=Login"); // Click the login link
    await expect(page).toHaveURL("http://localhost:4000/Login");
  });
});
