/**
 * Cấu hình cơ sở KCB — đọc từ danh mục nội bộ THONG_TIN_CO_SO.
 * Triển khai đa bệnh viện: chỉ cần thay danh mục nội bộ (tab Thông tin Cơ sở + M01–M06).
 */
import KhoDuLieu from './kho_du_lieu';
import { THONG_TIN_CO_SO as SEED_MAC_DINH } from '../thanh_phan/thong_tin_co_so';

let cacheBanGhi = null;

const chuyenThanhBanGhi = (raw) => {
  if (!raw) return null;
  if (Array.isArray(raw)) return raw[0] || null;
  if (typeof raw === 'object') return raw;
  return null;
};

const layBanGhiTuKhoDongBo = () => {
  const tuKho = chuyenThanhBanGhi(KhoDuLieu.layDanhMuc('THONG_TIN_CO_SO', null));
  return tuKho || SEED_MAC_DINH;
};

/** Nạp cấu hình từ kho (gọi trước batch giám định hoặc sau khi lưu danh mục). */
export const taiCauHinhCoSo = async () => {
  try {
    const tuKho = await KhoDuLieu.docDanhMucTuKho('THONG_TIN_CO_SO', null);
    cacheBanGhi = chuyenThanhBanGhi(tuKho) || SEED_MAC_DINH;
  } catch {
    cacheBanGhi = layBanGhiTuKhoDongBo();
  }
  return cacheBanGhi;
};

/** Xóa cache — gọi sau khi cập nhật tab THONG_TIN_CO_SO. */
export const lamMoiCauHinhCoSo = () => {
  cacheBanGhi = null;
};

/** Bản ghi cấu hình hiện hành (đồng bộ). */
export const layCauHinhCoSo = () => cacheBanGhi || layBanGhiTuKhoDongBo();

const chuyenSoNgay = (value, fallback) => {
  const digits = String(value ?? '').replace(/\D/g, '');
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const chuyenGioPhut = (value, fallback) => {
  const digits = String(value ?? '').replace(/\D/g, '').padStart(4, '0').slice(-4);
  return /^\d{4}$/.test(digits) ? digits : fallback;
};

/** Tham số hợp đồng & định danh cơ sở — dùng cho luật HD_* và kiểm tra XML. */
export const layThamSoHopDong = () => {
  const c = layCauHinhCoSo();
  return {
    maCskcb: String(c.MA_CSKCB || '').trim(),
    tenCskcb: String(c.TEN_CSKCB || '').trim(),
    orgId: String(c.ORG_ID || '').trim(),
    hopDongTuNgay: chuyenSoNgay(c.HOP_DONG_TU_NGAY, 20260101),
    hopDongDenNgay: chuyenSoNgay(c.HOP_DONG_DEN_NGAY, 20261231),
    soBanKham: chuyenSoNgay(c.SO_BAN_KHAM, 19),
    gioBatDauSang: chuyenGioPhut(c.GIO_BAT_DAU_SANG, '0700'),
    gioKetThucSang: chuyenGioPhut(c.GIO_KET_THUC_SANG, '1130'),
    gioBatDauChieu: chuyenGioPhut(c.GIO_BAT_DAU_CHIEU, '1300'),
    gioKetThucChieu: chuyenGioPhut(c.GIO_KET_THUC_CHIEU, '1630'),
    khamNgoaiGioHopLe: String(c.KHAM_NGOAI_GIO || '').trim().toLowerCase() === 'có'
      || String(c.KHAM_NGOAI_GIO || '').trim().toLowerCase() === 'co',
    dieuTriBanNgayHopLe: String(c.DIEU_TRI_BAN_NGAY || '').trim().toLowerCase() === 'có'
      || String(c.DIEU_TRI_BAN_NGAY || '').trim().toLowerCase() === 'co',
  };
};

/** Kiểm tra giờ HHMM có nằm trong khung hành chính đã cấu hình. */
export const laTrongGioHanhChinh = (gioPhut) => {
  const p = layThamSoHopDong();
  const g = chuyenGioPhut(gioPhut, '');
  if (!g) return true;
  const trongSang = g >= p.gioBatDauSang && g <= p.gioKetThucSang;
  const trongChieu = g >= p.gioBatDauChieu && g <= p.gioKetThucChieu;
  return trongSang || trongChieu;
};
