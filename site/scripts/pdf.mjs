// Renders the executive brief to a PDF with a locally installed Chromium browser (Edge or Chrome).
// $0, no extra npm dependencies. Run with the dev or preview server up:
//   npm run dev            (in another terminal)
//   npm run pdf            -> site/public/NaveenKumar_Executive_Brief.pdf
// Optional: PDF_URL=http://127.0.0.1:4321/executive-brief  PDF_OUT=public/NaveenKumar_Executive_Brief.pdf
import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const url = process.env.PDF_URL || 'http://127.0.0.1:4321/executive-brief';
const out = path.resolve(here, '..', process.env.PDF_OUT || 'public/NaveenKumar_Executive_Brief.pdf');

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error('No Chromium-based browser found. Set CHROME_PATH to msedge.exe or chrome.exe.');
  process.exit(1);
}

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--print-to-pdf-no-header',
  '--virtual-time-budget=8000',
  '--run-all-compositor-stages-before-draw',
  `--print-to-pdf=${out}`,
  url,
];

console.log(`Rendering ${url}\n  with ${browser}`);
try {
  execFileSync(browser, args, { stdio: 'ignore', timeout: 60_000 });
} catch (e) {
  // Edge/Chrome often exit non-zero after writing the file; check the artifact instead.
}
if (!existsSync(out) || statSync(out).size < 10_000) {
  console.error('PDF was not written. Is the dev/preview server running at', url, '?');
  process.exit(1);
}
console.log(`PDF written: ${out} (${Math.round(statSync(out).size / 1024)} KB)`);
