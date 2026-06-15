/* eslint-disable no-console */
const { readdirSync, readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const ROOT = 'ma_nguon';
const WRITE_MODE = process.argv.includes('--write');

const WINDOWS_1252_FORWARD = new Map([
  ['\u20AC', 0x80], ['\u201A', 0x82], ['\u0192', 0x83], ['\u201E', 0x84],
  ['\u2026', 0x85], ['\u2020', 0x86], ['\u2021', 0x87], ['\u02C6', 0x88],
  ['\u2030', 0x89], ['\u0160', 0x8A], ['\u2039', 0x8B], ['\u0152', 0x8C],
  ['\u017D', 0x8E], ['\u2018', 0x91], ['\u2019', 0x92], ['\u201C', 0x93],
  ['\u201D', 0x94], ['\u2022', 0x95], ['\u2013', 0x96], ['\u2014', 0x97],
  ['\u02DC', 0x98], ['\u2122', 0x99], ['\u0161', 0x9A], ['\u203A', 0x9B],
  ['\u0153', 0x9C], ['\u017E', 0x9E], ['\u0178', 0x9F],
]);

const SUSPICIOUS_REGEX = /(?:Ã[\u0080-\u00FF]|Â[\u00A0-\u00FF]|Â[^\w\s]|Ä[\u0080-\u00FF]|Å[\u0080-\u00FF]|Æ[\u0080-\u00FF]|á»|áº|â€|ðŸ|ï¿½|�)/g;

function listFiles(rootDir) {
  const out = [];
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
        out.push(fullPath);
      }
    });
  }
  walk(rootDir);
  return out;
}

function countControlChars(text) {
  let n = 0;
  for (const ch of text) {
    const c = ch.charCodeAt(0);
    if (c < 32 && ch !== '\n' && ch !== '\r' && ch !== '\t') n += 1;
  }
  return n;
}

function badScore(text) {
  const suspicious = (text.match(SUSPICIOUS_REGEX) || []).length;
  const replacement = (text.match(/\uFFFD/g) || []).length;
  const ctrl = countControlChars(text);
  return (suspicious * 10) + (replacement * 25) + (ctrl * 20);
}

function hasSuspiciousMojibake(text) {
  const ok = SUSPICIOUS_REGEX.test(text);
  SUSPICIOUS_REGEX.lastIndex = 0;
  return ok;
}

function encodeToWindows1252Bytes(input) {
  const bytes = [];
  for (const ch of input) {
    const code = ch.codePointAt(0);
    if (code <= 0x7F) {
      bytes.push(code);
      continue;
    }
    if (code >= 0xA0 && code <= 0xFF) {
      bytes.push(code);
      continue;
    }

    const mapped = WINDOWS_1252_FORWARD.get(ch);
    if (mapped !== undefined) {
      bytes.push(mapped);
      continue;
    }

    // Keep non-CP1252 chars by passing through UTF-8 bytes.
    const utf8 = Buffer.from(ch, 'utf8');
    for (const b of utf8) bytes.push(b);
  }
  return bytes;
}

function decodeWindows1252Mojibake(input) {
  const bytes = encodeToWindows1252Bytes(input);
  return Buffer.from(bytes).toString('utf8');
}

function maybeFixLine(line) {
  if (!line || !hasSuspiciousMojibake(line)) {
    return { changed: false, line };
  }

  const before = badScore(line);
  const candidates = [line];
  let current = line;

  for (let i = 0; i < 4; i += 1) {
    const next = decodeWindows1252Mojibake(current);
    if (!next || next === current) break;
    candidates.push(next);
    current = next;
  }

  let best = line;
  let bestScore = before;

  candidates.forEach((candidate) => {
    const score = badScore(candidate);
    if (score < bestScore) {
      best = candidate;
      bestScore = score;
    }
  });

  if (best !== line && bestScore + 1 < before) {
    return { changed: true, line: best };
  }
  return { changed: false, line };
}

function processFile(filePath) {
  let content = '';
  try {
    content = readFileSync(filePath, 'utf8');
  } catch {
    return { filePath, changedLines: 0, changed: false, skipped: true };
  }

  const lines = content.split(/\r?\n/);
  let changedLines = 0;
  const fixed = lines.map((line) => {
    const res = maybeFixLine(line);
    if (res.changed) changedLines += 1;
    return res.line;
  });

  if (changedLines > 0 && WRITE_MODE) {
    writeFileSync(filePath, `${fixed.join('\n')}\n`, 'utf8');
  }

  return {
    filePath,
    changedLines,
    changed: changedLines > 0,
    skipped: false,
  };
}

function main() {
  const files = listFiles(ROOT);
  const results = files.map(processFile);

  const changed = results.filter((r) => r.changed);
  const totalLines = changed.reduce((sum, r) => sum + r.changedLines, 0);

  if (!WRITE_MODE) {
    console.log(`[mojibake:fix] Dry run. Files can change: ${changed.length}, lines: ${totalLines}`);
  } else {
    console.log(`[mojibake:fix] Đã áp dụng. Files changed: ${changed.length}, lines: ${totalLines}`);
  }

  changed.slice(0, 120).forEach((r) => {
    console.log(`- ${r.filePath} (${r.changedLines} lines)`);
  });
}

main();
