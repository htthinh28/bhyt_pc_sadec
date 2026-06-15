# QUY TẮC KIỂM SOÁT VÀ KIỂM TRA CÁC LỖI HÀNH CHÍNH TRONG KHÁM CHỮA BỆNH BHYT

Phiên bản: 1.0  
Ngày: 10/04/2026  
Phạm vi: **KCB BHYT** (hồ sơ điện tử XML130 / luồng CDSS trong repo) — **bổ sung** cho huấn luyện AI và vận hành; **không** thay thế văn bản pháp lý, QĐ BYT/BHXH hoặc hợp đồng KCB.

---

## 1. Mục tiêu

Thiết lập **một khung thống nhất** để:

1. **Kiểm soát** (phát hiện sớm): phân loại lỗi hành chính theo **tầng kiểm tra** và **nguồn rule** trong hệ thống.  
2. **Kiểm tra** (kết luận có kiểm soát): phân biệt **lỗi cấu trúc / dữ liệu**, **lỗi quyền lợi & thu chi**, **lỗi phạm vi KCB**; tránh gộp một cụm “sai hành chính” mơ hồ.

---

## 2. Bốn tầng kiểm tra (trong repo)

| Tầng | Nội dung | Vị trí mã / tài liệu |
|------|----------|---------------------|
| **A. Cấu trúc & trường bắt buộc** | Đủ cột, kiểu dữ liệu, ràng buộc liên trường theo **QĐ 3176 + QĐ 130**; bổ sung trường bắt buộc tối thiểu (XML1…XML6). | `ma_nguon/tien_ich/kiem_tra_xml.jsx` (`TRUONG_BAT_BUOC_BO_SUNG`, `CAU_TRUC_DU_LIEU`) |
| **B. Hành chính “cứng” trên XML1** | Thẻ hết hạn, KSK/ngoài phạm vi quỹ (gợi ý Điều 23), sơ sinh–mã mẹ, giới tính chuẩn 130. | `ma_nguon/quy_tac/luat_hanh_chinh.jsx` — `KIEM_TRA_LUAT_HANH_CHINH` |
| **C. Nghiệp vụ BHYT — seed `HC_*`** | Đối tượng, tuyến CS, mức hưởng, đồng chi trả, mã Z/XN, v.v.; bật/tắt **ON/OFF** từng dòng. | `ma_nguon/tien_ich/du_lieu_luat_hanh_chinh_muc2.jsx` (nguồn Excel: `DuLieu_LUAT_HANH_CHINH (7).xlsx` trong pipeline sinh seed) |
| **D. Luật ghép / hợp đồng / JCI (HD_*, XML_*, …)** | Không thuộc hết Mục 2 nhưng cùng lớp “hành chính–hồ sơ” trên toàn hồ sơ. | `dong_co_giam_dinh.jsx`, các seed Mục khác — tra cứu theo `ma_luat` trong audit |

**Nguyên tắc thứ tự khi giải thích:** **A → B → C → D** (trừ khi lỗi A đã làm sai toàn bộ định danh — xử lý A trước).

---

## 3. Phân loại lỗi hành chính (ma trận tra nhanh)

| Mã nhóm | Ví dụ hiện tượng | Tầng | Gợi ý mã / nơi tra |
|---------|------------------|------|---------------------|
| **Hồ sơ / định danh** | Thiếu `MA_THE_BHYT`, sai `MA_LK` mẹ–con | A, B | `kiem_tra_xml`, `luat_hanh_chinh` |
| **Thời gian thẻ** | Vào viện sau `GT_THE_DEN` | B | `luat_hanh_chinh` |
| **Đối tượng & thu chi** | Thu BNCCT khi đủ điều kiện 100% | C | `HC_06`–`HC_13`, … |
| **Tuyến / hình thức CS** | PKĐK khu vực, quân dân y, tuyến cơ sở | C | `HC_07`, `HC_08`, `HC_11`, … |
| **Phạm vi không TT quỹ** | Khám sức khỏe / theo yêu cầu (từ khóa) | B | `luat_hanh_chinh` Điều 23 |
| **Cấu trúc file** | Thiếu trường bắt buộc XML1 | A | `XML1-REQ-*`, `kiem_tra_xml` |

