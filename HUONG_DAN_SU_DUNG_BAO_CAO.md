# HƯỚNG DẪN SỬ DỤNG MODULE BÁO CÁO & THỐNG KÊ CHẤT LƯỢNG BHYT

> **Phiên bản:** 2.0 — Cập nhật theo giao diện hiện hành (01/04/2026)  
> File nguồn: `ma_nguon/man_hinh/baocao_va_thongke.jsx`

---

## 1. Tổng quan module

Module **Báo Cáo & Thống Kê Chất Lượng BHYT** cung cấp công cụ thống kê đầu vào – đầu ra theo quy trình kiểm tra, cho phép theo dõi tỷ lệ lỗi, chi phí ước tính, xu hướng theo thời gian và xuất báo cáo Excel đa trang.

**Dữ liệu đầu vào:** Toàn bộ hồ sơ đã lưu trong kho cục bộ, lấy qua `layTatCaHoSoTuKho()`.

**Các tính năng chính:**

1. Bộ lọc thời gian nhanh và tùy chỉnh từ ngày – đến ngày
2. Bộ lọc theo nhóm lỗi (type) tự động từ dữ liệu thực tế
3. 6 thẻ chỉ số KPI đầu vào / đầu ra
4. 5 tab phân tích: Tổng quan / Theo khoa / Theo bác sĩ / Theo quy tắc / Xu hướng
5. Biểu đồ thanh ngang (xu hướng tỷ lệ lỗi theo kỳ)
6. Xuất báo cáo Excel 5 sheet

---

## 2. Cách truy cập

```
Màn hình Tổng quan (Dashboard)
  → Kéo xuống mục "Phân hệ chức năng"
  → Nhấn nút "Báo cáo & Thống kê"
```

Module sẽ tự động tải toàn bộ hồ sơ từ kho lưu trữ khi khởi động.  
Khi đang tải: hiển thị vòng xoay `ActivityIndicator`.  
Khi lỗi: hiển thị thông báo `Alert`.

---

## 3. Bộ lọc thời gian

Nằm trong thẻ **"Bộ lọc thời gian báo cáo"** ở đầu trang.

### 3.1. Bộ lọc nhanh

| Nút | Khoảng tính |
|-----|-------------|
| 7 ngày | 7 ngày gần nhất (tính đến hôm nay) |
| 30 ngày | 30 ngày gần nhất |
| 90 ngày | 90 ngày gần nhất |
| Tháng này | Từ ngày 01 của tháng hiện tại đến hôm nay |
| Toàn bộ | Không lọc theo ngày, lấy toàn bộ hồ sơ trong kho |

Mặc định khi mở module: **30 ngày**.

### 3.2. Tùy chỉnh từ ngày – đến ngày

Nhấn chip **"Tùy chỉnh"** → xuất hiện 2 ô nhập:

- **Từ ngày:** nhập `YYYY-MM-DD` (ví dụ `2026-01-01`)
- **Đến ngày:** nhập `YYYY-MM-DD` (ví dụ `2026-03-31`)

Dòng "Kỳ báo cáo" bên dưới tự cập nhật hiển thị khoảng đã chọn.  
Nếu từ ngày > đến ngày, xuất hiện cảnh báo đỏ và kết quả sẽ rỗng.

**Định dạng ngày hỗ trợ trong dữ liệu hồ sơ (trường `NGAY_VAO`):**

| Định dạng | Ví dụ |
|-----------|-------|
| `YYYYMMDD` (8 ký tự) | `20260315` |
| `YYYYMMDDHHMMSS` (14 ký tự) | `20260315143000` |
| ISO string | `2026-03-15T14:30:00Z` |

---

## 4. Bộ lọc nhóm lỗi (type)

Nằm ngay dưới bộ lọc thời gian, phần **"Lọc theo nhóm lỗi đã code (type)"**.

