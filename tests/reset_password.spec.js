import { expect, test } from "@playwright/test";

test.describe("Reset Password Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4000/reset-password/sampleToken");
  });

  test("should display reset password form correctly", async ({ page }) => {
    await expect(page.locator("h2")).toHaveText("Reset Your Password 🔑");
    await expect(page.locator("input[name='password']")).toBeVisible();
    await expect(page.locator("input[name='confirmPassword']")).toBeVisible();
    await expect(page.locator("button[type='submit']")).toHaveText(
      "Reset Password"
    );
  });

  test("should show validation error for short password", async ({ page }) => {
    await page.fill("input[name='password']", "123");
    await page.fill("input[name='confirmPassword']", "123");
    await page.click("button[type='submit']");
    await expect(page.locator(".Toastify__toast--error")).toHaveText(
      "Password must be at least 6 characters"
    );
  });

  test("should show validation error when passwords do not match", async ({
    page,
  }) => {
    await page.fill("input[name='password']", "password123");
    await page.fill("input[name='confirmPassword']", "password321");
    await page.click("button[type='submit']");
    await expect(page.locator(".Toastify__toast--error")).toHaveText(
      "Passwords do not match!"
    );
  });

  test("should show error toast when API request fails", async ({ page }) => {
    await page.route("**/api/auth/reset-password/sampleToken", (route) => {
      route.fulfill({
        status: 400,
        body: JSON.stringify({ message: "Invalid or expired token" }),
      });
    });

    await page.fill("input[name='password']", "password123");
    await page.fill("input[name='confirmPassword']", "password123");
    await page.click("button[type='submit']");

    await expect(page.locator(".Toastify__toast--error")).toHaveText(
      "Invalid or expired token"
    );
  });

  test("should show success toast when password reset is successful", async ({
    page,
  }) => {
    await page.route("**/api/auth/reset-password/sampleToken", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ message: "Password reset successful!" }),
      });
    });

    await page.fill("input[name='password']", "newpassword123");
    await page.fill("input[name='confirmPassword']", "newpassword123");
    await page.click("button[type='submit']");

    await expect(page.locator(".Toastify__toast--success")).toHaveText(
      "Password reset successful!"
    );
  });

  test("should navigate back to login page", async ({ page }) => {
    await page.click("text=Back to Login");
    await expect(page).toHaveURL("http://localhost:4000/login");
  });
});
