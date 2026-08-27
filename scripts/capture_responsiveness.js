import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../../screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const viewports = [
  { name: 'mobile', width: 375, height: 667, isMobile: true },
  { name: 'tablet', width: 768, height: 1024, isMobile: false },
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
];

const routes = [
  { name: 'home', path: '/' },
  { name: 'courses', path: '/courses' },
  { name: 'coaches', path: '/coaches' },
  { name: 'pricing', path: '/pricing' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'coach', path: '/coach' },
];

async function captureAll() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const route of routes) {
    for (const vp of viewports) {
      console.log(`📸 Capturing ${route.name} on ${vp.name} (${vp.width}x${vp.height})...`);
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile,
        deviceScaleFactor: 2,
      });

      try {
        await page.goto(`http://localhost:4004${route.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await new Promise(r => setTimeout(r, 1000));

        const fileName = `${route.name}_${vp.name}.png`;
        const filePath = path.join(outputDir, fileName);
        await page.screenshot({ path: filePath, fullPage: true });
        console.log(`✅ Saved ${fileName}`);
      } catch (err) {
        console.error(`❌ Failed ${route.name} on ${vp.name}:`, err.message);
      }
    }
  }

  await browser.close();
  console.log("🎉 All screenshots captured successfully in:", outputDir);
}

captureAll();
