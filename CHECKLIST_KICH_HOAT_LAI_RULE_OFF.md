# Checklist Kich Hoat Lai Rule OFF

Tai lieu nay tong hop cac ma dang OFF mac dinh trong 3 nhom Cong kham, Giuong va Nhan su. Muc tieu la giu trang thai an toan hien tai, dong thoi cho doi nghiep vu mot checklist ro rang truoc khi bat lai tung rule.

## Ma tran uu tien thuc thi

| Dot | Muc tieu | Ma uu tien | Dieu kien de vao dot | Rui ro |
| --- | --- | --- | --- | --- |
| Dot 1 | Bat lai som cac rule co logic ro, co ngoai le xac dinh duoc | GB_76, GB_02, NS_12 | Da co du lieu vao-ra/cap cuu va hieu luc CCHN tin cay | Thap den trung binh |
| Dot 2 | Bat lai nhom phu thuoc danh muc nhan su da chuan hoa | NS_02, NS_03, NS_04, NS_05, NS_06, NS_07, NS_08, NS_09, NS_15 | Da chot mapping CCHN, vai tro, pham vi hanh nghe, CSKCB dang ky | Trung binh |
| Dot 3 | Bat lai nhom can kho lien ho so, doi soat tren nhieu luot kham | CK_23, CK_26, CK_27, CK_51, CK_52, NS_01, NS_10 | Da co kho lien ho so theo benh nhan/bac si/co so/thoi gian | Trung binh den cao |
| Dot 4 | Bat lai nhom can mapping nghiep vu dac thu theo co so | CK_25, CK_36, CK_38, CK_46, GB_28, GB_34, GB_56, GB_63, GB_67, GB_68, GB_71, NS_11, NS_13, NS_14 | Da co danh muc chuyen mon, phan tuyen, me-con, don gia, y lenh va mapping nghiep vu dac thu | Cao |

## Ma tran theo loai du lieu con thieu

| Loai du lieu nen | Cac ma bi anh huong |
| --- | --- |
| Kho lien ho so theo benh nhan | CK_23, CK_26, CK_27 |
| Kho lien ho so theo bac si/thoi gian/co so | CK_51, CK_52, NS_01, NS_10 |
| Danh muc nhan su, CCHN, pham vi hanh nghe | CK_25, CK_36, NS_02, NS_03, NS_04, NS_05, NS_06, NS_07, NS_08, NS_09, NS_11, NS_12, NS_15 |
| Danh muc khoa phong, chuyen khoa, phan tuyen ky thuat | CK_38, CK_46, GB_63, GB_71 |
| Don gia, hieu luc danh muc, trang thiet bi | GB_34, GB_56, NS_13 |
| Lien ket me-con, PTTT, chronology giuong | GB_28, GB_67, GB_68 |
| Y lenh, nguoi chi dinh, quy tac ngoai le | NS_14 |

## Nguyen tac bat lai

1. Chi bat lai khi da co du lieu nen du, on dinh va duoc map thong nhat.
2. Moi rule can co bo test toi thieu gom 1 ca dung, 1 ca sai, 1 ca bien hop le.
3. Bat theo tung nhom nho, khong bat dong loat ca cum OFF.
4. Sau khi bat, doi chieu it nhat 1 dot ho so thuc te de do ty le duong tinh gia.

## Nhom Cong kham (CK)

