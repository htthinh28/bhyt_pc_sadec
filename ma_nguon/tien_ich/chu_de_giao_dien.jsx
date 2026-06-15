/**
 * ============================================================================
 * HỆ THỐNG CHỦ ĐỀ GIAO DIỆN (DESIGN TOKEN SYSTEM) v2
 * CDSS Bệnh viện Phương Châu – JCI Standard
 * Hỗ trợ: Chế độ SÁNG / TỐI  ×  4 màu chủ đạo  ×  Font Arial
 * ============================================================================
 * Cách dùng:
 *   import { useChuDe } from '../tien_ich/chu_de_giao_dien';
 *   const CD = useChuDe();
 *   style={{ backgroundColor: CD.bg.glass_card, fontFamily: CD.font.family }}
 *
 *   ctx._doiChuDe('BLUE')              // đổi màu: 'PINK'|'BLUE'|'TEAL'|'VIOLET'
 *   ctx._doiCheDoGiaoDien('TU_DONG')   // 'TU_DONG' | 'SANG' | 'TOI'
 *   ctx._doiCheDoSangToi(true)         // tương thích: true=Sáng, false=Tối (không dùng Tự động)
 * ============================================================================
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Appearance, Platform, useColorScheme } from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// [1] TOKEN GENERATORS
// ─────────────────────────────────────────────────────────────────────────────

const _rgb = hex => [
    parseInt(hex.slice(1,3),16),
    parseInt(hex.slice(3,5),16),
    parseInt(hex.slice(5,7),16),
];

// Các giá trị font/radius/spacing dùng chung (không đổi theo chế độ)
const _font = {
    family: Platform.OS === 'web'
        ? "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif"
        : 'Arial',
    size: { xs:14, sm:16, md:18, base:20, lg:22, xl:26, xxl:30, xxxl:36, hero:44 },
    weight: { regular:'400', medium:'500', semibold:'600', bold:'700', heavy:'800', black:'900' },
    lineHeight: { tight:1.2, normal:1.5, loose:1.8 },
};
const _radius  = { xs:6, sm:8, md:12, lg:16, xl:20, xxl:24, pill:100 };
const _spacing = { xs:4, sm:8, md:12, lg:16, xl:20, xxl:24, xxxl:32 };
const _icon    = { sm:18, md:22, lg:28, xl:36, hero:52 };

/** Tạo token chế độ TỐI (glassmorphism dark) */
const taoTokenToi = (mauChinh, mauDam, mauSang, mauNhap, bgWeb, bgMobile, bgModal) => {
    const [r,g,b]    = _rgb(mauDam);
    const [r2,g2,b2] = _rgb(mauChinh);
    // Nền tối trung tính — không nhuốm màu theme
    const _bgWeb    = bgWeb    || 'linear-gradient(135deg, #0d0d0f 0%, #111111 40%, #141418 70%, #181818 100%)';
    const _bgMobile = bgMobile || '#111111';
    const _bgModal  = bgModal  || 'rgba(17,17,17,0.97)';
    return {
        brand: { mauChinh, mauChinh2: mauSang, mauDam, mauNhat: mauNhap },
        bg: {
            gradient_web:    _bgWeb,
            gradient_mobile: _bgMobile,
            glass_card:      'rgba(255,255,255,0.07)',
            glass_card_md:   'rgba(255,255,255,0.10)',
            glass_input:     'rgba(255,255,255,0.08)',
            glass_modal:     _bgModal,
            glass_overlay:   'rgba(0,0,0,0.75)',
            glass_header:    `rgba(${r},${g},${b},0.92)`,
            table_header:    `rgba(${r2},${g2},${b2},0.30)`,
            table_row_even:  'rgba(255,255,255,0.04)',
            table_row_odd:   'rgba(255,255,255,0.01)',
            table_row_sel:   `rgba(${r2},${g2},${b2},0.20)`,
            table_row_dup:   `rgba(${r2},${g2},${b2},0.15)`,
        },
        border: {
            glass:       'rgba(255,255,255,0.12)',
            glass_md:    'rgba(255,255,255,0.18)',
            input:       'rgba(255,255,255,0.15)',
            divider:     'rgba(255,255,255,0.08)',
            accent:      `rgba(${r2},${g2},${b2},0.40)`,
            header:      'rgba(255,255,255,0.15)',
            error:       'rgba(244,67,54,0.50)',
            input_error: 'rgba(255,100,100,0.60)',
        },
        text: {
            primary:      '#FFFFFF',
            secondary:    'rgba(255,255,255,0.70)',
            muted:        'rgba(255,255,255,0.50)',
            placeholder:  'rgba(255,255,255,0.30)',
            accent:       mauNhap,
            table_header: '#FFFFFF',
            table_cell:   'rgba(255,255,255,0.85)',
            link:         '#90CAF9',
            success:      '#A5D6A7',
        },
        severity: {
            critical: { bg:'rgba(244,67,54,0.15)',  border:'rgba(244,67,54,0.40)',  text:'#FF6B6B',  left:'#F44336' },
            error:    { bg:'rgba(255,152,0,0.15)',  border:'rgba(255,152,0,0.40)',  text:'#FFB74D',  left:'#FF9800' },
            warning:  { bg:'rgba(255,235,59,0.10)', border:'rgba(255,235,59,0.35)', text:'#FFF176',  left:'#FFC107' },
            info:     { bg:'rgba(33,150,243,0.15)', border:'rgba(33,150,243,0.30)', text:'#90CAF9',  left:'#2196F3' },
            success:  { bg:'rgba(76,175,80,0.15)',  border:'rgba(76,175,80,0.40)',  text:'#A5D6A7',  left:'#4CAF50' },
        },
        web: {
            blur_card:        'blur(20px) saturate(180%)',
            blur_modal:       'blur(30px)',
            blur_header:      'blur(20px)',
            blur_input:       'blur(8px)',
            shadow_card:      '0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.08)',
            shadow_header:    `0 4px 24px rgba(${r2},${g2},${b2},0.50)`,
            shadow_modal:     '0 25px 60px rgba(0,0,0,0.60)',
            shadow_btn:       `0 4px 20px rgba(${r2},${g2},${b2},0.50)`,
            shadow_btn_green: '0 4px 16px rgba(76,175,80,0.40)',
            shadow_btn_blue:  '0 4px 16px rgba(33,150,243,0.40)',
            shadow_btn_red:   '0 4px 16px rgba(244,67,54,0.40)',
            gradient_bg:      _bgWeb,
            gradient_header:  `linear-gradient(135deg, rgba(${r},${g},${b},0.95) 0%, rgba(${r2},${g2},${b2},0.90) 100%)`,
            gradient_primary: `linear-gradient(135deg, ${mauSang}, ${mauChinh})`,
            gradient_green:   'linear-gradient(135deg, #4CAF50, #388E3C)',
            gradient_blue:    'linear-gradient(135deg, #1E88E5, #1565C0)',
            gradient_red:     'linear-gradient(135deg, #F44336, #D32F2F)',
            gradient_orange:  'linear-gradient(135deg, #FF9800, #E65100)',
            cursor_pointer:   'pointer',
        },
        font: _font, radius: _radius, spacing: _spacing, icon: _icon,
    };
};

