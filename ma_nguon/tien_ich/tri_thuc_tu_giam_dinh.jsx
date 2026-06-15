/**
 * Kho tri thức tích lũy từ quá trình kiểm tra — bài học do người ghi nhận,
 * kèm snapshot cảnh báo và gợi ý soạn thảo từ dữ liệu có cấu trúc (không thay thế người).
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'CDSS_TRI_THUC_GD_V1';
const MAX_ITEMS = 500;

const parseJson = (raw) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

/** Gợi ý nháp từ MA_LK, số lỗi, mã luật — phục vụ kiểm tra viên chỉnh sửa trước khi lưu. */
export const goiYTomTatTuKetQuaGiamDinh = ({ ma_lk, ma_bn, ho_ten, danhSachLoi }) => {
  const ds = Array.isArray(danhSachLoi) ? danhSachLoi : [];
  const n = ds.length;
  const maLuat = [
    ...new Set(
      ds
        .map((l) => String(l?.ma_luat || l?.MA_LUAT || '').trim())
        .filter(Boolean),
    ),
  ].slice(0, 16);
  const dongTom = ds
    .slice(0, 5)
    .map((l) => `- [${l?.phan_he || '—'}] ${String(l?.canh_bao || l?.noi_dung || '').slice(0, 220)}`)
    .join('\n');

  const lines = [];
  lines.push(`Ca MA_LK ${ma_lk || '—'}${ma_bn ? `, MA_BN ${ma_bn}` : ''}${ho_ten ? ` — ${ho_ten}` : ''}.`);
  lines.push(`Hệ thống ghi nhận ${n} cảnh báo/vi phạm.`);
  if (maLuat.length) lines.push(`Mã luật/quy tắc liên quan (gợi ý đối chiếu): ${maLuat.join(', ')}.`);
  if (dongTom) {
    lines.push('Tóm tắt nhanh cảnh báo:');
    lines.push(dongTom);
  }
  lines.push('');
  lines.push('Bài học / kết luận kiểm tra (điền thủ công): …');
  return lines.join('\n');
};

export const layDanhSachTriThucTuGiamDinh = async () => {
  const raw = await AsyncStorage.getItem(KEY);
  const parsed = parseJson(raw);
  return Array.isArray(parsed) ? parsed : [];
};

/** Loại bản ghi: bài học tự soạn hoặc thẻ xác nhận đúng/sai phục vụ tích lũy tri thức / huấn luyện AI. */
export const LOAI_GHI_TRI_THUC = {
  BAI_HOC: 'BAI_HOC',
  XAC_NHAN_CANH_BAO: 'XAC_NHAN_CANH_BAO',
};

/**
 * Đóng gói phản hồi đúng/sai theo từng cảnh báo → JSON + văn bản bài học có cấu trúc.
 * @param {object} params
 * @param {string} params.ma_lk
 * @param {Array} params.danhSachLoi — danh sách cảnh báo đã chuẩn hóa (cùng thứ tự UI)
 * @param {Record<number, { ket_luan: 'DUNG'|'SAI', ghi_chu?: string }>} params.phanHoiTheoChiSo — chỉ các dòng đã đánh giá
 * @param {'DUNG'|null} params.xacNhanHoSoSach — khi không có cảnh báo: xác nhận engine “không lỗi” là đúng
 */
export const dongGoiPhanHoiXacNhanCanhBao = ({
  ma_lk,
  danhSachLoi = [],
  phanHoiTheoChiSo = {},
  xacNhanHoSoSach = null,
}) => {
  const ds = Array.isArray(danhSachLoi) ? danhSachLoi : [];
  const muc = [];
  let soDung = 0;
  let soSai = 0;

  ds.forEach((loi, index) => {
    const ph = phanHoiTheoChiSo[index] ?? phanHoiTheoChiSo[String(index)];
    if (!ph || (ph.ket_luan !== 'DUNG' && ph.ket_luan !== 'SAI')) return;
    const ket_luan = ph.ket_luan;
    if (ket_luan === 'DUNG') soDung += 1;
    if (ket_luan === 'SAI') soSai += 1;
    muc.push({
      index,
      ma_luat: String(loi?.ma_luat || loi?.MA_LUAT || '').trim(),
      phan_he: String(loi?.phan_he || loi?.phan_loai || '').trim(),
      muc_do: String(loi?.muc_do || '').trim(),
      canh_bao_rut_gon: String(loi?.canh_bao || loi?.noi_dung || '').trim().slice(0, 2000),
      ket_luan,
      ghi_chu: String(ph.ghi_chu || '').trim().slice(0, 2000),
    });
  });

  const payload = {
    phien_ban: 1,
    loai: LOAI_GHI_TRI_THUC.XAC_NHAN_CANH_BAO,
    ma_lk: String(ma_lk || '').trim(),
    ngay_dong_goi: new Date().toISOString(),
    xac_nhan_khong_canh_bao: ds.length === 0 && xacNhanHoSoSach === 'DUNG' ? 'DUNG' : null,
    muc,
    tong_hop: { so_dung: soDung, so_sai: soSai, tong_muc_da_danh_gia: muc.length },
  };

  const lines = [];
  lines.push(`[Xác nhận tri thức kiểm tra — MA_LK ${payload.ma_lk || '—'}]`);
  lines.push(
    'Mục đích: ghi nhận đánh giá đúng/sai từ kiểm tra viên để tích lũy tri thức, hỗ trợ cải thiện độ chính xác và huấn luyện AI (dữ liệu cục bộ).',
  );
  if (payload.xac_nhan_khong_canh_bao === 'DUNG') {
    lines.push('— Hồ sơ không có cảnh báo: xác nhận đánh giá của hệ thống là ĐÚNG.');
  }
  muc.forEach((m, i) => {
    const lab = m.ket_luan === 'DUNG' ? 'ĐÚNG' : 'SAI';
    lines.push(
      `${i + 1}) [${m.phan_he || '—'}] ${m.ma_luat || '—'} → Kết luận GV: ${lab}. ${m.ghi_chu ? `Ghi chú: ${m.ghi_chu}` : ''}`,
    );
    lines.push(`   Cảnh báo hệ thống (rút gọn): ${String(m.canh_bao_rut_gon).slice(0, 500)}${String(m.canh_bao_rut_gon).length > 500 ? '…' : ''}`);
  });
  lines.push(`Tổng hợp: ${soDung} cảnh báo được đánh giá ĐÚNG, ${soSai} được đánh giá SAI (${muc.length} mục đã ghi nhận).`);

  const bai_hoc = lines.join('\n');
  const tom_tat = `[Xác nhận] ${payload.ma_lk || '—'} · ${soDung} đúng / ${soSai} sai${ds.length === 0 ? ' · HS sạch ✓' : ''}`.slice(0, 500);

  return {
    phan_hoi_canh_bao_json: JSON.stringify(payload),
    bai_hoc,
    tom_tat,
    tong_hop: payload.tong_hop,
  };
};

