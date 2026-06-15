# Huấn luyện VTYT cho AI — phiên dự phòng (chưa có fixture audit trong repo)

**Phiên bản:** 1.5  
**Ngày:** 09/04/2026  
**Trạng thái:** **Chưa** có file `test_xml/audit_*` chuyên VTYT và ca mẫu `Ca_huan_luyen_mau_*VTYT*` — tài liệu này là **khung** để khi có hồ sơ + audit thì bổ sung theo cùng tinh thần phiên DVKT.

**CSDL rule trong repo:** **Không** có seed **`DM-VTYT-*`** (kiểm tra thanh toán VTYT theo danh mục như DVKT/thuốc) — xem [Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md](./Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md) §**0**.

**Chuẩn hóa suy luận cho AI (đọc trước):** [Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md](./Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md) — nguyên tắc P1–P5, ma trận nguồn rule, **§3** về nghĩa `XML1.T_VTYT` trong dự án.  
**Bảng neo mã ↔ engine (VTYT + nhánh liên quan):** [Bang_neo_phien_huan_luyen_vtyt_va_engine.md](./Bang_neo_phien_huan_luyen_vtyt_va_engine.md).

**Văn bản pháp lý “điều kiện thanh toán VTYT BHYT” hiện hành (neo trong repo):** mục **11.6** [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md) — trụ cột là **14/VBHN-BYT 2025** (liên kết công khai cùng ID **670262**). Bản `.doc` tải từ Thư viện pháp luật (ví dụ tên `14_VBHN-BYT_670262.doc`) là **cùng văn bản** đó; trong repo **không** nhúng file `.doc` — nếu cần học offline, giữ bản tải ngoài repo hoặc chuyển sang **PDF/txt** rồi (tuỳ chính sách đơn vị) đặt vào thư mục tài liệu nội bộ. AI chỉ neo theo **mục 11.6 + mã nguồn** `CO_SO_PHAP_LY_VTYT`, không trích dẫn nội dung từ `.doc` nếu không được dán vào phiên làm việc.

---

## 1. Vì sao tách khỏi DVKT / thuốc

- VTYT thường nằm **XML3** (`MA_VAT_TU`, `GOI_VTYT`, `TYLE_TT`…) và có **danh mục + điều kiện** riêng (VBHN 14, TT 04/2017…), khác seed **`DVKT_*`** và khác **`THUOC_*` / M8**.
- Giao thoa **đã kết cấu trong giá DVKT / ngày giường** — xem mục **11.5** và **11.6** trong [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md).

---

## 2. Hiện tại dùng gì để “luyện đọc điều kiện danh mục”

Cho đến khi có audit VTYT:

- **Chuẩn hóa VTYT (AI):** [Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md](./Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md).  
- **Đợt 3 (thuốc + XML liên quan)** trong [Lo_trinh_huan_luyen_AI_giam_dinh_BHYT.md](./Lo_trinh_huan_luyen_AI_giam_dinh_BHYT.md) — Bước 3.  
- **Cách đọc cột điều kiện / danh mục** (tinh thần tương tự VTYT): [The_tri_thuc_mau_thanh_toan_thuoc_BHYT.md](./The_tri_thuc_mau_thanh_toan_thuoc_BHYT.md).  
- **Neo engine thuốc**: [Bang_neo_phien_huan_luyen_thuoc_va_engine.md](./Bang_neo_phien_huan_luyen_thuoc_va_engine.md), [The_tri_thuc_chi_muc_giam_dinh_thuoc_engine_AI.md](./The_tri_thuc_chi_muc_giam_dinh_thuoc_engine_AI.md).

---

## 3. Checklist khi đã có `MA_LK` + XML + JSON audit VTYT

1. Xác định **XML3** (hoặc XML4/5 nếu rule đó khai báo) — `index`, `MA_VAT_TU`, `GOI_VTYT`, `TYLE_TT`.  
2. **Không** gộp cảnh báo VTYT với **HC_*** / **HD_*** nếu không cùng phân hệ — áp dụng phân lớp trong [Ky_nang_cot_loi_giam_dinh_AI_BHYT.md](./Ky_nang_cot_loi_giam_dinh_AI_BHYT.md).  
3. Neo `co_so_phap_ly` trong cảnh báo (nếu có) với **VBHN VTYT** trong `dong_co_giam_dinh.jsx` — không bịa giá hay % ngoài hồ sơ.  
4. Chạy `npm run qa:audit-fixtures` sau khi thêm file audit vào bộ fixture.

---

## 4. Việc cần làm để “mở” phiên VTYT đầy đủ

### 4.1. Tài liệu & audit (ưu tiên trước khi nạp rule)

- Thêm **ít nhất một** `test_xml/audit_*.json` có cảnh báo gắn VTYT (hoặc rule gắn `MA_VAT_TU` / prefix **`DM-VTYT-`** sau khi có seed).  
- Viết `Ca_huan_luyen_mau_<MA_LK>_VTYT_*.md` (mục tiêu, nguồn audit, tóm tắt, không PII).  
- Neo vào [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md) mục **11.6** và (khi có) bảng neo tương tự DVKT.

### 4.2. Khi đơn vị muốn **có thanh toán VTYT trong CSDL** (bổ sung rule — lập trình)

Hiện **chưa có** seed **`DM-VTYT-*`** ([Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md](./Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md) §**0**). Lộ trình gợi ý (theo cùng tinh thần các nhóm `DVKT_*` / `THUOC_*`):

1. **Quy ước mã:** dùng tiền tố **`DM-VTYT-`** + id nội bộ; `co_so_phap_ly` sẽ ăn sẵn cụm **VBHN_VTYT** qua `dong_co_giam_dinh.jsx` (đã map).  
2. **Nơi khai báo:** thêm rule động vào bảng luật XML đang dùng (cùng pattern với rule nhóm khác trong `ma_nguon/tien_ich/du_lieu_luat_*.jsx` hoặc cơ chế ON/OFF nội bộ — **theo chỗ đội dự án đang gắn rule mới**).  
3. **Điều kiện:** bám **XML3** (`MA_VAT_TU`, `TYLE_TT`, `SO_LUONG`, `NGAY_YL`…) và XML1/4/5 nếu cần; tránh pseudo-field chưa có trong parser.  
4. **Kiểm thử:** `npm run qa:audit-fixtures` + `npm run qa:on-off-match` sau khi thêm audit mẫu; cập nhật [Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md](./Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md) §**0** (bỏ dòng “chưa có seed” hoặc ghi **từ phiên bản …**).  
5. **Huấn luyện AI:** một dòng trong bảng neo + ví dụ `ma_luat` thật trong `Bai_tap` hoặc ca mẫu.

---

*Cập nhật phiên bản này khi repo có fixture VTYT đầu tiên hoặc seed `DM-VTYT-*` đầu tiên.*
