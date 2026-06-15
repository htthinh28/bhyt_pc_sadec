import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CD } from '../tien_ich/chu_de_giao_dien';
import {
  capNhatMatKhauTrongDanhSach,
  kiemTraDinhDangMatKhau,
} from '../tien_ich/dich_vu_tai_khoan_cdss';
import { docDanhSachTaiKhoan, ghiNhatKyHeThong, luuDanhSachTaiKhoan } from '../tien_ich/nhat_ky_he_thong';
import { docPhienDangNhap } from '../tien_ich/phien_dang_nhap';

const dieuHuongTongQuan = (navigation) => {
  if (navigation?.reset) {
    navigation.reset({ index: 0, routes: [{ name: 'TongQuan' }] });
    return;
  }
  navigation?.replace?.('TongQuan');
};

export default function ManHinhDoiMatKhau({ navigation }) {
  const route = useRoute();
  const batBuoc = Boolean(route.params?.batBuoc);

  const [matKhauCu, setMatKhauCu] = useState('');
  const [matKhauMoi, setMatKhauMoi] = useState('');
  const [matKhauMoi2, setMatKhauMoi2] = useState('');
  const [dangXuLy, setDangXuLy] = useState(false);

  const xuLyLuu = async () => {
    const mk1 = matKhauMoi.trim();
    const mk2 = matKhauMoi2.trim();
    const mkCu = matKhauCu.trim();

    const kt1 = kiemTraDinhDangMatKhau(mk1);
    if (!kt1.ok) {
      Alert.alert('Mật khẩu mới', kt1.loi);
      return;
    }
    if (mk1 !== mk2) {
      Alert.alert('Xác nhận', 'Hai lần nhập mật khẩu mới không khớp.');
      return;
    }

    setDangXuLy(true);
    try {
      const session = await docPhienDangNhap();
      const email = String(session.email || '').trim().toLowerCase();
      if (!email) {
        Alert.alert('Phiên hết hạn', 'Vui lòng đăng nhập lại.');
        dieuHuongTongQuan(navigation);
        return;
      }

      const ds = await docDanhSachTaiKhoan();
      const user = ds.find((u) => u.email === email);
      if (!user) {
        Alert.alert('Lỗi', 'Không tìm thấy tài khoản.');
        return;
      }

      if (user.matKhau !== mkCu) {
        Alert.alert('Sai mật khẩu', 'Mật khẩu hiện tại không đúng.');
        return;
      }

      const next = capNhatMatKhauTrongDanhSach(ds, email, mk1, { buocDoiMatKhau: false });
      await luuDanhSachTaiKhoan(next, email);
      await ghiNhatKyHeThong({
        hanhDong: 'DOI_MAT_KHAU_THANH_CONG',
        doiTuong: email,
        chiTiet: 'Người dùng tự đổi mật khẩu',
        taiKhoan: email,
        vaiTro: String(session.role || 'USER').toUpperCase(),
      });

      setMatKhauCu('');
      setMatKhauMoi('');
      setMatKhauMoi2('');
      Alert.alert('Thành công', 'Đã cập nhật mật khẩu.', [
        { text: 'OK', onPress: () => dieuHuongTongQuan(navigation) },
      ]);
    } catch (e) {
      Alert.alert('Lỗi', String(e?.message || 'Không thể lưu mật khẩu.'));
    } finally {
      setDangXuLy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Đổi mật khẩu</Text>
          {batBuoc ? (
            <Text style={styles.warn}>
              Tài khoản của bạn đang dùng mật khẩu tạm hoặc cần đổi mật khẩu. Vui lòng đặt mật khẩu mới trước khi tiếp tục.
            </Text>
          ) : (
            <Text style={styles.sub}>Nhập mật khẩu hiện tại và mật khẩu mới.</Text>
          )}

          <Text style={styles.label}>Mật khẩu hiện tại</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={matKhauCu}
            onChangeText={setMatKhauCu}
            placeholder="••••••"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            editable={!dangXuLy}
            {...Platform.select({ web: { outlineStyle: 'none' } })}
          />

          <Text style={styles.label}>Mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={matKhauMoi}
            onChangeText={setMatKhauMoi}
            placeholder="Tối thiểu 6 ký tự"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            editable={!dangXuLy}
            {...Platform.select({ web: { outlineStyle: 'none' } })}
          />

          <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={matKhauMoi2}
            onChangeText={setMatKhauMoi2}
            placeholder="Nhập lại"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            editable={!dangXuLy}
            onSubmitEditing={xuLyLuu}
            {...Platform.select({ web: { outlineStyle: 'none' } })}
          />

          <TouchableOpacity style={[styles.btn, dangXuLy && styles.btnDis]} onPress={xuLyLuu} disabled={dangXuLy}>
            <Text style={styles.btnTxt}>{dangXuLy ? 'Đang lưu...' : 'Lưu mật khẩu'}</Text>
          </TouchableOpacity>

          {!batBuoc ? (
            <TouchableOpacity style={styles.link} onPress={() => dieuHuongTongQuan(navigation)} disabled={dangXuLy}>
              <Text style={styles.linkTxt}>← Quay về Tổng quan</Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: CD.bg.gradient_mobile,
    ...Platform.select({ web: { backgroundImage: CD.web.gradient_bg } }),
  },
  scroll: { padding: 24, maxWidth: 520, alignSelf: 'center', width: '100%' },
  title: { fontSize: 26, fontWeight: '900', color: CD.text.primary, fontFamily: CD.font.family, marginBottom: 8 },
  sub: { color: CD.text.secondary, marginBottom: 20, fontSize: 16 },
  warn: { color: '#fde68a', marginBottom: 20, fontSize: 15, lineHeight: 22 },
  label: { color: CD.text.secondary, fontWeight: '700', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: CD.bg.glass_input,
    borderWidth: 1,
    borderColor: CD.border.input,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: CD.text.primary,
    fontSize: 16,
  },
  btn: {
    marginTop: 24,
    backgroundColor: CD.brand.mauChinh,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  btnDis: { opacity: 0.65 },
  btnTxt: { color: CD.text.primary, fontWeight: '800', fontSize: 16 },
  link: { marginTop: 20, alignSelf: 'flex-start' },
  linkTxt: { color: CD.brand.mauNhat, fontWeight: '700' },
});
