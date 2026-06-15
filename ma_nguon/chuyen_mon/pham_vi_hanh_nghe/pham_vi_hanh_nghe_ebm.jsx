/**
 * Hub EBM — Phạm vi hành nghề.
 * Hiển thị Phụ lục V theo bố cục dạng biểu mẫu như tài liệu pháp lý.
 */
import { useMemo, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';
import { CD } from '../../tien_ich/chu_de_giao_dien';
import phuLucVBacSyYKhoa from './phu_luc_v_bac_sy_y_khoa.json';
import phuLucVIBacSyYhct from './phu_luc_vi_bac_sy_yhct.json';
import phuLucVIIBacSyYHocDuPhong from './phu_luc_vii_bac_sy_y_hoc_du_phong.json';
import phuLucVIIIBacSyRangHamMat from './phu_luc_viii_bac_sy_rang_ham_mat.json';
import phuLucIXBacSyChuyenKhoa from './phu_luc_ix_bac_sy_chuyen_khoa.json';
import phuLucXYSyDaKhoa from './phu_luc_x_y_sy_da_khoa.json';
import phuLucXIYSyYhct from './phu_luc_xi_y_sy_yhct.json';
import phuLucXIIDieuDuong from './phu_luc_xii_dieu_duong.json';
import phuLucXIIIHoSinh from './phu_luc_xiii_ho_sinh.json';
import phuLucXIVKyThuatY from './phu_luc_xiv_ky_thuat_y.json';
import phuLucXVDinhDuongLamSang from './phu_luc_xv_dinh_duong_lam_sang.json';
import phuLucXVITamLyLamSang from './phu_luc_xvi_tam_ly_lam_sang.json';
import phuLucXVIIICapCuuNgoaiVien from './phu_luc_xviii_cap_cuu_ngoai_vien.json';

const NGUON_TT32_URL =
  'https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Thong-tu-32-2023-TT-BYT-huong-dan-Luat-Kham-benh-chua-benh-593360.aspx';

const PHU_LUC_OPTIONS = [
  {
    key: 'V',
    tieuDe: 'PHỤ LỤC SỐ V',
    nhanMucLuc: 'Phụ lục V — Bác sỹ y đa khoa',
    tenDanhMuc:
      'DANH MỤC KỸ THUẬT CHUYÊN MÔN KHÁM BỆNH, CHỮA BỆNH CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH BÁC SỸ VỚI PHẠM VI HÀNH NGHỀ Y KHOA',
    data: phuLucVBacSyYKhoa,
  },
  {
    key: 'VI',
    tieuDe: 'PHỤ LỤC SỐ VI',
    nhanMucLuc: 'Phụ lục VI — Bác sỹ YHCT',
    tenDanhMuc:
      'DANH MỤC KỸ THUẬT CHUYÊN MÔN KHÁM BỆNH, CHỮA BỆNH CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH BÁC SỸ VỚI PHẠM VI HÀNH NGHỀ Y HỌC CỔ TRUYỀN',
    data: phuLucVIBacSyYhct,
  },
  {
    key: 'VII',
    tieuDe: 'PHỤ LỤC SỐ VII',
    nhanMucLuc: 'Phụ lục VII — Bác sỹ YHDP',
    tenDanhMuc:
      'DANH MỤC KỸ THUẬT CHUYÊN MÔN KHÁM BỆNH, CHỮA BỆNH CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH BÁC SỸ VỚI PHẠM VI HÀNH NGHỀ Y HỌC DỰ PHÒNG',
    data: phuLucVIIBacSyYHocDuPhong,
  },
  {
    key: 'VIII',
    tieuDe: 'PHỤ LỤC SỐ VIII',
    nhanMucLuc: 'Phụ lục VIII — Bác sỹ RHM',
    tenDanhMuc:
      'DANH MỤC KỸ THUẬT CHUYÊN MÔN KHÁM BỆNH, CHỮA BỆNH CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH BÁC SỸ VỚI PHẠM VI HÀNH NGHỀ RĂNG HÀM MẶT',
    data: phuLucVIIIBacSyRangHamMat,
  },
  {
    key: 'IX',
    tieuDe: 'PHỤ LỤC SỐ IX',
    nhanMucLuc: 'Phụ lục IX — Bác sỹ chuyên khoa',
    tenDanhMuc:
      'DANH MỤC KỸ THUẬT CHUYÊN MÔN KHÁM BỆNH, CHỮA BỆNH CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH BÁC SỸ VỚI PHẠM VI HÀNH NGHỀ CHUYÊN KHOA',
    data: phuLucIXBacSyChuyenKhoa,
  },
  {
    key: 'X',
    tieuDe: 'PHỤ LỤC SỐ X',
    nhanMucLuc: 'Phụ lục X — Y sỹ đa khoa',
    tenDanhMuc: 'DANH MỤC KỸ THUẬT CHUYÊN MÔN CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH Y SỸ ĐA KHOA',
    data: phuLucXYSyDaKhoa,
  },
  {
    key: 'XI',
    tieuDe: 'PHỤ LỤC SỐ XI',
    nhanMucLuc: 'Phụ lục XI — Y sỹ YHCT',
    tenDanhMuc: 'DANH MỤC KỸ THUẬT CHUYÊN MÔN CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH Y SỸ Y HỌC CỔ TRUYỀN',
    data: phuLucXIYSyYhct,
  },
  {
    key: 'XII',
    tieuDe: 'PHỤ LỤC SỐ XII',
    nhanMucLuc: 'Phụ lục XII — Điều dưỡng',
    tenDanhMuc: 'DANH MỤC KỸ THUẬT CHUYÊN MÔN CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH ĐIỀU DƯỠNG',
    data: phuLucXIIDieuDuong,
  },
  {
    key: 'XIII',
    tieuDe: 'PHỤ LỤC SỐ XIII',
    nhanMucLuc: 'Phụ lục XIII — Hộ sinh',
    tenDanhMuc: 'DANH MỤC KỸ THUẬT CHUYÊN MÔN CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH HỘ SINH',
    data: phuLucXIIIHoSinh,
  },
  {
    key: 'XIV',
    tieuDe: 'PHỤ LỤC SỐ XIV',
    nhanMucLuc: 'Phụ lục XIV — Kỹ thuật y',
    tenDanhMuc: 'DANH MỤC KỸ THUẬT CHUYÊN MÔN CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH KỸ THUẬT Y',
    data: phuLucXIVKyThuatY,
  },
  {
    key: 'XV',
    tieuDe: 'PHỤ LỤC SỐ XV',
    nhanMucLuc: 'Phụ lục XV — Dinh dưỡng lâm sàng',
    tenDanhMuc: 'DANH MỤC KỸ THUẬT CHUYÊN MÔN CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH DINH DƯỠNG LÂM SÀNG',
    data: phuLucXVDinhDuongLamSang,
  },
  {
    key: 'XVI',
    tieuDe: 'PHỤ LỤC SỐ XVI',
    nhanMucLuc: 'Phụ lục XVI — Tâm lý lâm sàng',
    tenDanhMuc: 'DANH MỤC KỸ THUẬT CHUYÊN MÔN CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH TÂM LÝ LÂM SÀNG',
    data: phuLucXVITamLyLamSang,
  },
  {
    key: 'XVIII',
    tieuDe: 'PHỤ LỤC SỐ XVIII',
    nhanMucLuc: 'Phụ lục XVIII — Cấp cứu ngoại viện',
    tenDanhMuc: 'DANH MỤC KỸ THUẬT CHUYÊN MÔN CỦA NGƯỜI HÀNH NGHỀ CHỨC DANH CẤP CỨU NGOẠI VIỆN',
    data: phuLucXVIIICapCuuNgoaiVien,
  },
];

const boDauTiengViet = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();

export default function PhamViHanhNgheEbm() {
  const [phuLucDangXem, setPhuLucDangXem] = useState('V');
  const [tuKhoa, setTuKhoa] = useState('');
  const moNguonThongTu = async () => {
    await Linking.openURL(NGUON_TT32_URL);
  };

  const cauHinhPhuLuc = useMemo(
    () => PHU_LUC_OPTIONS.find((x) => x.key === phuLucDangXem) || PHU_LUC_OPTIONS[0],
    [phuLucDangXem],
  );
  const dsKyThuat = cauHinhPhuLuc.data;
  const tieuDePhuLuc = cauHinhPhuLuc.tieuDe;
  const tuKhoaLoc = useMemo(() => boDauTiengViet(tuKhoa), [tuKhoa]);

  const dsKyThuatDaLoc = useMemo(() => {
    if (!tuKhoaLoc) return dsKyThuat;
    return dsKyThuat.filter((item) => {
      const stt = boDauTiengViet(item.stt);
      const ma = boDauTiengViet(item.ma_tt43);
      const ten = boDauTiengViet(item.ten_ky_thuat);
      const nhom = boDauTiengViet(item.nhom);
      return stt.includes(tuKhoaLoc) || ma.includes(tuKhoaLoc) || ten.includes(tuKhoaLoc) || nhom.includes(tuKhoaLoc);
    });
  }, [dsKyThuat, tuKhoaLoc]);

  const dongBang = useMemo(() => {
    const out = [];
    let nhomHienTai = '';
    dsKyThuatDaLoc.forEach((item) => {
      const nhom = String(item.nhom || 'KHÁC').trim();
      if (nhom && nhom !== nhomHienTai) {
        nhomHienTai = nhom;
        out.push({ loai: 'nhom', nhom });
      }
      out.push({ loai: 'kt', ...item });
    });
    return out;
  }, [dsKyThuatDaLoc]);

  const tongDongKyThuat = dsKyThuat.length;
  const soDongDaLoc = dsKyThuatDaLoc.length;

  return (
    <View style={styles.vungChinh}>
      <View style={styles.mucLuc}>
        <Text style={styles.mucLucTieuDe}>MỤC LỤC</Text>
        <ScrollView style={styles.mucLucCuon} contentContainerStyle={styles.mucLucCuonContent}>
          {PHU_LUC_OPTIONS.map((pl) => (
            <TouchableOpacity
              key={pl.key}
              style={[styles.mucLucItem, phuLucDangXem === pl.key && styles.mucLucItemActive]}
              onPress={() => {
                setPhuLucDangXem(pl.key);
                setTuKhoa('');
              }}
              activeOpacity={0.85}
            >
              <Text style={[styles.mucLucItemText, phuLucDangXem === pl.key && styles.mucLucItemTextActive]}>
                {pl.nhanMucLuc}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.nutNguon} onPress={moNguonThongTu} activeOpacity={0.85}>
          <Text style={styles.chuNutNguon}>Nguồn TT32/2023</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.tieuDePhuLuc}>{tieuDePhuLuc}</Text>
        <Text style={styles.tieuDeBang}>
          {cauHinhPhuLuc.tenDanhMuc}
        </Text>
        <Text style={styles.moTaBang}>
          (Ban hành kèm theo Thông tư số 32/2023/TT-BYT ngày 31 tháng 12 năm 2023 của Bộ trưởng Bộ Y tế)
        </Text>
        <View style={styles.thanhLoc}>
          <TextInput
            value={tuKhoa}
            onChangeText={setTuKhoa}
            placeholder="Tìm theo STT, mã, nhóm hoặc tên kỹ thuật..."
            placeholderTextColor="#777"
            style={styles.oNhapLoc}
          />
          <Text style={styles.chuThongKeLoc}>
            {tuKhoaLoc
              ? `Kết quả: ${soDongDaLoc}/${tongDongKyThuat} dòng kỹ thuật`
              : `Tổng: ${tongDongKyThuat} dòng kỹ thuật`}
          </Text>
        </View>

        <ScrollView horizontal style={styles.cuonNgang} contentContainerStyle={styles.cuonNgangContent}>
          <View style={styles.bang}>
            <View style={styles.dongHeader}>
              <Text style={[styles.oHeader, styles.cotStt]}>STT</Text>
              <Text style={[styles.oHeader, styles.cotMa]}>
                Số TT theo Thông tư 43/2013/TT-BYT và Thông tư 21/2017/TT-BYT*
              </Text>
              <Text style={[styles.oHeader, styles.cotTen]}>DANH MỤC KỸ THUẬT</Text>
            </View>
            {dongBang.map((row, idx) =>
              row.loai === 'nhom' ? (
                <View key={`nhom_${idx}`} style={styles.dongNhom}>
                  <Text style={[styles.oNhom, styles.cotStt]} />
                  <Text style={[styles.oNhom, styles.cotMa]} />
                  <Text style={[styles.oNhom, styles.cotTen]}>{row.nhom}</Text>
                </View>
              ) : (
                <View key={`kt_${idx}`} style={styles.dongData}>
                  <Text style={[styles.oData, styles.cotStt]}>{row.stt || ''}</Text>
                  <Text style={[styles.oData, styles.cotMa]}>{row.ma_tt43 || ''}</Text>
                  <Text style={[styles.oData, styles.cotTen]}>{row.ten_ky_thuat || ''}</Text>
                </View>
              ),
            )}
            {!dongBang.length ? (
              <View style={styles.dongKhongCoDuLieu}>
                <Text style={styles.chuKhongCoDuLieu}>Không có dữ liệu phù hợp với từ khóa tìm kiếm.</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  vungChinh: { flex: 1, flexDirection: 'row', minWidth: 0, minHeight: 0 },
  mucLuc: {
    width: 170,
    borderRightWidth: 1,
    borderRightColor: CD.border.divider,
    backgroundColor: 'rgba(0,0,0,0.04)',
    padding: 10,
    gap: 8,
  },
  mucLucTieuDe: {
    fontSize: 12,
    fontWeight: '800',
    color: CD.text.muted,
    textAlign: 'center',
    fontFamily: CD.font.family,
  },
  mucLucItem: {
    borderWidth: 1,
    borderColor: CD.border.input,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: '#fff',
  },
  mucLucItemActive: {
    backgroundColor: CD.brand.mauChinh,
    borderColor: CD.brand.mauDam,
  },
  mucLucItemText: { fontSize: 11, color: CD.text.primary, fontFamily: CD.font.family },
  mucLucItemTextActive: { color: '#fff', fontWeight: '700' },
  mucLucCuon: { maxHeight: 520 },
  mucLucCuonContent: { gap: 6 },
  scroll: { flex: 1 },
  content: {
    padding: 12,
    paddingBottom: 20,
    minWidth: 0,
  },
  tieuDePhuLuc: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    fontFamily: CD.font.family,
    marginBottom: 4,
  },
  tieuDeBang: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    fontFamily: CD.font.family,
    marginBottom: 2,
  },
  moTaBang: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
    fontFamily: CD.font.family,
    marginBottom: 8,
  },
  thanhLoc: {
    gap: 6,
    marginBottom: 8,
  },
  oNhapLoc: {
    borderWidth: 1,
    borderColor: CD.border.input,
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12,
    color: CD.text.primary,
    fontFamily: CD.font.family,
  },
  chuThongKeLoc: {
    fontSize: 11,
    color: CD.text.muted,
    fontFamily: CD.font.family,
  },
  cuonNgang: { flex: 1 },
  cuonNgangContent: { minWidth: '100%' },
  bang: {
    borderWidth: 1,
    borderColor: '#666',
    width: '100%',
    minWidth: 980,
  },
  dongHeader: { flexDirection: 'row', backgroundColor: '#f1f1f1' },
  oHeader: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#666',
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontSize: 11,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    fontFamily: CD.font.family,
  },
  dongNhom: { flexDirection: 'row', backgroundColor: '#fafafa' },
  oNhom: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#666',
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 11,
    fontWeight: '800',
    color: '#111',
    fontFamily: CD.font.family,
  },
  dongData: { flexDirection: 'row', backgroundColor: '#fff' },
  oData: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#666',
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 11,
    color: '#111',
    fontFamily: CD.font.family,
  },
  dongKhongCoDuLieu: {
    borderBottomWidth: 1,
    borderColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  chuKhongCoDuLieu: {
    fontSize: 12,
    color: CD.text.muted,
    textAlign: 'center',
    fontFamily: CD.font.family,
  },
  cotStt: { width: 80, textAlign: 'center' },
  cotMa: { width: 220, textAlign: 'center' },
  cotTen: { flex: 1, minWidth: 680 },
  nutNguon: {
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: CD.border.input,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
  chuNutNguon: {
    fontSize: 11,
    fontWeight: '700',
    color: CD.text.primary,
    textAlign: 'center',
    fontFamily: CD.font.family,
  },
});
