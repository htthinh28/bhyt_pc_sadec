/**
 * So khớp file Excel ON/OFF (mọi sheet *_LUAT_*) với bundle luật trong repo
 * (seed + hardcoded CDHA/CK/HD/Giường/NS/Chuyên đề + DEFAULT_DVKT_RULES).
 *
 * Chạy: node scripts/qa_on_off_excel_vs_repo.mjs [đường_dẫn.xlsx]
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import XLSX from 'xlsx';
import { chuanHoaKhoaMaLuatOnOff } from '../ma_nguon/tien_ich/quy_tac_on_off_khop.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

const sheetToTabId = (sheetName) => {
  const i = String(sheetName).indexOf('_LUAT_');
  if (i === -1) return null;
  return `LUAT_${String(sheetName).slice(i + '_LUAT_'.length)}`;
};

function evalJsxExportArray(relPath, exportName) {
  const full = path.join(ROOT, relPath);
  let code = fs.readFileSync(full, 'utf8').replace(/export const /g, 'var ');
  const ctx = vm.createContext({});
  vm.runInContext(`${code}\nvar __out = ${exportName};`, ctx);
  return Array.isArray(ctx.__out) ? ctx.__out : [];
}

function evalHardcodedLayDanhSach(relPath, fnName) {
  const full = path.join(ROOT, relPath);
  let code = fs.readFileSync(full, 'utf8').replace(/export const /g, 'var ');
  const ctx = vm.createContext({});
  vm.runInContext(`${code}\nvar __out = ${fnName}();`, ctx);
  return Array.isArray(ctx.__out) ? ctx.__out : [];
}

function evalArrayLiteralFromFile(relPath, constName) {
  const full = path.join(ROOT, relPath);
  const src = fs.readFileSync(full, 'utf8');
  const needle = `const ${constName} = [`;
  const open = src.indexOf(needle);
  if (open === -1) throw new Error(`Không tìm thấy ${needle} trong ${relPath}`);
  const arrStart = src.indexOf('[', open);
  let depth = 0;
  for (let i = arrStart; i < src.length; i += 1) {
    const c = src[i];
    if (c === '[') depth += 1;
    else if (c === ']') {
      depth -= 1;
      if (depth === 0) {
        const slice = src.slice(arrStart, i + 1);
        return vm.runInNewContext(`${slice}`, {});
      }
    }
  }
  throw new Error(`Không đóng được mảng ${constName}`);
}

function rowToKey(row) {
  const ma = norm(row.MA_LUAT || row.ma_luat);
  return chuanHoaKhoaMaLuatOnOff(ma) || ma.toUpperCase();
}

function buildRepoMap() {
  const map = new Map();
  const add = (rows, tabHint = '') => {
    (Array.isArray(rows) ? rows : []).forEach((r) => {
      const k = rowToKey(r);
      if (!k || k.includes('*')) return;
      map.set(k, {
        MA_LUAT: r.MA_LUAT,
        DIEU_KIEN: norm(r.DIEU_KIEN || r.dieu_kien),
        CANH_BAO: norm(r.CANH_BAO || r.canh_bao),
        TRANG_THAI: norm(r.TRANG_THAI || r.trang_thai || 'ON').toUpperCase() === 'OFF' ? 'OFF' : 'ON',
        tabHint,
      });
    });
  };

  add(evalJsxExportArray('ma_nguon/tien_ich/du_lieu_luat_du_lieu_muc1.jsx', 'DU_LIEU_SEED_LUAT_DU_LIEU_MUC1'), 'LUAT_DU_LIEU');
  add(evalJsxExportArray('ma_nguon/tien_ich/du_lieu_luat_hanh_chinh_muc2.jsx', 'DU_LIEU_SEED_LUAT_HANH_CHINH_MUC2'), 'LUAT_HANH_CHINH');
  add(evalJsxExportArray('ma_nguon/tien_ich/du_lieu_luat_thuoc_muc8.jsx', 'DU_LIEU_SEED_LUAT_THUOC_MUC8'), 'LUAT_THUOC');
  add(evalJsxExportArray('ma_nguon/tien_ich/du_lieu_luat_pttt_muc11.jsx', 'DU_LIEU_SEED_LUAT_PTTT_MUC11'), 'LUAT_PTTT');

  add(evalHardcodedLayDanhSach('ma_nguon/tien_ich/luat_cdha_hardcoded.jsx', 'layDanhSachLuatCdhaHardcoded'), 'LUAT_CDHA');
  add(evalHardcodedLayDanhSach('ma_nguon/tien_ich/luat_cong_kham_hardcoded.jsx', 'layDanhSachLuatCongKhamHardcoded'), 'LUAT_CONG_KHAM');
  add(evalHardcodedLayDanhSach('ma_nguon/tien_ich/luat_hop_dong_hardcoded.jsx', 'layDanhSachLuatHopDongHardcoded'), 'LUAT_HOP_DONG');
  add(evalHardcodedLayDanhSach('ma_nguon/tien_ich/luat_giuong_hardcoded.jsx', 'layDanhSachLuatGiuongHardcoded'), 'LUAT_GIUONG');
  add(evalHardcodedLayDanhSach('ma_nguon/tien_ich/luat_nhan_su_hardcoded.jsx', 'layDanhSachLuatNhanSuHardcoded'), 'LUAT_NHAN_SU');
  add(evalHardcodedLayDanhSach('ma_nguon/tien_ich/luat_giam_dinh_chuyen_de_hardcoded.jsx', 'layDanhSachLuatGiamDinhChuyenDeHardcoded'), 'LUAT_CDHA');

  const dvktRules = evalArrayLiteralFromFile('ma_nguon/tien_ich/dvkt_op_giam_dinh.jsx', 'DEFAULT_DVKT_RULES');
  (dvktRules || []).forEach((r) => {
    const code = norm(r.RULE_CODE || r.RULE_NAME);
    if (!code) return;
    const row = {
      MA_LUAT: code,
      DIEU_KIEN: norm([`Toán tử: ${r.OPERATOR || '—'}`, `Mức: ${r.SEVERITY || '—'}`].join(' ')),
      CANH_BAO: norm(r.ALERT_MESSAGE),
      TRANG_THAI: String(r.STATUS || 'ON').toUpperCase() === 'OFF' ? 'OFF' : 'ON',
    };
    add([row], 'LUAT_CDHA');
  });

  return map;
}

function readExcelRows(xlsxPath) {
  const wb = XLSX.readFile(xlsxPath, { cellDates: false });
  const out = [];
  for (const sheetName of wb.SheetNames) {
    const tab = sheetToTabId(sheetName);
    if (!tab) continue;
    const ws = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
    rows.forEach((raw) => {
      const MA_LUAT = norm(raw.MA_LUAT);
      if (!MA_LUAT) return;
      out.push({
        sheet: sheetName,
        tab,
        MA_LUAT,
        TEN_QUY_TAC: norm(raw.TEN_QUY_TAC),
        DIEU_KIEN: norm(raw.DIEU_KIEN),
        CANH_BAO: norm(raw.CANH_BAO),
        TRANG_THAI: norm(raw.TRANG_THAI).toUpperCase() === 'OFF' ? 'OFF' : 'ON',
        LOAI_QUY_TAC: norm(raw.LOAI_QUY_TAC),
      });
    });
  }
  return out;
}

const xlsxPath =
  process.argv[2] ||
  path.join('c:', 'Users', 'admin', 'Downloads', 'QuyTac_ON_OFF_TatCa_20260424_1837.xlsx');

if (!fs.existsSync(xlsxPath)) {
  console.error('Không thấy file:', xlsxPath);
  process.exit(1);
}

const repo = buildRepoMap();
const excelRows = readExcelRows(xlsxPath);

const mismatches = [];
const missingInRepo = [];
const wildcardRows = [];

for (const ex of excelRows) {
  const k = rowToKey(ex);
  if (!k || ex.MA_LUAT.includes('*')) {
    wildcardRows.push(ex);
    continue;
  }
  const rep = repo.get(k);
  if (!rep) {
    missingInRepo.push(ex);
    continue;
  }
  const d1 = ex.DIEU_KIEN;
  const d2 = rep.DIEU_KIEN;
  const c1 = ex.CANH_BAO;
  const c2 = rep.CANH_BAO;
  const t1 = ex.TRANG_THAI;
  const t2 = rep.TRANG_THAI;
  if (d1 !== d2 || c1 !== c2 || t1 !== t2) {
    mismatches.push({
      MA_LUAT: ex.MA_LUAT,
      key: k,
      sheet: ex.sheet,
      fields: {
        DIEU_KIEN: d1 === d2,
        CANH_BAO: c1 === c2,
        TRANG_THAI: t1 === t2,
      },
      excel: { DIEU_KIEN: d1, CANH_BAO: c1, TRANG_THAI: t1 },
      repo: { DIEU_KIEN: d2, CANH_BAO: c2, TRANG_THAI: t2 },
    });
  }
}

const excelKeys = new Set(excelRows.filter((r) => r.MA_LUAT && !r.MA_LUAT.includes('*')).map((r) => rowToKey(r)));
const missingInExcel = [];
for (const k of repo.keys()) {
  if (!excelKeys.has(k)) missingInExcel.push(k);
}

console.log(`File Excel: ${xlsxPath}`);
console.log(`Dòng có MA_LUAT (kể cả mẫu *): ${excelRows.length}`);
console.log(`Dòng mẫu (* trong MA_LUAT), bỏ qua so khớp điều kiện: ${wildcardRows.length}`);
console.log(`Khóa cụ thể trong Excel: ${excelKeys.size}`);
console.log(`Khóa trong repo (seed+hợp nhất, không gồm mẫu *): ${repo.size}`);
console.log(`Khớp hoàn toàn (DIEU_KIEN + CANH_BAO + TRANG_THAI seed): ${excelKeys.size - mismatches.length - missingInRepo.length}`);
console.log(`Thiếu trong repo: ${missingInRepo.length}`);
console.log(`Lệch nội dung: ${mismatches.length}`);
console.log(`Có trong repo nhưng không có trong Excel (tùy chọn — file Excel có thể là tập con): ${missingInExcel.length}`);

if (missingInRepo.length) {
  console.log('\n--- Thiếu trong repo (mẫu đầu 40) ---');
  missingInRepo.slice(0, 40).forEach((r) => console.log(r.tab, r.MA_LUAT, r.TEN_QUY_TAC?.slice(0, 60)));
}

const chiTrangThai = mismatches.filter((m) => m.fields.DIEU_KIEN && m.fields.CANH_BAO && !m.fields.TRANG_THAI);
const khac = mismatches.length - chiTrangThai.length;
console.log(`\nTrong ${mismatches.length} lệch: chỉ TRANG_THAI (DIEU_KIEN+CANH_BAO khớp): ${chiTrangThai.length}; còn lại (DK/CB): ${khac}`);
if (khac > 0) {
  console.log('--- Lệch DIEU_KIEN hoặc CANH_BAO (toàn bộ) ---');
  mismatches.filter((m) => !m.fields.DIEU_KIEN || !m.fields.CANH_BAO).forEach((m) => {
    console.log(m.MA_LUAT, m.sheet, JSON.stringify(m.fields));
  });
}

if (mismatches.length) {
  console.log('\n--- Lệch chi tiết (tối đa 25) ---');
  mismatches.slice(0, 25).forEach((m) => {
    console.log(`\n${m.MA_LUAT} [${m.sheet}]`);
    console.log('  khớp:', JSON.stringify(m.fields));
    if (!m.fields.DIEU_KIEN) {
      console.log('  EXCEL DK:', m.excel.DIEU_KIEN.slice(0, 220));
      console.log('  REPO  DK:', m.repo.DIEU_KIEN.slice(0, 220));
    }
    if (!m.fields.CANH_BAO) {
      console.log('  EXCEL CB:', m.excel.CANH_BAO.slice(0, 220));
      console.log('  REPO  CB:', m.repo.CANH_BAO.slice(0, 220));
    }
    if (!m.fields.TRANG_THAI) {
      console.log('  TRANG_THAI excel | repo:', m.excel.TRANG_THAI, '|', m.repo.TRANG_THAI);
    }
  });
}

if (process.exitCode !== 1 && (missingInRepo.length || mismatches.length)) {
  process.exitCode = 1;
}
