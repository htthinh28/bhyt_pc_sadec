/**
 * Kiểm thử batch hồ sơ trong tai_nguyen/177 - 04032026 và cập nhật mục "Kết quả run gần nhất"
 * trong tai_lieu/Tri_thuc_bo_177_04_2026_pipeline_giam_dinh_AI.md (tri thức cho Thư viện / AI).
 *
 * Chạy: npm run qa:claim-audit-177
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIR_177 = path.join(ROOT, 'tai_nguyen', '177 - 04032026');
const MD_TRI_THUC = path.join(ROOT, 'tai_lieu', 'Tri_thuc_bo_177_04_2026_pipeline_giam_dinh_AI.md');
const MARKER_START = '<!-- AUTO_AUDIT_177_START -->';
const MARKER_END = '<!-- AUTO_AUDIT_177_END -->';

const listXmlOneLevel = (dir) => {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && String(d.name).toLowerCase().endsWith('.xml'))
    .map((d) => path.join(dir, d.name));
};

const pad = (n) => String(n).padStart(2, '0');
const stamp = () => {
  const d = new Date();
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
};

const topEntries = (obj, limit = 40) => {
  if (!obj || typeof obj !== 'object') return [];
  return Object.entries(obj)
    .sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0))
    .slice(0, limit);
};

const buildAutoSection = ({ auditPath, meta, ruleSummary }) => {
  const iso = new Date().toISOString();
  const lines = [
    MARKER_START,
    '',
    `- **Thời điểm:** ${iso}`,
    `- **Thư mục XML:** \`tai_nguyen/177 - 04032026\``,
    `- **File kết quả:** \`${path.relative(ROOT, auditPath).replace(/\\/g, '/')}\``,
    `- **Tổng cảnh báo:** ${meta?.total_warnings ?? '—'}`,
    `- **Theo mức độ:** \`${JSON.stringify(meta?.by_severity || {})}\``,
    '',
    '### Top mã quy tắc (theo số lần)',
    '',
    '| Mã luật | Số lần |',
    '|----------|--------|',
  ];
  for (const [k, v] of topEntries(ruleSummary, 50)) {
    lines.push(`| \`${String(k).replace(/`/g, "'")}\` | ${v} |`);
  }
  lines.push('', MARKER_END);
  return lines.join('\n');
};

const patchMarkdown = (sectionMd) => {
  if (!fs.existsSync(MD_TRI_THUC)) {
    console.warn('[177] Khong tim thay:', MD_TRI_THUC);
    return;
  }
  let raw = fs.readFileSync(MD_TRI_THUC, 'utf8');
  if (raw.includes(MARKER_START) && raw.includes(MARKER_END)) {
    raw = raw.replace(new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`, 'm'), sectionMd);
  } else {
    raw = raw.replace(
      /## Kết quả run gần nhất[\s\S]*$/m,
      `## Kết quả run gần nhất\n\n${sectionMd}\n`,
    );
  }
  fs.writeFileSync(MD_TRI_THUC, raw, 'utf8');
};

const main = () => {
  const xmlFiles = listXmlOneLevel(DIR_177);
  if (xmlFiles.length === 0) {
    console.warn('[qa:claim-audit-177] Chua co file .xml trong:', DIR_177);
    console.warn('  -> Xem huong dan: tai_nguyen/177 - 04032026/README.md');
    const section = [
      MARKER_START,
      '',
      `_Chưa chạy audit: không có file *.xml trong thư mục (chỉ có metadata hoặc rỗng)._`,
      '',
      MARKER_END,
    ].join('\n');
    patchMarkdown(section);
    process.exit(0);
  }

  const outName = `audit_thu_muc_177_${stamp()}.json`;
  const outPath = path.join(ROOT, 'test_xml', outName);
  const dirArg = `--dir=${DIR_177}`;
  const outArg = `--out=${outPath}`;

  const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'run_claim_audit.js'), dirArg, outArg], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
    shell: false,
  });
  if (r.status !== 0) {
    console.error('[qa:claim-audit-177] run_claim_audit thất bại, mã:', r.status);
    process.exit(r.status || 1);
  }

  if (!fs.existsSync(outPath)) {
    console.error('[qa:claim-audit-177] Không thấy file output:', outPath);
    process.exit(2);
  }

  let audit;
  try {
    audit = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  } catch (e) {
    console.error('[qa:claim-audit-177] JSON không đọc được:', e?.message || e);
    process.exit(3);
  }

  const section = buildAutoSection({
    auditPath: outPath,
    meta: audit.meta || {},
    ruleSummary: audit.rule_summary || {},
  });
  patchMarkdown(section);
  console.log('[qa:claim-audit-177] Đã cập nhật:', path.relative(ROOT, MD_TRI_THUC).replace(/\\/g, '/'));
  console.log('[qa:claim-audit-177] Gợi ý: npm run tai_lieu:prepare  (đồng bộ HTML Thư viện)');
};

main();
