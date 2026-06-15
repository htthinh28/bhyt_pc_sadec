'use strict';

/**
 * Áp gói cập nhật offline CDSS (zip) lên thư mục dist đang triển khai.
 * Mặc định: sao lưu toàn bộ thư mục dist hiện tại sang thư mục cạnh đó (…_CDSS_BACKUP_<timestamp>)
 * trước khi ghi đè — giảm rủi ro mất file đang phục vụ.
 *
 * Chạy bằng Node:
 *   node scripts/cdss_apply_update.cjs --zip "C:\path\update.zip" --dist "D:\path\to\dist"
 *
 * Bản .exe (pkg): cùng tham số, hoặc chạy không tham số để nhập tương tác.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const AdmZip = require('adm-zip');

const logLine = (msg, logPath) => {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  if (logPath) {
    try {
      fs.appendFileSync(logPath, line, 'utf8');
    } catch {
      /* ignore */
    }
  }
  process.stdout.write(line);
};

const parseArgs = () => {
  const raw = process.argv.slice(2).filter((a) => a !== '--');
  let zip = '';
  let dist = '';
  let dry = false;
  let noBackup = false;
  let help = false;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '--zip' && raw[i + 1]) zip = path.resolve(raw[++i]);
    else if (raw[i] === '--dist' && raw[i + 1]) dist = path.resolve(raw[++i]);
    else if (raw[i] === '--dry-run') dry = true;
    else if (raw[i] === '--no-backup') noBackup = true;
    else if (raw[i] === '--help' || raw[i] === '-h') help = true;
  }
  return { zip, dist, dry, noBackup, help };
};

const saoLuuDist = (distRoot, dry, noBackup, logPath) => {
  if (noBackup || dry) {
    logLine(noBackup ? '[cdss-update] Bỏ qua sao lưu (--no-backup).' : '[cdss-update] dry-run: không sao lưu.', logPath);
    return null;
  }
  if (!fs.existsSync(distRoot)) {
    logLine('[cdss-update] Thư mục dist đích chưa tồn tại — không có gì để sao lưu.', logPath);
    return null;
  }
  const parent = path.dirname(path.resolve(distRoot));
  const base = path.basename(distRoot);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupPath = path.join(parent, `${base}_CDSS_BACKUP_${stamp}`);
  try {
    fs.mkdirSync(parent, { recursive: true });
    fs.cpSync(distRoot, backupPath, { recursive: true });
    logLine(`[cdss-update] Đã sao lưu: ${distRoot} → ${backupPath}`, logPath);
    return backupPath;
  } catch (e) {
    logLine(`[cdss-update] LỖI sao lưu: ${e?.message || e}`, logPath);
    throw e;
  }
};

const walkCopy = (dir, dist, dry) => {
  let copied = 0;
  const go = (d, base = '') => {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const rel = base ? `${base}/${ent.name}` : ent.name;
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) {
        go(full, rel);
      } else {
        const target = path.join(dist, rel);
        if (!dry) {
          fs.mkdirSync(path.dirname(target), { recursive: true });
          fs.copyFileSync(full, target);
        }
        copied += 1;
      }
    }
  };
  go(dir);
  return copied;
};

const applyZip = ({ zip, dist, dry, logPath }) => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cdss-offline-up-'));
  const adm = new AdmZip(zip);
  adm.extractAllTo(tmp, true);

  const manifestPath = path.join(tmp, 'UPDATE_MANIFEST.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('Zip không có UPDATE_MANIFEST.json — không phải gói CDSS offline hợp lệ.');
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const innerDist = path.join(tmp, 'dist');
  fs.mkdirSync(dist, { recursive: true });

  const removed = Array.isArray(manifest.removed) ? manifest.removed : [];
  let copied = 0;
  let deleted = 0;

  if (fs.existsSync(innerDist)) {
    copied = walkCopy(innerDist, dist, dry);
  } else {
    logLine('[cdss-update] Zip không có thư mục dist/ (chỉ xóa file cũ theo manifest).', logPath);
  }

  for (const rel of removed) {
    const target = path.join(dist, rel.replace(/\\/g, '/'));
    if (fs.existsSync(target)) {
      if (!dry) fs.unlinkSync(target);
      deleted += 1;
    }
  }

  logLine(
    `[cdss-update] Hoàn tất → ${dist} | manifest ${manifest.fromVersion || '?'} → ${manifest.toVersion || '?'} | copy: ${copied} | xóa: ${deleted}`,
    logPath,
  );

  fs.rmSync(tmp, { recursive: true, force: true });
};

const hoiTuongTac = () =>
  new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ask = (q) =>
      new Promise((r) => {
        rl.question(q, r);
      });
    (async () => {
      const zip = (await ask('Đường dẫn file zip cập nhật: ')).trim().replace(/^["']|["']$/g, '');
      const dist = (await ask('Thư mục dist đang chạy (đích): ')).trim().replace(/^["']|["']$/g, '');
      rl.close();
      resolve({ zip: path.resolve(zip), dist: path.resolve(dist) });
    })();
  });

const inRaHuongDan = () => {
  console.log(`
CDSS BHYT — áp gói cập nhật offline (zip) lên thư mục dist đang triển khai.

Dùng:
  CDSS-BHYT-ApDungCapNhat-Offline.exe --zip "<file.zip>" --dist "<thư_mục_dist>"
  node scripts/cdss_apply_update.cjs --zip "<file.zip>" --dist "<thư_mục_dist>"

Tùy chọn:
  --dry-run      Chỉ mô phỏng, không ghi đĩa
  --no-backup    Không sao lưu thư mục dist trước khi vá (mặc định: có sao lưu)
  -h, --help     Hiển thị dòng này

Sao lưu: toàn bộ thư mục dist được copy sang thư mục cạnh đó
  <tên_dist>_CDSS_BACKUP_<timestamp>
Nhật ký: cdss_last_update_log.txt cạnh thư mục cha của dist.

Lưu ý: dữ liệu trình duyệt (IndexedDB, v.v.) không nằm trong dist — chỉ vá file tĩnh.
Nếu dist nằm trong Program Files, có thể cần chạy .exe với quyền quản trị viên.
`.trim());
};

async function main() {
  let { zip, dist, dry, noBackup, help } = parseArgs();
  if (help) {
    inRaHuongDan();
    process.exit(0);
  }

  if (!zip || !dist) {
    try {
      const t = await hoiTuongTac();
      zip = t.zip;
      dist = t.dist;
    } catch {
      console.error('Cần: --zip <file.zip> --dist <thư_mục_dist>');
      process.exit(1);
    }
  }

  if (!zip || !dist) {
    console.error('Thiếu --zip hoặc --dist.');
    process.exit(1);
  }
  if (!fs.existsSync(zip)) {
    console.error(`Không tìm thấy: ${zip}`);
    process.exit(1);
  }

  const logReal = path.join(path.dirname(path.resolve(dist)), 'cdss_last_update_log.txt');

  try {
    saoLuuDist(dist, dry, noBackup, logReal);
    applyZip({ zip, dist, dry, logPath: logReal });
    logLine('[cdss-update] Xong.', logReal);
  } catch (e) {
    logLine(`[cdss-update] THẤT BẠI: ${e?.message || e}`, logReal);
    console.error(e);
    process.exit(1);
  }
}

main();
