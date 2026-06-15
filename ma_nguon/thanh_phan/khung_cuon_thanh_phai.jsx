/**
 * Khung cuộn dọc kèm thanh kéo bên phải (web) — bổ sung cho chuột scroll khi nội dung dài.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { CD } from '../tien_ich/chu_de_giao_dien';

const RONG_THANH = 12;
const CHIEU_CAO_THUMB_TOI_THIEU = 40;

const anThanhCuonNative = Platform.select({
  web: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  default: {},
});

export default function KhungCuonThanhPhai({
  style,
  contentContainerStyle,
  children,
  scrollEventThrottle = 16,
  showsVerticalScrollIndicator = false,
  ...scrollProps
}) {
  const scrollRef = useRef(null);
  const trackNodeRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(0);
  const [contentH, setContentH] = useState(0);
  const [dangKeo, setDangKeo] = useState(false);
  const [hoverThumb, setHoverThumb] = useState(false);
  const keoRef = useRef({ batDauY: 0, batDauScrollY: 0 });

  const coTheCuon = contentH > viewportH + 2;
  const maxScrollY = Math.max(0, contentH - viewportH);
  const tyLeThumb = coTheCuon ? viewportH / contentH : 1;
  const chieuCaoThumb = coTheCuon
    ? Math.max(CHIEU_CAO_THUMB_TOI_THIEU, Math.round(viewportH * tyLeThumb))
    : viewportH;
  const maxThumbTop = Math.max(0, viewportH - chieuCaoThumb);
  const viTriThumb = maxScrollY > 0 ? (scrollY / maxScrollY) * maxThumbTop : 0;

  const cuonDen = useCallback((y) => {
    const clamped = Math.max(0, Math.min(y, maxScrollY));
    scrollRef.current?.scrollTo({ y: clamped, animated: false });
    setScrollY(clamped);
  }, [maxScrollY]);

  const layDomTuSuKien = (e) => e?.currentTarget || e?.target || trackNodeRef.current;

  const tinhScrollTuViTriChuot = useCallback((clientY, domTrack) => {
    const track = domTrack || trackNodeRef.current;
    if (!track || maxScrollY <= 0) return 0;
    const rect = typeof track.getBoundingClientRect === 'function'
      ? track.getBoundingClientRect()
      : null;
    if (!rect) return scrollY;
    const offsetTrongTrack = clientY - rect.top - chieuCaoThumb / 2;
    const ratio = offsetTrongTrack / Math.max(1, rect.height - chieuCaoThumb);
    return ratio * maxScrollY;
  }, [chieuCaoThumb, maxScrollY, scrollY]);

  useEffect(() => {
    if (!dangKeo || Platform.OS !== 'web') return undefined;

    const onMove = (e) => {
      e.preventDefault();
      const deltaY = e.clientY - keoRef.current.batDauY;
      const ratio = maxThumbTop > 0 ? deltaY / maxThumbTop : 0;
      cuonDen(keoRef.current.batDauScrollY + ratio * maxScrollY);
    };
    const onUp = () => setDangKeo(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dangKeo, cuonDen, maxScrollY, maxThumbTop]);

  const batDauKeoThumb = (e) => {
    if (Platform.OS !== 'web') return;
    e.preventDefault?.();
    e.stopPropagation?.();
    const clientY = e?.clientY ?? e?.nativeEvent?.clientY ?? 0;
    keoRef.current = { batDauY: clientY, batDauScrollY: scrollY };
    setDangKeo(true);
  };

  const nhayTheoTrack = (e) => {
    if (Platform.OS !== 'web' || dangKeo) return;
    const clientY = e?.clientY ?? e?.nativeEvent?.clientY;
    if (clientY == null) return;
    cuonDen(tinhScrollTuViTriChuot(clientY, layDomTuSuKien(e)));
  };

  const hienThanhPhai = Platform.OS === 'web' && coTheCuon;

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const id = 'cdss-khung-cuon-webkit-hide';
    if (document.getElementById(id)) return;
    const styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.textContent = '[data-cdss-cuon-phai]::-webkit-scrollbar{display:none;width:0;height:0}';
    document.head.appendChild(styleEl);
  }, []);

  return (
    <View style={[styles.khung, style]}>
      <ScrollView
        ref={scrollRef}
        style={[styles.scroll, anThanhCuonNative]}
        // @ts-expect-error web data attribute
        dataSet={{ cdssCuonPhai: '1' }}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        scrollEventThrottle={scrollEventThrottle}
        onLayout={(e) => setViewportH(e.nativeEvent.layout.height)}
        onContentSizeChange={(_, h) => setContentH(h)}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        {...scrollProps}
      >
        {children}
      </ScrollView>

      {hienThanhPhai ? (
        <View
          ref={(node) => { trackNodeRef.current = node; }}
          style={styles.track}
          // @ts-expect-error web pointer
          onMouseDown={nhayTheoTrack}
          accessibilityRole="scrollbar"
          accessibilityLabel="Thanh cuộn dọc"
        >
          <View
            style={[
              styles.thumb,
              {
                height: chieuCaoThumb,
                transform: [{ translateY: viTriThumb }],
              },
              hoverThumb && styles.thumb_hover,
              dangKeo && styles.thumb_active,
            ]}
            // @ts-expect-error web pointer
            onMouseDown={batDauKeoThumb}
            // @ts-expect-error web pointer
            onMouseEnter={() => setHoverThumb(true)}
            // @ts-expect-error web pointer
            onMouseLeave={() => setHoverThumb(false)}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  khung: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 0,
    minWidth: 0,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    ...anThanhCuonNative,
  },
  track: {
    width: RONG_THANH + 6,
    marginLeft: 4,
    marginRight: 2,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    position: 'relative',
    alignSelf: 'stretch',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    }),
  },
  thumb: {
    position: 'absolute',
    left: 2,
    right: 2,
    top: 0,
    borderRadius: 6,
    backgroundColor: '#94A3B8',
    ...Platform.select({
      web: {
        cursor: 'grab',
        transition: 'background-color 0.15s ease',
      },
    }),
  },
  thumb_hover: {
    backgroundColor: '#64748B',
  },
  thumb_active: {
    backgroundColor: CD.brand.mauChinh,
    ...Platform.select({
      web: { cursor: 'grabbing' },
    }),
  },
});
