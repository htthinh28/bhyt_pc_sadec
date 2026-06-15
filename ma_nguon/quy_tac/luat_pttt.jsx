/**
 * DONG CO QUY TAC: LUAT PHAU THUAT, THU THUAT (PTTT)
 * Kiểm tra dữ liệu XML3 va doi soat voi XML1/XML5.
 */

export const KIEM_TRA_LUAT_PTTT = (dsDVKT, xml1 = {}, xml5 = []) => {
  const danhSachLỗi = [];
  if (!Array.isArray(dsDVKT) || dsDVKT.length === 0) return danhSachLỗi;

  const hasValue = (v) => !(v === undefined || v === null || String(v).trim() === '');
  const toUpper = (v) => String(v || '').trim().toUpperCase();
  const normalizeTime12 = (v) => String(v || '').replace(/\D/g, '').padEnd(12, '0');
  const isBefore = (a, b) => normalizeTime12(a) < normalizeTime12(b);
  const maPTTTQTXML1 = toUpper(xml1.MA_PTTT_QT || '');

  const laDongPTTT = (dv) => {
    const maNhom = String(dv?.MA_NHOM || '').trim();
    const maDV = toUpper(dv?.MA_DICH_VU || '');
    const tenDV = toUpper(dv?.TEN_DICH_VU || '');
    const maPTTTQT = toUpper(dv?.MA_PTTT_QT || '');
    return maNhom === '4' || maNhom === '5' || maDV.startsWith('43') || maDV.startsWith('44')
      || tenDV.includes('PHAU') || tenDV.includes('THU THUAT') || hasValue(maPTTTQT);
  };

  const dsPTTT = dsDVKT
    .map((dv, index) => ({ dv, index }))
    .filter(({ dv }) => laDongPTTT(dv));

  if (maPTTTQTXML1 && dsPTTT.length === 0) {
    danhSachLỗi.push({
      phan_loai: 'PTTT',
      muc_do: 'Warning',
      ma_luat: 'PTTT-01',
      canh_bao: `XML1 có MA_PTTT_QT [${maPTTTQTXML1}] nhưng XML3 không có dòng PTTT.`,
    });
  }

  if (!maPTTTQTXML1 && dsPTTT.length > 0) {
    danhSachLỗi.push({
      phan_loai: 'PTTT',
      muc_do: 'Warning',
      ma_luat: 'PTTT-02',
      canh_bao: `XML3 có ${dsPTTT.length} dòng PTTT nhưng XML1 chưa khai MA_PTTT_QT.`,
    });
  }

  dsPTTT.forEach(({ dv, index }) => {
    const soLuong = Number(dv.SO_LUONG || 0);
    const maPTTTQT = toUpper(dv.MA_PTTT_QT || '');
    const ngayYLenh = dv.NGAY_YL || '';
    const ngayThucHien = dv.NGAY_TH_YL || dv.NGAY_KQ || dv.NGAY_YL || '';
    const nguoiThucHien = toUpper(dv.NGUOI_THUC_HIEN || '');
    const maBacSi = toUpper(dv.MA_BAC_SI || '');

    if (soLuong <= 0) {
      danhSachLỗi.push({
        phan_loai: 'PTTT',
        muc_do: 'Error',
        ma_luat: 'PTTT-03',
        index,
        canh_bao: `Dong PTTT co SO_LUONG không hợp lệ (${dv.SO_LUONG || 0}).`,
      });
    }

    if (!hasValue(maPTTTQT) && !hasValue(maPTTTQTXML1)) {
      danhSachLỗi.push({
        phan_loai: 'PTTT',
        muc_do: 'Warning',
        ma_luat: 'PTTT-04',
        index,
        canh_bao: 'Dòng PTTT chưa khai MA_PTTT_QT ở cả XML1 và XML3.',
      });
    }

    if (hasValue(maPTTTQTXML1) && hasValue(maPTTTQT) && maPTTTQT !== maPTTTQTXML1) {
      danhSachLỗi.push({
        phan_loai: 'PTTT',
        muc_do: 'Warning',
        ma_luat: 'PTTT-05',
        index,
        canh_bao: `MA_PTTT_QT XML3 [${maPTTTQT}] không khớp XML1 [${maPTTTQTXML1}].`,
      });
    }

    if (!hasValue(ngayThucHien)) {
      danhSachLỗi.push({
        phan_loai: 'PTTT',
        muc_do: 'Warning',
        ma_luat: 'PTTT-06',
        index,
        canh_bao: 'Dòng PTTT thiếu NGAY_TH_YL (thời điểm thực hiện).',
      });
    }

    if (hasValue(ngayYLenh) && hasValue(ngayThucHien) && isBefore(ngayThucHien, ngayYLenh)) {
      danhSachLỗi.push({
        phan_loai: 'PTTT',
        muc_do: 'Error',
        ma_luat: 'PTTT-07',
        index,
        canh_bao: `NGAY_TH_YL [${ngayThucHien}] som hon NGAY_YL [${ngayYLenh}].`,
      });
    }

    if (hasValue(xml1.NGAY_VAO) && hasValue(ngayThucHien) && isBefore(ngayThucHien, xml1.NGAY_VAO)) {
      danhSachLỗi.push({
        phan_loai: 'PTTT',
        muc_do: 'Warning',
        ma_luat: 'PTTT-08',
        index,
        canh_bao: `Thoi diem PTTT [${ngayThucHien}] truoc NGAY_VAO [${xml1.NGAY_VAO}].`,
      });
    }

    if (hasValue(xml1.NGAY_RA) && hasValue(ngayThucHien) && isBefore(xml1.NGAY_RA, ngayThucHien)) {
      danhSachLỗi.push({
        phan_loai: 'PTTT',
        muc_do: 'Warning',
        ma_luat: 'PTTT-09',
        index,
        canh_bao: `Thoi diem PTTT [${ngayThucHien}] sau NGAY_RA [${xml1.NGAY_RA}].`,
      });
    }

    if (!hasValue(nguoiThucHien) && !hasValue(maBacSi)) {
      danhSachLỗi.push({
        phan_loai: 'PTTT',
        muc_do: 'Critical',
        ma_luat: 'PTTT-10',
        index,
        canh_bao: 'Dong PTTT thiếu NGUOI_THUC_HIEN va MA_BAC_SI.',
      });
    }
  });

  if (dsPTTT.length > 0 && Array.isArray(xml5) && xml5.length > 0) {
    const coTomTatPTTT = xml5.some((row) => hasValue(row?.PHAU_THUAT));
    if (!coTomTatPTTT) {
      danhSachLỗi.push({
        phan_loai: 'PTTT',
        muc_do: 'Warning',
        ma_luat: 'PTTT-11',
        canh_bao: 'XML3 có PTTT nhưng XML5 chưa ghi tóm tắt PHAU_THUAT.',
      });
    }
  }

  return danhSachLỗi;
};
