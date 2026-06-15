/**
 * Audit hiệu lực quy tắc tương tác thuốc (XML2): chạy claim audit lên fixture AUDIT_TUONGTAC_001.xml
 * và kiểm tra có cảnh báo mã TUONGTAC_001 (seed cặp 40.558 + 40.671).
 *
 * Chạy: node scripts/qa_tuong_tac_audit.mjs
 * Hoặc: npm run qa:tuong-tac-audit
 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FIXTURE = path.join(ROOT, 'test_xml', 'huan_luyen', 'AUDIT_TUONGTAC_001.xml');
const OUT = path.join(ROOT, 'test_xml', 'audit_AUDIT_TUONGTAC_001_last.json');
const RUNNER = path.join(ROOT, 'scripts', 'run_claim_audit.js');
function main() {
  if (!fs.existsSync(FIXTURE)) {
    console.error(`[qa:tuong-tac-audit] Thiếu fixture: ${FIXTURE}`);
    process.exit(1);
  }
  const node = process.execPath;
  const args = [RUNNER, FIXTURE, `--out=${OUT}`, '--focus=TUONGTAC_001'];
  const r = spawnSync(node, args, {
    cwd: ROOT,
    encoding: 'utf8',
    shell: false,
    stdio: 'inherit',
  });
  if (r.status !== 0) {
    console.error('[qa:tuong-tac-audit] claim-audit thất bại.');
    process.exit(r.status || 1);
  }
  if (!fs.existsSync(OUT)) {
    console.error(`[qa:tuong-tac-audit] Không tạo được: ${OUT}`);
    process.exit(1);
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  } catch (e) {
    console.error('[qa:tuong-tac-audit] JSON không đọc được:', e.message);
    process.exit(1);
  }
  const codes = Array.isArray(data.unique_rule_codes) ? data.unique_rule_codes : [];
  const focus = data.meta?.focus_summary?.TUONGTAC_001;
  const hasCode = codes.some((c) => String(c).toUpperCase() === 'TUONGTAC_001');
  const hits = typeof focus === 'number' ? focus : (data.warnings || []).filter(
    (w) => String(w?.ma_luat || '').toUpperCase() === 'TUONGTAC_001',
  ).length;

  if (!hasCode || hits < 1) {
    console.error('[qa:tuong-tac-audit] Kỳ vọng ít nhất 1 cảnh báo ma_luat TUONGTAC_001.');
    console.error(`  unique_rule_codes: ${JSON.stringify(codes)}`);
    console.error(`  focus TUONGTAC_001: ${focus}`);
    process.exit(1);
  }
  console.log(`[qa:tuong-tac-audit] OK — TUONGTAC_001 xuất hiện (${hits} lần theo focus). Snapshot: ${OUT}`);
}

main();
