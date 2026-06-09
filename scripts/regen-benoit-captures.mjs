#!/usr/bin/env node
// Régénère / margine les captures démo du deck Benoit Pagny avec des marges propres.
//   1. demo-chart.png  : re-rend le widget RESTO-2025-03 en thème LIGHT depuis sa
//      source (benoit_pagny/ui/dist/preview-dark.html, données inlinées), screenshot
//      du body paddé → marges homogènes, labels € complets.
//   2. demo-portfolio.png : pas de source → on bake une marge blanche dans le raster
//      existant (image centrée sur page blanche paddée).
// Usage : node scripts/regen-benoit-captures.mjs
import { chromium } from '/Users/alexandretoussaint/VS_code_folder_AT/chrome-extension-yt/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const PROTO = path.resolve('decks/benoit-pagny/proto');
const CHART_SRC = '/Users/alexandretoussaint/VS_code_folder_AT/benoit_pagny/ui/dist/preview-dark.html';
const chartOut = path.join(PROTO, 'demo-chart.png');
const portfolioPng = path.join(PROTO, 'demo-portfolio.png');

const browser = await chromium.launch({ headless: true });

// ---------- 1. Graphique : RESTO en thème light, body paddé ----------
{
  let html = readFileSync(CHART_SRC, 'utf8');
  html = html.replace('data-theme="dark"', 'data-theme="light"');
  // Respiration autour du graphe : padding généreux + largeur cadrée.
  html = html.replace(
    'body{margin:0;padding:14px 16px;',
    'body{margin:0;padding:24px 34px;'
  );
  const page = await browser.newPage({ viewport: { width: 880, height: 760 }, deviceScaleFactor: 3 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: chartOut, fullPage: true });
  await page.close();
  console.log(`✓ chart   → ${chartOut}`);
}

// ---------- 2. Portefeuille : marge blanche bakée dans le raster ----------
{
  const PAD = 64; // px natifs autour de l'image (≈ 3% de marge)
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const dataUri = `data:image/png;base64,${readFileSync(portfolioPng).toString('base64')}`;
  await page.setContent(
    `<body style="margin:0"><img id="i" src="${dataUri}" style="display:block"></body>`,
    { waitUntil: 'load' }
  );
  const { w, h } = await page.evaluate(() => {
    const im = document.getElementById('i');
    return { w: im.naturalWidth, h: im.naturalHeight };
  });
  await page.setViewportSize({ width: w + PAD * 2, height: h + PAD * 2 });
  await page.setContent(
    `<body style="margin:0;background:#fff;padding:${PAD}px;width:${w}px">` +
    `<img src="${dataUri}" style="display:block;width:${w}px;height:${h}px"></body>`,
    { waitUntil: 'load' }
  );
  await page.waitForTimeout(150);
  await page.screenshot({ path: portfolioPng, fullPage: true });
  await page.close();
  console.log(`✓ portfolio → ${portfolioPng}  (${w + PAD * 2}×${h + PAD * 2})`);
}

await browser.close();
console.log('Done.');
