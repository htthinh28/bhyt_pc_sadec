#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const ALLOWED_ROLES = new Set(['ADMIN', 'AUDITOR', 'OPERATOR', 'REVIEWER', 'USER']);

const parseArgs = (argv) => {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = String(argv[i] || '');
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || String(next).startsWith('--')) {
      args[key] = 'true';
      continue;
    }
    args[key] = String(next);
    i += 1;
  }
  return args;
};

const printUsage = () => {
  console.log('');
  console.log('Usage:');
  console.log('  npm run firebase:set-claims -- \\');
  console.log('    --service-account ./secrets/service-account.json \\');
  console.log('    --email bshotanthinh@gmail.com \\');
  console.log('    --org phuongchau \\');
  console.log('    --role ADMIN \\');
  console.log('    [--project bhyt-cdss]');
  console.log('');
  console.log('Notes:');
  console.log('  - --email or --uid is required.');
  console.log('  - Allowed roles: ADMIN, AUDITOR, OPERATOR, REVIEWER, USER');
  console.log('  - Script revokes refresh tokens so claims apply after next sign-in/token refresh.');
  console.log('');
};

const loadServiceAccount = (inputPath) => {
  const rawPath = String(inputPath || '').trim();
  if (!rawPath) {
    throw new Error('Missing --service-account.');
  }

  const absolutePath = path.isAbsolute(rawPath)
    ? rawPath
    : path.resolve(process.cwd(), rawPath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Service account file not found: ${absolutePath}`);
  }

  const raw = fs.readFileSync(absolutePath, 'utf8');
  const parsed = JSON.parse(raw);
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error('Invalid service account JSON (missing client_email/private_key).');
  }
  return parsed;
};

const getOrCreateAdminApp = (serviceAccount, projectId) => {
  if (getApps().length > 0) return getApps()[0];
  return initializeApp({
    credential: cert(serviceAccount),
    projectId: String(projectId || serviceAccount.project_id || '').trim() || undefined,
  });
};

const resolveTargetUser = async (auth, args) => {
  const uid = String(args.uid || '').trim();
  const email = String(args.email || '').trim();

  if (!uid && !email) {
    throw new Error('Missing target user. Provide --uid or --email.');
  }

  if (uid) {
    const userRecord = await auth.getUser(uid);
    return userRecord;
  }

  const userRecord = await auth.getUserByEmail(email);
  return userRecord;
};

const normalizeRole = (roleRaw) => String(roleRaw || '').trim().toUpperCase();

const main = async () => {
  const args = parseArgs(process.argv.slice(2));
  if (args.help === 'true' || args.h === 'true') {
    printUsage();
    process.exit(0);
  }

  const role = normalizeRole(args.role);
  const orgId = String(args.org || '').trim();
  if (!orgId) {
    throw new Error('Missing --org (org_id).');
  }
  if (!ALLOWED_ROLES.has(role)) {
    throw new Error(`Invalid --role. Allowed: ${Array.from(ALLOWED_ROLES).join(', ')}`);
  }

  const serviceAccount = loadServiceAccount(args['service-account']);
  const app = getOrCreateAdminApp(serviceAccount, args.project);
  const auth = getAuth(app);
  const user = await resolveTargetUser(auth, args);

  const claims = {
    org_id: orgId,
    role,
  };

  await auth.setCustomUserClaims(user.uid, claims);
  await auth.revokeRefreshTokens(user.uid);

  const updated = await auth.getUser(user.uid);
  const result = {
    ok: true,
    project_id: app.options.projectId || serviceAccount.project_id || '',
    uid: updated.uid,
    email: updated.email || '',
    claims,
    note: 'Custom claims updated. User must refresh token (sign out/in) to apply.',
  };
  console.log(JSON.stringify(result, null, 2));
};

main().catch((error) => {
  console.error('[firebase:set-claims] Failed:', error?.message || String(error));
  printUsage();
  process.exit(1);
});
