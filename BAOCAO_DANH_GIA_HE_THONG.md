# ĐẶC TẢ KỸ THUẬT HỆ THỐNG CDSS BHYT

Phiên bản tài liệu: 1.1  
Ngày cập nhật: 02/04/2026

---

## 1. Mục tiêu tài liệu

Tài liệu này mô tả đầy đủ kiến trúc kỹ thuật, thành phần chức năng, luồng dữ liệu, mô hình lưu trữ, cơ chế tích hợp và yêu cầu vận hành của hệ thống CDSS BHYT đang triển khai trong mã nguồn hiện tại.

Mục tiêu sử dụng:

- Làm tài liệu bàn giao cho đội phát triển, triển khai và vận hành.
- Làm chuẩn tham chiếu khi mở rộng màn hình, thêm luật hoặc thay đổi luồng dữ liệu.
- Giảm phụ thuộc vào hiểu biết truyền miệng giữa các cá nhân trong nhóm.

---

## 2. Phạm vi hệ thống

Hệ thống CDSS BHYT là ứng dụng hỗ trợ tiếp nhận, kiểm tra, chỉnh sửa, lưu trữ và thống kê hồ sơ XML BHYT. Ứng dụng chạy theo mô hình local-first, có khả năng đồng bộ các danh mục và bộ luật lên Firebase khi cần.

Phạm vi nghiệp vụ chính:

- Đăng nhập và phân quyền truy cập theo vai trò.
- Tiếp nhận hồ sơ XML BHYT và bóc tách XML1-XML6.
- Kiểm tra hồ sơ theo mô hình 5 tầng.
- Quản lý danh mục nội bộ, danh mục Bộ Y tế và bộ luật kiểm tra.
- Lưu kho hồ sơ, truy xuất chi tiết, sửa hồ sơ và kiểm tra lại.
- Tổng hợp báo cáo, thống kê chất lượng và xuất Excel.
- Sao lưu, phục hồi và đồng bộ dữ liệu cấu hình với Firebase.

---

## 3. Công nghệ và nền tảng

### 3.1. Nền tảng ứng dụng

- Framework UI: React Native 0.81.5
- Runtime ứng dụng: Expo SDK 54
- React: 19.1.0
- Điều hướng: @react-navigation/native + native-stack
- Web runtime: react-native-web
- Lưu trữ cục bộ: IndexedDB trên web, AsyncStorage trên mobile
- Đồng bộ cloud: Firebase v12 (Firestore + Auth)
- Xuất báo cáo: thư viện xlsx

### 3.2. Script vận hành hiện có

- `npm run start`: chạy ứng dụng cổng 8081
- `npm run web`: chạy web qua Expo
- `npm run lint`: lint + kiểm tra encoding + font
- `npm run vi:check`: kiểm tra chuỗi tiếng Việt không dấu
- `npm run text:check`: kiểm tra đồng thời encoding, diacritics, font
- `npm run firebase:deploy-rules`: đẩy firestore rules
- `npm run firebase:emulators`: chạy giả lập Firestore
- `npm run qa:xml-real`: kiểm thử dữ liệu XML thực
- `npm run qa:strict-flow`: kiểm tra luồng thao tác thủ công nghiêm ngặt

---

## 4. Kiến trúc tổng thể

### 4.1. Điểm vào ứng dụng

Luồng khởi động hiện tại:

`App.jsx` → `DieuHuongChinh` → các màn hình trong `ma_nguon/man_hinh`

Thành phần chính:

- `App.jsx`: thiết lập font an toàn cho tiếng Việt, bọc `SafeAreaProvider` và `ChuDeProvider`.
- `ma_nguon/dieu_huong/tuyen_duong.jsx`: định nghĩa toàn bộ route, deep link web và cơ chế chặn truy cập theo RBAC.
- `ma_nguon/tien_ich`: chứa phần lớn nghiệp vụ lõi, lưu trữ, Firebase, engine luật và tiện ích hệ thống.
- `ma_nguon/man_hinh`: chứa giao diện nghiệp vụ chính.

### 4.2. Kiến trúc lớp

Hệ thống đang vận hành theo mô hình phân lớp thực dụng:

1. Lớp giao diện
   - Các file trong `ma_nguon/man_hinh`
   - Chịu trách nhiệm nhập liệu, hiển thị danh sách, hiển thị cảnh báo, thao tác điều hướng

2. Lớp điều hướng và kiểm soát truy cập
   - `ma_nguon/dieu_huong/tuyen_duong.jsx`
   - `ma_nguon/tien_ich/rbac_engine.jsx`

3. Lớp nghiệp vụ và luật
   - Rule engine DVKT no-code
   - Các bộ luật hardcoded theo chuyên đề
   - Các tiện ích kiểm tra XML, chuẩn hóa và đánh giá lỗi

4. Lớp lưu trữ và tích hợp
   - `ma_nguon/tien_ich/kho_du_lieu.jsx`
   - `ma_nguon/tien_ich/firebase_cloud_bhyt.jsx`
   - `ma_nguon/tien_ich/sao_luu_du_lieu_he_thong.jsx`

### 4.3. Định hướng kỹ thuật hiện tại

- Ứng dụng local-first: dữ liệu thao tác chủ yếu nằm ở máy người dùng.
- Firebase đóng vai trò đồng bộ dữ liệu cấu hình và chia sẻ dataset, không phải backend xử lý nghiệp vụ trung tâm đầy đủ.
- Thư mục `app/` theo Expo Router vẫn mang tính starter template; nghiệp vụ thật đang đi qua `App.jsx` và `ma_nguon/`.

---

## 5. Sơ đồ module chức năng

### 5.1. Các route đang khai báo trong điều hướng chính

Hệ thống hiện có 20 route nghiệp vụ chính:

1. `DangNhap`
2. `TongQuan`
3. `Helper`
4. `PhanQuyenTruyCap`
5. `DocXML`
6. `ChiTiet`
7. `SuaFileXML`
8. `KhoLuuTru`
9. `QuanLyLuat`
10. `QuanLyQuyTacOnOff`
11. `QuanLyDanhMuc`
12. `DanhMucBYTMain`
13. `QuanLyChuyenMon`
14. `BaoCaoVaThongKe`
15. `XML1`
16. `XML2`
17. `XML3`
18. `XML4`
19. `XML5`
20. `XML6`

### 5.2. Nhóm chức năng

#### A. Nhóm truy cập và hệ thống

- Đăng nhập
- Tổng quan
- Helper hệ thống
- Phân quyền truy cập

#### B. Nhóm xử lý hồ sơ

- Đọc file XML
- Chi tiết ca bệnh
- Sửa file XML
- Kho lưu trữ

#### C. Nhóm quản trị danh mục và luật

- Quản lý luật
- Quản lý quy tắc ON/OFF
- Quản lý danh mục
- Danh mục Bộ Y tế

#### D. Nhóm chuyên môn và báo cáo

- Quản lý chuyên môn
- Báo cáo và thống kê

#### E. Nhóm XML chi tiết

- XML1
- XML2
- XML3
- XML4
- XML5
- XML6

---

## 6. Đặc tả từng nhóm thành phần

### 6.1. Đăng nhập và phiên làm việc

Chức năng:

- Xác thực người dùng cục bộ.
- Thiết lập phiên làm việc qua `USER_ACCOUNT`, `USER_ROLE` trong AsyncStorage.
- Hỗ trợ đường vào khẩn cấp cho tài khoản admin khi tầng tài khoản cục bộ không khả dụng.
- Ghi nhật ký đăng nhập thành công/thất bại.

Yêu cầu kỹ thuật:

- Email được chuẩn hóa về lowercase.
- Có kiểm tra định dạng email ở luồng tạo tài khoản quản trị.
- Vai trò người dùng chỉ được dùng làm fallback khi RBAC binding của tài khoản đó chưa tồn tại.

### 6.2. Tổng quan

Chức năng:

