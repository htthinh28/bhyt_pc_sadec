const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SCAN_EXT = new Set(['.js', '.jsx', '.ts', '.tsx']);
const SKIP_DIRS = new Set([
  '.git',
  '.expo',
  '.tmp_web_export',
  'node_modules',
  'android',
  'ios',
  'dist',
  'build',
]);

const ALLOWED_FONT_LITERALS = new Set([
  'Arial',
  'Arial, sans-serif',
  "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif",
]);

const STRING_FONT_REGEX = /fontFamily\s*:\s*(['"`])([^'"`]+)\1/g;

function walk(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.DS_Store')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full, out);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (SCAN_EXT.has(ext)) out.push(full);
  }
}

function run() {
  const files = [];
  walk(ROOT, files);

  const violations = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const text = fs.readFileSync(file, 'utf8');
    const lines = text.split(/\r?\n/);

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      let match;
      while ((match = STRING_FONT_REGEX.exec(line)) !== null) {
        const value = match[2].trim();
        if (!ALLOWED_FONT_LITERALS.has(value)) {
          violations.push({
            file: rel,
            line: i + 1,
            value,
          });
        }
      }
      STRING_FONT_REGEX.lastIndex = 0;
    }
  }

  if (violations.length > 0) {
    console.error('[font:check] FAIL: Phat hien fontFamily khong dung chuan Arial.');
    for (const v of violations) {
      console.error(`- ${v.file}:${v.line} -> "${v.value}"`);
    }
    process.exit(1);
  }

  console.log('[font:check] PASS: Tat ca fontFamily literal deu dung chuan Arial.');
}

run();
