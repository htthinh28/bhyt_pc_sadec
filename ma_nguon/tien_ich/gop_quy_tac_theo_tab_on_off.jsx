/**
 * Pipeline gộp quy tắc theo tab — dùng chung màn Quản lý ON/OFF và Thư viện tra cứu
 * (cùng tronRuleKhongTrung + hopNhat theo tab.id + cùng nguồn hardcoded/seed/DVKT-OP).
 */
import { DU_LIEU_SEED_LUAT_PTTT_MUC11 } from './du_lieu_luat_pttt_muc11';
import { layQuyTacDvktOpMacDinh } from './dvkt_op_giam_dinh';
import { hopNhatQuyTacTrungTheoDoiTuong } from './hop_nhat_quy_tac_trung_lap';
import { layDanhSachLuatCdhaHardcoded } from './luat_cdha_hardcoded';
import { layDanhSachLuatCongKhamHardcoded } from './luat_cong_kham_hardcoded';
import { layDanhSachLuatDuLieuHardcoded } from './luat_du_lieu_hardcoded';
import { layDanhSachLuatGiamDinhChuyenDeHardcoded } from './luat_giam_dinh_chuyen_de_hardcoded';
import { layDanhSachLuatGiuongHardcoded } from './luat_giuong_hardcoded';
import { layDanhSachLuatHanhChinhHardcoded } from './luat_hanh_chinh_hardcoded';
import { layDanhSachLuatHopDongHardcoded } from './luat_hop_dong_hardcoded';
import { layDanhSachLuatNhanSuHardcoded } from './luat_nhan_su_hardcoded';
import { layDanhSachLuatThuocHardcoded } from './luat_thuoc_hardcoded';
import {
  apGhiDeChoDongNoiBo,
  isQuyTacNoiBoDangBat,
  suyRaThongTinQuanTriQuyTac,
  taoDanhSachQuyTacNoiBoTheoTab,
} from './quy_tac_on_off_noi_bo.jsx';
import { DANH_SACH_TAB_MAC_DINH } from './cau_hinh_tab_quy_tac_on_off';

export const layMaLuat = (row) => String(row?.MA_LUAT || row?.ma_luat || '').trim();
export const layTenQuyTac = (row) => String(row?.TEN_QUY_TAC || row?.ten_quy_tac || row?.TEN || row?.MA_LUAT || 'Quy tắc không tên');

export const lamGiauMetaQuanTriQuyTac = (row = {}) => {
  const thongTinQuanTri = suyRaThongTinQuanTriQuyTac(row);
  const nhomCanhBao = String(row?.NHOM_CANH_BAO || row?.nhom_canh_bao || thongTinQuanTri.nhom_canh_bao || 'CANH_BAO').toUpperCase() === 'XUAT_TOAN'
    ? 'XUAT_TOAN'
    : 'CANH_BAO';

  return {
    ...(row || {}),
    NHOM_CANH_BAO: nhomCanhBao,
    TAG_CANH_BAO: String(row?.TAG_CANH_BAO || row?.tag_canh_bao || thongTinQuanTri.tag_canh_bao || '').trim(),
    TAG_NGUON_CANH_BAO: String(row?.TAG_NGUON_CANH_BAO || row?.tag_nguon_canh_bao || thongTinQuanTri.tag_nguon_canh_bao || '').trim(),
    CHI_TIET_CANH_BAO: String(row?.CHI_TIET_CANH_BAO || row?.chi_tiet_canh_bao || thongTinQuanTri.chi_tiet_canh_bao || '').trim(),
  };
};

const taoDongNoiBoTuNguon = (row, index, prefixId, maMacDinh, mapTrangThaiNoiBo) => {
  const maLuat = layMaLuat(row) || `${maMacDinh}_${index + 1}`;
  const macDinhBat = row?.TRANG_THAI !== 'OFF';
  return lamGiauMetaQuanTriQuyTac({
    ...(row || {}),
    id: row?.id || `${prefixId}-${index + 1}`,
    MA_LUAT: maLuat,
    TEN_QUY_TAC: layTenQuyTac(row),
    DIEU_KIEN: String(row?.DIEU_KIEN || row?.dieu_kien || ''),
    CANH_BAO: String(row?.CANH_BAO || row?.canh_bao || ''),
    TRANG_THAI: isQuyTacNoiBoDangBat(maLuat, mapTrangThaiNoiBo, macDinhBat) ? 'ON' : 'OFF',
    LOAI_QUY_TAC: 'BUILTIN',
    _kind: 'BUILTIN',
  });
};