Danh sách chip nhóm lỗi được **tự động sinh** từ giá trị trường `type` của các lỗi trong hồ sơ thuộc kỳ báo cáo hiện tại. Không cần cấu hình tĩnh — dữ liệu thực tế thay đổi thì danh sách tự thay đổi theo.

| Chip | Tác động |
|------|----------|
| Tất cả | Hiển thị mọi loại lỗi (mặc định) |
| `<tên nhóm>` | Chỉ đếm và tổng hợp lỗi thuộc nhóm này |

Khi chọn một nhóm lỗi cụ thể, toàn bộ 6 KPI card, 5 tab bảng và biểu đồ đều phản ánh chỉ lỗi thuộc nhóm đó.

---

## 5. Thẻ chỉ số KPI

6 thẻ nằm ngay dưới bộ lọc, xếp 2 cột.

| Thẻ | Màu nền | Ý nghĩa |
|-----|---------|---------|
| Đầu vào: Hồ sơ trong kho | Xanh dương nhạt | Tổng số hồ sơ trong kho, không lọc theo ngày |
| Đầu vào: Hồ sơ trong kỳ | Tím nhạt | Số hồ sơ có `NGAY_VAO` nằm trong kỳ báo cáo |
| Đầu ra: Hồ sơ có lỗi | Cam nhạt | Số hồ sơ trong kỳ có ít nhất 1 lỗi (sau lọc nhóm) |
| Đầu ra: Tổng lỗi | Đỏ nhạt | Tổng số lỗi của tất cả hồ sơ trong kỳ (sau lọc nhóm) |
| Tỷ lệ lỗi hồ sơ | Xanh ngọc nhạt | (Hồ sơ có lỗi ÷ Hồ sơ trong kỳ) × 100%, làm tròn 2 chữ số |
| Chi phí ước tính | Xanh lá nhạt | Tổng chi phí quy đổi theo mức độ lỗi (xem bảng dưới) |

**Quy đổi chi phí ước tính theo mức độ lỗi (`level`):**

| Mức độ | Chi phí / lỗi |
|--------|--------------|
| `CRITICAL` | 10.000.000 VND |
| `ERROR` | 5.000.000 VND |
| `WARNING` | 2.000.000 VND |
| Khác (`INFO`, ...) | 500.000 VND |

> Đây là số liệu **ước lượng nội bộ** để định lượng mức độ ảnh hưởng tài chính, không phải số liệu chính thức quyết toán BHYT. Dùng để ưu tiên xử lý lỗi quan trọng trước.

---

## 6. Năm tab phân tích

### Tab 1 — Tổng quan

Hiển thị bảng đối soát đầu vào – đầu ra toàn kỳ:

- **Độ phủ dữ liệu trong kỳ:** (Hồ sơ trong kỳ ÷ Hồ sơ trong kho) × 100%
- **Số khoa** có phát sinh hồ sơ trong kỳ
- **Số bác sĩ** có phát sinh hồ sơ trong kỳ
- **Số quy tắc bị vi phạm** (số quy tắc khác nhau có ít nhất 1 vi phạm)

---

### Tab 2 — Theo khoa

Bảng thống kê lỗi theo mã khoa (`MA_KHOA` từ `xml1`).  
Sắp xếp giảm dần theo tổng số lỗi.

| Cột | Nội dung |
|-----|----------|
| Khoa | Mã khoa (`MA_KHOA`), hiển thị `KHONG_RO` nếu thiếu |
| Tổng hồ sơ | Số hồ sơ trong kỳ của khoa |
| Hồ sơ lỗi | Số hồ sơ có ít nhất 1 lỗi |
| Tổng lỗi | Tổng số lỗi |
| Tỷ lệ lỗi | (Hồ sơ lỗi ÷ Tổng hồ sơ) × 100% |
| Chi phí U/T | Tổng chi phí ước tính (VND) |

---

### Tab 3 — Theo bác sĩ

