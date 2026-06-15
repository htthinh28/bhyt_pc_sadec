/**
 * Đóng gói CDSS-BHYT-ApDungCapNhat-Offline.exe (Node → exe qua pkg).
 * Cần: npm install (có adm-zip). Chạy trên Windows.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outExe = path.join(root, 'tai_nguyen', 'CDSS-BHYT-ApDungCapNhat-Offline.exe');
const entry = path.join(root, 'scripts', 'cdss_apply_update.cjs');

fs.mkdirSync(path.dirname(outExe), { recursive: true });

const cmd = `npx --yes pkg@5.8.1 "${entry}" -t node18-win-x64 -o "${outExe}"`;
console.log('[build_cdss_update_exe]', cmd);
execSync(cmd, { stdio: 'inherit', cwd: root, shell: true, env: process.env });
console.log('[build_cdss_update_exe] Xong →', outExe);
