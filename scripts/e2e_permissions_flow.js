const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:8081';
const ADMIN_EMAIL = 'htthinh28@gmail.com';
const ADMIN_PASSWORD = 'Tramanh@2010##';
const TEST_USER_EMAIL = `e2e.permission.${Date.now()}@phuongchau.com`;
const TEST_USER_PASSWORD = '123456';
const TEST_USER_NAME = 'E2E PHAN QUYEN';
const TEST_USER_DEPARTMENT = 'KHOA KIEM THU';
const TEST_USER_ROOM = 'PHONG CNTT';
const TEST_USER_TITLE = 'BAC SI';
const TEST_USER_PHONE = '0918000111';
const CHROME_EXECUTABLE = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function attachDialogLogger(page) {
  page.on('dialog', async (dialog) => {
    console.log(`[dialog] ${dialog.message()}`);
    await dialog.accept();
  });
}

async function fillLogin(page, email, password) {
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Nhập email hoặc mã HIS...').fill(email);
  await page.getByPlaceholder('Nhập mật khẩu...').fill(password);
  await page.getByText('🔑  ĐĂNG NHẬP', { exact: true }).click();
}

async function loginAdmin(page) {
  await fillLogin(page, ADMIN_EMAIL, ADMIN_PASSWORD);
  await page.waitForURL(/dashboard/, { timeout: 20000 });
}

async function logout(page) {
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  await page.getByText('Đăng xuất', { exact: false }).click();
  await page.waitForURL(/login/, { timeout: 20000 });
}

async function openPermissions(page) {
  await page.goto(`${BASE_URL}/permissions`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL(/permissions/, { timeout: 20000 });
  await page.getByText('QUẢN TRỊ PHÂN QUYỀN NÂNG CAO').waitFor({ timeout: 20000 });
}

async function createUser(page) {
  await page.getByText('THÊM NHÂN VIÊN NỘI BỘ', { exact: false }).click();
  await page.getByText('TẠO TÀI KHOẢN NỘI BỘ').waitFor({ timeout: 10000 });

  await page.getByPlaceholder('Họ và tên *', { exact: true }).fill(TEST_USER_NAME);
  await page.getByPlaceholder('Khoa', { exact: true }).fill(TEST_USER_DEPARTMENT);
  await page.getByPlaceholder('Phòng / Bộ phận', { exact: true }).fill(TEST_USER_ROOM);
  await page.getByPlaceholder('Chức danh', { exact: true }).fill(TEST_USER_TITLE);
  await page.getByPlaceholder('Số điện thoại liên lạc', { exact: true }).fill(TEST_USER_PHONE);
  await page.getByPlaceholder('Email *', { exact: true }).fill(TEST_USER_EMAIL);
  await page.getByPlaceholder('Mật khẩu ban đầu *', { exact: true }).fill(TEST_USER_PASSWORD);

  await page.getByText('Phân quyền ngay', { exact: true }).click();
  await page.getByText('Bác sĩ điều trị', { exact: false }).click();

  await page.getByText('Tạo tài khoản & gán quyền', { exact: true }).click();
  await page.getByText(`Phân quyền theo tài khoản: ${TEST_USER_NAME}`).waitFor({ timeout: 20000 });
}

async function grantReportRole(page) {
  await page.getByText('Gán quyền (RBAC)', { exact: true }).click();
  await page.getByText(TEST_USER_EMAIL, { exact: true }).first().click();
  await page.getByText('Quản lý chất lượng', { exact: false }).click();

  await page.getByText('Tài khoản & mật khẩu', { exact: true }).click();
  await page.getByPlaceholder('Tìm theo tên, email, vai trò, trạng thái...').fill(TEST_USER_EMAIL);
  await page.getByTestId(`user-report-view-${TEST_USER_EMAIL}`).getByText('Báo cáo VIEW: Cho phép', { exact: true }).waitFor({ timeout: 15000 });
  await page.getByText('Gán quyền (RBAC)', { exact: true }).click();
  await page.getByText('Bỏ chọn tài khoản', { exact: false }).click();
}

async function verifyUserCanLoginAndSeeReports(page) {
  await logout(page);
  await fillLogin(page, TEST_USER_EMAIL, TEST_USER_PASSWORD);
  await page.waitForURL(/dashboard/, { timeout: 20000 });
  await page.getByText(TEST_USER_EMAIL).waitFor({ timeout: 15000 });
  await page.getByText('📊 BÁO CÁO').waitFor({ timeout: 15000 });
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME_EXECUTABLE,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  attachDialogLogger(page);

  try {
    await loginAdmin(page);
    await openPermissions(page);
    await createUser(page);
    await grantReportRole(page);
    await verifyUserCanLoginAndSeeReports(page);

    console.log(JSON.stringify({
      ok: true,
      createdUser: TEST_USER_EMAIL,
      verifiedModule: '📊 BÁO CÁO',
    }, null, 2));
  } finally {
    await context.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error('[e2e_permissions_flow] FAILED');
  console.error(error?.stack || error?.message || String(error));
  process.exit(1);
});