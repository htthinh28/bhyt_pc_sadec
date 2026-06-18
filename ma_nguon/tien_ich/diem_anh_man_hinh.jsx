import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

/** Chiều rộng tham chiếu (iPhone 12/13) để scale font/spacing vừa mắt trên tablet & điện thoại */
const BASE_WIDTH_REF = 390;

/**
 * Breakpoint thống nhất — smartphone / tablet / laptop / PC.
 * Gộp các ngưỡng đang dùng rải rác (420, 768, 860, 960, 1024).
 */
export const BREAKPOINTS = {
  xs: 420,
  sm: 768,
  md: 860,
  lg: 960,
  xl: 1024,
  xxl: 1280,
};

/**
 * Co giãn nhẹ theo độ phân giải — clamp để tránh chữ quá to/nhỏ.
 * Dùng cho chip/tab cần đọc lâu trên màn nhỏ.
 */
export function useScaleGiaoDien() {
  const { width, height } = useWindowDimensions();
  return useMemo(() => {
    const raw = width / BASE_WIDTH_REF;
    const scale = Math.min(Math.max(raw, 0.88), 1.14);
    const font = (px) => Math.max(11, Math.round(px * scale));
    const space = (px) => Math.max(4, Math.round(px * scale));
    return { width, height, scale, font, space };
  }, [width, height]);
}

/**
 * Phân loại thiết bị theo chiều rộng cửa sổ (không phụ thuộc Platform.OS).
 * - phone: smartphone (< 768)
 * - tablet: tablet portrait / phablet (768–1023)
 * - laptop: laptop nhỏ (1024–1279)
 * - desktop: PC / màn rộng (≥ 1280)
 */
export function useLayoutMode() {
  const { width, height } = useWindowDimensions();
  return useMemo(() => {
    const mode = width >= BREAKPOINTS.xxl
      ? 'desktop'
      : width >= BREAKPOINTS.xl
        ? 'laptop'
        : width >= BREAKPOINTS.sm
          ? 'tablet'
          : 'phone';

    return {
      width,
      height,
      mode,
      isPhone: width < BREAKPOINTS.sm,
      isTablet: width >= BREAKPOINTS.sm && width < BREAKPOINTS.xl,
      isLaptop: width >= BREAKPOINTS.xl && width < BREAKPOINTS.xxl,
      isDesktop: width >= BREAKPOINTS.xxl,
      /** Sidebar trái cố định (≥ 860px) */
      dungSidebarTrai: width >= BREAKPOINTS.md,
      /** Xếp dọc sidebar + nội dung (< 960px) */
      dungBoCucDoc: width < BREAKPOINTS.lg,
      /** Hai cột nội dung (≥ 860px) */
      dungHaiCot: width >= BREAKPOINTS.md,
      /** Giới hạn chiều rộng nội dung trên PC */
      maxContentWidth: width >= BREAKPOINTS.xxl
        ? 1440
        : width >= BREAKPOINTS.xl
          ? 1200
          : undefined,
    };
  }, [width, height]);
}

/** Sidebar tỷ lệ % chiều rộng (mapping, EBM, …). */
export function rongSidebarTheoMan(width, { min = 148, max = 292, ratio = 0.22 } = {}) {
  const w = width || 800;
  return Math.min(max, Math.max(min, Math.round(w * ratio)));
}

/** Sidebar 3 bậc cho quản lý danh mục / luật. */
export function rongSidebarCap(width) {
  if (width < BREAKPOINTS.xs) return 196;
  if (width < BREAKPOINTS.sm) return 232;
  return 292;
}

/**
 * Kiểu layout động theo chiều rộng — thay `Platform.OS === 'web'` cho flexDirection / maxWidth.
 * Dùng trong JSX: style={[styles.header_main_row, kieu.flexRowSm]}
 */
export function taoKieuResponsive(width = 390) {
  const w = Number(width) || 390;
  const phone = w < BREAKPOINTS.sm;
  const tablet = w >= BREAKPOINTS.sm && w < BREAKPOINTS.xl;
  const laptop = w >= BREAKPOINTS.xl;
  const wideSm = w >= BREAKPOINTS.sm;
  const wideMd = w >= BREAKPOINTS.md;

  return {
    phone,
    tablet,
    laptop,
    paddingPage: {
      paddingHorizontal: phone ? 12 : tablet ? 16 : 24,
    },
    paddingHeader: {
      paddingHorizontal: phone ? 12 : tablet ? 16 : 24,
      paddingVertical: phone ? 12 : 16,
    },
    flexRowSm: {
      flexDirection: wideSm ? 'row' : 'column',
    },
    flexRowMd: {
      flexDirection: wideMd ? 'row' : 'column',
    },
    alignCenterRowSm: {
      alignItems: wideSm ? 'center' : 'flex-start',
    },
    headerRight: {
      alignItems: wideSm ? 'flex-end' : 'flex-start',
      maxWidth: wideSm ? '58%' : '100%',
      width: wideSm ? undefined : '100%',
    },
    accountRowJustify: {
      justifyContent: wideSm ? 'flex-end' : 'flex-start',
    },
    kpiRow: {
      flexWrap: wideSm ? 'nowrap' : 'wrap',
      justifyContent: wideSm ? 'flex-end' : 'space-between',
    },
    kpiCard: wideSm
      ? { flex: 1, minWidth: 104, maxWidth: 126 }
      : { flexGrow: 1, flexBasis: phone ? '47%' : '22%', minWidth: 100 },
    contentMax: {
      maxWidth: laptop ? 680 : '100%',
      width: '100%',
      alignSelf: 'center',
    },
    importHeroActions: {
      justifyContent: wideSm ? 'flex-end' : 'center',
      alignSelf: wideSm ? 'auto' : 'stretch',
    },
    filterInputRow: {
      flexDirection: wideMd ? 'row' : 'column',
      alignItems: wideMd ? 'center' : 'stretch',
    },
    sidebarCompact: {
      maxHeight: phone ? 260 : w < BREAKPOINTS.lg ? 320 : 360,
    },
    searchInput: {
      flex: 1,
      minWidth: 0,
      width: phone ? '100%' : Math.min(560, Math.max(240, w - 48)),
      maxWidth: '100%',
    },
    headerTitle: {
      fontSize: phone ? 17 : tablet ? 19 : 20,
    },
    logoSize: {
      width: phone ? 48 : 60,
      height: phone ? 48 : 60,
      borderRadius: phone ? 24 : 30,
    },
    containerCenter: {
      width: '100%',
      maxWidth: w >= BREAKPOINTS.xxl ? 1440 : w >= BREAKPOINTS.xl ? 1200 : undefined,
      alignSelf: 'center',
    },
    sidebarRow: {
      flex: wideMd && !phone ? 1 : undefined,
      minWidth: wideMd && w >= BREAKPOINTS.lg ? 300 : 0,
      maxWidth: wideMd && w >= BREAKPOINTS.lg ? 560 : '100%',
      width: w < BREAKPOINTS.lg ? '100%' : undefined,
    },
    mainFlex: {
      flex: w >= BREAKPOINTS.lg ? 2 : 1,
      minWidth: 0,
    },
  };
}

export function useKieuResponsive() {
  const { width } = useWindowDimensions();
  return useMemo(() => taoKieuResponsive(width), [width]);
}
