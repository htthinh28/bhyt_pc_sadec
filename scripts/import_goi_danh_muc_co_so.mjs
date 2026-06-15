/**
 * Đóng gói danh mục nội bộ theo cơ sở → file JSON phục hồi (Helper / Sao lưu hệ thống).
 *
 * Dùng:
 *   node scripts/import_goi_danh_muc_co_so.mjs -- --goi mau
 *   node scripts/import_goi_danh_muc_co_so.mjs -- --goi mau --out dist/tenant-pack-mau.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const parseArgs = () => {
  const raw = process.argv.slice(2).filter((a) => a !== '--');
  let goi = 'mau';
  let out = '';
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '--goi' && raw[i + 1]) goi = String(raw[++i]).trim();
    else if (raw[i] === '--out' && raw[i + 1]) out = path.resolve(raw[++i]);
  }
  return { goi, out };
};

const docJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const main = () => {
  const { goi, out } = parseArgs();
  const packDir = path.join(ROOT, 'config', 'goi_co_so', goi);
  const manifestPath = path.join(packDir, 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    console.error(`Không tìm thấy gói: ${manifestPath}`);
    process.exit(1);
  }

  const manifest = docJson(manifestPath);
  const catalogs = Array.isArray(manifest.catalogs) ? manifest.catalogs : [];
  const asyncData = {};
  const includeKeys = [];

  catalogs.forEach((entry) => {
    const dataKey = String(entry.key || '').trim();
    if (!dataKey) return;
    const dataFile = path.join(packDir, String(entry.file || `${dataKey}.json`));
    if (!fs.existsSync(dataFile)) {
      console.error(`Thiếu file dữ liệu: ${dataFile}`);
      process.exit(1);
    }
    asyncData[dataKey] = JSON.stringify(docJson(dataFile));
    includeKeys.push(dataKey);

    const columnsKey = String(entry.columns_key || `COLS_${dataKey}`).trim();
    const columnsFile = path.join(packDir, String(entry.columns_file || `${columnsKey}.json`));
    if (fs.existsSync(columnsFile)) {
      asyncData[columnsKey] = JSON.stringify(docJson(columnsFile));
      includeKeys.push(columnsKey);
    }
  });

  const payload = {
    version: 1,
    exported_at: new Date().toISOString(),
    reason: `tenant_pack_${manifest.ten_goi || goi}`,
    prefixes: ['COLS_', 'DANH_MUC_', 'THONG_TIN_CO_SO'],
    include_keys: includeKeys,
    async_data: asyncData,
    local_data: {},
    _huong_dan: 'Vào Helper → Phục hồi JSON, hoặc Quản lý danh mục → Import Excel từng tab.',
  };

  const outPath = out || path.join(ROOT, 'dist', `tenant-pack-${manifest.ten_goi || goi}.json`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');

  console.log(`Đã tạo gói phục hồi: ${outPath}`);
  console.log(`Danh mục: ${includeKeys.join(', ')}`);
};

main();
