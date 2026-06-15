/**
 * Import catalog_mapping từ Excel (.xlsx) — cùng cột với xuất từ màn Mapping nghiệp vụ
 * (Loai, Ma_nguon, Ma_thuc_hien, Hieu_luc_tu, Hieu_luc_den, Trang_thai, Duyet, Uu_tien).
 * STAFF_DVKT: cột Ma_chi_dinh (nếu có trong file cũ) được gộp vào Ma_thuc_hien, không lưu riêng.
 */
import * as XLSX from 'xlsx';
import { noiChuoiNhieuMa, tachChuoiNhieuMa } from './catalog_mapping_chuoi_ma';
import { taoIdMapping } from './catalog_mapping_luu_tru';
import {
  laMappingNhieuMaDich,
  laMappingNhieuMaNguon,
  laMappingNhieuMaNguonIcd,
  layCauHinhLoaiMapping,
} from './catalog_mapping_types';

const chuanHoaKhoa = (k) =>
  String(k || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');

/** Lấy giá trị ô theo một trong các tên cột (không phân biệt hoa thường / dấu nhẹ). */
export const layGiaTriTheoTenCot = (raw, candidates) => {
  const map = {};
  Object.keys(raw || {}).forEach((k) => {
    map[chuanHoaKhoa(k)] = raw[k];
  });
  for (const c of candidates) {
    const key = chuanHoaKhoa(c);
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      const v = map[key];
      if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
    }
  }
  return '';
};

const chonSheetTuWorkbook = (wb) => {
  const names = wb.SheetNames || [];
  const idx = names.findIndex((n) => String(n || '').trim().toLowerCase() === 'mapping');
  const name = idx >= 0 ? names[idx] : names[0];
  return name ? wb.Sheets[name] : null;
};

/** Đọc workbook (đã XLSX.read) → mảng object từ sheet mapping hoặc sheet đầu. */
export const workbookToJsonRows = (wb) => {
  const ws = chonSheetTuWorkbook(wb);
  if (!ws) return [];
  return XLSX.utils.sheet_to_json(ws, { defval: '', raw: false });
};

const chuanHoaNgay = (s) => {
  const t = String(s || '').trim();
  if (!t) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10);
  const d = new Date(t);
  if (Number.isFinite(d.getTime())) return d.toISOString().slice(0, 10);
  return null;
};

const chuanHoaTrangThai = (s) => {
  const u = String(s || '').trim().toUpperCase();
  if (!u || u === 'ACTIVE' || u === 'ON' || u === '1' || u === 'TRUE') return true;
  if (u === 'INACTIVE' || u === 'OFF' || u === '0' || u === 'FALSE') return false;
  return true;
};

const chuanHoaDuyet = (s, requireApproval) => {
  const u = String(s || '').trim().toUpperCase();
  if (u === 'APPROVED' || u === 'ĐÃ DUYỆT' || u === 'DA DUYET') return 'APPROVED';
  if (u === 'REJECTED' || u === 'TỪ CHỐI' || u === 'TU CHOI') return 'REJECTED';
  if (u === 'PENDING' || u === 'CHỜ' || u === 'CHO') return 'PENDING';
  return requireApproval ? 'PENDING' : 'APPROVED';
};

/** Tách tên thuốc theo `;` (giữ dấu phẩy trong từng tên, ví dụ nồng độ 0,10g/ml). */
const tachTenThuocMappingExport = (s) =>
  String(s || '')
    .split(';')
    .map((x) => x.trim())
    .filter(Boolean);

/**
 * Một dòng sheet (object từ sheet_to_json) → bản ghi catalog_mapping.
 * @returns {{ row?: object, error?: string }}
 */
