#!/usr/bin/env node
// Headless Playwright print preview: emulates print media, screenshots full HTML in slide-deck layout.
// Usage: node scripts/print-preview.mjs <html-file> [output.png]
import { chromium } from '/Users/alexandretoussaint/VS_code_folder_AT/chrome-extension-yt/node_modules/playwright/index.mjs';
import path from 'node:path';

const html = process.argv[2];
const out = process.argv[3] || 'screenshots/print-preview.png';
if (!html) {
  console.error('Usage: node scripts/print-preview.mjs <html> [out.png]');
  process.exit(1);
}

const absHtml = path.resolve(html);
const absOut = path.resolve(out);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1190, height: 842 } });
await page.emulateMedia({ media: 'print' });
await page.goto(`file://${absHtml}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: absOut, fullPage: true });
await browser.close();
console.log(`Saved: ${absOut}`);
