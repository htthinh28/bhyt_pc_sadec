/**
 * Thanh tiện ích trượt lên / xuống ở đáy màn hình — thay panel phải cố định khi dashboard dài.
 */
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useChuDeStyles } from '../tien_ich/chu_de_giao_dien';

export const CHIEU_CAO_THANH_THU_GOON = 52;

const CHIEU_CAO_TOI_DA = () => {
  const { height } = Dimensions.get('window');
  return Math.min(Math.round(height * 0.58), 520);
};

const taoStylesThanhPanel = (CD) => ({
  backdrop_hit: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 40,
  },
  backdrop: {
    flex: 1,
    backgroundColor: CD.surface.overlay,
  },
  sheet_root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    paddingHorizontal: 10,
  },
  sheet_card: {
    flex: 1,
    minHeight: 0,
    backgroundColor: CD.surface.panel,
    borderWidth: 1,
    borderColor: CD.border.glass,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: CD.web.shadow_modal,
      },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: -4 },
        elevation: 12,
      },
    }),
  },
  handle_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: CD.surface.card_alt,
    minHeight: CHIEU_CAO_THANH_THU_GOON,
  },
  handle_row_expanded: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: CD.border.divider,
  },
  handle_pill: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: CD.border.glass_md,
    marginRight: 12,
  },
  handle_text: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: CD.text.primary,
    fontFamily: CD.font.family,
  },
  subtitle: {
    fontSize: 11,
    color: CD.text.secondary,
    marginTop: 2,
    fontFamily: CD.font.family,
  },
  chevron: {
    fontSize: 14,
    color: CD.brand.mauChinh,
    fontWeight: '800',
    marginLeft: 8,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  scroll_content: {
    padding: 14,
    paddingBottom: 20,
  },
});

export default function ThanhPanelPhai({
  visible = true,
  expanded: expandedControlled,
  onExpandedChange,
  onInsetChange,
  title = 'Tiện ích nhanh',
  subtitle = 'Kéo lên hoặc chạm để mở',
  onClose,
  children,
}) {
  const styles = useChuDeStyles(taoStylesThanhPanel);
  const insets = useSafeAreaInsets();
  const [expandedInternal, setExpandedInternal] = useState(false);
  const expanded = expandedControlled ?? expandedInternal;
  const chieuCaoToiDa = CHIEU_CAO_TOI_DA();
  const animHeight = useRef(new Animated.Value(CHIEU_CAO_THANH_THU_GOON)).current;
  const animBackdrop = useRef(new Animated.Value(0)).current;

  const datTrangThaiMo = (mo) => {
    if (expandedControlled === undefined) setExpandedInternal(mo);
    onExpandedChange?.(mo);
    if (!mo) onClose?.();
  };

  const moRong = () => datTrangThaiMo(true);
  const thuGon = () => datTrangThaiMo(false);
  const chuyenTrangThai = () => (expanded ? thuGon() : moRong());

  const paddingBottom = Math.max(insets.bottom, Platform.OS === 'web' ? 8 : 0);
  const chieuCaoThuGon = CHIEU_CAO_THANH_THU_GOON + paddingBottom;
  const chieuCaoMo = chieuCaoToiDa + paddingBottom;

  useEffect(() => {
    onInsetChange?.(chieuCaoThuGon + 10);
  }, [chieuCaoThuGon, onInsetChange]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animHeight, {
        toValue: expanded ? chieuCaoMo : chieuCaoThuGon,
        duration: 280,
        easing: expanded ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(animBackdrop, {
        toValue: expanded ? 1 : 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start();
  }, [expanded, chieuCaoMo, chieuCaoThuGon, animHeight, animBackdrop]);

  if (!visible) return null;

  return (
    <>
      {expanded ? (
        <Pressable style={styles.backdrop_hit} onPress={thuGon}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: animBackdrop.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.55],
                }),
              },
            ]}
          />
        </Pressable>
      ) : null}

      <Animated.View
        style={[
          styles.sheet_root,
          {
            height: animHeight,
          },
        ]}
      >
        <View style={[styles.sheet_card, { paddingBottom }]}>
          <TouchableOpacity
            style={[styles.handle_row, expanded && styles.handle_row_expanded]}
            onPress={chuyenTrangThai}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={expanded ? 'Thu gọn thanh tiện ích' : 'Mở thanh tiện ích'}
          >
            <View style={styles.handle_pill} />
            <View style={styles.handle_text}>
              <Text style={styles.title}>{title}</Text>
              {!!subtitle && !expanded ? (
                <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
              ) : null}
            </View>
            <Text style={styles.chevron}>{expanded ? '▼' : '▲'}</Text>
          </TouchableOpacity>

          {expanded ? (
            <ScrollView
              style={styles.scroll}
              showsVerticalScrollIndicator
              contentContainerStyle={styles.scroll_content}
              nestedScrollEnabled
            >
              {children}
            </ScrollView>
          ) : null}
        </View>
      </Animated.View>
    </>
  );
}
