// Tiny static server. ES modules and fetch() don't work from file://, so pages are served over http.
// Live preview: node lib/server.mjs  → open http://127.0.0.1:5173/?w=1080&h=1920
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.otf': 'font/otf', '.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4',
};

export function startServer(root = process.cwd(), port = 0) {
  root = resolve(root);
  const server = createServer(async (req, res) => {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const f = resolve(join(root, p === '/' ? 'index.html' : p));
    if (f !== root && !f.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    try {
      const body = await readFile(f);
      res.writeHead(200, { 'content-type': MIME[extname(f).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  return new Promise((r) => server.listen(port, '127.0.0.1', () => r({ server, url: `http://127.0.0.1:${server.address().port}` })));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { url } = await startServer(process.cwd(), Number(process.argv[2]) || 5173);
  console.log(`preview: ${url}/?w=1080&h=1920   (Ctrl+C to stop)`);
}
