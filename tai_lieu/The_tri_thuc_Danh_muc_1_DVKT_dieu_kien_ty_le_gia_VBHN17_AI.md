# THẺ TRI THỨC CHI TIẾT: DANH MỤC 1 — DVKT CÓ QUY ĐỊNH CỤ THỂ ĐIỀU KIỆN, TỶ LỆ VÀ MỨC GIÁ THANH TOÁN (17/VBHN-BYT)

Phiên bản: 1.0  
Ngày: 10/04/2026  
Đối tượng: huấn luyện AI kiểm tra BHYT — **bổ sung** [The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md](./The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md) mục **4**; **không thay thế** Phụ lục Excel BYT / hợp đồng KCB.

---

## 1. Định danh pháp lý và vai trò Danh mục 1

- Trong **17/VBHN-BYT** (cơ sở **TT 35/2016/TT-BYT** và các TT sửa đổi được hợp nhất), **Khoản 2 Điều 1** phân loại: **Danh mục 1** là danh mục DVKT có quy định **điều kiện**, **tỷ lệ** thanh toán và **mức giá** thanh toán (và trong thực hành đọc bảng còn gặp cột **tham chiếu giá** hoặc **cách tính** theo giá DV khác — lấy **đúng dòng** Phụ lục).
- **Ý nghĩa kiểm tra:** Với **mỗi mã** thuộc DM1, thanh toán BHYT không chỉ hỏi “có mã không” mà phải hỏi tiếp: **điều kiện dòng** có thỏa không, **tỷ lệ** áp cho dòng đó là bao nhiêu, **giá** và **thành tiền** có bám **Phụ lục + mức hưởng thẻ + đồng chi trả** không.

**Đối chiếu nhanh với Danh mục 2:** [The_tri_thuc_Danh_muc_2_DVKT_dieu_kien_thanh_toan_VBHN17_AI.md](./The_tri_thuc_Danh_muc_2_DVKT_dieu_kien_thanh_toan_VBHN17_AI.md) — DM2 nhấn mạnh **điều kiện** thanh toán; DM1 thêm lớp **tỷ lệ + giá** theo cấu trúc Phụ lục.

---

## 2. Cấu trúc “một dòng = một gói quy tắc” trong Phụ lục DM1

> **Nguyên tắc:** Mỗi **dòng** Danh mục 1 trong file Excel đính kèm văn bản là một **đơn vị tra cứu**: mã DV, tên, **điều kiện thanh toán** (thường gom ở **cột điều kiện** — trong tài liệu nền repo thường gọi gọn là **Cột 3**), **tỷ lệ / giá** (ví dụ **Cột 4** trong mẫu mô tả tại thẻ tổng) — **số thứ tự cột phải lấy đúng file Phụ lục** bạn đang mở, không đoán giữa các phiên bản export.

| Thành phần dòng (khái niệm) | AI cần làm gì |
|-----------------------------|----------------|
| **Mã DV** | Khớp `MA_DICH_VU` (XML3, nhóm M05) với **đúng dòng** DM1 — cùng mã có thể có biến thể theo thời điểm HL; hỏi **ngày chỉ định / ra viện**. |
| **Điều kiện thanh toán (cột điều kiện)** | Đọc **nguyên văn** điều kiện: ICD, tần suất, kèm DV khác, đối tượng, tuyến, chuyên khoa… — đây là chỗ hay **lệch** giữa “có mã” và “được TT”. |
| **Tỷ lệ thanh toán** | Liên hệ **Điều 2** Thông tư; trên XML: `TYLE_TT`, cách tính `THANH_TIEN_BH` — đối chiếu **cột Phụ lục** và **đối tượng thẻ** (XML1). |
| **Mức giá thanh toán** | Liên hệ giá **phê duyệt** tại CS (**Điều 3**), **Điều 4a** (phần đã/không kết cấu trong giá DV khác / ngày giường). **Không** bịa giá nếu không có trong hồ sơ hoặc bảng giá đơn vị. |
| **Ghi chú / tham chiếu giá DV khác** | Một số dòng quy định tính theo **giá** hoặc **công thức** gắn DV khác — cần đọc **cả** dòng và mô tả gói trong HĐ KCB. |

---

## 3. Ánh xạ sang các Điều then chốt trong 17/VBHN (tư duy lớp)