- Điểm vào sau đăng nhập.
- Hiển thị các phân hệ nghiệp vụ.
- Điều hướng sang từng màn hình theo quyền đã cấp.
- Hỗ trợ các tác vụ nhanh như làm mới kho dữ liệu.
- Ghi nhật ký thao tác quan trọng.

### 6.3. Phân quyền truy cập

Chức năng:

- Tạo tài khoản người dùng.
- Khóa/mở khóa tài khoản.
- Gán vai trò, nhóm, quyền thao tác theo tài nguyên.
- Quản lý ma trận quyền theo action: VIEW, CREATE, UPDATE, DELETE, EXPORT.
- Theo dõi nhật ký thao tác phân quyền.

Đặc điểm kỹ thuật:

- Hệ RBAC được seed mặc định trong `rbac_engine.jsx`.
- Vai trò, nhóm, matrix và user bindings đều lưu cục bộ.
- Điều hướng chính kiểm tra quyền màn hình bằng `coQuyenManHinh(...)` trước khi cho truy cập.

### 6.4. Helper hệ thống

Chức năng:

- Hướng dẫn vận hành chuẩn cho người dùng.
- Kiểm tra trạng thái Firebase đọc/ghi.
- Đồng bộ tất cả danh mục và quy tắc lên Firebase.
- Tải dữ liệu cấu hình từ Firebase về máy.
- Kiểm tra/dọn chunk mồ côi trên Firebase.
- Xuất và nhập backup JSON để sao lưu/phục hồi hệ thống.

### 6.5. Đọc XML, chi tiết hồ sơ và sửa XML

Chức năng:

- Nạp hồ sơ XML BHYT.
- Bóc tách dữ liệu XML1-XML6.
- Hiển thị cảnh báo và kết quả kiểm tra.
- Chỉnh sửa hồ sơ, kiểm tra lại trước khi lưu.
- Truy xuất chi tiết ca bệnh để rà soát lỗi.

Nguồn XML thực tế đã xác minh theo mã nguồn:

- Điểm nhập hồ sơ đang dùng trong luồng nghiệp vụ là `ma_nguon/tien_ich/nhap_file_xml.jsx`.
- Hàm được gọi ở UI là `xuLyFileXML130`, nhưng `ma_nguon/dich_vu/his_api.jsx` chỉ đóng vai trò lớp bọc tương thích; parser XML thật nằm ở `ma_nguon/tien_ich/xml_helper.jsx`.
- `xml_helper.jsx` hỗ trợ 3 kiểu đầu vào: XML gói `HOSO/FILEHOSO` có `NOIDUNGFILE` base64, XML chỉ có danh sách `FILEHOSO`, và XML trực tiếp không qua bao gói.
- Ánh xạ tag nguồn sang bảng nội bộ được khóa tại `MAP_TAG_THEO_XML` trong `xml_helper.jsx`. Luồng chuẩn đang ưu tiên XML1-XML6, ngoài ra có nhận diện thêm XML11 cho một số trường hợp liên quan hồ sơ phụ.
- Các màn hình quản lý XML riêng lẻ hiện lưu và đọc từ các key cục bộ chuyên dụng: `DATA_XML1_130`, `DATA_XML2_THUOC`, `DATA_XML3_DVKT_VTYT`, `DATA_XML4_CAN_LAM_SANG`, `DATA_XML5_DIEN_BIEN`, `DATA_XML6_THANH_TOAN`.
- Bộ kiểm tra cấu trúc chạy trực tiếp trong luồng nhập là `kiemTraDinhDangXML` tại `ma_nguon/tien_ich/kiem_tra_xml.jsx`, bám `CAU_TRUC_DU_LIEU` từ `quyluat_cau_truc_du_lieu.jsx` và các file chuẩn `xml1.jsx` đến `xml6.jsx`.
- Bộ `ma_nguon/dich_vu/bo_kiem_tra_xml.jsx` vẫn còn được dùng trong `ma_nguon/man_hinh/sua_file_xml.jsx` để kiểm tra lại hồ sơ trước khi lưu/xuất, nhưng không phải entry validator chính của luồng nhập mới.

### 6.6. Kho lưu trữ

Chức năng:

- Lưu hồ sơ đã nhập vào kho dữ liệu cục bộ.
- Tìm kiếm, lọc, truy xuất và theo dõi số lượng hồ sơ.
- Là nguồn dữ liệu đầu vào chính cho module báo cáo.

### 6.7. Quản lý luật, quy tắc ON/OFF và danh mục

Chức năng:

- Quản lý bộ luật nghiệp vụ.
- Bật/tắt quy tắc kiểm tra theo chuyên đề.
- Quản lý danh mục nội bộ và tham chiếu Bộ Y tế.
- Seed và đồng bộ các dataset phục vụ rule engine DVKT.

### 6.8. Báo cáo và thống kê

Chức năng:

- Tổng hợp hồ sơ trong kho theo kỳ thời gian.
- Thống kê lỗi theo khoa, bác sĩ, quy tắc và xu hướng.
- Tính KPI chất lượng và chi phí ước tính.
- Xuất báo cáo vi phạm nhanh theo mẫu sheet `DS_Loi`.
- Xuất báo cáo thống kê nhiều sheet phục vụ quản trị và đối soát.

### 6.9. XML1-XML6 chi tiết

Chức năng:

- Quản lý từng bảng dữ liệu chi tiết theo chuẩn XML BHYT.
- Hỗ trợ hiển thị, chỉnh sửa và rà soát dữ liệu theo cấu trúc từng bảng.

---

## 7. Mô hình dữ liệu nghiệp vụ

### 7.1. Hồ sơ bệnh án BHYT

Một hồ sơ trong hệ thống là bản ghi tổng hợp chứa ít nhất:

- Mã lượt khám `ma_lk`
- Dữ liệu XML1
- Dữ liệu XML2
- Dữ liệu XML3
- Dữ liệu XML4
- Dữ liệu XML5
- Dữ liệu XML6
- Kết quả kiểm tra / danh sách lỗi
- Metadata lưu trữ và thời điểm xử lý

Tùy màn hình, cấu trúc hồ sơ có thể được chuẩn hóa lại trước khi lưu để đảm bảo thống nhất văn bản và cảnh báo.

### 7.2. Danh mục và dataset luật

Hệ thống đang sử dụng nhiều dataset lưu cục bộ, gồm các nhóm chính:

- `CDSS_DATA_*`: dữ liệu luật và bộ cột
- `DANH_MUC_*`: danh mục nội bộ
- `BYT_7603_*`: danh mục Bộ Y tế
- `DVKT_*`: dữ liệu phục vụ engine DVKT no-code

Ví dụ các khóa quan trọng của DVKT engine:

- `DVKT_RULES`
- `DVKT_DMKT`
- `DVKT_INTERNAL_APPROVAL`
- `DVKT_EQUIPMENT`
- `DVKT_STAFF`
- `DVKT_SERVICE_PRACTITIONER_MAP`
- `DVKT_CLAIM_RESULTS`

Các nguồn luật và key lưu trữ đã xác minh:

- Bộ luật động tổng quát của hệ thống được đọc chủ yếu từ `CDSS_DATA_<TAB_ID>` và `CDSS_COLS_<TAB_ID>`.
- Với nhóm luật dữ liệu, seed hiện được đổ song song vào hai alias `CDSS_DATA_LUAT_DU_LIEU` và `CDSS_DATA_XML_DATA` để tương thích cả màn hình quản trị cũ và alias tab mới.
- Màn hình `quan_ly_luat.jsx` và `quan_ly_quy_tac_on_off.jsx` đều có cơ chế tìm alias tab như `LUAT_DU_LIEU` <-> `XML_DATA`, `LUAT_THUOC` <-> `XML2`, `LUAT_CDHA` <-> `XML3`, `LUAT_GIUONG` <-> `NOI_TRU`.
- Seed luật dữ liệu mức 1 hiện được duy trì tại `ma_nguon/tien_ich/du_lieu_luat_du_lieu_muc1.jsx` và migration cập nhật nằm ở `ma_nguon/tien_ich/seed_luat_du_lieu_muc1.jsx`.
- Bản hardcoded luật dữ liệu không phải nguồn riêng biệt độc lập; `ma_nguon/tien_ich/luat_du_lieu_hardcoded.jsx` thực chất bọc lại `DU_LIEU_SEED_LUAT_DU_LIEU_MUC1` làm fallback builtin.

