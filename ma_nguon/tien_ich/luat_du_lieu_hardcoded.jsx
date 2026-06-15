import {
    DU_LIEU_SEED_LUAT_DU_LIEU_MUC1,
    PHIEN_BAN_SEED_LUAT_DU_LIEU_MUC1,
} from './du_lieu_luat_du_lieu_muc1';

export const PHIEN_BAN_LUAT_DU_LIEU_HARDCODED = PHIEN_BAN_SEED_LUAT_DU_LIEU_MUC1;

const toRuleRow = (row, index) => {
  const maLuat = String(row?.MA_LUAT || row?.ma_luat || `DULIEU_HARDCODED_${index + 1}`).trim();
  const trangThai = String(row?.TRANG_THAI || row?.trang_thai || 'ON').trim().toUpperCase() === 'OFF' ? 'OFF' : 'ON';
  const tenQuyTac = String(row?.TEN_QUY_TAC || row?.ten_quy_tac || maLuat).trim();
  const dieuKien = String(row?.DIEU_KIEN || row?.dieu_kien || '').trim();
  const canhBao = String(row?.CANH_BAO || row?.canh_bao || '').trim();

  return {
    ...row,
    id: row?.id || `HARDCODED_DULIEU_${index + 1}`,
    TRANG_THAI: trangThai,
    MA_LUAT: maLuat,
    TEN_QUY_TAC: tenQuyTac,
    DIEU_KIEN: dieuKien,
    CANH_BAO: canhBao,
    PHAN_HE: 'LUAT_DU_LIEU',
    LOAI_QUY_TAC: 'BUILTIN',
    trangthai: trangThai,
    maluat: maLuat,
    tenquytac: tenQuyTac,
    dieukien: dieuKien,
    canhbao: canhBao,
    phanhe: 'LUAT_DU_LIEU',
    loai_quy_tac: 'BUILTIN',
  };
};

const CACHE_RULES_HARDCODED = (Array.isArray(DU_LIEU_SEED_LUAT_DU_LIEU_MUC1) ? DU_LIEU_SEED_LUAT_DU_LIEU_MUC1 : []).map(toRuleRow);

export const layDanhSachLuatDuLieuHardcoded = () => CACHE_RULES_HARDCODED.map((row) => ({ ...row }));