/** Tạo token chế độ SÁNG */
const taoTokenSang = (mauChinh, mauDam, mauSang, mauNhap, bgWeb, bgMobile) => {
    const [r,g,b]    = _rgb(mauDam);
    const [r2,g2,b2] = _rgb(mauChinh);
    return {
        brand: { mauChinh, mauChinh2: mauSang, mauDam, mauNhat: mauNhap },
        bg: {
            gradient_web:    bgWeb,
            gradient_mobile: bgMobile,
            glass_card:      'rgba(255,255,255,0.82)',
            glass_card_md:   'rgba(255,255,255,0.92)',
            glass_input:     'rgba(255,255,255,0.88)',
            glass_modal:     'rgba(255,250,252,0.97)',
            glass_overlay:   'rgba(0,0,0,0.35)',
            glass_header:    `rgba(${r},${g},${b},0.95)`,
            table_header:    `rgba(${r2},${g2},${b2},0.18)`,
            table_row_even:  'rgba(0,0,0,0.03)',
            table_row_odd:   'rgba(255,255,255,0.60)',
            table_row_sel:   `rgba(${r2},${g2},${b2},0.12)`,
            table_row_dup:   `rgba(${r2},${g2},${b2},0.08)`,
        },
        border: {
            glass:       'rgba(0,0,0,0.10)',
            glass_md:    'rgba(0,0,0,0.15)',
            input:       `rgba(${r2},${g2},${b2},0.30)`,
            divider:     'rgba(0,0,0,0.08)',
            accent:      `rgba(${r2},${g2},${b2},0.50)`,
            header:      'rgba(255,255,255,0.30)',
            error:       'rgba(211,47,47,0.50)',
            input_error: 'rgba(211,47,47,0.60)',
        },
        text: {
            primary:      '#1A1A2E',
            secondary:    'rgba(0,0,0,0.65)',
            muted:        'rgba(0,0,0,0.45)',
            placeholder:  'rgba(0,0,0,0.30)',
            accent:       mauDam,
            table_header: '#FFFFFF',
            table_cell:   'rgba(0,0,0,0.80)',
            link:         '#1565C0',
            success:      '#2E7D32',
        },
        severity: {
            critical: { bg:'rgba(211,47,47,0.10)',  border:'rgba(211,47,47,0.35)',  text:'#C62828',  left:'#D32F2F' },
            error:    { bg:'rgba(230,81,0,0.10)',   border:'rgba(230,81,0,0.35)',   text:'#E65100',  left:'#F57C00' },
            warning:  { bg:'rgba(245,127,23,0.10)', border:'rgba(245,127,23,0.30)', text:'#E65100',  left:'#F9A825' },
            info:     { bg:'rgba(21,101,192,0.10)', border:'rgba(21,101,192,0.25)', text:'#1565C0',  left:'#1976D2' },
            success:  { bg:'rgba(46,125,50,0.10)',  border:'rgba(46,125,50,0.30)',  text:'#2E7D32',  left:'#388E3C' },
        },
        web: {
            blur_card:        'blur(20px) saturate(200%)',
            blur_modal:       'blur(30px)',
            blur_header:      'blur(20px)',
            blur_input:       'blur(8px)',
            shadow_card:      '0 4px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.90)',
            shadow_header:    `0 4px 20px rgba(${r2},${g2},${b2},0.35)`,
            shadow_modal:     '0 16px 48px rgba(0,0,0,0.18)',
            shadow_btn:       `0 4px 16px rgba(${r2},${g2},${b2},0.40)`,
            shadow_btn_green: '0 4px 12px rgba(46,125,50,0.35)',
            shadow_btn_blue:  '0 4px 12px rgba(21,101,192,0.35)',
            shadow_btn_red:   '0 4px 12px rgba(211,47,47,0.35)',
            gradient_bg:      bgWeb,
            gradient_header:  `linear-gradient(135deg, rgba(${r},${g},${b},0.95) 0%, rgba(${r2},${g2},${b2},0.90) 100%)`,
            gradient_primary: `linear-gradient(135deg, ${mauSang}, ${mauChinh})`,
            gradient_green:   'linear-gradient(135deg, #4CAF50, #388E3C)',
            gradient_blue:    'linear-gradient(135deg, #1E88E5, #1565C0)',
            gradient_red:     'linear-gradient(135deg, #F44336, #D32F2F)',
            gradient_orange:  'linear-gradient(135deg, #FF9800, #E65100)',
            cursor_pointer:   'pointer',
        },
        font: _font, radius: _radius, spacing: _spacing, icon: _icon,
    };
};

