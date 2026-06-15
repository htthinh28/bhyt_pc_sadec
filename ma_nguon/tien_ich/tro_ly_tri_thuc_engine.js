/**
 * Trợ lý tri thức nội bộ: tìm kiếm + trích đoạn từ thư viện tai_lieu (manifest)
 * và bản ghi tri thức tích lũy — không gọi API / LLM bên ngoài.
 */
import { taoUrlMoTaiLieu } from './tai_lieu_url';

/** Sau chuẩn hóa bỏ dấu (token chỉ còn a-z) */
const TU_DUNG_BO_QUA = new Set([
  'va', 'cua', 'cho', 'la', 'co', 'khong', 'vi', 'theo', 'mot', 'cac', 'da', 'de', 'bi', 'hay', 'hoac',
  'tai', 'voi', 'nay', 'duoc', 'trong', 'khi', 'ma', 'neu', 'thi', 'cung', 'den', 'tu', 've',
]);

export const tachMaQuyTacTuCau = (text) => {
  const raw = String(text || '');
  const out = new Set();
  const re = /\b([A-Z]{2,}_[0-9]+|[A-Z]+-[A-Z]{2,}-[0-9]+|THUOC_\d+|DVKT[_-]?\d+|CK_\d+|HC[_-]?\d+|NS_\d+|PY_BATCH_\d+)\b/gi;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const s = String(m[1] || m[0] || '').trim();
    if (s.length >= 4) out.add(s.toUpperCase());
  }
  return [...out];
};

export const chuanHoaToken = (text) => {
  const s = String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
  return s.split(/\s+/).filter((t) => t.length > 1 && !TU_DUNG_BO_QUA.has(t));
};

export const htmlSangVanBan = (html) => {
  let s = String(html || '');
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|h[1-6]|li|tr)>/gi, '\n');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s.replace(/&nbsp;/gi, ' ');
  s = s.replace(/&amp;/g, '&');
  s = s.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');
  s = s.replace(/&quot;/g, '"');
  s = s.replace(/\s+\n/g, '\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s.replace(/[ \t]{2,}/g, ' ').trim();
};

const tachChunk = (text, maxLen = 900) => {
  const t = String(text || '').trim();
  if (!t) return [];
  const paras = t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const chunks = [];
  for (const p of paras) {
    if (p.length <= maxLen) {
      chunks.push(p);
      continue;
    }
    for (let i = 0; i < p.length; i += maxLen - 120) {
      chunks.push(p.slice(i, i + maxLen));
    }
  }
  return chunks.slice(0, 80);
};

const diemChunk = (chunk, tokens, maQuyTac) => {
  const c = String(chunk || '').toLowerCase();
  let score = 0;
  for (const tok of tokens) {
    if (!tok || tok.length < 2) continue;
    const n = c.split(tok).length - 1;
    if (n > 0) score += Math.log1p(n) * (tok.length > 4 ? 1.4 : 1);
  }
  for (const ma of maQuyTac) {
    const u = String(ma || '').toLowerCase();
    if (!u) continue;
    if (c.includes(u)) score += 18;
    else if (c.includes(u.replace(/_/g, ' '))) score += 16;
    else if (u.includes('_') && u.replace(/_/g, '').length >= 5 && c.includes(u.replace(/_/g, ''))) score += 14;
  }
  return score;
};

/** Chunk có xuất hiện mã quy tắc trong nội dung không (gạch dưới / khoảng trắng) */
const chunkCoMaQuyTac = (chunk, maQuyTac) => {
  const c = String(chunk || '').toLowerCase().replace(/\s+/g, ' ');
  return (maQuyTac || []).some((ma) => {
    const u = String(ma || '').toLowerCase();
    if (!u) return false;
    if (c.includes(u)) return true;
    if (c.includes(u.replace(/_/g, ' '))) return true;
    const g = u.replace(/_/g, '');
    return g.length >= 5 && c.includes(g);
  });
};

