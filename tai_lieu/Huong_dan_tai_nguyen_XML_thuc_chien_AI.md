# HƯỚNG DẪN: DÙNG XML THỰC TRONG `tai_nguyen/` CHO HUẤN LUYỆN AI THỰC CHIẾN

Phiên bản: 1.0 · Cập nhật: 10/04/2026  

## 1. Nguồn dữ liệu

- **Thư mục:** `tai_nguyen/` (gốc repo, cùng cấp `ma_nguon/`, `tai_lieu/`).
- **Định dạng:** file **`GIAMDINHHS`** (XML ngoài), trong đó từng `FILEHOSO` có `LOAIHOSO` (XML1…XML4) và **`NOIDUNGFILE`** chứa **Base64** của từng bảng XML nội bộ — giống luồng nhập mà CDSS BHYT xử lý sau khi giải mã.
- **Ý nghĩa huấn luyện:** đây là **hồ sơ thật** (mã lượt, CSKCB, chi tiết điều trị) — dùng để tập cho AI: đọc cảnh báo engine, đối chiếu rule, viết ca mẫu, **không** đăng công khai nguyên file nếu chưa khử nhận dạng theo quy định đơn vị.

## 2. Chỉ mục máy đọc (`MA_LK` ↔ đường dẫn file)

Chạy:

```bash
npm run tai_lieu:index-tai-nguyen
```

hoặc:

```bash
node scripts/index_tai_nguyen_xml.mjs
```

Sinh **`tai_lieu/_index_tai_nguyen_xml.json`** gồm:

- `tong_so` — số file `.xml` tìm được (đệ quy mọi thư mục con).
- `items[]` — mỗi phần tử: `relPath`, `bytes`, `mtime`, **`ma_lk`** (trích từ nội dung XML1 sau Base64), **`ma_cskcb`** (từ `THONGTINDONVI` nếu có), **`ma_loai_kcb`**, **`ma_benh_chinh`** (khi có trong XML1).

Khi `ma_lk` trống hoặc có `loi_doc`, cần mở file gốc kiểm tra (file hỏng hoặc không đúng mẫu GIAMDINHHS).

### Chỉ mục theo thư mục con (ví dụ `xml2_ip`)

Để chỉ quét một thư mục dưới `tai_nguyen/` (tránh trộn toàn bộ kho XML):

```bash
npm run tai_lieu:index-tai-nguyen-xml2-ip
```

hoặc:

```bash
node scripts/index_tai_nguyen_xml.mjs xml2_ip
```

Sinh **`tai_lieu/_index_tai_nguyen_xml2_ip.json`**. Cấu trúc giống chỉ mục toàn cục; thêm **`ma_loai_kcb`**, **`ma_benh_chinh`** (khi có trong XML1 sau Base64) để lọc ca theo loại KCB và ICD chính. Tổng hợp kỹ năng đọc nội trú từ nguồn này: [Thuc_chien_tong_hop_xml2_ip_AI.md](./Thuc_chien_tong_hop_xml2_ip_AI.md).

## 3. Cách dùng với AI thực chiến

1. **Chọn ca:** lọc trong JSON theo `ma_lk` trùng với ca đang phân tích trong app / `Ca_huan_luyen_mau_*.md`.
2. **Mở file XML:** đường dẫn tuyệt đối = `{repo}/tai_nguyen/...` (bỏ tiền tố `tai_nguyen/` trong `relPath` là đường dẫn tương đối trong thư mục đó).
3. **Prompt gợi ý:** *“Đọc file `…` trong `tai_nguyen`, giải thích cấu trúc GIAMDINHHS và trích `MA_LK` khớp với index.”* — hoặc sau khi import vào CDSS: so sánh kết quả kiểm tra với cùng `MA_LK`.
4. **Kết hợp kho tri thức tĩnh:** [Goi_du_lieu_huan_luyen_AI_thuc_chien.md](./Goi_du_lieu_huan_luyen_AI_thuc_chien.md), [Lo_trinh_huan_luyen_AI_giam_dinh_BHYT.md](./Lo_trinh_huan_luyen_AI_giam_dinh_BHYT.md).

## 4. An toàn và Git

- File `_index_tai_nguyen_xml.json` chứa **mã lượt khám** — chỉ commit/push nếu chính sách đơn vị cho phép; có thể thêm vào `.gitignore` cục bộ hoặc chỉ giữ script + không lưu index.
- Thư mục `tai_nguyen/*.json` và `*.pdf` đã được `.gitignore` mặc định (khác với file `.xml`).

## 5. Liên kết kỹ thuật trong repo

- Giải mã / nhập tương tự luồng ứng dụng: các màn **Đọc XML** / `nhap_file_xml` (tham chiếu mã nguồn khi cần đồng bộ hành vi).

---

*Tài liệu này mô tả **cách lấy và neo** dữ liệu huấn luyện; không thay thế quy trình bảo mật và phân quyền nội bộ.*
