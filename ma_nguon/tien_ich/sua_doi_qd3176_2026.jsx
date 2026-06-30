/**
 * Sửa đổi, bổ sung QĐ 3176/QĐ-BYT (ký 29/6/2026).
 * Điều 1: MUC_HUONG (Bảng 2, 3) tối đa 4 ký tự; SO_DANG_KY (Bảng 2) mã hóa UBND.YYYY.X.S cho thuốc hiếm.
 * Điều 2: hiệu lực từ ngày ký; thực hiện thống nhất từ 01/7/2026 (Điều 2).
 */

import { mocNgayYmdTuXml1 } from './muc_luong_co_so_bhyt';

/** Ngày ký quyết định — áp dụng quy tắc mới khi mốc KCB >= ngày này. */
export const MOC_SUA_DOI_QD3176_KY_YMD = '20260629';

/** Mốc triển khai thống nhất (BHXH/CSKCB) — dùng khi cần đồng bộ với CV 302/LCS. */
export const MOC_SUA_DOI_QD3176_AP_DUNG_YMD = '20260701';

export const CO_SO_PHAP_LY_SUA_DOI_QD3176 =
  'QĐ sửa đổi, bổ sung QĐ 3176/QĐ-BYT (ký 29/6/2026); giữ nguyên các nội dung còn lại theo QĐ 3176, 4750, 130.';

/** Độ dài tối đa MUC_HUONG trước khi có hiệu lực sửa đổi (QĐ 3176 gốc). */
export const MUC_HUONG_MAX_LEN_CU = 3;

/** Độ dài tối đa MUC_HUONG sau sửa đổi QĐ 3176 (2026). */
export const MUC_HUONG_MAX_LEN_MOI = 4;

/** Thuốc hiếm — UBND cấp phép nhập khẩu: UBND.YYYY.X.S */
export const SO_DANG_KY_UBND_THUOC_HIEM_REGEX = /^UBND\.\d{4}\.\d+\.\d+$/i;

export const moTaSoDangKyXml2 = () =>
  'Số đăng ký lưu hành của thuốc. Thuốc hiếm do UBND tỉnh cấp phép nhập khẩu: mã hóa UBND.YYYY.X.S (YYYY=năm cấp GP, X=số VB cấp phép NK, S=STT thuốc trong VB).';

export const chuanHoaNgayYmd = (raw = '') => String(raw || '').replace(/\D/g, '').slice(0, 8);

export const daApDungSuaDoiQd3176 = (ngayYmd = '') => {
  const key = chuanHoaNgayYmd(ngayYmd);
  return Boolean(key && key >= MOC_SUA_DOI_QD3176_KY_YMD);
};

export const layMaxLengthMucHuongChoNgay = (ngayYmd = '') =>
  daApDungSuaDoiQd3176(ngayYmd) ? MUC_HUONG_MAX_LEN_MOI : MUC_HUONG_MAX_LEN_CU;

export const layMaxLengthMucHuongChoXml1 = (xml1 = {}) =>
  layMaxLengthMucHuongChoNgay(mocNgayYmdTuXml1(xml1));

/** Mốc ngày cho dòng XML2/XML3: ưu tiên NGAY_YL → NGAY_TH_YL → XML1. */
export const mocNgayYmdChoDongChiTiet = (row = {}, xml1 = {}) => {
  const tuDong = chuanHoaNgayYmd(row?.NGAY_YL || row?.NGAY_TH_YL);
  if (tuDong) return tuDong;
  return mocNgayYmdTuXml1(xml1);
};

export const layMaxLengthMucHuongChoDong = (row = {}, xml1 = {}) =>
  layMaxLengthMucHuongChoNgay(mocNgayYmdChoDongChiTiet(row, xml1));

export const laSoDangKyUbndThuocHiem = (val) => {
  const s = String(val ?? '').trim();
  return s.length > 0 && /^UBND/i.test(s);
};

export const laDinhDangSoDangKyUbndHopLe = (val) =>
  SO_DANG_KY_UBND_THUOC_HIEM_REGEX.test(String(val ?? '').trim());
