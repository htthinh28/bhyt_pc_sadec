/**
 * Đóng gói desktop với phiên bản semver MỚI, không trùng bản đã ghi trong desktop_release_registry.json.
 *
 * Ví dụ:
 *   npm run release-desktop -- --win
 *   npm run release-desktop -- --win portable --bump patch
 *   npm run release-desktop -- --win --bump minor
 *   node scripts/release_desktop.mjs -- --linux --bump major --dry-run
 */
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const registryPath = path.join(__dirname, 'desktop_release_registry.json');
const pkgPath = path.join(root, 'package.json');

const bumpSemver = (version, part) => {
  const m = String(version || '0.0.0').trim().match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!m) throw new Error(`Phiên bản không hợp lệ: ${version}`);
  let major = parseInt(m[1], 10);
  let minor = parseInt(m[2], 10);
  let patch = parseInt(m[3], 10);
  if (part === 'major') return `${major + 1}.0.0`;
  if (part === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
};

const parseArgs = () => {
  const raw = process.argv.slice(2).filter((a) => a !== '--');
  let bump = 'minor';
  let dry = false;
  const targets = [];
  /** Tham số bổ sung cho electron-builder (vd: portable, nsis) */
  const passthrough = [];
  for (let i = 0; i < raw.length; i++) {
    const a = raw[i];
    if (a === '--dry-run') dry = true;
    else if (a === '--bump' && raw[i + 1]) {
      bump = raw[++i];
      if (!['patch', 'minor', 'major'].includes(bump)) {
        console.error('--bump phải là patch | minor | major');
        process.exit(1);
      }
    } else if (['--win', '--mac', '--linux'].includes(a)) targets.push(a.replace('--', ''));
    else if (a === 'win' || a === 'mac' || a === 'linux') targets.push(a);
    else if (a === 'portable' || a === 'nsis') passthrough.push(a);
  }
  if (targets.length === 0) targets.push('win');
  return { bump, dry, targets, passthrough };
};

const main = () => {
  const { bump, dry, targets, passthrough } = parseArgs();

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const last = String(registry.lastReleasedVersion || pkg.version || '0.0.0').trim();

  const next = bumpSemver(last, bump);

  console.log(`[release-desktop] lastReleased=${last} → next=${next} (bump=${bump})`);
  console.log(`[release-desktop] targets=${targets.join(', ')} dry=${dry}`);

  if (dry) {
    console.log('[release-desktop] --dry-run: không ghi file, không build.');
    process.exit(0);
  }

  const versionTruoc = String(pkg.version || '').trim();
  pkg.version = next;
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');

  const extra = [...targets.map((t) => `--${t}`), ...passthrough].join(' ');
  const cmd = `npm run desktop:export && node scripts/stage_desktop_pack.mjs -- ${extra}`;
  console.log(`[release-desktop] ${cmd}\n`);

  try {
    execSync(cmd, { cwd: root, stdio: 'inherit', env: { ...process.env, CSC_IDENTITY_AUTO_DISCOVERY: 'false' } });
  } catch (e) {
    pkg.version = versionTruoc;
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
    console.error('\n[release-desktop] Build thất bại — đã khôi phục package.json về', versionTruoc || '(trống)');
    console.error('[release-desktop] Gợi ý: đóng CDSS/Electron, tạm tắt đồng bộ Google Drive nếu cần, rồi chạy lại.');
    process.exit(1);
  }

  registry.lastReleasedVersion = next;
  registry.history = Array.isArray(registry.history) ? registry.history : [];
  registry.history.push({
    version: next,
    date: new Date().toISOString().slice(0, 10),
    note: `Desktop build (${targets.join(', ')})`,
  });
  fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');

  const outGoiY = process.env.CDSS_RELEASE_OUT
    ? path.resolve(process.env.CDSS_RELEASE_OUT)
    : path.join(os.tmpdir(), 'cdss-bhyt-release-desktop');
  console.log(`\n[release-desktop] Xong. Phiên bản: ${next}. Artifact: ${outGoiY}`);
  console.log('[release-desktop] Gợi ý cập nhật offline (delta dist/): npm run desktop:pack:offline-delta');
};

main();
