/**
 * Tạo MỘT file exe chứa sẵn toàn bộ dist/ hiện tại — không cần zip riêng.
 * Chạy: npm run desktop:build-simple-update
 */
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const scriptSrc = path.join(__dirname, 'cdss_bundled_update.cjs');
const outExe = path.join(root, 'tai_nguyen', 'CDSS-BHYT-CapNhat-Offline.exe');

const main = () => {
  console.log('[build-simple-update] 1/3 desktop:export...\n');
  execSync('npm run desktop:export', { cwd: root, stdio: 'inherit' });

  const distSrc = path.join(root, 'dist');
  if (!fs.existsSync(path.join(distSrc, 'index.html'))) {
    console.error('[build-simple-update] Thiếu dist/index.html sau export.');
    process.exit(1);
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cdss-capnhat-'));
  const pkgRoot = path.join(tmp, 'pkg-capnhat');
  fs.mkdirSync(pkgRoot, { recursive: true });
  fs.copyFileSync(scriptSrc, path.join(pkgRoot, 'cdss_bundled_update.cjs'));
  fs.cpSync(distSrc, path.join(pkgRoot, 'dist'), { recursive: true });

  const miniPkg = {
    name: 'cdss-capnhat-bundled',
    version: '1.0.0',
    private: true,
    main: 'cdss_bundled_update.cjs',
    bin: 'cdss_bundled_update.cjs',
    pkg: {
      assets: ['dist/**/*'],
      targets: ['node18-win-x64'],
    },
  };
  fs.writeFileSync(path.join(pkgRoot, 'package.json'), `${JSON.stringify(miniPkg, null, 2)}\n`);

  console.log('\n[build-simple-update] 2/3 pkg (có thể vài phút)...\n');
  const cmd = `npx --yes pkg@5.8.1 . -t node18-win-x64 -o "${outExe}"`;
  execSync(cmd, { cwd: pkgRoot, stdio: 'inherit', shell: true, env: process.env });

  fs.rmSync(tmp, { recursive: true, force: true });

  console.log(`\n[build-simple-update] 3/3 Xong → ${outExe}`);
  console.log('[build-simple-update] Gửi file .exe này cho máy offline; đặt cạnh CDSS-BHYT-Phuong-Chau-*.exe rồi chạy (hoặc dùng --target).');
};

main();