// ─────────────────────────────────────────────────────────────────────────────
// [2] BỘ CHỦ ĐỀ (mỗi chủ đề có tokens tối + sáng)
// ─────────────────────────────────────────────────────────────────────────────

// Nền sáng trung tính dùng chung cho MỌI theme (trắng tinh)
const _SANG_BG  = 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 40%, #f5f6f7 70%, #f0f1f3 100%)';
const _SANG_MOB = '#FFFFFF';

// Chế độ tối — tất cả theme dùng nền đen trung tính (không nhuốm màu)
const _pinkToi    = taoTokenToi('#C2185B','#880E4F','#E91E63','#F48FB1');
const _blueToi    = taoTokenToi('#1565C0','#0D47A1','#1E88E5','#90CAF9');
const _tealToi    = taoTokenToi('#00838F','#006064','#00ACC1','#80DEEA');
const _violetToi  = taoTokenToi('#6A1B9A','#4A148C','#8E24AA','#CE93D8');

// Chế độ sáng — tất cả theme dùng nền trắng trung tính
const _pinkSang   = taoTokenSang('#C2185B','#880E4F','#E91E63','#F48FB1', _SANG_BG, _SANG_MOB);
const _blueSang   = taoTokenSang('#1565C0','#0D47A1','#1E88E5','#90CAF9', _SANG_BG, _SANG_MOB);
const _tealSang   = taoTokenSang('#00838F','#006064','#00ACC1','#80DEEA', _SANG_BG, _SANG_MOB);
const _violetSang = taoTokenSang('#6A1B9A','#4A148C','#8E24AA','#CE93D8', _SANG_BG, _SANG_MOB);