/**
 * Ngưỡng điểm chunk: không còn kiểu «có mã trong câu hỏi thì nhận hết mọi đoạn».
 */
const chunkDuocGiu = (scoreChunk, chunk, tokens, maQuyTac) => {
  if (chunkCoMaQuyTac(chunk, maQuyTac)) return scoreChunk >= 0;
  if (maQuyTac.length && !tokens.length) return false;
  const nTok = Math.max(1, (tokens || []).length);
  const nguong = 0.55 + 0.28 * Math.min(nTok, 6);
  return scoreChunk >= nguong;
};

/** File manifest có khả năng liên quan câu hỏi (tránh quét bừa khi có THUOC_xxx). */
const taiLieuKhaDiVoiCauHoi = (row, tokens, maQuyTac) => {
  const s = row.score;
  if (s >= 2) return true;
  if (s >= 1.2 && (tokens || []).length >= 2) return true;
  if (s >= 1.5 && (tokens || []).length >= 3) return true;
  const blob = chuanHoaSoSanh(`${row.it?.title || ''} ${row.it?.relPath || ''}`);
  const blobGoc = `${String(row.it?.title || '')} ${String(row.it?.relPath || '')}`.toLowerCase();
  for (const ma of maQuyTac || []) {
    const u = String(ma || '').toLowerCase();
    if (!u) continue;
    if (blob.includes(u.replace(/_/g, '')) || blob.includes(u.replace(/_/g, ' '))) return true;
    if (blob.includes(u)) return true;
    if (blobGoc.includes(u)) return true;
  }
  return false;
};

const banGhiTriThucKhaDi = (rec, score, maQuyTac) => {
  if (score >= 2) return true;
  if (!maQuyTac?.length) return score >= 1.5;
  const ml = String(rec?.ma_luat_goi_y || '').toUpperCase().trim();
  if (!ml) return false;
  return maQuyTac.some((m) => {
    const u = String(m || '').toUpperCase();
    return ml === u || ml.includes(u) || u.includes(ml);
  });
};

const chuanHoaSoSanh = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ');

/**
 * Gắn nhãn nguồn theo module tích hợp (hiển thị trong RAG / popup).
 * @param {string} relPath
 * @param {string} title
 * @returns {'Thư viện' | 'Chuyên môn' | 'Danh mục nội bộ' | 'Quy tắc luật'}
 */
export const phanLoaiNguonTaiLieu = (relPath, title) => {
  const raw = `${String(relPath || '')} ${String(title || '')}`;
  const h = raw.toLowerCase();
  const a = chuanHoaSoSanh(raw);
  if (
    h.includes('phac_do') ||
    h.includes('phác đồ') ||
    h.includes('chuyen_mon') ||
    h.includes('chuyên môn') ||
    h.includes('/icd') ||
    h.includes('icd10') ||
    h.includes('cls') ||
    h.includes('cdha') ||
    h.includes('ebm') ||
    a.includes('phac do') ||
    a.includes('chuyen mon')
  ) {
    return 'Chuyên môn';
  }
  if (
    h.includes('danh_muc') ||
    h.includes('danh muc') ||
    h.includes('mau_xml') ||
    h.includes('catalog') ||
    h.includes('noi_bo') ||
    h.includes('noibo') ||
    h.includes('xml_mau') ||
    a.includes('danh muc')
  ) {
    return 'Danh mục nội bộ';
  }
  if (
    h.includes('quy_tac') ||
    h.includes('quytac') ||
    h.includes('the_tri_thuc') ||
    h.includes('checklist') ||
    h.includes('tt12') ||
    h.includes('tt_12') ||
    h.includes('nghi_dinh') ||
    h.includes('nghị định') ||
    h.includes('thong_tu') ||
    h.includes('thông tư') ||
    h.includes('co_so_phap') ||
    h.includes('qd_') ||
    h.includes('qd4210') ||
    h.includes('qd7464') ||
    a.includes('the tri thuc') ||
    a.includes('quy tac')
  ) {
    return 'Quy tắc luật';
  }
  return 'Thư viện';
};

