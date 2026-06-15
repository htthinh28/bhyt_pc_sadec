# Hướng dẫn AI / kỹ thuật viên — chạy kiểm thử repo CDSS BHYT

Chạy tại **thư mục gốc** repo (có `package.json`).

## 1. Lint (bắt buộc trước khi merge)

```bash
npm run lint
```

- Gồm: `expo lint`, kiểm tra encoding (mojibake), chuẩn font Arial trong mã nguồn.
- **Pass:** exit code `0`, không báo lỗi ESLint.

## 2. QA snapshot `test_xml/` (10 file audit chuẩn)

```bash
npm run qa:audit-fixtures
```

- Kiểm tra tồn tại file, `meta.ma_lk` khớp tên file, đọc JSON hợp lệ.
- **Pass:** dòng cuối `Kết luận: đủ 10 file, MA_LK khớp.` — exit `0`.

## 3. Schema quy tắc / trường XML

```bash
npm run qa:rule-schema
```

- Ghi `test_xml/rule_xml_schema_audit.json`; có thể in số trường tham chiếu ngoài schema (thông tin, không phải fail cứng).

## 4. Kiểm tra engine trên một XML (smoke)

```bash
npm run qa:claim-audit-smoke
```

Hoặc tùy file:

```bash
node scripts/run_claim_audit.js path/to/file.xml --out=test_xml/ket_qua.json
```

- **Pass:** in `Tong canh bao`, `Theo muc do`, `Output: ...json`, exit `0`.
- Bundle esbuild ~11MB tạm; lần đầu có thể vài phút.

## 5. Gói QA đầy đủ (một lệnh)

```bash
npm run qa:audit-all
```

Chạy lần lượt: `tai_lieu:index-huan-luyen` → `qa:audit-fixtures` → `qa:on-off-match` → `qa:rule-schema` → `qa:rule-trang-thai` → `qa:claim-audit-smoke` → `qa:chuyen-de-placeholder` → `qa:chuyen-de-thuc-chien` → `tai_lieu:prepare`.

**Vì sao có thể lâu (hàng chục phút):** `expo lint` (nếu chạy `npm run lint` trước) thường ~1–2 phút; `qa:rule-trang-thai` in danh sách hàng nghìn dòng; `qa:claim-audit-smoke` bundle esbuild tạm ~12MB; Google Drive đôi khi làm I/O chậm. Nên tách từng bước khi cần xác định chỗ kẹt.

**Tri thức cho AI (mặc định ON/OFF UI):** danh sách mã **giữ OFF** (MRI, DSA, chuyên đề placeholder XML130, vài mã khóa cứng) nằm trong `ma_nguon/tien_ich/data_quy_tac_giu_off_mo_rong.json`, được `quy_tac_on_off_noi_bo.jsx` nạp thành `Set` — không lặp lại danh sách dài trong mã.

## 6. Khác (tùy nhu cầu)

| Lệnh | Mục đích |
|------|----------|
| `npm run qa:claim-audit` | Cùng entry `run_claim_audit.js`, truyền tham số XML/out |
| `npm run qa:on-off-match` | Đối soát bật/tắt quy tắc nội bộ |
| `npm run qa:python-service` | Smoke Python service (cổng 8000) |

## 7. Sau khi sửa `tai_lieu/*.md` trong repo

```bash
npm run tai_lieu:prepare
```

Để đồng bộ `public/tai_lieu/` và manifest Thư viện trong app.

---

**Kết luận cho phiên AI:** `npm run lint` + `npm run qa:audit-all` (hoặc tối thiểu `qa:audit-fixtures` + `qa:claim-audit-smoke`) exit `0` thì **chuỗi QA chính đạt**; bổ sung `qa:on-off-match` khi đổi logic ON/OFF.
