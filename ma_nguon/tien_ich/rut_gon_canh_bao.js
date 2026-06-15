/**
 * Rút gọn nội dung phản hồi quy tắc — mỗi câu một ý, tránh chồng lấn.
 */

const RE_KHOANG_TRANG = /\s+/g;
const RE_EMOJI_DAU = /^([⛔🔴🟠⚠️💡🚫]+)\s*/u;
const RE_TIEU_DE_THUA = [
  /^(VI PHẠM|CẢNH BÁO|SAI LỆCH|JCI AUDIT)\s*[:\-–—]\s*/iu,
  /^\[CẢNH BÁO\]\s*:?\s*/iu,
  /^Cảnh báo:\s*/iu,
];
const RE_NGOAC_DAI = /\s*\([^)]{40,}\)/g;
const RE_THEO_QUY_DINH_DAI = /\s+theo\s+(QĐ|TT|Điều|mục|Thông tư|Nghị định)[^.]{8,}\.?/giu;

const GIOI_HAN_KY_TU = 180;

export const lamSachChuoiCanhBao = (value) => String(value || '').replace(RE_KHOANG_TRANG, ' ').trim();

const tokenHoa = (text) => lamSachChuoiCanhBao(text).toUpperCase().replace(/[^A-Z0-9]/g, '');

export const rutGonCanhBaoCoBan = (raw) => {
  let s = lamSachChuoiCanhBao(raw);
  if (!s) return s;

  const emoji = (s.match(RE_EMOJI_DAU) || [])[1] || '';
  s = s.replace(RE_EMOJI_DAU, '');
  RE_TIEU_DE_THUA.forEach((re) => { s = s.replace(re, ''); });
  s = s.replace(RE_NGOAC_DAI, '');
  s = s.replace(RE_THEO_QUY_DINH_DAI, '');
  s = lamSachChuoiCanhBao(s);

  if (s.length > GIOI_HAN_KY_TU) {
    const cauDau = s.match(/^[^.!?]+[.!?]?/u);
    if (cauDau && cauDau[0].length >= 24) {
      s = lamSachChuoiCanhBao(cauDau[0]);
    } else {
      s = `${s.slice(0, GIOI_HAN_KY_TU - 1).trim()}…`;
    }
  }

  s = s.replace(/[.…]+$/, '').trim();
  if (!s) return '';
  const ket = /[.!?]$/.test(s) ? s : `${s}.`;
  return emoji ? `${emoji} ${ket}` : ket;
};

/** Gộp tối đa một chi tiết ngắn — không nhồi nhiều mục vào một câu. */
export const ghepCanhBaoVaChiTietNgan = (message = '', details = []) => {
  const text = rutGonCanhBaoCoBan(message);
  const seen = new Set();
  const danhSach = (Array.isArray(details) ? details : [])
    .map((item) => rutGonCanhBaoCoBan(item))
    .filter((item) => {
      if (!item) return false;
      const key = tokenHoa(item);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const tokenMessage = tokenHoa(text);
  const boSung = danhSach.filter((item) => {
    const token = tokenHoa(item);
    return token && (!tokenMessage || !tokenMessage.includes(token));
  });

  if (!text) return boSung[0] || '';
  if (!boSung.length) return text;
  if (text.length + boSung[0].length + 3 <= GIOI_HAN_KY_TU) {
    return rutGonCanhBaoCoBan(`${text.replace(/\.$/, '')} · ${boSung[0]}`);
  }
  return text;
};

/** Loại cảnh báo bị bao hàm bởi câu dài hơn (cùng mã luật). */
export const locCanhBaoBiBaoHoa = (danhSach = []) => {
  const items = (Array.isArray(danhSach) ? danhSach : []).map((loi) => ({
    ...loi,
    canh_bao: rutGonCanhBaoCoBan(loi?.canh_bao),
  }));
  if (items.length <= 1) return items;

  const theoMa = new Map();
  items.forEach((loi) => {
    const ma = String(loi?.ma_luat || '').trim().toUpperCase() || 'KHONG_MA_LUAT';
    if (!theoMa.has(ma)) theoMa.set(ma, []);
    theoMa.get(ma).push(loi);
  });

  const ketQua = [];
  theoMa.forEach((nhom) => {
    if (nhom.length <= 1) {
      ketQua.push(...nhom);
      return;
    }
    const tokens = nhom.map((loi) => ({
      loi,
      token: tokenHoa(loi.canh_bao),
    }));
    tokens.forEach((a, i) => {
      if (!a.token) {
        ketQua.push(a.loi);
        return;
      }
      const biBao = tokens.some((b, j) => (
        i !== j
        && b.token.length > a.token.length
        && b.token.includes(a.token)
      ));
      if (!biBao) ketQua.push(a.loi);
    });
  });
  return ketQua;
};

export const chuanHoaChuoiGomCanhBao = (s) => tokenHoa(rutGonCanhBaoCoBan(s));
