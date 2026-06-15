/**
 * Chuẩn hóa bảng tương tác thuốc sau nhập/ghi: bỏ dòng trùng nội dung; tách mã MA_TUONG_TAC trùng nhưng khác nội dung;
 * gán id duy nhất (tt-<MA>) để React key ổn định — tránh chỉ render ~186/266 khi trùng id.
 */

const UPPER = (s) => String(s || '').trim().toUpperCase();

const jsonNoIdSorted = (r) => {
  const o = { ...(r && typeof r === 'object' ? r : {}) };
  delete o.id;
  const keys = Object.keys(o).sort();
  const sorted = {};
  keys.forEach((k) => {
    sorted[k] = o[k];
  });
  return JSON.stringify(sorted);
};

/**
 * @param {object[]} rows
 * @returns {object[]}
 */
export function chuanHoaBangTuongTacKhongTrungKey(rows) {
  const arr = Array.isArray(rows) ? rows : [];
  const seenBody = new Set();
  const deduped = [];
  for (const r of arr) {
    const k = jsonNoIdSorted(r);
    if (seenBody.has(k)) continue;
    seenBody.add(k);
    deduped.push({ ...r });
  }

  let maxN = 0;
  deduped.forEach((r) => {
    const m = String(r.MA_TUONG_TAC || '').match(/^TUONGTAC_(\d+)$/i);
    if (m) maxN = Math.max(maxN, parseInt(m[1], 10));
  });
  let nextMa = maxN + 1;

  const maNoiDungDau = new Map();
  for (let i = 0; i < deduped.length; i += 1) {
    const ma = UPPER(deduped[i].MA_TUONG_TAC);
    if (!ma) continue;
    const body = jsonNoIdSorted(deduped[i]);
    if (!maNoiDungDau.has(ma)) {
      maNoiDungDau.set(ma, body);
      continue;
    }
    if (maNoiDungDau.get(ma) !== body) {
      deduped[i] = { ...deduped[i], MA_TUONG_TAC: `TUONGTAC_${nextMa}` };
      nextMa += 1;
    }
  }

  /** Mã dạng TUONGTAC_1…TUONGTAC_9 (một chữ số) — lỗi gán mã khi maxSuffix=0; đẩy lên dải TUONGTAC_n+1. */
  const reShortMa = /^TUONGTAC_(\d)$/i;
  let maxSuffix = 0;
  deduped.forEach((r) => {
    const m = String(r.MA_TUONG_TAC || '').match(/^TUONGTAC_(\d+)$/i);
    if (m) maxSuffix = Math.max(maxSuffix, parseInt(m[1], 10));
  });
  let nextFree = maxSuffix + 1;
  for (let i = 0; i < deduped.length; i += 1) {
    const rawMa = String(deduped[i].MA_TUONG_TAC || '');
    if (!reShortMa.test(rawMa)) continue;
    deduped[i] = { ...deduped[i], MA_TUONG_TAC: `TUONGTAC_${nextFree}` };
    nextFree += 1;
  }

  const usedIds = new Set();
  return deduped.map((r, i) => {
    const ma = UPPER(r.MA_TUONG_TAC);
    let idBase = ma ? `tt-${ma}` : `tt-ROW_${i}`;
    let id = idBase;
    let suf = 0;
    while (usedIds.has(id)) {
      suf += 1;
      id = `${idBase}__${suf}`;
    }
    usedIds.add(id);
    return { ...r, id };
  });
}

export function coTrungIdHoacTrungNoiDungBangTuongTac(rows) {
  const arr = Array.isArray(rows) ? rows : [];
  if (arr.length === 0) return false;
  const ids = arr.map((r) => String(r?.id ?? ''));
  if (new Set(ids).size < ids.length) return true;
  const bodies = new Set();
  for (const r of arr) {
    const k = jsonNoIdSorted(r);
    if (bodies.has(k)) return true;
    bodies.add(k);
  }
  const maFirst = new Map();
  for (const r of arr) {
    const ma = UPPER(r?.MA_TUONG_TAC);
    if (!ma) continue;
    const body = jsonNoIdSorted(r);
    if (!maFirst.has(ma)) {
      maFirst.set(ma, body);
    } else if (maFirst.get(ma) !== body) {
      return true;
    }
  }
  return false;
}
