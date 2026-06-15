/**
 * Sinh ma_nguon/thanh_phan/icd10_tt06_bang_ma.jsx từ file Excel danh mục ICD-10
 * (Phụ lục Thông tư 06/2026/BYT — các cột hướng dẫn mã hóa).
 *
 * Mặc định đọc: c:/Users/admin/Downloads/danh-muc-ma-benh-tat-excel (1).xlsx
 * Hoặc: node scripts/build_icd10_tt06_catalog.mjs "path/to/file.xlsx"
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

const DEFAULT_XLSX = 'c:/Users/admin/Downloads/danh-muc-ma-benh-tat-excel (1).xlsx';
const OUT_FILE = path.join(REPO_ROOT, 'ma_nguon', 'thanh_phan', 'icd10_tt06_bang_ma.jsx');

const chuanHoaMaKey = (ma) => String(ma || '')
    .replace(/[\u2020\u2021\u2022]/g, '')
    .replace(/[†‡]/g, '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9.]/g, '')
    .replace(/\./g, '');

const args = process.argv.slice(2);
const inputPath = args[0] ? path.resolve(args[0]) : DEFAULT_XLSX;

if (!fs.existsSync(inputPath)) {
    console.error('Không tìm thấy file:', inputPath);
    process.exit(1);
}

const wb = XLSX.readFile(inputPath);
const aoa = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: '' });

const bang = {};
let n = 0;
for (let r = 4; r < aoa.length; r++) {
    const row = aoa[r];
    const maGoc = String(row[17] || '').trim();
    if (!maGoc) continue;
    const key = chuanHoaMaKey(maGoc);
    if (!key) continue;

    const c23 = String(row[23] || '').trim();
    const c24 = String(row[24] || '').trim();
    const c25 = String(row[25] || '').trim();
    const c26 = String(row[26] || '').trim();
    const c27 = String(row[27] || '').trim();
    const c28 = String(row[28] || '').trim();

    const entry = {};
    if (c23) entry.camBenhChinh = true;
    if (c24) entry.khongKhuyenKhichBenhChinh = true;
    /** Cột: có mã 4 hoặc 5 ký tự cụ thể hơn — không dùng mã “rút gọn”. */
    if (c25) entry.coMaBonHoacNamKyTuCuTheHon = true;
    if (c26) entry.chiMaHoaNguyenNhanTuVong = true;
    if (c27) entry.chuYeuNuGioi = true;
    if (c28) entry.chuYeuNamGioi = true;

    if (Object.keys(entry).length === 0) continue;

    bang[key] = entry;
    n++;
}

const header = `/**
 * Bảng ràng buộc mã ICD-10 theo Phụ lục TT 06/2026/BYT (tự sinh — không sửa tay).
 * Nguồn Excel: ${path.basename(inputPath)}
 * Số mã có cờ: ${n}
 * Chạy lại: node scripts/build_icd10_tt06_catalog.mjs
 */
export const PHIEN_BAN_ICD10_TT06 = ${JSON.stringify(`2026-04-09-tt06-${n}-mã`)};

/** Khóa tra cứu: ICD đã bỏ dấu †, chữ hoa, bỏ dấu chấm (ví dụ A00.0 → A000). */
export const BANG_ICD10_TT06 = `;

const body = JSON.stringify(bang, null, 0);
const footer = ';\n';

fs.writeFileSync(OUT_FILE, header + body + footer, 'utf8');
console.log('Đã ghi', OUT_FILE, '—', n, 'mã có ít nhất một cờ TT 06.');
