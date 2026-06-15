# THẺ TRI THỨC: TƯƠNG TÁC THUỐC (XML2 — CÙNG ĐỢT, ĐỒNG THỜI A VÀ B)

Phiên bản tài liệu: 1.0  
Ngày cập nhật: 14/04/2026

## 1. Mục đích

Chuẩn hóa tri thức huấn luyện AI và đối chiếu mã nguồn cho quy tắc **tương tác thuốc nội bộ** trên **XML2**, đồng bộ với:

- `ma_nguon/tien_ich/dong_co_giam_dinh.jsx` — khối XML2 tương tác, `MAP_TUONG_TAC_CAP`, `danhGiaDongThoiThuocABtrenXML2`, `layNgayYYYYMMDDtuDongXML2Thuoc`, `laBHYTKhôngThanhToan`;
- `ma_nguon/chuyen_mon/tuong_tac_thuoc/quy_tac_giam_dinh_tuong_tac.jsx` — văn bản quy tắc hiển thị trong module Chuyên môn;
- Danh mục lưu trữ `DANH_MUC_TUONG_TAC_THUOC` (seed: `du_lieu_tuong_tac_thuoc.seed.json`).

## 2. Mệnh đề nghiệp vụ cốt lõi

- Trên **một MA_LK**, nếu bác sĩ kê **cả hai mã thuốc A và B** thuộc **một dòng danh mục** (cặp không phân hướng), và **điều kiện thời gian trên XML2** thỏa (cùng ngày y lệnh ưu tiên; hoặc cùng đợt khi thiếu mốc ngày), hệ thống ghi nhận **cảnh báo chuyên môn** (Warning), không phải xuất toán tự động chỉ vì cặp này.

## 3. Phạm vi áp dụng

| Hạng mục | Nội dung |
|----------|-----------|
| Phân hệ | **XML2** (thuốc), trong `giamDinhDanhMucNoiBo` |
| Hồ sơ | Một lượt KCB — toàn bộ dòng XML2 thuốc **BHYT thanh toán** của hồ sơ |
| Loại trừ | Dòng `laBHYTKhôngThanhToan` (nguồn không BHYT / `MUC_HUONG` = 0 khi có giá trị) |
| Danh mục | Chỉ dòng `TRANG_THAI = ON`; cặp thiếu `MA_THUOC_A` hoặc `MA_THUOC_B` không vào map |

## 4. Dữ liệu cần kiểm tra

- **XML2:** `MA_THUOC`, `NGAY_YL`, `NGAY_TH_YL` (chuẩn 8 ký tự ngày sau khi bỏ ký tự không số), `MUC_HUONG`, nguồn thanh toán (BHYT).
- **Danh mục:** `MA_THUOC_A`, `MA_THUOC_B`, `MA_TUONG_TAC`, `CANH_BAO_HE_THONG`, `NOI_DUNG_TUONG_TAC`, `TRANG_THAI`.

## 5. Cách suy luận đúng (đồng thời A và B)

1. Thu thập tập **mã thuốc** xuất hiện trên XML2 BHYT (mỗi mã gom tập **ngày** từ các dòng của mã đó).
2. Với mỗi cặp mã trong danh mục (khóa cặp đã sort), nếu **cả hai mã** có trong tập:
   - **Có ít nhất một ngày chung** trong hai tập ngày → ghi nhận, kiểu **CUNG_NGAY_YL**.
   - **Cả hai đều có ít nhất một ngày** nhưng **không ngày chung** → **không** ghi nhận tương tác đồng thời (kê khác ngày).
   - **Thiếu mốc ngày** ở một hoặc hai mã → ghi nhận theo **cùng đợt** trong tập XML2 BHYT, kiểu **CUNG_DOT_XML2** (có câu chữ trong cảnh báo).

## 6. Kết quả engine (nhãn hiển thị)

- **Mức độ:** Warning  
- **Tên quy tắc:** `Tương tác thuốc (XML2 — cùng đợt, đồng thời A và B)`  
- **Mã quy tắc (`ma_luat`):** `MA_TUONG_TAC` trong bảng; nếu trống → `CLN-TT-001`  
- **Nội dung:** ưu tiên `CANH_BAO_HE_THONG` → `NOI_DUNG_TUONG_TAC` → câu mặc định theo cặp mã  
- **Căn cứ pháp lý:** khung chuyên môn KCB (chuỗi tương đương Luật KCB + NĐ 96 + TT 32 + NĐ 188 + QĐ 3618 + TT 12/2026 Điều 10 trong engine)

## 7. Kiểm chứng (audit)

- **Fixture XML tối thiểu:** `test_xml/huan_luyen/AUDIT_TUONGTAC_001.xml` — hai dòng thuốc mã `40.558` và `40.671`, cùng `NGAY_YL`, BHYT; khớp cặp **TUONGTAC_001** trong seed danh mục tương tác.
- **Lệnh:** `npm run qa:tuong-tac-audit`  
  - Chạy `qa:claim-audit` lên fixture, kiểm tra snapshot có mã quy tắc **TUONGTAC_001** (và tên quy tắc tương tác như trên).

## 8. Bài học cho AI

- Không nhầm cảnh báo này với **DM-THUOC-*** (danh mục/giá) hay **THUOC_*** (luật seed mức 8); đây là lớp **tương tác/phối hợp** gắn danh mục nội bộ bệnh viện.
- Khi giải thích “vì sao có/không báo”, luôn nêu: **cặp mã**, **điều kiện ngày** (trùng / khác / thiếu), **ON/OFF** dòng danh mục.
- Nếu tài liệu nghiệp vụ và mã nguồn lệch nhau, ưu tiên **mã nguồn đang chạy**.
