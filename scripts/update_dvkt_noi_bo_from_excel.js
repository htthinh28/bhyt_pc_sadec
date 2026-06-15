/* eslint-disable no-console */
/**
 * Cập nhật seed Mẫu 05 (DVKT nội bộ) → ma_nguon/thanh_phan/dich_vu_ky_thuat.jsx
 *
 * Chế độ đầy đủ (M05 + merge công khám):
 *   node scripts/update_dvkt_noi_bo_from_excel.js
 *   node scripts/update_dvkt_noi_bo_from_excel.js --m05="path/FileMau_DANH_MUC_DVKT_M05.xlsx"
 *
 * Bổ sung từ file cập nhật (định dạng MA_TUONG_DUONG / công khám):
 *   node scripts/update_dvkt_noi_bo_from_excel.js --supplement="path/FileDichVuBV.xlsx"
 */
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const ROOT = process.cwd();
const BASE_DM = 'C:/Users/admin/Documents/Google Drive/BHYT/danh muc benh vien/DM';
const DEFAULT_FILE_CONG_KHAM = path.join(BASE_DM, 'danh muc cong kham.xlsx');
const OUT_FILE = path.join(ROOT, 'ma_nguon', 'thanh_phan', 'dich_vu_ky_thuat.jsx');
const MANIFEST_DIR = path.join(ROOT, 'scripts');

const OUTPUT_COLUMNS = [
  'STT',
  'MA_DICH_VU',
  'TEN_DICH_VU',
  'TEN_DVKT_GIA',
  'DON_GIA',
  'QUY_TRINH',
  'CS_THUCHIEN',
  'TINHTRANG_DV',
  'MA_GIA',
  'TEN_GIA',
  'GIA_TT_BHYT',
  'MA_PTTT',
  'TU_NGAY',
  'DEN_NGAY',
  'MA_CSKCB',
  'PHAN_LOAI_PTTT',
  'MA_NHOM',
  'GHICHU',
  'QUYET_DINH',
];

const REQUIRED_EXTENDED_COLUMNS = ['PHAN_LOAI_PTTT', 'GHICHU', 'QUYET_DINH'];

const parseCliArgs = () => {
  const out = {};
  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--m05=')) out.m05 = arg.slice('--m05='.length);
    if (arg.startsWith('--cong-kham=')) out.congKham = arg.slice('--cong-kham='.length);
    if (arg.startsWith('--supplement=')) out.supplement = arg.slice('--supplement='.length);
  });
  return out;
};

const normalizeDvktCode = (value) => {
  if (value === null || value === undefined) return '';
  const raw = String(value).trim().replace(/\s+/g, '');
  if (!raw) return '';
  const normalizedSeparators = /^[0-9.,]+$/.test(raw) ? raw.replace(/,/g, '.') : raw;
  if (/^\d+(\.\d+)+$/.test(normalizedSeparators)) {
    const parts = normalizedSeparators.split('.');
    parts[0] = parts[0].padStart(2, '0');
    return parts.join('.');
  }
  return normalizedSeparators;
};

const toNumOrText = (v) => {
  if (v === null || v === undefined) return '';
  if (typeof v === 'number') return Number.isFinite(v) ? v : '';
  const raw = String(v).trim();
  if (!raw) return '';
  if (/^-?\d+(\.\d+)?$/.test(raw)) {
    const n = Number(raw);
    return Number.isFinite(n) ? n : raw;
  }
  return raw;
};

const normalizeRow = (row) => {
  const out = {};
  OUTPUT_COLUMNS.forEach((col) => {
    if (col === 'MA_DICH_VU') {
      out[col] = normalizeDvktCode(row[col]);
      return;
    }
    out[col] = toNumOrText(row[col]);
  });
  return out;
};