/** Ưu tiên tài liệu phác đồ / chuyên môn / ICD trong thư viện (đường dẫn + tiêu đề). */
const diemUuTienPhacDoChuyenMon = (title, relPath) => {
  const raw = `${String(relPath || '')} ${String(title || '')}`;
  const h = raw.toLowerCase();
  const a = chuanHoaSoSanh(raw);
  let score = 0;
  if (h.includes('phac_do') || h.includes('phác đồ') || a.includes('phac do')) score += 14;
  if (h.includes('chuyen_mon') || h.includes('chuyên môn') || a.includes('chuyen mon')) score += 12;
  if (h.includes('icd') || h.includes('ICD')) score += 8;
  if (h.includes('cdss') && (h.includes('phac') || h.includes('phác'))) score += 6;
  if (h.includes('ebm') || h.includes('phac_do_cdss')) score += 5;
  return score;
};

const coTuKhoaLienQuanChuyenMon = (tokens) => {
  const k = new Set(['phac', 'do', 'chuyen', 'mon', 'icd', 'chan', 'dieu', 'tri', 'lam', 'sang', 'benh', 'mau', 'toa', 'thuoc', 'cdss', 'ebm']);
  return (tokens || []).some((t) => t && t.length >= 3 && k.has(t));
};

const chuanHoaCauTimThe = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Thẻ nghiệp vụ khớp câu hỏi (từ khóa + mã quy tắc) — dùng cộng điểm ưu tiên tài liệu có `tags` trong manifest.
 * @param {string} cauHoi
 * @param {string[]} tokens — từ chuanHoaToken
 * @param {string[]} maQuyTac
 * @returns {Set<string>}
 */
export const thuThapTagTuCauHoi = (cauHoi, tokens, maQuyTac) => {
  const active = new Set();
  const hay = chuanHoaCauTimThe(cauHoi);
  const compact = hay.replace(/\s/g, '');

  const needleToTag = [
    ['thuoc', 'thuoc'],
    ['hoat chat', 'thuoc'],
    ['khang sinh', 'thuoc'],
    ['xml 2', 'thuoc'],
    ['xml2', 'thuoc'],
    ['tuong tac', 'tuong_tac_thuoc'],
    ['dvkt', 'dvkt'],
    ['cdha', 'dvkt'],
    ['cls', 'dvkt'],
    ['vtyt', 'vtyt'],
    ['pttt', 'pttt'],
    ['phau thuat', 'pttt'],
    ['the bhyt', 'hanh_chinh'],
    ['hanh chinh', 'hanh_chinh'],
    ['xml 1', 'hanh_chinh'],
    ['icd', 'icd_chuyen_mon'],
    ['phac do', 'icd_chuyen_mon'],
    ['chuyen mon', 'icd_chuyen_mon'],
    ['cv266', 'cv266'],
    ['nghi dinh', 'phap_ly'],
    ['the tri thuc', 'the_tri_thuc'],
    ['tro ly tri thuc', 'ai_huan_luyen'],
    ['thu vien', 'ai_huan_luyen'],
    ['chuyen de', 'xml_chuyen_de'],
    ['xml130', 'xml_chuyen_de'],
    ['4210', 'cau_truc_xml'],
    ['7464', 'cau_truc_xml'],
    ['cau truc xml', 'cau_truc_xml'],
    ['qd 4210', 'cau_truc_xml'],
  ];
  for (const [needle, tag] of needleToTag) {
    const n = needle.replace(/\s+/g, '');
    if (hay.includes(needle) || (n.length >= 4 && compact.includes(n))) active.add(tag);
  }

  const tokenMap = {
    thuoc: 'thuoc',
    dvkt: 'dvkt',
    vtyt: 'vtyt',
    pttt: 'pttt',
    icd: 'icd_chuyen_mon',
  };
  for (const t of tokens || []) {
    if (tokenMap[t]) active.add(tokenMap[t]);
  }

  for (const m of maQuyTac || []) {
    const u = String(m).toUpperCase();
    if (u.startsWith('THUOC') || u.startsWith('DM-THUOC') || u.startsWith('TUONGTAC')) active.add('thuoc');
    if (u.startsWith('DVKT') || u.startsWith('CDHA')) active.add('dvkt');
    if (u.includes('VTYT')) active.add('vtyt');
    if (u.startsWith('CK_') || u.startsWith('HC_') || u.startsWith('NS_')) active.add('hanh_chinh');
  }

  return active;
};

