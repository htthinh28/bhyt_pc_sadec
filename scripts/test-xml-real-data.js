#!/usr/bin/env node

/**
 * QA script:
 * - Parse ho so XML 130 (container XML co FILEHOSO + base64)
 * - Bao cao nhanh nguy co duong tinh gia cho XML4-RESULT-EMPTY
 * - Kiem tra parsererror trong XML ngoai va XML con
 *
 * Usage:
 *   node scripts/test-xml-real-data.js <file1.xml> <file2.xml> ...
 */

const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');
const { DOMParser } = require('@xmldom/xmldom');

const files = process.argv.slice(2);

if (!files.length) {
  console.error('Usage: node scripts/test-xml-real-data.js <file1.xml> <file2.xml> ...');
  process.exit(1);
}

const TAG_BY_XML = {
  XML1: 'TONG_HOP',
  XML2: 'CHI_TIET_THUOC',
  XML3: 'CHI_TIET_DVKT',
  XML4: 'CHI_TIET_CLS',
  XML5: 'CHI_TIET_DIEN_BIEN_BENH',
  XML6: 'CHI_TIET_THANH_TOAN',
};

const text = (node, tag) => {
  const found = node.getElementsByTagName(tag)[0];
  return found && found.textContent ? String(found.textContent).trim() : '';
};

const parseXml = (xmlRaw) => new DOMParser().parseFromString(String(xmlRaw || ''), 'text/xml');

const detectNamespaceAnomalies = (xmlRaw) => {
  const issues = [];
  const xml = String(xmlRaw || '');
  if (/xmlns:xsi\s*=\s*["']http:\/\/www\.w3\.org\/2001\/XMLSchema instance["']/i.test(xml)) {
    issues.push('xmlns:xsi URI missing hyphen');
  }
  if (/xmlns:xsd\s*=\s*["']http:\/\/www\.w3\.org\/2001\/XMLSchema instance["']/i.test(xml)) {
    issues.push('xmlns:xsd URI malformed');
  }
  return issues;
};

const hasParserError = (doc) => {
  const byTag = doc.getElementsByTagName('parsererror');
  if (byTag && byTag.length > 0) return true;
  const rootName = String(doc?.documentElement?.nodeName || '').toLowerCase();
  return rootName.includes('parsererror');
};

const parseRows = (xmlRaw, rowTag) => {
  const doc = parseXml(xmlRaw);
  if (hasParserError(doc)) return { parserError: true, rows: [] };
  const rows = [];
  const items = doc.getElementsByTagName(rowTag);
  for (let i = 0; i < items.length; i++) {
    const row = {};
    const nodes = items[i].childNodes || [];
    for (let j = 0; j < nodes.length; j++) {
      const child = nodes[j];
      if (child.nodeType !== 1) continue;
      const key = String(child.nodeName || '').replace(/^\uFEFF/, '').trim();
      if (!key) continue;
      row[key] = String(child.textContent || '').replace(/\u0000/g, '').trim();
    }
    rows.push(row);
  }
  return { parserError: false, rows };
};

const toAbsPath = (p) => (path.isAbsolute(p) ? p : path.resolve(process.cwd(), p));

for (const inputPath of files) {
  const filePath = toAbsPath(inputPath);
  if (!fs.existsSync(filePath)) {
    console.log('---');
    console.log(filePath);
    console.log('Status: FILE_NOT_FOUND');
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const outer = parseXml(raw);
  const outerParserError = hasParserError(outer);
  const listFileHoso = outer.getElementsByTagName('FILEHOSO');

  const summary = {
    file: filePath,
    outerParserError,
    xmlRows: {
      XML1: 0,
      XML2: 0,
      XML3: 0,
      XML4: 0,
      XML5: 0,
      XML6: 0,
    },
    innerParserErrorByLoai: {},
    namespaceAnomalyByLoai: {},
    xml4ResultEmptyOld: 0,
    xml4ResultEmptyNew: 0,
  };

  for (let i = 0; i < listFileHoso.length; i++) {
    const loai = text(listFileHoso[i], 'LOAIHOSO').toUpperCase();
    const rowTag = TAG_BY_XML[loai];
    if (!rowTag) continue;

    const encoded = text(listFileHoso[i], 'NOIDUNGFILE');
    if (!encoded) continue;

    let decoded = '';
    try {
      decoded = Buffer.from(encoded, 'base64').toString('utf8');
    } catch (_e) {
      summary.innerParserErrorByLoai[loai] = true;
      continue;
    }

    const namespaceIssues = detectNamespaceAnomalies(decoded);
    if (namespaceIssues.length > 0) {
      summary.namespaceAnomalyByLoai[loai] = namespaceIssues;
    }

    const { parserError, rows } = parseRows(decoded, rowTag);
    if (parserError) {
      summary.innerParserErrorByLoai[loai] = true;
      continue;
    }

    summary.xmlRows[loai] += rows.length;

    if (loai === 'XML4') {
      for (const row of rows) {
        const oldEmpty = !row.GIA_TRI && !row.KET_LUAN && !row.MO_TA;
        const hasClsMeta = !!(row.TEN_CHI_SO || row.MA_CHI_SO || row.DON_VI_DO);
        const newEmpty = oldEmpty && !hasClsMeta;
        if (oldEmpty) summary.xml4ResultEmptyOld += 1;
        if (newEmpty) summary.xml4ResultEmptyNew += 1;
      }
    }
  }

  console.log('---');
  console.log(`File: ${summary.file}`);
  console.log(`Outer parsererror: ${summary.outerParserError ? 'YES' : 'NO'}`);
  console.log(`Rows XML1..XML6: ${JSON.stringify(summary.xmlRows)}`);
  console.log(`Inner parsererror by LOAI: ${JSON.stringify(summary.innerParserErrorByLoai)}`);
  console.log(`Namespace anomaly by LOAI: ${JSON.stringify(summary.namespaceAnomalyByLoai)}`);
  console.log(`XML4-RESULT-EMPTY (old logic): ${summary.xml4ResultEmptyOld}`);
  console.log(`XML4-RESULT-EMPTY (new logic): ${summary.xml4ResultEmptyNew}`);
}
