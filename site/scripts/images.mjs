// Generates optimized headshot variants and Open Graph images from the source PNG.
// Run: npm run images   (from site/)
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
// Source photo and the head-and-shoulders crop to take from it (pixels in the source).
// The current source is a 707x1050 full-length shot; the face sits at roughly x 290-380, y 70-200.
// A 370px square from (150, 20) frames head with headroom, shoulders, lapels and pocket square,
// and stays clear of the floral wall on the right edge.
const src = path.join(root, 'Naveen Kumar profile pic.jpg');
const crop = { left: 150, top: 20, width: 370, height: 370 };
const outImages = path.join(here, '..', 'public', 'images');
const outOg = path.join(here, '..', 'public', 'og');

if (!existsSync(src)) {
  console.error('Source headshot not found at', src);
  process.exit(1);
}

await mkdir(outImages, { recursive: true });
await mkdir(outOg, { recursive: true });

// Headshot pipeline: crop, resize (upscaling where needed), light sharpen to recover edge
// definition lost to the small source region.
const headshot = (size) =>
  sharp(src)
    .rotate() // honour EXIF orientation
    .extract(crop)
    .resize(size, size, { fit: 'cover', kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.4 });

const sizes = [180, 400, 800, 1200];
for (const s of sizes) {
  const base = headshot(s);
  await base.clone().webp({ quality: 82 }).toFile(path.join(outImages, `naveen-${s}.webp`));
  if (s === 180 || s === 400) await base.clone().png({ compressionLevel: 9 }).toFile(path.join(outImages, `naveen-${s}.png`));
  if (s === 800) await base.clone().avif({ quality: 55 }).toFile(path.join(outImages, `naveen-${s}.avif`));
}
console.log('headshot variants written');

// Favicons from the headshot: circular crop with a thin accent ring so it reads at 16-32px.
const outPublic = path.join(here, '..', 'public');
async function favicon(size, file) {
  const ring = Math.max(1, Math.round(size * 0.06));
  const r = size / 2;
  const photo = await headshot(size).png().toBuffer();
  const circular = await sharp(photo)
    .composite([{ input: Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r - ring}" fill="white"/></svg>`), blend: 'dest-in' }])
    .png()
    .toBuffer();
  await sharp(Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="#22c99f"/></svg>`))
    .composite([{ input: circular, left: 0, top: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outPublic, file));
}
await favicon(32, 'favicon-32.png');
await favicon(180, 'apple-touch-icon.png');
await favicon(192, 'favicon-192.png');
await favicon(512, 'favicon-512.png');
console.log('favicons written');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Approximate word wrap for SVG <text>: maxChars based on font size and box width.
function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

function textBlock({ x, y, lines, size, weight, fill, lineHeight = 1.15 }) {
  return lines
    .map((l, i) => `<text x="${x}" y="${y + i * size * lineHeight}" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(l)}</text>`)
    .join('');
}

async function og({ file, title, subtitle, kicker }) {
  const W = 1200, H = 630;
  const titleSize = title.length > 40 ? 44 : 60;
  const titleLines = wrap(title, titleSize > 50 ? 20 : 28);
  const titleTop = 215;
  const subTop = titleTop + titleLines.length * titleSize * 1.15 + 24;
  const subLines = wrap(subtitle, 52);
  const photo = await headshot(360).png().toBuffer();
  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0a0c17"/>
        <stop offset="1" stop-color="#20263a"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6">
        <stop offset="0" stop-color="#2bbf9b" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#2bbf9b" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="circle"><circle cx="960" cy="315" r="180"/></clipPath>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <g stroke="#2e3652" stroke-width="1" opacity="0.5">
      ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="${H}"/>`).join('')}
      ${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 48}" x2="${W}" y2="${i * 48}"/>`).join('')}
    </g>
    <circle cx="960" cy="315" r="188" fill="#2bbf9b"/>
    <text x="72" y="130" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="#5fd6b8" letter-spacing="2">${esc(kicker)}</text>
    ${textBlock({ x: 72, y: titleTop, lines: titleLines, size: titleSize, weight: 800, fill: '#f6f7fb' })}
    ${textBlock({ x: 72, y: subTop, lines: subLines, size: 24, weight: 400, fill: '#a9b3cf', lineHeight: 1.4 })}
    <text x="72" y="585" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="22" fill="#7c89ad">naveenkumar911.github.io</text>
  </svg>`;
  const svgBuf = Buffer.from(svg);
  const circular = await sharp(photo)
    .composite([{ input: Buffer.from(`<svg width="360" height="360"><circle cx="180" cy="180" r="180" fill="white"/></svg>`), blend: 'dest-in' }])
    .png()
    .toBuffer();
  await sharp(svgBuf)
    .composite([{ input: circular, left: 780, top: 135 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outOg, file));
  console.log('og written', file);
}

await og({
  file: 'default.png',
  kicker: 'PRINCIPAL AI ARCHITECT  |  FORWARD-DEPLOYED AI LEADER',
  title: 'Naveen Kumar',
  subtitle: 'Agentic AI from POC to governed production. 10K+ daily requests, 98% uptime, $600K/yr savings, 10-person team.',
});
await og({
  file: 'case-studies.png',
  kicker: 'CASE STUDIES',
  title: 'Production agentic AI in regulated enterprises',
  subtitle: 'Government, retail, asset management, pharma, sports media. Architecture, decisions, outcomes.',
});
await og({
  file: 'insights.png',
  kicker: 'INSIGHTS',
  title: 'Enterprise AI leadership, agentic systems, governance and ROI',
  subtitle: 'Writing for CAIOs, CTOs and the engineers who ship agents to production.',
});
await og({
  file: 'hire.png',
  kicker: 'HIRE',
  title: 'Head of AI. Forward Deployed Lead. Principal Architect. Fractional CAIO.',
  subtitle: 'Remote (US / global), relocation, or UAE onsite. GMT+4 with US-East overlap.',
});
