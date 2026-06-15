/** Cấu hình tab ON/OFF — một nguồn dùng chung cho Quản lý ON/OFF, Thư viện, gộp quy tắc. */

export const DANH_SACH_TAB_MAC_DINH = [
  { id: 'LUAT_DU_LIEU', ten: 'Cấu trúc XML' },
  { id: 'LUAT_HANH_CHINH', ten: 'Hành chính' },
  { id: 'LUAT_CHUYEN_TUYEN', ten: 'Chuyển tuyến' },
  { id: 'LUAT_HOP_DONG', ten: 'Hợp đồng' },
  { id: 'LUAT_CONG_KHAM', ten: 'Công khám' },
  { id: 'LUAT_CDHA', ten: 'DVKT/CĐHA' },
  { id: 'LUAT_MAU', ten: 'Máu' },
  { id: 'LUAT_THUOC', ten: 'Thuốc' },
  { id: 'LUAT_GIUONG', ten: 'Giường bệnh' },
  { id: 'LUAT_NHAN_SU', ten: 'Nhân sự' },
  { id: 'LUAT_PTTT', ten: 'Phẫu thuật/Thủ thuật' },
];

export const ALIAS_TAB_ID = {
  LUAT_DU_LIEU: 'XML_DATA',
  XML_DATA: 'LUAT_DU_LIEU',
  LUAT_HANH_CHINH: 'XML1',
  XML1: 'LUAT_HANH_CHINH',
  LUAT_CONG_KHAM: 'KHAM_BENH',
  KHAM_BENH: 'LUAT_CONG_KHAM',
  LUAT_CDHA: 'XML3',
  XML3: 'LUAT_CDHA',
  LUAT_THUOC: 'XML2',
  XML2: 'LUAT_THUOC',
  LUAT_CHUYEN_TUYEN: 'NHAP_VIEN',
  NHAP_VIEN: 'LUAT_CHUYEN_TUYEN',
  LUAT_GIUONG: 'NOI_TRU',
  NOI_TRU: 'LUAT_GIUONG',
  LUAT_PTTT: 'PTTT',
  PTTT: 'LUAT_PTTT',
  LUAT_MAU: 'GAY_ME',
  GAY_ME: 'LUAT_MAU',
  LUAT_NHAN_SU: 'HAU_PHAU',
  HAU_PHAU: 'LUAT_NHAN_SU',
  LUAT_HOP_DONG: 'XUAT_VIEN',
  XUAT_VIEN: 'LUAT_HOP_DONG',
};

export const NHOM_HIEN_THI = {
  LUAT_DU_LIEU: 'Cấu trúc',
  LUAT_HANH_CHINH: 'Hành chính',
  LUAT_CHUYEN_TUYEN: 'Chuyển tuyến',
  LUAT_HOP_DONG: 'Hợp đồng',
  LUAT_CONG_KHAM: 'Công khám',
  LUAT_CDHA: 'DVKT',
  LUAT_MAU: 'Máu',
  LUAT_THUOC: 'Thuốc',
  LUAT_GIUONG: 'Giường bệnh',
  LUAT_NHAN_SU: 'Nhân viên',
  LUAT_PTTT: 'PTTT',
};

export const chuanHoaTabId = (tabId) => String(tabId || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

export const layTabIdTuStorageKey = (key) => {
  if (key.includes('_CHUNK_') || key.endsWith('_CHUNKS')) return '';
  if (key.startsWith('CDSS_DATA_')) return key.substring('CDSS_DATA_'.length);
  return '';
};

export const timTabUngVien = (tabId, tapTabTrongStorage) => {
  const ungVien = new Set();
  const aliasId = ALIAS_TAB_ID[tabId];
  const normTab = chuanHoaTabId(tabId);
  const normAlias = chuanHoaTabId(aliasId);

  ungVien.add(tabId);
  if (aliasId) ungVien.add(aliasId);

  (tapTabTrongStorage || []).forEach((id) => {
    const normId = chuanHoaTabId(id);
    if (normId && (normId === normTab || (normAlias && normId === normAlias))) {
      ungVien.add(id);
    }
  });

  return Array.from(ungVien);
};