export const DANH_SACH_CHU_DE = {
    /** Hồng – Thương hiệu Phương Châu (mặc định) */
    PINK:   { ten:'Hồng Phương Châu',   icon:'🌸', tokens:_pinkToi,   tokensToi:_pinkToi,   tokensSang:_pinkSang   },
    /** Xanh dương – Y tế chuyên nghiệp */
    BLUE:   { ten:'Xanh Dương Y Tế',    icon:'💙', tokens:_blueToi,   tokensToi:_blueToi,   tokensSang:_blueSang   },
    /** Xanh ngọc – Hiện đại */
    TEAL:   { ten:'Xanh Ngọc Hiện Đại', icon:'🩵', tokens:_tealToi,   tokensToi:_tealToi,   tokensSang:_tealSang   },
    /** Tím – Sang trọng */
    VIOLET: { ten:'Tím Sang Trọng',     icon:'💜', tokens:_violetToi, tokensToi:_violetToi, tokensSang:_violetSang },
};

// ─────────────────────────────────────────────────────────────────────────────
// [3] STORAGE KEY & LOGIC TẢI/LƯU
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'CDSS_CHU_DE_HIEN_TAI';
const CHE_DO_KEY  = 'CDSS_CHE_DO_SANG_TOI';   // 'SANG' | 'TOI' | 'TU_DONG'

/** Giá trị lưu trữ hợp lệ cho chế độ sáng/tối */
export const CHE_DO_LUU_TRU = Object.freeze({
  TU_DONG: 'TU_DONG',
  SANG: 'SANG',
  TOI: 'TOI',
});

/**
 * Suy ra giao diện sáng (true) / tối (false) từ chế độ đã lưu và chủ đề hệ thống.
 * `schemeHeThong`: 'light' | 'dark' | null/undefined (coi như light)
 */
export const suyRaCheDoSang = (cheDoLuuTru, schemeHeThong) => {
  if (cheDoLuuTru === CHE_DO_LUU_TRU.SANG) return true;
  if (cheDoLuuTru === CHE_DO_LUU_TRU.TOI) return false;
  const s = schemeHeThong || 'light';
  return s !== 'dark';
};

/** Lấy tên chủ đề đang dùng */
export const layTenChuDeHienTai = async () => {
    try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        return saved && DANH_SACH_CHU_DE[saved] ? saved : 'PINK';
    } catch { return 'PINK'; }
};

/** Lưu tên chủ đề */
export const luuTenChuDe = async (tenChuDe) => {
    if (!DANH_SACH_CHU_DE[tenChuDe]) return;
    try { await AsyncStorage.setItem(STORAGE_KEY, tenChuDe); } catch {}
    try {
        if (typeof window !== 'undefined' && window.localStorage)
            window.localStorage.setItem(STORAGE_KEY, tenChuDe);
    } catch {}
};

/** Lấy chế độ sáng/tối đã lưu ('SANG' | 'TOI' | 'TU_DONG') */
export const layCheDo = async () => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const v = window.localStorage.getItem(CHE_DO_KEY);
            if (v === CHE_DO_LUU_TRU.SANG || v === CHE_DO_LUU_TRU.TOI || v === CHE_DO_LUU_TRU.TU_DONG) return v;
        }
        const saved = await AsyncStorage.getItem(CHE_DO_KEY);
        if (saved === CHE_DO_LUU_TRU.SANG || saved === CHE_DO_LUU_TRU.TOI || saved === CHE_DO_LUU_TRU.TU_DONG) {
            return saved;
        }
    } catch { /* noop */ }
    return CHE_DO_LUU_TRU.TU_DONG;
};

