'use strict';

/**
 * Một file .exe (pkg): chứa sẵn toàn bộ dist/ mới — chạy là copy đè lên dist của bản CDSS đã cài.
 * Cần bản ứng dụng đã đóng gói với dist nằm trong resources/app.asar.unpacked/dist (xem electron-builder).
 *
 * Chạy:
 *   CDSS-BHYT-CapNhat-Offline.exe
 *   CDSS-BHYT-CapNhat-Offline.exe --target "C:\\Program Files\\...\\resources\\app.asar.unpacked\\dist"
 *
 * Tùy chọn: --dry-run
 */
const fs = require('fs');
const path = require('path');

const PAYLOAD = path.join(__dirname, 'dist');

const parseArgs = () => {
  const raw = process.argv.slice(2).filter((a) => a !== '--');
  let target = '';
  let dry = false;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '--target' && raw[i + 1]) target = path.resolve(raw[++i]);
    else if (raw[i] === '--dry-run') dry = true;
  }
  return { target, dry };
};

const timDistMacDinh = () => {
  const exeDir = path.dirname(process.execPath);
  const tries = [
    path.join(exeDir, 'resources', 'app.asar.unpacked', 'dist'),
    path.join(process.cwd(), 'resources', 'app.asar.unpacked', 'dist'),
  ];
  for (const t of tries) {
    if (fs.existsSync(t) && fs.existsSync(path.join(t, 'index.html'))) return t;
  }
  return '';
};

const copyDeQuy = (src, dst, dry) => {
  let n = 0;
  if (!fs.existsSync(src)) throw new Error(`Thiếu payload dist trong file cập nhật: ${src}`);
  fs.mkdirSync(dst, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dst, name);
    const st = fs.lstatSync(s);
    if (st.isDirectory()) {
      n += copyDeQuy(s, d, dry);
    } else {
      if (!dry) {
        fs.mkdirSync(path.dirname(d), { recursive: true });
        fs.copyFileSync(s, d);
      }
      n += 1;
    }
  }
  return n;
};

const saoLuu = (distRoot, dry) => {
  if (dry || !fs.existsSync(distRoot)) return null;
  const parent = path.dirname(path.resolve(distRoot));
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backup = path.join(parent, `dist_CDSS_BACKUP_${stamp}`);
  fs.cpSync(distRoot, backup, { recursive: true });
  return backup;
};

function main() {
  const { target: targetArg, dry } = parseArgs();
  let target = targetArg || timDistMacDinh();

  if (!target) {
    console.error(`
Không tìm thấy thư mục dist của ứng dụng CDSS.

Cách 1 — Đặt file cập nhật cùng thư mục với CDSS-BHYT-Phuong-Chau-*.exe rồi chạy lại.

Cách 2 — Chỉ rõ đường dẫn (thư mục dist trong app đã cài):
  CDSS-BHYT-CapNhat-Offline.exe --target "C:\\...\\resources\\app.asar.unpacked\\dist"
`.trim());
    process.exit(1);
  }

  target = path.resolve(target);
  if (!fs.existsSync(path.join(PAYLOAD, 'index.html'))) {
    console.error(`Payload lỗi: không có ${path.join(PAYLOAD, 'index.html')}`);
    process.exit(1);
  }

  const backup = saoLuu(target, dry);
  if (backup) console.log(`[cap-nhat] Đã sao lưu dist cũ → ${backup}`);
  if (dry) console.log('[cap-nhat] --dry-run: không ghi đĩa.');

  if (!dry && fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
  const n = copyDeQuy(PAYLOAD, target, dry);
  console.log(`[cap-nhat] Xong. Đã ghi ${n} file vào: ${target}`);
  console.log('[cap-nhat] Hãy đóng CDSS (nếu đang mở) rồi mở lại ứng dụng.');
}

main();
