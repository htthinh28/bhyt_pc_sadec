# THẺ TRI THỨC: KIỂM SOÁT LỖI THẺ BHYT VÀ QUYỀN LỢI NGƯỜI BỆNH — CHO AI KIỂM TRA

Phiên bản: 1.0  
Ngày: 10/04/2026  

**Khung tổng (4 tầng kiểm tra + quy trình kiểm tra):** [Quy_tac_kiem_soat_va_giam_dinh_loi_hanh_chinh_KCB_BHYT.md](./Quy_tac_kiem_soat_va_giam_dinh_loi_hanh_chinh_KCB_BHYT.md).

## 1. Mục đích

“Lỗi liên quan thẻ BHYT và quyền lợi người bệnh” **không** gói gọn trong một mã rule. AI cần:

- phân tầng **lỗi dữ liệu thẻ / hạn thẻ** vs **lỗi đối tượng & mức hưởng** vs **lỗi thu đồng chi trả / nguồn chi** vs **lỗi phạm vi KCB không thuộc quỹ** (ví dụ Điều 23 Luật BHYT);
- neo **XML1** (và chỉ tiêu tổng hợp) trước khi kết luận “sai quyền lợi” từ một dòng XML2/XML3;
- **không** nhầm **ICD / chẩn đoán** với **nhóm đối tượng thẻ** hoặc **mức hưởng**;
- dùng cảnh báo engine **`HC_*`**, **`XML1-REQ-*`**, và luồng **`luat_hanh_chinh.jsx`** — không bịa **Điều khoản** hay **%** ngoài hồ sơ / seed.

Tài liệu nền dài hơn: [The_tri_thuc_mau_hanh_chinh_BHYT.md](./The_tri_thuc_mau_hanh_chinh_BHYT.md), [Huan_luyen_phien_hanh_chinh_BHYT_bat_buoc_Cursor.md](./Huan_luyen_phien_hanh_chinh_BHYT_bat_buoc_Cursor.md). Luật tổng quát: [The_tri_thuc_mau_luat_BHYT_2008_2025.md](./The_tri_thuc_mau_luat_BHYT_2008_2025.md).

---

## 2. Định nghĩa làm việc (cho AI)

| Thuật ngữ | Ý nghĩa trong CDSS / kiểm tra |
|-----------|----------------------------------|
| **Thẻ BHYT** | Chuỗi mã trên thẻ — trường **`MA_THE_BHYT`** (XML1); kèm **`GT_THE_TU`**, **`GT_THE_DEN`** (hạn hiệu lực). |
| **Hết hạn thẻ** | So sánh **ngày vào / ngày khám** với **`GT_THE_DEN`** — logic ví dụ trong `luat_hanh_chinh.jsx` (cảnh báo Critical nếu vào sau hạn). |
| **Đối tượng KCB** | **`MA_DOITUONG_KCB`** — khác với ICD; ảnh hưởng cách đọc mức hưởng và luật HC. |
| **Mức hưởng / quyền lợi** | Theo Luật BHYT (thường gợi ý **Điều 22** trong text rule `HC_*`); trên hồ sơ: phối hợp **XML1** + dòng chi tiết + chỉ tiêu tổng (`T_BHTT`, `T_BNTT`, `T_BNCCT`, …). |
| **Đồng chi trả (cùng chi trả)** | Phần người bệnh đóng theo mức hưởng — nhóm rule **`HC_06`–`HC_13`**… (đọc từng dòng seed); không đồng nhất với “BN tự trả toàn bộ”. |
| **KSK / yêu cầu / ngoài phạm vi quỹ** | Từ khóa trong **`LY_DO_VV`**, **`CHAN_DOAN_VAO`** — `luat_hanh_chinh.jsx` (Điều 23). |
| **Sơ sinh – mã mẹ** | **`MA_LK_ME`**, **`MA_LK`** — trùng sai là lỗi định danh hồ sơ (cùng file). |

---

## 3. Phân loại kiểm soát (bảng tra nhanh)

