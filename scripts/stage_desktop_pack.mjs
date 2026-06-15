/**
 * Tạo .desktop-staging/ chỉ gồm dist + electron-main + package.json tối giản,
 * rồi chạy electron-builder — tránh đóng gói nhầm toàn bộ node_modules (~300MB+).
 *
 * Output mặc định: %TEMP%/cdss-bhyt-release-desktop (tránh EPERM khi project nằm trong Google Drive).
 * Ghi đè: CDSS_RELEASE_OUT=/đường/dẫn/tuyệt/đối
 *
 * Dùng: node scripts/stage_desktop_pack.mjs -- --win
 * Hoặc npm run desktop:build:win
 */
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const staging = path.join(root, '.desktop-staging');
const distSrc = path.join(root, 'dist');
const mainSrc = path.join(root, 'electron-main.cjs');
const pkgRoot = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

const extraArgs = process.argv.slice(2);

if (!fs.existsSync(distSrc)) {
  console.error('Thiếu thư mục dist/. Chạy trước: npm run desktop:export');
  process.exit(1);
}
if (!fs.existsSync(mainSrc)) {
  console.error('Thiếu electron-main.cjs ở thư mục gốc dự án.');
  process.exit(1);
}

fs.rmSync(staging, { recursive: true, force: true });
fs.mkdirSync(staging, { recursive: true });
fs.cpSync(distSrc, path.join(staging, 'dist'), { recursive: true });
fs.copyFileSync(mainSrc, path.join(staging, 'electron-main.cjs'));

const miniPkg = {
  name: 'cdss-bhyt-desktop-shell',
  version: pkgRoot.version || '1.0.0',
  description: pkgRoot.description || 'CDSS BHYT desktop shell',
  author: pkgRoot.author || '',
  main: 'electron-main.cjs',
  private: true,
};
fs.writeFileSync(path.join(staging, 'package.json'), `${JSON.stringify(miniPkg, null, 2)}\n`);

/**
 * Ghi artifact ra thư mục TEMP (ngoài Google Drive) để tránh EPERM / khóa file khi Drive đồng bộ.
 * Có thể ghi đè bằng biến môi trường CDSS_RELEASE_OUT (đường dẫn tuyệt đối).
 */
const releaseOutDir = process.env.CDSS_RELEASE_OUT
  ? path.resolve(process.env.CDSS_RELEASE_OUT)
  : path.join(os.tmpdir(), 'cdss-bhyt-release-desktop');
if (fs.existsSync(releaseOutDir)) {
  fs.rmSync(releaseOutDir, { recursive: true, force: true });
}
fs.mkdirSync(releaseOutDir, { recursive: true });
console.log(`[stage_desktop_pack] Thư mục output (artifact): ${releaseOutDir}\n`);

const configPath = path.join(root, 'electron-builder.desktop.yml');
const filteredArgs = extraArgs.filter((a) => a !== '--');
const outJson = JSON.stringify(releaseOutDir);
const cmd = `npx electron-builder --projectDir "${staging}" --config "${configPath}" --config.directories.output=${outJson} ${filteredArgs.join(' ')}`.trim();
console.log(`electron-builder (projectDir=.desktop-staging): ${cmd}\n`);
execSync(cmd, {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, CSC_IDENTITY_AUTO_DISCOVERY: 'false' },
});
