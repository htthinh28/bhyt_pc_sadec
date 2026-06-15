/**
 * Tải CDSS_DATA_* + map ON/OFF và trả về `duLieuTheoTab` giống màn Quản lý ON/OFF
 * (dùng Thư viện để số liệu & bản ghi đồng bộ).
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import {
  DANH_SACH_TAB_MAC_DINH,
  layTabIdTuStorageKey,
  timTabUngVien,
} from './cau_hinh_tab_quy_tac_on_off';
import { tinhDuLieuTheoTabTuNguonGiongOnOff } from './gop_quy_tac_theo_tab_on_off.jsx';
import { damBaoSeedLuatPtttMuc11 } from './seed_luat_pttt_muc11';
import {
  taiMapGhiDeNoiDungQuyTacNoiBo,
  taiMapTrangThaiQuyTacNoiBo,
  taiTapMaLuatAnKhoiQuanLyNoiBo,
} from './quy_tac_on_off_noi_bo.jsx';

const parseJSONAnToan = (raw, fallback) => {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const chuanHoaDuLieuLuat = (raw) => {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object' && Array.isArray(raw.data)) return raw.data;
  return [];
};

/**
 * @returns {Promise<{ duLieuTheoTab: Record<string, object[]>, tapMaLuatAnKhoiQuanLy: Set<string> }>}
 */
export const taiVaHopNhatDuLieuTheoTabGiongManOnOff = async () => {
  await damBaoSeedLuatPtttMuc11();

  let allKeys = [];
  if (Platform.OS === 'web') {
    allKeys = Object.keys(window.localStorage || {}).filter((k) => String(k).startsWith('CDSS_DATA_'));
  } else {
    allKeys = (await AsyncStorage.getAllKeys()).filter((k) => String(k).startsWith('CDSS_DATA_'));
  }

  const tabIdsCoDinh = DANH_SACH_TAB_MAC_DINH.map((x) => x.id);
  const tabIdsTrongStorage = Array.from(
    new Set([...tabIdsCoDinh, ...allKeys.map(layTabIdTuStorageKey).filter(Boolean)]),
  );

  const [mapTrangThaiNoiBo, mapGhiDeNoiBo, tapAnKhoiQuanLy] = await Promise.all([
    taiMapTrangThaiQuyTacNoiBo(),
    taiMapGhiDeNoiDungQuyTacNoiBo(),
    taiTapMaLuatAnKhoiQuanLyNoiBo(),
  ]);

  const khoaDocStorage = [
    ...new Set(
      DANH_SACH_TAB_MAC_DINH.flatMap((tab) =>
        timTabUngVien(tab.id, tabIdsTrongStorage).map((id) => `CDSS_DATA_${id}`),
      ),
    ),
  ];
  const rawTheoKhoa = {};
  if (Platform.OS === 'web') {
    khoaDocStorage.forEach((k) => {
      rawTheoKhoa[k] = window.localStorage.getItem(k);
    });
  } else if (khoaDocStorage.length > 0) {
    const cap = await AsyncStorage.multiGet(khoaDocStorage);
    cap.forEach(([k, v]) => {
      rawTheoKhoa[k] = v;
    });
  }

  const dataTheoTab = {};
  for (const tab of DANH_SACH_TAB_MAC_DINH) {
    const dsUngVien = timTabUngVien(tab.id, tabIdsTrongStorage);
    let dataLoaded = [];
    for (const tabIdUngVien of dsUngVien) {
      const raw = rawTheoKhoa[`CDSS_DATA_${tabIdUngVien}`];
      const data = chuanHoaDuLieuLuat(parseJSONAnToan(raw, []));
      if (Array.isArray(data) && data.length > 0) {
        dataLoaded = data;
        break;
      }
    }
    dataTheoTab[tab.id] = dataLoaded;
  }

  const duLieuTheoTab = tinhDuLieuTheoTabTuNguonGiongOnOff({
    dataTheoTab,
    mapTrangThaiNoiBo,
    mapGhiDeNoiBo,
  });

  return { duLieuTheoTab, tapMaLuatAnKhoiQuanLy: tapAnKhoiQuanLy };
};
