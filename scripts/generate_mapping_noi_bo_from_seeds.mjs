/* eslint-disable no-console */
/**
 * Tái sinh mapping nội bộ từ seed Mẫu 02 (nhân sự) + Mẫu 05 (DVKT) + phạm vi prefix.
 * Output: ma_nguon/thanh_phan/mapping_nguoi_hanh_nghe.jsx
 *         ma_nguon/tien_ich/dvkt_equip_dvkt_map_seed.jsx (PREFIX_DVKT ↔ MA_MAY_PREFIX)
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PATH_DVKT = path.join(ROOT, 'ma_nguon/thanh_phan/dich_vu_ky_thuat.jsx');
const PATH_NHAN_SU = path.join(ROOT, 'ma_nguon/thanh_phan/nhan_su.jsx');
const PATH_PHAMVI = path.join(ROOT, 'ma_nguon/tien_ich/dvkt_phamvi_mapping_seed.jsx');
const PATH_TTB = path.join(ROOT, 'ma_nguon/thanh_phan/trang_thiet_bi.jsx');
const OUT_MAPPING = path.join(ROOT, 'ma_nguon/thanh_phan/mapping_nguoi_hanh_nghe.jsx');
const OUT_EQUIP = path.join(ROOT, 'ma_nguon/tien_ich/dvkt_equip_dvkt_map_seed.jsx');

const COLUMNS_MAPPING = [
  'STT',
  'MA_TUONG_DUONG',
  'TEN_DVKT',
  'MA_CHUYEN_KHOA',
  'PHAMVI_CM_CAN',
  'SO_NV_DU_DIEU_KIEN',
  'DANH_SACH_NGUOI_THUC_HIEN',
  'DANH_SACH_MACCHN',
  'DANH_SACH_MA_BHXH',
  'TRANG_THAI',
];

/** PREFIX_DVKT → tiền tố MA_MAY (BYT) thường dùng — đối chiếu thiết bị DVKT-OP-04 */
const HEURISTIC_EQUIP_BY_DVKT_PREFIX = {
  '01': ['HH', 'SH'],
  '02': ['NS', 'NT'],
  '03': ['PT', 'GM'],
  '04': ['GM', 'MS'],
  '05': ['GM'],
  '06': ['ĐT', 'BN', 'HT'],
  '07': ['ĐT'],
  '08': ['HH', 'SH'],
  '09': ['HH'],
  '10': ['GM', 'PT', 'MS'],
  '11': ['GM'],
  '12': ['GM'],
  '13': ['SA', 'MD'],
  '14': ['SA'],
  '15': ['GM', 'PT', 'CĐ'],
  '16': ['HH', 'SH'],
  '17': ['HH', 'SH', 'LR'],
  '18': ['XQ', 'CL', 'CT', 'MR', 'SA', 'NM', 'MD'],
  '19': ['HH'],
  '20': ['HH'],
};

function extractExportArray(source, name) {
  const token = `export const ${name} = [`;
  const i = source.indexOf(token);
  if (i < 0) throw new Error(`Không tìm thấy ${name}`);
  let start = i + token.length - 1;
  let depth = 0;
  let j = start;
  for (; j < source.length; j += 1) {
    if (source[j] === '[') depth += 1;
    else if (source[j] === ']') {
      depth -= 1;
      if (depth === 0) {
        j += 1;
        break;
      }
    }
  }
  return JSON.parse(source.slice(start, j));
}

