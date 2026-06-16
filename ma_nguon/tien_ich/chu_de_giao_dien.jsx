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
import { Appearance, Platform, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

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

/** Tạo token chế độ TỐI (glassmorphism dark) — tương phản dịu, tránh chói */
const taoTokenToi = (mauChinh, mauDam, mauSang, mauNhap, bgWeb, bgMobile, bgModal) => {
    const [r,g,b]    = _rgb(mauDam);
    const [r2,g2,b2] = _rgb(mauChinh);
    // Nền tối trung tính — không nhuốm màu theme
    const _bgWeb    = bgWeb    || 'linear-gradient(135deg, #121316 0%, #151518 40%, #18181c 70%, #1a1a1f 100%)';
    const _bgMobile = bgMobile || '#141418';
    const _bgModal  = bgModal  || 'rgba(20,20,24,0.97)';
    return {
        brand: { mauChinh, mauChinh2: mauSang, mauDam, mauNhat: mauNhap },
        bg: {
            gradient_web:    _bgWeb,
            gradient_mobile: _bgMobile,
            glass_card:      'rgba(255,255,255,0.07)',
            glass_card_md:   'rgba(255,255,255,0.10)',
            glass_input:     'rgba(255,255,255,0.08)',
            glass_modal:     _bgModal,
            glass_overlay:   'rgba(0,0,0,0.72)',
            glass_header:    `rgba(${r},${g},${b},0.92)`,
            table_header:    `rgba(${r2},${g2},${b2},0.28)`,
            table_row_even:  'rgba(255,255,255,0.045)',
            table_row_odd:   'rgba(255,255,255,0.015)',
            table_row_sel:   `rgba(${r2},${g2},${b2},0.18)`,
            table_row_dup:   `rgba(${r2},${g2},${b2},0.13)`,
        },
        surface: {
            card:       'rgba(255,255,255,0.08)',
            card_alt:   'rgba(255,255,255,0.05)',
            subtle:     'rgba(255,255,255,0.04)',
            elevated:   'rgba(24,24,28,0.98)',
            overlay:    'rgba(8,8,12,0.78)',
            kpi:        'rgba(255,255,255,0.09)',
            brand_tint: `rgba(${r2},${g2},${b2},0.14)`,
            inset:      'rgba(255,255,255,0.10)',
        },
        on_brand: {
            primary:      '#F2F3F5',
            secondary:    'rgba(242,243,245,0.84)',
            muted:        'rgba(242,243,245,0.70)',
            faint:        'rgba(242,243,245,0.54)',
            border:       'rgba(255,255,255,0.26)',
            glass_bg:     'rgba(255,255,255,0.14)',
            glass_border: 'rgba(255,255,255,0.22)',
        },
        on_glass: {
            primary: '#EDEFF2',
            muted:   'rgba(237,239,242,0.74)',
        },
        border: {
            glass:       'rgba(255,255,255,0.13)',
            glass_md:    'rgba(255,255,255,0.19)',
            input:       'rgba(255,255,255,0.16)',
            divider:     'rgba(255,255,255,0.09)',
            accent:      `rgba(${r2},${g2},${b2},0.38)`,
            header:      'rgba(255,255,255,0.16)',
            error:       'rgba(244,67,54,0.48)',
            input_error: 'rgba(255,120,120,0.58)',
        },
        text: {
            primary:      '#E8EAED',
            secondary:    'rgba(232,234,237,0.74)',
            muted:        'rgba(232,234,237,0.54)',
            placeholder:  'rgba(232,234,237,0.38)',
            accent:       mauNhap,
            table_header: '#F0F2F5',
            table_cell:   'rgba(232,234,237,0.88)',
            link:         '#93C5FD',
            success:      '#A5D6A7',
        },
        severity: {
            critical: { bg:'rgba(244,67,54,0.14)',  border:'rgba(244,67,54,0.38)',  text:'#FCA5A5',  left:'#EF5350' },
            error:    { bg:'rgba(255,152,0,0.14)',  border:'rgba(255,152,0,0.36)',  text:'#FFCC80',  left:'#FB8C00' },
            warning:  { bg:'rgba(255,193,7,0.10)',  border:'rgba(255,193,7,0.32)',  text:'#FFE082',  left:'#FFB300' },
            info:     { bg:'rgba(33,150,243,0.14)', border:'rgba(33,150,243,0.28)', text:'#93C5FD',  left:'#42A5F5' },
            success:  { bg:'rgba(76,175,80,0.14)',  border:'rgba(76,175,80,0.36)',  text:'#A5D6A7',  left:'#66BB6A' },
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

/** Tạo token chế độ SÁNG — nền off-white, chữ tối mềm, tương phản WCAG AA */
const taoTokenSang = (mauChinh, mauDam, mauSang, mauNhap, bgWeb, bgMobile) => {
    const [r,g,b]    = _rgb(mauDam);
    const [r2,g2,b2] = _rgb(mauChinh);
    return {
        brand: { mauChinh, mauChinh2: mauSang, mauDam, mauNhat: mauNhap },
        bg: {
            gradient_web:    bgWeb,
            gradient_mobile: bgMobile,
            glass_card:      'rgba(255,255,255,0.78)',
            glass_card_md:   'rgba(255,255,255,0.90)',
            glass_input:     'rgba(255,255,255,0.86)',
            glass_modal:     'rgba(252,252,254,0.98)',
            glass_overlay:   'rgba(15,23,42,0.30)',
            glass_header:    `rgba(${r},${g},${b},0.95)`,
            table_header:    `rgba(${r2},${g2},${b2},0.14)`,
            table_row_even:  'rgba(17,24,28,0.030)',
            table_row_odd:   'rgba(255,255,255,0.55)',
            table_row_sel:   `rgba(${r2},${g2},${b2},0.10)`,
            table_row_dup:   `rgba(${r2},${g2},${b2},0.07)`,
        },
        surface: {
            card:       'rgba(255,255,255,0.94)',
            card_alt:   'rgba(255,255,255,0.98)',
            subtle:     'rgba(17,24,28,0.038)',
            elevated:   '#FAFBFC',
            overlay:    'rgba(15,23,42,0.34)',
            kpi:        'rgba(17,24,28,0.52)',
            brand_tint: `rgba(${r2},${g2},${b2},0.10)`,
            inset:      'rgba(17,24,28,0.055)',
        },
        on_brand: {
            primary:      '#FAFBFC',
            secondary:    'rgba(250,251,252,0.90)',
            muted:        'rgba(250,251,252,0.76)',
            faint:        'rgba(250,251,252,0.60)',
            border:       'rgba(255,255,255,0.38)',
            glass_bg:     'rgba(255,255,255,0.20)',
            glass_border: 'rgba(255,255,255,0.32)',
        },
        on_glass: {
            primary: '#F4F5F7',
            muted:   'rgba(244,245,247,0.80)',
        },
        border: {
            glass:       'rgba(17,24,28,0.11)',
            glass_md:    'rgba(17,24,28,0.16)',
            input:       `rgba(${r2},${g2},${b2},0.28)`,
            divider:     'rgba(17,24,28,0.09)',
            accent:      `rgba(${r2},${g2},${b2},0.46)`,
            header:      'rgba(255,255,255,0.32)',
            error:       'rgba(211,47,47,0.48)',
            input_error: 'rgba(211,47,47,0.58)',
        },
        text: {
            primary:      '#14181C',
            secondary:    'rgba(20,24,28,0.74)',
            muted:        'rgba(20,24,28,0.56)',
            placeholder:  'rgba(20,24,28,0.42)',
            accent:       mauDam,
            table_header: '#14181C',
            table_cell:   'rgba(20,24,28,0.84)',
            link:         '#1558A8',
            success:      '#2E7D32',
        },
        severity: {
            critical: { bg:'rgba(211,47,47,0.09)',  border:'rgba(211,47,47,0.32)',  text:'#B71C1C',  left:'#C62828' },
            error:    { bg:'rgba(230,81,0,0.09)',   border:'rgba(230,81,0,0.30)',   text:'#BF360C',  left:'#E65100' },
            warning:  { bg:'rgba(245,127,23,0.09)', border:'rgba(245,127,23,0.28)', text:'#E65100',  left:'#EF6C00' },
            info:     { bg:'rgba(21,101,192,0.09)', border:'rgba(21,101,192,0.22)', text:'#0D47A1',  left:'#1565C0' },
            success:  { bg:'rgba(46,125,50,0.09)',  border:'rgba(46,125,50,0.28)',  text:'#1B5E20',  left:'#2E7D32' },
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

// Nền sáng trung tính dùng chung cho MỌI theme (off-white, không chói)
const _SANG_BG  = 'linear-gradient(135deg, #f4f5f7 0%, #f8f9fa 40%, #f1f2f4 70%, #eceef1 100%)';
const _SANG_MOB = '#F4F5F7';

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
    PINK:   { ten:'Hồng mặc định',   icon:'🌸', tokens:_pinkToi,   tokensToi:_pinkToi,   tokensSang:_pinkSang   },
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

    /** Web: đồng bộ scrollbar/form controls + theme-color + CSS variables */
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
        meta.setAttribute('content', cheDoSang ? _SANG_MOB : '#141418');

        const t = tokens;
        const cssVars = `
:root[data-cdss-theme="${cheDoSang ? 'light' : 'dark'}"] {
  --cdss-bg: ${t.bg.gradient_mobile};
  --cdss-text: ${t.text.primary};
  --cdss-text-muted: ${t.text.muted};
  --cdss-surface: ${t.surface.card};
  --cdss-border: ${t.border.glass};
  --cdss-brand: ${t.brand.mauChinh};
}
html, body {
  background-color: ${t.bg.gradient_mobile};
  color: ${t.text.primary};
}
::selection {
  background: ${cheDoSang ? 'rgba(21,101,192,0.22)' : 'rgba(144,202,249,0.28)'};
  color: ${t.text.primary};
}
* {
  scrollbar-color: ${cheDoSang ? 'rgba(17,24,28,0.28) transparent' : 'rgba(255,255,255,0.22) transparent'};
}
*::-webkit-scrollbar { width: 10px; height: 10px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb {
  background: ${cheDoSang ? 'rgba(17,24,28,0.22)' : 'rgba(255,255,255,0.20)'};
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}
*::-webkit-scrollbar-thumb:hover {
  background: ${cheDoSang ? 'rgba(17,24,28,0.34)' : 'rgba(255,255,255,0.30)'};
}
`;
        let el = document.getElementById('cdss-theme-vars');
        if (!el) {
            el = document.createElement('style');
            el.id = 'cdss-theme-vars';
            document.head.appendChild(el);
        }
        el.textContent = cssVars;
    }, [cheDoSang, tokens]);

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

/**
 * StyleSheet động theo chủ đề — cập nhật ngay khi đổi Sáng/Tối hoặc màu chủ đạo.
 * @param {(cd: object) => object} factory — hàm trả về object style (dùng tham số CD)
 */
export const useChuDeStyles = (factory) => {
    const ctx = useChuDe();
    const themeKey = `${ctx._tenChuDe}_${ctx._cheDoSang ? 'S' : 'T'}`;
    return useMemo(
        () => StyleSheet.create(factory(ctx)),
        [themeKey, factory, ctx]
    );
};

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

// Màu brand chính của từng chủ đề (dùng để highlight button đang active)
const _MAU_BRAND = { PINK:'#C2185B', BLUE:'#1565C0', TEAL:'#00838F', VIOLET:'#6A1B9A' };

const taoStylesBoChonChuDe = (CD) => ({
    container: {
        backgroundColor: CD.bg.glass_card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: CD.border.glass,
        padding: 20,
        ...Platform.select({
            web: {
                backdropFilter: CD.web.blur_card,
                boxShadow: CD.web.shadow_card,
            },
        }),
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
        borderColor: CD.border.glass_md,
        backgroundColor: CD.surface.subtle,
        ...Platform.select({ web: { cursor: 'pointer' } }),
    },
    che_do_nut_on: {
        borderColor: CD.border.accent,
        backgroundColor: CD.surface.brand_tint,
    },
    che_do_icon: { fontSize: 15 },
    che_do_txt: {
        fontSize: 15,
        fontWeight: '600',
        color: CD.text.secondary,
        fontFamily: CD.font.family,
    },
    che_do_txt_on: { fontWeight: '800', color: CD.text.primary },
    tieu_de: {
        fontSize: 20,
        fontWeight: '700',
        color: CD.text.primary,
        fontFamily: CD.font.family,
    },
    hang: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    nut: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: CD.border.glass,
        backgroundColor: CD.surface.subtle,
        ...Platform.select({ web: { cursor: 'pointer', transition: 'all 0.2s ease' } }),
    },
    nut_active: {
        backgroundColor: CD.surface.brand_tint,
    },
    icon: { fontSize: 22 },
    ten: {
        fontSize: 18,
        color: CD.text.secondary,
        fontFamily: CD.font.family,
    },
    ten_active: { color: CD.text.primary, fontWeight: '700' },
    check: { fontSize: 16, fontWeight: '700' },
    spinner: { fontSize: 16, color: CD.text.muted },
    goi_y: {
        fontSize: 15,
        color: CD.text.muted,
        fontFamily: CD.font.family,
        marginTop: 14,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export const BoChonChuDe = ({ style }) => {
    const ctx = useChuDe();
    const st_picker = useChuDeStyles(taoStylesBoChonChuDe);
    const tenHienTai = ctx._tenChuDe || 'PINK';
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
                style={[st_picker.che_do_nut, active && st_picker.che_do_nut_on]}
                onPress={() => doiCheDoGiaoDien && doiCheDoGiaoDien(ma)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
            >
                <Text style={st_picker.che_do_icon}>{icon}</Text>
                <Text style={[st_picker.che_do_txt, active && st_picker.che_do_txt_on]}>{nhan}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[st_picker.container, style]}>

            {/* Header: tiêu đề + chế độ sáng/tối (Tự động / Sáng / Tối) */}
            <View style={st_picker.hang_header}>
                <Text style={st_picker.tieu_de}>
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
                                isActive && st_picker.nut_active,
                                isActive && { borderColor: mauBrand, borderWidth: 2,
                                    ...(Platform.OS === 'web' ? { boxShadow: `0 0 16px ${mauBrand}44` } : {}),
                                },
                            ]}
                            onPress={() => apDungChuDe(key)}
                        >
                            <Text style={st_picker.icon}>{chu_de.icon}</Text>
                            <Text style={[st_picker.ten, isActive && st_picker.ten_active]}>
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
            <Text style={st_picker.goi_y}>
                Chọn màu chủ đạo và chế độ sáng — áp dụng ngay trên web và bản cài đặt, không cần tải lại trang.
            </Text>
        </View>
    );
};
