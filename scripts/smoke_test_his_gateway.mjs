/**
 * Kiểm tra nhanh cổng HIS: REST health, TCP (cổng WebSocket), FHIR metadata, GraphQL ping, SOAP/WSDL GET.
 * Cấu hình: app.json extra.his, ghi đè bởi biến môi trường EXPO_PUBLIC_HIS_* (giống hướng dẫn trong his_api.jsx).
 * Chạy: npm run qa:his-gateway
 */
import fs from 'fs';
import net from 'net';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const readAppHis = () => {
  const raw = fs.readFileSync(path.join(root, 'app.json'), 'utf8');
  const app = JSON.parse(raw);
  return app?.expo?.extra?.his || {};
};

const trim = (v) => String(v ?? '').trim();
const env = process.env || {};

/** Gộp env lên trên app.json — khớp ý getConfig() trong his_api.jsx (ưu tiên env). */
function mergeHisConfig(base) {
  const pick = (envKey, jsonKey, fallback = '') =>
    trim(env[envKey]) || trim(base[jsonKey]) || fallback;

  return {
    enabled: trim(env.EXPO_PUBLIC_HIS_ENABLED)
      ? !['0', 'false', 'no', 'off'].includes(trim(env.EXPO_PUBLIC_HIS_ENABLED).toLowerCase())
      : base.enabled !== false,
    restBaseUrl: pick('EXPO_PUBLIC_HIS_REST_BASE_URL', 'restBaseUrl'),
    restHealthPaths: pick('EXPO_PUBLIC_HIS_REST_HEALTH_PATHS', 'restHealthPaths', '/health,/ready,/actuator/health'),
    fhirBaseUrl: pick('EXPO_PUBLIC_HIS_FHIR_BASE_URL', 'fhirBaseUrl'),
    graphqlUrl: pick('EXPO_PUBLIC_HIS_GRAPHQL_URL', 'graphqlUrl'),
    soapWsdlUrl: pick('EXPO_PUBLIC_HIS_SOAP_WSDL_URL', 'soapWsdlUrl'),
    soapServiceUrl: pick('EXPO_PUBLIC_HIS_SOAP_SERVICE_URL', 'soapServiceUrl'),
    websocketUrl: pick('EXPO_PUBLIC_HIS_WEBSOCKET_URL', 'websocketUrl'),
    timeoutMs: Number(pick('EXPO_PUBLIC_HIS_TIMEOUT_MS', 'timeoutMs', '15000')) || 15000,
  };
}

/** Giới hạn mỗi request để script không treo khi host không phản hồi. */
const PER_REQ_MS = 4000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), ms);
    }),
  ]);
}

async function fetchProbe(url, cfg, init = {}) {
  const ms = Math.min(Number(cfg.timeoutMs) || PER_REQ_MS, PER_REQ_MS);
  const ac = new AbortController();
  try {
    const r = await withTimeout(
      fetch(url, {
        method: init.method || 'GET',
        headers: init.headers || { Accept: 'application/json, */*' },
        body: init.body,
        signal: ac.signal,
      }),
      ms,
    );
    return { ok: r.ok, status: r.status, err: null };
  } catch (e) {
    ac.abort();
    const msg = e?.name === 'AbortError' || String(e?.message || e).includes('Timeout') ? 'Timeout' : (e?.message || String(e));
    return { ok: false, status: null, err: msg };
  }
}

function parseWsUrl(wsUrl) {
  try {
    const u = new URL(wsUrl);
    const isSecure = u.protocol === 'wss:';
    const port = u.port ? Number(u.port) : (isSecure ? 443 : 80);
    return { host: u.hostname, port };
  } catch {
    return null;
  }
}

function tcpProbe(host, port, ms) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port }, () => {
      socket.end();
      resolve({ ok: true });
    });
    socket.setTimeout(ms);
    socket.on('timeout', () => {
      socket.destroy();
      resolve({ ok: false, err: 'TCP timeout' });
    });
    socket.on('error', (e) => {
      resolve({ ok: false, err: e?.message || 'TCP error' });
    });
  });
}

const his = mergeHisConfig(readAppHis());

console.log('=== Smoke test: cổng HIS (app.json + EXPO_PUBLIC_HIS_*) ===\n');
console.log(`his.enabled: ${his.enabled}`);
console.log('(Biến EXPO_PUBLIC_HIS_REST_BASE_URL / ... ghi đè app.json khi đặt.)\n');

let exitCode = 0;

if (!his.enabled) {
  console.log('HIS đang tắt (enabled=false) — bỏ qua kiểm tra thực địa.\n');
  process.exit(1);
}

