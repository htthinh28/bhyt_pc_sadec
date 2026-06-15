import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CD } from '../tien_ich/chu_de_giao_dien';
import {
  layDanhSachTriThucTuGiamDinh,
  LOAI_GHI_TRI_THUC,
  xoaTriThucTheoId,
  xuatTriThucRaMarkdown,
} from '../tien_ich/tri_thuc_tu_giam_dinh';

const ManHinhTriThucTuGiamDinh = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [dangTai, setDangTai] = useState(true);

  const taiLai = useCallback(async () => {
    setDangTai(true);
    try {
      const ds = await layDanhSachTriThucTuGiamDinh();
      setItems(ds);
    } finally {
      setDangTai(false);
    }
  }, []);

  useEffect(() => {
    taiLai();
  }, [taiLai]);

  const xuLyXoa = (id, tomTat) => {
    Alert.alert('Xóa bản ghi?', String(tomTat || id).slice(0, 120), [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          await xoaTriThucTheoId(id);
          taiLai();
        },
      },
    ]);
  };

  const xuLyXuat = async () => {
    const md = xuatTriThucRaMarkdown(items);
    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(md);
        Alert.alert('Đã copy', 'Nội dung Markdown đã copy vào clipboard. Dán vào file trong thư mục tai_lieu/ nếu cần đưa vào Thư viện.');
        return;
      }
      await Share.share({ message: md, title: 'Tri thức kiểm tra' });
    } catch (e) {
      Alert.alert('Xuất', String(e?.message || e));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('TongQuan')} style={styles.btn_back}>
          <Text style={styles.txt_back}>⬅ TỔNG QUAN</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🧠 TRI THỨC TỪ KIỂM TRA</Text>
        <View style={{ width: 120 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner}>
        <Text style={styles.lead}>
          Gồm bài học tự soạn và thẻ xác nhận Đúng/Sai từng cảnh báo (màn Chi tiết ca). Dữ liệu JSON phục vụ tích lũy tri
          thức và huấn luyện AI — không thay cho kết luận pháp lý.
        </Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btn_pri} onPress={taiLai}>
            <Text style={styles.btn_pri_txt}>Làm mới</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn_pri, styles.btn_sec]} onPress={xuLyXuat} disabled={items.length === 0}>
            <Text style={styles.btn_pri_txt}>Copy / chia sẻ Markdown</Text>
          </TouchableOpacity>
        </View>

        {dangTai ? (
          <ActivityIndicator size="large" color={CD.brand.mauChinh} style={{ marginTop: 24 }} />
        ) : items.length === 0 ? (
          <Text style={styles.empty}>Chưa có bản ghi. Mở Chi tiết ca → lưu xác nhận hoặc bài học.</Text>
        ) : (
          items.map((it) => {
            const laXacNhan = it.loai_ghi === LOAI_GHI_TRI_THUC.XAC_NHAN_CANH_BAO || !!it.phan_hoi_canh_bao_json;
            let tomTatPhanHoi = '';
            if (it.phan_hoi_canh_bao_json) {
              try {
                const p = JSON.parse(it.phan_hoi_canh_bao_json);
                if (p?.xac_nhan_khong_canh_bao === 'DUNG') {
                  tomTatPhanHoi = ' · HS không cảnh báo (đã xác nhận)';
                } else if (p?.tong_hop) {
                  const t = p.tong_hop;
                  tomTatPhanHoi = ` · ${t.so_dung} đúng / ${t.so_sai} sai`;
                }
              } catch (_) {
                /* ignore */
              }
            }
            return (
              <View key={it.id} style={styles.card}>
                <View style={styles.card_title_row}>
                  <Text style={styles.card_title} numberOfLines={2}>
                    {it.tom_tat || it.ma_lk || 'Ca'}
                  </Text>
                  {laXacNhan ? (
                    <View style={styles.badge_xac_nhan}>
                      <Text style={styles.badge_xac_nhan_txt}>Xác nhận Đ/S</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.card_meta}>
                  {it.ngay_tao?.slice(0, 19)?.replace('T', ' ')} · MA_LK {it.ma_lk || '—'}
                  {tomTatPhanHoi}
                </Text>
                <Text style={styles.card_body} numberOfLines={laXacNhan ? 10 : 6}>
                  {it.bai_hoc || '—'}
                </Text>
                <TouchableOpacity onPress={() => xuLyXoa(it.id, it.tom_tat)} style={styles.btn_del}>
                  <Text style={styles.btn_del_txt}>Xóa</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CD.bg.gradient_mobile,
    ...Platform.select({ web: { backgroundImage: CD.web.gradient_bg } }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 36,
    backgroundColor: CD.brand.mauDam,
    borderBottomWidth: 1,
    borderBottomColor: CD.border.header,
  },
  btn_back: { padding: 8 },
  txt_back: { color: CD.text.primary, fontWeight: '700', fontSize: 13, fontFamily: CD.font.family },
  title: { color: CD.text.primary, fontWeight: '800', fontSize: 17, fontFamily: CD.font.family, flex: 1, textAlign: 'center' },
  scroll: { flex: 1 },
  scrollInner: { padding: 16, paddingBottom: 40 },
  lead: {
    color: CD.text.secondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
    fontFamily: CD.font.family,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  btn_pri: {
    backgroundColor: CD.brand.mauNhat,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CD.border.accent,
  },
  btn_sec: { backgroundColor: CD.bg.glass_input },
  btn_pri_txt: { color: CD.brand.mauDam, fontWeight: '700', fontSize: 13, fontFamily: CD.font.family },
  empty: { color: CD.text.muted, fontSize: 15, textAlign: 'center', marginTop: 32, fontFamily: CD.font.family },
  card: {
    backgroundColor: CD.bg.glass_card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: CD.border.glass,
  },
  card_title_row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 },
  card_title: { color: CD.text.primary, fontWeight: '800', fontSize: 15, fontFamily: CD.font.family, flex: 1 },
  badge_xac_nhan: {
    backgroundColor: 'rgba(21,101,192,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1565C0',
  },
  badge_xac_nhan_txt: { fontSize: 10, fontWeight: '800', color: '#1565C0', fontFamily: CD.font.family },
  card_meta: { color: CD.text.muted, fontSize: 11, fontFamily: CD.font.mono, marginBottom: 8 },
  card_body: { color: CD.text.table_cell, fontSize: 14, lineHeight: 22, fontFamily: CD.font.family },
  btn_del: { alignSelf: 'flex-end', marginTop: 10 },
  btn_del_txt: { color: '#c62828', fontWeight: '700', fontSize: 13 },
});

export default ManHinhTriThucTuGiamDinh;
