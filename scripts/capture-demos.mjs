// Capture screenshots of the deck.gl-zarr live demos for the in-browser
// rendering page. Both demos share the same viewport so the PNGs match.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outDir = resolve(root, 'figures');

const VIEWPORT = { width: 1280, height: 720 };
const DEVICE_SCALE_FACTOR = 2;
// Match in-flight Zarr chunk fetches by host. Both demos read from
// data.source.coop; if that changes, update this predicate.
const isZarrFetch = (url) => url.includes('data.source.coop');
const ZARR_IDLE_MS = 5000;
const ZARR_IDLE_TIMEOUT_MS = 240000;

const targets = [
  {
    url: 'https://developmentseed.org/deck.gl-raster/examples/dynamical-zarr-ecmwf/',
    out: 'deck-gl-ecmwf.png',
    // ECMWF autoplays its time animation, so each new frame fetches a fresh
    // chunk slice and tiles never accumulate. Pause so the current frame's
    // tile set can settle, then wait for the fetches to drain.
    setup: async (page) => {
      await page.getByRole('button', { name: 'Pause' }).click();
    },
  },
  {
    url: 'https://developmentseed.org/deck.gl-raster/examples/aef-mosaic/',
    out: 'deck-gl-aef.png',
  },
];

async function waitForZarrIdle(inFlight, { idleMs, timeoutMs }) {
  const start = Date.now();
  let idleSince = inFlight.size === 0 ? Date.now() : null;
  while (Date.now() - start < timeoutMs) {
    if (inFlight.size === 0) {
      if (idleSince === null) idleSince = Date.now();
      if (Date.now() - idleSince >= idleMs) return;
    } else {
      idleSince = null;
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  console.log(
    `[capture-demos] timed out after ${timeoutMs}ms waiting for Zarr idle (${inFlight.size} still in flight)`,
  );
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
try {
  for (const target of targets) {
    const { url, out } = target;
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
    });
    const page = await context.newPage();
    const inFlightZarr = new Set();
    page.on('request', (req) => {
      if (isZarrFetch(req.url())) inFlightZarr.add(req);
    });
    const settle = (req) => inFlightZarr.delete(req);
    page.on('requestfinished', settle);
    page.on('requestfailed', settle);
    page.on('pageerror', (err) => {
      console.log(`[capture-demos:pageerror] ${err.message}`);
    });
    console.log(`[capture-demos] ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.maplibregl-canvas', { state: 'attached' });
    if (target.setup) {
      await target.setup(page);
    }
    await waitForZarrIdle(inFlightZarr, {
      idleMs: ZARR_IDLE_MS,
      timeoutMs: ZARR_IDLE_TIMEOUT_MS,
    });
    const outPath = resolve(outDir, out);
    await page.screenshot({ path: outPath, type: 'png' });
    await context.close();
    console.log(`[capture-demos] wrote ${outPath}`);
  }
} finally {
  await browser.close();
}
