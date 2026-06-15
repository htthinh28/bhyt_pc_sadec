# Tri thức — Bộ 177 (04/2026): pipeline kiểm tra & cập nhật quy tắc

Tài liệu phục vụ **Thư viện** và **Trợ lý tri thức** (RAG nội bộ): mô tả cách dùng thư mục `tai_nguyen/177 - 04032026`, chạy audit batch, và gắn kết quả với vòng đời quy tắc trong CDSS.

## Mục đích

- Kiểm thử quy tắc mới trên **cùng tập hồ sơ** (XML) mà BV đã xuất / cổng đã trả.
- Tổng hợp **mã lỗi / mã luật** (`ma_luat`, `tang_V15`, `namespace_quy_tac`) để rà soát false positive và bổ sung luật ON/OFF hoặc luật cứng khi cần.
- Cung cấp **ngữ cảnh huấn luyện AI**: không thay cho kết luận pháp lý; dùng cùng màn «Tri thức từ kiểm tra» để ghi nhận xác nhận Đúng/Sai từng cảnh báo.

## Luồng chuẩn

1. Đặt file `*.xml` vào `tai_nguyen/177 - 04032026/` (một cấp). Chi tiết: README trong thư mục đó.
2. Chạy `npm run qa:claim-audit-177`.
3. Mở JSON kết quả trong `test_xml/audit_thu_muc_177_*.json` — đối chiếu `rule_summary` với màn **Thư viện → Tra cứu quy tắc phân lập** và tab ON/OFF nội bộ.
4. Khi cần đưa bản tóm tắt vào bundle web: `npm run tai_lieu:prepare`.

## Liên kết nội bộ

- Audit engine: `scripts/run_claim_audit.js` (bundle `claim_audit_entry.jsx`, cùng pipeline `chayGiamDinhToanDienV15HybridDongBo`).
- Tổng hợp quy tắc cho UI Thư viện: `ma_nguon/tien_ich/tra_cuu_quy_tac_phan_lap.js`.
- Ghi nhận bài học sau ca: màn **Tri thức từ kiểm tra** (`tri_thuc_tu_giam_dinh`), xuất Markdown vào `tai_lieu/` nếu cần.

## Kết quả run gần nhất

<!-- AUTO_AUDIT_177_START -->

_Chưa chạy audit: không có file *.xml trong thư mục (chỉ có metadata hoặc rỗng)._

<!-- AUTO_AUDIT_177_END -->
