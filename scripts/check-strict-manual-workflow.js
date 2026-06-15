#!/usr/bin/env node

/**
 * QA script:
 * - Kiem tra cac dieu kien bat buoc cua quy trinh kiem tra chat che:
 *   1) Ho so luon duoc tai-kiem tra 5 tang (V15), khong bo qua.
 *   2) Khoa sua tu dong, chi cho phep sua thu cong.
 *   3) Neu co sua thu cong thi bat buoc xac nhan truoc khi luu.
 *
 * Usage:
 *   node scripts/check-strict-manual-workflow.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SUA_FILE_XML = path.join(ROOT, 'ma_nguon', 'man_hinh', 'sua_file_xml.jsx');
const TONG_QUAN = path.join(ROOT, 'ma_nguon', 'man_hinh', 'tong_quan.jsx');

const readText = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
};

const assertMatch = (content, regex, message, failures) => {
  if (!regex.test(content)) failures.push(message);
};

const main = () => {
  const failures = [];
  const suaFileXml = readText(SUA_FILE_XML);
  const tongQuan = readText(TONG_QUAN);

  // 1) Bat buoc tai-kiem tra 5 tang (V15)
  assertMatch(
    tongQuan,
    /const\s+loiV15\s*=\s*await\s+chayGiamDinhToanDienV15\s*\(/m,
    'tong_quan: khong tim thay buoc goi V15 cho moi ho so.',
    failures
  );
  assertMatch(
    tongQuan,
    /dongDauGiamDinh5Tang\s*\(/m,
    'tong_quan: khong tim thay buoc dong dau ket qua sau khi tai-kiem tra.',
    failures
  );
  assertMatch(
    tongQuan,
    /daTungKiemTruocDo/m,
    'tong_quan: thieu metadata daTungKiemTruocDo khi dong dau ket qua.',
    failures
  );
  assertMatch(
    tongQuan,
    /bat_buoc_5_tang\s*:\s*true/m,
    'tong_quan: thieu co bat buoc 5 tang trong metadata.',
    failures
  );
  assertMatch(
    tongQuan,
    /tai_kiem_bat_buoc\s*:\s*true/m,
    'tong_quan: thieu co tai-kiem bat buoc trong metadata.',
    failures
  );

  // 2) Khoa sua tu dong
  assertMatch(
    suaFileXml,
    /const\s+CHO_PHEP_SUA_TU_DONG\s*=\s*false\s*;/m,
    'sua_file_xml: CHO_PHEP_SUA_TU_DONG khong o trang thai false.',
    failures
  );
  assertMatch(
    suaFileXml,
    /const\s+handleApDungThayThe\s*=\s*\(\)\s*=>\s*\{\s*if\s*\(!CHO_PHEP_SUA_TU_DONG\)/ms,
    'sua_file_xml: handleApDungThayThe chua chan sua tu dong.',
    failures
  );
  assertMatch(
    suaFileXml,
    /const\s+handleApDungGoiYSua\s*=\s*\([^)]*\)\s*=>\s*\{\s*if\s*\(!CHO_PHEP_SUA_TU_DONG\)/ms,
    'sua_file_xml: handleApDungGoiYSua chua chan sua tu dong.',
    failures
  );
  assertMatch(
    suaFileXml,
    /const\s+handleApDungTatCaGoiYSua\s*=\s*\(\)\s*=>\s*\{\s*if\s*\(!CHO_PHEP_SUA_TU_DONG\)/ms,
    'sua_file_xml: handleApDungTatCaGoiYSua chua chan sua tu dong.',
    failures
  );

  // 3) Bat buoc xac nhan sua thu cong truoc khi luu
  assertMatch(
    suaFileXml,
    /const\s+BAT_BUOC_XAC_NHAN_SUA_THU_CONG\s*=\s*true\s*;/m,
    'sua_file_xml: BAT_BUOC_XAC_NHAN_SUA_THU_CONG khong o trang thai true.',
    failures
  );
  assertMatch(
    suaFileXml,
    /const\s+\[nhatKyChinhSua,\s*setNhatKyChinhSua\]\s*=\s*useState\(\[\]\)/m,
    'sua_file_xml: thieu state nhatKyChinhSua.',
    failures
  );
  assertMatch(
    suaFileXml,
    /const\s+\[daXacNhanChinhSua,\s*setDaXacNhanChinhSua\]\s*=\s*useState\(false\)/m,
    'sua_file_xml: thieu state daXacNhanChinhSua.',
    failures
  );
  assertMatch(
    suaFileXml,
    /if\s*\(\s*BAT_BUOC_XAC_NHAN_SUA_THU_CONG\s*&&\s*nhatKyChinhSua\.length\s*>\s*0\s*&&\s*!daXacNhanChinhSua\s*\)/m,
    'sua_file_xml: thieu chan luu khi chua xac nhan sua thu cong.',
    failures
  );
  assertMatch(
    suaFileXml,
    /nhat_ky_sua_thu_cong\s*:\s*nhatKyChinhSua/m,
    'sua_file_xml: payload luu kho chua co nhat ky sua thu cong.',
    failures
  );
  assertMatch(
    suaFileXml,
    /xac_nhan_sua_thu_cong\s*:\s*\{/m,
    'sua_file_xml: payload luu kho chua co thong tin xac nhan sua thu cong.',
    failures
  );

  if (failures.length > 0) {
    console.error('STRICT FLOW CHECK: FAILED');
    failures.forEach((f, idx) => {
      console.error(`${idx + 1}. ${f}`);
    });
    process.exit(1);
  }

  console.log('STRICT FLOW CHECK: PASSED');
  console.log('- Bat buoc 5 tang: OK');
  console.log('- Khoa sua tu dong: OK');
  console.log('- Bat buoc xac nhan truoc khi luu: OK');
};

main();
