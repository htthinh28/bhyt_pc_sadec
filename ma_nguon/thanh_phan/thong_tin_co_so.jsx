/**
 * THÔNG TIN CƠ SỞ KHÁM BỆNH, CHỮA BỆNH BHYT
 * Được mã hóa từ Hợp đồng KBCB BHYT năm 2025
 */

import { TEN_UNG_DUNG_HOA } from '../tien_ich/ten_ung_dung';

export const PHIEN_BAN_THONG_TIN_CO_SO = '2026.06.1';
export const COT_THONG_TIN_CO_SO = [
  'MA_CSKCB', 'TEN_CSKCB', 'DON_VI_THU_HUONG', 'ORG_ID',
  'HOP_DONG_TU_NGAY', 'HOP_DONG_DEN_NGAY',
  'GIO_BAT_DAU_SANG', 'GIO_KET_THUC_SANG', 'GIO_BAT_DAU_CHIEU', 'GIO_KET_THUC_CHIEU',
  'KHAM_NGOAI_GIO', 'DIEU_TRI_BAN_NGAY',
  'DIA_CHI', 'DIEN_THOAI', 'EMAIL', 'SO_BAN_KHAM', 'GIUONG_PHE_DUYET',
  'CAP_CHUYEN_MON', 'TUYEN_CHUYEN_MON', 'GIA_AP_DUNG',
];
export const THONG_TIN_CO_SO = {
  // --- THÔNG TIN HÀNH CHÍNH CƠ BẢN ---
  MA_CSKCB: "94170",
  TEN_CSKCB: TEN_UNG_DUNG_HOA,
  DON_VI_THU_HUONG: TEN_UNG_DUNG_HOA,
  ORG_ID: "phuongchau",

  // --- HỢP ĐỒNG BHYT (tham số luật HD_* — sửa tại tab Thông tin Cơ sở khi triển khai BV khác) ---
  HOP_DONG_TU_NGAY: "20260101",
  HOP_DONG_DEN_NGAY: "20261231",
  GIO_BAT_DAU_SANG: "0700",
  GIO_KET_THUC_SANG: "1130",
  GIO_BAT_DAU_CHIEU: "1300",
  GIO_KET_THUC_CHIEU: "1630",
  KHAM_NGOAI_GIO: "Không",
  DIEU_TRI_BAN_NGAY: "Không",
  
  // --- PHÂN TUYẾN & CHUYÊN MÔN ---
  CAP_CHUYEN_MON: "Cơ bản", 
  TUYEN_CHUYEN_MON: "Huyện", 
  DIEM_XEP_CAP: 48,
  MO_HINH_TO_CHUC: "Ngoài công lập",
  HINH_THUC_TO_CHUC: "Bệnh viện đa khoa",
  GIA_AP_DUNG: "Tư nhân theo giá công lập", 
  
  // --- LIÊN HỆ & PHÁP LÝ ---
  DIA_CHI: "Số 373, đường Phú Lợi, Phường Phú Lợi, Thành phố Cần Thơ", 
  DIEN_THOAI: "02993526868",
  FAX: "02993526868",
  EMAIL: "khth.st@phuongchau.com",
  MA_SO_THUE: "2200750211-001",
  TAI_KHOAN_NGAN_HANG: "115884686868 tại VietinBank Chi Nhánh Sóc Trăng",
  
  // --- NHÂN SỰ CHỦ CHỐT ---
  GIAM_DOC: "Dư Huỳnh Hồng Ngọc",
  NGUOI_CHIU_TRACH_NHIEM_CM: "Dư Huỳnh Hồng Ngọc",
  CCHN_NGUOI_PHU_TRACH: "000012/ST-CCHN",
  
  // --- GIẤY PHÉP & QUY MÔ ---
  GIAY_PHEP_HOAT_DONG: "Số 303/BYT-GPHĐ, ngày 03/12/2025",
  GIUONG_PHE_DUYET: 100,
  SO_BAN_KHAM: 19,
  
  // --- THẺ ĐĂNG KÝ BHYT BAN ĐẦU (NĂM 2025) ---
  THE_BHYT_BAN_DAU: 518,
  
  // --- THỜI GIAN LÀM VIỆC ĐĂNG KÝ VỚI BHXH ---
  THOI_GIAN_KHAM_BENH: {
    TRONG_GIO: "07:00 - 11:30 và 13:00 - 16:30 (Thứ 2 - Thứ 7)",
    NGAY_NGHI: "07:00 - 11:30 và 13:00 - 16:30 (Chủ nhật)",
    CAP_CUU: "24/24"
  }
};

const giaTriCotThongTinCoSo = (key) => {
  const value = THONG_TIN_CO_SO[key];
  if (value === undefined || value === null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

/** Một dòng danh mục — dùng import/seed Quản lý danh mục. */
export const DANH_MUC_THONG_TIN_CO_SO = [
  Object.fromEntries(COT_THONG_TIN_CO_SO.map((key) => [key, giaTriCotThongTinCoSo(key)])),
];