# Ban kiem tra lai vong 2 - Root cause

## Ket luan goc

Nguyen nhan chinh khien bao cao van con nhieu duong tinh gia khong nam o file checklist doi chieu, ma nam o luong chay thuc te:

- Man hinh tong quan/doc file dang goi chayBoMayGiamDinhV3.
- V3 truoc day chua ap dung hau loc giam duong tinh gia theo ngu canh ho so.
- Vi vay cac rule no-code nhieu cao (HC_49, HC_52, HC_238, GB_20...) van len bao cao du da co logic loc trong luong V15.

## Da sua trong code

1. Dong bo hau loc FP vao V3:
- File: ma_nguon/tien_ich/dong_co_giam_dinh.jsx
- Thay doi: sau khi tong hop canh bao V3, ap dung locCanhBaoDuongTinhGiaTheoNguCanh(...) truoc khi return.

2. Khoa OFF cung 2 ma nhieu cao:
- File: ma_nguon/tien_ich/quy_tac_on_off_noi_bo.jsx
- Them vao DANH_SACH_QUY_TAC_TAT_CUNG:
  - DVKT_1634
  - XML_140

## Trang thai kiem tra ky thuat

- ESLint sau sua: PASS (ESLINT_EXIT=0)

## Luu y quan trong khi doi chieu

Bao_Cao_Vi_Pham_1775226217339.xlsx duoc xuat truoc khi sua root-cause, nen van the hien 24 loi cu.
Can xuat lai 1 file Bao_Cao_Vi_Pham moi sau khi app tai lai code moi de do ket qua thuc te sau fix.

## Ky vong sau khi xuat bao cao moi

- Giam manh cac ma nhieu do V3 da co hau loc ngu canh.
- DVKT_1634 va XML_140 khong con xuat hien do OFF cung.