Bảng thống kê lỗi theo mã bác sĩ (`MA_BS_KHAM` từ `xml1`).  
Cấu trúc cột: Bác sĩ | Tổng hồ sơ | Hồ sơ lỗi | Tổng lỗi | Tỷ lệ lỗi | Chi phí U/T.  
Sắp xếp giảm dần theo tổng số lỗi.

---

### Tab 4 — Theo quy tắc

Bảng thống kê theo từng quy tắc đã vi phạm.  
Sắp xếp giảm dần theo số lần vi phạm.

| Cột | Nội dung |
|-----|----------|
| Mã quy tắc | `rule_id` hoặc `ma_luat` của lỗi |
| Mô tả cảnh báo | `message` / `canh_bao` / `CANH_BAO` |
| Nhóm | `type` của lỗi |
| Số lần VP | Tổng số lần vi phạm quy tắc này |
| Số hồ sơ | Số hồ sơ khác nhau bị ảnh hưởng |
| Chi phí U/T | Tổng chi phí ước tính |

---

### Tab 5 — Xu hướng

Kết hợp biểu đồ thanh ngang và bảng thống kê theo kỳ thời gian.

**Chọn đơn vị kỳ (chip ở góc phải tiêu đề):**

| Nút | Ý nghĩa | Định dạng nhãn |
|-----|---------|----------------|
| Ngày | Mỗi điểm = 1 ngày | `YYYY-MM-DD` |
| Tháng | Mỗi điểm = 1 tháng (mặc định) | `MM/YYYY` |
| Quý | Mỗi điểm = 1 quý | `QN/YYYY` |

**Biểu đồ thanh ngang:**

- Mỗi hàng = 1 kỳ
- Độ dài thanh tỷ lệ với `tyLeLoi` (%) so với kỳ có tỷ lệ cao nhất trong bộ lọc
- Màu thanh: xanh dương đậm
- Số % hiển thị bên phải thanh

**Bảng chi tiết xu hướng:**

| Cột | Nội dung |
|-----|----------|
| Kỳ báo cáo | Nhãn ngày / tháng / quý |
| Tổng hồ sơ | Số hồ sơ có `NGAY_VAO` thuộc kỳ |
| Hồ sơ lỗi | Số hồ sơ có ít nhất 1 lỗi |
| Tổng lỗi | Tổng số lỗi |
| Tỷ lệ lỗi | (Hồ sơ lỗi ÷ Tổng hồ sơ) × 100% |

---

## 7. Xuất báo cáo Excel

Nút **"Xuất báo cáo tổng hợp (Excel)"** nằm ở cuối trang, luôn hiển thị.

**Tên file:** `BaoCao_ThongKe_<timestamp_ms>.xlsx`

**5 sheet trong file Excel:**

| Sheet | Nội dung |
|-------|----------|
| `TongQuan` | 1 dòng tổng hợp: tổng kho, tổng kỳ, số khoa, số bác sĩ, hồ sơ lỗi, tổng lỗi, tỷ lệ lỗi, chi phí, số quy tắc vi phạm, từ ngày, đến ngày |
| `TheoKhoa` | Toàn bộ bảng tab Theo khoa |
| `TheoBacSi` | Toàn bộ bảng tab Theo bác sĩ |
| `TheoQuyTac` | Toàn bộ bảng tab Theo quy tắc |
| `XuHuong` | Toàn bộ bảng tab Xu hướng (theo đơn vị kỳ đang chọn) |

**Hành vi theo nền tảng:**

| Nền tảng | Hành động |
|----------|-----------|
| Web | Tự động tải file `.xlsx` về máy qua liên kết ẩn (`<a download>`) |
| Mobile (iOS / Android) | Lưu vào `documentDirectory` rồi mở hộp thoại chia sẻ hệ thống |

---

## 8. Câu hỏi thường gặp

**Q: Mở module không thấy dữ liệu?**  
Kiểm tra kho lưu trữ đã có hồ sơ chưa. Vào module "Kho Lưu Trữ" và tải hồ sơ trước, sau đó quay lại báo cáo.

