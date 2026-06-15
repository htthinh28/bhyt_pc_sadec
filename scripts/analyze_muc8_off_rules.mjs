import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SCHEMA_DIR = path.join(ROOT, 'ma_nguon', 'quy_tac', 'quyluat_cautrucdulieu');

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

const schema = {};
for (let i = 1; i <= 6; i += 1) {
  const raw = fs.readFileSync(path.join(SCHEMA_DIR, `xml${i}.jsx`), 'utf8');
  schema[`XML${i}`] = new Set(extractDanhSachCot(raw, `DANH_SACH_COT_XML${i}`));
}

const ENGINE_EXTRA = {
  XML1: new Set(['MA_BENH', 'MA_BENHKEM', 'KET_QUA_DTRI', 'MA_TINH', 'MA_GIOI_TINH', 'MA_LY_DO_VV', 'MA_LY_DO_VVIEN']),
  XML2: new Set([
    'SO_NGAY', 'CALC_SL_MOI_NGAY', 'SL_MOI_NGAY', 'SL_MOI_LAN', 'TAN_SUAT',
    'DON_VI_LIEU_DUNG', 'DON_VI_TONG_NGAY', 'MA_DUONG_DUNG', 'MA_HOAT_CHAT',
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

const badRefs = (dieuKien) => {
  const clean = stripJsStrings(dieuKien);
  const out = [];
  const re = /\b(XML[1-9]|XML1[0-5])\.([A-Z][A-Z0-9_]*)\b/g;
  let m;
  while ((m = re.exec(clean))) {
    const table = m[1].toUpperCase();
    const field = m[2];
    const allowed = schema[table];
    const extra = ENGINE_EXTRA[table] || new Set();
    if (!allowed) {
      out.push(`${table}.${field}`);
      continue;
    }
    if (!allowed.has(field) && !extra.has(field)) {
      out.push(`${table}.${field}`);
    }
  }
  return out;
};

const report = JSON.parse(fs.readFileSync(path.join(ROOT, 'test_xml', 'off_unknown_field_rules_report.json'), 'utf8'));
const th = report.turnedOff.filter((x) => x.file.includes('thuoc_muc8'));
const raw = fs.readFileSync(path.join(ROOT, 'ma_nguon', 'tien_ich', 'du_lieu_luat_thuoc_muc8.jsx'), 'utf8');
const re =
  /\{\s*"id"\s*:\s*"[^"]*"\s*,\s*"TRANG_THAI"\s*:\s*"(ON|OFF)"\s*,\s*"MA_LUAT"\s*:\s*"([^"]+)"\s*,\s*"TEN_QUY_TAC"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*"DIEU_KIEN"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
const map = new Map();
let mm;
while ((mm = re.exec(raw))) {
  map.set(mm[2], mm[4].replace(/\\"/g, '"').replace(/\\n/g, '\n'));
}

let cleanWithHoatChat = 0;
const stillBad = [];
const canReonWithHoatChatOnly = [];
for (const { ma_luat } of th) {
  const dk = map.get(ma_luat) || '';
  const b = badRefs(dk);
  if (b.length === 0) {
    cleanWithHoatChat += 1;
    canReonWithHoatChatOnly.push(ma_luat);
  } else stillBad.push({ ma_luat, refs: b });
}

console.log('OFF thuốc Mục 8:', th.length);
console.log('Chỉ cần MA_HOAT_CHAT (đã thêm engine extra):', cleanWithHoatChat);
console.log('Vẫn còn trường XML lạ:', stillBad.length);
console.log('MA_LUAT có thể bật lại sau enrich MA_HOAT_CHAT:', canReonWithHoatChatOnly.join(', '));
console.log(JSON.stringify(stillBad.slice(0, 15), null, 2));
