# THỰC CHIẾN: TỔNG HỢP KỸ NĂNG VỚI `tai_nguyen/xml2_ip`

Phiên bản: 1.0 · Cập nhật: 10/04/2026  

## 1. Nguồn và vai trò

- **Thư mục:** `tai_nguyen/xml2_ip/` — file **GIAMDINHHS** (XML1–4 trong `NOIDUNGFILE` Base64), tên file thường gợi **nội trú / IP** (`*_IP26*.xml`).
- **Mục đích:** luyện AI đọc hồ sơ thật cùng cấu trúc với luồng CDSS: neo `MA_LK`, so khớp cảnh báo engine, viết ca mẫu, rà rule DVKT/thuốc/CLS — **không** công khai nguyên file nếu chưa khử nhận dạng theo quy định.

## 2. Chỉ mục và neo nhanh

```bash
npm run tai_lieu:index-tai-nguyen-xml2-ip
```

- Output: `tai_lieu/_index_tai_nguyen_xml2_ip.json` — mỗi dòng có `relPath`, `ma_lk`, `ma_cskcb`, **`ma_loai_kcb`**, **`ma_benh_chinh`** (nếu có).
- Gói dữ liệu huấn luyện tổng quát: [Goi_du_lieu_huan_luyen_AI_thuc_chien.md](./Goi_du_lieu_huan_luyen_AI_thuc_chien.md).

## 3. Checklist đọc XML sau khi giải Base64

| Bước | Nội dung | Gợi ý kỹ năng |
|------|----------|----------------|
| XML1 | `MA_LOAI_KCB`, `MA_BENH_CHINH`, thời gian vào/ra, tuyến | Neo loại KCB (ví dụ `03` nội trú), ICD chính cho phác đồ rule |
| XML2 | Thuốc: `MA_THUOC`, `NGAY_YL`, `DUONG_DUNG`, `LIEU_DUNG` | Đối chiếu DM thuốc, ngày y lệnh vs ngày vào viện, nhóm ATB/ngoại trừ |
| XML3 | DVKT: `MA_DICH_VU`, `NGAY_YL`, `NGAY_TH_YL` | [The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md](./The_tri_thuc_Danh_muc_1_DVKT_dieu_kien_ty_le_gia_VBHN17_AI.md), điều kiện thanh toán Danh mục 2 |
| XML4 | CLS: `MA_CHI_SO`, kết quả | Chuẩn hóa chỉ số / máy nếu rule yêu cầu |

## 4. Luồng prompt gợi ý (thực chiến)

1. Chọn một `ma_lk` hoặc `relPath` từ JSON chỉ mục.
2. Yêu cầu AI: trích khối XML1–4 tương ứng, liệt kê **chỉ các trường** cần cho rule đang học (tránh dump toàn bộ PII).
3. Áp rule: so sánh với output engine trong app hoặc mô tả trong thẻ tri thức tĩnh.
4. Ghi lại **ca mẫu** (mã ẩn danh): bệnh chính, DVKT/thuốc nghi ngờ, căn cứ pháp lý / Danh mục.

## 5. Liên kết trong repo

- Hướng dẫn nguồn XML: [Huong_dan_tai_nguyen_XML_thuc_chien_AI.md](./Huong_dan_tai_nguyen_XML_thuc_chien_AI.md)
- Lộ trình huấn luyện: [Lo_trinh_huan_luyen_AI_giam_dinh_BHYT.md](./Lo_trinh_huan_luyen_AI_giam_dinh_BHYT.md)

---

*Tài liệu tổng hợp kỹ năng đọc nội trú từ `xml2_ip`; bổ sung khi có thêm rule hoặc chỉ mục con mới.*
