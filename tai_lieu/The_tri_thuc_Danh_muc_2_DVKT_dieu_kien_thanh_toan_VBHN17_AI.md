# THẺ TRI THỨC CHI TIẾT: DANH MỤC 2 — DVKT CÓ QUY ĐỊNH CỤ THỂ ĐIỀU KIỆN THANH TOÁN (17/VBHN-BYT)

Phiên bản: 1.0  
Ngày: 10/04/2026  
Đối tượng: huấn luyện AI kiểm tra BHYT — **bổ sung** [The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md](./The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md) mục **4**; **không thay thế** Phụ lục Excel BYT / hợp đồng KCB.

---

## 1. Định danh pháp lý và vai trò Danh mục 2

- Trong **17/VBHN-BYT** (**Khoản 2 Điều 1**), **Danh mục 2** là danh mục DVKT có quy định **cụ thể điều kiện thanh toán** (trọng tâm là **điều kiện** được mô tả theo **từng dòng** trong Phụ lục).
- **Ý nghĩa kiểm tra:** Lỗi AI thường gặp là **“thấy `MA_DICH_VU` trùng mã trong DM2 → cho là đủ điều kiện TT”**. Đúng ra: mã chỉ là **điều kiện cần**; **điều kiện đủ** nằm ở **nội dung điều kiện dòng** (và các lớp **Điều 3 khoản 1**: phạm vi CS, QTDH, giá phê duyệt — khi tranh chấp).

**Đối chiếu nhanh với Danh mục 1:** [The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md](./The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md) — DM1 thêm **tỷ lệ + mức giá** theo cấu trúc Phụ lục; DM2 nhấn mạnh **điều kiện** nhưng **không** được hiểu là “không có ràng buộc tiền” — vẫn phải thỏa **Điều 2–4** khi đã TT.

---

## 2. Cấu trúc “một dòng = một bộ điều kiện” trong Phụ lục DM2

> **Nguyên tắc:** Mỗi **dòng** Danh mục 2 là một **gói điều kiện** gắn với **mã DV**. Cột **điều kiện thanh toán** (trong tài liệu nền repo thường gọi gọn **Cột 3**) là nơi ghi **điều kiện cụ thể**: chẩn đoán, đối tượng bệnh nhân, tần suất trong chu kỳ điều trị, phải kèm DV khác, giới hạn tuyến/chuyên môn, v.v. — **mở đúng file Phụ lục**; không suy diễn cột nếu khác bản export.

| Thành phần dòng (khái niệm) | AI cần làm gì |
|-----------------------------|----------------|
| **Mã DV** | Khớp `MA_DICH_VU` với dòng DM2; kiểm **ngày** áp dụng (HL TT sửa đổi / VBHN). |
| **Điều kiện thanh toán (trọng tâm DM2)** | **Đọc toàn bộ** điều kiện: tách thành các **tiểu kiện** có thể kiểm trên XML (ICD, số lần, khoa, loại KCB) vs cần **bệnh án / QTDH / chủ động BHXH**. |
| **Liên kết Điều 3** | (a) Trong phạm vi DV được phê duyệt tại CS; (b) QTDH; (c) Giá phê duyệt — DM2 vẫn chịu **khung** này. |
| **Không nhầm với DM1** | DM2 không có cùng “nhãn” **tỷ lệ + giá** như DM1 trong bảng tổng quan — nhưng trên hồ sơ thực tế vẫn có **`DON_GIA` / `TYLE_TT`**; kiểm tra **không mâu thuẫn** Điều 2–4 và Phụ lục **DM1** nếu cùng mã được phân loại lại theo thời điểm (hiếm — cần đối chiếu văn bản). |

---

## 3. Ánh xạ sang các Điều then chốt (nhấn mạnh điều kiện)

| Điều / cụm | Vì sao DM2 “dính” mạnh |
|------------|-------------------------|
| **Điều 3 khoản 2** | Quy định rõ **Danh mục 1 và 2** có thêm điều kiện **Cột 3** — đây là **trục chính** của DM2. |
| **Điều 1 điểm a** | Điều kiện **tuyến / phạm vi kỹ thuật** CS — thường đan vào **điều kiện dòng** hoặc kiểm riêng. |
| **Điều 4 khoản 4** | Dù điều kiện dòng thỏa, vẫn hỏi: có **trùng công đoạn** / **gộp giá** không. |
| **Điều 4d** | Nhiều DV trong DM2 (hoặc được đọc cùng nhóm đặc thù) là XN/CĐHA/thủ thuật — chỗ mở rộng rule `CDHA_*` / điều kiện tần suất. |

