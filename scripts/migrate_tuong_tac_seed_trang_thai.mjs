/**
 * Thêm cột TRANG_THAI (ON/OFF) vào du_lieu_tuong_tac_thuoc.seed.json nếu chưa có.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, '../ma_nguon/chuyen_mon/tuong_tac_thuoc/du_lieu_tuong_tac_thuoc.seed.json');
const j = JSON.parse(fs.readFileSync(p, 'utf8'));
const cols = [
  'id',
  'TRANG_THAI',
  'MA_TUONG_TAC',
  'MA_THUOC_A',
  'MA_THUOC_B',
  'NOI_DUNG_TUONG_TAC',
  'CANH_BAO_HE_THONG',
  'DU_LIEU_CAP_DOI_DAY_DU',
];
j.columns = cols;
j.data = (j.data || []).map((r) => ({
  ...r,
  TRANG_THAI: String(r.TRANG_THAI || 'ON').toUpperCase() === 'OFF' ? 'OFF' : 'ON',
}));
j.phien_ban = `${j.phien_ban || '0'}.trangthai`;
fs.writeFileSync(p, `${JSON.stringify(j, null, 2)}\n`, 'utf8');
console.log('OK', p, 'rows', j.data.length);
