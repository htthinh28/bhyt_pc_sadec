/**
 * Bộ lọc quy tắc ICD-10 trên dashboard / báo cáo QPS.
 * Phân loại theo MA_LUAT, namespace, điều kiện và trường lỗi từ engine giám định.
 */
import { BO_LOC_ICD10_TT06 } from './icd10_tt06_loc_danh_muc';

export const NHOM_QUY_TAC_ICD_TAT_CA = 'TAT_CA';

const NHOM_ICD10_CO_BAN = [
  { id: NHOM_QUY_TAC_ICD_TAT_CA, label: 'Tất cả' },
  { id: 'ICD10', label: 'Mọi quy tắc ICD-10' },
  { id: 'ICD-TT06', label: 'TT 06 (tổng)' },
  { id: 'ICD-TU-DIEN', label: 'Từ điển ICD' },
  { id: 'ICD-CAP-CUU', label: 'HC_249 Cấp cứu' },
  { id: 'ICD-KE-DON-30', label: 'Kê đơn >30 ngày' },
  { id: 'ICD-THUOC', label: 'Thuốc × ICD' },
  { id: 'ICD-DVKT', label: 'DVKT × ICD' },
  { id: 'ICD-THIEU', label: 'Thiếu / sai ICD' },
];

const NHOM_ICD10_TT06_CHI_TIET = (BO_LOC_ICD10_TT06 || [])
  .filter((f) => f.id)
  .map((f) => ({ id: f.id, label: f.label, moTa: f.moTa }));

/** Chip lọc dashboard — nhóm cơ bản + cờ TT 06 chi tiết. */
export const DANH_SACH_BO_LOC_QUY_TAC_ICD10 = Object.freeze([
  ...NHOM_ICD10_CO_BAN,
  ...NHOM_ICD10_TT06_CHI_TIET,
]);

const RX_MA_BENH_DK = /\bMA_BENH|MA_BENHKEM\b/i;
const RX_DM_ICD10 = /\bDM_ICD10\b/i;

/**
 * Trả về mảng id nhóm ICD-10 mà một dòng lỗi chi tiết thuộc về.
 * @returns {string[]}
 */
export const phanLoaiNhomQuyTacIcd = (item = {}) => {
  const maLuat = String(item.ma_luat || '').trim();
  const maUpper = maLuat.toUpperCase();
  const dkUpper = String(item.dieu_kien || '').toUpperCase();
  const ten = String(item.ten_quy_tac || '').toUpperCase();
  const ns = String(item.namespace_quy_tac || '').toUpperCase();
  const truong = String(item.truong_loi || '').toUpperCase();
  const cb = String(item.canh_bao || '').toUpperCase();
  const out = new Set();
  const add = (...ids) => ids.forEach((id) => { if (id) out.add(id); });

  if (/^ICD-TT06-/i.test(maLuat) || ns.includes('ICD10_TT06')) {
    add('ICD-TT06', 'ICD10');
    if (/^ICD-TT06-GIOI-/i.test(maLuat)) add('ICD-TT06-GIOI-*');
    else if (maUpper.startsWith('ICD-TT06-')) add(maUpper);
  }

  if (maUpper === 'HC_249' || ns.includes('ICD10_CAP_CUU') || (ten.includes('CẤP CỨU') && ten.includes('ICD'))) {
    add('ICD-CAP-CUU', 'ICD10');
  }

  if (
    /^CLN-THUOC-0[456]$/i.test(maLuat)
    || ns.includes('KE_DON_30')
    || ns.includes('ICD10_KE_DON')
    || dkUpper.includes('KE_DON_TREN_30')
    || dkUpper.includes('ICD10_KE_DON')
  ) {
    add('ICD-KE-DON-30', 'ICD10');
  }

  if (
    maUpper === 'HC_49'
    || maUpper === 'THUOC_536'
    || (RX_DM_ICD10.test(dkUpper) && !/^ICD-TT06-/i.test(maLuat) && maUpper !== 'HC_249')
    || (ten.includes('ICD-10') && (ten.includes('TỪ ĐIỂN') || ten.includes('KHÔNG CÓ TRONG') || ten.includes('DANH MỤC')))
  ) {
    add('ICD-TU-DIEN', 'ICD10');
  }

  if (
    /^XML_1[456]$/i.test(maUpper)
    || (truong.includes('MA_BENH') && (ten.includes('THIẾU') || cb.includes('THIẾU')))
    || ten.includes('KHÔNG CÓ CHẨN ĐOÁN')
    || ten.includes('THIẾU MÃ BỆNH')
  ) {
    add('ICD-THIEU', 'ICD10');
  }

  if (
    /^DVKT-OP-0[12]$/i.test(maLuat)
    || (maUpper.startsWith('DVKT_') && RX_MA_BENH_DK.test(dkUpper))
    || ns.includes('DVKT_OP_ICD')
  ) {
    add('ICD-DVKT', 'ICD10');
  }

  if (
    !out.has('ICD-KE-DON-30')
    && (
      maUpper === 'THUOC_ICD_CONTRA_MAPPING'
      || (/^THUOC_/i.test(maLuat) && (RX_MA_BENH_DK.test(dkUpper) || /ICD/i.test(truong)))
      || (/^CLN-THUOC-/i.test(maLuat) && !/^CLN-THUOC-0[456]$/i.test(maLuat))
      || (ten.includes('ICD') && maUpper.startsWith('THUOC_'))
    )
  ) {
    add('ICD-THUOC', 'ICD10');
  }

  return [...out];
};

/** Kiểm tra dòng lỗi có khớp bộ lọc ICD-10 đang chọn. */
export const khopBoLocQuyTacIcd = (item = {}, filterId = NHOM_QUY_TAC_ICD_TAT_CA) => {
  const id = String(filterId || NHOM_QUY_TAC_ICD_TAT_CA).trim();
  if (!id || id === NHOM_QUY_TAC_ICD_TAT_CA) return true;
  const nhom = Array.isArray(item.nhom_quy_tac_icd) ? item.nhom_quy_tac_icd : phanLoaiNhomQuyTacIcd(item);
  if (id === 'ICD-TT06') {
    return nhom.some((x) => x === 'ICD-TT06' || String(x).startsWith('ICD-TT06-'));
  }
  return nhom.includes(id);
};

export const layNhanBoLocQuyTacIcd = (filterId) => {
  const opt = DANH_SACH_BO_LOC_QUY_TAC_ICD10.find((x) => x.id === filterId);
  return opt?.label || filterId;
};
