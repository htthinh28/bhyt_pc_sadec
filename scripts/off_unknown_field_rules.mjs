#!/usr/bin/env node
/**
 * Tắt (TRANG_THAI -> OFF) các quy tắc có tham chiếu XMLn.FIELD không thuộc schema QĐ 3176
 * (giống logic scripts/audit_rules_xml_schema.mjs).
 *
 * Sửa trực tiếp file seed JSON (du_lieu_luat_*.jsx) và file hardcoded (DIEU_KIEN dạng backtick).
 *
 * Usage:
 *   node scripts/off_unknown_field_rules.mjs           # ghi file + báo cáo
 *   node scripts/off_unknown_field_rules.mjs --dry-run # chỉ in danh sách
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SCHEMA_DIR = path.join(ROOT, 'ma_nguon', 'quy_tac', 'quyluat_cautrucdulieu');

const DRY = process.argv.includes('--dry-run');

const JSON_SEED_FILES = [
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'du_lieu_luat_du_lieu_muc1.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'du_lieu_luat_thuoc_muc8.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'du_lieu_luat_hanh_chinh_muc2.jsx'),
];

const HARDCODED_RULE_FILES = [
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_hanh_chinh_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_thuoc_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_cdha_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_cong_kham_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_nhan_su_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_giuong_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_hop_dong_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_giam_dinh_chuyen_de_hardcoded.jsx'),
];

const extractDanhSachCot = (fileContent, constName) => {
  const re = new RegExp(`export const ${constName} = \\[([\\s\\S]*?)\\];`, 'm');
  const m = fileContent.match(re);
  if (!m) return [];
  const cols = [];
  const r = /'([A-Z][A-Z0-9_]*)'/g;
  let x;
  while ((x = r.exec(m[1]))) cols.push(x[1]);
  return cols;
};

const loadSchema = () => {
  const byTable = {};
  for (let i = 1; i <= 6; i += 1) {
    const fn = path.join(SCHEMA_DIR, `xml${i}.jsx`);
    const raw = fs.readFileSync(fn, 'utf8');
    byTable[`XML${i}`] = new Set(extractDanhSachCot(raw, `DANH_SACH_COT_XML${i}`));
  }
  return byTable;
};

const ENGINE_EXTRA_BY_TABLE = {
  XML1: new Set(['MA_BENH', 'MA_BENHKEM', 'KET_QUA_DTRI', 'MA_TINH', 'MA_GIOI_TINH', 'MA_LY_DO_VV', 'MA_LY_DO_VVIEN']),
  XML2: new Set([
    'SO_NGAY',
    'CALC_SL_MOI_NGAY',
    'SL_MOI_NGAY',
    'SL_MOI_LAN',
    'TAN_SUAT',
    'DON_VI_LIEU_DUNG',
    'DON_VI_TONG_NGAY',
    'MA_DUONG_DUNG',
  ]),
  XML3: new Set(['MA_DV', 'MA_VTYT', 'TEN_DV']),
};

const stripJsStrings = (s) => {
  let t = String(s || '');
  t = t.replace(/'(?:[^'\\]|\\.)*'/g, "''");
  t = t.replace(/"(?:[^"\\]|\\.)*"/g, '""');
  t = t.replace(/`(?:[^`\\]|\\.)*`/g, '``');
  return t;
};

const extractXmlFieldRefs = (text) => {
  const clean = stripJsStrings(text);
  const refs = [];
  const re = /\b(XML[1-9]|XML1[0-5])\.([A-Z][A-Z0-9_]*)\b/g;
  let m;
  while ((m = re.exec(clean))) {
    refs.push({ table: m[1].toUpperCase(), field: m[2] });
  }
  return refs;
};

const hasUnknownXmlField = (dieuKien, schema) => {
  const refs = extractXmlFieldRefs(dieuKien);
  for (const { table, field } of refs) {
    const allowed = schema[table];
    if (!allowed) return true;
    const extra = ENGINE_EXTRA_BY_TABLE[table] || new Set();
    if (!allowed.has(field) && !extra.has(field)) return true;
  }
  return false;
};

const extractJsonRules = (content) => {
  const rules = [];
  const re =
    /\{\s*"id"\s*:\s*"[^"]*"\s*,\s*"TRANG_THAI"\s*:\s*"(ON|OFF)"\s*,\s*"MA_LUAT"\s*:\s*"([^"]+)"\s*,\s*"TEN_QUY_TAC"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*"DIEU_KIEN"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(content))) {
    const dk = m[4].replace(/\\"/g, '"').replace(/\\n/g, '\n');
    rules.push({ trangThai: m[1], maLuat: m[2], dieuKien: dk });
  }
  return rules;
};

const extractHardcodedRules = (content) => {
  const rules = [];
  const re =
    /MA_LUAT:\s*'([^']+)'[\s\S]*?DIEU_KIEN:\s*`([\s\S]*?)`[\s\S]*?TRANG_THAI:\s*'(ON|OFF)'/g;
  let m;
  while ((m = re.exec(content))) {
    rules.push({ maLuat: m[1], dieuKien: m[2], trangThai: m[3] });
  }
  return rules;
};

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const offJsonSeed = (content, maLuat) => {
  const esc = escapeRegExp(maLuat);
  const re = new RegExp(`("TRANG_THAI"\\s*:\\s*)"ON"(\\s*,\\s*"MA_LUAT"\\s*:\\s*"${esc}")`, 'g');
  return content.replace(re, '$1"OFF"$2');
};

const offHardcodedLine = (line, maLuatSet) => {
  const mm = line.match(/MA_LUAT:\s*'([^']+)'/);
  if (!mm) return line;
  const ma = mm[1];
  if (!maLuatSet.has(ma)) return line;
  if (!/TRANG_THAI:\s*'ON'/.test(line)) return line;
  return line.replace(/TRANG_THAI:\s*'ON'/, "TRANG_THAI: 'OFF'");
};

const main = () => {
  const schema = loadSchema();
  const report = {
    timestamp: new Date().toISOString(),
    dryRun: DRY,
    turnedOff: [],
  };

  for (const filePath of JSON_SEED_FILES) {
    if (!fs.existsSync(filePath)) continue;
    const rel = path.relative(ROOT, filePath);
    let content = fs.readFileSync(filePath, 'utf8');
    const rules = extractJsonRules(content);
    const bad = rules.filter((r) => r.trangThai === 'ON' && hasUnknownXmlField(r.dieuKien, schema));
    for (const r of bad) {
      report.turnedOff.push({ file: rel, ma_luat: r.maLuat, source: 'JSON_SEED' });
      if (!DRY) {
        content = offJsonSeed(content, r.maLuat);
      }
    }
    if (!DRY && bad.length > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
    console.log(`${rel}: OFF ${bad.length} quy tắc (JSON seed)`);
  }

  for (const filePath of HARDCODED_RULE_FILES) {
    if (!fs.existsSync(filePath)) continue;
    const rel = path.relative(ROOT, filePath);
    let content = fs.readFileSync(filePath, 'utf8');
    const rules = extractHardcodedRules(content);
    const badMas = new Set(
      rules.filter((r) => r.trangThai === 'ON' && hasUnknownXmlField(r.dieuKien, schema)).map((r) => r.maLuat)
    );
    if (badMas.size === 0) {
      console.log(`${rel}: OFF 0 quy tắc (hardcoded)`);
      continue;
    }
    badMas.forEach((ma) => report.turnedOff.push({ file: rel, ma_luat: ma, source: 'HARDCODED' }));
    if (!DRY) {
      const lines = content.split('\n');
      const next = lines.map((line) => offHardcodedLine(line, badMas));
      fs.writeFileSync(filePath, next.join('\n'), 'utf8');
    }
    console.log(`${rel}: OFF ${badMas.size} quy tắc (hardcoded)`);
  }

  const outPath = path.join(ROOT, 'test_xml', 'off_unknown_field_rules_report.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\nBáo cáo: ${outPath}`);
  console.log(`Tổng MA_LUAT tắt: ${report.turnedOff.length}`);
  if (DRY) console.log('(dry-run: file chưa ghi)');
};

main();
