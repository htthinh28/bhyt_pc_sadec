import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * URL gốc phục vụ thư mục /tai_lieu (public/tai_lieu sau khi chạy npm run tai_lieu:prepare).
 */
export const layGocUrlTaiLieu = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.location?.origin) {
    return `${String(window.location.origin).replace(/\/$/, '')}/tai_lieu`;
  }

  const hostUri = String(
    Constants.expoConfig?.hostUri
      || Constants.manifest2?.extra?.expoClient?.hostUri
      || Constants.manifest?.debuggerHost
      || '',
  ).trim();

  if (!hostUri) return '';

  const first = hostUri.split('/')[0];
  if (first.startsWith('http://') || first.startsWith('https://')) {
    return `${first.replace(/\/$/, '')}/tai_lieu`;
  }
  return `http://${first}/tai_lieu`;
};

/**
 * @param {string} relPath ví dụ: "Huong_dan/foo.html"
 */
export const taoUrlMoTaiLieu = (relPath) => {
  const goc = layGocUrlTaiLieu();
  if (!goc || !relPath) return '';
  const clean = String(relPath).replace(/^\/+/, '').replace(/\\/g, '/');
  const pathSeg = clean.split('/').filter(Boolean).map(encodeURIComponent).join('/');
  return `${goc.replace(/\/$/, '')}/${pathSeg}`;
};