const mapCongKhamToDvkt = (row) => {
  const donGia = toNumOrText(row.DON_GIA);
  const phanLoai = toNumOrText(row.PHAN_LOAI_PTTT);
  const csParts = [row.CSKCB_CGKT, row.CSKCB_CLS]
    .map((v) => String(v || '').trim())
    .filter(Boolean);
  const csText = csParts.join('; ');
  return normalizeRow({
    STT: toNumOrText(row.STT),
    MA_DICH_VU: normalizeDvktCode(row.MA_TUONG_DUONG || row.MA_DICH_VU),
    TEN_DICH_VU: toNumOrText(row.TEN_DVKT_PHEDUYET || row.TEN_DICH_VU),
    TEN_DVKT_GIA: toNumOrText(row.TEN_DVKT_GIA || row.TEN_DVKT_PHEDUYET),
    DON_GIA: donGia,
    QUY_TRINH: csText,
    CS_THUCHIEN: csText,
    TINHTRANG_DV: toNumOrText(row.TINHTRANG_DV) || '1',
    MA_GIA: toNumOrText(row.ID || row.MA_GIA),
    TEN_GIA: toNumOrText(row.TEN_GIA),
    GIA_TT_BHYT: toNumOrText(row.GIA_TT_BHYT) || donGia,
    MA_PTTT: toNumOrText(row.MA_PTTT),
    TU_NGAY: toNumOrText(row.TUNGAY || row.TU_NGAY),
    DEN_NGAY: toNumOrText(row.DENNGAY || row.DEN_NGAY),
    MA_CSKCB: toNumOrText(row.MA_CSKCB),
    PHAN_LOAI_PTTT: phanLoai,
    MA_NHOM: toNumOrText(row.MA_NHOM) || (phanLoai ? `PTTT-${phanLoai}` : 'DVKT'),
    GHICHU: toNumOrText(row.GHICHU),
    QUYET_DINH: toNumOrText(row.QUYET_DINH),
  });
};

const escapeVal = (v) => {
  if (v === null || v === undefined || v === '') return '""';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return String(v);
  return JSON.stringify(String(v));
};

const rowToJsObject = (row, indent = '  ') => {
  const lines = OUTPUT_COLUMNS.map((k) => `${indent}  ${JSON.stringify(k)}: ${escapeVal(row[k])}`);
  return `\n${indent}{\n${lines.join(',\n')}\n${indent}}`;
};

