/**
 * Áp gói cập nhật offline (zip do build_offline_update_pack.mjs sinh) lên thư mục dist đã triển khai
 * (máy chủ nội bộ, bản copy USB, v.v.) — không cần cài lại bản Electron đầy đủ.
 *
 * Dùng:
 *   node scripts/apply_offline_update.mjs -- --zip path/to/update.zip --dist "D:\\nginx\\html\\cdss"
 *   npm run desktop:apply-offline-update -- --zip path/to/update.zip --dist "D:\\deploy\\dist"
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parseArgs = () => {
  const raw = process.argv.slice(2).filter((a) => a !== '--');
  let zip = '';
  let dist = '';
  let dry = false;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '--zip' && raw[i + 1]) zip = path.resolve(raw[++i]);
    else if (raw[i] === '--dist' && raw[i + 1]) dist = path.resolve(raw[++i]);
    else if (raw[i] === '--dry-run') dry = true;
  }
  return { zip, dist, dry };
};

const main = () => {
  const { zip, dist, dry } = parseArgs();
  if (!zip || !dist) {
    console.error('Thiếu tham số. Ví dụ:\n  node scripts/apply_offline_update.mjs -- --zip ./offline_update_packs/foo.zip --dist "D:\\\\path\\\\to\\\\dist"');
    process.exit(1);
  }
  if (!fs.existsSync(zip)) {
    console.error(`Không tìm thấy file zip: ${zip}`);
    process.exit(1);
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cdss-offline-up-'));
  const adm = new AdmZip(zip);
  adm.extractAllTo(tmp, true);

  const manifestPath = path.join(tmp, 'UPDATE_MANIFEST.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('Zip không có UPDATE_MANIFEST.json — không phải gói CDSS offline hợp lệ.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const innerDist = path.join(tmp, 'dist');

  fs.mkdirSync(dist, { recursive: true });

  const removed = Array.isArray(manifest.removed) ? manifest.removed : [];
  let copied = 0;
  let deleted = 0;

  const walkCopy = (dir, base = '') => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = base ? `${base}/${ent.name}` : ent.name;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walkCopy(full, rel);
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

  if (dry) {
    console.log('[apply-offline] --dry-run: không ghi đĩa.');
  }

  if (fs.existsSync(innerDist)) {
    walkCopy(innerDist);
  } else {
    console.log('[apply-offline] Zip không có thư mục dist/ (chỉ cập nhật manifest / xóa file cũ).');
  }

  for (const rel of removed) {
    const target = path.join(dist, rel.replace(/\\/g, '/'));
    if (fs.existsSync(target)) {
      if (!dry) fs.unlinkSync(target);
      deleted += 1;
    }
  }

  console.log(`[apply-offline] Đã áp dụng cập nhật → ${dist}`);
  console.log(`[apply-offline] Manifest: ${manifest.fromVersion || '?'} → ${manifest.toVersion || '?'} (${manifest.builtAt || ''})`);
  console.log(`[apply-offline] Sao chép file: ${copied}, Xóa file theo manifest: ${deleted}`);

  fs.rmSync(tmp, { recursive: true, force: true });
};

main();