export const dongExcelThanhBanGhiMapping = (raw) => {
  const loai = layGiaTriTheoTenCot(raw, ['Loai', 'Loại', 'mapping_type', 'MAPPING_TYPE', 'loai_mapping']);
  if (!loai) return { error: 'Thiếu cột loại (Loai / mapping_type).' };
  const mtRaw = loai.trim().toUpperCase().replace(/\s+/g, '_');
  const mt =
    mtRaw.startsWith('ICD_DRUG_CONTRA') || mtRaw.startsWith('THUOC_CCD') ? 'ICD_DRUG_CONTRA' : mtRaw;
  const cfg = layCauHinhLoaiMapping(mt);
  if (!cfg) return { error: `Loại mapping không hợp lệ: ${loai}` };

  const maNguon = layGiaTriTheoTenCot(raw, ['Ma_nguon', 'Mã nguồn', 'ma_nguon', 'source_code', 'MA_NGUON']);
  const maChiDinh = layGiaTriTheoTenCot(raw, ['Ma_chi_dinh', 'Mã chỉ định', 'ma_chi_dinh', 'MA_CHI_DINH']);
  const maThucHien = layGiaTriTheoTenCot(raw, ['Ma_thuc_hien', 'Mã TH', 'ma_thuc_hien', 'MA_TH', 'target_code']);

  let metadata = {};
  let source_code = '';
  let target_code = '';

  if (mt === 'STAFF_DVKT') {
    if (!maNguon) return { error: 'STAFF_DVKT: thiếu Ma_nguon (mã nhân sự).' };
    source_code = maNguon;
    const chiLegacy = tachChuoiNhieuMa(maChiDinh);
    const thuc = tachChuoiNhieuMa(maThucHien);
    const codes = [...new Set([...chiLegacy, ...thuc])];
    if (!codes.length) return { error: 'STAFF_DVKT: cần Ma_thuc_hien (hoặc cột Ma_chi_dinh cũ — sẽ gộp vào mã thực hiện).' };
    metadata.target_codes_thuc_hien = codes;
    target_code = noiChuoiNhieuMa(codes);
  } else if (laMappingNhieuMaNguonIcd(mt)) {
    const srcs = tachChuoiNhieuMa(maNguon);
    if (!srcs.length) return { error: `${mt}: thiếu Ma_nguon (mã ICD, có thể nhiều mã cách bởi ; hoặc ,).` };
    metadata.source_icd_codes = srcs;
    source_code = noiChuoiNhieuMa(srcs);
    const tgts = tachChuoiNhieuMa(maThucHien || maChiDinh);
    if (!tgts.length) return { error: `${mt}: thiếu Ma_thuc_hien (mã đích — thuốc/DVKT/VTYT).` };
    metadata.target_codes = tgts;
    target_code = noiChuoiNhieuMa(tgts);
    if (mt === 'ICD_DRUG_CONTRA') {
      const tenTh = layGiaTriTheoTenCot(raw, [
        'Ten_thuc_hien',
        'Tên TH',
        'ten_thuc_hien',
        'TEN_THUC_HIEN',
      ]);
      const parts = tachTenThuocMappingExport(tenTh);
      if (parts.length) {
        metadata.khop_bang_ten_hoat_chat = true;
        metadata.ten_thuoc_aliases = parts;
      }
    }
  } else if (mt === 'STAFF_EQUIPMENT' || mt === 'DVKT_EQUIPMENT') {
    const srcs = tachChuoiNhieuMa(maNguon);
    if (!srcs.length) return { error: `${mt}: thiếu Ma_nguon (mã nguồn).` };
    metadata.source_codes = srcs;
    source_code = noiChuoiNhieuMa(srcs);
    const tgts = tachChuoiNhieuMa(maThucHien || maChiDinh);
    if (!tgts.length) return { error: `${mt}: thiếu Ma_thuc_hien (mã máy/thiết bị hoặc mã đích).` };
    metadata.target_codes = tgts;
    target_code = noiChuoiNhieuMa(tgts);
  } else if (laMappingNhieuMaDich(mt)) {
    if (!maNguon) return { error: `${mt}: thiếu Ma_nguon.` };
    source_code = maNguon;
    const tgts = tachChuoiNhieuMa(maThucHien || maChiDinh);
    if (!tgts.length) return { error: `${mt}: thiếu Ma_thuc_hien (mã đích, có thể nhiều mã).` };
    metadata.target_codes = tgts;
    target_code = noiChuoiNhieuMa(tgts);
  } else {
    if (!maNguon || !(maThucHien || maChiDinh)) {
      return { error: `${mt}: cần Ma_nguon và Ma_thuc_hien (hoặc Ma_chi_dinh).` };
    }
    source_code = maNguon;
    target_code = String(maThucHien || maChiDinh).trim();
  }

  const hlTu = chuanHoaNgay(layGiaTriTheoTenCot(raw, ['Hieu_luc_tu', 'Hiệu lực từ', 'effective_from']));
  const hlDen = chuanHoaNgay(layGiaTriTheoTenCot(raw, ['Hieu_luc_den', 'Hiệu lực đến', 'effective_to']));
  const uu = layGiaTriTheoTenCot(raw, ['Uu_tien', 'Ưu tiên', 'priority']);
  const pr = Number(uu);
  const priority = Number.isFinite(pr) ? pr : 0;
  const is_active = chuanHoaTrangThai(layGiaTriTheoTenCot(raw, ['Trang_thai', 'Trạng thái', 'is_active']));
  const duyetRaw = layGiaTriTheoTenCot(raw, ['Duyet', 'Duyệt', 'approval_status']);
  const approval_status = chuanHoaDuyet(duyetRaw, !!cfg.require_approval);

  const ts = new Date().toISOString();
  const row = {
    id: taoIdMapping(),
    mapping_type: mt,
    source_catalog: cfg.source_catalog,
    target_catalog: cfg.target_catalog,
    source_id: 0,
    target_id: 0,
    source_code,
    target_code,
    effective_from: hlTu,
    effective_to: hlDen,
    priority,
    is_active,
    metadata,
    approval_status,
    created_at: ts,
    updated_at: ts,
    created_by: '',
    updated_by: '',
  };
  return { row };
};

