# CA HUẤN LUYỆN MẪU 000538 — CDHA_101 — MÃ MÁY THIẾT BỊ (MA_MAY) TRÊN DỊCH VỤ CĐHA

Phiên bản tài liệu: 1.0  
Ngày cập nhật: 09/04/2026

## 1. Mục tiêu

Huấn luyện AI nhận diện **`CDHA_101`**: **mã máy** (`XML3.MA_MAY`) không đạt định dạng (quá ngắn hoặc mã giả **12345**) trên dịch vụ **không phải khám** (tên DV không chứa “KHÁM”) — lỗi **dữ liệu danh mục thiết bị**, ảnh hưởng **quyết toán BHXH** theo tinh thần cảnh báo.

**Không nhầm** với:

- cảnh báo **chuyển tuyến** `CLN-CT-01` / `CLN-CT-02` (cùng hồ sơ);
- rule **DVKT seed PTTT** — khác nguồn (`luat_cdha_hardcoded` vs `du_lieu_luat_pttt_muc11`).

## 2. Nguồn dữ liệu

- Audit: `test_xml/audit_000538_20260404_221726.json`
- XML gốc (meta): `…\ip\PC022602579_IP26000243.xml`
- Rule: `ma_nguon/tien_ich/luat_cdha_hardcoded.jsx` — id `CDHA-101`.

## 3. Tóm tắt hồ sơ

- `MA_LK`: **000538**
- Có **`CDHA_101`** × 1 — dịch vụ ví dụ trong audit: **Chụp X-quang ngực thẳng [số hóa 1 phim]** (`index` XML3: **1**).

**Cùng hồ sơ:** `CLN-CT-01`, `CLN-CT-02`, `HC_171`, `HC_181`, `HD_10`.

## 4. Rule đích: CDHA_101

- **Mã:** `CDHA_101`
- **Tên:** Kiểm soát mã máy "Rác"
- **Điều kiện:**  
  `(LEN(XML3.MA_MAY) < 5 OR XML3.MA_MAY == '12345') AND !(XML3.TEN_DICH_VU || '').toUpperCase().includes('KHÁM')`
- **Cảnh báo (gốc):** Mã máy trang thiết bị không đúng định dạng hoặc mã giả định — BHXH có thể từ chối quyết toán.

## 5. Bài tập cho AI

1. Vì sao điều kiện **loại trừ** tên DV có chữ **“KHÁM”**? (Gợi ý: phân biệt công khám với CĐHA có máy.)
2. Đề xuất **một** hành động sửa dữ liệu tại kho **thiết bị / HIS** (không cần số máy thật — chỉ mô tả loại việc).
3. Chỉ ra **một** cảnh báo khác trong cùng audit **không** liên quan `MA_MAY`.

## 6. Liên kết

- Bảng neo: [Bang_neo_phien_huan_luyen_dvkt_va_engine.md](./Bang_neo_phien_huan_luyen_dvkt_va_engine.md)
- Hardcoded CĐHA (toàn bộ danh sách trong repo): `ma_nguon/tien_ich/luat_cdha_hardcoded.jsx`