const diemTheTrenTaiLieu = (itemTags, activeTags) => {
  if (!activeTags?.size || !Array.isArray(itemTags) || !itemTags.length) return 0;
  let c = 0;
  for (const t of itemTags) {
    if (activeTags.has(t)) c += 1;
  }
  return c * 15;
};

const diemTieuDe = (title, relPath, tokens, maQuyTac) => {
  const haystack = chuanHoaSoSanh(`${String(title || '')} ${String(relPath || '')}`);
  let score = diemUuTienPhacDoChuyenMon(title, relPath);
  for (const tok of tokens) {
    if (tok && haystack.includes(tok)) score += 2.5;
  }
  for (const ma of maQuyTac) {
    const ml = ma.toLowerCase();
    if (haystack.includes(ml) || String(relPath || '').toLowerCase().includes(ml)) score += 25;
  }
  return score;
};

const diemTriThucBanGhi = (rec, tokens, maQuyTac) => {
  const blob = [
    rec.tom_tat,
    rec.bai_hoc,
    rec.ma_luat_goi_y,
    rec.ma_lk,
    rec.snapshot_loi,
  ]
    .filter(Boolean)
    .join('\n')
    .toLowerCase();
  let score = 0;
  for (const tok of tokens) {
    if (blob.includes(tok)) score += 1.2;
  }
  for (const ma of maQuyTac) {
    if (blob.includes(ma.toLowerCase())) score += 15;
  }
  return score;
};

/**
 * @param {object} params
 * @param {string} params.cauHoi
 * @param {Array} params.manifestItems — từ tai_lieu_manifest.json
 * @param {string} [params.generatedAt]
 * @param {Array} [params.triThucGiamDinh] — từ layDanhSachTriThucTuGiamDinh
 * @param {number} [params.gioiHanTaiFile] — số file HTML tối đa fetch
 */
