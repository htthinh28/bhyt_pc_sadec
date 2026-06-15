# Bản ghi rà soát quy tắc audit BHYT — trước deploy production

**Ngày:** 2026-04-09  
**Phạm vi:** Đối chiếu trường dữ liệu với schema QĐ 3176/QĐ-BYT (định nghĩa trong `ma_nguon/quy_tac/quyluat_cautrucdulieu/xml1.jsx` … `xml6.jsx`), đồng bộ tên tắt trong quy tắc, công cụ kiểm tra lặp lại.

---

## 1. Giới hạn phương pháp (quan trọng)

| Yêu cầu | Thực tế trong repo |
|--------|---------------------|
| Dương tính giả = 0% | **Không chứng minh được** chỉ bằng rà soát tĩnh. Cần bộ kiểm thử hồi quy trên XML thật + ca huấn luyện đã khóa kết quả. |
| Âm tính giả = 0% | Tương tự — cần bộ ca vi phạm đã xác nhận và audit so khớp. |
| Chỉ sửa data/rules | Đã **ưu tiên** sửa seed/hardcoded; thêm **alias trường trong `prepareData`** là lớp tương thích tên cột QĐ ↔ tên dùng trong biểu thức No-Code (không đổi luật nghiệp vụ). |

---

## 2. Thay đổi đã thực hiện (kèm ghi chú)

| Vị trí | Nội dung | Ghi chú / lý do |
|--------|-----------|-----------------|
| `ma_nguon/tien_ich/dong_co_giam_dinh.jsx` — `prepareData` | Sau chuẩn hóa key, gán thêm các trường đồng nghĩa khi trống: `MA_TINH` ← `MATINH_CU_TRU`; `MA_DV` ← `MA_DICH_VU`; `MA_VTYT` ← `MA_VAT_TU`; `MA_GIOI_TINH` ← `GIOI_TINH`; `MA_LY_DO_VV` ← `LY_DO_VV`; `MA_LY_DO_VVIEN` ← `MA_LY_DO_VNT`; `TEN_DV` ← `TEN_DICH_VU`; `MA_DUONG_DUNG` ← `DUONG_DUNG` | Cột gửi BHXH vẫn theo QĐ; quy tắc cũ dùng tên tắt vẫn đọc được giá trị đúng từ XML đã parse. |
| `ma_nguon/tien_ich/luat_cong_kham_hardcoded.jsx` — `CK_11` | `XML1.MA_TINH_TRANG_RV == '2'` → `XML1.MA_LOAI_RV == '2'` | `MA_TINH_TRANG_RV` **không tồn tại** trong XML1 (QĐ 130/3176). Mã loại ra viện `'2'` thống nhất với các luật hành chính khác (chuyển tuyến). |
| `scripts/audit_rules_xml_schema.mjs` | Script quét `XMLn.TRUONG` trong `DIEU_KIEN` so với `DANH_SACH_COT_XML*` + danh sách trường do engine bổ sung | Phục vụ rà soát lặp lại trước mỗi bản production. |
| `package.json` | Thêm script `npm run qa:rule-schema` | Gọi script trên. |
| `test_xml/rule_xml_schema_audit.json` | Báo cáo JSON sinh tự động | Xem số tham chiếu còn lệch schema (cập nhật mỗi lần chạy). |
| `scripts/off_unknown_field_rules.mjs` | Tắt `TRANG_THAI: OFF` mọi quy tắc có tham chiếu `XMLn.FIELD` không thuộc schema / engine extra | Báo cáo: `test_xml/off_unknown_field_rules_report.json`. Lần chạy: **220** `MA_LUAT` (seed JSON + hardcoded). `du_lieu_luat_du_lieu_muc1.jsx`: 0 (đã khớp). |
| `dong_co_giam_dinh.jsx` — `enrichXML2Data` | Nếu thiếu `MA_HOAT_CHAT`, gán `MA_HOAT_CHAT = MA_THUOC` (trim) | Phục vụ quy tắc thuốc Mục 8 cần mã hoạt chất BYT; khi DM đầy đủ nên thay bằng tra cứu DM. |
| `scripts/audit_rules_xml_schema.mjs` | Thêm `MA_HOAT_CHAT` vào `ENGINE_EXTRA` bảng XML2 | Khớp với enrich trên. |
| `scripts/reon_muc8_ma_hoat_chat_rules.mjs` | Bật lại **20** quy tắc thuốc chỉ thiếu `MA_HOAT_CHAT` (sau enrich) | Các mã: `THUOC_385` … `THUOC_528` (xem script). **40** quy tắc thuốc khác vẫn OFF (còn trường lạ như `XML2.LOAI_THUOC`, `XML1.TUOI_NGAY`, …). |

---

## 3. Công cụ chạy lại

```bash
npm run qa:rule-schema
npm run qa:off-unknown-fields
npm run qa:analyze-muc8
npm run qa:reon-muc8-hoat-chat
```

Kết quả: `test_xml/rule_xml_schema_audit.json` (tổng hợp `UNKNOWN_FIELD` theo file).

---

## 4. Nợ kỹ thuật / rủi ro còn lại (sau bước trên)

- Còn **~200+** tham chiếu `XMLn.FIELD` trong báo cáo tự động không khớp `DANH_SACH_COT_XML*` và không nằm trong danh sách “engine extra” — phần lớn là:
  - Trường **chỉ có sau ghép danh mục thuốc** (ví dụ `XML2.MA_HOAT_CHAT`): cần pipeline enrich từ DM hoặc đổi điều kiện sang `MA_THUOC` + tra cứu.
  - Trường **không thuộc XML130** (ví dụ một số chỉ số CLS mở rộng trên XML4): cần map sang `MA_CHI_SO` / `GIA_TRI` / `KET_LUAN` hoặc tắt rule (`TRANG_THAI: OFF`) đến khi có dữ liệu đầu vào.
  - **Sai bảng** (ví dụ nội dung VTYT trên `XML5`): cần sửa target bảng hoặc xóa rule trùng ý nghĩa với luật đã chạy đúng trên XML3.

- Trùng ý nghĩa giữa các `MA_LUAT`: tiếp tục dùng `node scripts/audit_rules.js` (regex theo format backtick); seed `du_lieu_luat_du_lieu_muc1.jsx` dùng JSON — nên mở rộng script hoặc so khớp thủ công theo cột `GHI_CHU_SUA` trong Excel/seed.

---

## 5. Việc nên làm trước khi bật production

1. Chạy `npm run qa:claim-audit` (hoặc quy trình audit đầy đủ trong dự án) trên **tập XML đại diện** + **ca huấn luyện đã khóa**.  
2. Rà lại các rule còn trong `rule_xml_schema_audit.json` với mức **Critical/Error** — ưu tiên tắt hoặc sửa từng dòng có `UNKNOWN_FIELD` nếu không có kế hoạch enrich.  
3. Ký duyệt nghiệp vụ: mối `MA_LY_DO_VVIEN` ↔ `MA_LY_DO_VNT` chỉ an toàn nếu CSKCB của bạn luôn điền thống nhất một nguồn cho “lý do vào viện”.

---

*Tài liệu này bổ sung cho `scripts/audit_rules.js` và pipeline QA hiện có; không thay thế quyết định nghiệp vụ của kiểm tra viên.*
