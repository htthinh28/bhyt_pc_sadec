import {
    DU_LIEU_SEED_LUAT_HANH_CHINH_MUC2,
    PHIEN_BAN_SEED_LUAT_HANH_CHINH_MUC2,
} from './du_lieu_luat_hanh_chinh_muc2';

export const PHIEN_BAN_LUAT_HANH_CHINH_HARDCODED = PHIEN_BAN_SEED_LUAT_HANH_CHINH_MUC2;

const toRuleRow = (row, index) => {
  const maLuat = String(row?.MA_LUAT || row?.ma_luat || `HANHCHINH_HARDCODED_${index + 1}`).trim();
  const trangThai = String(row?.TRANG_THAI || row?.trang_thai || 'ON').trim().toUpperCase() === 'OFF' ? 'OFF' : 'ON';
  const tenQuyTac = String(row?.TEN_QUY_TAC || row?.ten_quy_tac || maLuat).trim();
  const dieuKien = String(row?.DIEU_KIEN || row?.dieu_kien || '').trim();
  const canhBao = String(row?.CANH_BAO || row?.canh_bao || '').trim();

  return {
    ...row,
    id: row?.id || `HARDCODED_HANHCHINH_${index + 1}`,
    TRANG_THAI: trangThai,
    MA_LUAT: maLuat,
    TEN_QUY_TAC: tenQuyTac,
    DIEU_KIEN: dieuKien,
    CANH_BAO: canhBao,
    PHAN_HE: 'LUAT_HANH_CHINH',
    LOAI_QUY_TAC: 'BUILTIN',
    trangthai: trangThai,
    maluat: maLuat,
    tenquytac: tenQuyTac,
    dieukien: dieuKien,
    canhbao: canhBao,
    phanhe: 'LUAT_HANH_CHINH',
    loai_quy_tac: 'BUILTIN',
  };
};

const CACHE_RULES_HARDCODED = (Array.isArray(DU_LIEU_SEED_LUAT_HANH_CHINH_MUC2) ? DU_LIEU_SEED_LUAT_HANH_CHINH_MUC2 : []).map(toRuleRow);

export const layDanhSachLuatHanhChinhHardcoded = () => CACHE_RULES_HARDCODED.map((row) => ({ ...row }));