/** Lưu chế độ sáng/tối (web: localStorage + AsyncStorage; offline: AsyncStorage) */
export const luuCheDo = async (cheDo) => {
    if (cheDo !== CHE_DO_LUU_TRU.SANG && cheDo !== CHE_DO_LUU_TRU.TOI && cheDo !== CHE_DO_LUU_TRU.TU_DONG) return;
    try { await AsyncStorage.setItem(CHE_DO_KEY, cheDo); } catch {}
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(CHE_DO_KEY, cheDo);
        }
    } catch {}
};

/** Lấy tokens theo tên chủ đề và chế độ */
export const layTokensChuDe = (tenChuDe, cheDoSang = false) => {
    const chu_de = DANH_SACH_CHU_DE[tenChuDe] || DANH_SACH_CHU_DE.PINK;
    return cheDoSang ? chu_de.tokensSang : chu_de.tokensToi;
};

// ─────────────────────────────────────────────────────────────────────────────
// [4] REACT CONTEXT (dynamic switching)
// ─────────────────────────────────────────────────────────────────────────────

const schemeKhoiTao = Appearance.getColorScheme() ?? 'light';
const sangKhoiTaoTuDong = suyRaCheDoSang(CHE_DO_LUU_TRU.TU_DONG, schemeKhoiTao);

const ChuDeContext = createContext({
    ...layTokensChuDe('PINK', sangKhoiTaoTuDong),
    _tenChuDe: 'PINK',
    _cheDoLuuTru: CHE_DO_LUU_TRU.TU_DONG,
    _cheDoSang: sangKhoiTaoTuDong,
    _doiChuDe: () => {},
    _doiCheDoGiaoDien: () => {},
    _doiCheDoSangToi: () => {},
});

export const ChuDeProvider = ({ children }) => {
    const schemeHeThong = useColorScheme() ?? 'light';

    const [tenChuDe, setTenChuDe] = useState('PINK');
    const [cheDoLuuTru, setCheDoLuuTru] = useState(CHE_DO_LUU_TRU.TU_DONG);
    /** Tránh ghi đè lựa chọn người dùng khi AsyncStorage hoàn tất sau khi đã bấm đổi chủ đề */
    const nguoiDungDaChinhChuDe = useRef(false);

    /** Một nguồn sự thật: sáng/tối suy ra từ chế độ lưu + chủ đề hệ thống (Tự động = theo OS/trình duyệt) */
    const cheDoSang = useMemo(
        () => suyRaCheDoSang(cheDoLuuTru, schemeHeThong),
        [cheDoLuuTru, schemeHeThong]
    );

    const tokens = useMemo(
        () => layTokensChuDe(tenChuDe, cheDoSang),
        [tenChuDe, cheDoSang]
    );

    useEffect(() => {
        let huy = false;
        Promise.all([layTenChuDeHienTai(), layCheDo()])
            .then(([ten, cheDo]) => {
                if (huy || nguoiDungDaChinhChuDe.current) return;
                setTenChuDe(ten);
                setCheDoLuuTru(cheDo);
            })
            .catch(() => {
                if (huy || nguoiDungDaChinhChuDe.current) return;
                setTenChuDe('PINK');
                setCheDoLuuTru(CHE_DO_LUU_TRU.TU_DONG);
            });
        return () => { huy = true; };
    }, []);

    /** Web: đồng bộ scrollbar/form controls + theme-color (PWA / trình duyệt) */
    useEffect(() => {
        if (Platform.OS !== 'web' || typeof document === 'undefined') return;
        const root = document.documentElement;
        root.setAttribute('data-cdss-theme', cheDoSang ? 'light' : 'dark');
        root.style.colorScheme = cheDoSang ? 'light' : 'dark';
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'theme-color');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', cheDoSang ? '#f5f6f7' : '#111111');
    }, [cheDoSang]);

    const doiChuDe = useCallback(async (tenMoi) => {
        if (!DANH_SACH_CHU_DE[tenMoi]) return;
        nguoiDungDaChinhChuDe.current = true;
        await luuTenChuDe(tenMoi);
        setTenChuDe(tenMoi);
    }, []);

    const doiCheDoGiaoDien = useCallback(async (cheDo) => {
        if (cheDo !== CHE_DO_LUU_TRU.SANG && cheDo !== CHE_DO_LUU_TRU.TOI && cheDo !== CHE_DO_LUU_TRU.TU_DONG) return;
        nguoiDungDaChinhChuDe.current = true;
        try {
            await luuCheDo(cheDo);
            setCheDoLuuTru(cheDo);
        } catch {
            setCheDoLuuTru(cheDo);
        }
    }, []);

    const doiCheDoSangToi = useCallback(async (sang) => {
        await doiCheDoGiaoDien(sang ? CHE_DO_LUU_TRU.SANG : CHE_DO_LUU_TRU.TOI);
    }, [doiCheDoGiaoDien]);

    return React.createElement(
        ChuDeContext.Provider,
        {
            value: {
                ...tokens,
                _tenChuDe: tenChuDe,
                _cheDoLuuTru: cheDoLuuTru,
                _cheDoSang: cheDoSang,
                _doiChuDe: doiChuDe,
                _doiCheDoGiaoDien: doiCheDoGiaoDien,
                _doiCheDoSangToi: doiCheDoSangToi,
            },
        },
        children
    );
};

