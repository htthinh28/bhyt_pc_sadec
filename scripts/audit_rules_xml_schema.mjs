#!/usr/bin/env node
/**
 * Rà soát tham chiếu XMLn.TRUONG trong biểu thức DIEU_KIEN (No-Code) so với
 * DANH_SACH_COT_XML1..6 trong ma_nguon/quy_tac/quyluat_cautrucdulieu/xml*.jsx
 * (căn cứ QĐ 3176/QĐ-BYT + QĐ 130/QĐ-BYT trong repo).
 *
 * Bổ sung trường do engine nội suy (không có trong file XML gốc):
 * - XML2: từ enrichXML2Data + parseLieuDungThuoc (dong_co_giam_dinh.jsx)
 * - XML1: alias từ prepareData (MA_BENH, MA_BENHKEM, KET_QUA_DTRI)
 *
 * Không thay thế kiểm thử hồi quy — chỉ phát hiện tham chiếu trường lạ.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SCHEMA_DIR = path.join(ROOT, 'ma_nguon', 'quy_tac', 'quyluat_cautrucdulieu');

const RULE_FILES = [
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_du_lieu_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_hanh_chinh_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_thuoc_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_cdha_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_cong_kham_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_nhan_su_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_giuong_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_hop_dong_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_giam_dinh_chuyen_de_hardcoded.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'du_lieu_luat_du_lieu_muc1.jsx'),
  path.join(ROOT, 'ma_nguon', 'tien_ich', 'du_lieu_luat_thuoc_muc8.jsx'),
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

/** Trường thêm vào ctx/XML2 trong engine (không phải cột file XML điện tử thuần) */
const ENGINE_EXTRA_BY_TABLE = {
  XML1: new Set([
    'MA_BENH',
    'MA_BENHKEM',
    'KET_QUA_DTRI',
    'MA_TINH',
    'MA_GIOI_TINH',
    'MA_LY_DO_VV',
    'MA_LY_DO_VVIEN',
    'TUOI_NGAY',
    'TUOI_NAM',
  ]),
  XML2: new Set([
    'SO_NGAY',
    'CALC_SL_MOI_NGAY',
    'SL_MOI_NGAY',
    'SL_MOI_LAN',
    'TAN_SUAT',
    'DON_VI_LIEU_DUNG',
    'DON_VI_TONG_NGAY',
    'MA_DUONG_DUNG',
    'MA_HOAT_CHAT',
    'GHI_CHU',
    'GHI_CHU_BN',
    'MA_GIA',
    'TRANG_THAI',
    'T_TRANTT',
    'LOAI_THUOC',
    'TEN_THUOC_GOC',
    'MA_BS_THAY_THE',
    'MA_THANH_PHAN_THUOC',
    'NGUON_GOC_YHCT',
    'SO_LUONG_NGAY',
  ]),
  XML3: new Set(['MA_DV', 'MA_VTYT', 'TEN_DV']),
};

/** Tiền tố bảng ngữ cảnh (không phải bảng XML130) — không báo lỗi */
const NON_XML_PREFIX = new Set([
  'CSKCB',
  'CURRENT',
  'CONFIG',
  'DM',
  'HE_THONG',
  'BATCH',
  'CONTEXT',
  'XML_DON_CU',
  'DON_THUOC',
  'HO_SO',
  'HOSO',
]);

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

const extractBacktickRuleBlocks = (content) => {
  const blocks = [];
  const re = /DIEU_KIEN:\s*`([\s\S]*?)`/g;
  let m;
  while ((m = re.exec(content))) blocks.push(m[1]);
  return blocks;
};

const extractJsonDieuKienFromSeed = (content) => {
  const out = [];
  const re = /"DIEU_KIEN":\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(content))) {
    out.push(m[1].replace(/\\"/g, '"').replace(/\\n/g, '\n'));
  }
  return out;
};

const auditFile = (filePath, schema) => {
  const rel = path.relative(ROOT, filePath);
  if (!fs.existsSync(filePath)) return { file: rel, missing: true, issues: [] };
  const content = fs.readFileSync(filePath, 'utf8');
  let blocks = extractBacktickRuleBlocks(content);
  if (blocks.length === 0 && /"DIEU_KIEN":/.test(content)) {
    blocks = extractJsonDieuKienFromSeed(content);
  }
  const issues = [];
  blocks.forEach((block, bi) => {
    const refs = extractXmlFieldRefs(block);
    refs.forEach(({ table, field }) => {
      const allowed = schema[table];
      if (!allowed) {
        issues.push({ table, field, reason: 'UNKNOWN_TABLE', blockIndex: bi });
        return;
      }
      const extra = ENGINE_EXTRA_BY_TABLE[table] || new Set();
      if (!allowed.has(field) && !extra.has(field)) {
        issues.push({ table, field, reason: 'UNKNOWN_FIELD', blockIndex: bi });
      }
    });
  });
  return { file: rel, missing: false, blocks: blocks.length, issues };
};

const main = () => {
  const schema = loadSchema();
  const summary = { files: [], unknownFieldCount: 0, unknownTableCount: 0 };

  for (const f of RULE_FILES) {
    const r = auditFile(f, schema);
    summary.files.push(r);
    r.issues.forEach((i) => {
      if (i.reason === 'UNKNOWN_FIELD') summary.unknownFieldCount += 1;
      if (i.reason === 'UNKNOWN_TABLE') summary.unknownTableCount += 1;
    });
  }

  const outPath = path.join(ROOT, 'test_xml', 'rule_xml_schema_audit.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        schemaTables: Object.fromEntries(
          Object.entries(schema).map(([k, v]) => [k, [...v].sort()])
        ),
        engineExtraFields: ENGINE_EXTRA_BY_TABLE,
        summary: {
          unknownFieldCount: summary.unknownFieldCount,
          unknownTableCount: summary.unknownTableCount,
        },
        details: summary.files,
      },
      null,
      2
    ),
    'utf8'
  );

  console.log(`Đã ghi: ${outPath}`);
  console.log(`Tham chiếu trường không có trong schema (và không thuộc engine extra): ${summary.unknownFieldCount}`);
  console.log(`Bảng XML không hợp lệ (XML7+ nếu có): ${summary.unknownTableCount}`);
  if (summary.unknownFieldCount + summary.unknownTableCount === 0) {
    console.log('OK: không phát hiện tham chiếu XMLn.FIELD lạ trong phạm vi quét.');
  }
};

main();