### 7.3. Dữ liệu báo cáo

Module báo cáo lấy trực tiếp từ kho hồ sơ cục bộ và tính toán động:

- Tổng hồ sơ trong kho
- Hồ sơ trong kỳ
- Hồ sơ có lỗi
- Tổng lỗi
- Chi phí ước tính theo mức độ lỗi
- Thống kê theo khoa, bác sĩ, quy tắc và xu hướng

Ngoài số liệu tổng hợp, hệ thống còn sinh báo cáo vi phạm chi tiết theo từng lỗi phát hiện trên từng hồ sơ. Mỗi dòng báo cáo vi phạm được dựng từ:

- `ma_lk` của hồ sơ
- Tên bệnh nhân lấy ưu tiên từ `ten_bn`, `ten_benh_nhan`, hoặc `xml1.HO_TEN`
- Mã luật vi phạm
- Tên quy tắc vi phạm
- Nội dung cảnh báo

---

## 8. Kiến trúc lưu trữ dữ liệu

### 8.1. Web

Trên web, kho hồ sơ sử dụng IndexedDB:

- Database: `CDSS_HO_SO_DB`
- Object store: `ho_so`
- Khóa chính: `ma_lk`

Lý do chọn IndexedDB:

- Phù hợp với dung lượng lớn hơn localStorage.
- Đủ khả năng lưu hàng nghìn hồ sơ XML.
- Giảm nguy cơ vượt giới hạn mỗi key.

Ứng dụng có cơ chế migrate dữ liệu cũ từ localStorage sang IndexedDB ở lần chạy đầu tiên.

### 8.2. Mobile

Trên mobile, dữ liệu lưu bằng AsyncStorage theo cơ chế index-detail và chia chunk để vượt giới hạn kích thước mỗi key.

Các khóa lõi:

- `CDSS_KHO_INDEX_MA_LK`
- `CDSS_HS_<ma_lk>`
- `CDSS_HS_<ma_lk>_CHUNKS`
- `CDSS_HS_<ma_lk>_CHUNK_<index>`

### 8.3. Dữ liệu cấu hình hệ thống

Các nhóm dữ liệu sau cũng được lưu cục bộ bằng AsyncStorage/local storage logic hiện có:

- Phiên người dùng
- Vai trò người dùng
- RBAC resources/roles/groups/matrix/user bindings
- Danh mục, luật, cấu hình báo cáo, trạng thái tab, metadata Firebase

---

## 9. Xác thực, phân quyền và bảo vệ điều hướng

### 9.1. Phiên đăng nhập

Hệ thống xác định trạng thái đăng nhập qua cặp khóa phiên chuẩn:

- `USER_ACCOUNT`
- `USER_ROLE`

Việc đọc, ghi và xóa phiên hiện được chuẩn hóa qua module dùng chung để đồng bộ cả web localStorage và AsyncStorage. Nếu không có đủ hai khóa này, điều hướng sẽ reset về màn hình `DangNhap`.

### 9.2. RBAC

RBAC được định nghĩa trong `ma_nguon/tien_ich/rbac_engine.jsx` với 5 thành phần dữ liệu:

- `RESOURCES`
- `ROLES`
- `GROUPS`
- `MATRIX`
- `USER_BINDINGS`

Actions chuẩn:

- `VIEW`
- `CREATE`
- `UPDATE`
- `DELETE`
- `EXPORT`

Ví dụ vai trò seed mặc định:

- Admin
- Bác sĩ điều trị
- Điều dưỡng
- Kế toán
- Quản lý chất lượng
- Trưởng khoa

### 9.3. Bảo vệ route

`DieuHuongChinh` thực hiện:

- Từ chối route nghiệp vụ khi chưa đăng nhập.
- Chặn quay lại `DangNhap` nếu đã có phiên hợp lệ.
- Kiểm tra `coQuyenManHinh(...)` trước khi cho vào màn hình được bảo vệ.

---

## 10. Rule engine và luồng kiểm tra hồ sơ

### 10.1. Mô hình kiểm tra 5 tầng

Hệ thống vận hành theo 5 tầng kiểm tra nghiệp vụ:

1. Hành chính và định danh hồ sơ
2. Liên kết XML1-XML6
3. Danh mục, phạm vi, điều kiện thanh toán
4. Lâm sàng, thời điểm và chi phí
5. Luật cấu hình động và quy tắc chuyên đề

### 10.2. Engine DVKT no-code

File lõi: `ma_nguon/tien_ich/rule_engine_dvkt_no_code.jsx`

Nhiệm vụ:

- Seed dữ liệu DVKT mặc định.
- Đồng bộ/hydrate dữ liệu DVKT với Firebase.
- Quản lý tập luật DVKT theo operator.
- Thực thi các operator nghiệp vụ cho DVKT.

Các operator nổi bật đang khai báo:

- `CHECK_ICD_INDICATION`
- `CHECK_ICD_CONTRAINDICATION`
- `CHECK_PHAMVI`
- `CHECK_EQUIPMENT`
- `CHECK_PRICE`
- `CHECK_VALIDITY`
- `CHECK_INTERNAL_APPROVAL`
- `CHECK_SERVICE_PRACTITIONER_MAPPING`
- `CHECK_CATALOG_NAME_MATCH`
- `CHECK_CATALOG_PRICE_CONFIG`
- `CHECK_CATALOG_DECISION`

Nguồn rule thực tế và thứ tự ưu tiên:

- Trước khi load rule động, `dong_co_giam_dinh.jsx` luôn gọi `damBaoSeedLuatDuLieuMuc1()` và `damBaoSeedLuatPtttMuc11()` để seed/migrate dữ liệu luật vào storage cục bộ.
- Sau bước seed, engine quét toàn bộ key `CDSS_DATA_*` trong AsyncStorage để xác định các tab luật đang tồn tại thực sự.
- Với từng tab, engine ưu tiên lấy dữ liệu quản trị từ storage qua `CDSS_DATA_<TAB_ID>` hoặc alias tương đương. Chỉ khi storage không có dữ liệu thì mới rơi về các loader hardcoded như `layDanhSachLuatDuLieuHardcoded`, `layDanhSachLuatThuocHardcoded`, `layDanhSachLuatCdhaHardcoded`.
- Riêng nhóm `LUAT_DU_LIEU/XML_DATA`, fallback hardcoded cuối cùng vẫn là dữ liệu từ `du_lieu_luat_du_lieu_muc1.jsx`, không phải một bộ luật khác.
- Nhóm DVKT no-code dùng cụm key riêng `DVKT_*`, trong đó `DVKT_RULES` là bộ rule operator, còn các key như `DVKT_DMKT`, `DVKT_EQUIPMENT`, `DVKT_STAFF`, `DVKT_SERVICE_PRACTITIONER_MAP`, `DVKT_PHAMVI_MAPPING` là dataset tham chiếu cho engine.
- Các bảng `DVKT_*` có thể hydrate từ Firebase qua `hydrateDvktTableFromFirebase` hoặc fallback về dữ liệu builtin khai báo sẵn trong `rule_engine_dvkt_no_code.jsx`.

### 10.3. Bộ luật hardcoded

Ngoài DVKT no-code, hệ thống còn nhiều bộ luật hardcoded theo chuyên đề, ví dụ:

- Luật dữ liệu
- Luật hành chính
- Luật thuốc
- Luật giường
- Luật CDHA
- Luật hợp đồng
- Luật nhân sự
- Luật kiểm tra chuyên đề

Lưu ý quan trọng khi xác định nguồn rule:

