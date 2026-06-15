/* eslint-disable no-console */
const { readdirSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

// Any Vietnamese accented letter should be in this broad Latin-extended range.
const HAS_DIACRITIC_REGEX = /[\u00C0-\u1EF9]/u;

// Common non-diacritic Vietnamese tokens used in UI text.
const VI_NO_SIGN_TOKEN_REGEX =
  /\b(khong|thong|bao|thieu|chua|du|lieu|ho|so|kiem|tra|giam|dinh|tai|len|xuong|that|bai|nhan|vien|ban|sao|phuc|hoi|dong|bo|xac|nhan|huy|loi|danh|muc|thuoc|vat|tu|ngay|thang|nam|dang|tai|xuat)\b/i;

const FILE_EXT_REGEX = /\.(jsx?|tsx?)$/i;
const ROOT_DIR = 'ma_nguon';
const TECHNICAL_ALLOWLIST = new Set([
  'hoat dong',
  'CHUA BAO GOM',
  'R05 (Ho)',
  'Danh Minh',
  'Ai-len',
]);

function listFiles() {
  const files = [];

  function walk(dir) {
    let entries = [];
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    entries.forEach((entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        return;
      }
      if (entry.isFile() && FILE_EXT_REGEX.test(entry.name)) {
        files.push(fullPath);
      }
    });
  }

  walk(ROOT_DIR);
  return files;
}

function shouldIgnoreText(text) {
  const trimmed = String(text || '').trim();
  if (!trimmed) return true;
  if (trimmed.length < 6) return true;
  if (/^[-\w]*(\$\{[^}]+\}[-\w]*)+$/.test(trimmed)) return true;
  if (/^-\s*\$\{[^}]+\}$/.test(trimmed)) return true;
  if (TECHNICAL_ALLOWLIST.has(trimmed)) return true;
  if (/^[A-Z0-9_-]+\*?$/.test(trimmed)) return true;
  if (/^[a-z0-9_-]+$/.test(trimmed)) return true;
  if (!/[A-Za-z]/.test(trimmed)) return true;
  if (HAS_DIACRITIC_REGEX.test(trimmed)) return true;
  if (/^(https?:\/\/|firestore:\/\/)/i.test(trimmed)) return true;
  if (/^[A-Z0-9_./:\-\s]+$/.test(trimmed)) return true;
  if (!VI_NO_SIGN_TOKEN_REGEX.test(trimmed)) return true;
  return false;
}

function extractStringLiterals(line) {
  const out = [];
  const literalRegex = /(['"`])((?:\\.|(?!\1).)*)\1/g;
  let match;
  while ((match = literalRegex.exec(line)) !== null) {
    out.push(match[2] || '');
  }
  return out;
}

function extractJsxText(line) {
  const out = [];
  const jsxRegex = />\s*([^<{][^<]*)\s*</g;
  let match;
  while ((match = jsxRegex.exec(line)) !== null) {
    out.push(match[1] || '');
  }
  return out;
}

function scanFile(filePath) {
  if (String(filePath || '').endsWith('ma_nguon\\tien_ich\\du_lieu_luat_pttt_muc11.jsx')) {
    return [];
  }
  if (String(filePath || '').endsWith('ma_nguon\\tien_ich\\du_lieu_luat_thuoc_muc8.jsx')) {
    return [];
  }
  if (String(filePath || '').endsWith('ma_nguon\\tien_ich\\du_lieu_luat_du_lieu_muc1.jsx')) {
    return [];
  }

  let content = '';
  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    return [];
  }

  const lines = content.split(/\r?\n/);
  const hits = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const samples = [
      ...extractStringLiterals(line),
      ...extractJsxText(line),
    ];

    samples.forEach((sample) => {
      if (shouldIgnoreText(sample)) return;
      hits.push({
        line: i + 1,
        text: sample.trim().slice(0, 200),
      });
    });
  }

  return hits;
}

function main() {
  const files = listFiles();
  const violations = [];

  files.forEach((filePath) => {
    const hits = scanFile(filePath);
    if (hits.length === 0) return;
    violations.push({ filePath, hits });
  });

  if (violations.length === 0) {
    console.log('[vi:check] PASS: Khong phat hien chuoi tieng Viet khong dau trong text hien thi.');
    return;
  }

  console.error(`[vi:check] FAIL: Phat hien ${violations.length} file co chuoi tieng Viet khong dau.`);
  violations.slice(0, 120).forEach((entry) => {
    console.error(`- ${entry.filePath}`);
    entry.hits.slice(0, 10).forEach((hit) => {
      console.error(`  ${hit.line}: ${hit.text}`);
    });
  });
  if (violations.length > 120) {
    console.error(`... va ${violations.length - 120} file khac.`);
  }
  process.exitCode = 1;
}

main();
