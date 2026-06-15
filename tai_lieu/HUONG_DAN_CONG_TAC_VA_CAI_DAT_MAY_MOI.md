# 📦 Hướng Dẫn Đóng Gói & Cài Đặt Ứng Dụng AI CDSS BHYT Trên Máy Khác

**Ngày tạo:** 06/04/2026
**Phiên bản:** 1.0

---

## 📋 Yêu Cầu Hệ Thống

### Trên Máy Nhận (Máy Mới)

| Thành phần | Phiên bản | Ghi chú |
|-----------|----------|--------|
| **Node.js** | ≥ 18.0 | Cần npm |
| **Python** | ≥ 3.8 | Cần pip |
| **Git** | ≥ 2.0 | Để clone/pull |
| **RAM** | ≥ 4GB | Khuyên 8GB |
| **Disk** | ≥ 2GB | Cho node_modules + Python venv |

---

## 🔧 **BƯỚC 1: Chuẩn Bị Máy MỚI**

### 1.1 Cài Node.js (Windows)
```bash
# Tải từ https://nodejs.org (LTS version)
# Chạy installer, chọn "Add to PATH"
# Kiểm tra:
node --version
npm --version
```

### 1.2 Cài Python (Windows)
```bash
# Tải từ https://python.org
# QUAN TRỌNG: Chọn "Add Python to PATH" khi cài
python --version
pip --version
```

### 1.3 Cài Git (Windows)
```bash
# Tải từ https://git-scm.com
git --version
```

---

## 📥 **BƯỚC 2: Nhận File Từ Máy Cũ**

### 2.1 Copy File ZIP

**Trên máy CŨ (máy hiện tại):**
```bash
# Sẽ có file zip ở Desktop hoặc Downloads
# Tên: ung_dung_cdss_bhyt_v1.0.zip (~50MB)
```

**Trên máy MỚI:**
```bash
# Copy file zip vào folder bạn muốn làm việc
# Ví dụ: C:\Users\<tên_bạn>\Documents\Projects\
unzip ung_dung_cdss_bhyt_v1.0.zip
cd ung_dung_cdss_bhyt
```

---

## ⚙️ **BƯỚC 3: Cài Đặt Dependencies**

### 3.1 Node.js Dependencies
```bash
# Di chuyển vào thư mục project
cd ung_dung_cdss_bhyt

# Cài npm packages
npm install --legacy-peer-deps
# (Chờ ~2-3 phút)
```

### 3.2 Python Dependencies
```bash
# Tạo virtual environment
python -m venv venv

# Kích hoạt (Windows)
venv\Scripts\activate

# Cài pip packages
pip install -r python_service/requirements.txt
# (Chờ ~1-2 phút)
```

---

## 🚀 **BƯỚC 4: Chạy Ứng Dụng Trên Máy Mới**

### 4.1 Cửa sổ Terminal 1: Express Server
```bash
# Trong thư mục project
node server.js

# Output sẽ như thế này:
# ╔════════════════════════════════════════════════════╗
# ║     🏥 AI CDSS BHYT - Hệ Thống Giám Định         ║
# ╚════════════════════════════════════════════════════╝
# ✅ Server đang chạy: http://0.0.0.0:8080
```

### 4.2 Cửa sổ Terminal 2: Python API
```bash
# Kích hoạt venv (nếu chưa kích hoạt)
venv\Scripts\activate

# Chạy API
python -m uvicorn python_service.app.main:app --host 0.0.0.0 --port 8000

# Output:
# INFO:     Uvicorn running on http://0.0.0.0:8000
```

---

## 🌐 **BƯỚC 5: Truy Cập Ứng Dụng**

### 5.1 Trên Chính Máy Mới Đó
```
http://localhost:8080
```

### 5.2 Từ Máy Khác Trong Mạng
```
http://<IP_máy_mới>:8080
```

**Để biết IP máy mới:**
```bash
# Windows
ipconfig

# Tìm "IPv4 Address" trong mạng 192.168.x.x
```

---

## 🛠️ **BƯỚC 6: Phát Triển Tiếp**

### 6.1 Cấu Trúc Thư Mục
```
ung_dung_cdss_bhyt/
├── ma_nguon/              # React Native code
│   └── tien_ich/
├── python_service/        # FastAPI backend
│   └── app/
│       └── main.py
├── tai_lieu/              # Knowledge base files
├── test_xml/              # Test audit data
├── server.js              # Express wrapper
├── package.json           # Node dependencies
├── requirements.txt       # Python dependencies
└── .git/                  # Version control
```

### 6.2 Chỉnh Sửa Code & Commit
```bash
# Tạo branch mới
git checkout -b feature/my-feature

# After editing:
git add .
git commit -m "feat: description of changes"
git push origin feature/my-feature
```

### 6.3 Cập Nhật Từ Máy Cũ (Nếu Máy Cũ Có Thay Đổi)
```bash
git pull origin main
```

---

## 🐛 **Troubleshooting**

### ❌ "npm: command not found"
**Giải pháp:** Node.js chưa cài hoặc chưa add vào PATH
- Tải Node.js từ https://nodejs.org
- Chọn "Add to PATH" khi cài

### ❌ "python: command not found"
**Giải pháp:** Python chưa cài hoặc chưa add vào PATH
- Tải Python từ https://python.org
- ✅ **IMPORTANT:** Chọn "Add Python to PATH"

### ❌ Port 8080 bị chiếm
```bash
# Tìm process dùng port 8080
netstat -ano | findstr :8080

# Kill process (thay <PID>)
taskkill /PID <PID> /F

# Hoặc dùng port khác:
set PORT=9000
node server.js
```

### ❌ Error: EADDRINUSE
```bash
# Đảm bảo cổng 8080 & 8000 không được dùng
# Restart tất cả cửa sổ terminal
```

### ❌ Python venv not activate
```bash
# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate

# Kiểm tra: terminal sẽ hiển thị (venv) ở đầu
```

---

## 📊 **Checklist Cài Đặt**

- [ ] Node.js ≥ 18.0 cài xong
- [ ] Python ≥ 3.8 cài xong
- [ ] File ZIP giải nén xong
- [ ] `npm install` chạy xong
- [ ] Python venv tạo xong
- [ ] `pip install -r requirements.txt` chạy xong
- [ ] `node server.js` chạy được
- [ ] `python -m uvicorn ...` chạy được
- [ ] Truy cập được `http://localhost:8080`
- [ ] API docs mở được `http://localhost:8000/docs`

---

## 🎯 **Điểm Quan Trọng**

| Vấn Đề | Lưu Ý |
|--------|-------|
| **Port** | Express=8080, Python=8000 (có thể đổi) |
| **Virtual Env** | Python cần venv để tránh conflict |
| **Node Modules** | ~800MB, sẽ tải lại khi cài - không cần gửi |
| **IP Mạng** | Mỗi máy có IP khác, dùng `ipconfig` để xem |
| **Git** | Dùng để sync code giữa 2 máy |

---

## 📞 **Liên Hệ Hỗ Trợ**

Nếu gặp lỗi:
1. Kiểm tra version: `node -v`, `python --version`, `npm -v`
2. Xem log lỗi chi tiết
3. Thử restart terminal & tất cả service
4. Xem phần **Troubleshooting** ở trên

---

**Chúc bạn phát triển vui vẻ! 🚀**
