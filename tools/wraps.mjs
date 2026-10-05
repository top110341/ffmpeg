import { chromium } from '/home/user/ffmpeg/dbcooper/node_modules/playwright/index.mjs';
import { startServer } from '/home/user/ffmpeg/dbcooper/lib/server.mjs';
const { server, url } = await startServer(process.cwd());
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage();
await p.goto(url + '/index.html?w=1080&h=1920&render=1'); await p.waitForFunction(() => window.__ready);
console.log(await p.evaluate(() => { for (let t = 0; t < 180; t += 0.25) window.seek(t); return [...(globalThis.__wraps || [])].join('\n'); }));
await b.close(); server.close();
