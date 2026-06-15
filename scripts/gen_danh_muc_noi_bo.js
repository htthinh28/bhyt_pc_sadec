/**
 * Script tạo file hardcoded cho các danh mục nội bộ (catalog seed files).
 * Chạy: node scripts/gen_danh_muc_noi_bo.js
 *
 * Danh mục xử lý:
 *   1. FileMau_DANH_MUC_ICD10 (1).xlsx       → dm_icd10_seed.jsx (12219 dòng - MỚI)
 *   2. FileMau_DANH_MUC_THUOC_MAU_M03 (1).xlsx → thuoc_mau_cp.jsx (cập nhật)
 *
 * Danh mục KHÔNG xử lý (đã tồn tại đúng):
 *   - DVKT M05 (1).xlsx            → template rỗng, giữ dữ liệu 1623 dòng
 *   - KHOA_LS M01 (2).xlsx         → dm_khoals_m01dm.jsx đã đúng từ cùng nguồn
 *   - NHAN_SU.xlsx                 → nhan_su.jsx từ NVYT_CN phong phú hơn
 *   - TRANG_THIET_BI M06.xlsx      → trang_thiet_bi.jsx đã đúng từ cùng nguồn
 *   - danh muc icd ke don tren 30 ngay → icd10_ke_don_tren_30_ngay.jsx đã đúng
 */

'use strict';

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const BASE_DM = 'C:/Users/admin/Documents/Google Drive/BHYT/danh muc benh vien/DM';
const OUT_DIR = path.join(__dirname, '../ma_nguon/thanh_phan');

// ─────────────────────────────────────────────
// Cấu hình từng danh mục
// ─────────────────────────────────────────────
const CATALOG_CONFIGS = [
  {
    excelPath: path.join(BASE_DM, 'FileMau_DANH_MUC_ICD10 (1).xlsx'),
    outFile: path.join(OUT_DIR, 'dm_icd10_seed.jsx'),
    exportVersion: 'PHIEN_BAN_DANH_MUC_ICD10',
    exportCols: 'COT_DANH_MUC_ICD10',
    exportData: 'DANH_MUC_ICD10',
    versionSuffix: 'icd10-full',
    label: 'dm_icd10_seed.jsx',
    note: 'Danh muc ICD-10 day du tu FileMau_DANH_MUC_ICD10 (1).xlsx',
  },
  {
    excelPath: path.join(BASE_DM, 'FileMau_DANH_MUC_THUOC_MAU_M03 (1).xlsx'),
    outFile: path.join(OUT_DIR, 'thuoc_mau_cp.jsx'),
    exportVersion: 'PHIEN_BAN_DANH_MUC_THUOC_MAU_M03',
    exportCols: 'COT_DANH_MUC_THUOC_MAU_M03',
    exportData: 'DANH_MUC_THUOC_MAU_M03',
    versionSuffix: 'm03',
    label: 'thuoc_mau_cp.jsx',
    note: 'Seed danh muc thuoc noi bo tu file Excel nguon.',
  },
];

// ─────────────────────────────────────────────
// Tiện ích
// ─────────────────────────────────────────────
function today() {
  return new Date().toISOString().slice(0, 10);
}

function escapeVal(v) {
  if (v === null || v === undefined) return '""';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return String(v);
  return JSON.stringify(String(v));
}

function rowToJsObject(row, indent) {
  const keys = Object.keys(row);
  if (keys.length === 0) return '{}';
  const lines = keys.map((k) => `${indent}  ${JSON.stringify(k)}: ${escapeVal(row[k])}`);
  return `{\n${lines.join(',\n')}\n${indent}}`;
}

// ─────────────────────────────────────────────
// Tạo file seed từ cấu hình
// ─────────────────────────────────────────────
function generateSeedFile(cfg) {
  if (!fs.existsSync(cfg.excelPath)) {
    console.warn(`SKIP ${cfg.label}: không tìm thấy "${cfg.excelPath}"`);
    return false;
  }

  const wb = XLSX.readFile(cfg.excelPath);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json(ws, { defval: '' });

  if (rawRows.length === 0) {
    console.warn(`SKIP ${cfg.label}: file Excel không có dòng dữ liệu`);
    return false;
  }

  const dateStr = today();
  const rowCount = rawRows.length;
  const version = `${dateStr}-${cfg.versionSuffix}-seed-${rowCount}`;
  const cols = Object.keys(rawRows[0]);

  const colsLiteral = cols.map((c) => `  ${JSON.stringify(c)}`).join(',\n');

  const rowsLiteral = rawRows
    .map((row, i) => {
      const obj = rowToJsObject(row, '  ');
      return `  ${obj}${i < rawRows.length - 1 ? ',' : ''}`;
    })
    .join('\n');

  const fileContent = [
    `/**`,
    ` * ${cfg.note}`,
    ` * Nguon: ${cfg.excelPath.replace(/\\/g, '\\\\')}`,
    ` * Cap nhat: ${dateStr}`,
    ` */`,
    ``,
    `export const ${cfg.exportVersion} = '${version}';`,
    ``,
    `export const ${cfg.exportCols} = [`,
    `${colsLiteral}`,
    `];`,
    ``,
    `export const ${cfg.exportData} = [`,
    `${rowsLiteral}`,
    `];`,
    ``,
  ].join('\n');

  fs.writeFileSync(cfg.outFile, fileContent, 'utf8');
  console.log(`OK: ${cfg.label} (${rowCount} dòng)`);
  return true;
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
console.log('=== gen_danh_muc_noi_bo.js ===');
let count = 0;
for (const cfg of CATALOG_CONFIGS) {
  if (generateSeedFile(cfg)) count++;
}
console.log(`\nXong! Đã tạo/cập nhật ${count}/${CATALOG_CONFIGS.length} file danh mục.`);
