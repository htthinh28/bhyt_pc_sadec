/**
 * Chọn ngày theo ISO YYYY-MM-DD — Web: input type=date; iOS/Android: @react-native-community/datetimepicker
 */
import React, { createElement, useMemo, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CD } from '../tien_ich/chu_de_giao_dien';

const pad2 = (n) => String(n).padStart(2, '0');

export const chuyenDateSangYMD = (d) => {
  if (!d || Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

export const chuyenYMDSangDate = (s) => {
  if (!s || !String(s).trim()) return new Date();
  const m = String(s).trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return new Date();
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? new Date() : d;
};

/**
 * @param {object} props
 * @param {string} props.value YYYY-MM-DD hoặc rỗng
 * @param {(s: string) => void} props.onChangeValue
 * @param {string} [props.placeholder]
 * @param {import('react-native').StyleProp} [props.style]
 * @param {boolean} [props.editable]
 */
export default function OChonNgayISO({ value, onChangeValue, placeholder = '', style, editable = true }) {
  const [show, setShow] = useState(false);
  const dateObj = useMemo(() => chuyenYMDSangDate(value), [value]);

  if (Platform.OS === 'web') {
    const webStyle = StyleSheet.flatten([styles.oWeb, style]);
    return createElement('input', {
      type: 'date',
      value: value || '',
      disabled: !editable,
      onChange: (e) => {
        const v = e?.target?.value ?? '';
        onChangeValue(v);
      },
      placeholder: placeholder || undefined,
      style: webStyle,
    });
  }

  const hienThi = value && String(value).trim() ? value : (placeholder || 'Chọn ngày…');

  return (
    <View style={[styles.wrap, style]}>
      <Pressable
        onPress={() => editable && setShow(true)}
        style={[styles.oNative, !editable && styles.oTat]}
        disabled={!editable}
      >
        <Text style={styles.chuNgay} numberOfLines={1}>{hienThi}</Text>
        <Text style={styles.icon}>📅</Text>
      </Pressable>
      {show ? (
        <View style={styles.khoiPicker}>
          <DateTimePicker
            value={dateObj}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              if (Platform.OS === 'android') {
                setShow(false);
                if (selectedDate) {
                  onChangeValue(chuyenDateSangYMD(selectedDate));
                }
                return;
              }
              if (selectedDate) {
                onChangeValue(chuyenDateSangYMD(selectedDate));
              }
            }}
          />
          {Platform.OS === 'ios' ? (
            <Pressable style={styles.nutXongIos} onPress={() => setShow(false)}>
              <Text style={styles.chuXong}>Xong</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  oWeb: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CD.border.input,
    backgroundColor: CD.bg.glass_input,
    color: CD.text.primary,
    fontSize: 15,
    fontFamily: CD.font.family,
  },
  oNative: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CD.border.input,
    backgroundColor: CD.bg.glass_input,
    minHeight: 44,
  },
  oTat: { opacity: 0.55 },
  chuNgay: { flex: 1, fontSize: 15, color: CD.text.primary, fontFamily: CD.font.family },
  icon: { fontSize: 18, marginLeft: 8 },
  khoiPicker: {
    marginTop: 8,
    backgroundColor: CD.bg.glass_card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CD.border.glass,
    overflow: 'hidden',
  },
  nutXongIos: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: CD.brand.mauChinh,
  },
  chuXong: { color: '#FFF', fontWeight: '800', fontSize: 16, fontFamily: CD.font.family },
});
