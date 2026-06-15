/**
 * Tùy chọn hiển thị Hub báo cáo — lưu cục bộ (SPEC Dynamic BI: cá nhân hoá layout).
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'CDSS_BAO_CAO_HUB_PREFS_V1';

export const MAC_DINH_HUB_PREFS = {
  /** Hiện dải chip gợi ý JCI / quản trị từ hien_thi_bao_cao */
  hien_chip_jci: true,
  /** Hiện KPI tổng Σ CP ước (SUM tong_chi_phi_rui_ro trên fact_ho_so) */
  hien_kpi_tong_cp_uoc: true,
};

export async function docHubPrefs() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return { ...MAC_DINH_HUB_PREFS };
    const p = JSON.parse(raw);
    return { ...MAC_DINH_HUB_PREFS, ...p };
  } catch {
    return { ...MAC_DINH_HUB_PREFS };
  }
}

export async function luuHubPrefs(partial) {
  const cur = await docHubPrefs();
  const next = { ...cur, ...partial };
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
