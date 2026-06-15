# THẺ TRI THỨC: KIỂM SOÁT LỖI DỊCH VỤ KỸ THUẬT (DVKT) THEO 17/VBHN-BYT — CHO AI KIỂM TRA BHYT

Phiên bản tài liệu: 1.0  
Ngày cập nhật: 10/04/2026

## 1. Mục đích

“Lỗi DVKT” trong kiểm tra BHYT **không** chỉ là “mã không nằm danh mục”. Theo tinh thần **17/VBHN-BYT** (và **TT 39/2024** cho nhiều điểm cấu trúc viện phí), AI cần:

- phân tầng **lỗi thanh toán / xuất toán** vs **lỗi dữ liệu XML** vs **nghiệp vụ cần hồ sơ giấy / BHXH chủ động**;
- không gom mọi cảnh báo `DVKT_*` / `CDHA_*` / `DVKT-OP-*` thành một kết luận “DV sai”;
- neo giải thích với **Điều/Khoản** đã có trong [The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md](./The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md) và chuỗi `CO_SO_PHAP_LY_DVKT` / `VBHN_17_META` trong engine khi có — **không** bịa giá, %, hoặc ô Phụ lục.

Tài liệu này là **khung kiểm soát lỗi**; chi tiết từng Điều xem bảng mục **A** trong [Huan_luyen_phien_DVKT_VBHN17_Cursor.md](./Huan_luyen_phien_DVKT_VBHN17_Cursor.md).

## 2. Định nghĩa làm việc (cho AI)

| Thuật ngữ | Ý nghĩa trong CDSS / VBHN 17 |
|-----------|------------------------------|
| **Sai phạm vi danh mục** | `MA_DICH_VU` rơi **Danh mục 3** (tạm chưa TT) hoặc nhóm **loại trừ** Luật BHYT — khác với “đủ DM nhưng sai điều kiện dòng”. |
| **Sai điều kiện dòng (Cột 3 / tương đương)** | Mã **có** trong DM1/2 nhưng **điều kiện** thanh toán theo dòng (chẩn đoán, tần suất, kèm DV…) không thỏa — engine chỉ bắt **phần đã rule hóa**. |
| **Sai tuyến / phạm vi kỹ thuật CS** | CSKCB không đủ **tuyến hoặc nhóm DV** được phép — thường gắn `MA_CSKCB`, DM nội bộ, rule `DVKT-OP-*` (CHECK nội bộ). |
| **Sai PTTT / gói phẫu thuật** | Phân loại PT/TT, ICD, thuốc tê/mê kèm gói — nhóm `DVKT_*` seed PTTT, XML3 + XML1 + XML2. |
| **Sai tiền / tỷ lệ / gộp–tách** | `DON_GIA`, `TYLE_TT`, trùng công đoạn (**Điều 4 khoản 4**), hoặc **4a–4d** (giá đã kết cấu trong ngày giường / DV khác). |
| **Sai thời điểm / một lượt KCB** | Mốc **HL TT 39** (nhiều điểm **01/01/2025**), “một lượt” (**khoản 7 Điều 4**) — không gán một mức cho cả đợt nếu hồ sơ cắt qua 31/12/2024. |
| **Lỗi dữ liệu kỹ thuật (máy, mã, thời gian)** | Ví dụ `MA_MAY`, chờ MRI sau vào viện — nhóm `CDHA_*`: **chất lượng dữ liệu** khác **sai chỉ định lâm sàng**. |
| **Kiểm tra chủ động** | Kỹ thuật mới, tranh chấp chỉ định, thiếu chứng từ — AI chỉ **gợi ý hướng tra cứu**, không thay quyết định BHXH. |

## 3. Phân loại kiểm soát (bảng tra nhanh)

| STT | Loại kiểm soát | Dữ liệu ưu tiên | Gợi ý rule / nhóm mã |
|-----|-----------------|-----------------|------------------------|
| 1 | Phạm vi DM1 / DM2 / DM3 | `XML3.MA_DICH_VU`, đối tượng XML1 | Điều 1, **Điều 4 khoản 6**; `VBHN_17_META` trong no-code |
| 2 | Điều kiện dòng Phụ lục | Cột điều kiện (thường **Cột 3**) + ICD / XML5 | Điều **3 khoản 2**; bổ sung tay khi chưa seed |
| 3 | Tuyến BV & DM nội bộ / phê duyệt | `MA_CSKCB`, bảng M05 nội bộ | **`DVKT-OP-*`**, `CHECK_INTERNAL_APPROVAL` — ca **000375** |
| 4 | Gói PTTT, ICD, thuốc kèm gói | XML3 + XML1 + XML2 | **`DVKT_2587`**, **`DVKT_2588`** — ca **000308** |
| 5 | CĐHA — thời gian, nội trú | XML1 ngày vào; XML3 ngày chỉ định | **`CDHA_164`** — ca **000502** |
| 6 | CĐHA — thiết bị / mã máy | `XML3.MA_MAY`, DM thiết bị | **`CDHA_101`** — ca **000538** |
| 7 | Trùng / gộp công đoạn | Toàn bộ XML3 cùng kỳ | **Điều 4 khoản 4**; không kết luận chỉ từ hai dòng tách nếu thiếu bảng giá |
| 8 | 4a–4d (giá gộp, khám, giường, DV đặc thù) | XML1, XML3, XML2, mô tả giá | TT **39/2024**; rule từng nhóm trong seed / nội bộ |
| 9 | Mốc hiệu lực & một lượt KCB | Ngày vào/ra, ngày y lệnh | **Điều 5**, **Điều 4 khoản 7** (TT 39) |

