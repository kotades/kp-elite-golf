import { test, expect } from "@playwright/test";

test.describe("Header Navigation Suite - Desktop (1280x800)", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("Desktop: Brand Logo navigates to Home from another route", async ({ page }) => {
    await page.goto("/courses", { waitUntil: "domcontentloaded" });
    const brandLink = page.locator("header a[href='/']").first();
    await expect(brandLink).toBeVisible();
    await brandLink.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("h1")).toContainText("Master Your Swing");
  });

  test("Desktop: Curriculum navigates to /courses", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const link = page.locator("header nav a[href='/courses']");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/courses$/);
    await expect(page.locator("h1")).toContainText("Golf Modules");
  });

  test("Desktop: Coaches navigates to /coaches", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const link = page.locator("header nav a[href='/coaches']");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/coaches$/);
    await expect(page.locator("h1")).toContainText("The Kinematic Swing");
  });

  test("Desktop: Biomechanics navigates to /about", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const link = page.locator("header nav a[href='/about']");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator("h1")).toContainText("3D Biomechanics");
  });

  test("Desktop: Gallery navigates to /gallery", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const link = page.locator("header nav a[href='/gallery']");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/gallery$/);
    await expect(page.locator("h1")).toContainText("Facility Gallery");
  });

  test("Desktop: Pricing navigates to /pricing", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const link = page.locator("header nav a[href='/pricing']");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(page.locator("h1")).toContainText("World-Class Performance");
  });

  test("Desktop: Intake Portal navigates to /courses/apply", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const link = page.locator("header nav a[href='/courses/apply']");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/courses\/apply$/);
    await expect(page.locator("h1")).toContainText("New Student Intake");
  });

  test("Desktop: CTA 'Apply for Academy' button navigates to /courses/apply", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const applyBtn = page.locator("header").getByRole("button", { name: /Apply for Academy/i });
    await expect(applyBtn).toBeVisible();
    await applyBtn.click();
    await expect(page).toHaveURL(/\/courses\/apply$/);
    await expect(page.locator("h1")).toContainText("New Student Intake");
  });
});

test.describe("Header Navigation Suite - Mobile (375x667)", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("Mobile: Hamburger menu opens and closes via toggle button", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const toggleBtn = page.getByRole("button", { name: /Toggle Navigation/i });
    await expect(toggleBtn).toBeVisible();

    // Open menu
    await toggleBtn.click();
    const curriculumLink = page.locator("header .lg\\:hidden a[href='/courses']");
    await expect(curriculumLink).toBeVisible();

    // Close menu
    await toggleBtn.click();
    await expect(curriculumLink).not.toBeVisible();
  });

  test("Mobile: Curriculum link navigates and closes menu", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Toggle Navigation/i }).click();
    const link = page.locator("header .lg\\:hidden a[href='/courses']");
    await expect(link).toBeVisible();
    await link.click();

    await expect(page).toHaveURL(/\/courses$/);
    await expect(page.locator("h1")).toContainText("Golf Modules");
    await expect(page.locator("header .lg\\:hidden a[href='/courses']")).not.toBeVisible();
  });

  test("Mobile: Coaches link navigates and closes menu", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Toggle Navigation/i }).click();
    const link = page.locator("header .lg\\:hidden a[href='/coaches']");
    await expect(link).toBeVisible();
    await link.click();

    await expect(page).toHaveURL(/\/coaches$/);
    await expect(page.locator("h1")).toContainText("The Kinematic Swing");
    await expect(page.locator("header .lg\\:hidden a[href='/coaches']")).not.toBeVisible();
  });

  test("Mobile: Biomechanics link navigates and closes menu", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Toggle Navigation/i }).click();
    const link = page.locator("header .lg\\:hidden a[href='/about']");
    await expect(link).toBeVisible();
    await link.click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator("h1")).toContainText("3D Biomechanics");
    await expect(page.locator("header .lg\\:hidden a[href='/about']")).not.toBeVisible();
  });

  test("Mobile: Gallery link navigates and closes menu", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Toggle Navigation/i }).click();
    const link = page.locator("header .lg\\:hidden a[href='/gallery']");
    await expect(link).toBeVisible();
    await link.click();

    await expect(page).toHaveURL(/\/gallery$/);
    await expect(page.locator("h1")).toContainText("Facility Gallery");
    await expect(page.locator("header .lg\\:hidden a[href='/gallery']")).not.toBeVisible();
  });

  test("Mobile: Pricing link navigates and closes menu", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Toggle Navigation/i }).click();
    const link = page.locator("header .lg\\:hidden a[href='/pricing']");
    await expect(link).toBeVisible();
    await link.click();

    await expect(page).toHaveURL(/\/pricing$/);
    await expect(page.locator("h1")).toContainText("World-Class Performance");
    await expect(page.locator("header .lg\\:hidden a[href='/pricing']")).not.toBeVisible();
  });

  test("Mobile: Intake Portal link navigates and closes menu", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Toggle Navigation/i }).click();
    const link = page.locator("header .lg\\:hidden a[href='/courses/apply']").first();
    await expect(link).toBeVisible();
    await link.click();

    await expect(page).toHaveURL(/\/courses\/apply$/);
    await expect(page.locator("h1")).toContainText("New Student Intake");
    await expect(page.locator("header .lg\\:hidden a[href='/courses/apply']").first()).not.toBeVisible();
  });

  test("Mobile: Apply for Foundation Program button navigates and closes menu", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /Toggle Navigation/i }).click();
    const applyBtn = page.locator("header .lg\\:hidden").getByRole("button", { name: /Apply for Foundation Program/i });
    await expect(applyBtn).toBeVisible();
    await applyBtn.click();

    await expect(page).toHaveURL(/\/courses\/apply$/);
    await expect(page.locator("h1")).toContainText("New Student Intake");
    await expect(page.locator("header .lg\\:hidden").getByRole("button", { name: /Apply for Foundation Program/i })).not.toBeVisible();
  });
});