**Q: Thẻ KPI hiển thị 0 dù đã lọc khoảng ngày?**  
Trường `NGAY_VAO` trong `xml1` của hồ sơ có thể không có giá trị hoặc định dạng không nhận diện được. Kiểm tra dữ liệu XML gốc.

**Q: Chip nhóm lỗi không xuất hiện?**  
Các hồ sơ trong kỳ chưa có kết quả kiểm tra (`ket_qua_giam_dinh` rỗng). Cần chạy kiểm tra / kiểm tra hồ sơ trước.

**Q: Biểu đồ xu hướng không hiển thị?**  
Không có hồ sơ nào trong kỳ lọc. Chuyển sang "Toàn bộ" hoặc mở rộng khoảng ngày tùy chỉnh.

**Q: Xuất Excel bị lỗi trên mobile?**  
Kiểm tra ứng dụng có quyền truy cập bộ nhớ không. Khởi động lại ứng dụng và thử lại.

---

## 9. Thứ tự thao tác khuyến nghị

1. Vào module → chờ dữ liệu tải xong (biến mất vòng xoay)
2. Chọn bộ lọc thời gian phù hợp — thường dùng **Tháng này** hoặc **30 ngày**
3. *(Tùy chọn)* Chọn nhóm lỗi cụ thể nếu muốn tập trung vào một loại
4. Đọc 6 thẻ KPI để nắm tổng quan nhanh
5. Duyệt qua từng tab để phân tích chi tiết
6. Chú ý các khoa / bác sĩ / quy tắc có tỷ lệ lỗi cao bất thường
7. Vào tab **Xu hướng** → chọn **Tháng** → theo dõi tiến bộ / suy giảm theo thời gian
8. Nhấn **Xuất báo cáo tổng hợp (Excel)** để lưu trữ hoặc báo cáo lên lãnh đạo

---

**Hướng dẫn này phản ánh đúng code tại thời điểm:** 01/04/2026

---

## Phụ lục: Prompt nâng cấp để sửa lỗi hiển thị tiếng Việt trên web