| Ma rule | Ten rule | Ly do dang OFF | Du lieu/prerequisite can co | Test toi thieu truoc khi bat |
| --- | --- | --- | --- | --- |
| CK_23 | Cong kham vuot dinh muc 2.000.000d/nam | Logic hien tai moi nhin tren ho so hien tai, trong khi nghiep vu can tong hop theo benh nhan tren nhieu luot kham trong nam | Kho lien ho so theo MA_BN, tong hop chi phi cong kham theo nam, quy tac xu ly doi tuong doi ma BN | 1 benh nhan vuot nguong, 1 benh nhan khong vuot, 1 ca doi ma/doi co so |
| CK_25 | CCHN bac si Nhi khoa kham nguoi lon | Chua co mapping chuan giua bac si, chuyen mon CCHN va ma dich vu cong kham | Danh muc nhan su co CCHN/chuyen mon da chuan hoa, mapping bac si tren XML3 | 1 BS Nhi kham tre em, 1 BS Nhi kham nguoi lon, 1 ca thieu ma bac si |
| CK_26 | Kham benh man tinh qua 12 lan/nam | Phu thuoc lich su kham lien ho so trong nam, vuot pham vi ho so hien tai | Lich su luot kham theo MA_BN va nam, co tach ro lan tai kham va lan moi | 1 benh nhan 13 lan, 1 benh nhan 12 lan, 1 ca chuyen co so |
| CK_27 | Cong kham benh an man tinh | Can biet lan kham truoc gan nhat cua cung benh nhan, hien chua co kho LAST_VISIT tin cay | Lich su lien ho so theo MA_BN, ngay vao/ngay ra da chuan hoa, rule bo qua truong hop cap cuu | 1 ca tai kham <15 ngay, 1 ca >=15 ngay, 1 ca cap cuu hop le |
| CK_36 | CCHN bac si khong phu hop khoa | Can doi soat chuyen mon CCHN voi khoa phong thuc hien; du lieu khoa va chuyen mon hien chua map on dinh | Mapping khoa phong noi bo, chuyen mon nhan su, quy uoc khoa lien quan | 1 ca hop khoa, 1 ca sai khoa, 1 ca khoa da map nhieu chuyen mon |
| CK_38 | Kham chuyen khoa tai khoa khong tuong ung | Can map chuan ma khoa thuc hien va chuyen khoa cua dich vu | Danh muc khoa phong va danh muc DVKT/cong kham co ma chuyen khoa chuan | 1 ca khoa dung, 1 ca khoa sai, 1 ca dich vu khong can gan chuyen khoa |
| CK_46 | Kham benh vuot tuyen ky thuat | Can nguong MAX_TUYEN_ALLOWED theo tung co so, khong the hardcode chung | Cau hinh phan tuyen ky thuat theo MA_CSKCB, quy tac xu ly truong hop dac cach | 1 co so dung tuyen, 1 co so vuot tuyen, 1 ca co cau hinh dac thu |
| CK_51 | Bac si kham vuot qua 02 co so/ngay | Can doi soat tren nhieu ho so/co so trong cung ngay theo bac si | Kho lien ho so theo ma bac si/CCHN va MA_CSKCB, chuan hoa nhan dien bac si | 1 BS lam 1 co so, 1 BS lam 2 co so, 1 BS lam 3 co so |
| CK_52 | Trung lap cong kham cung gio | Rule chi an toan neu doi chieu tren nhieu ho so, khong chi trong 1 ho so | Kho lien ho so theo bac si, moc thoi gian phut/giay, co che loai tru theo ca kip hop le | 1 ca trung gio that, 1 ca khac gio, 1 ca trung gio nhung hop le do du lieu ca kip |

## Nhom Giuong (GB)

