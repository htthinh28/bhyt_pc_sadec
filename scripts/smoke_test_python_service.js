const baseUrl = String(process.env.PYTHON_SERVICE_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

const fetchJson = async (endpoint, options = {}) => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.detail || `HTTP ${response.status} at ${endpoint}`);
  }
  return data;
};

const fail = (message) => {
  console.error(`[qa:python-service] FAIL: ${message}`);
  process.exit(1);
};

const danhSachRuleTuHoSo = (claim) => Array.from(new Set(
  (Array.isArray(claim?.ket_qua_giam_dinh) ? claim.ket_qua_giam_dinh : [])
    .map((item) => item?.ma_luat)
    .filter(Boolean)
));

const main = async () => {
  console.log(`[qa:python-service] Base URL: ${baseUrl}`);

  const health = await fetchJson('/health');
  if (health?.status !== 'ok') fail('Health endpoint did not return status=ok');
  console.log(`[qa:python-service] Health OK at ${health.timestamp || 'N/A'}`);

  try {
    const ai = await fetchJson('/api/v1/ai/status');
    console.log(`[qa:python-service] AI status: model_id=${ai?.model_id || 'N/A'} deps=${ai?.deps_installed} cuda=${ai?.cuda_available} mock=${ai?.mock_mode}`);
  } catch (e) {
    console.warn(`[qa:python-service] AI status skip: ${e?.message || e}`);
  }

  const payload = {
    claims: [{
      ma_lk: 'SMOKE_IP_001',
      xml1: {
        MA_LK: 'SMOKE_IP_001',
        MA_BN: 'BN_SMOKE_IP_001',
        MA_CSKCB: '92001',
        NGAY_VAO: '202604051000',
        NGAY_RA: '202604051130',
        MA_LOAI_KCB: '03',
        MA_KHOA_VAO: 'K19',
        MA_LY_DO_VV: '2',
      },
      xml3: [{
        MA_DV: '01.0001.0001',
        TEN_DICH_VU: 'Kham benh smoke test noi tru',
        DON_GIA: 50000,
        THANH_TIEN: 50000,
        STT: 1,
        NGAY_YL: '202604051030',
        MA_KHOA: 'K19',
      }],
    }, {
      ma_lk: 'SMOKE_OP_001',
      xml1: {
        MA_LK: 'SMOKE_OP_001',
        MA_BN: 'BN_SMOKE_OP_001',
        MA_CSKCB: '92001',
        NGAY_VAO: '202604050800',
        NGAY_RA: '202604070900',
        MA_LOAI_KCB: '01',
        MA_KHOA_VAO: 'K01',
        MA_LY_DO_VV: '2',
      },
      xml3: [{
        MA_DV: '01.0001.0001',
        TEN_DICH_VU: 'Kham benh smoke test ngoai tru',
        DON_GIA: 50000,
        THANH_TIEN: 50000,
        STT: 1,
        NGAY_YL: '202604050830',
        MA_KHOA: 'K01',
      }],
    }, {
      ma_lk: 'SMOKE_DAY_001',
      xml1: {
        MA_LK: 'SMOKE_DAY_001',
        MA_BN: 'BN_SMOKE_DAY_001',
        MA_CSKCB: '92001',
        NGAY_VAO: '202604051000',
        NGAY_RA: '202604051600',
        MA_LOAI_KCB: '04',
        MA_KHOA_VAO: 'K01',
        MA_LY_DO_VV: '2',
      },
      xml3: [{
        MA_DV: '01.0001.0001',
        TEN_DICH_VU: 'Kham benh smoke test noi tru ban ngay 1',
        DON_GIA: 50000,
        THANH_TIEN: 50000,
        STT: 1,
        NGAY_YL: '202604051030',
        MA_KHOA: 'K01',
      }, {
        MA_DV: '01.0001.0001',
        TEN_DICH_VU: 'Kham benh smoke test noi tru ban ngay 2',
        DON_GIA: 50000,
        THANH_TIEN: 15000,
        STT: 2,
        NGAY_YL: '202604051130',
        MA_KHOA: 'K01',
      }],
    }],
    options: {
      source: 'qa_python_service_script',
      mode: 'batch_audit',
      expect_compatible_claim_results: true,
      dm_kham: ['01.0001.0001'],
      ma_khoa_kham: ['K01'],
    },
  };

  const audit = await fetchJson('/api/v1/audit/claims', { method: 'POST', body: payload });
  if (audit?.status !== 'ok') fail('Audit endpoint did not return status=ok');
  if (audit?.engine !== 'python-fastapi') fail('Unexpected engine value');
  if (!Array.isArray(audit?.claims) || audit.claims.length !== 3) fail('Audit response does not contain exactly three claims');

  const claimsByMaLk = new Map(audit.claims.map((item) => [String(item?.ma_lk || item?.xml1?.MA_LK || ''), item]));
  const quyTacKyVong = {
    SMOKE_IP_001: ['CK_55', 'CK_57'],
    SMOKE_OP_001: ['CK_42'],
    SMOKE_DAY_001: ['CK_09'],
  };

  Object.entries(quyTacKyVong).forEach(([maLk, rules]) => {
    const claim = claimsByMaLk.get(maLk);
    if (!claim) fail(`Thiếu claim ${maLk} trong kết quả audit`);
    const actualRules = danhSachRuleTuHoSo(claim);
    const missingRules = rules.filter((rule) => !actualRules.includes(rule));
    if (missingRules.length > 0) {
      fail(`${maLk} thiếu rule kỳ vọng: ${missingRules.join(', ')}; thực tế có ${actualRules.join(', ') || 'none'}`);
    }
    console.log(`[qa:python-service] ${maLk} OK · ${actualRules.join(', ')}`);
  });

  const supportedRules = Array.isArray(audit?.coverage?.supported_rules) ? audit.coverage.supported_rules : [];

  if (!supportedRules.includes('CK_55')) fail('Supported rules does not include CK_55');
  if (!supportedRules.includes('CK_42')) fail('Supported rules does not include CK_42');
  if (!supportedRules.includes('CK_09')) fail('Supported rules does not include CK_09');
  if (audit?.coverage?.dm_kham_source !== 'request_options') fail('dm_kham_source is not request_options');
  if (audit?.coverage?.ma_khoa_kham_source !== 'request_options') fail('ma_khoa_kham_source is not request_options');

  const totalWarnings = audit.claims.reduce((sum, claim) => sum + (Array.isArray(claim?.ket_qua_giam_dinh) ? claim.ket_qua_giam_dinh.length : 0), 0);
  console.log(`[qa:python-service] Audit OK · ${totalWarnings} cảnh báo trên 3 ca smoke test`);
  console.log(`[qa:python-service] Coverage OK · ${supportedRules.length} rules declared`);
};

main().catch((error) => fail(error?.message || 'Unknown error'));