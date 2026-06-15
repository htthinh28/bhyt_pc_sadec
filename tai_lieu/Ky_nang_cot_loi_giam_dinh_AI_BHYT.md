# Kỹ năng cốt lõi kiểm tra BHYT cho AI (đa nhóm rule)

**Phiên bản:** 1.3  
**Ngày:** 09/04/2026  
**Phạm vi:** Bổ sung cho mọi **đợt** huấn luyện (thuốc, DVKT, VTYT, hành chính…) — **không** thay thế thẻ tri thức chuyên đề hay văn bản pháp lý.

---

## 1. Mục tiêu

Rèn cho AI các **thói quen suy luận** giống kiểm tra viên có kinh nghiệm:

- Đọc **cảnh báo** như một **bản ghi có cấu trúc**, không như văn tự do.
- Phân **loại vấn đề** trước khi “kết luận xuất toán”.
- **Không** suy diễn khi **thiếu dữ liệu** hoặc **thiếu Phụ lục / HĐ KCB**.
- **Tôn trọng** ranh giới CDSS: hỗ trợ quyết định, không thay **người có thẩm quyền**.

---

## 2. Đọc một dòng cảnh báo (audit / engine)

Một bản ghi điển hình thường có các khía cạnh sau (tên trường có thể lệch theo pipeline):

| Khía cạnh | Câu hỏi AI cần trả lời được |
|-----------|-------------------------------|
| **Phân hệ** (`phan_he`) | Lỗi gắn **XML1 / XML2 / XML3 / …** nào? Ảnh hưởng cách mở hồ sơ. |
| **Chỉ số dòng** (`index`) | Cảnh báo gắn **dòng thứ mấy** trong bảng đó (-1 thường là cấp hồ sơ). |
| **Mã luật** (`ma_luat`) | Thuộc **nhóm nào** (THUOC_, DVKT_, CDHA_, HC_, DVKT-OP-, CLN-, …)? |
| **Điều kiện** (`dieu_kien`) | Là biểu thức seed, `BUILT-IN`, hay **tên operator** (no-code)? |
| **Căn cứ** (`co_so_phap_ly`) | Có chuỗi trích dẫn không — nếu rỗng, vẫn có thể neo thủ công vào thẻ tri thức. |

**Lỗi thường gặp của AI:** gộp nhiều cảnh báo khác `ma_luat` thành “một lỗi chung”; nhầm **cùng MA_LK** với **cùng nguyên nhân**.

---

## 3. Phân loại nhanh (trước khi giải thích sâu)

| Lớp | Dấu hiệu | Hành vi gợi ý của AI |
|-----|----------|----------------------|
| **A — Chất lượng dữ liệu / schema** | HC_, QĐ 130, trường trống, ngày lệch | Ưu tiên **sửa dữ liệu** hoặc nhắc thiếu file XML. |
| **B — Khớp danh mục / giá / tuyến** | DVKT-OP-*, một phần THUOC_/DM | Đối chiếu **DM nội bộ / BYT** + thời điểm. |
| **C — Nghiệp vụ lâm sàn / chỉ định** | Chỉ định vs ICD, gói PT, “hợp lý” | **Không** kết luận một chiều; đưa **câu hỏi** cho BS/điều dưỡng. |
| **D — Hợp đồng / JCI / nội bộ BV** | HD_, một phần cảnh báo chất lượng | Phân biệt **BHYT tự động** vs **cam kết nội bộ**. |

---

## 4. An toàn dữ liệu và phong cách trả lời

- **Không** đưa Họ tên, Số thẻ BHYT, CCCD, địa chỉ đầy đủ vào phân tích công khai; dùng **mã giả / MA_LK** đã ẩn danh.
- **Không** chế tạo **giá, %, số liệu Phụ lục** nếu không có trong hồ sơ hoặc bảng tra cứu được trích dẫn.
- Khi thiếu dữ liệu: nói rõ **thiếu gì** và **cần mở trường nào** — tốt hơn là đoán.

---

## 5. Liên kết chuyên đề (đi sâu từng nhóm)

| Nhóm | Tài liệu chuẩn hóa / lộ trình |
|------|--------------------------------|
| **DVKT** | [Chuan_hoa_kien_thuc_AI_giam_dinh_DVKT.md](./Chuan_hoa_kien_thuc_AI_giam_dinh_DVKT.md), [The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md](./The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md), [The_tri_thuc_Danh_muc_2_DVKT_dieu_kien_thanh_toan_VBHN17_AI.md](./The_tri_thuc_Danh_muc_2_DVKT_dieu_kien_thanh_toan_VBHN17_AI.md), [The_tri_thuc_kiem_soat_loi_dvkt_VBHN17_AI.md](./The_tri_thuc_kiem_soat_loi_dvkt_VBHN17_AI.md), [Huan_luyen_phien_DVKT_VBHN17_Cursor.md](./Huan_luyen_phien_DVKT_VBHN17_Cursor.md), [Bang_neo_phien_huan_luyen_dvkt_va_engine.md](./Bang_neo_phien_huan_luyen_dvkt_va_engine.md) |
| **Thuốc** | [The_tri_thuc_chi_muc_giam_dinh_thuoc_engine_AI.md](./The_tri_thuc_chi_muc_giam_dinh_thuoc_engine_AI.md), [Bang_neo_phien_huan_luyen_thuoc_va_engine.md](./Bang_neo_phien_huan_luyen_thuoc_va_engine.md) |
| **Thẻ BHYT & quyền lợi NB (hành chính)** | [Quy_tac_kiem_soat_va_giam_dinh_loi_hanh_chinh_KCB_BHYT.md](./Quy_tac_kiem_soat_va_giam_dinh_loi_hanh_chinh_KCB_BHYT.md) (**khung quy tắc**), [The_tri_thuc_kiem_soat_loi_the_BHYT_va_quyen_loi_NB_AI.md](./The_tri_thuc_kiem_soat_loi_the_BHYT_va_quyen_loi_NB_AI.md), [Huan_luyen_phien_hanh_chinh_BHYT_bat_buoc_Cursor.md](./Huan_luyen_phien_hanh_chinh_BHYT_bat_buoc_Cursor.md), [The_tri_thuc_mau_hanh_chinh_BHYT.md](./The_tri_thuc_mau_hanh_chinh_BHYT.md) |
| **Luật nền + mốc văn bản** | [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md) |
| **VTYT** (chưa có fixture audit trong repo) | [Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md](./Chuan_hoa_kien_thuc_AI_giam_dinh_VTYT.md); [Bang_neo_phien_huan_luyen_vtyt_va_engine.md](./Bang_neo_phien_huan_luyen_vtyt_va_engine.md); mục **11.6** mau_luat; [Huan_luyen_phien_VTYT_du_phong_Cursor.md](./Huan_luyen_phien_VTYT_du_phong_Cursor.md) |

---

## 6. Kiểm thử sau khi chỉnh rule

- `npm run qa:audit-fixtures`  
- `npm run qa:on-off-match`  

Chi tiết vận hành: [Quy_trinh_lam_viec_Cursor_OpenClaw_AI_giam_dinh_BHYT.md](./Quy_trinh_lam_viec_Cursor_OpenClaw_AI_giam_dinh_BHYT.md).

---

*Tài liệu này có thể mở rộng thêm ví dụ theo từng đợt huấn luyện; giữ ngắn để làm “lớp kỹ năng chung” trước khi đọc thẻ chuyên đề.*
