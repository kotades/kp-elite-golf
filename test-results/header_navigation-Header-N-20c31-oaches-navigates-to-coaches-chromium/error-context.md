# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: header_navigation.spec.ts >> Header Navigation Suite - Desktop (1280x800) >> Desktop: Coaches navigates to /coaches
- Location: tests/header_navigation.spec.ts:24:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/coaches$/
Received string:  "http://localhost:3003/"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    20 × locator resolved to <html lang="en" class="dark scroll-smooth">…</html>
       - unexpected value "http://localhost:3003/"

```

```yaml
- banner:
  - link "KP ELITE PGA GOLF ACADEMY & AI":
    - /url: /
  - navigation:
    - link "Curriculum":
      - /url: /courses
    - link "Coaches":
      - /url: /coaches
    - link "Pricing":
      - /url: /pricing
    - link "About & Tech":
      - /url: /about
  - button "Student Sign In"
  - link "Apply for Academy":
    - /url: /courses/apply
    - button "Apply for Academy"
- main:
  - img "Golf Swing at Sunrise"
  - text: "The #1 Hybrid PGA Coaching & AI Telemetry Academy"
  - heading "Master Your Swing. Lower Your Handicap." [level=1]
  - paragraph: The elite PGA-caliber hybrid coaching system combining high-speed biomechanics, personalized 1-on-1 mastery, and 24/7 AI voice coaching.
  - link "Start Free Trial":
    - /url: /courses/apply
    - button "Start Free Trial"
  - button "Watch Academy Trailer"
  - text: 16 1-on-1 PGA Sessions 24/7 AI Voice Practice TrackMan 3D Telemetry
  - paragraph: 4.98 / 5.0 Rating from 1,400+ Certified Graduates
  - text: Trusted by golfers at prestigious championship clubs worldwide -4.8
  - paragraph: Average Handicap Drop
  - paragraph: Within 8 Weeks of Foundation Program
  - text: 10,000+
  - paragraph: Swings Analyzed
  - paragraph: 3D Biomechanical & Launch Monitor Data
  - text: Top 50
  - paragraph: PGA Master Instructors
  - paragraph: Recognized Nationwide by Golf Digest
  - text: 99.2%
  - paragraph: Course-Ready Certification
  - paragraph: Beginners step onto the 1st tee with confidence
  - text: Augusta National Golf Club (Augusta, GA) St Andrews Old Course Links (St Andrews, Scotland) Pebble Beach Golf Links (Pebble Beach, CA) Pine Valley Golf Club (Pine Valley, NJ) Royal Melbourne (Black Rock, Australia) Whistling Straits (Kohler, WI) Shinnecock Hills (Southampton, NY) Cypress Point Club (Pebble Beach, CA) Augusta National Golf Club (Augusta, GA) St Andrews Old Course Links (St Andrews, Scotland) Pebble Beach Golf Links (Pebble Beach, CA) Pine Valley Golf Club (Pine Valley, NJ) Royal Melbourne (Black Rock, Australia) Whistling Straits (Kohler, WI) Shinnecock Hills (Southampton, NY) Cypress Point Club (Pebble Beach, CA) Cutting-Edge Hybrid Golf Technology
  - heading "Engineered for Rapid Swing Transformation" [level=2]
  - paragraph: Eliminate guesswork on the driving range. We pair PGA Master instruction with 240 fps dual-radar telemetry and real-time AI voice coaching.
  - img "3D Swing Biomechanics"
  - text: 240 FPS HIGH-SPEED MOTION CAPTURE PGA Master Calibrated
  - paragraph: TEMPO RATIO
  - paragraph: "3.1 : 1"
  - text: Tour Ideal
  - paragraph: HIP ROTATION
  - paragraph: 44.2°
  - text: At Impact
  - paragraph: SHAFT LEAN
  - paragraph: +6.8°
  - text: Pure Compression
  - heading "Biomechanical Video Diagnostics" [level=3]
  - paragraph: Upload your swing from down-the-line or face-on. Our AI neural network instantly maps your kinematic chain, spine angles, and transition lag against PGA Tour benchmarks.
  - link "Explore Swing Mechanics Module":
    - /url: /courses/full-swing-mechanics
  - text: 24/7 AI Voice Range Coach Ultra-Low Latency <400ms
  - paragraph: “Your transition started with the shoulders. Drop your hands 2 inches first before turning.”
  - paragraph: Pop in your earbuds on the driving range. Coach Kevin talks you through every strike in real-time.
  - text: 8-Week Pathway
  - heading "Structured Student Milestones" [level=3]
  - paragraph: Clear checkpoints ensuring steady, measurable handicap drops.
  - paragraph: 01. Foundation
  - paragraph: Grip, athletic posture & equipment fitting
  - paragraph: 02. Consistency
  - paragraph: Kinematic chain & 3-position wedge matrix
  - paragraph: 03. On-Course Ready
  - paragraph: DECADE target zones & bunker escape rules
  - paragraph: 04. Tour Caliber
  - paragraph: Single digit handicap & club tournament mastery
  - link "View Full Syllabus":
    - /url: /courses/apply
  - text: iOS & Android
  - heading "Range Companion App" [level=4]
  - paragraph: Carry your custom 14-club yardage matrix, shot dispersion charts, and drill timers in your pocket.
  - text: Offline Sync World-Class Faculty
  - heading "Learn Directly From Tour Instructors" [level=2]
  - paragraph: Our faculty comprises PGA Master Professionals, LPGA Tour winners, and TPI biomechanics researchers with over 50+ combined years of tour player development.
  - button "Previous Coach"
  - button "Next Coach"
  - img "Kevin Palmer"
  - text: 4.98 (342) 14 PGA/DP World Tour wins as lead swing technician
  - heading "Kevin Palmer" [level=3]
  - paragraph: Head PGA Master Instructor & Founder
  - paragraph: With over 22 years of elite tour player coaching, Coach Kevin develops repeatable kinematic swing sequences tailored to each golfer's natural anatomy.
  - text: "PGA Master Professional Former European Tour Competitor TrackMan Master Certified Specialty: Full Swing Biomechanics & Elite Tournament Scoring"
  - link "Book Lesson":
    - /url: /courses/apply
    - button "Book Lesson"
  - img "Elena Rostova"
  - text: 4.96 (289) 8 LPGA Tour seasons, 2 top-10 major finishes
  - heading "Elena Rostova" [level=3]
  - paragraph: Senior LPGA Master Coach
  - paragraph: Former LPGA Tour winner specializing in up-and-down conversion rate optimization, bunker escape physics, and pressure putting routines.
  - text: "LPGA Class A AimPoint Certified Green Reader TPI Level 3 Certified Specialty: Precision Short Game, Wedge Matrices & Putting Mastery"
  - link "Book Lesson":
    - /url: /courses/apply
    - button "Book Lesson"
  - img "Marcus Sterling"
  - text: 4.95 (215) Performance coach for 6 current PGA Tour professionals
  - heading "Marcus Sterling" [level=3]
  - paragraph: Director of Biomechanics & Speed Development
  - paragraph: Marcus combines dual force-plate technology and high-frame 3D motion capture to unlock effortless 15-25+ yards without sacrificing dispersion.
  - text: "PGA Class A Sports Science M.S. Gears 3D Motion Capture Lead Specialty: Clubhead Speed Generation & Kinetic Sequence Optimization"
  - link "Book Lesson":
    - /url: /courses/apply
    - button "Book Lesson"
  - img "David Vance"
  - text: 4.94 (178) Caddie & strategist at 12 major championships
  - heading "David Vance" [level=3]
  - paragraph: Head Course Strategist & Mental Performance Coach
  - paragraph: Author and tournament strategist teaching golfers how to eliminate double bogeys, manage dispersion cones, and dominate high-stakes matches.
  - text: "PGA Professional Certified Sports Psychologist Former Collegiate All-American Specialty: DECADE Course Management & High-Pressure Tournament Mindset"
  - link "Book Lesson":
    - /url: /courses/apply
    - button "Book Lesson"
  - img "Chloe Bennett"
  - text: 4.99 (310) Coached 40+ collegiate scholarship athletes
  - heading "Chloe Bennett" [level=3]
  - paragraph: Junior Pathway & Foundation Program Lead
  - paragraph: Dedicated to taking brand new and high-handicap golfers from nervous first tee jitters to elegant, confident ball-striking in record time.
  - text: "PGA Associate US Kids Master Teacher Titleist Certified Fitting Specialist Specialty: 8-Week Foundation Curriculum & New Golfer Rapid Progression"
  - link "Book Lesson":
    - /url: /courses/apply
    - button "Book Lesson"
  - text: Comprehensive Academy Syllabus
  - heading "Curated Core Golf Modules" [level=2]
  - paragraph: Structured step-by-step masterclasses designed to build an unbreakable repeatable motion from tee to green.
  - link "Explore All 9 Modules":
    - /url: /courses
    - button "Explore All 9 Modules"
  - img "Golf Basics & Fundamentals"
  - text: Beginner 4.98 Module 01 1420 golfers
  - heading "Golf Basics & Fundamentals" [level=3]
  - paragraph: Master golf scoring, par, handicap index mechanics, tee boxes, fairway navigation, hazards, and greens architecture.
  - text: 4 Weeks 8 Lessons (14 Drills) Lead Instructor Chloe Bennett
  - link "View Syllabus →":
    - /url: /courses/golf-basics
    - button "View Syllabus →"
  - img "Equipment Mastery & Fitting"
  - text: All Levels 4.94 Module 02 980 golfers
  - heading "Equipment Mastery & Fitting" [level=3]
  - paragraph: Clubs and their specific purposes, shaft flex, loft/lie optimization, ball compression, glove sizing, and safe gear handling.
  - text: 3 Weeks 6 Lessons (10 Drills) Lead Instructor Chloe Bennett
  - link "View Syllabus →":
    - /url: /courses/equipment
    - button "View Syllabus →"
  - img "Grip, Stance & Setup Architecture"
  - text: All Levels 4.99 Module 03 2150 golfers
  - heading "Grip, Stance & Setup Architecture" [level=3]
  - paragraph: Neutral vs strong grip, spinal tilt, ball position by club, stance width, balanced weight distribution, and pre-shot routines.
  - text: 4 Weeks 10 Lessons (18 Drills) Lead Instructor Kevin Palmer
  - link "View Syllabus →":
    - /url: /courses/grip-and-setup
    - button "View Syllabus →"
  - text: Transparent Academy Investment
  - heading "Choose Your Coaching Pathway" [level=2]
  - paragraph: Whether you want self-guided drill mastery or our elite 1-on-1 PGA Master Foundation Program, we have an option tailored to your handicap goals.
  - heading "Practice Library" [level=3]
  - paragraph: Ideal for the self-directed golfer wanting unlimited drill videos, on-demand curriculum, and AI swing reviews.
  - text: $49 / per month
  - paragraph: "What's Included:"
  - text: Access to all 9 core golf modules (90+ video lessons) 200+ structured practice drills & warm-up routines AI swing biomechanics video scanner (5 scans/month) Mobile range companion with yardage matrix KP Elite Golf community forum access
  - link "Start 7-Day Free Trial":
    - /url: /sign-in?plan=practice-library
    - button "Start 7-Day Free Trial"
  - paragraph: Cancel or upgrade anytime
  - text: Most Popular / Flagship
  - heading "8-Week Foundation Program" [level=3]
  - paragraph: Our world-renowned private coaching intensive designed to take you from initial setup to fully course-ready and single-digit trajectory.
  - text: $7,200 / one-time enrollment
  - paragraph: "What's Included:"
  - text: 16 private 1-on-1 scheduled sessions with PGA Master Instructor Full 3D motion capture biomechanical swing breakdown Complete custom Titleist/Callaway fitting review & wedge matrix Dedicated 24/7 AI Voice Coach with Kevin Palmer persona Unlimited video swing submissions with 24h coach voiceover notes Official KP Elite Academy Certification & handicap tracking Guaranteed handicap reduction or 100% money-back guarantee
  - link "Apply for Academy Intake":
    - /url: /courses/apply
    - button "Apply for Academy Intake"
  - paragraph: Includes 100% Score Improvement Guarantee
  - text: Elite Level
  - heading "VIP Tour Coaching" [level=3]
  - paragraph: For competitive amateurs, club champions, and junior tournament players demanding continuous PGA tour-grade mentorship.
  - text: $890 / per month
  - paragraph: "What's Included:"
  - text: Bi-weekly live 1-on-1 private video coaching sessions Unlimited AI swing reviews & launch monitor data analysis DECADE tournament strategy & course mapping prep Priority messaging channel directly to Head Coach Kevin Quarterly in-person VIP clinic invitations at Augusta & Pebble Beach Custom physical conditioning & mobility workout plans
  - link "Join VIP Coaching":
    - /url: /sign-in?plan=vip
    - button "Join VIP Coaching"
  - paragraph: Cancel or upgrade anytime
  - heading "The KP Elite Performance Guarantee" [level=4]
  - paragraph: If you complete the 8-Week Foundation Program and do not lower your handicap by at least 3 strokes, we coach you for free until you do.
  - link "Review Enrollment Policy":
    - /url: /courses/apply
    - button "Review Enrollment Policy"
  - text: Verified Graduate Outcomes
  - heading "Real Golfers. Measurable Handicap Drops." [level=2]
  - text: 18.4 → 8.2
  - paragraph: “The combination of Coach Kevin's biomechanics analysis and the AI voice coach at the driving range completely rebuilt my transition. I went from spraying slices into the woods to hitting 11+ fairways every round.”
  - img "Jordan M."
  - heading "Jordan M." [level=4]
  - paragraph: Baltusrol Golf Club
  - text: Course-Ready & Single Digit 24.0 → 13.5
  - paragraph: “As someone who took up golf late in life, I felt intimidated on private courses. KP Elite gave me the blueprint, the etiquette confidence, and a repeatable swing that holds up under pressure.”
  - img "Alex R."
  - heading "Alex R." [level=4]
  - paragraph: Oakmont Country Club
  - text: Consistent Setup & Ball Striking 12.1 → 5.4
  - paragraph: “Coach Elena's wedge matrix and the 3-position clock drill saved me 6 strokes per round inside 80 yards alone. The investment paid for itself ten times over.”
  - img "Taylor K."
  - heading "Taylor K." [level=4]
  - paragraph: Pinehurst Resort & CC
  - text: Short-Game Certified 4.8 → +1.2
  - paragraph: “The DECADE course strategy insights from Coach David stopped my careless double bogeys. I qualified for the State Amateur within 4 months of joining.”
  - img "Morgan P."
  - heading "Morgan P." [level=4]
  - paragraph: Winged Foot Golf Club
  - text: Handicap Tracking & Scratch Golfer
  - heading "Frequently Asked Questions" [level=3]
  - paragraph: Everything you need to know about our academy, scheduling, and hybrid coaching model.
  - heading "How long is each private lesson in the Foundation Program?" [level=3]:
    - button "How long is each private lesson in the Foundation Program?"
  - heading "How does the 24/7 AI Voice Range Coach work?" [level=3]:
    - button "How does the 24/7 AI Voice Range Coach work?"
  - heading "What equipment or experience level do I need before starting?" [level=3]:
    - button "What equipment or experience level do I need before starting?"
  - heading "What happens if I need to reschedule a lesson?" [level=3]:
    - button "What happens if I need to reschedule a lesson?"
  - heading "How does the swing video submission and analysis work?" [level=3]:
    - button "How does the swing video submission and analysis work?"
  - text: Limited Cohort Enrollment
  - heading "Ready to Transform Your Golf Game Forever?" [level=2]
  - paragraph: Join the 8-Week Foundation Program or start your 7-day Practice Library trial today. Step onto the first tee with tour-level confidence.
  - link "Apply for Academy Intake ($7,200)":
    - /url: /courses/apply
    - button "Apply for Academy Intake ($7,200)"
  - link "Start $49/mo Free Trial":
    - /url: /sign-in?plan=practice-library
    - button "Start $49/mo Free Trial"
  - paragraph: ✓ 100% Handicap Reduction Guarantee • ✓ Instant Portal Access • ✓ No Hidden Fees
