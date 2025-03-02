import { test, expect } from "@playwright/test";

test.describe("Forgot Password Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4000/forgot-password"); // ✅ Update with your app URL
  });

  test("should display forgot password form correctly", async ({ page }) => {
    await expect(page.locator("h2")).toHaveText("Forgot Your Password? 🔒");
    await expect(page.locator("input[name='email']")).toBeVisible();
    await expect(page.locator("button[type='submit']")).toHaveText(
      "Send Reset Link"
    );
  });


  test("should allow user to enter email and submit", async ({ page }) => {
    await page.fill("input[name='email']", "test@example.com");
    await page.click("button[type='submit']");

    await expect(page.locator("button[type='submit']")).toHaveText(
      "Sending..."
    );
  });

  test("should show error toast when API request fails", async ({ page }) => {
    await page.route("**/api/auth/forgot-password", (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: "Error sending reset email. Try again!" }),
      });
    });

    await page.fill("input[name='email']", "fail@example.com");
    await page.click("button[type='submit']");

    await expect(page.locator(".Toastify__toast--error")).toHaveText(
      "Error sending reset email. Try again!"
    );
  });

  test("should show success toast when reset link is sent", async ({ page }) => {
    await page.route("**/api/auth/forgot-password", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ message: "Reset link sent to your email" }),
      });
    });

    await page.fill("input[name='email']", "success@example.com");
    await page.click("button[type='submit']");

    await expect(page.locator(".Toastify__toast--success")).toHaveText(
      "Reset link sent to your email"
    );
  });

  test("should navigate back to login page", async ({ page }) => {
    await page.click("text=Back to Login");
    await expect(page).toHaveURL("http://localhost:4000/login"); // ✅ Update the login URL
  });
});
