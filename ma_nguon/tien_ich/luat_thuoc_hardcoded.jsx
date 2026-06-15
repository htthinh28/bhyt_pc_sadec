import {
    DU_LIEU_SEED_LUAT_THUOC_MUC8,
    PHIEN_BAN_SEED_LUAT_THUOC_MUC8,
} from './du_lieu_luat_thuoc_muc8';

export const PHIEN_BAN_LUAT_THUOC_HARDCODED = PHIEN_BAN_SEED_LUAT_THUOC_MUC8;

const toRuleRow = (row, index) => {
  const maLuat = String(row?.MA_LUAT || row?.ma_luat || `THUOC_HARDCODED_${index + 1}`).trim();
  const trangThai = String(row?.TRANG_THAI || row?.trang_thai || 'ON').trim().toUpperCase() === 'OFF' ? 'OFF' : 'ON';
  const mucDo = String(row?.MUC_DO || row?.muc_do || '').trim();
  return {
    ...row,
    id: row?.id || `HARDCODED_THUOC_${index + 1}`,
    TRANG_THAI: trangThai,
    MA_LUAT: maLuat,
    TEN_QUY_TAC: String(row?.TEN_QUY_TAC || row?.ten_quy_tac || maLuat).trim(),
    DIEU_KIEN: String(row?.DIEU_KIEN || row?.dieu_kien || '').trim(),
    CANH_BAO: String(row?.CANH_BAO || row?.canh_bao || '').trim(),
    PHAN_HE: 'LUAT_THUOC',
    LOAI_QUY_TAC: 'BUILTIN',
    ...(mucDo ? { MUC_DO: mucDo, mucdo: mucDo } : {}),
    trangthai: trangThai,
    maluat: maLuat,
    tenquytac: String(row?.TEN_QUY_TAC || row?.ten_quy_tac || maLuat).trim(),
    dieukien: String(row?.DIEU_KIEN || row?.dieu_kien || '').trim(),
    canhbao: String(row?.CANH_BAO || row?.canh_bao || '').trim(),
    phanhe: 'LUAT_THUOC',
    loai_quy_tac: 'BUILTIN',
  };
};

const CACHE_RULES_HARDCODED = (Array.isArray(DU_LIEU_SEED_LUAT_THUOC_MUC8) ? DU_LIEU_SEED_LUAT_THUOC_MUC8 : []).map(toRuleRow);

/** Quy tắc chung theo thẻ ICD_DRUG_CONTRA (Mapping nghiệp vụ); mặc định OFF — bật sau khi BV đã nhập mapping. */
const LUAT_ICD_DRUG_CONTRA_BO_SUNG = [
  {
    TRANG_THAI: 'ON',
    MA_LUAT: 'THUOC_ICD_CONTRA_MAPPING',
    TEN_QUY_TAC: '[Chung] ICD-10 chống chỉ định (thẻ ICD_DRUG_CONTRA)',
    MUC_DO: 'Critical',
    DIEU_KIEN:
      "!IS_EMPTY(XML2.MA_THUOC) AND !IS_EMPTY(XML2.TEN_THUOC) AND CO_ICD_VI_PHAM_CHONG_CHI_DINH_THUOC(XML2.MA_THUOC, XML2.TEN_THUOC, (XML2.MA_HOAT_CHAT || XML2.TEN_HOAT_CHAT || ''))",
    CANH_BAO:
      '⛔ [XUẤT TOÁN] lỗi Chống chỉ định thuốc {MA_THUOC} {TEN_THUOC} ở XML2',
    GHI_CHU:
      'DSL: CO_ICD_VI_PHAM_CHONG_CHI_DINH_THUOC(ma, tenThuoc, hoatChat); mapping ICD_DRUG_CONTRA (seed + Quản lý → Mapping nghiệp vụ).',
    NGUON_DU_LIEU: 'engine_ICD_DRUG_CONTRA',
  },
];

export const layDanhSachLuatThuocHardcoded = () => {
  const base = CACHE_RULES_HARDCODED.map((row) => ({ ...row }));
  const n0 = CACHE_RULES_HARDCODED.length;
  const extra = LUAT_ICD_DRUG_CONTRA_BO_SUNG.map((row, i) => toRuleRow(row, n0 + i));
  return [...base, ...extra];
};