| Điều / cụm | Vì sao liên quan trực tiếp DM1 |
|------------|--------------------------------|
| **Điều 2** — Tỷ lệ thanh toán | DM1 “có tỷ lệ” — trục **TYLE_TT** / thành tiền. |
| **Điều 3** — Điều kiện thanh toán (khoản 1 + **khoản 2** cột điều kiện) | DM1 vừa có **điều kiện dòng** vừa có **giá/tỷ lệ** — khoản 2 nhắc **Cột 3** (điều kiện) cho DM1 và DM2. |
| **Điều 4 khoản 2–4** | Công thức TT; **không đếm đôi** công đoạn đã gộp — kiểm tra khi cùng kỳ có nhiều dòng XML3. |
| **Điều 4a–4d** | Tách / gộp giá (4a), khám (4b), ngày giường (4c), DV đặc thù (4d) — nhiều dòng DM1 là DV “đặc thù” hoặc gắn ngày giường / khám. |

---

## 4. Dữ liệu XML ưu tiên khi phân tích một dòng DM1

| Nguồn | Trường / nội dung |
|-------|-------------------|
| **XML3** | `MA_DICH_VU`, `TEN_DICH_VU`, `DON_GIA`, `TYLE_TT`, `THANH_TIEN_BH`, `SO_LUONG`, ngày chỉ định / giờ (nếu có), `MA_BENH` (ICD gợi ý chỉ định), `MA_KHOA`, `NGUOI_THUC_HIEN`… |
| **XML1** | Loại KCB, ngày vào/ra, `MA_BENH_CHINH` / kèm, đối tượng thẻ, `MA_CSKCB`. |
| **XML2 / XML5 / XML6** | Khi điều kiện DM1 kéo theo thuốc/VT, PTTT, diễn biến — không tách rời. |

---

## 5. Checklist AI (trước khi kết luận “đúng thanh toán theo DM1”)

1. Đã xác định **thời điểm hiệu lực** (đặc biệt sau **31/12/2024** và các điểm **TT 39/2024** có HL **01/01/2025**)?
2. Đã đối chiếu **điều kiện cột điều kiện** của **đúng dòng** DM1 — không chỉ khớp `MA_DICH_VU`?
3. Đã kiểm **tỷ lệ** trên XML với **cột tỷ lệ** Phụ lục + **mức hưởng** thẻ?
4. Đã kiểm **giá** với **giá phê duyệt** tại CS và **4a** (phần đã gộp trong giá DV/giường khác)?
5. Đã xem **trùng / gộp công đoạn** (Điều 4 khoản 4) khi có nhiều DV cùng kỳ?
6. Ghi nhận giới hạn: **engine** chỉ rule hóa **một phần** dòng DM1 — phần còn lại là **kiểm tra viên + tài liệu đơn vị**.

---

## 6. Prompt mẫu (huấn luyện)

- *“Với `MA_DICH_VU` = … trên XML3, giả định thuộc **Danh mục 1**: liệt kê **ba lớp** cần kiểm tra — (1) điều kiện dòng Phụ lục, (2) tỷ lệ, (3) giá và gộp/tách 4a — và nêu trường XML dùng cho mỗi lớp.”*
- *“Nếu chỉ có mã khớp DM1 nhưng **thiếu** ICD / tần suất mà Phụ lục yêu cầu — kết luận kiểm soát nào (điều kiện chưa đủ) mà không bịa số?”*

---

## 7. Liên kết

- **Phác đồ CDSS theo ICD-10** (chuyên môn lâm sàng, khác lớp thanh toán DVKT): [The_tri_thuc_phac_do_CDSS_chuyen_mon_ICD10_AI.md](./The_tri_thuc_phac_do_CDSS_chuyen_mon_ICD10_AI.md)
- Thẻ tổng DVKT: [The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md](./The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md)  
- **Ví dụ quy định đơn vị CLVT (2025) + hội chẩn / biên bản:** [The_tri_thuc_quy_dinh_CLVT_BVPCST_2025_giam_dinh_AI.md](./The_tri_thuc_quy_dinh_CLVT_BVPCST_2025_giam_dinh_AI.md)  
- **Danh mục 2** (chỉ điều kiện): [The_tri_thuc_Danh_muc_2_DVKT_dieu_kien_thanh_toan_VBHN17_AI.md](./The_tri_thuc_Danh_muc_2_DVKT_dieu_kien_thanh_toan_VBHN17_AI.md)  
- Chuỗi luật mẫu mục **11.5**: [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md)  
- Kiểm soát lỗi (phân loại cảnh báo): [The_tri_thuc_kiem_soat_loi_dvkt_VBHN17_AI.md](./The_tri_thuc_kiem_soat_loi_dvkt_VBHN17_AI.md)

---

*Tài liệu này cố định **tư duy chi tiết DM1**; mọi **số liệu** cụ thể lấy từ **Phụ lục đính kèm VBHN** và **hợp đồng KCB** tại thời điểm hồ sơ.*