export const traLoiTroLyTriThuc = async ({
  cauHoi,
  manifestItems = [],
  generatedAt = '',
  triThucGiamDinh = [],
  gioiHanTaiFile = 10,
}) => {
  const hoi = String(cauHoi || '').trim();
  const tokens = chuanHoaToken(hoi);
  const maQuyTac = tachMaQuyTacTuCau(hoi);
  const gioiHan = coTuKhoaLienQuanChuyenMon(tokens) ? Math.max(gioiHanTaiFile, 14) : gioiHanTaiFile;

  if (!hoi) {
    return {
      ok: false,
      loi: 'Vui lòng nhập câu hỏi hoặc mã quy tắc (ví dụ THUOC_417, CK_41).',
      markdown: '',
      nguon: [],
    };
  }

  const items = Array.isArray(manifestItems) ? manifestItems : [];
  const activeTags = thuThapTagTuCauHoi(hoi, tokens, maQuyTac);
  const scored = items
    .map((it) => ({
      it,
      score:
        diemTieuDe(it.title, it.relPath, tokens, maQuyTac) +
        diemTheTrenTaiLieu(it.tags, activeTags),
    }))
    .sort((a, b) => b.score - a.score);

  const chon = [];
  const seen = new Set();
  const pushItem = (row) => {
    const id = row?.it?.id || row?.it?.relPath;
    if (!id || seen.has(id)) return;
    seen.add(id);
    chon.push(row);
  };

  for (const row of scored) {
    if (taiLieuKhaDiVoiCauHoi(row, tokens, maQuyTac)) pushItem(row);
    if (chon.length >= gioiHan + 5) break;
  }
  for (const row of scored) {
    if (taiLieuKhaDiVoiCauHoi(row, tokens, maQuyTac)) pushItem(row);
    if (chon.length >= gioiHan) break;
  }
  if (chon.length === 0) {
    for (const row of scored.slice(0, 12)) {
      pushItem(row);
    }
  }

  const trichTuTaiLieu = [];

  for (const { it, score: titleScore } of chon.slice(0, gioiHan)) {
    const url = taoUrlMoTaiLieu(it.relPath);
    if (!url) continue;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const html = await res.text();
      const plain = htmlSangVanBan(html);
      const chunks = tachChunk(plain);
      const ranked = chunks
        .map((ch, idx) => ({
          ch,
          idx,
          score: diemChunk(ch, tokens, maQuyTac) + (titleScore > 0 ? 0.5 : 0),
        }))
        .filter((x) => chunkDuocGiu(x.score, x.ch, tokens, maQuyTac))
        .sort((a, b) => b.score - a.score);

      const top = ranked.slice(0, ranked.length ? 2 : 0);

      for (const row of top) {
        if (!row.ch || row.ch.length < 20) continue;
        trichTuTaiLieu.push({
          loai: 'tai_lieu',
          tieuDe: it.title,
          duongDan: it.relPath,
          diem: row.score + titleScore * 0.1,
          doan: row.ch.length > 1600 ? `${row.ch.slice(0, 1600)}…` : row.ch,
        });
      }
    } catch {
      /* bỏ qua file lỗi mạng */
    }
  }

  trichTuTaiLieu.sort((a, b) => b.diem - a.diem);

  /** Bỏ các trích đoạn điểm quá thấp so với bản tốt nhất — tránh xen kẽ nội dung lạc đề. */
  if (trichTuTaiLieu.length > 1) {
    const dinh = trichTuTaiLieu[0]?.diem ?? 0;
    const san = trichTuTaiLieu.filter((x) => x.diem >= Math.max(0.85, dinh * 0.38));
    if (san.length >= 1) {
      trichTuTaiLieu.splice(0, trichTuTaiLieu.length, ...san.slice(0, 8));
    }
  }

  const triThucScored = (Array.isArray(triThucGiamDinh) ? triThucGiamDinh : [])
    .map((rec) => ({
      rec,
      score: diemTriThucBanGhi(rec, tokens, maQuyTac),
    }))
    .filter((x) => banGhiTriThucKhaDi(x.rec, x.score, maQuyTac))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const trichTriThuc = [];
  for (const { rec, score } of triThucScored) {
    const body = String(rec.bai_hoc || rec.tom_tat || '').trim();
    if (body.length < 15) continue;
    const snippet = body.length > 1400 ? `${body.slice(0, 1400)}…` : body;
    trichTriThuc.push({
      loai: 'tri_thuc_ca',
      tieuDe: rec.tom_tat || rec.ma_lk || 'Bản ghi',
      ma_lk: rec.ma_lk,
      ngay: rec.ngay_tao,
      diem: score,
      doan: snippet,
    });
  }

  const nguon = [];
  const daThemPath = new Set();
  for (const x of trichTuTaiLieu) {
    const k = x.duongDan;
    if (daThemPath.has(k)) continue;
    daThemPath.add(k);
    nguon.push({
      loai: phanLoaiNguonTaiLieu(x.duongDan, x.tieuDe),
      tieuDe: x.tieuDe,
      file: x.duongDan,
    });
  }
  for (const x of trichTriThuc) {
    const k = `gd:${x.ma_lk || ''}:${x.tieuDe || ''}`;
    if (daThemPath.has(k)) continue;
    daThemPath.add(k);
    nguon.push({
      loai: 'Tri thức từ kiểm tra (máy)',
      tieuDe: x.tieuDe || '—',
      file: x.ma_lk ? `MA_LK ${x.ma_lk}` : 'local',
    });
  }

  const doanDau = trichTuTaiLieu[0] || trichTriThuc[0];
  const tomTatYeuTo = doanDau
    ? String(doanDau.doan).replace(/\s+/g, ' ').trim().slice(0, 320)
    : '';
  const hoiRutGon = hoi.length > 200 ? `${hoi.slice(0, 197)}…` : hoi;
  const coKetQuaChatCheo = trichTuTaiLieu.length > 0 || trichTriThuc.length > 0;

  const lines = [];
  lines.push('### Theo câu hỏi của bạn');
  lines.push(`> ${hoiRutGon}`);
  lines.push('');
  lines.push('### Trả lời (trích nội bộ)');
  lines.push('');
  if (maQuyTac.length) {
    lines.push(`**Mã / từ khóa kỹ thuật:** ${maQuyTac.join(', ')}`);
    lines.push('');
  }
  if (tomTatYeuTo) {
    lines.push('**Đoạn khớp nhất với câu hỏi**');
    lines.push(`> ${tomTatYeuTo}${tomTatYeuTo.length >= 320 ? '…' : ''}`);
    lines.push('');
  } else {
    lines.push(
      '**Không tìm thấy đoạn văn khớp đủ mạnh** với từ khóa / mã bạn nhập trong thư viện đang có. Gợi ý: dùng đúng mã trên báo cáo (VD THUOC_417), thêm từ khóa tiếng Việt ngắn, hoặc mở 📚 Thư viện / Quản lý luật để đối chiếu trực tiếp.',
    );
    lines.push('');
  }

  if (coKetQuaChatCheo) {
    lines.push(
      '*Nguồn tra trong app: Thư viện · Chuyên môn · Danh mục nội bộ · Quy tắc luật · Tri thức kiểm tra.*',
    );
    if (generatedAt) {
      lines.push(`*Gói thư viện: ${generatedAt}.*`);
    }
    lines.push('');
  } else if (generatedAt) {
    lines.push(`*Gói thư viện: ${generatedAt}.*`);
    lines.push('');
  }

  if (trichTuTaiLieu.length) {
    lines.push('### Trích đoạn tài liệu (đã lọc theo độ liên quan)');
    lines.push('');
    trichTuTaiLieu.slice(0, 4).forEach((x, i) => {
      const nhom = phanLoaiNguonTaiLieu(x.duongDan, x.tieuDe);
      lines.push(`${i + 1}. **${x.tieuDe}** 〔${nhom}〕`);
      lines.push(`\`${x.duongDan}\``);
      lines.push('');
      lines.push(x.doan);
      lines.push('');
    });
  }

  if (trichTriThuc.length) {
    lines.push('### Tri thức từ kiểm tra (trên máy)');
    lines.push('');
    trichTriThuc.forEach((x, i) => {
      lines.push(`${i + 1}. **${x.tieuDe}**${x.ma_lk ? ` · MA_LK \`${x.ma_lk}\`` : ''}${x.ngay ? ` · ${String(x.ngay).slice(0, 10)}` : ''}`);
      lines.push('');
      lines.push(x.doan);
      lines.push('');
    });
  }

  lines.push('---');
  lines.push('*Trợ lý chỉ trích dẫn nội bộ; không thay cho văn bản pháp lý hay quyết định thanh toán của cơ quan BHXH.*');

  return {
    ok: true,
    markdown: lines.join('\n'),
    nguon: nguon.slice(0, 24),
    meta: {
      soTaiLieuDaQuet: Math.min(chon.length, gioiHan),
      soTriThuc: trichTriThuc.length,
      maQuyTac,
    },
  };
};
