/**
 * Thanh panel trượt bên phải — cố định trên màn rộng, overlay trượt trên màn nhỏ.
 */
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CD } from '../tien_ich/chu_de_giao_dien';

const NoiDungPanel = ({ title, subtitle, onClose, children, showClose }) => (
  <View style={styles.panel_body}>
    <View style={styles.header}>
      <View style={[styles.header_accent, { backgroundColor: CD.brand.mauChinh }]} />
      <View style={styles.header_text}>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {showClose ? (
        <TouchableOpacity onPress={onClose} style={styles.btn_close} accessibilityLabel="Đóng bảng điều khiển">
          <Text style={styles.btn_close_txt}>✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll_content}>
      {children}
    </ScrollView>
  </View>
);

export default function ThanhPanelPhai({
  visible = false,
  pinned = false,
  width = 300,
  title = 'Bảng điều khiển',
  subtitle = 'Tiện ích nhanh',
  onClose,
  children,
}) {
  const animBackdrop = useRef(new Animated.Value(0)).current;
  const animSlide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (pinned || !visible) return;
    animBackdrop.setValue(0);
    animSlide.setValue(0);
    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(animBackdrop, {
          toValue: 1,
          duration: 240,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(animSlide, {
          toValue: 1,
          friction: 9,
          tension: 72,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [visible, pinned, animBackdrop, animSlide]);

  const dongOverlay = () => {
    Animated.parallel([
      Animated.timing(animBackdrop, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(animSlide, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) onClose?.();
    });
  };

  if (pinned) {
    return (
      <View style={[styles.panel_pinned, { width, alignSelf: 'stretch' }]}>
        <View style={styles.panel_pinned_inner}>
          <NoiDungPanel title={title} subtitle={subtitle}>
            {children}
          </NoiDungPanel>
        </View>
      </View>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={dongOverlay}>
      <View style={styles.overlay_root}>
        <Pressable style={styles.overlay_hit} onPress={dongOverlay}>
          <Animated.View
            style={[
              styles.overlay_backdrop,
              {
                opacity: animBackdrop.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.48],
                }),
              },
            ]}
          />
        </Pressable>
        <Animated.View
          style={[
            styles.panel_overlay,
            { width: Math.min(width, 360) },
            {
              transform: [
                {
                  translateX: animSlide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [width + 24, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <NoiDungPanel title={title} subtitle={subtitle} onClose={dongOverlay} showClose>
            {children}
          </NoiDungPanel>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  panel_pinned: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 0,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 12px 28px -6px rgba(15, 23, 42, 0.08)',
      },
      default: {
        shadowColor: '#0F172A',
        shadowOpacity: 0.07,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 5 },
        elevation: 3,
      },
    }),
  },
  panel_pinned_inner: {
    flex: 1,
    minHeight: 0,
  },
  overlay_root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  overlay_hit: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay_backdrop: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  panel_overlay: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
    ...Platform.select({
      web: {
        boxShadow: '-8px 0 32px rgba(15, 23, 42, 0.14)',
      },
      default: {
        shadowColor: '#0F172A',
        shadowOpacity: 0.12,
        shadowRadius: 16,
        shadowOffset: { width: -4, height: 0 },
        elevation: 8,
      },
    }),
  },
  panel_body: {
    flex: 1,
    minHeight: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#FAFBFC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEF2F7',
  },
  header_accent: {
    width: 4,
    borderRadius: 3,
    marginRight: 12,
    minHeight: 44,
  },
  header_text: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: CD.font.family,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontFamily: CD.font.family,
  },
  btn_close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btn_close_txt: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  scroll_content: {
    padding: 14,
    paddingBottom: 24,
  },
});
