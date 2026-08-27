import { test, expect } from "@playwright/test";

test.describe("KP Elite Golf Training - Comprehensive End-to-End Test Suite", () => {

  test.describe("1. Storefront Marketing (/(marketing))", () => {
    test("Home page '/' renders frosted header, hero section, trust ticker, bento grid, coach carousel, course teaser, pricing, and FAQ", async ({
      page,
    }) => {
      await page.goto("/");

      // 1. Verify Header & Navigation links
      const header = page.locator("header");
      await expect(header).toBeVisible();
      await expect(header.getByText("KP ELITE")).toBeVisible();
      await expect(header.getByText("PGA")).toBeVisible();
      await expect(header.getByRole("link", { name: "Curriculum" })).toBeVisible();
      await expect(header.getByRole("link", { name: "Gallery" })).toBeVisible();

      // 2. Verify Hero Section Headline & Action CTAs
      const heroHeadline = page.getByRole("heading", { level: 1 });
      await expect(heroHeadline).toContainText("Master Your Swing");
      await expect(heroHeadline).toContainText("Lower Your Handicap");

      const startTrialBtn = page.getByRole("button", { name: /Start Free Trial/i });
      await expect(startTrialBtn).toBeVisible();

      const watchTrailerBtn = page.getByRole("button", { name: /Watch Academy Trailer/i });
      await expect(watchTrailerBtn).toBeVisible();

      // 3. Verify Trust Ticker / Marquee
      await expect(page.getByText("TRACKMAN").first()).toBeVisible();

      // 4. Verify Bento Box 4-Card Features
      await expect(page.getByText("Biomechanical Video Diagnostics")).toBeVisible();
      await expect(page.getByText("24/7 AI Voice Range Coach").first()).toBeVisible();
      await expect(page.getByText("Structured Student Milestones")).toBeVisible();
      await expect(page.getByText("Range Companion App")).toBeVisible();

      // 5. Verify Coach Faculty Carousel
      const coachesSection = page.locator("#coaches");
      await expect(coachesSection).toBeVisible();
      await expect(page.getByText("Kevin Palmer").first()).toBeVisible();
      await expect(page.getByText("Elena Rostova").first()).toBeVisible();

      // 6. Verify Course Teaser Strip
      await expect(page.getByText("Curated Core Golf Modules")).toBeVisible();
      await expect(page.getByText("Golf Basics & Fundamentals").first()).toBeVisible();

      // 7. Verify 3-Tier Pricing Section ($7,200 Foundation program highlighted)
      const pricingSection = page.locator("#pricing");
      await expect(pricingSection).toBeVisible();
      await expect(page.getByText("8-Week Foundation Program").first()).toBeVisible();
      await expect(page.getByText("$7,200").first()).toBeVisible();
      await expect(page.getByText("Practice Library").first()).toBeVisible();
      await expect(page.getByText("VIP Tour Coaching").first()).toBeVisible();

      // 8. Verify FAQ Section & Footer
      const faqSection = page.locator("section").filter({ hasText: /Frequently Asked Questions/i });
      await expect(faqSection).toBeVisible();

      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
      await expect(footer.getByText("KP ELITE GOLF").first()).toBeVisible();
    });

    test("Courses catalog '/courses' renders category filters, search bar, and course cards", async ({
      page,
    }) => {
      await page.goto("/courses");

      // Verify Title & Curriculum Badge
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Explore All");
      await expect(page.getByText("9-Module Championship Curriculum")).toBeVisible();

      // Verify Category Filters
      const catAll = page.getByRole("button", { name: "All" });
      const catFundamentals = page.getByRole("button", { name: "Fundamentals" });
      const catSwing = page.getByRole("button", { name: "Swing Mechanics" });
      const catShortGame = page.getByRole("button", { name: "Short Game & Scrambling" });
      const catStrategy = page.getByRole("button", { name: "Strategy & Mindset" });

      await expect(catAll).toBeVisible();
      await expect(catFundamentals).toBeVisible();
      await expect(catSwing).toBeVisible();
      await expect(catShortGame).toBeVisible();
      await expect(catStrategy).toBeVisible();

      // Test Category Filtering
      await catStrategy.click();
      await expect(page.getByText("Course Strategy & Shot Dispersion").first()).toBeVisible();

      // Reset to All
      await catAll.click();

      // Test Search Input
      const searchInput = page.getByPlaceholder(/Search drills, modules, instructors/i);
      await expect(searchInput).toBeVisible();
      await searchInput.fill("Bunker");
      await expect(page.getByText("Bunker Play & Trouble Recovery").first()).toBeVisible();

      // Clear search
      await searchInput.fill("");
      await expect(page.getByText("Full Swing Biomechanics & Speed").first()).toBeVisible();

      // Verify Course Card View Syllabus link
      const viewSyllabusBtn = page.getByRole("button", { name: /View Syllabus/i }).first();
      await expect(viewSyllabusBtn).toBeVisible();
    });

    test("Course details '/courses/golf-basics' renders syllabus accordion, instructor bio, and sticky checkout sidebar", async ({
      page,
    }) => {
      await page.goto("/courses/golf-basics");

      // Verify Course Title
      const title = page.getByRole("heading", { level: 1 });
      await expect(title).toBeVisible();
      await expect(title).toContainText("Golf Basics & Fundamentals");

      // Verify Learning Outcomes Box
      await expect(page.getByText("What You Will Master in This Module")).toBeVisible();

      // Verify Syllabus Accordion
      await expect(page.getByText("Module Syllabus & Video Lessons")).toBeVisible();
      await expect(page.getByText("The Anatomy of the Course")).toBeVisible();

      // Verify Instructor Credentials
      await expect(page.getByText("Chloe Bennett").first()).toBeVisible();

      // Verify Sticky Enrollment Card
      await expect(page.getByText("Lifetime Module Access")).toBeVisible();
      const applyBtn = page.getByRole("button", { name: /Apply for Foundation Program/i });
      await expect(applyBtn).toBeVisible();
    });

    test("Student application '/courses/apply' renders multi-step intake form and submits successfully", async ({
      page,
    }) => {
      await page.goto("/courses/apply");

      // Verify Header
      await expect(page.getByRole("heading", { level: 1 })).toContainText("New Student Intake");

      // Verify Form Sections
      await expect(page.getByText("01 • Personal Information")).toBeVisible();
      await expect(page.getByText("02 • Golf Background")).toBeVisible();
      await expect(page.getByText("03 • Primary Goals & Challenges")).toBeVisible();
      await expect(page.getByText("04 • Scheduling & Time Preferences")).toBeVisible();

      // Fill in Form
      await page.getByPlaceholder("Jordan Miller").fill("Alex Morgan");
      await page.getByPlaceholder("jordan@example.com").fill("alex.morgan@example.com");
      await page.getByPlaceholder("+1 (555) 234-5678").fill("+1 (555) 987-6543");

      // Select Experience Level
      await page.getByRole("button", { name: "Intermediate" }).first().click();

      // Select Goal
      await page.getByRole("button", { name: "Improve swing mechanics" }).click();

      // Check Terms Checkbox
      const termsCheckbox = page.getByRole("checkbox");
      await termsCheckbox.check();
      await expect(termsCheckbox).toBeChecked();

      // Submit Form
      const submitBtn = page.getByRole("button", { name: /Submit Application & Reserve Intake Slot/i });
      await submitBtn.click();

      // Verify Confirmation Screen
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Application Received!");
      await expect(page.getByText("Alex Morgan")).toBeVisible();
      await expect(page.getByText("8-Week Foundation Program ($7,200)")).toBeVisible();
      await expect(page.getByRole("button", { name: /Go to Student Portal/i })).toBeVisible();
    });

    test("Gallery '/gallery' renders masonry layout and interactive lightbox modal", async ({
      page,
    }) => {
      await page.goto("/gallery");

      // Verify Header
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Facility Gallery");

      // Verify Category Filters
      await expect(page.getByRole("button", { name: "All" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Biomechanics Lab" })).toBeVisible();

      // Click on a gallery image to open lightbox
      const galleryCard = page.locator(".group.relative.aspect-\\[4\\/3\\]").first();
      await expect(galleryCard).toBeVisible();
      await galleryCard.click();

      // Verify Lightbox Modal opened
      const closeBtn = page.getByRole("button", { name: "Close Lightbox" });
      await expect(closeBtn).toBeVisible();

      const nextBtn = page.getByRole("button", { name: "Next image" });
      await expect(nextBtn).toBeVisible();
      await nextBtn.click();

      // Close modal
      await closeBtn.click();
      await expect(closeBtn).not.toBeVisible();
    });
  });

  test.describe("2. Learning Zone (/(student))", () => {
    test("Student Dashboard '/dashboard' renders resume card, radial ring, streak, up next, and swing locker", async ({
      page,
    }) => {
      await page.goto("/dashboard");

      // Verify Daily Tip Banner
      await expect(page.getByText("Daily Tour Technique Cue")).toBeVisible();

      // Verify Resume Learning Card
      await expect(page.getByText("Active Chapter")).toBeVisible();
      await expect(page.getByText("0.25x Slow-Mo Ready")).toBeVisible();
      await expect(page.getByRole("button", { name: /Resume Lesson/i })).toBeVisible();

      // Verify Radial Progress Ring & Stats
      await expect(page.getByText("Course Progress").first()).toBeVisible();
      await expect(page.getByText("3-Day Streak").first()).toBeVisible();
      await expect(page.getByText("Milestone Stage 02")).toBeVisible();

      // Verify Up Next Pathway
      await expect(page.getByText("Up Next in Your Pathway")).toBeVisible();

      // Verify Swing Locker
      await expect(page.getByText("Personal Swing Locker & Telemetry")).toBeVisible();
      await expect(page.getByText("Coach Analyzed").first()).toBeVisible();
      await expect(page.getByRole("button", { name: /Upload New Swing/i })).toBeVisible();
    });

    test("Search '/search' renders CMDK search bar and filters drills/lessons", async ({
      page,
    }) => {
      await page.goto("/search");

      // Verify Header
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Search Lessons, Drills & Biomechanics Cues");

      // Test Search Input
      const searchInput = page.getByPlaceholder(/Search by keyword/i);
      await expect(searchInput).toBeVisible();

      await searchInput.fill("transition");
      await expect(page.getByText("Found").first()).toBeVisible();

      // Clear search
      await searchInput.fill("");

      // Verify results list has links to theater
      await expect(page.getByText("Open Theater").first()).toBeVisible();
    });

    test("Video Theater '/courses/full-swing-mechanics/chapters/m4-c1' renders player, slow-motion controls, frame stepper, swing plane grid, and 3 tabs", async ({
      page,
    }) => {
      await page.goto("/courses/full-swing-mechanics/chapters/m4-c1");

      // Verify Lesson Heading
      const title = page.getByRole("heading", { level: 1 });
      await expect(title).toBeVisible();

      // Verify Slow-Motion Controls (0.25x, 0.5x, 0.75x, 1.0x)
      await expect(page.getByRole("button", { name: /0.25x/i })).toBeVisible();
      await expect(page.getByRole("button", { name: "0.5x" })).toBeVisible();
      await expect(page.getByRole("button", { name: "0.75x" })).toBeVisible();
      await expect(page.getByRole("button", { name: "1x" })).toBeVisible();

      // Click 0.25x speed
      await page.getByRole("button", { name: /0.25x/i }).click();

      // Verify Frame Stepper Buttons
      const stepPrev = page.getByRole("button", { name: /1 Frame/i }).first();
      const stepNext = page.getByRole("button", { name: /1 Frame/i }).nth(1);
      await expect(stepPrev).toBeVisible();
      await expect(stepNext).toBeVisible();
      await stepNext.click();

      // Verify Swing Plane Grid Toggle
      const gridToggle = page.getByRole("button", { name: /Swing Plane Grid/i });
      await expect(gridToggle).toBeVisible();
      await gridToggle.click(); // toggle off
      await gridToggle.click(); // toggle on

      // Verify 3 Tabs: Checkpoints, Drills, AI Coach
      const tabCheckpoints = page.getByRole("tab", { name: /Anatomical Checkpoints/i });
      const tabDrills = page.getByRole("tab", { name: /Prescribed Range Drills/i });
      const tabAICoach = page.getByRole("tab", { name: /AI Coach Guidance/i });

      await expect(tabCheckpoints).toBeVisible();
      await expect(tabDrills).toBeVisible();
      await expect(tabAICoach).toBeVisible();

      // Switch to Drills Tab
      await tabDrills.click();
      await expect(page.getByText("Range Practice Homework")).toBeVisible();
      await expect(page.getByText("Download PDF Blueprint")).toBeVisible();

      // Switch to AI Coach Tab
      await tabAICoach.click();
      await expect(page.getByText("Coach Kevin AI Assistant")).toBeVisible();

      // Verify Playlist sidebar and Complete Button
      await expect(page.getByRole("button", { name: /Mark Complete & Next Lesson/i })).toBeVisible();
    });

    test("AI Coach Room '/coach' renders coach selection, Vapi voice trigger button, and transcript dialogue container", async ({
      page,
    }) => {
      await page.goto("/coach");

      // Verify Title
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Live PGA Biomechanics Voice Coaching");

      // Verify Coach Personas (Kevin, Elena, Marcus)
      await expect(page.getByText("Coach Kevin").first()).toBeVisible();
      await expect(page.getByText("Coach Elena").first()).toBeVisible();
      await expect(page.getByText("Coach Marcus").first()).toBeVisible();

      // Switch to Elena Rostova
      await page.getByRole("button", { name: /Coach Elena/i }).click();
      await expect(page.getByRole("heading", { level: 3 })).toContainText("Coach Elena");

      // Verify Mic Call Button
      const micBtn = page.locator("button.size-16.rounded-full");
      await expect(micBtn).toBeVisible();

      // Verify Live Transcript Dialogue Container
      await expect(page.getByText("Live Voice Session Dialogue")).toBeVisible();

      // Test Prompt Pill interaction
      const promptPill = page.getByRole("button", { name: /Why am I pushing my 7-iron right/i });
      await expect(promptPill).toBeVisible();
      await promptPill.click();

      // Check transcript dialogue updated
      await expect(page.getByText("Why am I pushing my 7-iron right?", { exact: true })).toBeVisible();
    });
  });

  test.describe("3. Command Center (/(admin))", () => {
    test("Admin Analytics '/admin/analytics' renders KPI metric cards, Recharts chart, and student funnel", async ({
      page,
    }) => {
      await page.goto("/admin/analytics");

      // Verify Heading
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Performance & Analytics Hub");

      // Verify 4 KPI Metric Cards
      await expect(page.getByText("Monthly Recurring Run Rate")).toBeVisible();
      await expect(page.getByText("$72,400").first()).toBeVisible();
      await expect(page.getByText("Active Foundation Students")).toBeVisible();
      await expect(page.getByText("42 Golfers")).toBeVisible();
      await expect(page.getByText("AI Voice Range Hours")).toBeVisible();
      await expect(page.getByText("1,840 hrs")).toBeVisible();

      // Verify Recharts Chart Container
      await expect(page.getByText("Revenue Growth Trajectory")).toBeVisible();
      const chartContainer = page.locator(".recharts-responsive-container");
      await expect(chartContainer).toBeVisible();

      // Verify Progression Funnel
      await expect(page.getByText("Student Milestone Progression Funnel")).toBeVisible();
      await expect(page.getByText("01. Foundation (Grip & Setup)")).toBeVisible();
    });

    test("Course Management '/admin/courses' renders course directory table, status toggles, and actions", async ({
      page,
    }) => {
      await page.goto("/admin/courses");

      // Verify Title
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Academy Course & Module Directory");

      // Verify Create New Module button
      await expect(page.getByRole("button", { name: /Create New Module/i })).toBeVisible();

      // Verify Table Headers
      const table = page.locator("table");
      await expect(table).toBeVisible();
      await expect(table.getByText("Module", { exact: true })).toBeVisible();
      await expect(table.getByText("Instructor", { exact: true })).toBeVisible();
      await expect(table.getByText("Status", { exact: true })).toBeVisible();

      // Verify Status Badge Toggle
      const liveBadge = page.getByRole("button", { name: /Live \/ Published/i }).first();
      await expect(liveBadge).toBeVisible();
      await liveBadge.click();
      await expect(page.getByRole("button", { name: /Draft Mode/i }).first()).toBeVisible();

      // Verify Edit Button
      const editBtn = page.getByRole("button", { name: /Edit/i }).first();
      await expect(editBtn).toBeVisible();
    });

    test("Course Builder '/admin/courses/full-swing-mechanics' renders chapter curriculum editor and metadata settings", async ({
      page,
    }) => {
      await page.goto("/admin/courses/full-swing-mechanics");

      // Verify Header & Save Button
      await expect(page.getByRole("heading", { level: 1 })).toContainText("Curriculum Builder & Editor");
      const saveBtn = page.getByRole("button", { name: /Save & Publish Changes/i });
      await expect(saveBtn).toBeVisible();

      // Verify Metadata Card
      await expect(page.getByText("Module Metadata & Pricing")).toBeVisible();

      // Verify Chapters & Add Chapter button
      await expect(page.getByText("Chapters & Video Lessons")).toBeVisible();
      const addChapterBtn = page.getByRole("button", { name: /Add New Chapter/i });
      await expect(addChapterBtn).toBeVisible();
      await addChapterBtn.click();

      // Verify new chapter input element exists with value
      const newChapterInput = page.locator('input[value="New Custom Chapter"]');
      await expect(newChapterInput).toBeVisible();

      // Save form
      await saveBtn.click();
      await expect(page.getByText("Changes Published Live!")).toBeVisible();
    });
  });
});
