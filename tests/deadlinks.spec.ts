import { test, expect } from "@playwright/test";

test.describe("KP Elite Golf Training - Deadlink Crawler & 404 Route Verification", () => {
  const targetRoutes = [
    "/",
    "/courses",
    "/pricing",
    "/coaches",
    "/about",
    "/contact",
    "/gallery",
    "/courses/apply",
    "/privacy",
    "/terms",
    "/dashboard",
    "/coach",
    "/my-journey",
    "/subscription",
    "/search",
  ];

  test("1. Crawl all 15 top-level routes and verify HTTP 200 response and DOM rendering", async ({
    page,
  }) => {
    for (const route of targetRoutes) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response, `Route ${route} should return a response`).not.toBeNull();
      expect(
        response?.status(),
        `Route ${route} returned status ${response?.status()} instead of 200`
      ).toBe(200);

      // Verify that page content rendered without uncaught crash
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("2. Visit non-existent route '/random-lost-hole-404' and verify Custom 404 page", async ({
    page,
  }) => {
    const response = await page.goto("/random-lost-hole-404", { waitUntil: "domcontentloaded" });
    // Next.js 404 responses return 404 status
    expect(response?.status()).toBe(404);

    // Verify luxury 404 Golf Out of Bounds headline & badge
    await expect(page.getByText(/Out of Bounds/i)).toBeVisible();
    await expect(page.getByText(/Shot Lost in the Rough/i)).toBeVisible();
    await expect(page.getByText(/Penalty: 0 Strokes • Ruling: Free Drop/i)).toBeVisible();

    // Verify recovery buttons
    const homeBtn = page.getByRole("button", { name: /Return to Clubhouse/i });
    await expect(homeBtn).toBeVisible();

    const curriculumBtn = page.getByRole("button", { name: /Browse Curriculum/i });
    await expect(curriculumBtn).toBeVisible();

    const dashboardBtn = page.getByRole("button", { name: /Go to Student Dashboard/i });
    await expect(dashboardBtn).toBeVisible();

    const coachBtn = page.getByRole("button", { name: /Launch AI Voice Coach/i });
    await expect(coachBtn).toBeVisible();

    // Click Home recovery button and verify navigation to Clubhouse
    await page.getByRole("link", { name: /Return to Clubhouse/i }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Master Your Swing");
  });

  test("3. Extract and crawl all <a> tags on Home, Courses, and Dashboard pages for zero 404s", async ({
    page,
  }) => {
    const pagesToCrawl = ["/", "/courses", "/dashboard"];
    const visitedUrls = new Set<string>();

    for (const startPage of pagesToCrawl) {
      await page.goto(startPage, { waitUntil: "domcontentloaded" });

      // Find all href attributes
      const hrefs = await page.$$eval("a[href]", (anchors) =>
        anchors
          .map((a) => a.getAttribute("href"))
          .filter((href): href is string => !!href && !href.startsWith("mailto:") && !href.startsWith("tel:") && !href.startsWith("#") && !href.startsWith("javascript:"))
      );

      for (const href of hrefs) {
        // Resolve path relative or absolute
        const cleanPath = href.startsWith("http")
          ? new URL(href).pathname
          : href.split("?")[0].split("#")[0];

        if (!cleanPath || visitedUrls.has(cleanPath)) continue;
        visitedUrls.add(cleanPath);

        const resp = await page.goto(cleanPath, { waitUntil: "domcontentloaded" });
        expect(
          resp?.status(),
          `Link ${cleanPath} from page ${startPage} returned ${resp?.status()}`
        ).toBeLessThan(400);
      }
    }
  });
});
