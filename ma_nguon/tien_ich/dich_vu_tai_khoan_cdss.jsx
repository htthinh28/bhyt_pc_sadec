/**
 * Dịch vụ tài khoản / mật khẩu CDSS — tách khỏi RBAC và khỏi UI phân quyền.
 * RBAC: rbac_engine.jsx · Lưu danh sách user: nhat_ky_he_thong.jsx
 */

export const KIEM_TRA_EMAIL_CDSS = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAT_KHAU_TOI_THIEU_CDSS = 6;

export const kiemTraDinhDangMatKhau = (matKhau) => {
  const s = String(matKhau || '');
  if (s.length < MAT_KHAU_TOI_THIEU_CDSS) {
    return { ok: false, loi: `Mật khẩu cần tối thiểu ${MAT_KHAU_TOI_THIEU_CDSS} ký tự.` };
  }
  return { ok: true, loi: '' };
};

/** Mật khẩu ngẫu nhiên (tránh ký tự dễ nhầm O/0, I/l). */
export const taoMatKhauNgauNhien = (doDai = 12) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const n = Math.max(8, Math.min(24, Math.floor(Number(doDai) || 12)));
  let out = '';
  try {
    const buf = new Uint32Array(n);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(buf);
      for (let i = 0; i < n; i += 1) {
        out += chars[buf[i] % chars.length];
      }
      return out;
    }
  } catch {
    /* fallback */
  }
  for (let i = 0; i < n; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
};

/**
 * Bản ghi user mới trước khi đưa vào luuDanhSachTaiKhoan (chuanHoaTaiKhoan sẽ bổ sung taoLuc/capNhatLuc).
 */
export const taoBanGhiTaiKhoanMoi = ({
  email,
  hoTen,
  khoa = '',
  phong = '',
  chucDanh = '',
  soDienThoai = '',
  matKhau,
  vaiTro = 'USER',
  trangThai = 'HOAT_DONG',
  buocDoiMatKhau = false,
}) => {
  const em = String(email || '').trim().toLowerCase();
  const ten = String(hoTen || '').trim();
  return {
    email: em,
    ten,
    hoTen: ten,
    khoa: String(khoa || '').trim(),
    phong: String(phong || '').trim(),
    chucDanh: String(chucDanh || '').trim(),
    soDienThoai: String(soDienThoai || '').trim(),
    matKhau: String(matKhau || ''),
    vaiTro: vaiTro === 'ADMIN' ? 'ADMIN' : 'USER',
    trangThai: trangThai === 'KHOA' ? 'KHOA' : 'HOAT_DONG',
    buocDoiMatKhau: buocDoiMatKhau === true,
  };
};

export const capNhatMatKhauTrongDanhSach = (danhSach, email, matKhauMoi, { buocDoiMatKhau = false } = {}) => {
  const em = String(email || '').trim().toLowerCase();
  return (Array.isArray(danhSach) ? danhSach : []).map((u) => {
    if (String(u?.email || '').trim().toLowerCase() !== em) return u;
    return {
      ...u,
      matKhau: String(matKhauMoi || ''),
      buocDoiMatKhau: buocDoiMatKhau === true,
    };
  });
};
