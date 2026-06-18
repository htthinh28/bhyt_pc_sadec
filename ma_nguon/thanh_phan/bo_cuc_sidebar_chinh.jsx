/**
 * Bố cục sidebar trái + nội dung chính — responsive phone / tablet / laptop / PC.
 */
import { ScrollView, StyleSheet, View } from 'react-native';
import { BREAKPOINTS, rongSidebarCap, useLayoutMode } from '../tien_ich/diem_anh_man_hinh';
import { useChuDe } from '../tien_ich/chu_de_giao_dien';

/**
 * @param {object} props
 * @param {React.ReactNode} props.sidebar — menu / điều hướng trái
 * @param {React.ReactNode} props.children — nội dung chính
 * @param {number} [props.sidebarWidth] — rộng sidebar khi ≥ md (mặc định theo cap)
 * @param {boolean} [props.sidebarScroll] — bọc sidebar trong ScrollView
 * @param {object} [props.style] — style wrapper ngoài
 */
export default function BoCucSidebarChinh({
  sidebar,
  children,
  sidebarWidth,
  sidebarScroll = true,
  style,
}) {
  const CD = useChuDe();
  const { dungBoCucDoc, dungSidebarTrai, width } = useLayoutMode();
  const rong = sidebarWidth ?? rongSidebarCap(width);
  const styles = taoStyles(CD);

  const khuSidebar = sidebarScroll ? (
    <ScrollView
      style={[
        styles.sidebar,
        dungSidebarTrai ? { width: rong } : styles.sidebar_compact,
      ]}
      contentContainerStyle={styles.sidebar_content}
      showsVerticalScrollIndicator={false}
    >
      {sidebar}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.sidebar,
        dungSidebarTrai ? { width: rong } : styles.sidebar_compact,
      ]}
    >
      {sidebar}
    </View>
  );

  return (
    <View style={[styles.wrapper, dungBoCucDoc ? styles.wrapper_stack : styles.wrapper_row, style]}>
      {khuSidebar}
      <View style={styles.main}>{children}</View>
    </View>
  );
}

const taoStyles = (CD) => StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 12,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  wrapper_row: {
    flexDirection: 'row',
  },
  wrapper_stack: {
    flexDirection: 'column',
  },
  sidebar: {
    backgroundColor: CD.bg?.glass_card || CD.surface?.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CD.border?.glass || CD.border?.divider,
    overflow: 'hidden',
  },
  sidebar_compact: {
    width: '100%',
    maxHeight: 240,
  },
  sidebar_content: {
    paddingBottom: 12,
  },
  main: {
    flex: 1,
    minWidth: 0,
    minHeight: 280,
  },
});
