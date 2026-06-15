# Thẻ tri thức: Thuốc có điều kiện thanh toán BHYT

## Mục tiêu

Chuẩn hóa kiểm tra các thuốc có điều kiện thanh toán theo danh mục nội bộ:

- Đối chiếu `MA_THUOC` trên XML2 với danh mục `DANH_MUC_THUOC_DIEU_KIEN_TT`.
- Đối chiếu điều kiện `MA_BENH_CHINH`, `MA_BENH_KT` với cột mã ICD-10.
- Đối chiếu `CHAN_DOAN_RV` với từ khóa/chẩn đoán yêu cầu.
- Đối chiếu điều kiện bổ sung trong mô tả/cảnh báo (ví dụ: dưới 6 tuổi).

Nếu không thỏa điều kiện thì sinh cảnh báo mức xuất toán.

## Nguồn dữ liệu

- Danh mục nội bộ: tab `DANH_MUC_THUOC_DIEU_KIEN_TT` (màn Quản lý danh mục).
- File import mẫu: `danh muc thuoc có ma thanh toan.xlsx`.
- Cột chuẩn:
  - `MA_GIAM_DINH`
  - `TEN_QUY_TAC`
  - `MA_THUOC_QD7603`
  - `HOAT_CHAT`
  - `DUONG_DUNG`
  - `MA_ICD10`
  - `CHAN_DOAN`
  - `TU_KHOA_YEU_CAU`
  - `CANH_BAO_CDSS_ALERT`

## Logic kiểm tra đã triển khai

1. Lấy từng dòng thuốc BHYT trong XML2.
2. Tìm rule theo `MA_THUOC_QD7603`.
3. Kiểm tra ICD hợp lệ:
   - Trúng khi mã bệnh chính/kèm theo trùng ICD hoặc cùng nhóm có tiền tố phù hợp.
4. Kiểm tra chẩn đoán:
   - `CHAN_DOAN_RV` phải chứa ít nhất một từ khóa trong `CHAN_DOAN` hoặc `TU_KHOA_YEU_CAU`.
5. Kiểm tra điều kiện tuổi đặc biệt:
   - Nếu rule có cụm "dưới 6 tuổi" thì hồ sơ phải thỏa điều kiện tuổi.
6. Không đạt một trong các điều kiện trên:
   - Phát sinh cảnh báo `Critical` theo nội dung `CANH_BAO_CDSS_ALERT` (hoặc mẫu mặc định).

## Ví dụ nghiệp vụ

- Mã thuốc: `27.67`
- Hoạt chất: `Lysin + Vitamin + Khoáng chất`
- ICD hợp lệ: `E43; E44`
- Từ khóa chẩn đoán: `Suy dinh dưỡng`
- Điều kiện tuổi: trẻ em dưới hoặc bằng 6 tuổi

Cảnh báo mẫu:

`[XUẤT TOÁN] Thuốc (27.67) chỉ thanh toán cho trẻ em DƯỚI 6 TUỔI suy dinh dưỡng.`

## ON/OFF quy tắc

- Nhóm mẫu: `THUOC_DKTT_*`
- Tab quản trị: `LUAT_THUOC`
- Có thể bật/tắt theo mẫu hoặc từng mã cụ thể trên màn hình Quy tắc ON/OFF.
