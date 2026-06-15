/**
 * Đọc file Excel danh mục tương tác thuốc (cột: Mã tương tác, Nội dung tương tác, Cảnh báo hệ thống)
 * → sinh ma_nguon/chuyen_mon/tuong_tac_thuoc/du_lieu_tuong_tac_thuoc.seed.json
 *
 * Dùng: node scripts/build_tuong_tac_thuoc_seed.mjs "đường/dẫn/tuong tac thuoc 1.xlsx"
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'ma_nguon/chuyen_mon/tuong_tac_thuoc/du_lieu_tuong_tac_thuoc.seed.json');

const argvPath = process.argv[2];
const defaultPath = 'c:/Users/admin/Documents/Google Drive/BHYT/danh muc benh vien/DM/tuong tac thuoc 1.xlsx';
const xlsxPath = argvPath ? path.resolve(argvPath) : defaultPath;

if (!fs.existsSync(xlsxPath)) {
  console.error('Không tìm thấy file:', xlsxPath);
  process.exit(1);
}

const wb = XLSX.readFile(xlsxPath);
const sheet = wb.Sheets[wb.SheetNames[0]];
const raw = XLSX.utils.sheet_to_json(sheet, { defval: '' });

const reBracket = /\[([^\]]+)\]/g;

const rows = [];
let seq = 0;
for (const r of raw) {
  const maTt = String(r['Mã tương tác'] ?? r['Ma tuong tac'] ?? '').trim();
  if (!maTt || maTt.includes('Mã tương tác')) continue;

  const noiDung = String(r['Nội dung tương tác'] ?? r['Noi dung tuong tac'] ?? '');
  const canhBao = String(r['Cảnh báo hệ thống'] ?? r['Canh bao he thong'] ?? '');

  const codes = [...noiDung.matchAll(reBracket)].map((m) => String(m[1]).trim()).filter(Boolean);
  let maA = '';
  let maB = '';
  if (codes.length >= 2) {
    maA = codes[0];
    maB = codes[1];
  } else if (codes.length === 1) {
    maA = codes[0];
    maB = '';
  }

  seq += 1;
  rows.push({
    id: `tt-${maTt || seq}`,
    TRANG_THAI: 'ON',
    MA_TUONG_TAC: maTt,
    MA_THUOC_A: maA,
    MA_THUOC_B: maB,
    NOI_DUNG_TUONG_TAC: noiDung,
    CANH_BAO_HE_THONG: canhBao,
    DU_LIEU_CAP_DOI_DAY_DU: maA && maB ? '1' : '0',
  });
}

const payload = {
  phien_ban: `2026.04.14.${rows.length}`,
  columns: ['id', 'TRANG_THAI', 'MA_TUONG_TAC', 'MA_THUOC_A', 'MA_THUOC_B', 'NOI_DUNG_TUONG_TAC', 'CANH_BAO_HE_THONG', 'MUC_DO_CANH_BAO', 'DU_LIEU_CAP_DOI_DAY_DU'],
  data: rows,
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

const dayDu = rows.filter((x) => x.DU_LIEU_CAP_DOI_DAY_DU === '1').length;
console.log('Wrote', outPath, 'rows:', rows.length, 'cap_ma_day_du:', dayDu, 'khong_du_2_ma:', rows.length - dayDu);
