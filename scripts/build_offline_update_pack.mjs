/**
 * Đóng gói cập nhật offline (delta) cho bản web export `dist/` so với lần đóng gói trước
 * (so khớp SHA-256 từng file trong scripts/offline_pack_state.json).
 *
 * Luồng:
 * 1) (Mặc định) chạy `npm run desktop:export` để sinh dist/ mới nhất.
 * 2) So sánh với snapshot cũ → chỉ đóng gói file thêm / đổi / xóa.
 * 3) Ghi zip + UPDATE_MANIFEST.json; cập nhật snapshot cho lần sau.
 *
 * Lần đầu (chưa có snapshot): đóng gói TOÀN BỘ dist/ (coi như baseline).
 *
 * Dùng:
 *   node scripts/build_offline_update_pack.mjs
 *   node scripts/build_offline_update_pack.mjs -- --no-export
 *   npm run desktop:pack:offline-delta
 */
import { createHash } from 'crypto';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const statePath = path.join(__dirname, 'offline_pack_state.json');
const outDirDefault = path.join(root, 'offline_update_packs');

const hashBuffer = (buf) => createHash('sha256').update(buf).digest('hex');

const walkFiles = (dir, baseRel = '') => {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = baseRel ? `${baseRel}/${ent.name}` : ent.name;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...walkFiles(full, rel));
    } else if (ent.isFile()) {
      const buf = fs.readFileSync(full);
      out.push({
        rel: rel.replace(/\\/g, '/'),
        sha256: hashBuffer(buf),
        size: buf.length,
      });
    }
  }
  return out;
};

const toMap = (arr) => {
  const m = new Map();
  for (const x of arr) m.set(x.rel, x);
  return m;
};

const parseArgs = () => {
  const raw = process.argv.slice(2).filter((a) => a !== '--');
  let noExport = false;
  let outDir = outDirDefault;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '--no-export') noExport = true;
    else if (raw[i] === '--out' && raw[i + 1]) {
      outDir = path.resolve(raw[++i]);
    }
  }
  return { noExport, outDir };
};

const loadState = () => {
  if (!fs.existsSync(statePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(statePath, 'utf8'));
  } catch {
    return null;
  }
};

const main = () => {
  const { noExport, outDir } = parseArgs();
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const versionTo = String(pkg.version || '0.0.0').trim();

  if (!noExport) {
    console.log('[offline-delta] Chạy desktop:export...\n');
    execSync('npm run desktop:export', { cwd: root, stdio: 'inherit' });
  }

  if (!fs.existsSync(distDir)) {
    console.error('[offline-delta] Thiếu thư mục dist/. Chạy: npm run desktop:export');
    process.exit(1);
  }

  const currentList = walkFiles(distDir);
  const currentMap = toMap(currentList);
  const state = loadState();
  const prevMap = state?.files && typeof state.files === 'object'
    ? new Map(Object.entries(state.files).map(([rel, meta]) => [rel, meta]))
    : new Map();

  const versionFrom = state?.version || null;

  const added = [];
  const changed = [];
  const removed = [];

  for (const [rel, cur] of currentMap) {
    const p = prevMap.get(rel);
    if (!p) added.push(rel);
    else if (p.sha256 !== cur.sha256) changed.push(rel);
  }
  for (const rel of prevMap.keys()) {
    if (!currentMap.has(rel)) removed.push(rel);
  }

  const touchSet = new Set([...added, ...changed]);
  const isFull = prevMap.size === 0;

  console.log(`[offline-delta] dist: ${currentList.length} file(s). Trước: ${prevMap.size} file(s).`);
  console.log(`[offline-delta] Thêm: ${added.length}, Đổi: ${changed.length}, Xóa: ${removed.length}${isFull ? ' (baseline đầy đủ — chưa có snapshot)' : ''}`);

  const manifest = {
    schema: 'cdss-offline-update/1',
    fromVersion: versionFrom,
    toVersion: versionTo,
    builtAt: new Date().toISOString(),
    isFullPack: isFull,
    counts: {
      totalInDist: currentList.length,
      added: added.length,
      changed: changed.length,
      removed: removed.length,
      packed: touchSet.size,
    },
    removed,
    packedFiles: [...touchSet].sort((a, b) => a.localeCompare(b, 'vi')),
  };

  fs.mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const safeFrom = (versionFrom || 'none').replace(/[^\d.a-zA-Z-]/g, '_');
  const zipName = `CDSS-BHYT-offline-update_${safeFrom}_to_${versionTo}_${stamp}.zip`;
  const zipPath = path.join(outDir, zipName);

  if (touchSet.size === 0 && removed.length === 0) {
    console.log('\n[offline-delta] Không có thay đổi so với snapshot — không tạo file zip mới.');
    return;
  }

  const zipOut = new AdmZip();
  zipOut.addFile('UPDATE_MANIFEST.json', Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`, 'utf8'));
  for (const rel of touchSet) {
    const full = path.join(distDir, rel);
    const buf = fs.readFileSync(full);
    zipOut.addFile(`dist/${rel}`.replace(/\\/g, '/'), buf);
  }
  zipOut.writeZip(zipPath);

  const newState = {
    version: versionTo,
    savedAt: new Date().toISOString(),
    files: Object.fromEntries(
      currentList.map((x) => [x.rel, { sha256: x.sha256, size: x.size }]),
    ),
  };
  fs.writeFileSync(statePath, `${JSON.stringify(newState, null, 2)}\n`, 'utf8');

  console.log(`\n[offline-delta] Đã ghi snapshot: ${path.relative(root, statePath)}`);
  console.log(`[offline-delta] Gói cập nhật: ${zipPath}`);
  console.log('[offline-delta] Triển khai: máy chủ nội bộ giải nén hoặc dùng: npm run desktop:apply-offline-update -- --zip <file> --dist <thư_mục_dist_đang_chạy>');
};

main();