const readRows = (excelPath) => {
  const wb = XLSX.readFile(excelPath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  return XLSX.utils.sheet_to_json(ws, { defval: '' });
};

const inspectWorkbook = (excelPath) => {
  const rows = readRows(excelPath);
  const headers = rows.length ? Object.keys(rows[0]) : [];
  const hasExtendedColumns = REQUIRED_EXTENDED_COLUMNS.every((col) => headers.includes(col));
  const isSupplementFormat = headers.includes('MA_TUONG_DUONG');
  return {
    excelPath,
    rows,
    headers,
    rowCount: rows.length,
    hasExtendedColumns,
    isSupplementFormat,
  };
};

const loadExistingSeed = () => {
  if (!fs.existsSync(OUT_FILE)) {
    throw new Error(`Missing seed file: ${OUT_FILE}`);
  }
  let code = fs.readFileSync(OUT_FILE, 'utf8');
  code = code.replace(/export const /g, 'const ');
  const fn = new Function(`${code}; return { PHIEN_BAN_DANH_MUC_DVKT_M05, COT_DANH_MUC_DVKT_M05, DANH_MUC_DVKT_M05 };`);
  return fn();
};

const ensureOutputColumns = (row) => {
  const base = {};
  OUTPUT_COLUMNS.forEach((col) => {
    base[col] = row[col] !== undefined ? row[col] : '';
  });
  if (!base.MA_NHOM && base.PHAN_LOAI_PTTT) {
    base.MA_NHOM = `PTTT-${base.PHAN_LOAI_PTTT}`;
  }
  return normalizeRow(base);
};

const writeSeedFile = ({ merged, versionSuffix, sourceNotes }) => {
  const dateStr = new Date().toISOString().slice(0, 10);
  const version = `${dateStr}-${versionSuffix}-${merged.length}`;

  const colsLiteral = OUTPUT_COLUMNS.map((c) => `  ${JSON.stringify(c)}`).join(',\n');
  const rowsLiteral = merged
    .map((row, idx) => `${rowToJsObject(row, '  ')}${idx < merged.length - 1 ? ',' : ''}`)
    .join('');

  const fileContent = [
    '/**',
    ' * Seed danh muc dich vu ky thuat noi bo (Mau 05 — DANH_MUC_DVKT_M05).',
    ...sourceNotes.map((line) => ` * ${line}`),
    ` * Cap nhat: ${dateStr}`,
    ' */',
    '',
    `export const PHIEN_BAN_DANH_MUC_DVKT_M05 = '${version}';`,
    '',
    'export const COT_DANH_MUC_DVKT_M05 = [',
    colsLiteral,
    '];',
    '',
    'export const DANH_MUC_DVKT_M05 = [',
    rowsLiteral,
    '];',
    '',
  ].join('\n');

  fs.writeFileSync(OUT_FILE, fileContent, 'utf8');
};

const resolveM05Source = (explicitPath = '') => {
  if (explicitPath) {
    const normalizedPath = path.resolve(explicitPath);
    if (!fs.existsSync(normalizedPath)) {
      throw new Error(`Missing M05 file: ${normalizedPath}`);
    }
    return inspectWorkbook(normalizedPath);
  }

  const candidates = fs.readdirSync(BASE_DM)
    .filter((name) => /^FileMau_DANH_MUC_DVKT_M05.*\.xlsx$/i.test(name))
    .map((name) => inspectWorkbook(path.join(BASE_DM, name)))
    .sort((a, b) => {
      if (a.hasExtendedColumns !== b.hasExtendedColumns) return Number(b.hasExtendedColumns) - Number(a.hasExtendedColumns);
      return b.rowCount - a.rowCount;
    });

  const selected = candidates.find((item) => item.rowCount > 1 && item.hasExtendedColumns)
    || candidates.find((item) => item.rowCount > 1)
    || candidates[0];

  if (!selected) {
    throw new Error(`No M05 source found in ${BASE_DM}`);
  }

  return selected;
};

const runSupplementMerge = (supplementPath) => {
  const resolved = path.resolve(supplementPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Missing supplement file: ${resolved}`);
  }
  const wbInfo = inspectWorkbook(resolved);
  if (!wbInfo.isSupplementFormat && !wbInfo.headers.includes('MA_DICH_VU')) {
    throw new Error(
      `File bổ sung không đúng định dạng (cần MA_TUONG_DUONG hoặc MA_DICH_VU). Headers: ${wbInfo.headers.join(', ')}`,
    );
  }

  const existing = loadExistingSeed();
  const byCode = new Map();
  (existing.DANH_MUC_DVKT_M05 || []).forEach((row) => {
    const code = normalizeDvktCode(row.MA_DICH_VU);
    if (!code) return;
    byCode.set(code, ensureOutputColumns({ ...row, MA_DICH_VU: code }));
  });

  const beforeCount = byCode.size;
  const supplementRows = wbInfo.rows.map((row) => (
    row.MA_TUONG_DUONG || row.MA_DICH_VU ? mapCongKhamToDvkt(row) : null
  )).filter(Boolean);

  let inserted = 0;
  let updated = 0;
  const newCodes = [];
  const updatedCodes = [];

  supplementRows.forEach((row) => {
    const code = row.MA_DICH_VU;
    if (!code) return;
    if (byCode.has(code)) {
      byCode.set(code, { ...byCode.get(code), ...row });
      updated += 1;
      updatedCodes.push(code);
    } else {
      byCode.set(code, row);
      inserted += 1;
      newCodes.push(code);
    }
  });

  const merged = Array.from(byCode.values());
  merged.sort((a, b) => String(a.MA_DICH_VU || '').localeCompare(String(b.MA_DICH_VU || '')));
  merged.forEach((row, idx) => {
    row.STT = idx + 1;
  });

  writeSeedFile({
    merged,
    versionSuffix: 'm05-seed',
    sourceNotes: [
      `Nguon day du truoc do: ${OUT_FILE.replace(/\\/g, '\\\\')} (${beforeCount} ma).`,
      `Bo sung: ${resolved.replace(/\\/g, '\\\\')} (${supplementRows.length} dong Excel).`,
      `Giam dinh XML3: DM-DVKT-01..04, DMBV-DVKT-00..05 (dong_co_giam_dinh.jsx).`,
    ],
  });

  const manifestPath = path.join(MANIFEST_DIR, 'dvkt_m05_supplement_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify({
    updated_at: new Date().toISOString(),
    source_excel: resolved,
    rows_in_excel: supplementRows.length,
    seed_total: merged.length,
    inserted,
    updated,
    new_codes: newCodes,
    updated_codes: updatedCodes,
    giam_dinh_rules: [
      'DM-DVKT-01 — co trong DM BYT, khong co DM BV',
      'DM-DVKT-02 — khong co ca hai DM',
      'DM-DVKT-03 — can xac minh (khong co trong MAP_DVKT_BV)',
      'DM-DVKT-04 — don gia vuot gia HD BV',
      'DMBV-DVKT-01..05 — chat luong dong DM BV (ten, gia, nhom, hieu luc)',
    ],
  }, null, 2), 'utf8');

  console.log(`Supplement: ${resolved}`);
  console.log(`Updated: ${OUT_FILE}`);
  console.log(`Seed total: ${merged.length} (truoc ${beforeCount}, +${inserted} ma moi, cap nhat ${updated})`);
  console.log(`Manifest: ${manifestPath}`);
};

const runFullRebuild = (args) => {
  const m05Source = resolveM05Source(args.m05);
  const fileM05 = m05Source.excelPath;
  const fileCongKham = args.congKham ? path.resolve(args.congKham) : DEFAULT_FILE_CONG_KHAM;

  if (m05Source.rowCount <= 1) {
    throw new Error(
      `Selected M05 source is incomplete: ${fileM05} only has ${m05Source.rowCount} data row(s).`,
    );
  }
  if (!m05Source.hasExtendedColumns) {
    console.warn(`Warning: ${fileM05} is missing extended columns ${REQUIRED_EXTENDED_COLUMNS.join(', ')}.`);
  }
  if (!fs.existsSync(fileCongKham)) throw new Error(`Missing file: ${fileCongKham}`);

  const m05Rows = m05Source.rows.map((row) => ensureOutputColumns(normalizeRow(row)));
  const congKhamRows = readRows(fileCongKham).map(mapCongKhamToDvkt);

  const byCode = new Map();
  m05Rows.forEach((row) => {
    const code = row.MA_DICH_VU;
    if (!code) return;
    byCode.set(code, row);
  });

  let updated = 0;
  let inserted = 0;
  congKhamRows.forEach((row) => {
    const code = row.MA_DICH_VU;
    if (!code) return;
    if (byCode.has(code)) {
      byCode.set(code, { ...byCode.get(code), ...row });
      updated += 1;
    } else {
      byCode.set(code, row);
      inserted += 1;
    }
  });

  const merged = Array.from(byCode.values());
  merged.sort((a, b) => String(a.MA_DICH_VU || '').localeCompare(String(b.MA_DICH_VU || '')));
  merged.forEach((row, idx) => {
    row.STT = idx + 1;
  });

  writeSeedFile({
    merged,
    versionSuffix: 'm05-seed',
    sourceNotes: [
      `Nguon chinh: ${fileM05.replace(/\\/g, '\\\\')}`,
      `Merge cong kham: ${fileCongKham.replace(/\\/g, '\\\\')} (${congKhamRows.length} dong)`,
    ],
  });

  console.log(`Source M05: ${fileM05}`);
  console.log(`Updated file: ${OUT_FILE}`);
  console.log(`Rows total: ${merged.length}`);
  console.log(`Rows updated from cong kham: ${updated}`);
  console.log(`Rows inserted from cong kham: ${inserted}`);
};

const main = () => {
  const args = parseCliArgs();
  if (args.supplement) {
    runSupplementMerge(args.supplement);
    return;
  }
  runFullRebuild(args);
};

main();
