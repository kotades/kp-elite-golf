import { test, expect } from '@playwright/test';

const mobileViewport = { width: 375, height: 667 };

test.describe('Mobile Responsiveness & Visual Layout Suite', () => {
  test.use({ viewport: mobileViewport });

  test('Marketing Home page renders without horizontal scroll overflow on mobile', async ({ page }) => {
    await page.goto('http://localhost:4004/');
    await page.waitForLoadState('domcontentloaded');

    // Verify header hamburger menu exists and toggles drawer
    const hamburger = page.locator('button[aria-label="Toggle Navigation"]');
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    // Verify mobile menu items
    const mobileDrawer = page.locator('div.lg\\:hidden');
    await expect(mobileDrawer.getByText('Curriculum')).toBeVisible();
    await expect(mobileDrawer.getByText('Coaches')).toBeVisible();
    await expect(mobileDrawer.getByText('Pricing')).toBeVisible();

    // Check no body horizontal scroll overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(windowWidth + 2);
  });

  test('Coaches page renders distinct coach card images', async ({ page }) => {
    await page.goto('http://localhost:4004/coaches');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByText('Kevin Palmer').first()).toBeVisible();
    await expect(page.getByText('Elena Rostova').first()).toBeVisible();
    await expect(page.getByText('Marcus Sterling').first()).toBeVisible();
  });
});
