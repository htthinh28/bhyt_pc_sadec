/**
 * Quy tắc kiểm tra tương tác thuốc — đồng bộ với động cơ trong tien_ich/dong_co_giam_dinh.jsx
 * (giamDinhDanhMucNoiBo → XML2, MAP_TUONG_TAC_CAP, danhGiaDongThoiThuocABtrenXML2).
 */

import duLieuSeed from './du_lieu_tuong_tac_thuoc.seed.json';

const PHEN_BAN_SEED = String(duLieuSeed?.phien_ban || '');
const SO_QUY_TAC_SEED = Array.isArray(duLieuSeed?.data) ? duLieuSeed.data.length : 0;

/** Phiên bản / số quy tắc trong gói seed (đồng bộ file JSON — dùng cho UI, không lặp số tay) */
export const META_DM_TUONG_TAC_SEED = {
  phienBan: PHEN_BAN_SEED,
  soQuyTac: SO_QUY_TAC_SEED,
};

/** Danh sách hiển thị trong module Chuyên môn → Tương tác thuốc */
export const NOI_DUNG_QUY_TAC_HIEN_THI = [
  {
    key: 'phan_vi',
    tieuDe: 'Phạm vi hồ sơ',
    dong: [
      'Một lượt KCB (cùng MA_LK, cùng tập XML2 trong hồ sơ đang kiểm tra): ngoại trú, nội trú hoặc nội trú ban ngày đều dùng chung logic (mô tả loại đợt theo MA_LOAI_KCB / XML1).',
      'Chỉ xét các dòng XML2 thuốc mà động cơ xác định là BHYT thanh toán; các dòng bị loại khỏi nhánh BHYT (không thanh toán theo quy ước nội bộ) không vào tập so khớp tương tác.',
    ],
  },
  {
    key: 'danh_muc',
    tieuDe: 'Danh mục nội bộ (bảng này)',
    dong: [
      `Gói seed đi kèm ứng dụng: phiên bản ${PHEN_BAN_SEED || '—'}, ${SO_QUY_TAC_SEED} quy tắc (cặp mã thuốc). Có thể bổ sung/sửa tại Quản lý danh mục → Tương tác thuốc (BV) hoặc tab Chuyên môn — dữ liệu lưu cục bộ thay thế seed khi không rỗng.`,
      'Mỗi dòng định nghĩa một hoặc nhiều cặp mã (không hướng: A|B và B|A là một; chuẩn hóa không phân biệt hoa thường). Cột MA_THUOC_A / MA_THUOC_B dùng cho hiển thị và nhập nhanh; động cơ ưu tiên «Nội dung tương tác».',
      'Nếu «Nội dung» có từ khóa « vs » (không phân biệt hoa thường): lấy mọi mã trong ngoặc vuông […] bên trái « vs » và bên phải, sinh tất cả cặp tích chéo (ví dụ thuốc nền vs nhóm NSAID). Một bên không có [mã] thì dùng MA_THUOC_A hoặc MA_THUOC_B tương ứng nếu có.',
      'Không có « vs »: nếu đủ MA_THUOC_A và MA_THUOC_B thì một cặp; không thì suy từ các mã trong ngoặc trong toàn bộ «Nội dung» (mọi cặp trong tập mã — dùng khi mô tả ngắn chỉ có danh sách [mã]).',
      'Chỉ các dòng TRANG_THAI = ON mới được nạp vào động cơ (dòng OFF không sinh cảnh báo).',
      'Trùng một cặp mã từ hai dòng khác nhau: giữ bản ghi có mức độ nghiêm trọng hơn (Critical > Error > Warning); cùng mức thì ưu tiên «Cảnh báo hệ thống» dài hơn.',
      'Chuẩn hóa khi đọc bảng / khi nạp động cơ: bỏ dòng trùng toàn bộ nội dung (trừ id); nếu hai dòng khác nội dung nhưng trùng MA_TUONG_TAC thì gán mã mới cho bản sau; id luôn duy nhất — tránh lỗi React chỉ hiển thị một phần dòng.',
    ],
  },
  {
    key: 'dong_thoi',
    tieuDe: 'Điều kiện «bác sĩ kê đồng thời A và B» trên XML2',
    dong: [
      'Trên XML2 phải xuất hiện cả hai mã thuốc (ít nhất một dòng BHYT cho mỗi mã) trong cùng đợt điều trị đang xét.',
      'Ưu tiên: có ít nhất một ngày trùng giữa hai thuốc — ngày lấy 8 ký tự YYYYMMDD từ NGAY_YL, nếu trống thì từ NGAY_TH_YL (theo QĐ 130 / 3176).',
      'Nếu cả hai thuốc đều có mốc ngày nhưng không có ngày trùng → không ghi nhận tương tác đồng thời (coi như kê khác ngày).',
      'Nếu thiếu mốc ngày trên một hoặc hai thuốc → ghi nhận theo cả đợt (cùng tập dòng XML2 BHYT trong hồ sơ), có ghi chú trong cảnh báo.',
    ],
  },
  {
    key: 'ket_qua',
    tieuDe: 'Kết quả kiểm tra',
    dong: [
      'Mức độ trên hồ sơ: cột «Mức độ» (Warning / Error / Critical). Để trống hoặc chưa nhập: nếu «Cảnh báo hệ thống» có dấu hiệu chống chỉ định (ví dụ 🚫 hoặc chữ «chống chỉ định») thì mặc định Critical, ngược lại Warning.',
      'Mã quy tắc báo trên hồ sơ: lấy MA_TUONG_TAC trong bảng; nếu thiếu dùng CLN-TT-001.',
      'Tên quy tắc hiển thị: «Tương tác thuốc (XML2 — cùng đợt, đồng thời A và B)».',
      'Nội dung cảnh báo trên XML2: ưu tiên cột «Cảnh báo hệ thống», sau đó «Nội dung tương tác», rồi mới câu mặc định theo cặp mã (đúng thứ tự trong mã động cơ).',
      'Căn cứ pháp lý gắn vào bản ghi cảnh báo: khung chuyên môn KCB trong động cơ (Luật KCB, NĐ 96/2023, TT 32/2023, NĐ 188, QĐ 3618/BHXH, TT 12/2026 Điều 10).',
    ],
  },
];