export const themTriThucTuCa = async ({
  ma_lk,
  ma_bn,
  ho_ten,
  tom_tat,
  bai_hoc,
  ma_luat_goi_y,
  snapshot_loi,
  phan_hoi_canh_bao_json,
  loai_ghi,
}) => {
  const list = await layDanhSachTriThucTuGiamDinh();
  const lg = loai_ghi === LOAI_GHI_TRI_THUC.XAC_NHAN_CANH_BAO ? LOAI_GHI_TRI_THUC.XAC_NHAN_CANH_BAO : LOAI_GHI_TRI_THUC.BAI_HOC;
  const record = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    ma_lk: String(ma_lk || '').trim(),
    ma_bn: String(ma_bn || '').trim(),
    ho_ten: String(ho_ten || '').trim(),
    ngay_tao: new Date().toISOString(),
    tom_tat: String(tom_tat || '').trim().slice(0, 500),
    bai_hoc: String(bai_hoc || '').trim().slice(0, 12000),
    ma_luat_goi_y: String(ma_luat_goi_y || '').trim().slice(0, 2000),
    snapshot_loi: String(snapshot_loi || '').trim().slice(0, 8000),
    loai_ghi: lg,
    phan_hoi_canh_bao_json: String(phan_hoi_canh_bao_json || '').trim().slice(0, 24000),
  };
  list.unshift(record);
  while (list.length > MAX_ITEMS) list.pop();
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
  return record;
};

export const xoaTriThucTheoId = async (id) => {
  const sid = String(id || '').trim();
  if (!sid) return { ok: false };
  const list = await layDanhSachTriThucTuGiamDinh();
  const next = list.filter((x) => x?.id !== sid);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return { ok: true, so_luong: next.length };
};

export const xuatTriThucRaMarkdown = (items) => {
  const arr = Array.isArray(items) ? items : [];
  const chunks = ['# Tri thức tích lũy từ kiểm tra (xuất từ CDSS BHYT)', ''];
  arr.forEach((it, i) => {
    chunks.push(`## ${i + 1}. ${it.tom_tat || it.ma_lk || 'Ca'}`);
    chunks.push('');
    chunks.push(`- **Ngày:** ${it.ngay_tao || '—'}`);
    chunks.push(`- **MA_LK:** ${it.ma_lk || '—'} | **MA_BN:** ${it.ma_bn || '—'} | **BN:** ${it.ho_ten || '—'}`);
    if (it.loai_ghi === LOAI_GHI_TRI_THUC.XAC_NHAN_CANH_BAO) {
      chunks.push('- **Loại:** Xác nhận đúng/sai cảnh báo (tri thức học tập)');
    }
    if (it.ma_luat_goi_y) chunks.push(`- **Mã luật (gợi ý):** ${it.ma_luat_goi_y}`);
    chunks.push('');
    chunks.push('### Bài học / kết luận');
    chunks.push('');
    chunks.push(it.bai_hoc || '—');
    chunks.push('');
    if (it.phan_hoi_canh_bao_json) {
      chunks.push('### Dữ liệu phản hồi có cấu trúc (JSON)');
      chunks.push('');
      chunks.push('```json');
      chunks.push(String(it.phan_hoi_canh_bao_json).slice(0, 12000));
      chunks.push('```');
      chunks.push('');
    }
    if (it.snapshot_loi) {
      chunks.push('### Snapshot cảnh báo (rút gọn)');
      chunks.push('');
      chunks.push('```');
      chunks.push(String(it.snapshot_loi).slice(0, 6000));
      chunks.push('```');
      chunks.push('');
    }
    chunks.push('---');
    chunks.push('');
  });
  return chunks.join('\n');
};