/** Hook dùng trong màn hình: const CD = useChuDe(); */
export const useChuDe = () => useContext(ChuDeContext);

// ─────────────────────────────────────────────────────────────────────────────
// [5] STATIC CD – đọc đồng bộ từ localStorage khi module load
// Dùng trong StyleSheet.create() để lấy đúng màu sau khi reload trang
// ─────────────────────────────────────────────────────────────────────────────

const _docChuDeSync = () => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            if (saved && DANH_SACH_CHU_DE[saved]) return saved;
        }
    } catch {}
    return 'PINK';
};

const _docCheDoSync = () => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const v = window.localStorage.getItem(CHE_DO_KEY);
            if (v === CHE_DO_LUU_TRU.SANG) return true;
            if (v === CHE_DO_LUU_TRU.TOI) return false;
            if (v === CHE_DO_LUU_TRU.TU_DONG || v == null || v === '') {
                if (typeof window.matchMedia === 'function'
                    && window.matchMedia('(prefers-color-scheme: dark)').matches) return false;
                return true;
            }
        }
    } catch {}
    try {
        return suyRaCheDoSang(CHE_DO_LUU_TRU.TU_DONG, Appearance.getColorScheme());
    } catch {}
    return false;
};

const _tenChuDeKhoiDong  = _docChuDeSync();
const _cheDoSangKhoiDong = _docCheDoSync();

/** Tokens đang dùng – đọc ĐỒNG BỘ tại module load */
export const CD = layTokensChuDe(_tenChuDeKhoiDong, _cheDoSangKhoiDong);

// ─────────────────────────────────────────────────────────────────────────────
// [5b] HELPER FUNCTIONS (dùng CD tĩnh)
// ─────────────────────────────────────────────────────────────────────────────

export const bgContainer = () => Platform.select({
    web: { backgroundImage: CD.web.gradient_bg },
    default: {},
});

export const glassCard = (extra = {}) => ({
    backgroundColor: CD.bg.glass_card,
    borderRadius: CD.radius.xl,
    borderWidth: 1,
    borderColor: CD.border.glass,
    ...Platform.select({
        web: {
            backdropFilter: CD.web.blur_card,
            WebkitBackdropFilter: CD.web.blur_card,
            boxShadow: CD.web.shadow_card,
        },
    }),
    ...extra,
});

export const glassHeader = (extra = {}) => ({
    backgroundColor: CD.brand.mauDam,
    borderBottomWidth: 1,
    borderBottomColor: CD.border.header,
    paddingHorizontal: CD.spacing.xxl,
    paddingVertical: CD.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
        web: {
            backgroundImage: CD.web.gradient_header,
            backdropFilter: CD.web.blur_header,
            boxShadow: CD.web.shadow_header,
        },
    }),
    ...extra,
});

export const glassInput = (extra = {}) => ({
    backgroundColor: CD.bg.glass_input,
    borderWidth: 1,
    borderColor: CD.border.input,
    borderRadius: CD.radius.md,
    color: CD.text.primary,
    fontFamily: CD.font.family,
    fontSize: CD.font.size.base,
    paddingVertical: 14,
    paddingHorizontal: CD.spacing.lg,
    ...Platform.select({ web: { outlineStyle: 'none' } }),
    ...extra,
});

