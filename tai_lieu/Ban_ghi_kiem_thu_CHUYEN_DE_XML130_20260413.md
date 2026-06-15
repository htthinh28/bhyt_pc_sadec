# Bản ghi kiểm thử — CHUYEN_DE XML130 (batch 39–40)

**Ngày:** 2026-04-13  
**Phiên bản mã:** `CHUYEN_DE_XML130_CONVERSION_VERSION = 2026-04-13-batch40-chuyen-de-xml130-cls-387-408`

## Kết quả pipeline

- `npm run lint` — PASS (expo lint, encoding:check, font:check).
- `npm run qa:audit-all` — gồm: `tai_lieu:index-huan-luyen`, `qa:audit-fixtures`, `qa:on-off-match`, `qa:rule-schema`, `qa:rule-trang-thai`, `qa:claim-audit-smoke`, `qa:chuyen-de-placeholder`, `qa:chuyen-de-thuc-chien`, `tai_lieu:prepare` — chạy thành công trong phiên kiểm tra.
- `npm run chuyen-de:sync-eligible-scan` — cập nhật `scripts/chuyen_de_eligible_scan.json` (placeholder 0; XML130 không placeholder 603; seed ON 593; cảnh báo mặc định OFF nội bộ theo scan).
- `npm run tai_lieu:danh-muc-off` — tái tạo `tai_lieu/Danh_muc_quy_tac_OFF_va_Placeholder.txt` và `tai_lieu:prepare`.

## Quy tắc CHUYEN_DE heuristic XML130 (lô thời gian / CLS)

| Id | Mã | Ý chính (cơ sở dữ liệu XML130) |
|----|-----|--------------------------------|
| CHUYEN_DE-261 | Chuyen_de_261 | XML3: `NGAY_KQ`, `NGAY_YL` đủ 12 ký tự; thời điểm KQ trước mốc y lệnh. |
| CHUYEN_DE-375 | Chuyen_de_375 | XML3: `NGAY_TH_YL`, `NGAY_YL` đủ 12 ký tự; y lệnh sau thời điểm thực hiện. |
| CHUYEN_DE-387 | Chuyen_de_387 | Có thuốc XML2 có `NGAY_YL`; có dòng XML3 gợi CDHA/CT/MRI/XQ/SA (theo tên) mà mốc `NGAY_YL` CLS muộn hơn mọi `NGAY_YL` thuốc. |
| CHUYEN_DE-408 | Chuyen_de_408 | XML3: `NGAY_KQ` không trước `NGAY_YL`, `DIFF_DAYS` lớn hơn 14 (trễ trả KQ so với chỉ định). |

Quy tắc **376/377** vẫn backlog (phạm vi ngày so với nằm viện đã phủ bởi **279**). **402** backlog (không có trường “tổng thời gian thực hiện” chuẩn).

## Tri thức cho huấn luyện AI

1. Đọc điều kiện thực tế trong `ma_nguon/tien_ich/luat_giam_dinh_chuyen_de_hardcoded.jsx`; không suy diễn ngoài các trường XML1–XMLn đã map.
2. Phân biệt **heuristic** (có thể dương giả) với **`CHUYEN_DE_XML130_PLACEHOLDER_EXIT_AUDIT_BACKLOG`** — biểu thức luôn false trên hồ sơ hợp lệ, engine không phát cảnh báo tự động cho đến khi có DIEU_KIEN XML130.
3. Nghiệp vụ cần **hai đợt KCB / hai MA_LK** (ví dụ khám lại quá sớm, ra viện nội trú rồi khám OP ngay): **một file XML130 không đủ** — không ép khớp bằng một MA_LK.
4. Ký duyệt thực chiến từng id: thêm vào `scripts/chuyen_de_thuc_chien_manifest.json` → `approved_rule_ids` sau kiểm thử vàng và checklist nội bộ (hiện manifest có thể để rỗng, QA vẫn pass).

## Tham chiếu nhanh

- `tai_lieu/Lo_trinh_viet_lai_CHUYEN_DE_theo_XML130.md` — lộ trình lô.
- `scripts/chuyen_de_batch_manifest.json`, `scripts/chuyen_de_thuc_chien_manifest.json`.
