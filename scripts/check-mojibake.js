/* eslint-disable no-console */
const { readdirSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

const SUSPICIOUS_REGEX = /(?:Ã[\u0080-\u00FF]|Â[\u00A0-\u00FF]|Â[^\w\s]|Ä[\u0080-\u00FF]|Å[\u0080-\u00FF]|Æ[\u0080-\u00FF]|á»|áº|â€|ðŸ|ï¿½|�)/u;

function hasSuspiciousMojibake(line) {
  if (!line) return false;
  return SUSPICIOUS_REGEX.test(line);
}

function listFiles() {
  const root = 'ma_nguon';
  const results = [];

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
      if (entry.isFile() && /\.(jsx?|tsx?)$/i.test(entry.name)) {
        results.push(fullPath);
      }
    });
  }

  walk(root);
  return results;
}

function isLikelyInvalidUtf8(buffer) {
  try {
    const decoded = buffer.toString('utf8');
    const encoded = Buffer.from(decoded, 'utf8');
    return !encoded.equals(buffer);
  } catch {
    return true;
  }
}

function scanFile(file) {
  let content = '';
  let raw = null;
  try {
    raw = readFileSync(file);
    content = raw.toString('utf8');
  } catch {
    return [];
  }

  const lines = content.split(/\r?\n/);
  const hits = [];

  if (raw && isLikelyInvalidUtf8(raw)) {
    hits.push({
      line: 1,
      text: '[INVALID_UTF8] File có dấu hiệu không được lưu đúng UTF-8.',
    });
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!hasSuspiciousMojibake(line)) continue;
    hits.push({
      line: i + 1,
      text: line.slice(0, 180),
    });
  }
  return hits;
}

function main() {
  const files = listFiles();
  if (files.length === 0) {
    console.log('[encoding:check] Không tìm thấy file để quét.');
    return;
  }

  const violations = [];
  files.forEach((file) => {
    const hits = scanFile(file);
    if (hits.length === 0) return;
    violations.push({ file, hits });
  });

  if (violations.length === 0) {
    console.log('[encoding:check] PASS: Không phát hiện dấu hiệu lỗi mojibake/UTF-8.');
    return;
  }

  console.error(`[encoding:check] FAIL: Phát hiện ${violations.length} file có dấu hiệu lỗi mã hóa.`);
  violations.slice(0, 80).forEach((v) => {
    console.error(`- ${v.file}`);
    v.hits.slice(0, 8).forEach((h) => {
      console.error(`  ${h.line}: ${h.text}`);
    });
  });
  if (violations.length > 80) {
    console.error(`... và ${violations.length - 80} file khác.`);
  }
  process.exitCode = 1;
}

main();
