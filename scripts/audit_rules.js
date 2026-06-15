#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rulesPath = path.join(__dirname, '../ma_nguon/tien_ich');
const reportPath = path.join(__dirname, '../test_xml/rule_audit_report.json');

const ruleFiles = [
  'luat_du_lieu_hardcoded.jsx',
  'luat_hanh_chinh_hardcoded.jsx',
  'luat_thuoc_hardcoded.jsx',
  'luat_cdha_hardcoded.jsx',
  'luat_cong_kham_hardcoded.jsx',
  'luat_nhan_su_hardcoded.jsx',
  'luat_giuong_hardcoded.jsx',
  'luat_hop_dong_hardcoded.jsx',
  'luat_giam_dinh_chuyen_de_hardcoded.jsx',
];

const normalizeText = (value) => String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');

const extractByRegex = (content, regex) => {
  const out = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    out.push(String(match[1] || '').trim());
  }
  return out;
};

const extractRulesFromFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');

  const maList = extractByRegex(content, /MA_LUAT:\s*'([^']+)'/g);
  const tenList = extractByRegex(content, /TEN_QUY_TAC:\s*`([\s\S]*?)`\s*,\s*DIEU_KIEN:/g);
  const dkList = extractByRegex(content, /DIEU_KIEN:\s*`([\s\S]*?)`\s*,\s*CANH_BAO:/g);
  const cbList = extractByRegex(content, /CANH_BAO:\s*`([\s\S]*?)`\s*,\s*TRANG_THAI:/g);
  const ttList = extractByRegex(content, /TRANG_THAI:\s*'([^']+)'/g);

  const minLen = Math.min(maList.length, tenList.length, dkList.length, cbList.length, ttList.length);
  const rules = [];
  for (let i = 0; i < minLen; i += 1) {
    const rule = {
      file: path.basename(filePath),
      MA_LUAT: maList[i],
      TEN_QUY_TAC: tenList[i],
      DIEU_KIEN: dkList[i],
      CANH_BAO: cbList[i],
      TRANG_THAI: normalizeText(ttList[i] || 'ON'),
    };
    rule.signature = [rule.TEN_QUY_TAC, rule.DIEU_KIEN, rule.CANH_BAO].map(normalizeText).join('||');
    rules.push(rule);
  }
  return rules;
};

console.log('Rà soát tất cả rule từ 9 file hardcoded...\n');

const allRules = [];
const rulesByFile = {};

for (const file of ruleFiles) {
  const filePath = path.join(rulesPath, file);
  if (!fs.existsSync(filePath)) continue;
  const rules = extractRulesFromFile(filePath);
  rulesByFile[file] = rules;
  allRules.push(...rules);
  console.log(`- ${file}: ${rules.length} rule`);
}

const byMa = new Map();
const bySignature = new Map();
for (const rule of allRules) {
  const keyMa = normalizeText(rule.MA_LUAT);
  const keySignature = rule.signature;
  if (!byMa.has(keyMa)) byMa.set(keyMa, []);
  if (!bySignature.has(keySignature)) bySignature.set(keySignature, []);
  byMa.get(keyMa).push(rule);
  bySignature.get(keySignature).push(rule);
}

const duplicateMa = [...byMa.entries()].filter(([, list]) => list.length > 1);
const duplicateSignature = [...bySignature.entries()].filter(([, list]) => list.length > 1);

const trashRules = allRules.filter((r) => {
  return !r.MA_LUAT || !r.TEN_QUY_TAC || !r.DIEU_KIEN || !r.CANH_BAO || normalizeText(r.CANH_BAO).length < 12;
});

const likelyFpRules = allRules.filter((r) => {
  const alert = normalizeText(r.CANH_BAO);
  const condition = normalizeText(r.DIEU_KIEN);
  const isSoftWarn = alert.includes('CANH BAO LOI') || alert.includes('KIEM TRA') || alert.includes('LOGIC');
  const hasHeuristic = /CHECK_|MATCH_|INCLUDES\(|TEXT_SEARCH\(|COUNT_/.test(condition);
  return r.TRANG_THAI === 'ON' && isSoftWarn && hasHeuristic;
});

console.log('\nTổng rule:', allRules.length);
console.log('Trùng MA_LUAT:', duplicateMa.length);
console.log('Trùng nội dung:', duplicateSignature.length);
console.log('Rule rác/rỗng:', trashRules.length);
console.log('Rule nghi ngờ dương tính giả (heuristic):', likelyFpRules.length);

const previewFp = likelyFpRules.slice(0, 40).map((r) => r.MA_LUAT);
if (previewFp.length > 0) {
  console.log('\nDanh sách MA_LUAT FP nghi ngờ (preview):');
  console.log(previewFp.join(', '));
}

const report = {
  timestamp: new Date().toISOString(),
  totalRules: allRules.length,
  fileStats: Object.fromEntries(Object.entries(rulesByFile).map(([k, v]) => [k, v.length])),
  duplicateMaCount: duplicateMa.length,
  duplicateSignatureCount: duplicateSignature.length,
  trashRulesCount: trashRules.length,
  likelyFpRulesCount: likelyFpRules.length,
  duplicateMaDetails: duplicateMa.map(([ma, list]) => ({ ma, files: list.map((r) => r.file) })),
  duplicateSignatureDetails: duplicateSignature.map(([sig, list]) => ({
    signaturePreview: sig.slice(0, 120),
    maLuatList: list.map((r) => r.MA_LUAT),
  })),
  trashRules: trashRules.map((r) => ({ file: r.file, maLuat: r.MA_LUAT })),
  likelyFpRules: likelyFpRules.map((r) => ({ file: r.file, maLuat: r.MA_LUAT })),
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`\nĐã lưu báo cáo: ${reportPath}`);
