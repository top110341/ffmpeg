// Gather real brand assets from a product site (only a URL the user gave you).
//
//   node grab.mjs https://example.com
//
// → assets/shot_desktop.png, shot_mobile.png, shot_full.png, logo/icon candidates, assets/brand.json
//   (colors ranked by visible area, font families, headline + description text, og:image).
// Crop and animate these. Never redraw the product UI from imagination.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const target = process.argv[2];
if (!target) { console.error('usage: node grab.mjs <url>'); process.exit(1); }
mkdirSync('assets', { recursive: true });

let browser;
for (const o of [{ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }, {}, { channel: 'chrome' }, { channel: 'msedge' }]) { try { browser = await chromium.launch(o); break; } catch {} }
if (!browser) { console.error('No browser. Run: npx playwright install chromium'); process.exit(1); }

const desk = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await desk.goto(target, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => desk.waitForLoadState('load'));
await desk.waitForTimeout(1200);
await desk.screenshot({ path: 'assets/shot_desktop.png' });
await desk.screenshot({ path: 'assets/shot_full.png', fullPage: true }).catch(() => {});

const brand = await desk.evaluate(() => {
  const area = new Map(), fonts = new Map();
  const norm = (c) => { const m = c.match(/\d+(\.\d+)?/g); if (!m || (m[3] !== undefined && +m[3] < 0.5)) return null;
    return '#' + m.slice(0, 3).map((v) => (+v | 0).toString(16).padStart(2, '0')).join(''); };
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect(); if (!r.width || !r.height || r.top > innerHeight * 3) continue;
    const cs = getComputedStyle(el), a = Math.min(r.width * r.height, innerWidth * innerHeight);
    const bg = norm(cs.backgroundColor); if (bg) area.set(bg, (area.get(bg) || 0) + a);
    if (el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) {
      const fg = norm(cs.color); if (fg) area.set(fg, (area.get(fg) || 0) + a * 0.3);
      const f = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(); fonts.set(f, (fonts.get(f) || 0) + (el.textContent || '').length);
    }
  }
  const meta = (n) => document.querySelector(`meta[property="${n}"],meta[name="${n}"]`)?.content || null;
  const logos = [...document.querySelectorAll('header img, nav img, a[href="/"] img, img[alt*="logo" i], img[src*="logo" i], img[class*="logo" i]')]
    .map((i) => i.currentSrc || i.src).filter(Boolean);
  const svgLogo = document.querySelector('header svg, nav svg, a[href="/"] svg, [class*="logo" i] svg');
  const icons = [...document.querySelectorAll('link[rel*="icon"]')].map((l) => l.href);
  return {
    title: document.title, h1: document.querySelector('h1')?.innerText?.trim() || null,
    description: meta('description') || meta('og:description'), ogImage: meta('og:image'),
    colors: [...area].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([c]) => c),
    fonts: [...fonts].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([f]) => f),
    logos: [...new Set(logos)].slice(0, 5), icons: [...new Set(icons)].slice(0, 4),
    svgLogo: svgLogo ? svgLogo.outerHTML : null,
  };
});

const saved = [];
async function save(u, name) {
  try {
    const r = await desk.request.get(u); if (!r.ok()) return;
    const type = r.headers()['content-type'] || '', ext = type.includes('svg') ? 'svg' : type.includes('png') ? 'png'
      : type.includes('jpeg') ? 'jpg' : type.includes('webp') ? 'webp' : type.includes('icon') ? 'ico' : 'bin';
    writeFileSync(`assets/${name}.${ext}`, await r.body()); saved.push(`assets/${name}.${ext}`);
  } catch {}
}
for (const [i, u] of brand.logos.entries()) await save(u, `logo_${i}`);
for (const [i, u] of brand.icons.entries()) await save(u, `icon_${i}`);
if (brand.ogImage) await save(new URL(brand.ogImage, target).href, 'og_image');
if (brand.svgLogo) { writeFileSync('assets/logo_inline.svg', brand.svgLogo); saved.push('assets/logo_inline.svg'); }
delete brand.svgLogo;

const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true });
await mob.goto(target, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await mob.waitForTimeout(1000);
await mob.screenshot({ path: 'assets/shot_mobile.png' });

writeFileSync('assets/brand.json', JSON.stringify({ url: target, ...brand, files: saved }, null, 1));
await browser.close();
console.log(`✓ assets/brand.json\n  colors ${brand.colors.slice(0, 6).join(' ')}\n  fonts  ${brand.fonts.join(', ')}\n  files  shot_desktop.png shot_full.png shot_mobile.png ${saved.join(' ')}`);
