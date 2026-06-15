# De xuat chinh rule - OP26002936

Muc tieu: giam duong tinh gia tren ho so thuc te OP26002936, khong lam anh huong luong giam dinh chinh.

## Nhom uu tien cao (nghi FP ro)

1. XML_81 - The muc 1/2/5 phai huong 100%
- Hien trang: ho so co ma the nhom 3, nhung van bi canh bao.
- De xuat: them guard chi chay rule khi ky tu muc huong tren ma the nam trong {1,2,5}.
- Tieu chi dung: neu muc huong khac {1,2,5} thi khong tao canh bao.

2. CK_42 - Cong kham buong luu >24h
- Hien trang: tong thoi gian vao-ra 121 phut (<1440), nhung van bi canh bao.
- De xuat: tinh thoi gian theo NGAY_VAO/NGAY_RA va bo qua khi <=1440.
- Tieu chi dung: canh bao chi xuat hien khi thoi gian thuc su >1440 phut va co bang chung dich vu buong luu.

3. CDHA_204 - Thoi luong chup MRI toi thieu
- Hien trang: ho so khong co MRI nhung bi canh bao.
- De xuat: them precondition bat buoc co dich vu MRI trong XML3/nhom CDHA tuong ung moi danh gia thoi luong.
- Tieu chi dung: khong co MRI => khong canh bao.

4. CDHA_284 - Chuan bi nhin an (SA bung)
- Hien trang: ho so khong co SA bung nhung bi canh bao.
- De xuat: chi ap dung neu co ma/ten DV thuoc nhom SA bung.
- Tieu chi dung: khong co SA bung => khong canh bao.

5. GB_26 - Giuong luu ngoai tru <4h
- Hien trang: XML3 khong co dich vu giuong nhung bi canh bao.
- De xuat: them dieu kien ton tai dich vu giuong truoc khi kiem tra thoi gian.
- Tieu chi dung: khong co giuong => khong canh bao.

6. DVKT_1634 - Chi dinh SA Doppler can I80/I83/E11.5
- Hien trang: ho so da co I83 trong danh sach benh, nhung van bi canh bao.
- De xuat: fix matcher ICD theo token day du (tach bang dau ';') va cho phep dang I83, I83.x.
- Tieu chi dung: neu co I80/I83/E11.5 trong MA_BENH_CHINH + MA_BENH_KT => khong canh bao.

## Nhom uu tien trung binh (nghi FP theo du lieu khoa hoc)

7. XML_26 - Don gia bang 0
- Hien trang: khong tim thay dong don gia = 0 tren XML2/XML3 nhung bao loi.
- De xuat: xac dinh ro cot don gia nao duoc su dung (DON_GIA, DON_GIA_BH, DON_GIA_BV), bo qua dong khong phai thuoc/dv co thanh toan.
- Tieu chi dung: chi bao khi co gia tri so va =0 tren cot dung.

8. XML_117 / XML_118 - Trung khoa chinh XML2/XML3
- Hien trang: MA_LK+STT la duy nhat nhung van bao trung.
- De xuat: chuan hoa key trung lap theo MA_LK + STT sau trim; loai bo dong rong/trang.
- Tieu chi dung: khong trung key => khong canh bao.

## Nhom can xac minh them (chua ket luan FP/FN)

- XML_58, XML_86, XML_87, XML_139, XML_140
- HC_49, HC_52, HC_238
- HD_06, HD_09, HD_10
- THUOC_436, GB_20

Ly do: can cau hinh ngoai ho so (danh muc/hop dong/nguong co so) hoac can bo du lieu doi chieu bo sung.

## Thu tu trien khai de xuat

1. Sua cac guard condition thuoc nhom uu tien cao.
2. Chay regression tren OP26002936 va 1-2 ho so doi chieu khac.
3. Neu ket qua on dinh, moi mo rong sang nhom uu tien trung binh.
4. Sau cung moi danh gia lai nhom can xac minh them voi du lieu cau hinh day du.