function parseList(value) {
  return String(value ?? '')
    .split(/[;,]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function normalizePrefix(code) {
  const raw = String(code ?? '').trim();
  const m = raw.match(/^(\d{1,2})/);
  return m ? m[1].padStart(2, '0') : '';
}

function padDvktCode(value) {
  const raw = String(value ?? '').trim().replace(/\s+/g, '');
  if (!raw) return '';
  if (/^\d+(\.\d+)+/.test(raw)) {
    const parts = raw.split('.');
    parts[0] = parts[0].padStart(2, '0');
    return parts.join('.');
  }
  return raw;
}

function phamviByPrefix(phamviRows) {
  const map = new Map();
  phamviRows.forEach((row) => {
    const prefix = String(row.PREFIX_DVKT ?? '').padStart(2, '0');
    if (!prefix) return;
    if (!map.has(prefix)) map.set(prefix, { scopes: new Set(), titles: new Set(), groups: new Set() });
    const bucket = map.get(prefix);
    parseList(row.PHAMVI_CM_OK).forEach((s) => bucket.scopes.add(s));
    parseList(row.CHUCDANH_NN_OK).forEach((t) => bucket.titles.add(t));
    const g = String(row.NHOM_DVKT ?? '').trim();
    if (g) bucket.groups.add(g);
  });
  return map;
}

function staffScopes(staff) {
  const scopes = new Set();
  parseList(staff.PHAMVI_CM).forEach((s) => scopes.add(s));
  parseList(staff.PHAMVI_CMBS).forEach((s) => scopes.add(s));
  return scopes;
}

function staffTitles(staff) {
  return new Set(parseList(staff.CHUCDANH_NN));
}

function staffEligible(staff, requiredScopes, requiredTitles) {
  const titles = staffTitles(staff);
  if (requiredTitles.size > 0) {
    if (titles.size === 0) return false;
    if (![...titles].some((t) => requiredTitles.has(t))) return false;
  }
  if (requiredScopes.size === 0) return true;
  const scopes = staffScopes(staff);
  if (scopes.size === 0) return false;
  return [...scopes].some((s) => requiredScopes.has(s));
}

function joinUnique(items, sep = '; ') {
  return [...new Set(items.map((x) => String(x ?? '').trim()).filter(Boolean))].join(sep);
}

function buildMappingRows(dvktRows, staffRows, phamviRows) {
  const phamviMap = phamviByPrefix(phamviRows);
  const rows = [];
  let stt = 0;

  dvktRows.forEach((dv) => {
    const ma = padDvktCode(dv.MA_DICH_VU);
    if (!ma) return;
    const prefix = normalizePrefix(ma);
    const cfg = phamviMap.get(prefix) || { scopes: new Set(), titles: new Set(), groups: new Set() };
    const requiredScopes = cfg.scopes;
    const requiredTitles = cfg.titles;

    const eligible = staffRows.filter((s) => staffEligible(s, requiredScopes, requiredTitles));
    stt += 1;
    rows.push({
      STT: String(stt),
      MA_TUONG_DUONG: ma,
      TEN_DVKT: String(dv.TEN_DICH_VU ?? dv.TEN_DVKT_GIA ?? '').trim(),
      MA_CHUYEN_KHOA: prefix,
      PHAMVI_CM_CAN: joinUnique([...requiredScopes], ','),
      SO_NV_DU_DIEU_KIEN: String(eligible.length),
      DANH_SACH_NGUOI_THUC_HIEN: joinUnique(eligible.map((s) => s.HO_TEN)),
      DANH_SACH_MACCHN: joinUnique(eligible.map((s) => s.MACCHN)),
      DANH_SACH_MA_BHXH: joinUnique(eligible.map((s) => s.MA_BHXH)),
      TRANG_THAI: eligible.length > 0 ? 'CO_NGUOI_TH' : 'CHUA_CO_NGUOI_TH',
    });
  });

  return rows;
}

function buildEquipMap(dvktRows, equipRows) {
  const equipPrefixes = new Set(
    equipRows
      .map((r) => String(r.MA_MAY ?? '').split('.')[0]?.trim())
      .filter(Boolean),
  );
  const dvktPrefixes = new Set(dvktRows.map((r) => normalizePrefix(r.MA_DICH_VU)).filter(Boolean));
  const out = [];

  dvktPrefixes.forEach((prefix) => {
    const candidates = HEURISTIC_EQUIP_BY_DVKT_PREFIX[prefix] || [];
    candidates.forEach((eqPrefix) => {
      if (!equipPrefixes.has(eqPrefix)) return;
      out.push({
        PREFIX_DVKT: prefix,
        MA_MAY_PREFIX: eqPrefix,
        GHI_CHU: `Sinh tự động từ DM thiết bị BV (${equipPrefixes.size} loại máy)`,
      });
    });
  });

  const seen = new Set();
  return out.filter((r) => {
    const k = `${r.PREFIX_DVKT}|${r.MA_MAY_PREFIX}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function formatJsxRows(rows, indent = 2) {
  const pad = ' '.repeat(indent);
  return rows
    .map((row) => `${pad}${JSON.stringify(row, null, 2).replace(/\n/g, `\n${pad}`)}`)
    .join(',\n');
}

function writeMappingJsx(rows, count) {
  const version = `2026-06-16-mapping-nguoi-hanh-nghe-${count}`;
  const content = `/**
 * Seed mapping DVKT ↔ người hành nghề (tái sinh từ Mẫu 02 + Mẫu 05 + phạm vi prefix).
 * Nguồn: ma_nguon/thanh_phan/nhan_su.jsx + dich_vu_ky_thuat.jsx + dvkt_phamvi_mapping_seed.jsx
 * Cập nhật: 2026-06-16 — BV Sa Đéc (MA_CSKCB 87189)
 */

export const PHIEN_BAN_DANH_MUC_MAPPING_NGUOI_HANH_NGHE = '${version}';

export const COT_DANH_MUC_MAPPING_NGUOI_HANH_NGHE = ${JSON.stringify(COLUMNS_MAPPING, null, 2)};

export const DANH_MUC_MAPPING_NGUOI_HANH_NGHE = [
${formatJsxRows(rows)}
];
`;
  fs.writeFileSync(OUT_MAPPING, content, 'utf8');
  return version;
}

function writeEquipJsx(rows) {
  const version = `2026-06-16-equip-dvkt-map-${rows.length}`;
  const content = `/**
 * Seed mapping PREFIX_DVKT ↔ MA_MAY_PREFIX (thiết bị bắt buộc theo nhóm DVKT).
 * Sinh từ danh mục Mẫu 05 + Mẫu 06 — BV Sa Đéc (87189)
 */

export const PHIEN_BAN_DVKT_EQUIP_DVKT_MAP = '${version}';

export const COT_DVKT_EQUIP_DVKT_MAP = [
  "PREFIX_DVKT",
  "MA_MAY_PREFIX",
  "GHI_CHU"
];

export const DU_LIEU_DVKT_EQUIP_DVKT_MAP = [
${formatJsxRows(rows)}
];
`;
  fs.writeFileSync(OUT_EQUIP, content, 'utf8');
  return version;
}

function main() {
  const dvktRows = extractExportArray(fs.readFileSync(PATH_DVKT, 'utf8'), 'DANH_MUC_DVKT_M05');
  const staffRows = extractExportArray(fs.readFileSync(PATH_NHAN_SU, 'utf8'), 'DANH_MUC_NHAN_SU');
  const phamviRows = extractExportArray(fs.readFileSync(PATH_PHAMVI, 'utf8'), 'DU_LIEU_DVKT_PHAMVI_MAPPING');
  const equipRows = extractExportArray(fs.readFileSync(PATH_TTB, 'utf8'), 'DANH_MUC_TRANG_THIET_BI_M06');

  const mappingRows = buildMappingRows(dvktRows, staffRows, phamviRows);
  const equipRowsOut = buildEquipMap(dvktRows, equipRows);

  const vMap = writeMappingJsx(mappingRows, mappingRows.length);
  const vEquip = writeEquipJsx(equipRowsOut);

  const coNguoi = mappingRows.filter((r) => r.TRANG_THAI === 'CO_NGUOI_TH').length;
  console.log(`[mapping] ${mappingRows.length} dòng DVKT — ${coNguoi} có NV, ${mappingRows.length - coNguoi} chưa có NV`);
  console.log(`[mapping] PHIEN_BAN=${vMap}`);
  console.log(`[equip-map] ${equipRowsOut.length} dòng — PHIEN_BAN=${vEquip}`);
}

main();
