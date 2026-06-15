/**
 * QUY TẮC KIỂM TRA HỢP ĐỒNG BHYT (CƠ CHẾ NO-CODE)
 * Căn cứ: Hợp đồng KBCB BHYT ký hàng năm giữa CSYT và Cơ quan BHXH
 * Tham số giờ hành chính / phạm vi: danh mục THONG_TIN_CO_SO.
 */

import { layThamSoHopDong, laTrongGioHanhChinh } from '../tien_ich/cau_hinh_co_so';

const chuanHoaMaLoaiKcb = (value) => {
  const raw = String(value ?? '').trim();
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  return digits ? digits.padStart(2, '0') : raw;
};

export const kiemTraHopDong = (xml1, xml3) => {
  let danhSachLỗi = [];

  const hopDong = layThamSoHopDong();

  if (!hopDong.maCskcb || !xml1) return danhSachLỗi;

  const DIEU_TRI_BAN_NGAY_HOP_LE = hopDong.dieuTriBanNgayHopLe;
  const KHAM_NGOAI_GIO_HOP_LE = hopDong.khamNgoaiGioHopLe;
  const maLoaiKcb = chuanHoaMaLoaiKcb(xml1.MA_LOAI_KCB);

  if (maLoaiKcb === "04" && !DIEU_TRI_BAN_NGAY_HOP_LE) {
    danhSachLỗi.push({
      phan_loai: "HỢP ĐỒNG",
      ma_loi: "HD_01",
      canh_bao: `Hồ sơ có loại KCB là Điều trị nội trú ban ngày (Mã 04) nhưng Hợp đồng hiện tại không đăng ký phạm vi này.`
    });
  }

  if (xml1.MA_LYDO_VVIEN !== "2" && !KHAM_NGOAI_GIO_HOP_LE && xml3 && xml3.length > 0) {
    xml3.forEach(dv => {
      if (dv.NGAY_YL && dv.NGAY_YL.length >= 12) {
        const gioChiDinh = dv.NGAY_YL.substring(8, 12);

        if (!laTrongGioHanhChinh(gioChiDinh)) {
          danhSachLỗi.push({
            phan_loai: "HỢP ĐỒNG",
            ma_loi: "HD_02",
            canh_bao: `Dịch vụ [${dv.TEN_DICH_VU}] được chỉ định lúc ${dv.NGAY_YL.substring(8, 10)}h${dv.NGAY_YL.substring(10, 12)} là ngoài giờ hành chính đã ký kết.`
          });
        }
      }
    });
  }

  return danhSachLỗi;
};
