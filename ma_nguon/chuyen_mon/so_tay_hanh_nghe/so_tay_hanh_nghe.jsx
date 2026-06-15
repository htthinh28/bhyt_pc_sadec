import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CD } from '../../tien_ich/chu_de_giao_dien';

const PDF_PATH = '/tai_lieu/so_tay_pham_vi_hanh_nghe.pdf';

export default function SoTayHanhNghe() {
  const srcPdf = `${PDF_PATH}#page=1`;
  const moPDFNgoai = async () => {
    if (Platform.OS === 'web') {
      window.open(srcPdf, '_blank', 'noopener,noreferrer');
      return;
    }
    Alert.alert('Thông báo', 'Vui lòng mở bản Web để xem PDF trực tiếp trong ứng dụng.');
  };

  return (
    <View style={styles.khungTong}>
      <View style={styles.noiDung}>
        <View style={styles.thongTin}>
          <Text style={styles.tieuDe}>📘 Sổ tay Phạm vi hành nghề</Text>
          <Text style={styles.moTa}>Tài liệu: Sổ tay hành nghề khám, chữa bệnh (02/2026, phiên bản 1).</Text>
          <TouchableOpacity style={styles.nutMoNgoai} onPress={moPDFNgoai} activeOpacity={0.85}>
            <Text style={styles.nutMoNgoaiText}>Mở PDF ↗</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.khungPdf}>
          {Platform.OS === 'web' ? (
            <iframe src={srcPdf} style={styles.iframePdf} title="Sổ tay hành nghề PDF" />
          ) : (
            <View style={styles.khongHoTro}>
              <Text style={styles.khongHoTroText}>
                Trình xem PDF nhúng hỗ trợ tốt nhất trên Web. Vui lòng dùng nút "Mở PDF" để xem tài liệu.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  khungTong: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },
  nutMoNgoai: {
    borderWidth: 1,
    borderColor: CD.border.input,
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  nutMoNgoaiText: {
    fontSize: 12,
    fontWeight: '700',
    color: CD.text.primary,
    fontFamily: CD.font.family,
  },
  noiDung: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    padding: 12,
    gap: 8,
  },
  thongTin: {
    borderWidth: 1,
    borderColor: CD.border.glass,
    borderRadius: 10,
    backgroundColor: CD.bg.glass_card,
    padding: 10,
  },
  tieuDe: {
    fontSize: 16,
    fontWeight: '800',
    color: CD.text.primary,
    fontFamily: CD.font.family,
    marginBottom: 4,
  },
  moTa: {
    fontSize: 12,
    color: CD.text.secondary,
    fontFamily: CD.font.family,
    marginBottom: 8,
  },
  khungPdf: {
    flex: 1,
    minHeight: 0,
    borderWidth: 1,
    borderColor: CD.border.divider,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  iframePdf: {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: '#fff',
  },
  khongHoTro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  khongHoTroText: {
    fontSize: 13,
    lineHeight: 20,
    color: CD.text.muted,
    textAlign: 'center',
    fontFamily: CD.font.family,
  },
});
