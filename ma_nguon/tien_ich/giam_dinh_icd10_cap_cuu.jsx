/**
 * Đối chiếu hồ sơ "cấp cứu" (XML1) với danh mục nội bộ ICD-10 nhập viện cấp cứu
 * (cột Tinh_Trang_Benh, Ly_Do_Nhap_Vien, ICD_Chinh, ICD_Kem_Theo; phân nhánh NHI NH** / NL**).
 */

const ICD_RG = /[A-TV-Z]\d{2}(?:\.\d+)?/gi;

const normalizeTextNoAccent = (value) =>
    String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase();

const chuanHoaMaIcd = (raw) => String(raw || '').replace(/\s/g, '').replace(/\./g, '').toUpperCase();

export const trichMaIcdTuChuoiMoTa = (s) => {
    const out = [];
    const seen = new Set();
    const m = String(s || '').match(ICD_RG) || [];
    m.forEach((x) => {
        const k = chuanHoaMaIcd(x);
        if (k && !seen.has(k)) {
            seen.add(k);
            out.push(k);
        }
    });
    return out;
};

const khopMaIcd = (patientNorm, catalogNorm) => {
    if (!patientNorm || !catalogNorm) return false;
    if (patientNorm === catalogNorm) return true;
    if (patientNorm.startsWith(catalogNorm)) return true;
    if (catalogNorm.length >= 3 && patientNorm.startsWith(catalogNorm.slice(0, 3))) return true;
    return false;
};

/**
 * Chẩn đoán chính có xuất hiện trong chuỗi ICD_Chinh hoặc ICD_Kem_Theo của dòng danh mục (theo mã trích được).
 */
export const icdChinhPhuHopDongDanhMuc = (xml1, row) => {
    const maChinh = chuanHoaMaIcd(xml1?.MA_BENH_CHINH || xml1?.MA_BENH || '');
    if (!maChinh) return false;
    const pool = [...trichMaIcdTuChuoiMoTa(row?.ICD_Chinh), ...trichMaIcdTuChuoiMoTa(row?.ICD_Kem_Theo)];
    return pool.some((c) => khopMaIcd(maChinh, c));
};

/**
 * Có ít nhất một từ khóa đủ dài từ Tinh_Trang_Benh hoặc Ly_Do_Nhap_Vien xuất hiện trong văn bản hồ sơ.
 */
export const vanBanHoSoCoPhanAnhLyDoHoacTinhTrang = (hoSoNorm, row) => {
    const blob = `${row?.Tinh_Trang_Benh || ''} ${row?.Ly_Do_Nhap_Vien || ''}`;
    const tokens = normalizeTextNoAccent(blob)
        .split(/[\s,.;:()[\]"/]+/)
        .map((t) => t.trim())
        .filter((t) => t.length >= 5);
    if (tokens.length === 0) return false;
    return tokens.some((t) => hoSoNorm.includes(t));
};

export const laCapCuuTheoXml1 = (xml1) => {
    const ly = String(xml1?.MA_LY_DO_VV ?? xml1?.LY_DO_VV ?? '').trim();
    if (ly === '2') return true;
    const lyVien = String(xml1?.MA_LY_DO_VVIEN ?? xml1?.MA_LYDO_VVIEN ?? xml1?.MA_LY_DO_VNT ?? '').trim();
    return lyVien === '2';
};

export const laTreEmTheoXml1 = (xml1) => {
    const tn = Number(xml1?.TUOI_NAM);
    if (Number.isFinite(tn)) return tn < 16;
    const tng = Number(xml1?.TUOI_NGAY);
    if (Number.isFinite(tng)) return tng < 16 * 365;
    return null;
};

export const nhomIdLaNhi = (id) => /^NH\d+/i.test(String(id || ''));

export const nhomIdLaNguoiLon = (id) => /^NL\d+/i.test(String(id || ''));

export const locDongDanhMucTheoDoTuoi = (rows, laTre) => {
    if (!Array.isArray(rows)) return [];
    if (laTre === null) return rows;
    if (laTre) return rows.filter((r) => nhomIdLaNhi(r?.ID));
    return rows.filter((r) => nhomIdLaNguoiLon(r?.ID));
};

export const ghepVanBanLamSangXml1 = (xml1) =>
    [xml1?.CHAN_DOAN_VAO, xml1?.CHAN_DOAN_RV, xml1?.GHI_CHU, xml1?.PP_DIEU_TRI].filter(Boolean).join(' ');

/**
 * @returns {boolean} true = vi phạm (cần cảnh báo)
 */
export const viPhamQuy_tacCapCuuIcd10 = (xml1, rowsCapCuu) => {
    if (!xml1 || !laCapCuuTheoXml1(xml1)) return false;
    const rows = Array.isArray(rowsCapCuu) ? rowsCapCuu : [];
    if (rows.length === 0) return false;

    const laTre = laTreEmTheoXml1(xml1);
    const ds = locDongDanhMucTheoDoTuoi(rows, laTre);
    if (ds.length === 0) return false;

    const hoSoNorm = normalizeTextNoAccent(ghepVanBanLamSangXml1(xml1));

    for (let i = 0; i < ds.length; i += 1) {
        const row = ds[i];
        if (!icdChinhPhuHopDongDanhMuc(xml1, row)) continue;
        if (vanBanHoSoCoPhanAnhLyDoHoacTinhTrang(hoSoNorm, row)) return false;
    }
    return true;
};