```text
Bạn là kỹ sư frontend senior chuyên về typography, Unicode, font rendering, CSS text layout và tối ưu UI production cho giao diện web nghiệp vụ.

Mục tiêu:
Kiểm tra, xác định nguyên nhân gốc và sửa triệt để lỗi hiển thị tiếng Việt trong giao diện web, đặc biệt với các ký tự như: Ư, Ơ, Ă, Â, Ê, Ô, Đ hoặc các cụm như ƯƠ, ĐIỀU, CHẨN, BỆNH, HƯỞNG. Các lỗi cần xử lý gồm:
- dấu bị lệch vị trí
- chữ bị fallback sang font khác
- ký tự bị giãn không đều
- chữ hoa tiếng Việt hiển thị xấu hoặc vỡ nhịp
- line-height làm dính dấu
- letter-spacing làm vỡ cụm ký tự có dấu
- font-weight hoặc font file không hỗ trợ đầy đủ glyph tiếng Việt
- lỗi encoding khiến text hiển thị sai, vỡ dấu hoặc mojibake

Bối cảnh:
- Đây là giao diện hệ thống y tế / bệnh viện
- Ưu tiên độ ổn định, dễ đọc, nghiêm túc, chuyên nghiệp
- Không được thay đổi business logic
- Không được phá layout hiện có
- Không được làm hỏng Tailwind, component structure hoặc luồng đang chạy
- Chỉ can thiệp vào font, encoding, CSS typography, font loading, Tailwind config và các cấu hình liên quan đến text rendering

Yêu cầu thực hiện:
1. Kiểm tra toàn bộ font-family đang dùng trong HTML, CSS, Tailwind config, global stylesheet, component style và các @font-face.
2. Xác định chính xác font hoặc rule CSS nào không hỗ trợ tốt tiếng Việt hoặc gây fallback/font-mixing.
3. Kiểm tra xem có đang dùng Google Fonts hoặc font local sai subset hay không; nếu có, sửa để load đúng subset tiếng Việt.
4. Kiểm tra encoding của các file liên quan và đảm bảo dùng UTF-8 chuẩn; phát hiện file có dấu hiệu mojibake, ký tự hỏng hoặc lưu sai encoding.
5. Kiểm tra các CSS có thể làm hỏng hiển thị tiếng Việt, bao gồm nhưng không giới hạn:
  - letter-spacing quá lớn
  - text-transform: uppercase áp lên tiếng Việt
  - line-height quá thấp
  - font-weight không tồn tại trong font thực tế
  - font-feature-settings hoặc text-rendering không phù hợp
  - transform/scale làm méo glyph
  - dùng nhiều font stack không nhất quán giữa các component
6. Kiểm tra fallback chain để tránh trình duyệt rơi sang serif hoặc font không đồng bộ glyph tiếng Việt.
7. Nếu có Tailwind, kiểm tra theme.extend.fontFamily, preflight, class typography, utilities tùy biến và các class tracking/uppercase leading đang tác động đến text tiếng Việt.
8. Chỉ sửa tối thiểu nhưng phải đúng gốc vấn đề; không sửa kiểu chắp vá.
9. Nếu có nhiều nguyên nhân, phải phân loại theo mức độ ảnh hưởng và ưu tiên xử lý theo thứ tự.
10. Sau khi sửa, bảo đảm chữ tiếng Việt hiển thị đúng, đều, đẹp, ổn định trên Chrome trước; đồng thời không gây thoái lui rõ rệt trên Edge.

Font stack ưu tiên an toàn cho tiếng Việt:
'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif

Nguyên tắc sửa:
- Giữ nguyên layout và spacing tổng thể nếu chưa thật sự cần đổi
- Không xóa chức năng đang hoạt động
- Không đổi cấu trúc component nếu chỉ cần sửa typography/config
- Không thay font một cách cảm tính; phải nêu lý do font cũ lỗi ở đâu
- Nếu dùng Google Fonts, phải chỉ rõ cách load production-ready
- Nếu dùng @font-face, phải kiểm tra weight, style, unicode-range và fallback
- Nếu text uppercase gây xấu tiếng Việt, ưu tiên thay bằng nội dung gốc hoặc style thay thế an toàn thay vì ép uppercase bằng CSS

Đầu ra bắt buộc:
1. Nêu rõ nguyên nhân gốc, theo thứ tự ưu tiên từ nặng đến nhẹ.
2. Chỉ ra chính xác file, selector, class, config hoặc đoạn code gây lỗi.
3. Trả về bản sửa hoàn chỉnh theo dạng diff hoặc before/after rõ ràng.
4. Cung cấp phiên bản production-ready cho phần HTML/CSS/font config/Tailwind config liên quan.
5. Giải thích ngắn gọn vì sao bản sửa này xử lý đúng lỗi tiếng Việt mà không phá giao diện.
6. Nếu phát hiện nhiều điểm rủi ro chưa sửa ngay, liệt kê riêng phần “Rủi ro còn lại”.

Quy trình làm việc mong muốn:
- Bước 1: Audit font và encoding
- Bước 2: Khoanh vùng CSS/utility gây lỗi render tiếng Việt
- Bước 3: Sửa root cause với thay đổi nhỏ nhất đủ hiệu lực
- Bước 4: Đưa diff production-ready
- Bước 5: Tóm tắt tác động và lý do chọn phương án

Tiêu chí hoàn thành:
- Dấu tiếng Việt không lệch, không dính, không nhảy font
- Các cụm như “ƯƠ”, “ĐIỀU TRỊ”, “CHẨN ĐOÁN”, “BỆNH NHÂN”, “HƯỞNG BHYT” hiển thị tự nhiên
- Không còn fallback serif xấu
- Không phá Tailwind và không làm regress UI hiện có

Hãy làm theo phong cách production review: ưu tiên nguyên nhân gốc, chỉ ra đúng chỗ cần sửa, trả về code sẵn dùng ngay.
```
