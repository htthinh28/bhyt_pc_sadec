/**
 * Phục vụ thư mục dist/ (kết quả `expo export --platform web`) để máy khác trong LAN mở được.
 *
 * Trước đó: npm run desktop:export:light  (hoặc desktop:export nếu cần đủ bước index)
 *
 * Biến môi trường: HOST (mặc định 0.0.0.0), PORT (mặc định 8080)
 */
import express from 'express';
import fs from 'fs';
import http from 'http';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const indexHtml = path.join(distDir, 'index.html');

const PORT = Number(process.env.PORT || 8080);
const HOST = String(process.env.HOST || '0.0.0.0').trim() || '0.0.0.0';

function getLanIPv4() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      const fam = iface.family;
      if ((fam === 'IPv4' || fam === 4) && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

if (!fs.existsSync(indexHtml)) {
  console.error(
    'Chưa có dist/index.html. Trên máy build, chạy trước:\n  npm run desktop:export:light\nhoặc:\n  npm run desktop:export',
  );
  process.exit(1);
}

const app = express();
app.use(express.static(distDir));
app.use((req, res) => {
  res.sendFile(indexHtml);
});

const server = http.createServer(app);
server.listen(PORT, HOST, () => {
  const ip = getLanIPv4();
  console.log(`
CDSS BHYT — static web (dist/)
  Local:   http://127.0.0.1:${PORT}/
  LAN:     http://${ip}:${PORT}/
  Bind:    ${HOST}:${PORT}
`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