## 4. Nguyên tắc suy luận (tránh nhầm)

1. **Ba nhánh mã khác nhau:** `DVKT_*` (số, seed PTTT), `CDHA_*` (hardcoded), `DVKT-OP-*` (no-code) — không đồng nhất “cùng là DVKT” về cách sửa hay mức rủi ro.
2. **Một hồ sơ, nhiều lớp:** Ví dụ vừa cảnh báo **thiếu thuốc gói mổ** vừa có **`CDHA_164`** — tách giải thích theo **từng mã** và **từng XML**.
3. **“Cảnh báo” ≠ “xuất toán”:** Nhiều rule mang tính **kiểm tra / gợi ý**; mức xử lý do nghiệp vụ + BHXH.
4. **Engine ≠ cả Phụ lục:** Thiếu seed hoặc rule **OFF** có thể **im** cảnh báo — ghi nhận giới hạn, không kết luận “đúng tuyệt đối” từ im lặng.
5. **Thiếu Excel Phụ lục / HĐ KCB:** Nói rõ *cần đối chiếu tại thời điểm hồ sơ* — không điền số giả.

## 5. Prompt mẫu cho huấn luyện AI

Sau khi nạp audit JSON hoặc XML:

- *“Phân loại các cảnh báo liên quan DVKT/CĐHA trong hồ sơ này theo bảng mục 3 trong `The_tri_thuc_kiem_soat_loi_dvkt_VBHN17_AI.md`. Mỗi dòng: `ma_luat`, nhóm nhánh (`DVKT_*` / `CDHA_*` / `DVKT-OP-*`), trường XML chính, và một dòng kết luận nghiệp vụ.”*
- *“Với cảnh báo gói PTTT (`DVKT_2587`/`2588`), chỉ rõ liên kết XML3–XML1–XML2 nào được seed dùng — không nhầm với lỗi thuốc độc lập.”*
- *“Có tồn tại xung đột mốc **01/01/2025** (TT 39) với ngày trong hồ sơ không? Nếu có, liệt kê từng khoản cần tách (4a–4d, khoản 7) mà không gộp một kết luận.”*

## 6. Ca huấn luyện gắn khung này

| Ca | Trọng tâm “lỗi / kiểm soát DVKT” |
|----|-----------------------------------|
| [Ca_huan_luyen_mau_000308_DVKT_2587_2588_PTTT_goi_thuoc.md](./Ca_huan_luyen_mau_000308_DVKT_2587_2588_PTTT_goi_thuoc.md) | Gói PT, ICD O82, thuốc tê/mê — `DVKT_2587` / `DVKT_2588` |
| [Ca_huan_luyen_mau_000502_CDHA_164_MRI_noitru.md](./Ca_huan_luyen_mau_000502_CDHA_164_MRI_noitru.md) | Thời gian chờ MRI nội trú — `CDHA_164` |
| [Ca_huan_luyen_mau_000538_CDHA_101_ma_may_XQ.md](./Ca_huan_luyen_mau_000538_CDHA_101_ma_may_XQ.md) | Mã máy thiết bị — `CDHA_101` |
| [Ca_huan_luyen_mau_000375_DVKT_OP_09_danh_muc_noibo.md](./Ca_huan_luyen_mau_000375_DVKT_OP_09_danh_muc_noibo.md) | Danh mục nội bộ M05 — `DVKT-OP-09` |

Lộ trình đọc ca: [Huan_luyen_phien_DVKT_VBHN17_Cursor.md](./Huan_luyen_phien_DVKT_VBHN17_Cursor.md) mục **I**.

## 7. Tài liệu nền trong repo (đọc cùng)

- Chuẩn hóa suy luận: [Chuan_hoa_kien_thuc_AI_giam_dinh_DVKT.md](./Chuan_hoa_kien_thuc_AI_giam_dinh_DVKT.md)  
- **Danh mục 1 / 2 (chi tiết đúng tên VBHN):** [The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md](./The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md) · [The_tri_thuc_Danh_muc_2_DVKT_dieu_kien_thanh_toan_VBHN17_AI.md](./The_tri_thuc_Danh_muc_2_DVKT_dieu_kien_thanh_toan_VBHN17_AI.md)  
- Phiên đầy đủ (bảng Điều A–J): [Huan_luyen_phien_DVKT_VBHN17_Cursor.md](./Huan_luyen_phien_DVKT_VBHN17_Cursor.md)  
- Bảng neo mã ↔ engine: [Bang_neo_phien_huan_luyen_dvkt_va_engine.md](./Bang_neo_phien_huan_luyen_dvkt_va_engine.md)  
- Thẻ VBHN 17 (tri thức pháp lý): [The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md](./The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md)  
- Chuỗi mục **11.5** luật mẫu: [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md)  
- Song song cách làm với thuốc: [The_tri_thuc_kiem_soat_sai_thuoc_AI.md](./The_tri_thuc_kiem_soat_sai_thuoc_AI.md)

---

*Tài liệu này bổ sung lớp “kiểm soát lỗi” cho đợt DVKT / VBHN 17; cập nhật khi bổ sung ca mẫu hoặc thay đổi nhóm rule trong engine.*