| Ma rule | Ten rule | Ly do dang OFF | Du lieu/prerequisite can co | Test toi thieu truoc khi bat |
| --- | --- | --- | --- | --- |
| GB_02 | Giuong dieu tri noi tru va ma benh nhe | Chi dua vao ma benh de suy ra khong can noi tru de gay duong tinh gia | Tieu chi muc do nang, cap cuu, benh kem, chi dinh nhap vien | 1 ca benh nhe ngoai tru, 1 ca benh nhe nhung co bien chung nhap vien, 1 ca cap cuu |
| GB_28 | Giuong con nam cung me | Can lien ket me-con va ghi nhan dich vu/phat sinh cua tre so sinh | Lien ket ho so me-con, danh muc giuong tre so sinh, quy tac phat sinh DV cho con | 1 ca sinh co giuong con, 1 ca sinh khong phat sinh giuong con hop le, 1 ca thieu lien ket me-con |
| GB_34 | Giuong ICU va may tho | XML co the thieu du lieu may tho du thong tin hoi suc van dung | Mapping may tho/ho tro ho hap, du lieu theo doi hoi suc, truong hop ICU khong dat noi khi quan | 1 ca ICU co may tho, 1 ca ICU khong may tho nhung hop le, 1 ca ICU thieu mapping thiet bi |
| GB_56 | Giuong ghep 2 va don gia | Can don gia nen theo danh muc va quy tac tinh 50% theo thoi diem hieu luc | Bang gia giuong theo thoi diem, mapping ma giuong ghep, cach tinh thanh tien thuc te | 1 ca dung 50%, 1 ca vuot 50%, 1 ca thay doi don gia theo ngay |
| GB_63 | Nhieu giuong trong 1 ngay | Can biet lich su chuyen khoa va cach chia ngay giuong trong ngay | Log chuyen khoa, moc thoi gian vao/ra khoa, quy tac khoa cuoi/khoa nam lau nhat | 1 ca chuyen khoa hop le, 1 ca tinh trung 2 giuong sai, 1 ca doi giuong cung khoa |
| GB_67 | Ngay vao muon hon ngay mo | Can lien ket chinh xac giua PTTT va dot noi tru | Mapping PTTT theo dot dieu tri, moc thoi gian hop le, xu ly truong hop nhap lieu cham | 1 ca hop le, 1 ca nghich ly that, 1 ca nhap lieu cham |
| GB_68 | Giuong hau phau truoc thoi diem phau thuat | Can chronology tin cay giua giuong hau phau va PTTT | Mapping PTTT, moc thoi gian giuong chi tiet, quy tac bo qua neu sai so dong bo thoi gian | 1 ca dung thu tu, 1 ca sai thu tu, 1 ca sai do dong bo gio |
| GB_71 | Chuyen khoa va tinh ngay giuong | Can phan bo so ngay/so luong khi chuyen nhieu khoa trong cung ngay | Log chuyen khoa chi tiet, quy tac tinh 1 ngay giuong sau chuyen khoa, ma khoa chuan | 1 ca chuyen 2 khoa hop le, 1 ca tinh du 2 ngay sai, 1 ca khoa cuoi/khoa lau nhat |
| GB_76 | Nam vien toi thieu 4 gio | Co ngoai le cap cuu, chuyen vien, tu vong; neu bat thang se bao sai | Co cap cuu/chuyen vien/tu vong, moc vao-ra tin cay, quy tac loai tru | 1 ca <4h bi tu choi, 1 ca <4h nhung cap cuu hop le, 1 ca >=4h |

## Nhom Nhan su (NS)

