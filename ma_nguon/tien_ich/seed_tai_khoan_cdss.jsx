/**
 * Seed tài khoản đăng nhập CDSS — đồng bộ khi mở màn đăng nhập (tránh lockout sau build mới).
 * RBAC binding: rbac_engine.jsx · Lưu danh sách: nhat_ky_he_thong.jsx
 */
import { taoBanGhiTaiKhoanMoi } from './dich_vu_tai_khoan_cdss';
import { docDanhSachTaiKhoan, luuDanhSachTaiKhoan } from './nhat_ky_he_thong';
import { luuRBAC, taiRBAC } from './rbac_engine';

export const PHIEN_BAN_SEED_TAI_KHOAN = '2026-06-18_v1';

const DU_LIEU_SEED_TAI_KHOAN = [
  {
    email: 'haidang@phuongchau.com',
    hoTen: 'Hải Đăng',
    khoa: 'Phòng Kế hoạch Tổng hợp',
    phong: 'Khối nghiệp vụ',
    chucDanh: 'Nhân viên giám định BHYT',
    soDienThoai: '',
    matKhau: 'sadec@123',
    vaiTro: 'USER',
    trangThai: 'HOAT_DONG',
    buocDoiMatKhau: false,
  },
];

const DU_LIEU_SEED_RBAC_BINDINGS = {
  'haidang@phuongchau.com': {
    roleIds: ['ROLE_QUALITY_MANAGER'],
    groupIds: ['GRP_KHTH'],
    overrides: { allow: [], deny: [] },
    dataScope: 'ALL',
  },
};

let promiseDamBaoSeed = null;

export const damBaoSeedTaiKhoan = async () => {
  if (promiseDamBaoSeed) return promiseDamBaoSeed;

  promiseDamBaoSeed = (async () => {
    const hienTai = await docDanhSachTaiKhoan();
    const emailsHienTai = new Set(hienTai.map((u) => String(u?.email || '').trim().toLowerCase()));
    const canThem = DU_LIEU_SEED_TAI_KHOAN.filter(
      (s) => !emailsHienTai.has(String(s.email || '').trim().toLowerCase()),
    );

    if (canThem.length > 0) {
      const banGhi = canThem.map((s) => taoBanGhiTaiKhoanMoi(s));
      await luuDanhSachTaiKhoan([...hienTai, ...banGhi], 'SYSTEM');
    }

    const cfg = await taiRBAC();
    const bindings = { ...(cfg?.userBindings || {}) };
    let changedBinding = false;
    Object.entries(DU_LIEU_SEED_RBAC_BINDINGS).forEach(([email, binding]) => {
      const em = String(email || '').trim().toLowerCase();
      if (!em || bindings[em]) return;
      bindings[em] = binding;
      changedBinding = true;
    });
    if (changedBinding) {
      await luuRBAC({ ...cfg, userBindings: bindings });
    }

    return {
      ok: true,
      version: PHIEN_BAN_SEED_TAI_KHOAN,
      added_accounts: canThem.length,
      added_bindings: changedBinding,
    };
  })();

  try {
    return await promiseDamBaoSeed;
  } finally {
    promiseDamBaoSeed = null;
  }
};