- Trong runtime hiện hành, hardcoded chỉ là tầng fallback hoặc tầng hợp nhất cho một số tab chuyên đề; không thể mặc định coi mọi kết quả kiểm tra đều đi trực tiếp từ file hardcoded.
- Nguồn đang chi phối kết quả thực tế thường là dữ liệu đã nằm trong `CDSS_DATA_*` sau khi seed hoặc sau khi người quản trị chỉnh trên màn hình quản lý luật.
- Vì vậy khi rà soát sai lệch rule, cần kiểm tra đồng thời 3 lớp: seed file, migration seed và dữ liệu đang tồn tại trong storage/Firebase.

### 10.4. ON/OFF rule control

Màn hình Quản lý quy tắc ON/OFF cho phép bật tắt từng luật theo nhu cầu vận hành mà không phải sửa mã nguồn mỗi lần thay đổi cấu hình áp dụng.

### 10.5. Kết quả đối chiếu trường QĐ 130 và QĐ 3176

Đối chiếu trực tiếp giữa `du_lieu_luat_du_lieu_muc1.jsx` với bộ cột chuẩn `xml1.jsx` đến `xml6.jsx` cho thấy 3 nhóm tham chiếu khác nhau:

- Nhóm bám đúng schema chuẩn XML1-XML6: có thể giữ nguyên nếu công thức và cú pháp engine hợp lệ.
- Nhóm không nằm trong schema QĐ nhưng được engine nội suy có chủ đích: hiện xác minh được rõ nhất là `SO_NGAY` ở XML2, được sinh bởi `enrichXML2Data()` từ `LIEU_DUNG` và `SO_LUONG` để phục vụ audit số ngày sử dụng thuốc. Đây là field runtime mở rộng, không phải field XML gốc.
- Nhóm không có trong schema chuẩn và cũng không được parser/engine cấp phát trong luồng nhập XML hiện hành: đây là nguồn gây lệch chuẩn thực sự.

Các field lệch chuẩn đã xác minh trong seed luật dữ liệu mức 1:

- XML1: `MA_LYDO_VVIEN`, `MUC_HUONG`, `T_GIUONG`, `T_KHAM`, `T_CLS`, `NGAY_RA_MO`.
- Ngoài phạm vi parser chuẩn hiện tại: `XML9.TU_NGAY`, `XML11.TEN_CHA_ME`.
- XML3 dùng sai tên cột giá: `DON_GIA` trong khi schema chuẩn hiện hành chỉ có `DON_GIA_BV` và `DON_GIA_BH`.

Các field mở rộng nội bộ cần quản trị riêng, không nên nhầm với field XML theo QĐ:

- `ID`, `ID_XML2`, `STT_NHOM`, `LOAI_THUOC` xuất hiện trong một số rule như khóa liên kết hoặc metadata thao tác màn hình, nhưng không phải cột XML chuẩn do `xml_helper.jsx` parse ra.
- Nếu tiếp tục dùng nhóm field này, cần coi đó là quy tắc nội bộ của ứng dụng chứ không phải đối chiếu pháp lý trực tiếp với QĐ 130/3176.

Hành động đã thực hiện sau đối chiếu:

- Đã loại khỏi seed các rule bám field không có trong schema/parser chuẩn như `XML_05`, `XML_06`, `XML_30`, `XML_31`, `XML_51`, `XML_52`, `XML_58`, `XML_65`, `XML_89`, `XML_94`, `XML_113`.
- Đã sửa các rule `XML_26`, `XML_79`, `XML_87`, `XML_137` để đổi `DON_GIA` sai chuẩn sang `DON_GIA_BV` hoặc `DON_GIA_BH` theo XML3 thực tế.
- Đã loại tiếp khỏi seed các rule chỉ dựa trên khóa nội bộ như `XML_117`, `XML_118`, `XML_126`, `XML_127`, `XML_133`, `XML_135`, `XML_139`, `XML_140` để bộ luật mức 1 không còn phụ thuộc vào metadata `ID`, `ID_XML2`, `STT_NHOM`, `DS_XML2` không thuộc XML gốc.

Kết quả chạy thực tế trên hồ sơ `QD130_94170_202603_202603191106_PC-022505334.xml` (`MA_LK = 403538`):

- Trước khi thêm lớp tương thích XML5 cũ trong parser, hồ sơ phát sinh 47 cảnh báo; trong đó 36 cảnh báo đến từ chênh lệch cấu trúc XML5 giữa hồ sơ nguồn và schema `xml5.jsx` hiện hành.
- Hồ sơ cũ đang mang các cột `DIEN_BIEN_LS`, `GIAI_DOAN_BENH`, `NGUOI_THUC_HIEN`, `THOI_DIEM_DBLS`, trong khi schema hiện hành yêu cầu `DIEN_BIEN`, `NGAY_YL`, `MA_BAC_SI`, `MA_KHOA`.
- Đã bổ sung lớp tương thích trong `xml_helper.jsx` để map `DIEN_BIEN_LS -> DIEN_BIEN`, `THOI_DIEM_DBLS -> NGAY_YL`, `NGUOI_THUC_HIEN -> MA_BAC_SI`, đồng thời fallback `MA_KHOA` từ `XML1.MA_KHOA` cho hồ sơ lịch sử.
- Sau vá, cùng hồ sơ `403538` chỉ còn 11 cảnh báo (`1 Error`, `10 Warning`), tức đã triệt tiêu toàn bộ 36 cảnh báo cấu trúc XML5 giả.

Phân loại 11 cảnh báo còn lại của hồ sơ `403538`:

- Nhóm lỗi dữ liệu thời gian thực sự cần sửa: `XML3-TIME-THYL-BEFORE-YL`.
- Nhóm sai lệch kế toán/tổng hợp chi phí: `HC_130`, `XML_54`.
- Nhóm nghi vấn kê đơn/sử dụng thuốc: `THUOC_345` (2 lần), `XML_121`.
- Nhóm pháp lý/chữ ký hồ sơ: `HC_97`.
- Nhóm nhất quán nhân sự phẫu thuật: `HC_180`, `HC_224`.
- Nhóm ràng buộc hợp đồng/chất lượng dữ liệu: `HD_09`, `HD_10`.

Checklist xử lý theo bộ phận cho 11 cảnh báo còn lại của hồ sơ `403538`:

- HIS / Adapter dữ liệu:
- [ ] Kiểm tra và sửa timestamp dòng XML3 số 2 cho cảnh báo `XML3-TIME-THYL-BEFORE-YL`; xác nhận `NGAY_TH_YL` không nhỏ hơn `NGAY_YL`.
- [ ] Kiểm tra bước tổng hợp tiền VTYT từ XML3 sang XML1 cho cảnh báo `XML_54`.
- [ ] Kiểm tra XML4 có thực sự thiếu `CHI_SO_XN_BT` cho cảnh báo `HD_10`; nếu do nguồn CLS không xuất trường này thì sửa adapter HIS.

- Kế toán BHYT:
- [ ] Đối chiếu `SO_NGAY_DTRI`, `NGAY_VAO`, `NGAY_RA` cho cảnh báo `HC_130`; chốt quy ước khai `0` hay `1` với hồ sơ trong ngày.
- [ ] Đối chiếu lại tổng tiền VTYT ở XML1 với cộng dồn chi tiết XML3 cho cảnh báo `XML_54` sau khi HIS xác nhận dữ liệu nguồn.

- Dược:
- [ ] Rà soát 2 dòng thuốc mã `40.750` của cảnh báo `THUOC_345`; nếu chẩn đoán không thuộc `R14` thì xử lý như nguy cơ xuất toán thực chất.
- [ ] Kiểm tra cảnh báo `XML_121` để xác nhận có kê trùng thuốc cùng ngày hay chỉ là tách dòng kỹ thuật do HIS.