- contentinfo:
  - paragraph: PGA Master Instructor
  - paragraph: Top 50 Teacher in America
  - paragraph: TPI Level 3 Certified
  - paragraph: Golf Biomechanics Lab
  - paragraph: TrackMan Master
  - paragraph: Dual Radar 3D Analysis
  - paragraph: Handicap Guarantee
  - paragraph: Measurable score drop
  - link "KP ELITE GOLF Championship Training Academy":
    - /url: /
  - paragraph: The premier hybrid golf coaching system integrating PGA master biomechanics, high-frame 3D swing tracking, and continuous 24/7 AI voice instruction.
  - text: Augusta National Corridor & Pebble Beach Facilities admissions@kpelitegolf.com +1 (800) 555-GOLF
  - heading "Curriculum & Modules" [level=4]
  - list:
    - listitem:
      - link "Golf Basics & Fundamentals":
        - /url: /courses/golf-basics
    - listitem:
      - link "Equipment Mastery & Fitting":
        - /url: /courses/equipment
    - listitem:
      - link "Grip, Stance & Setup Architecture":
        - /url: /courses/grip-and-setup
    - listitem:
      - link "Full Swing Biomechanics & Speed":
        - /url: /courses/full-swing-mechanics
    - listitem:
      - 'link "Short Game: Putting, Chipping & Pitching"':
        - /url: /courses/short-game-mastery
    - listitem:
      - link "View All 9 Modules →":
        - /url: /courses
  - heading "Academy Programs" [level=4]
  - list:
    - listitem:
      - link "8-Week Foundation ($7,200)":
        - /url: /courses/apply
    - listitem:
      - link "VIP Tour Coaching ($890/mo)":
        - /url: /pricing
    - listitem:
      - link "Practice Video Library ($49/mo)":
        - /url: /pricing
    - listitem:
      - link "Faculty & Mentors":
        - /url: /coaches
    - listitem:
      - link "Biomechanics Lab & Tech":
        - /url: /about
    - listitem:
      - link "Academy Visual Gallery":
        - /url: /gallery
  - heading "Student Portal" [level=4]
  - list:
    - listitem:
      - link "Student Dashboard":
        - /url: /dashboard
    - listitem:
      - link "My Journey & Milestones":
        - /url: /my-journey
    - listitem:
      - link "AI Voice Practice Sessions":
        - /url: /coach
    - listitem:
      - link "Curriculum & Drill Search":
        - /url: /search
    - listitem:
      - link "Membership Billing":
        - /url: /subscription
    - listitem:
      - link "Concierge & Contact":
        - /url: /contact
  - paragraph: © 2026 KP Elite Golf Training Academy LLC. All rights reserved.
  - link "Terms of Service":
    - /url: /terms
  - text: •
  - link "Privacy Notice":
    - /url: /privacy
  - text: •
  - link "About Academy":
    - /url: /about
  - text: •
  - link "Contact Us":
    - /url: /contact
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("Header Navigation Suite - Desktop (1280x800)", () => {
  4   |   test.use({ viewport: { width: 1280, height: 800 } });
  5   | 
  6   |   test("Desktop: Brand Logo navigates to Home from another route", async ({ page }) => {
  7   |     await page.goto("/courses", { waitUntil: "domcontentloaded" });
  8   |     const brandLink = page.locator("header a[href='/']").first();
  9   |     await expect(brandLink).toBeVisible();
  10  |     await brandLink.click();
  11  |     await expect(page).toHaveURL(/\/$/);
  12  |     await expect(page.locator("h1")).toContainText("Master Your Swing");
  13  |   });
  14  | 
  15  |   test("Desktop: Curriculum navigates to /courses", async ({ page }) => {
  16  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  17  |     const link = page.locator("header nav a[href='/courses']");
  18  |     await expect(link).toBeVisible();
  19  |     await link.click();
  20  |     await expect(page).toHaveURL(/\/courses$/);
  21  |     await expect(page.locator("h1")).toContainText("Golf Modules");
  22  |   });
  23  | 
  24  |   test("Desktop: Coaches navigates to /coaches", async ({ page }) => {
  25  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  26  |     const link = page.locator("header nav a[href='/coaches']");
  27  |     await expect(link).toBeVisible();
  28  |     await link.click();
> 29  |     await expect(page).toHaveURL(/\/coaches$/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  30  |     await expect(page.locator("h1")).toContainText("The Kinematic Swing");
  31  |   });
  32  | 
  33  |   test("Desktop: Biomechanics navigates to /about", async ({ page }) => {
  34  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  35  |     const link = page.locator("header nav a[href='/about']");
  36  |     await expect(link).toBeVisible();
  37  |     await link.click();
  38  |     await expect(page).toHaveURL(/\/about$/);
  39  |     await expect(page.locator("h1")).toContainText("3D Biomechanics");
  40  |   });
  41  | 
  42  |   test("Desktop: Gallery navigates to /gallery", async ({ page }) => {
  43  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  44  |     const link = page.locator("header nav a[href='/gallery']");
  45  |     await expect(link).toBeVisible();
  46  |     await link.click();
  47  |     await expect(page).toHaveURL(/\/gallery$/);
  48  |     await expect(page.locator("h1")).toContainText("Facility Gallery");
  49  |   });
  50  | 
  51  |   test("Desktop: Pricing navigates to /pricing", async ({ page }) => {
  52  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  53  |     const link = page.locator("header nav a[href='/pricing']");
  54  |     await expect(link).toBeVisible();
  55  |     await link.click();
  56  |     await expect(page).toHaveURL(/\/pricing$/);
  57  |     await expect(page.locator("h1")).toContainText("World-Class Performance");
  58  |   });
  59  | 
  60  |   test("Desktop: Intake Portal navigates to /courses/apply", async ({ page }) => {
  61  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  62  |     const link = page.locator("header nav a[href='/courses/apply']");
  63  |     await expect(link).toBeVisible();
  64  |     await link.click();
  65  |     await expect(page).toHaveURL(/\/courses\/apply$/);
  66  |     await expect(page.locator("h1")).toContainText("New Student Intake");
  67  |   });
  68  | 
  69  |   test("Desktop: CTA 'Apply for Academy' button navigates to /courses/apply", async ({ page }) => {
  70  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  71  |     const applyBtn = page.locator("header").getByRole("button", { name: /Apply for Academy/i });
  72  |     await expect(applyBtn).toBeVisible();
  73  |     await applyBtn.click();
  74  |     await expect(page).toHaveURL(/\/courses\/apply$/);
  75  |     await expect(page.locator("h1")).toContainText("New Student Intake");
  76  |   });
  77  | });
  78  | 
  79  | test.describe("Header Navigation Suite - Mobile (375x667)", () => {
  80  |   test.use({ viewport: { width: 375, height: 667 } });
  81  | 
  82  |   test("Mobile: Hamburger menu opens and closes via toggle button", async ({ page }) => {
  83  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  84  |     const toggleBtn = page.getByRole("button", { name: /Toggle Navigation/i });
  85  |     await expect(toggleBtn).toBeVisible();
  86  | 
  87  |     // Open menu
  88  |     await toggleBtn.click();
  89  |     const curriculumLink = page.locator("header .lg\\:hidden a[href='/courses']");
  90  |     await expect(curriculumLink).toBeVisible();
  91  | 
  92  |     // Close menu
  93  |     await toggleBtn.click();
  94  |     await expect(curriculumLink).not.toBeVisible();
  95  |   });
  96  | 
  97  |   test("Mobile: Curriculum link navigates and closes menu", async ({ page }) => {
  98  |     await page.goto("/", { waitUntil: "domcontentloaded" });
  99  |     await page.getByRole("button", { name: /Toggle Navigation/i }).click();
  100 |     const link = page.locator("header .lg\\:hidden a[href='/courses']");
  101 |     await expect(link).toBeVisible();
  102 |     await link.click();
  103 | 
  104 |     await expect(page).toHaveURL(/\/courses$/);
  105 |     await expect(page.locator("h1")).toContainText("Golf Modules");
  106 |     await expect(page.locator("header .lg\\:hidden a[href='/courses']")).not.toBeVisible();
  107 |   });
  108 | 
  109 |   test("Mobile: Coaches link navigates and closes menu", async ({ page }) => {
  110 |     await page.goto("/", { waitUntil: "domcontentloaded" });
  111 |     await page.getByRole("button", { name: /Toggle Navigation/i }).click();
  112 |     const link = page.locator("header .lg\\:hidden a[href='/coaches']");
  113 |     await expect(link).toBeVisible();
  114 |     await link.click();
  115 | 
  116 |     await expect(page).toHaveURL(/\/coaches$/);
  117 |     await expect(page.locator("h1")).toContainText("The Kinematic Swing");
  118 |     await expect(page.locator("header .lg\\:hidden a[href='/coaches']")).not.toBeVisible();
  119 |   });
  120 | 
  121 |   test("Mobile: Biomechanics link navigates and closes menu", async ({ page }) => {
  122 |     await page.goto("/", { waitUntil: "domcontentloaded" });
  123 |     await page.getByRole("button", { name: /Toggle Navigation/i }).click();
  124 |     const link = page.locator("header .lg\\:hidden a[href='/about']");
  125 |     await expect(link).toBeVisible();
  126 |     await link.click();
  127 | 
  128 |     await expect(page).toHaveURL(/\/about$/);
  129 |     await expect(page.locator("h1")).toContainText("3D Biomechanics");
```