---

## 4. Dữ liệu XML ưu tiên khi phân tích một dòng DM2

| Nguồn | Trường / nội dung |
|-------|-------------------|
| **XML3** | `MA_DICH_VU`, ngày/giờ chỉ định, `MA_BENH` (ICD), `SO_LUONG` (lần / ngày — tùy DV), `MA_KHOA`, `TEN_DICH_VU` (gợi ý đối chiếu tên–mã). |
| **XML1** | ICD chính/kèm, loại KCB, ngày vào/ra — phục vụ điều kiện “trong đợt”, “ngoại trú”, v.v. |
| **XML5** | Diễn biến, chỉ định — khi điều kiện DM2 đòi **hợp lý chuyên môn** hoặc chuỗi chỉ định. |

---

## 5. Checklist AI (trước khi kết luận “đủ điều kiện TT theo DM2”)

1. Đã **phân tách** điều kiện dòng thành các mệnh đề có thể **kiểm chứng** bằng dữ liệu điện tử vs cần **hồ sơ giấy**?
2. Đã đối chiếu **ICD** (XML1/XML3) với phạm vi điều kiện (nếu Phụ lục yêu cầu)?
3. Đã kiểm **tần suất / số lần / trong cùng đợt** nếu điều kiện có giới hạn?
4. Đã kiểm **Điều 3 khoản 1** (CS, QTDH, giá) ở mức **khung** — không bỏ qua vì “chỉ là DM2”?
5. Đã kiểm **trùng / gộp** (Điều 4 khoản 4) và **4a** nếu cùng kỳ có nhiều dòng tiền?
6. Ghi nhận: **thiếu rule seed** cho đúng điều kiện dòng → hệ thống có thể **không cảnh báo** — không đồng nghĩa hồ sơ **chắc chắn đạt**.

---

## 6. Sai lầm điển hình khi huấn luyện AI (tránh)

| Sai lầm | Chỉnh lại |
|---------|-----------|
| Coi **có mã trong DM2** = đủ TT | Phải đọc **điều kiện dòng** + khung Điều 3. |
| Gộp **DM2** với **DM1** khi giải thích tỷ lệ/giá | Phân biệt **cấu trúc Phụ lục**; nếu cùng mã xuất hiện ở hai nhánh theo thời điểm — **đối chiếu văn bản + ngày hồ sơ**. |
| Bỏ qua **mốc HL TT 39/2024** | Điều kiện “một lượt”, khám, ngày giường, 4a–4d có thể làm **thay đổi** cách đọc cùng một dòng DM2 theo ngày chỉ định. |

---

## 7. Prompt mẫu (huấn luyện)

- *“Giả định `MA_DICH_VU` thuộc **Danh mục 2**: không nêu kết luận TT; hãy liệt kê **các mệnh đề điều kiện** cần kiểm từ Phụ lục (placeholder: …) và map sang **trường XML** tương ứng.”*
- *“So sánh **hai** trường hợp: (A) vi phạm **điều kiện dòng** DM2; (B) đủ điều kiện dòng nhưng vi phạm **Điều 4 khoản 4** (trùng gộp) — cách phân biệt trong giải thích nghiệp vụ.”*

---

## 8. Liên kết

- Thẻ tổng DVKT: [The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md](./The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md)  
- **Danh mục 1** (điều kiện + tỷ lệ + giá): [The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md](./The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md)  
- Phiên huấn luyện (bảng Điều): [Huan_luyen_phien_DVKT_VBHN17_Cursor.md](./Huan_luyen_phien_DVKT_VBHN17_Cursor.md) mục **B**  
- Kiểm soát lỗi: [The_tri_thuc_kiem_soat_loi_dvkt_VBHN17_AI.md](./The_tri_thuc_kiem_soat_loi_dvkt_VBHN17_AI.md)

---

*Tài liệu này cố định **tư duy chi tiết DM2**; nội dung **điều kiện từng dòng** lấy từ **Phụ lục** và **hướng dẫn tại đơn vị**, không chế tạo trong thẻ.*