| Ma rule | Ten rule | Ly do dang OFF | Du lieu/prerequisite can co | Test toi thieu truoc khi bat |
| --- | --- | --- | --- | --- |
| NS_01 | Kiem tra trung MA_LK | Can doi soat lien ho so/cung ky, khong the lam dung neu chi nhin 1 ho so | Kho XML1 theo MA_CSKCB, thang/quy, quy tac xu ly ho so thay the | 1 ca trung that, 1 ca khong trung, 1 ca ho so thay the hop le |
| NS_02 | Nhan su co trong DM dang ky hanh nghe | Phu thuoc chat luong danh muc CCHN dang ky tai co so | Danh muc nhan su dang ky hanh nghe theo CSKCB, mapping NGUOI_THUC_HIEN -> CCHN | 1 nguoi co dang ky, 1 nguoi khong dang ky, 1 ca ma nhan su viet khac dinh dang |
| NS_03 | BS Y khoa - Pham vi hanh nghe | Chua co mapping on dinh giua pham vi hanh nghe va ma DVKT thuc hien | DM pham vi hanh nghe PL V da chuan hoa, mapping DVKT | 1 DVKT trong pham vi, 1 DVKT ngoai pham vi, 1 DVKT bien gioi |
| NS_04 | BS YHCT - Pham vi hanh nghe | Nhu NS_03 nhung cho nhom YHCT | DM PL VI da chuan hoa, mapping DVKT YHCT | 1 DVKT dung, 1 DVKT sai, 1 DVKT lai ghep YHCT/hien dai |
| NS_05 | BS RHM - Pham vi hanh nghe | Nhu NS_03 nhung cho nhom RHM | DM PL VIII da chuan hoa, mapping DVKT RHM | 1 DVKT dung, 1 DVKT sai, 1 DVKT dung ten nhung sai ma |
| NS_06 | BS Chuyen khoa - Pham vi hanh nghe | Can map chuan chuyen khoa cua bac si voi danh muc ky thuat | DM PL IX, thong tin chuyen khoa bac si, mapping DVKT theo chuyen khoa | 1 DVKT dung CK, 1 DVKT sai CK, 1 BS co nhieu CK |
| NS_07 | Dieu duong - Pham vi hanh nghe | Phu thuoc mapping vai tro va danh muc ky thuat duoc lam | DM PL XII, vai tro nhan su, mapping DVKT theo vai tro | 1 DVKT hop le, 1 DVKT sai, 1 ca dieu duong truong/ky thuat vien |
| NS_08 | Ho sinh - Pham vi hanh nghe | Phu thuoc mapping vai tro ho sinh voi DVKT san-nhi | DM PL XIII, mapping DVKT san-nhi, vai tro ho sinh | 1 DVKT dung, 1 DVKT sai, 1 ca giao thoa Sản/Nhi |
| NS_09 | Phan cap ky thuat theo vi tri chuyen mon | Du lieu PHAN_LOAI_PTTT va vi tri chuyen mon de lech quy uoc giua cac nguon | Danh muc DVKT co phan cap, danh muc nhan su co vi tri chuyen mon chuan | 1 nguoi du tham quyen, 1 nguoi khong du, 1 ca ma phan cap thieu |
| NS_10 | BS phan than - trung thoi gian DVKT | Can doi soat tren nhieu ho so cung thoi diem theo cung nguoi thuc hien | Kho lien ho so theo CCHN, moc thoi gian chi tiet, co che loai tru theo ekip | 1 ca trung that, 1 ca khong trung, 1 ca ekip/PTTT nhieu nguoi |
| NS_11 | Ke thuoc dac tri - BS khong co quyen ke | Can phan biet bac si ke don, vai tro chuyen khoa va danh muc thuoc dac tri | DM thuoc dac tri, vai tro/chuyen khoa bac si, mapping MA_BAC_SI | 1 BS du quyen, 1 BS khong du quyen, 1 ca uy quyen/hoi chan |
| NS_12 | CCHN het han hoac bi thu hoi | Can du lieu hieu luc CCHN theo thoi diem | Ngay hieu luc/het han CCHN, trang thai CCHN, ngay KCB chuan | 1 CCHN con han, 1 CCHN het han, 1 ca gia han sat ngay |
| NS_13 | DVKT ngoai DMDC BHYT hoac ngoai pham vi CSKCB | Can dong bo 2 nguon: DMDC BHYT va danh muc ky thuat duoc phep cua co so | DMDC BHYT, DM ky thuat duoc cap phep theo CSKCB, hieu luc theo thoi diem | 1 DVKT hop le, 1 DVKT ngoai BHYT, 1 DVKT co trong BHYT nhung ngoai pham vi co so |
| NS_14 | BS chi dinh khac BS thuc hien - thieu y lenh | Can doi soat chi dinh/y lenh voi nguoi thuc hien | Du lieu y lenh, nguoi chi dinh, danh muc DVKT can chi dinh, quy tac ngoai le | 1 ca co y lenh hop le, 1 ca thieu y lenh, 1 ca cap cuu |
| NS_15 | Nhan su khong dang ky tai CSKCB hien tai | Can danh muc dang ky hanh nghe theo tung co so va thoi diem | DM dang ky hanh nghe theo CSKCB, lich su dieu chuyen/cong tac, CCHN | 1 nguoi dung co so, 1 nguoi sai co so, 1 ca luan phien/hop dong hop le |

## Thu tu uu tien neu muon bat lai

1. Bat thu nghiem nhom co prerequisite ro va it phu thuoc lien ho so: GB_76, GB_02, NS_12.
2. Bat sau khi co danh muc nhan su chuan hoa: NS_02 den NS_09, NS_15.
3. Bat sau khi co kho lien ho so: CK_23, CK_26, CK_27, CK_51, CK_52, NS_01, NS_10.
4. Bat cuoi cung voi nhom can map nghiep vu phuc tap theo co so: CK_36, CK_38, CK_46, GB_28, GB_34, GB_56, GB_63, GB_67, GB_68, GB_71, NS_11, NS_13, NS_14.

## Ghi chu van hanh

- Trang thai OFF hien tai da duoc dong bo giua registry va hardcoded.
- Neu chi bat trong man hinh ON/OFF ma khong bo sung du lieu nen, nguy co duong tinh gia van cao.
- Nen bat tren moi truong test voi tap XML thuc te truoc khi dua vao quy trinh giamsat thuong xuyen.