// Render poster/index.html to site/public/poster.pdf via Playwright.
// Honors the CSS @page size (1600 x 910 mm) and print-color-adjust.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const src = resolve(root, 'poster/index.html');
const outDir = resolve(root, 'site/public');
const out = resolve(outDir, 'poster.pdf');

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(src).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: out,
    preferCSSPageSize: true,
    printBackground: true,
  });
} finally {
  await browser.close();
}

console.log(`Wrote ${out}`);