| STT | Loại lỗi / rủi ro | Dữ liệu ưu tiên | Gợi ý nguồn rule / mã |
|-----|-------------------|-----------------|------------------------|
| 1 | Thiếu / sai **mã thẻ**, định dạng | `MA_THE_BHYT` | `XML1-REQ-*`, cấu trúc QĐ 130 |
| 2 | **Hết hạn** thẻ tại thời điểm KCB | `GT_THE_DEN`, `NGAY_VAO` / mốc quy định | `luat_hanh_chinh.jsx` |
| 3 | **Đối tượng** không khớp chế độ TT | `MA_DOITUONG_KCB`, tổng chi | `HC_07`, `HC_08`, `HC_11`, … |
| 4 | **Trẻ em / thẻ TE** — mức hưởng đặc thù | `MA_THE_BHYT` (nhóm mã), tổng `T_BNCCT` | `HC_12`, `HC_13`, … |
| 5 | **Chi phí thấp / ngưỡng** — thu BN | Tổng chi, ngưỡng LCS | `HC_06` |
| 6 | **KSK / không thuộc quỹ** | `LY_DO_VV`, `CHAN_DOAN_VAO` | `luat_hanh_chinh.jsx` Điều 23 |
| 7 | **Cân đối nguồn** (BHTT/BNTT/BNCCT) | `T_TONGCHI_*`, các `T_*` XML1 | Rule tổng hợp / `XML_*` (xem seed) |
| 8 | **Giới tính / trường danh mục** chuẩn 130 | `GIOI_TINH` | `luat_hanh_chinh.jsx` |

*Chi tiết từng mã `HC_*`: `du_lieu_luat_hanh_chinh_muc2.jsx` — đọc `CANH_BAO`, không tự thêm số điều.*

---

## 4. Nguyên tắc suy luận

1. **XML1 trước:** Thẻ, hạn, đối tượng, loại KCB, CSKCB, mốc thời gian — sau mới “xuống” XML2/3.
2. **Một hồ sơ nhiều lớp:** Cùng lúc có cảnh báo **hết hạn thẻ** và **sai tổng tiền** — giải thích **tách dòng**, không gộp một cụm từ “sai BHYT”.
3. **“Cảnh báo” ≠ khẳng định gian lận:** Nhiều `HC_*` mang tính **kiểm tra điều kiện** — cần đối chiếu chứng từ (giấy chuyển tuyến, miễn cùng chi trả, v.v.).
4. **ON/OFF rule:** Rule tắt → im lặng — không suy “đúng tuyệt đối”.
5. **Quyền lợi người bệnh** trong pháp lý gồm **được thanh toán đúng** + **không bị thu sai** + **được thông tin** — trong CDSS tập trung **đúng dữ liệu & đúng công thức TT**; tranh chấp pháp lý ngoài phạm vi engine.

---

## 5. Prompt mẫu (huấn luyện)

- *«Liệt kê các cảnh báo liên quan **thẻ / đối tượng / mức hưởng / đồng chi trả** trong audit này; mỗi dòng: `ma_luat`, trường XML1 chính, một câu kết luận nghiệp vụ.»*
- *«Nếu `MA_THE_BHYT` gợi ý nhóm TE — chỉ rõ rule `HC_*` nào trong repo đi cùng và điều kiện đủ từ tổng chi (nếu có trong JSON).»*
- *«Phân biệt lỗi **hết hạn thẻ** với lỗi **sai tổng BNCCT**: dùng trường nào để chứng minh?»*

---

## 6. Ca / tài liệu gắn khung (trong repo)

| Nguồn | Trọng tâm |
|-------|-----------|
| [Huan_luyen_phien_hanh_chinh_BHYT_bat_buoc_Cursor.md](./Huan_luyen_phien_hanh_chinh_BHYT_bat_buoc_Cursor.md) | Phiên đầy đủ + bài tập |
| Audit có `HC_*` / `XML1-REQ-MA_DOITUONG_KCB` (ví dụ **ER26000392**) | Đa lớp thuốc + hành chính |
| `npm run qa:audit-fixtures` | 10 ca regression có nhánh HC/HD |

---

## 7. Neo mã nguồn (đọc — không đổi logic tại thẻ này)

| Tệp | Vai trò |
|-----|---------|
| `ma_nguon/quy_tac/luat_hanh_chinh.jsx` | KSK Điều 23, hết hạn thẻ, MA_LK mẹ-con, giới tính |
| `ma_nguon/tien_ich/du_lieu_luat_hanh_chinh_muc2.jsx` | Seed **`HC_*`** |
| `ma_nguon/tien_ich/kiem_tra_xml.jsx` | Trường bắt buộc XML1 |
| `ma_nguon/quy_tac/quyluat_cautrucdulieu/xml1.jsx` | Danh mục cột XML1 |

---

*Thẻ này bổ sung lớp “kiểm soát lỗi” song song [The_tri_thuc_kiem_soat_sai_thuoc_AI.md](./The_tri_thuc_kiem_soat_sai_thuoc_AI.md) và [The_tri_thuc_kiem_soat_loi_dvkt_VBHN17_AI.md](./The_tri_thuc_kiem_soat_loi_dvkt_VBHN17_AI.md); cập nhật khi đổi seed HC hoặc đặc tả XML.*
