# Thẻ tri thức — Đối chiếu báo cáo vi phạm vs hồ sơ XML (gói 177, 04/03/2026)

**Nguồn:** `Bao_Cao_Vi_Pham_1775831407982.xlsx` (sheet `DS_Loi`) và thư mục `tai_nguyen/177 - 04032026` (177 file XML kiểm tra).

**Mục tiêu huấn luyện AI:** Phân biệt cảnh báo đúng pháp lý BHYT / đúng nghiệp vụ kế toán XML với cảnh báo hợp đồng nội bộ, JCI, hoặc artefact kỹ thuật (dương tính giả).

---

## 1. Kết quả đối chiếu cơ học XML1 (tổng tiền)

- Trên **toàn bộ 177 hồ sơ**, giá trị `T_TONGCHI_BV` **khớp** với tổng các nguồn (làm tròn float không đáng kể) khi tính bằng số học từ XML giải mã.
- Báo cáo Excel lại ghi **132 dòng** `THUOC_538` (một dòng / một `Mã LK` trong nhiều trường hợp).
- **Nguyên nhân kỹ thuật đã xử lý trong seed:** biểu thức cũ `XML1.T_BHTT + XML1.T_BNTT + ...` trong môi trường JavaScript có thể **cộng nối chuỗi** nếu trường đọc ra là string, tạo chênh lệch lớn giả; đồng thời cần **TO_NUMBER** cho từng hạng và **cộng `T_NGOAIDS`** cho khớp nội dung cảnh báo và nghiệp vụ BHXH.

**Hành vi mong đợi sau chỉnh:** `THUOC_538` chỉ bật khi thật sự lệch tiền sau chuẩn hóa số.

**Chuẩn hóa đồng bộ (10/04/2026):** Cùng một công thức cân đối `T_TONGCHI_BV` với `T_BHTT + T_BNTT + T_BNCCT + T_NGUONKHAC + T_NGOAIDS` (mọi hạng `TO_NUMBER`) được áp cho `XML_04`, `XML_107` (LUAT_DU_LIEU), `HC_242` (LUAT_HANH_CHINH), `THUOC_538` (LUAT_THUOC), và hàm `tinhChenhTongChi` trong `dong_co_giam_dinh.jsx` (lớp lọc dương tính giả / `tongChiCanBang`).

---

## 2. Quy tắc proxy JCI trên `GHI_CHU` (THUOC_537)

- QĐ 3176 **không có** trường “dị ứng” riêng; rule dùng `IS_EMPTY(XML1.GHI_CHU)` làm proxy.
- Trong gói 177, **mọi** hồ sơ có `GHI_CHU` trống → gần **100%** phát sinh cảnh báo, **không** phản ánh vi phạm Luật BHYT.

**Huấn luyện AI:** Đánh nhãn loại cảnh báo là **an toàn/JCI / quy trình nội bộ**, không gán nhãn “xuất toán BHYT”. Trong seed đã **tắt (OFF)** rule này để giảm nhiễu; bật lại chỉ khi có quy ước HIS điền thông tin dị ứng vào `GHI_CHU`.

---

## 3. Hợp đồng / JCI trên CLS (HD_10)

- Rule: thiếu `CHI_SO_XN_BT` trên XML4 — thuộc **cam kết Hợp đồng / JCI**, không phải điều kiện thanh toán BHYT trong Luật/QĐ 130 một-một.
- Báo cáo có nhiều dòng `HD_10`; để AI không học nhầm “thiếu chỉ số” = “trái BHYT”, trong `LUAT_HOP_DONG` đã **tắt (OFF)**; bật lại trong kỳ audit chất lượng/HĐ.

---

## 4. Mẫu cảnh báo thuốc cố định tên biệt dược (THUOC_311)

- Điều kiện theo **mã DM** `40.48` (Paracetamol).
- Cảnh báo cũ ghi cứng “Hapacol 650” trong khi cùng mã có thể là sản phẩm khác (ví dụ AGIMOL) → **sai ngữ nghĩa hiển thị**, dễ gây mất lòng tin người đọc.

**Chuẩn hóa:** Dùng mô tả nhóm hoạt chất + placeholder `{TEN_THUOC}` theo dòng XML2.

---

## 5. Top mã luật trong báo cáo (tham chiếu ưu tiên rà)

| Mã luật   | Ghi chú ngắn |
|-----------|----------------|
| THUOC_537 | Proxy JCI — đã OFF |
| THUOC_538 | Kế toán tổng — đã sửa công thức TO_NUMBER + T_NGOAIDS |
| THUOC_451 | Rà theo từng ca (không đổi trong lượt này) |
| HD_10     | Hợp đồng/JCI — đã OFF |
| THUOC_63, THUOC_417, … | Đối chiếu ICD + mã thuốc từng dòng XML2 |

---

## 6. Gợi ý nhãn cho tập huấn luyện

- **`dung_phap_ly_bhyt`:** Vi phạm có thể map TT/QĐ/Luật BHYT hoặc QĐ 130 cấu trúc dữ liệu bắt buộc.
- **`nghiep_vu_ke_toan_xml`:** Lệch tiền tổng/ chi tiết sau khi chuẩn hóa số.
- **`hop_dong_jci_noibo`:** Chỉ áp khi bối cảnh là HĐ BV hoặc audit JCI.
- **`canh_bao_hien_thi`:** Sai tên thuốc / nhầm template — sửa copy, không đổi kết luận ICD.

---

*Cập nhật: 10/04/2026 — đồng bộ với chỉnh sửa `du_lieu_luat_thuoc_muc8.jsx` và `luat_hop_dong_hardcoded.jsx`.*
