import { expect, test } from "@playwright/test";

test.describe("Register Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4000/register"); 
    await page.waitForLoadState("domcontentloaded"); 
  });

  //  Test: Check if the registration page loads correctly
  test("should load the registration page", async ({ page }) => {
    await expect(page.locator("text=Create Your Account 🎥")).toBeVisible(); // Check heading
  });


  //  Test: Handle mismatched passwords
  test("should display error for mismatched passwords", async ({ page }) => {
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="email"]', "manishashah.8981@gmail.com");
    await page.fill('input[name="contact_no"]', "1234567890");
    await page.fill('input[name="password"]', "Password123!");
    await page.fill('input[name="confirmPassword"]', "DifferentPassword!");

    await page.click('button:has-text("Sign Up")');
    await expect(page.locator("text=Passwords do not match!")).toBeVisible();
  });

  //  Test: Handle weak password (less than 8 characters)
  test("should display error for weak password", async ({ page }) => {
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="email"]', "manishashah.8981@gmail.com");
    await page.fill('input[name="contact_no"]', "1234567890");
    await page.fill('input[name="password"]', "short");
    await page.fill('input[name="confirmPassword"]', "short");

    await page.click('button:has-text("Sign Up")');
    await expect(
      page.locator("text=Password must be at least 8 characters!")
    ).toBeVisible();
  });

  //  Test: Successful registration
  test("should register successfully and redirect to login", async ({
    page,
  }) => {
    await page.fill('input[name="username"]', "manisha");
    await page.fill('input[name="email"]', "manishashah.8981@gmail.com");
    await page.fill('input[name="contact_no"]', "9834567898");
    await page.fill('input[name="password"]', "SecurePassword1!");
    await page.fill('input[name="confirmPassword"]', "SecurePassword1!");

    await page.click('button:has-text("Sign Up")');

    // Wait for the success message
    await expect(
      page.locator("text=Registration successful! Redirecting to login...")
    ).toBeVisible();

    //  Verify redirection to login page
    await page.waitForURL(/\/Login/i);
  });

  //  Test: Navigate to login page via "Sign in" button
  test("should navigate to login page", async ({ page }) => {
    await page.click("text=Sign in");
    await expect(page).toHaveURL(/\/Login/i);
  });
});