*Chi tiết từng `HC_*`: đọc cột `CANH_BAO`, `DIEU_KIEN`, `TRANG_THAI` trong seed — không tự thêm Điều luật nếu không có trong cảnh báo.*

---

## 4. Quy trình kiểm tra (5 bước)

1. **Xác thực file:** Parser XML130, có lỗi cấu trúc nghiêm trọng → ghi nhận tầng **A** trước.  
2. **Đọc XML1:** Thẻ, hạn, `MA_DOITUONG_KCB`, `MA_LOAI_KCB`, `MA_CSKCB`, mốc `NGAY_VAO` / `NGAY_RA`, các chỉ tiêu tổng chi.  
3. **Áp tầng B:** Chạy / đọc kết quả rule từ `KIEM_TRA_LUAT_HANH_CHINH` (nếu có trong pipeline kiểm tra).  
4. **Áp tầng C:** Với mỗi cảnh báo `HC_*`, đối chiếu **điều kiện seed** với dữ liệu thật; kiểm tra rule **OFF** (không có nghĩa hồ sơ “sạch”).  
5. **Tổng hợp kết luận:** Tách **blocking** vs **cảnh báo**; nêu **chứng từ cần bổ sung** (giấy chuyển tuyến, miễn CCT, v.v.) khi engine chỉ gợi ý.

---

## 5. Kiểm soát cấu hình (vận hành)

- **Bật/tắt rule:** Module quản lý quy tắc ON/OFF trong ứng dụng — nhóm **Hành chính**; đồng bộ với `TRANG_THAI` trong seed.  
- **Đổi điều kiện / thêm `HC_*`:** Sửa nguồn **Excel** (nếu quy trình đơn vị dùng) → tái sinh seed → chạy **QA** (mục 6).  
- **Không** chỉnh tay seed trong repo trừ khi có quy trình review (ghi rõ trong commit / ghi chú seed).

---

## 6. Kiểm thử sau khi chỉnh quy tắc hành chính

```text
npm run qa:audit-fixtures
npm run qa:on-off-match
```

---

## 7. Tài liệu huấn luyện AI (đọc cùng)

| Tài liệu | Vai trò |
|----------|---------|
| [The_tri_thuc_kiem_soat_loi_the_BHYT_va_quyen_loi_NB_AI.md](./The_tri_thuc_kiem_soat_loi_the_BHYT_va_quyen_loi_NB_AI.md) | Phân loại lỗi thẻ & quyền lợi |
| [Huan_luyen_phien_hanh_chinh_BHYT_bat_buoc_Cursor.md](./Huan_luyen_phien_hanh_chinh_BHYT_bat_buoc_Cursor.md) | Phiên neo XML1 + HC |
| [The_tri_thuc_mau_hanh_chinh_BHYT.md](./The_tri_thuc_mau_hanh_chinh_BHYT.md) | Quy trình hành chính tổng quan |
| [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md) | Nền luật |

---

## 8. Phân biệt “kiểm soát” và “kiểm tra” (trong ngữ cảnh CDSS)

| Thuật ngữ | Ý nghĩa gọn |
|-----------|------------|
| **Kiểm soát** | Hệ thống / quy tắc **phát hiện** theo điều kiện đã cài — có thể false positive. |
| **Kiểm tra** | Người có năng lực nghiệp vụ (hoặc AI **có kiểm chứng**) **kết luận** sau khi đối chiếu quy định + chứng từ; có thể **bác** cảnh báo nếu đủ căn cứ. |

---

*Tài liệu này cố định **khung quy tắc**; mọi thay đổi seed hoặc luật gộp phải cập nhật phiên bản và chạy QA.*
