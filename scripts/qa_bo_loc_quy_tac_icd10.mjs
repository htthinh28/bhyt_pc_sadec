/**
 * QA: phân loại & lọc quy tắc ICD-10 trên dashboard.
 * Chạy: node scripts/qa_bo_loc_quy_tac_icd10.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

// Inline mirror of classification (không import JSX trong node thuần)
const phanLoai = (item) => {
  const maUpper = String(item.ma_luat || '').toUpperCase();
  const dkUpper = String(item.dieu_kien || '').toUpperCase();
  const ten = String(item.ten_quy_tac || '').toUpperCase();
  const ns = String(item.namespace_quy_tac || '').toUpperCase();
  const out = new Set();
  const add = (...ids) => ids.forEach((id) => { if (id) out.add(id); });

  if (/^ICD-TT06-/i.test(item.ma_luat || '') || ns.includes('ICD10_TT06')) {
    add('ICD-TT06', 'ICD10');
    if (/^ICD-TT06-GIOI-/i.test(item.ma_luat || '')) add('ICD-TT06-GIOI-*');
    else if (maUpper.startsWith('ICD-TT06-')) add(maUpper);
  }
  if (maUpper === 'HC_249') add('ICD-CAP-CUU', 'ICD10');
  if (maUpper === 'HC_49' || maUpper === 'THUOC_536') add('ICD-TU-DIEN', 'ICD10');
  if (/^DVKT-OP-0[12]$/i.test(item.ma_luat || '')) add('ICD-DVKT', 'ICD10');
  if (/^THUOC_/i.test(item.ma_luat || '') && /\bMA_BENH/.test(dkUpper)) add('ICD-THUOC', 'ICD10');
  if (ten.includes('THIẾU MÃ BỆNH')) add('ICD-THIEU', 'ICD10');
  return [...out];
};

const khop = (item, filterId) => {
  if (!filterId || filterId === 'TAT_CA') return true;
  const nhom = phanLoai(item);
  if (filterId === 'ICD-TT06') return nhom.some((x) => x === 'ICD-TT06' || String(x).startsWith('ICD-TT06-'));
  return nhom.includes(filterId);
};

assert(khop({ ma_luat: 'ICD-TT06-CAM-CHINH' }, 'ICD-TT06'), 'TT06 group');
assert(khop({ ma_luat: 'ICD-TT06-CAM-CHINH' }, 'ICD-TT06-CAM-CHINH'), 'TT06 exact');
assert(khop({ ma_luat: 'HC_49' }, 'ICD-TU-DIEN'), 'HC_49 tu dien');
assert(khop({ ma_luat: 'THUOC_100', dieu_kien: 'XML1.MA_BENH IN (...)' }, 'ICD-THUOC'), 'thuoc icd');
assert(!khop({ ma_luat: 'XML_99' }, 'ICD10'), 'non-icd excluded');

const boLoc = fs.readFileSync(path.join(root, 'ma_nguon/tien_ich/bo_loc_quy_tac_icd10.jsx'), 'utf8');
const tongQuan = fs.readFileSync(path.join(root, 'ma_nguon/man_hinh/tong_quan.jsx'), 'utf8');
const thongKe = fs.readFileSync(path.join(root, 'ma_nguon/tien_ich/thong_ke_loi_dung_chung.jsx'), 'utf8');

assert(boLoc.includes('DANH_SACH_BO_LOC_QUY_TAC_ICD10'), 'missing filter list');
assert(boLoc.includes('phanLoaiNhomQuyTacIcd'), 'missing classifier');
assert(tongQuan.includes('boLocQuyTacIcd'), 'dashboard missing state');
assert(tongQuan.includes('Quy tắc ICD-10'), 'dashboard missing UI label');
assert(thongKe.includes('nhom_quy_tac_icd'), 'detail row missing icd groups');
assert(thongKe.includes('nhomQuyTacIcd'), 'locDanhSachLoiChiTiet missing icd filter');

console.log(JSON.stringify({ ok: true, tests: ['classify', 'source_integration'] }, null, 2));