export const btnPrimary = (extra = {}) => ({
    backgroundColor: CD.brand.mauChinh,
    borderRadius: CD.radius.lg,
    paddingVertical: CD.spacing.lg,
    paddingHorizontal: CD.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
        web: {
            backgroundImage: CD.web.gradient_primary,
            boxShadow: CD.web.shadow_btn,
            cursor: CD.web.cursor_pointer,
        },
    }),
    ...extra,
});

export const btnSecondary = (extra = {}) => ({
    backgroundColor: CD.bg.glass_input,
    borderWidth: 1,
    borderColor: CD.border.glass_md,
    borderRadius: CD.radius.lg,
    paddingVertical: CD.spacing.md,
    paddingHorizontal: CD.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({ web: { cursor: CD.web.cursor_pointer } }),
    ...extra,
});

// ─────────────────────────────────────────────────────────────────────────────
// [6] COMPONENT PICKER CHỦ ĐỀ
// ─────────────────────────────────────────────────────────────────────────────

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Màu brand chính của từng chủ đề (dùng để highlight button đang active)
const _MAU_BRAND = { PINK:'#C2185B', BLUE:'#1565C0', TEAL:'#00838F', VIOLET:'#6A1B9A' };

export const BoChonChuDe = ({ style }) => {
    const ctx = useChuDe();
    const tenHienTai = ctx._tenChuDe || 'PINK';
    const cheDoSang = ctx._cheDoSang || false;
    const cheDoLuuTru = ctx._cheDoLuuTru || CHE_DO_LUU_TRU.TU_DONG;
    const doiChuDe = ctx._doiChuDe;
    const doiCheDoGiaoDien = ctx._doiCheDoGiaoDien;
    const [dangApDung, setDangApDung] = useState(null); // key đang trong quá trình áp dụng

    // Áp dụng trực tiếp — không dùng Alert (Alert.alert không hoạt động trên Expo Web)
    const apDungChuDe = async (key) => {
        if (tenHienTai === key || dangApDung) return;
        setDangApDung(key);
        try {
            if (doiChuDe) await doiChuDe(key);
        } finally {
            setDangApDung(null);
        }
    };

    const nutCheDo = (ma, nhan, icon) => {
        const active = cheDoLuuTru === ma;
        return (
            <TouchableOpacity
                style={[
                    st_picker.che_do_nut,
                    cheDoSang && st_picker.che_do_nut_sang,
                    active && st_picker.che_do_nut_on,
                    active && cheDoSang && st_picker.che_do_nut_on_sang,
                ]}
                onPress={() => doiCheDoGiaoDien && doiCheDoGiaoDien(ma)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
            >
                <Text style={st_picker.che_do_icon}>{icon}</Text>
                <Text style={[
                    st_picker.che_do_txt,
                    cheDoSang && st_picker.che_do_txt_sang,
                    active && st_picker.che_do_txt_on,
                ]}>{nhan}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[st_picker.container, cheDoSang && st_picker.container_sang, style]}>

            {/* Header: tiêu đề + chế độ sáng/tối (Tự động / Sáng / Tối) */}
            <View style={st_picker.hang_header}>
                <Text style={[st_picker.tieu_de, cheDoSang && st_picker.tieu_de_sang]}>
                    🎨  Chủ đề giao diện
                </Text>
            </View>
            <View style={st_picker.che_do_hang}>
                {nutCheDo(CHE_DO_LUU_TRU.TU_DONG, 'Tự động', '🖥')}
                {nutCheDo(CHE_DO_LUU_TRU.SANG, 'Sáng', '☀️')}
                {nutCheDo(CHE_DO_LUU_TRU.TOI, 'Tối', '🌙')}
            </View>

            {/* Danh sách màu chủ đạo */}
            <View style={st_picker.hang}>
                {Object.entries(DANH_SACH_CHU_DE).map(([key, chu_de]) => {
                    const isActive  = tenHienTai === key;
                    const isLoading = dangApDung === key;
                    const mauBrand  = _MAU_BRAND[key];
                    return (
                        <TouchableOpacity
                            key={key}
                            disabled={!!dangApDung}
                            style={[
                                st_picker.nut,
                                cheDoSang  && st_picker.nut_sang,
                                isActive   && st_picker.nut_active,
                                isActive   && cheDoSang && st_picker.nut_active_sang,
                                // Highlight màu brand của chủ đề đang active
                                isActive   && { borderColor: mauBrand, borderWidth: 2,
                                    ...(Platform.OS === 'web' ? { boxShadow: `0 0 20px ${mauBrand}55` } : {}),
                                },
                            ]}
                            onPress={() => apDungChuDe(key)}
                        >
                            <Text style={st_picker.icon}>{chu_de.icon}</Text>
                            <Text style={[
                                st_picker.ten,
                                cheDoSang && st_picker.ten_sang,
                                isActive  && (cheDoSang ? st_picker.ten_active_sang : st_picker.ten_active),
                            ]}>
                                {isLoading ? 'Đang áp dụng...' : chu_de.ten}
                            </Text>
                            {isActive && !isLoading && (
                                <Text style={[st_picker.check, { color: mauBrand }]}>✓</Text>
                            )}
                            {isLoading && <Text style={st_picker.spinner}>⟳</Text>}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Gợi ý hành động */}
            <Text style={[st_picker.goi_y, cheDoSang && st_picker.goi_y_sang]}>
                Chọn màu chủ đạo và chế độ sáng — áp dụng ngay trên web và bản cài đặt, không cần tải lại trang.
            </Text>
        </View>
    );
};

const st_picker = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        padding: 20,
        ...Platform.select({
            web: {
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.40)',
            },
        }),
    },
    container_sang: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderColor: 'rgba(0,0,0,0.12)',
        ...Platform.select({ web: { boxShadow: '0 4px 24px rgba(0,0,0,0.10)' } }),
    },
    hang_header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    che_do_hang: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
        justifyContent: 'center',
    },
    che_do_nut: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        backgroundColor: 'rgba(255,255,255,0.06)',
        ...Platform.select({ web: { cursor: 'pointer' } }),
    },
    che_do_nut_sang: {
        borderColor: 'rgba(0,0,0,0.14)',
        backgroundColor: 'rgba(0,0,0,0.04)',
    },
    che_do_nut_on: {
        borderColor: 'rgba(255,255,255,0.45)',
        backgroundColor: 'rgba(255,255,255,0.14)',
    },
    che_do_nut_on_sang: {
        borderColor: 'rgba(0,0,0,0.28)',
        backgroundColor: 'rgba(0,0,0,0.10)',
    },
    che_do_icon: { fontSize: 15 },
    che_do_txt: {
        fontSize: 15,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.88)',
        fontFamily: Platform.OS === 'web'
            ? "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif" : 'Arial',
    },
    che_do_txt_sang: { color: 'rgba(0,0,0,0.62)' },
    che_do_txt_on: { fontWeight: '800' },
    tieu_de: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: Platform.OS === 'web'
            ? "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif" : 'Arial',
    },
    tieu_de_sang: { color: '#1A1A2E' },
    hang: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    nut: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        backgroundColor: 'rgba(255,255,255,0.06)',
        ...Platform.select({ web: { cursor: 'pointer', transition: 'all 0.2s ease' } }),
    },
    nut_sang: {
        borderColor: 'rgba(0,0,0,0.12)',
        backgroundColor: 'rgba(0,0,0,0.04)',
    },
    nut_active: {
        backgroundColor: 'rgba(255,255,255,0.14)',
    },
    nut_active_sang: {
        backgroundColor: 'rgba(0,0,0,0.08)',
    },
    icon: { fontSize: 22 },
    ten: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.70)',
        fontFamily: Platform.OS === 'web'
            ? "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif" : 'Arial',
    },
    ten_sang:        { color: 'rgba(0,0,0,0.60)' },
    ten_active:      { color: '#FFFFFF', fontWeight: '700' },
    ten_active_sang: { color: '#1A1A2E', fontWeight: '700' },
    check:      { fontSize: 16, fontWeight: '700' },
    spinner:    { fontSize: 16, color: 'rgba(255,255,255,0.60)' },
    goi_y: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.35)',
        fontFamily: Platform.OS === 'web'
            ? "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif" : 'Arial',
        marginTop: 14,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    goi_y_sang: { color: 'rgba(0,0,0,0.35)' },
});