/**
 * Một dòng Excel ICD_DRUG_CONTRA với nhiều mã thuốc + cùng số cụm tên → tách thành nhiều bản ghi (khớp mã–tên đúng cặp).
 */
const tachDongIcdDrugContraNhieuThuoc = (row, raw) => {
  if (!row || String(row.mapping_type || '').toUpperCase() !== 'ICD_DRUG_CONTRA') return [row];
  const md = row.metadata && typeof row.metadata === 'object' ? row.metadata : {};
  const tgts = Array.isArray(md.target_codes) ? md.target_codes.map((c) => String(c || '').trim()).filter(Boolean) : [];
  if (tgts.length <= 1) return [row];
  const tenTh = layGiaTriTheoTenCot(raw, [
    'Ten_thuc_hien',
    'Tên TH',
    'ten_thuc_hien',
    'TEN_THUC_HIEN',
  ]);
  const aliases = tachTenThuocMappingExport(tenTh);
  if (aliases.length !== tgts.length) return [row];
  const srcIcd = Array.isArray(md.source_icd_codes) ? md.source_icd_codes : [];
  return tgts.map((code, idx) => ({
    ...row,
    id: taoIdMapping(),
    target_code: code,
    metadata: {
      ...md,
      target_codes: [code],
      ten_thuoc_aliases: aliases[idx] ? [aliases[idx]] : [],
      khop_bang_ten_hoat_chat: true,
      source_icd_codes: srcIcd,
    },
  }));
};

/**
 * @param {object[]} jsonRows — XLSX.utils.sheet_to_json
 * @returns {{ rows: object[], errors: { line: number, message: string }[] }}
 */
export const sheetJsonToMappingRows = (jsonRows) => {
  const rows = [];
  const errors = [];
  if (!Array.isArray(jsonRows)) return { rows, errors };
  jsonRows.forEach((raw, i) => {
    const loai = layGiaTriTheoTenCot(raw, ['Loai', 'Loại', 'mapping_type']);
    const maN = layGiaTriTheoTenCot(raw, ['Ma_nguon', 'Mã nguồn', 'source_code']);
    if (!loai && !maN) return;
    const line = i + 2;
    const { row, error } = dongExcelThanhBanGhiMapping(raw);
    if (error) errors.push({ line, message: error });
    else tachDongIcdDrugContraNhieuThuoc(row, raw).forEach((r) => rows.push(r));
  });
  return { rows, errors };
};