export const tronRuleKhongTrung = (...sources) => {
  const seen = new Set();
  const out = [];
  sources.flat().forEach((row) => {
    const ma = String(row?.MA_LUAT || row?.ma_luat || '').trim().toUpperCase();
    const ten = String(row?.TEN_QUY_TAC || row?.ten_quy_tac || '').trim().toUpperCase();
    const dk = String(row?.DIEU_KIEN || row?.dieu_kien || '').trim().toUpperCase();
    const cb = String(row?.CANH_BAO || row?.canh_bao || '').trim().toUpperCase();
    const signature = `${ma}||${ten}||${dk}||${cb}`;
    if (!ma && !ten && !dk && !cb) return;
    if (seen.has(signature)) return;
    seen.add(signature);
    out.push(row);
  });
  return out;
};

/** Map DEFAULT_DVKT_RULES → cùng schema hàng luật (PHAN_HE LUAT_CDHA) — đồng bộ với Thư viện. */
const dvktOpRuleThanhHangLuat = (r) => {
  const code = String(r.RULE_CODE || r.RULE_NAME || '').trim() || 'DVKT-OP-?';
  const op = String(r.OPERATOR || '').trim();
  const sev = String(r.SEVERITY || '').trim();
  return {
    MA_LUAT: code,
    TEN_QUY_TAC: String(r.RULE_NAME || code).trim(),
    CANH_BAO: String(r.ALERT_MESSAGE || '').trim(),
    DIEU_KIEN: [`Toán tử: ${op || '—'}`, `Mức: ${sev || '—'}`].join('\n'),
    TRANG_THAI: String(r.STATUS || 'ON').toUpperCase() === 'OFF' ? 'OFF' : 'ON',
    PHAN_HE: 'LUAT_CDHA',
    NGUON_DU_LIEU: 'dvkt_op_giam_dinh.jsx (DEFAULT_DVKT_RULES)',
  };
};

/**
 * Gộp dataset + mẫu nội bộ + hardcoded theo từng tab (cùng logic màn ON/OFF).
 * — LUAT_CDHA: CDHA + chuyên đề + DVKT-OP mặc định.
 * — LUAT_PTTT: thêm seed mục 11 từ bundle (trước khi merge storage).
 */
