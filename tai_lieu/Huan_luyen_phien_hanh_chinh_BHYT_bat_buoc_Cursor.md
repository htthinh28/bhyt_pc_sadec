# Phiên huấn luyện — Quy định hành chính bắt buộc trong KCB BHYT (Cursor)

**Mục phiên:** AI (và người đào tạo) nắm **tầng hành chính–pháp lý** (thẻ BHYT, đối tượng, mức hưởng, loại KCB, cơ sở KCB, mốc thời gian, tổng chi) trước khi đi sâu lâm sàng/thuốc/DVKT; biết **neo** vào XML1/QĐ 3176 và nhóm luật **HC_** trong repo.

**Bổ sung (phiên mở rộng):** khung **4 tầng + 5 bước kiểm tra** — [Quy_tac_kiem_soat_va_giam_dinh_loi_hanh_chinh_KCB_BHYT.md](./Quy_tac_kiem_soat_va_giam_dinh_loi_hanh_chinh_KCB_BHYT.md); thẻ kiểm soát lỗi tập trung — [The_tri_thuc_kiem_soat_loi_the_BHYT_va_quyen_loi_NB_AI.md](./The_tri_thuc_kiem_soat_loi_the_BHYT_va_quyen_loi_NB_AI.md).

**Căn cứ chung:** Luật BHYT (hiện hành), hướng dẫn thi hành và đặc tả **XML130** — trong repo: **QĐ 3176/QĐ-BYT** + **QĐ 130** (bảng chỉ tiêu), không thay bằng “truyền miệng” hoặc form nội bộ cũ.

---

## 1. Neo dữ liệu (sự thật trong mã)

### 1.1. Cột XML1 (bảng tổng hợp đợt KCB)

Danh mục cột chuẩn: `ma_nguon/quy_tac/quyluat_cautrucdulieu/xml1.jsx` — `DANH_SACH_COT_XML1`.

AI khi giải thích “bắt buộc” cần phân biệt:

- **Bắt buộc theo đặc tả XML / kiểm tra cấu trúc** (cổng BHXH / kiểm tra file): xem `ma_nguon/tien_ich/kiem_tra_xml.jsx` — `TRUONG_BAT_BUOC_BO_SUNG` cho `XML1` (ví dụ `MA_LK`, `MA_BN`, `HO_TEN`, `NGAY_SINH`, `GIOI_TINH`, `MA_THE_BHYT`, `MA_DOITUONG_KCB`, `MA_BENH_CHINH`, `NGAY_VAO`, `NGAY_RA`, `MA_LOAI_KCB`, `MA_CSKCB`, `T_TONGCHI_BV`, `T_TONGCHI_BH`, …).
- **Bắt buộc theo nghiệp vụ BHYT** (mức hưởng, đối tượng, không thu sai cùng chi trả): thường được diễn giải trong luật/hướng dẫn và được **mô hình hóa** bằng các rule **HC_** trong `ma_nguon/tien_ich/du_lieu_luat_hanh_chinh_muc2.jsx` (kèm `luat_hanh_chinh_hardcoded.jsx`).

### 1.2. Nhóm luật hành chính (ví dụ neo)

| Mã (ví dụ) | Ý nghĩa ngắn (đọc thêm trong seed) |
|------------|-------------------------------------|
| **HC_06** … | Chi phí thấp / ngưỡng LCS — ràng buộc **thu đúng** phần BN (liên quan mức hưởng) |
| **HC_07**, **HC_08**, **HC_11** | KCB **tuyến cơ sở / PKĐK khu vực / quân dân y** — cảnh báo **không thu cùng chi trả** sai (tham chiếu văn bản trong `CANH_BAO` từng dòng) |
| **HC_12**, **HC_13** | **Trẻ sơ sinh / thẻ TE** — mức hưởng 100% khi đủ điều kiện |

*Lưu ý:* Tên mã trong seed có dạng `HC_01` (gạch dưới). Map ON/OFF trong app chuẩn hóa tương đương `HC-01` — đừng cứng nhắc một kiểu khi đọc cấu hình.

---

## 2. Khung kiến thức AI phải thuộc (hành chính BHYT)

### 2.1. Thẻ và đối tượng (XML1)

- **Mã thẻ BHYT** (`MA_THE_BHYT`): cấu trúc theo quy định hiện hành; nhận biết nhóm **TE**, **HN**, v.v. để gắn với **mức hưởng** và quy tắc ưu tiên (không suy diễn “tự đặt” mã).
- **Đối tượng KCB** (`MA_DOITUONG_KCB`), **mức hưởng** (trên từng dòng chi tiết và/hoặc chỉ tiêu tổng hợp tùy bảng) — phải **khớp** chế độ và văn bản thanh toán.
- **Cơ sở đăng ký ban đầu / nơi đăng ký** (khi có trên hồ sơ): không nhầm với **MA_CSKCB** nơi điều trị.

### 2.2. Loại hình KCB (`MA_LOAI_KCB`)

- Phân biệt **ngoại trú / nội trú / cấp cứu** (và các mã quy định trong đặc tả) vì ảnh hưởng **tuyến, giá, đơn thuốc, thời hạn** (phần đơn thuốc gắn TT 26 là **luồng khác** nhưng cùng hồ sơ XML).

### 2.3. Thời gian và mốc

