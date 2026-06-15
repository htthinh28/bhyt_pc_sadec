#!/usr/bin/env node
/**
 * Bật lại (TRANG_THAI ON) các MA_LUAT thuốc Mục 8 chỉ thiếu MA_HOAT_CHAT
 * sau khi enrichXML2Data đã suy MA_HOAT_CHAT từ MA_THUOC.
 *
 * Danh sách từ scripts/analyze_muc8_off_rules.mjs (20 mã).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const MA_LIST = [
  'THUOC_385', 'THUOC_386', 'THUOC_401', 'THUOC_409', 'THUOC_420', 'THUOC_421',
  'THUOC_433', 'THUOC_435', 'THUOC_458', 'THUOC_460', 'THUOC_463', 'THUOC_468',
  'THUOC_480', 'THUOC_482', 'THUOC_484', 'THUOC_499', 'THUOC_509', 'THUOC_510',
  'THUOC_522', 'THUOC_528',
];

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const reonJsonSeed = (content, maLuat) => {
  const esc = escapeRegExp(maLuat);
  const re = new RegExp(`("TRANG_THAI"\\s*:\\s*)"OFF"(\\s*,\\s*"MA_LUAT"\\s*:\\s*"${esc}")`, 'g');
  return content.replace(re, '$1"ON"$2');
};

const filePath = path.join(ROOT, 'ma_nguon', 'tien_ich', 'du_lieu_luat_thuoc_muc8.jsx');
let content = fs.readFileSync(filePath, 'utf8');
let n = 0;
for (const ma of MA_LIST) {
  const before = content;
  content = reonJsonSeed(content, ma);
  if (content !== before) n += 1;
}
fs.writeFileSync(filePath, content, 'utf8');
console.log(`Đã bật lại ON: ${n}/${MA_LIST.length} quy tắc trong du_lieu_luat_thuoc_muc8.jsx`);