- Phẫu thuật:
- [ ] Xác nhận chữ ký số lãnh đạo trên XML7 cho cảnh báo `HC_97`.
- [ ] Rà soát ê-kíp mổ trong XML8 cho cảnh báo `HC_180` và `HC_224`; nếu bác sĩ chính trùng phụ mổ thì sửa dữ liệu nhân sự hồ sơ.

- Pháp chế:
- [ ] Đối chiếu `MA_PTTT` với điều khoản hợp đồng hiện hành cho cảnh báo `HD_09`.
- [ ] Nếu đơn vị không thanh toán theo giá dịch vụ, cập nhật lại rule hoặc phụ lục hợp đồng thay vì ép sửa hồ sơ đúng theo cảnh báo `HD_09`.

Kết quả mở rộng lớp tương thích ngoài XML5 trên hồ sơ `PC022602974_ER26000392.xml` (`MA_LK = ER26000392`):

- Đã bổ sung alias XML1 cũ trong parser để map `MATIX_CU_TRU -> MATINH_CU_TRU` và `NAM_NAM_LIENWTUC -> NAM_NAM_LIEN_TUC`.
- Sau vá, hồ sơ giảm từ 10 xuống còn 8 cảnh báo; hai cảnh báo `XML1-UNKNOWN-MATIX_CU_TRU` và `XML1-UNKNOWN-NAM_NAM_LIENWTUC` đã biến mất.
- Cảnh báo `XML1-REQ-MA_DOITUONG_KCB` vẫn còn vì dữ liệu nguồn có trường nhưng đang để rỗng, đây là lỗi dữ liệu thật chứ không phải chênh tên cột.
- Các cảnh báo còn lại của hồ sơ ER26000392 chủ yếu là nhóm thiếu XML2 trong khi XML1 vẫn có tiền thuốc (`HC_68`, `XML_88`) và lệch tổng hợp chi phí (`XML_49`, `XML_53`, `XML_54`).

Phạm vi audit toàn hệ thống còn lại (ngoài phần dữ liệu/XML đã audit xong):

- Bộ máy runtime `dong_co_giam_dinh.jsx` hiện nạp đồng thời các family hardcoded: dữ liệu, hành chính, thuốc, hợp đồng, công khám, giường, CDHA, nhân sự, kiểm tra chuyên đề; đồng thời nạp seed động mức 1 và mức 11, và gọi thêm engine DVKT no-code.
- Giao diện quản trị `bo_luat_bhyt.jsx` đang phản ánh 12 tab nghiệp vụ thực tế: dữ liệu XML, hành chính, khám bệnh, DVKT/CDHA, thuốc, nhập viện/chuyển tuyến, nội trú/giường, PTTT, gây mê, hậu phẫu/nhân sự, xuất viện/hợp đồng, tài liệu/khác.
- Quy mô rule hiện có trong repo ở nhóm seed/hardcoded chính: dữ liệu/XML khoảng `112` rule, hành chính `248`, thuốc `539`, PTTT `2321`, hợp đồng `23`, công khám `58`, giường `77`, CDHA `332`, nhân sự `15`, kiểm tra chuyên đề `603`, DVKT no-code `15` operator rule.
- Riêng `luat_thuoc_hardcoded.jsx` đang là wrapper bọc lại seed `du_lieu_luat_thuoc_muc8.jsx`, tức họ thuốc đã có nguồn chuẩn tương đối rõ. Các họ khác như hợp đồng, công khám, giường, CDHA, nhân sự, kiểm tra chuyên đề vẫn cần audit pháp lý family-by-family.
- Vì vậy, kết luận đúng ở thời điểm hiện tại là: phần audit dữ liệu/XML đã hoàn tất và đã kiểm thực tế trên hồ sơ mẫu; còn audit pháp lý toàn diện end-to-end cho toàn bộ family rule của hệ thống vẫn chưa hoàn tất.
- Pha audit kế tiếp cần đi theo thứ tự ưu tiên: `thuốc -> DVKT/CDHA -> hợp đồng -> hành chính -> công khám/giường/PTTT/nhân sự/chuyên đề`, với đầu ra mỗi họ gồm: nguồn runtime, số rule, căn cứ pháp lý, tỷ lệ rule hardcoded, rule OFF, rule có nguy cơ dương tính giả, và mẫu hồ sơ kiểm thực tế.

Kết quả audit họ thuốc:

- Nguồn runtime thực tế đã xác minh rõ: `dong_co_giam_dinh.jsx` ưu tiên lấy `CDSS_DATA_LUAT_THUOC` hoặc alias `CDSS_DATA_XML2` từ storage; nếu storage rỗng mới fallback về `layDanhSachLuatThuocHardcoded()`. File `luat_thuoc_hardcoded.jsx` không phải bộ luật độc lập mà chỉ là wrapper bọc lại seed `du_lieu_luat_thuoc_muc8.jsx` (`PHIEN_BAN_SEED_LUAT_THUOC_MUC8 = 2026-03-31_muc8_thuoc_v1`).
- Tại thời điểm audit ban đầu, họ thuốc chưa có cơ chế seed migration riêng tương đương `seed_luat_du_lieu_muc1.jsx` hay `seed_luat_pttt_muc11.jsx`. Sau lượt chỉnh sửa ngày `2026-04-05`, hệ thống đã được bổ sung `seed_luat_thuoc_muc8.jsx` để cưỡng bức đồng bộ version `LUAT_THUOC_MUC8` vào storage cho cả `LUAT_THUOC/XML2`.
- Seed thuốc chứa các cột `TRANG_THAI`, `MA_LUAT`, `TEN_QUY_TAC`, `DIEU_KIEN`, `CANH_BAO`, `GHI_CHU`, `NGUON_DU_LIEU`; không có cột `co_so_phap_ly` theo từng rule. Căn cứ đang nằm ở mức nguồn Excel `DuLieu_LUAT_THUOC (9).xlsx` và một phần ở built-in logic như `CO_SO_PHAP_LY_THUOC` cho các check danh mục/ngoại trú trong engine.
- Điểm yếu pháp lý/govemance quan trọng: cơ chế `boSungCoSoPhapLyMacDinh()` hiện map theo prefix như `DM-THUOC-` và `CLN-THUOC-`, nhưng không map prefix `THUOC_`. Vì vậy các cảnh báo rule seed thuốc khi chạy ra output thực tế vẫn có thể rỗng `co_so_phap_ly`. Đã thấy dấu hiệu này trên các audit mẫu như `THUOC_345`, `THUOC_391`, `THUOC_417`, `THUOC_63`, `THUOC_207`.
- Kết luận họ thuốc: nguồn chạy tương đối rõ và thống nhất hơn nhiều family khác, nhưng độ chặt pháp lý ở đầu ra còn yếu do thiếu `co_so_phap_ly` cấp dòng và thiếu migration/version-control bắt buộc cho storage. Mức rủi ro hiện đánh giá: `trung bình-cao` về governance, `trung bình` về truy vết runtime.

Kết quả audit họ DVKT/CDHA:

- Họ này không phải một nguồn đơn. Runtime hiện có ít nhất 3 lớp cùng tác động vào `XML3`: built-in kiểm tra danh mục/chất lượng ngay trong `dong_co_giam_dinh.jsx`, family hardcoded `LUAT_CDHA`, family hardcoded `GIAM_DINH_CHUYEN_DE` được gộp chung khi fallback tab `LUAT_CDHA/XML3`, và thêm engine `rule_engine_dvkt_no_code.jsx` với 15 operator rule chạy riêng ở layer no-code.
- `chayGiamDinhToanDienV15()` đang chạy lần lượt: built-in hành chính/danh mục/lâm sàng (`giamDinhCDHA`, đối soát XML3...) rồi mới chạy `chayBoMayGiamDinhV3()`. Vì vậy cùng một dòng XML3 có thể bị cảnh báo từ nhiều lớp rule khác nhau; khả năng chồng lấn và khó quy trách nhiệm cấu hình cao hơn họ thuốc.
- Điểm mạnh của DVKT no-code là có map căn cứ pháp lý tương đối rõ ở mức operator (`LEGAL_BASIS_BY_OPERATOR`), bám các văn bản như `VBHN 17/VBHN-BYT`, `Nghị định 188/2025/NĐ-CP`, `Thông tư 01/2025/TT-BYT`, `Quyết định 3618/QĐ-BHXH`. Ngoài ra engine này còn có bộ dữ liệu tham chiếu riêng `DVKT_*` và cơ chế hydrate/sync qua Firebase.
- Điểm yếu governance của CDHA hardcoded: file `luat_cdha_hardcoded.jsx` chỉ chứa `MA_LUAT`, `TEN_QUY_TAC`, `DIEU_KIEN`, `CANH_BAO`, `TRANG_THAI`, không có `co_so_phap_ly` theo từng rule. Tương tự họ thuốc, cơ chế bổ sung mặc định hiện map `DM-DVKT-`, `CLN-CDHA-`... nhưng không map prefix `CDHA_`. Kết quả là nhiều cảnh báo CDHA thực tế vẫn rỗng căn cứ pháp lý, ví dụ đã thấy `CDHA_164`, `CDHA_101` trong các file audit mẫu.
- Điểm yếu kiến trúc của DVKT no-code là phụ thuộc nhiều dataset ngoài rule (`DVKT_DMKT`, `DVKT_INTERNAL_APPROVAL`, `DVKT_EQUIPMENT`, `DVKT_STAFF`, `DVKT_SERVICE_PRACTITIONER_MAP`, `DVKT_PHAMVI_MAPPING`) và có hydrate Firebase. Điều này tốt cho cập nhật vận hành nhưng làm tăng rủi ro lệch môi trường nếu local, Firebase và builtin không đồng bộ.
- Kết luận họ DVKT/CDHA: căn cứ pháp lý ở lớp operator no-code tốt hơn họ thuốc, nhưng family tổng thể phức tạp hơn rõ rệt do chồng nguồn runtime và chồng nghĩa vụ dữ liệu. Mức rủi ro hiện đánh giá: `cao` về kiến trúc/governance, `trung bình-cao` về pháp lý đầu ra do `CDHA_` hardcoded chưa mang căn cứ trực tiếp.

Ưu tiên sửa/xử lý sau audit 2 họ đầu tiên:

- Bổ sung chuẩn hóa `co_so_phap_ly` đầu ra cho các prefix family thật đang dùng (`THUOC_`, `CDHA_`, và các prefix hardcoded tương tự) hoặc đưa `co_so_phap_ly` xuống tận seed/hardcoded row.
- Thiết kế seed migration/version-control riêng cho họ thuốc để không bị storage/Firebase cũ ghi đè runtime thực tế.
- Tách rõ phạm vi `DVKT no-code` và `CDHA hardcoded/chuyên đề` theo loại cảnh báo hoặc theo namespace mã luật để tránh chồng lấn khó giải trình trên cùng `XML3`.

Kết quả audit họ hợp đồng:

- Runtime của họ hợp đồng khá thẳng: `dong_co_giam_dinh.jsx` ưu tiên `CDSS_DATA_LUAT_HOP_DONG` hoặc alias `CDSS_DATA_XUAT_VIEN`; nếu storage không có dữ liệu thì fallback trực tiếp về `layDanhSachLuatHopDongHardcoded()`. Khác với hành chính, thuốc và PTTT, hiện chưa thấy seed file hoặc migration file riêng cho hợp đồng.
- Điểm mạnh của family này là `MA_LUAT` đang dùng prefix `HD_`, và prefix này đã được map trong `CO_SO_PHAP_LY_THEO_PREFIX_MA_LUAT`. Vì vậy đầu ra cảnh báo hợp đồng có cơ chế tự bổ sung căn cứ pháp lý mặc định tốt hơn họ thuốc/CDHA.
- Điểm yếu kỹ thuật của họ hợp đồng nằm ở chính dữ liệu hardcoded: một số rule vẫn dùng field/DSL có dấu hiệu legacy hoặc không bám chặt schema runtime hiện tại, ví dụ `HD_08` dùng `XML1.MA_LYDO_VVIEN`, `HD_18/HD_19` dùng `XML3.DON_GIA`, `HD_22/HD_23` dùng `MA_DICH_VU` không gắn rõ ngữ cảnh bảng. Những biểu thức này không đủ để kết luận sai tuyệt đối, nhưng là vùng rủi ro cần rà riêng vì phụ thuộc mạnh vào engine diễn giải công thức.
- Kết luận họ hợp đồng: đầu ra pháp lý hiện tốt hơn thuốc/CDHA nhờ prefix `HD_`, nhưng nguồn rule vẫn là hardcoded thuần, thiếu version-control và còn mang nợ DSL/field legacy. Mức rủi ro hiện đánh giá: `trung bình` về pháp lý đầu ra, `trung bình-cao` về bảo trì và tương thích runtime.

Kết quả audit họ hành chính:

- Họ hành chính hiện dùng cấu trúc giống họ thuốc nhưng có nền seed rõ hơn: `luat_hanh_chinh_hardcoded.jsx` là wrapper bọc `du_lieu_luat_hanh_chinh_muc2.jsx` với version `PHIEN_BAN_SEED_LUAT_HANH_CHINH_MUC2 = 2026-03-31_muc2_hanh_chinh_v7`. Runtime ưu tiên `CDSS_DATA_LUAT_HANH_CHINH` hoặc alias `CDSS_DATA_XML1`, nếu rỗng mới fallback về wrapper hardcoded.
- Tại thời điểm audit ban đầu, chưa có migration file riêng cho hành chính như `seed_luat_du_lieu_muc1.jsx` hoặc `seed_luat_pttt_muc11.jsx`. Sau lượt chỉnh sửa ngày `2026-04-05`, hệ thống đã được bổ sung `seed_luat_hanh_chinh_muc2.jsx` để cưỡng bức đồng bộ version `LUAT_HANH_CHINH_MUC2` vào storage cho cả `LUAT_HANH_CHINH/XML1`.
- Điểm mạnh lớn của họ hành chính là căn cứ pháp lý đầu ra tương đối tốt: `HC_` được map qua `layCoSoPhapLyHanhChinh()` và còn có các mã cụ thể được gắn căn cứ chi tiết ở `CO_SO_PHAP_LY_HANH_CHINH`. Các cảnh báo thực tế như `HC_03`, `HC_06`, `HC_68`, `HC_130`, `HC_171` là nhóm đã xuất hiện trong audit mẫu và có tuyến pháp lý đầu ra tốt hơn phần lớn family còn lại.
- Kết luận họ hành chính: family này có độ chín governance cao hơn thuốc vì có seed rõ và có map pháp lý tốt ở đầu ra, nhưng vẫn thiếu migration/version-control bắt buộc cho storage. Mức rủi ro hiện đánh giá: `trung bình` về governance, `thấp-trung bình` về pháp lý đầu ra.

Kết quả audit nhóm công khám, giường, PTTT, nhân sự, chuyên đề:

