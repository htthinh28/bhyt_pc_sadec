# CA HUẤN LUYỆN MẪU 000502 — CDHA_164 — MRI VÀ THỜI GIAN CHỜ NỘI TRÚ

Phiên bản tài liệu: 1.0  
Ngày cập nhật: 09/04/2026

## 1. Mục tiêu

Huấn luyện AI nhận diện cảnh báo **CĐHA hardcoded** `CDHA_164`: **nội trú** (loại KCB **03/09**) có dòng **MRI** với **ngày y lệnh** cách **ngày vào** viện **> 3 ngày** — góc **quản trị / TAT**, khác với xuất toán thuần túy theo giá BHYT.

**Không nhầm** với:

- **`CLN-GIUONG-01`** (tổng ngày giường XML3 vs `SO_NGAY_DTRI`) — cùng hồ sơ có thể có song song;
- **`DVKT_26xx`** gói PTTT trong `du_lieu_luat_pttt_muc11.jsx` — khác bảng seed và ý nghiệp vụ.

**Neo pháp lý (khung):** Điều **4c** (ngày giường, thời điểm điều trị) và tinh thần **theo dõi hợp lý thời gian** trong hồ sơ nội trú — chi tiết điều kiện TT từng DV xem [The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md](./The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md).

## 2. Nguồn dữ liệu

- Audit: `test_xml/audit_000502_20260404_192348.json`
- XML gốc (meta): `…\ip\PC022303311_IP26000207.xml`
- Rule: `ma_nguon/tien_ich/luat_cdha_hardcoded.jsx` — id `CDHA-164`, `MA_LUAT`: **`CDHA_164`**.

## 3. Tóm tắt hồ sơ

- `MA_LK`: **000502**
- `total_warnings`: **6** (snapshot)
- Có **`CDHA_164`** × 1 (`index` XML3: **16** trong audit).

**Cùng hồ sơ (để AI phân tầng):** `CLN-GIUONG-01`, `HC_130`, `HC_171`, `HC_65`, `HD_10`.

## 4. Rule đích: CDHA_164

### 4.1. Định nghĩa trong `luat_cdha_hardcoded.jsx` (chuẩn khi đọc điều kiện)

- **Mã:** `CDHA_164`
- **Tên:** Chụp MRI và Thời gian chờ điều trị nội trú (mã 03/09)
- **Điều kiện:**  
  `XML1.MA_LOAI_KCB == '3' AND XML3.MA_DV IN (DM_MRI) AND DATEDIFF_DAY(XML1.NGAY_VAO, XML3.NGAY_YL) > 3`
- **Cảnh báo (gốc):** Cảnh báo quản trị: chờ MRI quá 3 ngày kể từ ngày vào (nội trú).

### 4.2. Ghi chép audit

File JSON audit có thể hiển thị `dieu_kien` rút gọn (thiếu cụm `MA_DV IN (DM_MRI)`). Khi huấn luyện **ưu tiên đối chiếu seed** trong `luat_cdha_hardcoded.jsx`.

## 5. Dữ liệu cần xem

- **XML1:** `MA_LOAI_KCB`, `NGAY_VAO`, `NGAY_RA`, `SO_NGAY_DTRI`
- **XML3:** dòng có `MA_DV` thuộc nhóm MRI (theo `DM_MRI` trong engine), `NGAY_YL`

## 6. Bài tập cho AI

1. Giải thích vì sao rule này mang nhãn **QUẢN TRỊ** chứ không phải **XUẤT TOÁN** thuần BHYT trong text cảnh báo.
2. Liệt kê **ít nhất hai** lý do lâm sàng / vận hành hợp lý khiến MRI > 3 ngày sau vào viện **vẫn có thể** chấp nhận được (AI chỉ gợi ý — không kết luận thay kiểm tra viên).
3. Phân biệt một dòng với **`CLN-GIUONG-01`** trên cùng hồ sơ: khác **trường so sánh** và **mục đích** cảnh báo.

## 7. Liên kết

- Bảng neo DVKT/CDHA: [Bang_neo_phien_huan_luyen_dvkt_va_engine.md](./Bang_neo_phien_huan_luyen_dvkt_va_engine.md)
- Phiên tri thức DVKT: [Huan_luyen_phien_DVKT_VBHN17_Cursor.md](./Huan_luyen_phien_DVKT_VBHN17_Cursor.md)