const base = String(his.restBaseUrl || '').replace(/\/$/, '');
if (!base) {
  console.log('REST: (bỏ qua — chưa có restBaseUrl)\n');
} else {
  const paths = String(his.restHealthPaths || '/health')
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  console.log('--- 1) REST JSON (GET health paths) ---');
  if (base.includes('/api/v1') && paths.some((p) => p.startsWith('/api/'))) {
    console.log('  (Cảnh báo: restBaseUrl đã có /api/v1 — tránh path kiểu /api/health → .../api/v1/api/health)\n');
  }
  let anyOk = false;
  for (const p of paths) {
    const ep = p.startsWith('/') ? p : `/${p}`;
    const url = `${base}${ep}`;
    const r = await fetchProbe(url, his);
    if (r.err) {
      console.log(`  ${url}`);
      console.log(`    → Lỗi: ${r.err}`);
    } else {
      console.log(`  ${url}`);
      console.log(`    → HTTP ${r.status} ${r.ok ? '(OK)' : '(không 2xx)'}`);
      if (r.ok) anyOk = true;
    }
  }
  if (!anyOk && paths.length) {
    console.log('\n  Kết luận REST: không có path nào trả HTTP 2xx (mạng/VPN, firewall, hoặc sai đường dẫn health).');
    exitCode = 1;
  } else if (anyOk) {
    console.log('\n  Kết luận REST: ít nhất một endpoint phản hồi OK.');
  }
  console.log('');
}

const wsUrl = String(his.websocketUrl || '').trim();
if (!wsUrl) {
  console.log('--- 2) WebSocket ---\n(bỏ qua — chưa có websocketUrl)\n');
} else {
  const parsed = parseWsUrl(wsUrl);
  console.log('--- 2) WebSocket (TCP tới host:port — không handshake WS đầy đủ) ---');
  if (!parsed) {
    console.log(`  URL không hợp lệ: ${wsUrl}\n`);
    exitCode = 1;
  } else {
    const tcpMs = Math.min(Number(his.timeoutMs) || 5000, 5000);
    const tcp = await tcpProbe(parsed.host, parsed.port, tcpMs);
    console.log(`  ${parsed.host}:${parsed.port}`);
    console.log(tcp.ok ? '    → TCP kết nối được (có tiến trình lắng nghe).' : `    → TCP không kết nối: ${tcp.err}`);
    if (!tcp.ok) exitCode = 1;
  }
  console.log('');
}

const fhirBase = String(his.fhirBaseUrl || '').replace(/\/$/, '');
if (!fhirBase) {
  console.log('--- 3) FHIR ---\n(bỏ qua — chưa cấu hình fhirBaseUrl / EXPO_PUBLIC_HIS_FHIR_BASE_URL)\n');
} else {
  console.log('--- 3) FHIR (GET /metadata) ---');
  const url = `${fhirBase}/metadata`;
  const r = await fetchProbe(url, his, { headers: { Accept: 'application/fhir+json, application/json' } });
  if (r.err) {
    console.log(`  ${url}`);
    console.log(`    → Lỗi: ${r.err}`);
    exitCode = 1;
  } else {
    console.log(`  ${url}`);
    console.log(`    → HTTP ${r.status} ${r.ok ? '(OK)' : ''}`);
    if (!r.ok) exitCode = 1;
  }
  console.log('');
}

const gqlUrl = String(his.graphqlUrl || '').trim();
if (!gqlUrl) {
  console.log('--- 4) GraphQL ---\n(bỏ qua — chưa cấu hình graphqlUrl)\n');
} else {
  console.log('--- 4) GraphQL (POST query tối thiểu) ---');
  const r = await fetchProbe(
    gqlUrl,
    his,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: '{ __typename }' }),
    },
  );
  if (r.err) {
    console.log(`  ${gqlUrl}`);
    console.log(`    → Lỗi: ${r.err}`);
    exitCode = 1;
  } else {
    console.log(`  ${gqlUrl}`);
    console.log(`    → HTTP ${r.status} ${r.ok ? '(OK)' : ''}`);
    if (!r.ok) exitCode = 1;
  }
  console.log('');
}

const soapUrl = trim(his.soapWsdlUrl) || trim(his.soapServiceUrl);
if (!soapUrl) {
  console.log('--- 5) SOAP / WSDL ---\n(bỏ qua — chưa cấu hình soapWsdlUrl / soapServiceUrl)\n');
} else {
  console.log('--- 5) SOAP/WSDL (GET — thường là WSDL) ---');
  const r = await fetchProbe(soapUrl, his, { headers: { Accept: 'text/xml, application/xml, */*' } });
  if (r.err) {
    console.log(`  ${soapUrl}`);
    console.log(`    → Lỗi: ${r.err}`);
    exitCode = 1;
  } else {
    console.log(`  ${soapUrl}`);
    console.log(`    → HTTP ${r.status} ${r.ok ? '(OK)' : ''}`);
    if (!r.ok) exitCode = 1;
  }
  console.log('');
}

console.log('--- Tổng kết ---');
console.log('  • Trong app: Tổng quan → CỔNG HIS → "KIỂM TRA TẤT CẢ GIAO THỨC" (HisApi.kiemTraBoKetNoiHIS) — có token Bearer nếu HIS yêu cầu.');
console.log('  • Script CLI không gửi token; nếu health cần auth, dùng nút trong app hoặc curl kèm header.');
console.log(`  • Exit code: ${exitCode} (${exitCode === 0 ? 'mọi kênh đã cấu hình đều phản hồi' : 'có kênh lỗi hoặc không tới được máy chủ'})\n`);

process.exit(exitCode);