- Công khám (`CK_*`): runtime ưu tiên `CDSS_DATA_LUAT_CONG_KHAM` hoặc alias `CDSS_DATA_KHAM_BENH`, fallback về `luat_cong_kham_hardcoded.jsx`. Family này không chỉ là data tĩnh; engine còn có nhánh xử lý ngữ nghĩa riêng cho một số rule như `CK_13`, `CK_23`, `CK_26`, `CK_27`, `CK_40`, `CK_51`, `CK_52`. Điều đó cho thấy công khám là hardcoded thuần ở dữ liệu nhưng đã ăn sâu vào logic engine. Điểm yếu là prefix `CK_` hiện chưa có map căn cứ pháp lý mặc định, nên nếu rule không tự mang `co_so_phap_ly` thì đầu ra sẽ yếu về truy vết pháp lý.
- Giường (`GB_*`): runtime ưu tiên `CDSS_DATA_LUAT_GIUONG` hoặc alias `CDSS_DATA_NOI_TRU`, fallback về `luat_giuong_hardcoded.jsx`. Ngoài bộ rule hardcoded 77 dòng, engine còn có built-in `giamDinhGiuong()` và các hậu lọc riêng cho `GB_20`, `GB_36`. Đây là family có độ phụ thuộc ngữ cảnh điều trị nội trú, XML5, ngày điều trị và loại hình KCB rất cao. Prefix `GB_` hiện chưa được map pháp lý mặc định, nên đầu ra family hardcoded này cũng có nguy cơ rỗng căn cứ pháp lý như thuốc/CDHA.
- PTTT: đây là family có governance storage tốt nhất trong các họ còn lại. Không có file `luat_pttt_hardcoded.jsx`; thay vào đó hệ thống dùng seed thật `du_lieu_luat_pttt_muc11.jsx` cộng migration `seed_luat_pttt_muc11.jsx`, đổ vào `CDSS_DATA_LUAT_PTTT` và alias `CDSS_DATA_PTTT`, có ghi version `LUAT_PTTT_MUC11`. Tuy nhiên family này vẫn tách đôi: rule seed có `MA_LUAT` dạng `DVKT_0001...`, còn built-in `giamDinhPTTT()` sinh cảnh báo `CLN-PTTT-*`. `CLN-PTTT-*` đã có map pháp lý mặc định, nhưng `DVKT_*` hiện chưa có map tương ứng, nên nếu seed PTTT phát cảnh báo thì đầu ra vẫn có nguy cơ thiếu căn cứ pháp lý.
- Nhân sự (`NS_*`): runtime ưu tiên `CDSS_DATA_LUAT_NHAN_SU` hoặc alias `CDSS_DATA_HAU_PHAU`, fallback về `luat_nhan_su_hardcoded.jsx`. Đặc điểm quan trọng là toàn bộ 15 rule đang `OFF` mặc định và chính file hardcoded đã ghi rõ phụ thuộc vào dữ liệu nền chuẩn hóa về CCHN, phạm vi hành nghề, phân cấp chuyên môn và đối soát liên hồ sơ. Engine cũng có xử lý riêng cho `NS_01` và `NS_10`. Kết luận thực tế là family này chưa sẵn sàng bật rộng nếu chưa hoàn thiện dữ liệu nền.
- Kiểm tra chuyên đề (`Chuyen_de_*`): đây là family rủi ro cao nhất trong nhóm 3. Runtime tab `LUAT_GIAM_DINH_CHUYEN_DE/GIAM_DINH_CHUYEN_DE` và cả fallback của `LUAT_CDHA/XML3` đều có thể hợp nhất rule chuyên đề với CDHA. Nghĩa là 603 rule chuyên đề hiện không đứng độc lập mà còn chồng trực tiếp lên mặt trận `XML3` vốn đã phức tạp. `MA_LUAT` dạng `Chuyen_de_001...` chưa có map căn cứ pháp lý mặc định, trong khi file hardcoded cũng không mang `co_so_phap_ly` cấp dòng.
- Mẫu kiểm thực tế đã thấy rule nhóm 3 xuất hiện trên hồ sơ đối chiếu, ví dụ `CK_03`, `CK_42`, `GB_20`, `GB_26`, `GB_36`, `GB_75`, cũng như các cảnh báo built-in `CLN-PTTT-02`, `CLN-PTTT-05`, `CLN-PTTT-12`. Điều này xác nhận nhóm này không còn là rule tồn kho; ít nhất công khám, giường và built-in PTTT đang thực sự tham gia đầu ra kiểm hồ sơ.
- Kết luận nhóm 3: `PTTT` là family tốt nhất về version-control; `nhân sự` là family an toàn nhất về runtime hiện tại vì đang OFF gần như toàn bộ; `công khám` và `giường` có mức rủi ro trung bình-cao vì hardcoded thuần nhưng đã phụ thuộc nhiều vào logic engine; `kiểm tra chuyên đề` là family rủi ro cao nhất còn lại do số rule lớn, chồng nguồn với CDHA và thiếu tuyến căn cứ pháp lý mặc định.

Ưu tiên sửa/xử lý sau audit toàn bộ các họ đã rà trong lượt này:

- Bổ sung map căn cứ pháp lý mặc định cho các prefix family còn thiếu nhưng đang dùng thực tế: `CK_`, `GB_`, `NS_`, `CDHA_`, `THUOC_`, `DVKT_`, `Chuyen_de_`.
- Tạo migration/version-control cho họ hành chính và thuốc, vì hiện cả hai đều có seed chuẩn nhưng chưa có lớp cưỡng bức cập nhật storage như PTTT.
- Tách namespace và cơ chế giải trình giữa `CDHA`, `kiểm tra chuyên đề`, `DVKT no-code` và `PTTT`, vì các family này đang cùng tranh chấp không gian `XML3` và rất dễ sinh chồng lấn trách nhiệm.
- Rà riêng các rule hardcoded hợp đồng/công khám/giường còn dùng DSL hoặc field legacy để phân loại thành: còn dùng được, cần chuẩn hóa cú pháp, hoặc cần loại bỏ.

Checklist kỹ thuật sau audit, trạng thái triển khai ngày `2026-04-05`:

- `DONE` Bổ sung seed migration cho thuốc qua `seed_luat_thuoc_muc8.jsx`, đồng bộ `CDSS_DATA_LUAT_THUOC/CDSS_DATA_XML2` theo version `LUAT_THUOC_MUC8`.
- `DONE` Bổ sung seed migration cho hành chính qua `seed_luat_hanh_chinh_muc2.jsx`, đồng bộ `CDSS_DATA_LUAT_HANH_CHINH/CDSS_DATA_XML1` theo version `LUAT_HANH_CHINH_MUC2`.
- `DONE` Sửa bootstrap `taiDanhSachTabLuatDong()` để cleanup legacy chạy trước, seed chạy sau; tránh race condition giữa xóa storage cũ và ghi lại seed mới ở lần boot đầu.
- `DONE` Mở rộng `CO_SO_PHAP_LY_THEO_PREFIX_MA_LUAT` cho các prefix đang dùng thực tế: `CK_`, `GB_`, `NS_`, `THUOC_`, `CDHA_`, `DVKT_`, `CHUYEN_DE_`.
- `PENDING` Tách namespace giải trình giữa `CDHA`, `DVKT no-code`, `PTTT` và `kiểm tra chuyên đề` để cùng `XML3` không còn sinh chồng lấn khó giải thích.
- `PENDING` Rà thủ công các rule hardcoded/DSL legacy ở họ hợp đồng, công khám, giường để chuẩn hóa công thức và field runtime.

---

## 11. Tích hợp Firebase

### 11.1. Mục đích sử dụng Firebase

Firebase trong hệ thống hiện tại được dùng cho:

- Đồng bộ dataset danh mục và quy tắc
- Phục hồi dataset từ cloud về máy
- Kiểm tra trạng thái kết nối và quyền truy cập
- Lưu metadata và xử lý chunk dữ liệu lớn
- Hỗ trợ tải kết quả kiểm tra lên cloud ở các luồng liên quan

### 11.2. Cấu hình

Cấu hình Firebase được đọc từ `app.json` hoặc biến môi trường `EXPO_PUBLIC_FIREBASE_*`.

Các trường cốt lõi:

