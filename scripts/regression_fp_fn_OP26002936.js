#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = process.cwd();
const doiChieuScript = path.join(root, 'scripts', 'doi_chieu_bao_loi_thuc_te.js');

const claimPath = 'C:/Users/admin/Documents/Google Drive/BHYT/OneDrive_2_3-24-2026/Da kiem tra/Claim_null_SOA-0000001030 (2026).xml';
const reportPath = 'C:/Users/admin/Downloads/Bao_Cao_Vi_Pham_1775224101196.xlsx';

if (!fs.existsSync(doiChieuScript)) {
  console.error(`Missing script: ${doiChieuScript}`);
  process.exit(2);
}

const out = execFileSync('node', [doiChieuScript, claimPath, reportPath], { encoding: 'utf8' });
const m = out.match(/OUT_JSON=(.+)/);
if (!m) {
  console.error('Cannot parse OUT_JSON path from comparator output');
  console.error(out);
  process.exit(3);
}

const outJsonPath = m[1].trim();
if (!fs.existsSync(outJsonPath)) {
  console.error(`Missing result JSON: ${outJsonPath}`);
  process.exit(4);
}

const data = JSON.parse(fs.readFileSync(outJsonPath, 'utf8'));
const rows = Array.isArray(data.rows) ? data.rows : [];
const summary = data?.meta?.summary || {};

const expectedSummary = {
  NGHI_DUONG_TINH_GIA: 16,
  CAN_XAC_MINH_THEM: 15,
  HOP_LY: 6,
};

const fail = [];
for (const [k, v] of Object.entries(expectedSummary)) {
  if ((summary[k] || 0) !== v) {
    fail.push(`Summary mismatch ${k}: expected ${v}, got ${summary[k] || 0}`);
  }
}

const expectAllRowsVerdict = (maLuat, verdict) => {
  const found = rows.filter((r) => String(r.MA_LUAT || '').toUpperCase() === maLuat.toUpperCase());
  if (!found.length) {
    fail.push(`Missing rule in output: ${maLuat}`);
    return;
  }
  const wrong = found.filter((r) => String(r.KET_QUA_DOI_CHIEU || '').toUpperCase() !== verdict.toUpperCase());
  if (wrong.length) {
    fail.push(`Rule ${maLuat} expected ${verdict} but got ${[...new Set(wrong.map((r) => r.KET_QUA_DOI_CHIEU))].join(', ')}`);
  }
};

expectAllRowsVerdict('XML_81', 'NGHI_DUONG_TINH_GIA');
expectAllRowsVerdict('XML_139', 'NGHI_DUONG_TINH_GIA');
expectAllRowsVerdict('CK_42', 'NGHI_DUONG_TINH_GIA');
expectAllRowsVerdict('CDHA_204', 'NGHI_DUONG_TINH_GIA');
expectAllRowsVerdict('CDHA_284', 'NGHI_DUONG_TINH_GIA');
expectAllRowsVerdict('GB_26', 'NGHI_DUONG_TINH_GIA');
expectAllRowsVerdict('HC_238', 'NGHI_DUONG_TINH_GIA');
expectAllRowsVerdict('HD_10', 'NGHI_DUONG_TINH_GIA');
expectAllRowsVerdict('DVKT_1634', 'NGHI_DUONG_TINH_GIA');
expectAllRowsVerdict('GB_75', 'HOP_LY');
expectAllRowsVerdict('HC_62', 'HOP_LY');

if (fail.length) {
  console.error('REGRESSION FAILED');
  fail.forEach((x) => console.error(`- ${x}`));
  console.error(`Result JSON: ${outJsonPath}`);
  process.exit(1);
}

console.log('REGRESSION PASSED');
console.log(`Result JSON: ${outJsonPath}`);
console.log(`Summary: ${JSON.stringify(summary)}`);
