/**
 * Quét thư mục tai_nguyen/ — file XML định dạng GIAMDINHHS (hồ sơ kiểm tra),
 * giải mã khối XML1 (base64 trong NOIDUNGFILE) để lấy MA_LK, MACSKCB.
 *
 * Sinh: tai_lieu/_index_tai_nguyen_xml.json (phục vụ huấn luyện AI — chọn ca theo MA_LK).
 *
 * Chạy: node scripts/index_tai_nguyen_xml.mjs
 * Thư mục con (tuỳ chọn): node scripts/index_tai_nguyen_xml.mjs xml2_ip
 *   → ghi tai_lieu/_index_tai_nguyen_xml2_ip.json
 * Hoặc: npm run tai_lieu:index-tai-nguyen | npm run tai_lieu:index-tai-nguyen-xml2-ip
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const sub = String(process.argv[2] || '').trim().replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
const SRC = sub ? path.join(root, 'tai_nguyen', ...sub.split('/')) : path.join(root, 'tai_nguyen');
const outName = sub
  ? `_index_tai_nguyen_${sub.replace(/\//g, '_')}.json`
  : '_index_tai_nguyen_xml.json';
const OUT = path.join(root, 'tai_lieu', outName);

function walkXml(dir, base = '') {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${name.name}` : name.name;
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      out.push(...walkXml(full, rel));
    } else if (name.isFile() && name.name.toLowerCase().endsWith('.xml')) {
      out.push({ full, rel: rel.replace(/\\/g, '/') });
    }
  }
  return out;
}

/** Trích MA_LK và MACSKCB từ file GIAMDINHHS. */
function trichTuGiamDinhHs(raw) {
  let ma_lk = '';
  let ma_cskcb = '';
  const mCskcb = raw.match(/<MACSKCB>([^<]*)<\/MACSKCB>/i);
  if (mCskcb) ma_cskcb = mCskcb[1].trim();

  const mBlock = raw.match(/<LOAIHOSO>XML1<\/LOAIHOSO>\s*<NOIDUNGFILE>([^<]+)<\/NOIDUNGFILE>/i);
  if (!mBlock) {
    return { ma_lk: '', ma_cskcb, ma_loai_kcb: '', ma_benh_chinh: '', loi: 'khong_tim_thay_XML1' };
  }
  let inner = '';
  try {
    inner = Buffer.from(mBlock[1].trim(), 'base64').toString('utf8');
  } catch {
    return { ma_lk: '', ma_cskcb, ma_loai_kcb: '', ma_benh_chinh: '', loi: 'base64_loi' };
  }
  const mLk = inner.match(/<MA_LK>([^<]*)<\/MA_LK>/i);
  if (mLk) ma_lk = mLk[1].trim();
  const mLkcb = inner.match(/<MA_LOAI_KCB>([^<]*)<\/MA_LOAI_KCB>/i);
  const mBenh = inner.match(/<MA_BENH_CHINH>([^<]*)<\/MA_BENH_CHINH>/i);
  return {
    ma_lk,
    ma_cskcb,
    ma_loai_kcb: mLkcb ? mLkcb[1].trim() : '',
    ma_benh_chinh: mBenh ? mBenh[1].trim() : '',
    loi: ma_lk ? '' : 'khong_doc_duoc_MA_LK',
  };
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.warn('[index_tai_nguyen_xml] Không có thư mục tai_nguyen/');
    fs.writeFileSync(
      OUT,
      `${JSON.stringify({ generatedAt: new Date().toISOString(), tong_so: 0, items: [], ghi_chu: 'Chưa có thư mục tai_nguyen' }, null, 2)}\n`,
      'utf8',
    );
    return;
  }

  const files = walkXml(SRC);
  const items = [];
  for (const { full, rel } of files) {
    const st = fs.statSync(full);
    let raw = '';
    try {
      raw = fs.readFileSync(full, 'utf8');
    } catch (e) {
      items.push({
        relPath: sub ? `tai_nguyen/${sub}/${rel}` : `tai_nguyen/${rel}`,
        bytes: st.size,
        mtime: st.mtime.toISOString(),
        ma_lk: '',
        ma_cskcb: '',
        ma_loai_kcb: undefined,
        ma_benh_chinh: undefined,
        loi_doc: String(e?.message || e),
      });
      continue;
    }
    const { ma_lk, ma_cskcb, ma_loai_kcb, ma_benh_chinh, loi } = trichTuGiamDinhHs(raw);
    items.push({
      relPath: sub ? `tai_nguyen/${sub}/${rel}` : `tai_nguyen/${rel}`,
      bytes: st.size,
      mtime: st.mtime.toISOString(),
      ma_lk,
      ma_cskcb,
      ma_loai_kcb: ma_loai_kcb || undefined,
      ma_benh_chinh: ma_benh_chinh || undefined,
      loi_doc: loi || undefined,
    });
  }

  items.sort((a, b) => (a.ma_lk || a.relPath).localeCompare(b.ma_lk || b.relPath, 'vi'));

  const payload = {
    generatedAt: new Date().toISOString(),
    nguon_thu_muc: sub ? `tai_nguyen/${sub}` : 'tai_nguyen',
    mo_ta:
      'File XML định dạng GIAMDINHHS. MA_LK, MA_LOAI_KCB, MA_BENH_CHINH (nếu có) đọc từ XML1 sau base64. Dùng để neo ca huấn luyện với đường dẫn file thật.',
    tong_so: items.length,
    items,
  };

  fs.writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  const ok = items.filter((x) => x.ma_lk).length;
  console.log(`[index_tai_nguyen_xml] Đã ghi ${OUT} — ${items.length} file, ${ok} có MA_LK.`);
}

main();
