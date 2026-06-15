# CA HUẤN LUYỆN MẪU 000308 — DVKT_2587 & DVKT_2588 — GÓI PTTT VÀ THUỐC TÊ/MÊ (XML2)

Phiên bản tài liệu: 1.0  
Ngày cập nhật: 09/04/2026

## 1. Mục tiêu

Huấn luyện AI **phân tầng kiểm tra DVKT** trên cùng một dòng **XML3** (gói phẫu thuật), kết hợp **XML1** (chẩn đoán) và **XML2** (thuốc), **không nhầm** với:

- cảnh báo thuốc **THUOC_391** (cùng hồ sơ — khác bảng dữ liệu và ý nghĩa);
- rule hành chính **HC_*** / hợp đồng **HD_*** (khác phân hệ).

Trọng tâm: **`DVKT_2587`** (chỉ định — ICD) và **`DVKT_2588`** (thực hiện — thuốc tê/mê trong gói).

**Neo pháp lý (khung, không thay Phụ lục):** Điều kiện thanh toán DVKT theo **Danh mục / gói** thường kèm **ghi chú giá** (đã/không kết cấu thuốc–oxy) — thẻ tổng quát: [The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md](./The_tri_thuc_giam_dinh_DVKT_VBHN_17_BYT.md) (Điều 2–4, **4a** về cấu trúc giá và tránh thu trùng).

## 2. Nguồn dữ liệu

- Audit: `test_xml/audit_000308_20260405_083942.json`
- XML gốc (meta audit): `…\ip\PC022209964_IP26000013.xml` — nếu không có trong repo, dùng **warnings** trong JSON làm sự thật vận hành.
- Seed rule: `ma_nguon/tien_ich/du_lieu_luat_pttt_muc11.jsx` — các mục `DVKT_2587`, `DVKT_2588`.

## 3. Tóm tắt hồ sơ

- `MA_LK`: **000308**
- `total_warnings`: **8** (snapshot)
- Trên **cùng một dòng XML3** (`index` **4**): xuất hiện **cả hai** `DVKT_2587` và `DVKT_2588` (cùng `MA_DICH_VU` gói **13.0002.0672_GT** — Phẫu thuật lấy thai lần hai trở lên).

**Tóm ý cảnh báo (trích tinh thần audit):**

| Mã | Lớp kiểm tra | Ý chính |
|----|----------------|---------|
| **DVKT_2587** | Chỉ định / ICD | Cần mã chẩn đoán **O82** (sinh mổ) khi dùng gói này — điều kiện gắn **XML1.MA_BENH** |
| **DVKT_2588** | Thực hiện / thuốc trong gói | Gói ghi **chưa bao gồm thuốc tê/mê** — phải có **Bupivacain** (hoặc nhóm **GAY_ME**) trên **XML2** |

**Cùng hồ sơ** (để AI **không gộp** nghĩa khi huấn luyện chéo):

- **THUOC_391** × 3 — dòng thuốc **Biofazolin** (XML2), không phải logic gói DVKT.
- **HC_130**, **HC_171**, **HD_10** — hồ sơ / JCI.

## 4. Rule đích trong seed

### 4.1. DVKT_2587 — Chỉ định

- **Mã:** `DVKT_2587`
- **Tên:** Chỉ định - Phẫu thuật lấy thai lần hai trở lên [Gói] (13.0002.0672_GT)
- **Điều kiện (seed):**  
  `XML3.MA_DICH_VU == '13.0002.0672_GT' AND NOT (XML1.MA_BENH STARTS_WITH 'O82')`
- **Cảnh báo (gốc seed):** 🔴 Cần mã: O82 (Sinh bằng mổ đẻ).

### 4.2. DVKT_2588 — Thực hiện

- **Mã:** `DVKT_2588`
- **Tên:** Thực hiện - Phẫu thuật lấy thai lần hai trở lên [Gói] (13.0002.0672_GT)
- **Điều kiện (seed):**  
  `XML3.MA_DICH_VU == '13.0002.0672_GT' AND COUNT_IF(DS_XML2, item => item.TEN_THUOC CONTAINS 'Bupivacain' OR item.MA_NHOM_THUOC == 'GAY_ME') == 0`
- **Cảnh báo (gốc seed):** Xuất toán khi thiếu thuốc tê tủy sống hoặc thuốc mê trong **XML2** (theo mô tả gói “chưa bao gồm…”).

### 4.3. Ý nghĩa nghiệp vụ cho AI

- **2587** kiểm tra **tính nhất quán chẩn đoán–dịch vụ** (O82 vs gói sinh mổ).
- **2588** kiểm tra **điều kiện bổ sung thuốc** khi **giá gói không kết cấu** thuốc tê/mê — cần **đối chiếu mô tả gói trong danh mục đơn vị**, không chỉ nhìn một dòng XML3.

## 5. Dữ liệu bắt buộc phải xem

- **XML3:** `MA_DICH_VU` dòng `index` **4**, text cảnh báo (mã gói, nhân sự — đã ẩn trong audit mẫu).
- **XML1:** `MA_BENH` (prefix O82 hay không).
- **XML2:** toàn bộ dòng — có **Bupivacain** hoặc `MA_NHOM_THUOC == 'GAY_ME'` hay không; **tách biệt** với kiểm tra **Biofazolin** cho THUOC_391.

## 6. Bài tập cho AI (sau khi nạp audit)

1. Xác nhận **cùng `index` XML3** cho **DVKT_2587** và **DVKT_2588**; giải thích vì sao **hai rule** có thể đồng thời bật.
2. Viết một đoạn phân biệt **DVKT_2588** với **THUOC_391** (điều kiện seed, phân hệ XML2 vs liên kết gói–XML2).
3. (Nâng cao) Chỉ ra **một** câu hỏi nghiệp vụ cho **điều dưỡng gây mê** và **một** cho **khoa dữ liệu** nếu O82 đúng nhưng vẫn báo 2587 (gợi ý: nhập sai `MA_BENH`, nhiều ICD, thứ tự khai báo).

## 7. Bài học rút ra

- **Gói DVKT (PTTT)** thường cần **XML1 + XML3 (+ XML2)** — AI không kết luận “chỉ sai DVKT” mà bỏ chẩn đoán hoặc thuốc kèm gói.
- Chuỗi **`CO_SO_PHAP_LY_DVKT`** trong engine có thể trống trên một số cảnh báo seed — huấn luyện vẫn cần **neo VBHN + Phụ lục đơn vị** khi giải thích cho người.

## 8. Liên kết

- Phiên tổng quát DVKT: [Huan_luyen_phien_DVKT_VBHN17_Cursor.md](./Huan_luyen_phien_DVKT_VBHN17_Cursor.md)
- Ca THUOC cùng MA_LK (khác trọng tâm): [Ca_huan_luyen_mau_000308_THUOC_391_sai_lech_so_luong_y_lenh.md](./Ca_huan_luyen_mau_000308_THUOC_391_sai_lech_so_luong_y_lenh.md)
- Bảng neo DVKT ↔ engine: [Bang_neo_phien_huan_luyen_dvkt_va_engine.md](./Bang_neo_phien_huan_luyen_dvkt_va_engine.md)