- **Ngày vào / ngày ra** (và các mốc nội trú nếu có): logic **nằm trong** khoảng điều trị; chỉ định thuốc/DVKT **ngoài** khoảng đó là cờ chất lượng hồ sơ hoặc sai sót (rule engine có luật thời gian — không gộp vào “hành chính” một cách mơ hồ).

### 2.4. Tổng chi và phân bổ nguồn (XML1)

- **T_TONGCHI_BV**, **T_BHTT**, **T_BNTT**, **T_BNCCT**, **T_NGUONKHAC** — AI khi “đối chiếu kế toán” phải **theo đúng** định nghĩa chỉ tiêu trong QĐ 3176, không dùng thuật ngữ “tổng viện phí” kiểu nội bộ nếu không map được sang cột XML.

### 2.5. Pháp lý tổng quát (ôn nhanh)

- **Luật BHYT** — phạm vi thanh toán, điều kiện **không** thanh toán, trách nhiệm kê khai đúng (xem thẻ: [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md)).
- Văn bản **Điều 22** / hướng dẫn **mức hưởng** được **trích trong cảnh báo** từng rule HC (đọc `CANH_BAO` trong seed, không tự bịa số điều).

---

## 3. Việc làm trong Cursor (20–35 phút)

1. Mở `du_lieu_luat_hanh_chinh_muc2.jsx`, lọc các dòng `MA_LUAT` bắt đầu `HC_`, đọc **5–7 dòng** có `TRANG_THAI: "ON"`.
2. Mở `kiem_tra_xml.jsx`, đối chiếu `TRUONG_BAT_BUOC_BO_SUNG.XML1` với một dòng XML1 mẫu trong `test_xml/` (nếu có).
3. Ghi **3 câu** trả lời ngắn (không PII):
   - Khi nào chỉ cần XML1 là đủ để **bác** một cảnh báo “sai hành chính”?
   - Khác biệt giữa **lỗi cấu trúc file** và **lỗi nghiệp vụ BHYT** trong ngữ cảnh app này?
   - Một rule HC ghi “100%” — AI cần kiểm tra thêm gì trước khi khẳng định “vi phạm”?

---

## 4. Ví dụ huấn luyện — tình huống giả (không PII)

1. **Thẻ TE nhưng có BNCCT > 0 trên tổng hợp**  
   Gợi ý neo: `HC_13` (và các rule mức hưởng liên quan). AI **không** kết luận chỉ từ một dòng tổng mà không xem **đối tượng**, **từng dòng chi tiết**, và **ngoại lệ** (ví dụ một phần chi ngoài phạm vi BHYT).

2. **MA_LOAI_KCB = ngoại trú nhưng có chỉ định giống nội trú**  
   Đây có thể là **lỗi nhập liệu** hoặc **case hợp lệ** (khám ngoại trú nhưng có tách đợt) — AI **không** đổi MA_LOAI_KCB bằng suy đoán; nêu **cần đối chiếu** chứng từ và luật động khác (HC vs CLN).

3. **Chênh lệch T_TONGCHI_BV và tổng nguồn**  
   Neo kế toán XML1 và rule tổng hợp (ví dụ trong nhóm dữ liệu Mục 1 / seed XML_*). Phân biệt **làm tròn** với **sai số nghiệp vụ**.

---

## 5. Sai lầm thường gặp (AI cần tránh)

- Nhầm **mã bệnh ICD** với **đối tượng BHYT** hoặc **mức hưởng**.
- Dùng khái niệm **“đúng tuyến”** mà không neo **MA_LOAI_KCB**, **giấy chuyển**, **CSKCB** theo đúng trường XML.
- **Khẳng định xuất toán** chỉ vì một chỉ tiêu trống — trong thực tế có **cảnh báo** vs **chặn cứng**; trong app phụ thuộc pipeline và ON/OFF rule.

---

## 6. Liên kết nội bộ (đọc thêm)

| Tài liệu / vị trí | Vai trò |
|-------------------|--------|
| [The_tri_thuc_kiem_soat_loi_the_BHYT_va_quyen_loi_NB_AI.md](./The_tri_thuc_kiem_soat_loi_the_BHYT_va_quyen_loi_NB_AI.md) | **Kiểm soát lỗi** thẻ & quyền lợi — bảng phân loại + prompt |
| [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md) | Nền luật |
| `ma_nguon/quy_tac/quyluat_cautrucdulieu/xml1.jsx` | Cột XML1 |
| `ma_nguon/tien_ich/kiem_tra_xml.jsx` | Trường bắt buộc bổ sung theo cấu trúc |
| `ma_nguon/tien_ich/du_lieu_luat_hanh_chinh_muc2.jsx` | Seed HC_* |
| Màn **Quản lý quy tắc ON/OFF** — nhóm Hành chính | Bật/tắt / ghi chú vận hành |

---

## 7. Phiên tiếp theo (gợi ý)

- Ghép **một ca XML thật** (đã ẩn PII) chỉ đọc XML1 + map HC: trả lời “cảnh báo nào có thể kích, cái nào cần dữ liệu thêm”.
- Hoặc đối chiếu **TT 26/2025** (đơn thuốc điện tử) với **MA_LOAI_KCB** + trường tái khám trên XML1 — nối với phiên thuốc.

---

*Tài liệu sinh để tiếp nối huấn luyện AI trong workspace CDSS BHYT; cập nhật khi thay đổi seed HC hoặc đặc tả XML.*
