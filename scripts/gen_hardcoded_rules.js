/**
 * SCRIPT: Tạo file code cứng từ Excel cho 6 bảng luật (bao gồm Kiểm tra chuyên đề)
 * Chạy: node scripts/gen_hardcoded_rules.js
 */
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const safe = (s) =>
  String(s == null ? '' : s)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

const normalizeText = (value) => String(value == null ? '' : value).trim().toUpperCase();

const extractRuleSignaturesFromFile = (filePath) => {
  if (!fs.existsSync(filePath)) return { byMa: new Set(), bySig: new Set() };
  const raw = fs.readFileSync(filePath, 'utf8');
  const byMa = new Set();
  const bySig = new Set();
  const re = /MA_LUAT:\s*'([^']*)'[\s\S]*?TEN_QUY_TAC:\s*`([\s\S]*?)`[\s\S]*?DIEU_KIEN:\s*`([\s\S]*?)`[\s\S]*?CANH_BAO:\s*`([\s\S]*?)`/g;
  let match;
  while ((match = re.exec(raw)) !== null) {
    const ma = normalizeText(match[1]);
    const ten = normalizeText(match[2]);
    const dk = normalizeText(match[3]);
    const cb = normalizeText(match[4]);
    if (ma) byMa.add(ma);
    if (ten || dk || cb) bySig.add(`${ten}||${dk}||${cb}`);
  }
  return { byMa, bySig };
};

const FILES = [
  {
    path: 'C:/Users/admin/Documents/Google Drive/BHYT/danh muc benh vien/Rule/DuLieu_LUAT_CDHA (4).xlsx',
    tabId: 'LUAT_CDHA',
    prefix: 'CDHA',
    exportVar: 'layDanhSachLuatCdhaHardcoded',
    outFile: path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_cdha_hardcoded.jsx'),
  },
  {
    path: 'C:/Users/admin/Documents/Google Drive/BHYT/danh muc benh vien/Rule/DuLieu_LUAT_CONG_KHAM (4).xlsx',
    tabId: 'LUAT_CONG_KHAM',
    prefix: 'CK',
    exportVar: 'layDanhSachLuatCongKhamHardcoded',
    outFile: path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_cong_kham_hardcoded.jsx'),
  },
  {
    path: 'C:/Users/admin/Documents/Google Drive/BHYT/danh muc benh vien/Rule/DuLieu_LUAT_NHAN_SU (1).xlsx',
    tabId: 'LUAT_NHAN_SU',
    prefix: 'NS',
    exportVar: 'layDanhSachLuatNhanSuHardcoded',
    outFile: path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_nhan_su_hardcoded.jsx'),
  },
  {
    path: 'C:/Users/admin/Documents/Google Drive/BHYT/danh muc benh vien/Rule/DuLieu_LUAT_GIUONG (2).xlsx',
    tabId: 'LUAT_GIUONG',
    prefix: 'GB',
    exportVar: 'layDanhSachLuatGiuongHardcoded',
    outFile: path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_giuong_hardcoded.jsx'),
  },
  {
    path: 'C:/Users/admin/Documents/Google Drive/BHYT/danh muc benh vien/Rule/DuLieu_LUAT_HOP_DONG (3).xlsx',
    tabId: 'LUAT_HOP_DONG',
    prefix: 'HD',
    exportVar: 'layDanhSachLuatHopDongHardcoded',
    outFile: path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_hop_dong_hardcoded.jsx'),
  },
  {
    path: 'C:/Users/admin/Documents/Google Drive/BHYT/danh muc benh vien/Rule/rule chuyen de tinh.xlsx',
    tabId: 'LUAT_GIAM_DINH_CHUYEN_DE',
    prefix: 'CHUYEN_DE',
    exportVar: 'layDanhSachLuatGiamDinhChuyenDeHardcoded',
    outFile: path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_giam_dinh_chuyen_de_hardcoded.jsx'),
    dedupeAgainstFiles: [
      path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_cdha_hardcoded.jsx'),
      path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_cong_kham_hardcoded.jsx'),
      path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_nhan_su_hardcoded.jsx'),
      path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_giuong_hardcoded.jsx'),
      path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_hop_dong_hardcoded.jsx'),
      path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_thuoc_hardcoded.jsx'),
      path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_hanh_chinh_hardcoded.jsx'),
      path.join(ROOT, 'ma_nguon', 'tien_ich', 'luat_du_lieu_hardcoded.jsx'),
    ],
  },
];