- `enabled`
- `orgId`
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`
- `authMode`
- `authEmail`
- `authPassword`

### 11.3. Chế độ xác thực

`firebase_cloud_bhyt.jsx` hỗ trợ tối thiểu:

- anonymous auth
- email/password auth

### 11.4. Kiểm soát vai trò trên cloud

Vai trò đọc hợp lệ:

- ADMIN
- AUDITOR
- OPERATOR
- REVIEWER
- USER

Vai trò ghi hợp lệ:

- ADMIN
- AUDITOR
- OPERATOR

Để an toàn, rules thực tế trên Firebase phải kết hợp thêm `org_id` và `role` trong custom claims.

### 11.5. Chunking cloud

Do dataset có thể lớn, hệ thống dùng cơ chế:

- inline limit cho Firestore
- chia chunk khi vượt ngưỡng
- metadata cục bộ để tránh đồng bộ lặp
- công cụ kiểm tra/dọn chunk mồ côi trong helper

---

## 12. Sao lưu và phục hồi

### 12.1. Sao lưu JSON

Helper hỗ trợ xuất bản sao lưu JSON toàn hệ thống trên web.

Nội dung sao lưu có thể gồm:

- AsyncStorage keys liên quan
- Local storage keys liên quan
- Dữ liệu danh mục, cấu hình, RBAC và các trạng thái hỗ trợ vận hành

### 12.2. Phục hồi JSON

Người dùng có thể nhập file JSON để phục hồi dữ liệu hệ thống. Sau phục hồi cần tải lại trang để đồng bộ trạng thái giao diện và bộ nhớ cục bộ.

### 12.3. Nguyên tắc vận hành an toàn

- Luôn backup trước khi phục hồi.
- Không phục hồi và đồng bộ cloud cùng lúc.
- Chỉ quản trị viên hoặc người được ủy quyền mới thao tác các chức năng này.

---

## 13. Báo cáo và xuất dữ liệu

### 13.1. Nguồn dữ liệu báo cáo

Module báo cáo đọc trực tiếp từ kho hồ sơ cục bộ thông qua các hàm lấy toàn bộ hồ sơ đã lưu.

### 13.2. Chỉ số chính

- Hồ sơ trong kho
- Hồ sơ trong kỳ
- Hồ sơ có lỗi
- Tổng lỗi
- Tỷ lệ lỗi hồ sơ
- Chi phí ước tính

### 13.3. Chiều phân tích

- Theo khoa
- Theo bác sĩ
- Theo quy tắc
- Theo xu hướng thời gian

### 13.4. Xuất Excel

Hệ thống hiện hỗ trợ 2 mẫu báo cáo Excel chính.

#### Mẫu 1. Báo cáo vi phạm nhanh

Tên file sinh ra:

- `Bao_Cao_Vi_Pham_<timestamp>.xlsx`

Cấu trúc workbook:

- 1 sheet duy nhất: `DS_Loi`

Cấu trúc cột hiện hành của sheet `DS_Loi`:

1. `Mã LK`
2. `Tên Bệnh Nhân`
3. `Mã Luật`
4. `Quy Tắc`
5. `Cảnh Báo`

Ý nghĩa sử dụng:

- Phục vụ rà soát nhanh danh sách lỗi đầu ra theo từng hồ sơ.
- Phù hợp gửi nội bộ giữa bộ phận kiểm tra, CNTT và quản lý chất lượng.
- Không chứa số liệu KPI tổng hợp, chỉ tập trung vào danh sách vi phạm chi tiết.

Quy tắc sinh dòng dữ liệu:

- Mỗi lỗi trong `ket_qua_giam_dinh` tạo ra một dòng riêng.
- Một hồ sơ có nhiều lỗi sẽ xuất hiện nhiều dòng.
- Nếu hồ sơ không có lỗi thì không tạo dòng trong `DS_Loi`.

#### Mẫu 2. Báo cáo thống kê tổng hợp

Tên file sinh ra:

- `BaoCao_ThongKe_<timestamp>.xlsx`

Cấu trúc workbook hiện hành:

1. `TongQuan`
2. `TheoKhoa`
3. `TheoBacSi`
4. `TheoQuyTac`
5. `XuHuong`

Nội dung từng sheet:

- `TongQuan`: tổng hợp đầu vào, đầu ra, tỷ lệ lỗi, chi phí ước tính, số quy tắc vi phạm, mốc thời gian báo cáo.
- `TheoKhoa`: thống kê hồ sơ và lỗi theo khoa.
- `TheoBacSi`: thống kê hồ sơ và lỗi theo bác sĩ.
- `TheoQuyTac`: thống kê tần suất vi phạm theo quy tắc.
- `XuHuong`: chuỗi thời gian để theo dõi xu hướng phát sinh lỗi.

#### Mẫu dữ liệu khuyến nghị khi bàn giao hoặc đối soát

Khi yêu cầu “báo cáo theo mẫu”, ưu tiên thống nhất theo một trong hai mẫu sau:

- Nếu mục tiêu là danh sách hồ sơ sai phạm chi tiết: dùng mẫu `DS_Loi`.
- Nếu mục tiêu là báo cáo điều hành hoặc theo dõi KPI: dùng workbook `BaoCao_ThongKe_*` nhiều sheet.

#### Ghi chú vận hành

- Cả hai mẫu đang được sinh trực tiếp từ dữ liệu trong kho hồ sơ cục bộ.
- Dữ liệu báo cáo không qua backend trung gian trước khi xuất file.
- Chất lượng báo cáo phụ thuộc trực tiếp vào chất lượng dữ liệu XML đầu vào và kết quả kiểm tra đã lưu trong kho.

---

## 14. Yêu cầu phi chức năng

### 14.1. Hiển thị tiếng Việt

- Văn bản giao diện phải lưu UTF-8.
- Font hiển thị phải hỗ trợ đầy đủ tiếng Việt.
- Hệ thống có script riêng để kiểm tra chuỗi không dấu và lỗi mojibake.

### 14.2. Khả năng chịu tải cục bộ

- Web ưu tiên IndexedDB để phù hợp lượng hồ sơ lớn.
- Mobile dùng chunking để tránh giới hạn kích thước mỗi key trong AsyncStorage.

### 14.3. Tính truy vết

- Các thao tác quan trọng như đăng nhập, tạo tài khoản, reset kho, đồng bộ cần có nhật ký hệ thống.

### 14.4. Tính mở rộng

- Có thể bổ sung thêm luật hardcoded hoặc operator no-code mà không phải thay đổi kiến trúc lõi.
- Có thể thêm route mới và tài nguyên RBAC mới từ seed hiện có.

---

## 15. Giới hạn hiện tại của hệ thống

- Chưa có backend nghiệp vụ tập trung ngoài các chức năng cloud dùng Firebase.
- Dữ liệu vận hành vẫn phụ thuộc nhiều vào máy người dùng nếu chưa đồng bộ hoặc chưa backup.
- Thư mục `app/` của Expo Router chưa phải luồng nghiệp vụ chính nên dễ gây nhầm lẫn cho người mới vào dự án.
- Một số bộ luật và dữ liệu seed còn nằm trong file hardcoded lớn, khiến việc review thay đổi cần quy trình chặt hơn.

---

## 16. Khuyến nghị bảo trì

1. Coi `ma_nguon/` là nguồn chân lý nghiệp vụ chính.
2. Mỗi thay đổi về luật hoặc danh mục cần có quy trình backup, kiểm tra QA và log người thực hiện.
3. Trước khi phát hành, chạy tối thiểu:
   - `npm run lint`
   - `npm run text:check`
   - `npm run qa:strict-flow`
4. Với thay đổi liên quan Firebase, cần kiểm tra:
   - cấu hình app
   - authMode
   - custom claims
   - firestore rules
5. Khi đổi máy hoặc xóa cache trình duyệt, ưu tiên phục hồi từ JSON backup hoặc hydrate lại từ Firebase.

---

## 17. Kết luận

CDSS BHYT hiện là một hệ thống React Native/Expo local-first có nghiệp vụ tương đối đầy đủ cho tiếp nhận, kiểm tra, quản trị luật, phân quyền, lưu trữ và báo cáo hồ sơ XML BHYT. Kiến trúc hiện tại phù hợp cho môi trường vận hành nội bộ, với trọng tâm là lưu trữ cục bộ an toàn, rule engine mở rộng được và đồng bộ cấu hình có kiểm soát qua Firebase.

Tài liệu này là mốc tham chiếu kỹ thuật chính cho trạng thái mã nguồn tại ngày 02/04/2026.