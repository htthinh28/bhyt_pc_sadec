# Giao ban — Kết nối Python service (CDSS BHYT)

## 1. Mục tiêu

- Tự động thử kết nối **Python service** (FastAPI) mỗi lần khởi động ứng dụng, không phụ thuộc việc người dùng có mở màn **Tổng quan** hay không.
- Hoạt động ổn khi **mạng internet ngoài** bật hoặc tắt: Python thường chạy **localhost** hoặc **LAN**, không phải dịch vụ cloud bắt buộc có Internet.

## 2. Giải pháp kỹ thuật đã triển khai

**Khởi động app:** Sau khi lớp điều hướng sẵn sàng, gọi `kichHoatKetNoiPythonSauKhoiDongUngDung()` — dùng `ketNoiPythonServiceLucKhoiDong()` (thử lại nhiều lần, chờ cold-start service).

**Cấu hình:** Chỉ chạy warm-up nếu `expo.extra.pythonService.enabled !== false` trong `app.json`.

**Sau khi dùng app:** Đăng ký `AppState` → khi app trở lại **active**, thử lại kết nối (có debounce để tránh gọi dồn).

**Web:** Lắng nghe sự kiện `window.online` — khi mạng trở lại, thử lại (hữu ích khi `baseUrl` trỏ tới **IP LAN**).

**Online / offline:** Không dùng `navigator.onLine` làm điều kiện bắt buộc. Khi “offline Internet”, vẫn có thể tới `127.0.0.1`, `10.0.2.2` (Android emulator), hoặc IP máy chủ Python trên LAN.

## 3. Kiến nghị vận hành

1. Trên máy chạy Python: `npm run py:start` (uvicorn cổng **8000**, `--host 0.0.0.0`).
2. **Điện thoại thật:** đặt `app.json` → `extra.pythonService.baseUrl` = `http://<IP máy tính>:8000` — không dùng `127.0.0.1` trên điện thoại để trỏ về PC.
3. **Tắt** warm-up tự động (nếu cần): `pythonService.enabled: false` trong `app.json`.
4. Kiểm tra nhanh: màn **Helper** hoặc **Tổng quan** (thẻ Python / smoke test).

## 4. Hướng nâng cấp (tùy chọn)

- Cài `@react-native-community/netinfo` nếu cần phân tích chi tiết “mất WiFi” so với “Python service chưa chạy”.
- Môi trường production: cấu hình `baseUrl` cố định và TLS nếu Python deploy riêng.

## 5. Câu chốt giao ban

Chúng ta tự động warm-up và định kỳ thử lại kết nối Python ngay khi app khởi động và khi người dùng quay lại app hoặc mạng trở lại; không phụ thuộc Internet toàn cầu vì engine Python là dịch vụ cục bộ hoặc LAN — chỉ cần chạy đúng service và cấu hình đúng IP trên thiết bị thật.

---
*Tài liệu nội bộ CDSS BHYT — đồng bộ với mã nguồn `hybrid_python_helper.jsx` và `tuyen_duong.jsx`.*