FILES.forEach(({ path: f, tabId, prefix, exportVar, outFile, dedupeAgainstFiles = [] }) => {
  const wb = XLSX.readFile(f);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

  let rowsFiltered = rows;
  let skippedDuplicate = 0;

  if (Array.isArray(dedupeAgainstFiles) && dedupeAgainstFiles.length > 0) {
    const externalByMa = new Set();
    const externalBySig = new Set();
    dedupeAgainstFiles.forEach((fp) => {
      const signatures = extractRuleSignaturesFromFile(fp);
      signatures.byMa.forEach((ma) => externalByMa.add(ma));
      signatures.bySig.forEach((sig) => externalBySig.add(sig));
    });

    const seenByMa = new Set();
    const seenBySig = new Set();
    const filtered = [];
    rows.forEach((row) => {
      const ma = normalizeText(row.MA_LUAT || '');
      const sig = `${normalizeText(row.TEN_QUY_TAC || '')}||${normalizeText(row.DIEU_KIEN || '')}||${normalizeText(row.CANH_BAO || '')}`;
      const duplicatedInternal = (ma && seenByMa.has(ma)) || (sig !== '||||' && seenBySig.has(sig));
      const duplicatedExternal = (ma && externalByMa.has(ma)) || (sig !== '||||' && externalBySig.has(sig));
      if (duplicatedInternal || duplicatedExternal) {
        skippedDuplicate += 1;
        return;
      }
      if (ma) seenByMa.add(ma);
      if (sig !== '||||') seenBySig.add(sig);
      filtered.push(row);
    });
    rowsFiltered = filtered;
  }

  const lines = rowsFiltered.map((row, idx) => {
    const ma = String(row.MA_LUAT || '').trim() || (prefix + '_' + String(idx + 1).padStart(3, '0'));
    const ts = String(row.TRANG_THAI || 'ON').toUpperCase() === 'OFF' ? 'OFF' : 'ON';
    const ten = safe(row.TEN_QUY_TAC || ma);
    const dk = safe(row.DIEU_KIEN || '');
    const cb = safe(row.CANH_BAO || '');
    const id = prefix + '-' + String(idx + 1).padStart(3, '0');
    return (
      "  { id: '" + id + "', MA_LUAT: '" + ma + "', " +
      "TEN_QUY_TAC: `" + ten + "`, " +
      "DIEU_KIEN: `" + dk + "`, " +
      "CANH_BAO: `" + cb + "`, " +
      "TRANG_THAI: '" + ts + "' }"
    );
  });

  const code =
    '/**\n' +
    ' * CODE CỨNG DỮ LIỆU BẢNG LUẬT: ' + tabId + '\n' +
    ' * Nguồn: File Excel (' + rowsFiltered.length + ' quy tắc)\n' +
    ' * Đã lọc trùng: ' + skippedDuplicate + ' dòng\n' +
    ' * ON/OFF: kiểm soát qua màn hình Quản lý Quy tắc ON/OFF\n' +
    ' * KHÔNG CẬP NHẬT THỦ CÔNG - dùng Import hoặc chạy lại script gen_hardcoded_rules.js\n' +
    ' */\n\n' +
    'const CACHE_RULES_HARDCODED = Object.freeze([\n' +
    lines.join(',\n') + ',\n' +
    ']);\n\n' +
    'export const ' + exportVar + ' = () => CACHE_RULES_HARDCODED.map((row) => ({ ...row }));\n';

  fs.writeFileSync(outFile, code, 'utf8');
  console.log('OK: ' + path.basename(outFile) + ' (' + rowsFiltered.length + ' rows, skipped ' + skippedDuplicate + ' duplicates)');
});

console.log('Xong! Đã tạo 6 file hardcoded.');