export const gopDuLieuMotTabQuyTac = (tab, dataRows, builtInRows, mapTrangThaiNoiBo, mapGhiDeNoiBo) => {
  if (tab.id === 'LUAT_DU_LIEU') {
    const dsHardcoded = layDanhSachLuatDuLieuHardcoded().map((row, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(taoDongNoiBoTuNguon(row, index, 'hardcoded-dulieu', 'DULIEU_HARDCODED', mapTrangThaiNoiBo), mapGhiDeNoiBo),
    ));
    return tronRuleKhongTrung(dataRows, builtInRows, dsHardcoded);
  }
  if (tab.id === 'LUAT_HANH_CHINH') {
    const dsHardcoded = layDanhSachLuatHanhChinhHardcoded().map((row, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(taoDongNoiBoTuNguon(row, index, 'hardcoded-hanhchinh', 'HANHCHINH_HARDCODED', mapTrangThaiNoiBo), mapGhiDeNoiBo),
    ));
    return tronRuleKhongTrung(dataRows, builtInRows, dsHardcoded);
  }
  if (tab.id === 'LUAT_THUOC') {
    const dsHardcoded = layDanhSachLuatThuocHardcoded().map((row, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(taoDongNoiBoTuNguon(row, index, 'hardcoded-thuoc', 'THUOC_HARDCODED', mapTrangThaiNoiBo), mapGhiDeNoiBo),
    ));
    return tronRuleKhongTrung(dataRows, builtInRows, dsHardcoded);
  }
  if (tab.id === 'LUAT_CDHA') {
    const cdhaChuyen = tronRuleKhongTrung(
      layDanhSachLuatCdhaHardcoded(),
      layDanhSachLuatGiamDinhChuyenDeHardcoded(),
    ).map((row, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(taoDongNoiBoTuNguon(row, index, 'hardcoded-cdha', 'CDHA_HARDCODED', mapTrangThaiNoiBo), mapGhiDeNoiBo),
    ));
    const dvktOpDong = (layQuyTacDvktOpMacDinh() || []).map((r, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(taoDongNoiBoTuNguon(dvktOpRuleThanhHangLuat(r), index, 'dvkt-op', 'DVKT_OP', mapTrangThaiNoiBo), mapGhiDeNoiBo),
    ));
    return tronRuleKhongTrung(dataRows, builtInRows, cdhaChuyen, dvktOpDong);
  }
  if (tab.id === 'LUAT_CONG_KHAM') {
    const dsHardcoded = layDanhSachLuatCongKhamHardcoded().map((row, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(taoDongNoiBoTuNguon(row, index, 'hardcoded-congkham', 'CK_HARDCODED', mapTrangThaiNoiBo), mapGhiDeNoiBo),
    ));
    return tronRuleKhongTrung(dataRows, builtInRows, dsHardcoded);
  }
  if (tab.id === 'LUAT_NHAN_SU') {
    const dsHardcoded = layDanhSachLuatNhanSuHardcoded().map((row, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(taoDongNoiBoTuNguon(row, index, 'hardcoded-nhansu', 'NS_HARDCODED', mapTrangThaiNoiBo), mapGhiDeNoiBo),
    ));
    return tronRuleKhongTrung(dataRows, builtInRows, dsHardcoded);
  }
  if (tab.id === 'LUAT_GIUONG') {
    const dsHardcoded = layDanhSachLuatGiuongHardcoded().map((row, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(taoDongNoiBoTuNguon(row, index, 'hardcoded-giuong', 'GB_HARDCODED', mapTrangThaiNoiBo), mapGhiDeNoiBo),
    ));
    return tronRuleKhongTrung(dataRows, builtInRows, dsHardcoded);
  }
  if (tab.id === 'LUAT_HOP_DONG') {
    const dsHardcoded = layDanhSachLuatHopDongHardcoded().map((row, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(taoDongNoiBoTuNguon(row, index, 'hardcoded-hopdong', 'HD_HARDCODED', mapTrangThaiNoiBo), mapGhiDeNoiBo),
    ));
    return tronRuleKhongTrung(dataRows, builtInRows, dsHardcoded);
  }
  if (tab.id === 'LUAT_PTTT') {
    const seedRows = (DU_LIEU_SEED_LUAT_PTTT_MUC11 || []).map((row, index) => lamGiauMetaQuanTriQuyTac(
      apGhiDeChoDongNoiBo(
        taoDongNoiBoTuNguon({ ...row, PHAN_HE: row?.PHAN_HE || 'LUAT_PTTT' }, index, 'seed-pttt-m11', 'PTTT_SEED', mapTrangThaiNoiBo),
        mapGhiDeNoiBo,
      ),
    ));
    return tronRuleKhongTrung(dataRows, builtInRows, seedRows);
  }
  return tronRuleKhongTrung(dataRows, builtInRows);
};

/**
 * @param {Record<string, object[]>} [dataTheoTab] — mỗi tabId → dòng CDSS_DATA (đã chuẩn hoá object, chưa _kind).
 * @param {Record<string, string>} [mapTrangThaiNoiBo]
 * @param {Record<string, object>} [mapGhiDeNoiBo]
 * @returns {Record<string, object[]>} cùng dạng `duLieuTheoTab` sau hopNhatQuyTacTrungTheoDoiTuong theo tab.
 */
export const tinhDuLieuTheoTabTuNguonGiongOnOff = ({
  dataTheoTab = {},
  mapTrangThaiNoiBo = {},
  mapGhiDeNoiBo = {},
} = {}) => {
  const duLieuNoiBoTheoTab = taoDanhSachQuyTacNoiBoTheoTab(mapTrangThaiNoiBo);
  const ketQua = {};
  for (const tab of DANH_SACH_TAB_MAC_DINH) {
    const dataLoaded = dataTheoTab[tab.id] || [];
    const dataRows = (Array.isArray(dataLoaded) ? dataLoaded : []).map((row) => lamGiauMetaQuanTriQuyTac({
      ...row,
      TRANG_THAI: row?.TRANG_THAI === 'OFF' ? 'OFF' : 'ON',
      _kind: 'DATASET',
    }));
    const builtInRows = (duLieuNoiBoTheoTab[tab.id] || []).map((row) => lamGiauMetaQuanTriQuyTac(
      { ...apGhiDeChoDongNoiBo(row, mapGhiDeNoiBo), _kind: 'BUILTIN' },
    ));
    const merged = gopDuLieuMotTabQuyTac(tab, dataRows, builtInRows, mapTrangThaiNoiBo, mapGhiDeNoiBo);
    ketQua[tab.id] = hopNhatQuyTacTrungTheoDoiTuong(merged, () => tab.id);
  }
  return ketQua;
};
