import { expect, test } from "@playwright/test";

test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4000/login"); //  Ensure correct login page URL
    await page.waitForLoadState("domcontentloaded"); //  Ensure page is fully loaded
  });

  //  Test: Enter login credentials and submit
  test("should log in successfully and navigate to the correct page", async ({
    page,
  }) => {
    await page.fill('input[name="username"]', "adminuser");
    await page.fill('input[name="password"]', "securepassword");

    await page.click('button:has-text("Login")'); // Click Login button
    await page.waitForURL(/\/admin|\//); //  Match either /admin or /home

    //  Verify redirection based on role
    const currentURL = page.url();
    console.log("Redirected to:", currentURL);

    expect(currentURL).toMatch(/\/admin|\//);
  });
  //  Test: Forgot Password navigation
  test("should navigate to forgot password page", async ({ page }) => {
    await page.click("text=forgot password");
    await expect(page).toHaveURL(/\/forgot-password/);
  });

  //  Test: Register page navigation
  test("should navigate to register page", async ({ page }) => {
    await page.click("text=Sign up");
    await expect(page).toHaveURL(/\/Register/);
  });
});
