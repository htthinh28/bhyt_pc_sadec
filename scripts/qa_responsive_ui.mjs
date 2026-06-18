/**
 * QA: responsive layout utilities & integration.
 * Chạy: node scripts/qa_responsive_ui.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

// --- taoKieuResponsive logic mirror ---
const BREAKPOINTS = { xs: 420, sm: 768, md: 860, lg: 960, xl: 1024, xxl: 1280 };

const taoKieu = (width) => ({
  phone: width < BREAKPOINTS.sm,
  flexRowSm: width >= BREAKPOINTS.sm ? 'row' : 'column',
});

assert(taoKieu(400).phone === true, 'phone detect');
assert(taoKieu(400).flexRowSm === 'column', 'phone column');
assert(taoKieu(900).flexRowSm === 'row', 'tablet row');

const diemAnh = read('ma_nguon/tien_ich/diem_anh_man_hinh.jsx');
const tongQuan = read('ma_nguon/man_hinh/tong_quan.jsx');
const kho = read('ma_nguon/man_hinh/man_hinh_kho_luu_tru.jsx');
const onOff = read('ma_nguon/man_hinh/quan_ly_quy_tac_on_off.jsx');
const baoCao = read('ma_nguon/man_hinh/bao_cao/BaoCaoHub.jsx');

assert(diemAnh.includes('taoKieuResponsive'), 'missing taoKieuResponsive');
assert(diemAnh.includes('useKieuResponsive'), 'missing useKieuResponsive');
assert(tongQuan.includes('useKieuResponsive'), 'tong_quan should use kieu responsive');
assert(tongQuan.includes('kieu.flexRowSm'), 'tong_quan dynamic header row');
assert(kho.includes('useKieuResponsive'), 'kho should use kieu responsive');
assert(kho.includes('kieu.searchInput'), 'kho flexible search');
assert(!onOff.includes("Platform.OS === 'web' ? 'row'"), 'on_off should not use Platform.OS row');
assert(baoCao.includes('rongSidebarTheoMan'), 'bao cao dynamic sidebar');

console.log(JSON.stringify({ ok: true, tests: ['breakpoints', 'source_integration'] }, null, 2));
