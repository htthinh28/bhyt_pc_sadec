# Bộ số 177 — 04/2026 (kiểm thử quy tắc & huấn luyện AI)

Thư mục này dùng làm **điểm đặt file mẫu** để chạy kiểm tra batch giống môi trường thực (Claim / SOA).

## Chuẩn bị dữ liệu

1. Sao chép các file **XML hồ sơ QĐ 130 / 4210** (ví dụ `Claim_null_SOA-*.xml`) trực tiếp vào đây **cùng cấp** với file README (một cấp, không thư mục con — đúng với `run_claim_audit --dir`).
2. Nếu bạn chỉ có **JSON** đi kèm cổng: mở file JSON, lấy nội dung XML (hoặc đường dẫn tới file `.xml` trên máy) và lưu thành file `.xml` vào thư mục này. Script audit trong repo **chỉ đọc `*.xml`** một cấp.

## Chạy kiểm thử

Từ gốc repo:

```bash
npm run qa:claim-audit-177
```

- Gọi `scripts/run_claim_audit.js` với `--dir` trỏ vào thư mục này.
- Kết quả JSON: `test_xml/audit_thu_muc_177_<timestamp>.json`.
- Đồng thời cập nhật/cập nhật phần tổng hợp trong `tai_lieu/Tri_thuc_bo_177_04_2026_pipeline_giam_dinh_AI.md` (mục “Kết quả run gần nhất”).

Sau đó nên chạy để đưa bản HTML vào Thư viện web:

```bash
npm run tai_lieu:prepare
```

## Ghi chú

- File `desktop.ini` trong thư mục là metadata Windows; **không** thay cho dữ liệu claim. Nếu Explorer chỉ hiện `desktop.ini`, hãy kiểm tra file thật đã được copy chưa (dung lượng > 0, đuôi `.xml`).
