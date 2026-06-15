# 🌐 Hướng Dẫn Truy Cập Ứng Dụng AI CDSS BHYT Qua Mạng Nội Bộ

**Cập nhật: 06/04/2026**

---

## 📋Thông Tin Server

| Tham số | Giá trị |
|--------|--------|
| **Server Hostname** | `DESKTOP-L3NS1HD` |
| **IP Nội bộ** | `192.168.100.86` |
| **Mạng** | `192.168.100.0/24` |
| **Cổng Ứng Dụng** | `8080` (Express) |
| **Cổng API** | `8000` (Python FastAPI) |
| **Trạng thái** | ✅ Online |

---

## 🚀 Cách Truy Cập

### **Từ Máy Tính Khác (Nội Bộ)**

#### Opción 1️⃣: Dùng IP Tĩnh (Khuyến Nghị)
```
http://192.168.100.86:8080
```

**✅ Ưu điểm:**
- Nhanh, ổn định
- Không phụ thuộc DNS hoặc giải pháp tên

**📋 Hướng dẫn:**
1. Mở trình duyệt (Chrome, Edge, Firefox)
2. Dán vào thanh địa chỉ: `http://192.168.100.86:8080`
3. Bấm Enter

---

#### Opción 2️⃣: Dùng Hostname (Nếu DNS Hoạt Động)
```
http://DESKTOP-L3NS1HD:8080
```

**⚠️ Lưu ý:**
- Cần máy tính hỗ trợ mDNS hoặc Active Directory
- Nếu không kết nối được, dùng IP thay thế

---

### **Từ Máy Tính Server (Máy Chủ)**
```
http://localhost:8080
```
hoặc
```
http://127.0.0.1:8080
```

---

## 🔌 API - Giám Định Tự Động

### **Truy Cập API Documentation**

```
http://192.168.100.86:8000/docs
```

**Chứa:**
- ✅ Swagger UI (giao diện tương tác)
- 📚 Danh sách tất cả endpoints
- 🧪 TestEndpoints trực tiếp từ trình duyệt

---

### **Kiểm Tra Sức Khỏe API**

```bash
curl http://192.168.100.86:8000/health
```

---

## 🛠️ Cách Chỉnh Sửa Cấu Hình

### **Nếu Cần Thay Đổi Port**

**File:** `server.js` (dòng 7)

```javascript
const PORT = process.env.PORT || 8080;  // Thay 8080 thành port khác
```

**Hoặc dùng biến môi trường:**
```bash
set PORT=9000
node server.js
```

---

## ⚠️ Troubleshooting

### **❌ Không Thể Kết Nối**

**Kiểm tra 1: Firewall**
```bash
netstat -ano | grep 8080
```

Nếu không thấy `LISTENING`, server chưa chạy.

**Kiểm tra 2: Server Có Chạy Không?**
```bash
curl http://localhost:8080/health
```

**Kiểm tra 3: Câble/WiFi**
- Đảm bảo PC khác nằm **trong cùng mạng**: `192.168.100.x`
- Ping server: `ping 192.168.100.86`

---

### **❌ Kết Nối Chậm**

- **Lý do:** Mạng tắc, máy yếu
- **Giải pháp:** Khép lại các ứng dụng không cần, restart server

```bash
# Dừng server
pkill -f "node server.js"

# Khởi động lại
cd "c:\Users\admin\Documents\Google Drive\ung_dung_cdss_bhyt"
node server.js
```

---

## 📚 Kết Nối Python API

**Từ Bất Kỳ Máy Nào Trong Mạng:**

```python
import requests

# Xem tài liệu API
response = requests.get('http://192.168.100.86:8000/docs')

# Gửi yêu cầu kiểm tra (ví dụ)
claim_data = {
    "ma_lk": "000589",
    "xml_content": "..."
}
response = requests.post(
    'http://192.168.100.86:8000/audit',
    json=claim_data
)
print(response.json())
```

---

## 🔒 Bảo Mật

### **⚠️ Chỉ Dành Cho Mạng Nội Bộ**

- **Không** để server chạy trên internet công cộng
- Nếu cần, cố định **IP thay vì public**
- Thêm **xác thực** nếu mở rộng sang bên ngoài

---

## 📞 Hỗ Trợ

| Vấn Đề | Liên Hệ |
|--------|--------|
| Server không chạy | Khởi động lại: `node server.js` |
| Port bị chiếm | Thay port, xem phần Troubleshooting |
| API lỗi | Kiểm tra: `http://192.168.100.86:8000/docs` |

---

## 🎯 Tóm Tắt Nhanh

```
┌─────────────────────────────────────────┐
│  🏥 AI CDSS BHYT - Truy Cập Nội Bộ     │
├─────────────────────────────────────────┤
│ 📱 Web App:  http://192.168.100.86:8080 │
│ 📡 API:      http://192.168.100.86:8000 │
│ 📚 Docs:     http://192.168.100.86:8000/docs │
│                                         │
│ ✅ Status:   [Online] ✓                │
│ ⚙️  Hostname: DESKTOP-L3NS1HD          │
│ 🔌 Port App: 8080                      │
│ 🔌 Port API: 8000                      │
└─────────────────────────────────────────┘
```

---

**Các máy tính khác có thể truy cập ngay bây giờ! 🚀**
