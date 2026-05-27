#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import os from 'node:os';

const DEFAULT_BASE_URL = 'https://omnirouters.com';
const DEFAULT_QUOTA_PER_UNIT = 500000;

function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith('--')) {
      args._.push(token);
      continue;
    }

    const raw = token.slice(2);
    const eq = raw.indexOf('=');

    if (eq !== -1) {
      args[toCamel(raw.slice(0, eq))] = raw.slice(eq + 1);
      continue;
    }

    if (raw.startsWith('no-')) {
      args[toCamel(raw.slice(3))] = false;
      continue;
    }

    const key = toCamel(raw);
    const next = argv[index + 1];
    if (next === undefined || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }

  return args;
}

function toCamel(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function env(name, fallbackName) {
  return process.env[name] || (fallbackName ? process.env[fallbackName] : undefined);
}

function config(args) {
  return {
    baseUrl: String(
      args.baseUrl || env('OMNIROUTERS_BASE_URL', 'NEWAPI_BASE_URL') || DEFAULT_BASE_URL
    ).replace(/\/+$/, ''),
    accessToken: String(
      args.accessToken || env('OMNIROUTERS_ACCESS_TOKEN', 'NEWAPI_ACCESS_TOKEN') || ''
    ),
    userId: String(args.userId || env('OMNIROUTERS_USER_ID', 'NEWAPI_USER_ID') || ''),
    quotaPerUnit: Number(
      args.quotaPerUnit ||
        env('OMNIROUTERS_QUOTA_PER_UNIT', 'NEWAPI_QUOTA_PER_UNIT') ||
        DEFAULT_QUOTA_PER_UNIT
    )
  };
}

function requireAuth(cfg) {
  const missing = [];
  if (!cfg.accessToken) missing.push('OMNIROUTERS_ACCESS_TOKEN');
  if (!cfg.userId) missing.push('OMNIROUTERS_USER_ID');
  if (missing.length > 0) {
    throw new Error(`Missing ${missing.join(', ')}.`);
  }
}

function buildUrl(cfg, pathname, query = {}) {
  const url = new URL(`${cfg.baseUrl}${pathname}`);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}

async function api(cfg, pathname, { method = 'GET', query, body, auth = true } = {}) {
  if (auth) requireAuth(cfg);

  const response = await fetch(buildUrl(cfg, pathname, query), {
    method,
    headers: {
      ...(auth
        ? {
            Authorization: `Bearer ${cfg.accessToken}`,
            'New-Api-User': cfg.userId
          }
        : {}),
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' })
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${safeText(data)}`);
  }

  if (data && typeof data === 'object' && data.success === false) {
    throw new Error(data.message || 'OmniRouters API returned success=false.');
  }

  return data;
}

function safeText(value) {
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  return redactSecrets(text || '');
}

function redactSecrets(text) {
  return String(text)
    .replace(/sk-[A-Za-z0-9_-]{8,}/g, 'sk-***')
    .replace(/Bearer\s+[A-Za-z0-9+/_=-]{12,}/gi, 'Bearer ***');
}

function unwrap(response) {
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data;
  }
  return response;
}

function printJson(value) {
  console.log(redactSecrets(JSON.stringify(value, null, 2)));
}

function asInt(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asBool(value, fallback = false) {
  if (value === undefined) return fallback;
  if (typeof value === 'boolean') return value;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
}

async function getQuotaPerUnit(cfg) {
  if (Number.isFinite(cfg.quotaPerUnit) && cfg.quotaPerUnit > 0) {
    return cfg.quotaPerUnit;
  }

  try {
    const status = await api(cfg, '/api/status', { auth: false });
    const data = unwrap(status);
    const value = Number(data?.quota_per_unit);
    return Number.isFinite(value) && value > 0 ? value : DEFAULT_QUOTA_PER_UNIT;
  } catch {
    return DEFAULT_QUOTA_PER_UNIT;
  }
}

async function actionModels(cfg, args) {
  const data = unwrap(
    await api(cfg, '/api/user/models', {
      query: { endpoint_type: args.endpointType }
    })
  );
  if (args.json) return printJson(data);

  const models = Array.isArray(data) ? data : [];
  console.log(`Models (${models.length})`);
  for (const model of models) console.log(`- ${model}`);
}

async function actionGroups(cfg, args) {
  const data = unwrap(await api(cfg, '/api/user/self/groups'));
  if (args.json) return printJson(data);

  console.log('Groups');
  for (const [name, info] of Object.entries(data || {})) {
    console.log(`- ${name}: ratio=${info?.ratio ?? '-'} desc=${info?.desc ?? ''}`);
  }
}

async function actionBalance(cfg, args) {
  const data = unwrap(await api(cfg, '/api/user/self'));
  if (args.json) return printJson(data);

  const quotaPerUnit = await getQuotaPerUnit(cfg);
  const quota = Number(data?.quota || 0);
  const used = Number(data?.used_quota || 0);
  console.log(`User: ${data?.username || data?.id || cfg.userId}`);
  console.log(`Group: ${data?.group || '-'}`);
  console.log(`Quota: ${quota} (~$${(quota / quotaPerUnit).toFixed(6)})`);
  console.log(`Used quota: ${used} (~$${(used / quotaPerUnit).toFixed(6)})`);
  console.log(`Requests: ${data?.request_count ?? 0}`);
}

async function actionTokens(cfg, args) {
  const data = unwrap(
    await api(cfg, '/api/token/', {
      query: {
        p: args.page || 1,
        page_size: args.pageSize || 20
      }
    })
  );
  if (args.json) return printJson(data);

  const items = Array.isArray(data?.items) ? data.items : [];
  console.log(`Tokens (${items.length}/${data?.total ?? items.length})`);
  for (const token of items) {
    console.log(
      `- #${token.id} ${token.name || '(unnamed)'} group=${token.group || '-'} status=${token.status} key=${token.key || 'masked'}`
    );
  }
}

async function actionCreateToken(cfg, args) {
  const name = args._[1];
  if (!name) throw new Error('Usage: create-token <name> [--group=default] [--unlimited]');

  const payload = {
    name,
    group: args.group || 'default',
    expired_time: args.expiredTime === undefined ? -1 : asInt(args.expiredTime, -1),
    remain_quota: asInt(args.remainQuota || args.quota, 0),
    unlimited_quota: asBool(args.unlimited, false),
    model_limits_enabled: false,
    model_limits: ''
  };

  await api(cfg, '/api/token/', { method: 'POST', body: payload });
  console.log(`Created token "${name}" in group "${payload.group}".`);
  console.log('The real key was not printed. Run `copy-token <id>` after listing tokens if needed.');
}

async function actionSwitchGroup(cfg, args) {
  const tokenId = args._[1];
  const group = args._[2];
  if (!tokenId || !group) throw new Error('Usage: switch-group <token_id> <group>');

  const token = unwrap(await api(cfg, `/api/token/${encodeURIComponent(tokenId)}`));
  const payload = {
    id: token.id,
    name: token.name,
    status: token.status,
    expired_time: token.expired_time,
    remain_quota: token.remain_quota,
    unlimited_quota: token.unlimited_quota,
    model_limits_enabled: token.model_limits_enabled,
    model_limits: token.model_limits || '',
    allow_ips: token.allow_ips || '',
    group,
    cross_group_retry: Boolean(token.cross_group_retry)
  };

  const updated = unwrap(await api(cfg, '/api/token/', { method: 'PUT', body: payload }));
  if (args.json) return printJson(updated);
  console.log(`Token #${token.id} "${token.name}" switched to group "${group}".`);
}

async function actionUsage(cfg, args) {
  const requestId = args._[1];
  if (!requestId) throw new Error('Usage: usage <request_id>');

  const data = unwrap(
    await api(cfg, '/api/log/self', {
      query: {
        type: 2,
        request_id: requestId,
        p: 1,
        page_size: 1
      }
    })
  );
  const item = Array.isArray(data?.items) ? data.items[0] : undefined;
  if (args.json) return printJson(data);
  if (!item) {
    console.log(`No consume log found for request_id=${requestId}.`);
    return;
  }

  const quotaPerUnit = await getQuotaPerUnit(cfg);
  const quota = Number(item.quota || 0);
  const created = item.created_at
    ? new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        dateStyle: 'medium',
        timeStyle: 'medium'
      }).format(new Date(Number(item.created_at) * 1000))
    : '-';

  console.log(`Request: ${item.request_id}`);
  if (item.upstream_request_id) console.log(`Upstream request: ${item.upstream_request_id}`);
  console.log(`Model: ${item.model_name || '-'}`);
  console.log(`Token: ${item.token_name || '-'} (#${item.token_id || '-'})`);
  console.log(`Group: ${item.group || '-'}`);
  console.log(`Quota: ${quota}`);
  console.log(`Estimated USD: $${(quota / quotaPerUnit).toFixed(6)}`);
  console.log(`Prompt tokens: ${item.prompt_tokens || 0}`);
  console.log(`Completion tokens: ${item.completion_tokens || 0}`);
  console.log(`Use time: ${item.use_time || 0}s`);
  console.log(`Created: ${created}`);
}

async function actionCopyToken(cfg, args) {
  const tokenId = args._[1];
  if (!tokenId) throw new Error('Usage: copy-token <token_id>');

  const data = unwrap(
    await api(cfg, `/api/token/${encodeURIComponent(tokenId)}/key`, { method: 'POST' })
  );
  const key = data?.key;
  if (!key) throw new Error('API did not return a key.');

  copyToClipboard(key);
  console.log(`Copied token #${tokenId} to clipboard. The key was not printed.`);
}

function copyToClipboard(value) {
  const platform = os.platform();
  let result;

  if (platform === 'win32') {
    result = spawnSync('clip', { input: value, shell: true });
  } else if (platform === 'darwin') {
    result = spawnSync('pbcopy', { input: value });
  } else {
    result = spawnSync('xclip', ['-selection', 'clipboard'], { input: value });
    if (result.error || result.status !== 0) {
      result = spawnSync('xsel', ['--clipboard', '--input'], { input: value });
    }
  }

  if (result.error || result.status !== 0) {
    throw new Error('Failed to copy to clipboard. Install xclip/xsel on Linux or copy from the dashboard.');
  }
}

function showHelp() {
  console.log(`OmniRouters skill actions

Usage:
  node scripts/omnirouters.mjs models [--endpoint-type chat]
  node scripts/omnirouters.mjs groups
  node scripts/omnirouters.mjs balance
  node scripts/omnirouters.mjs tokens [--page-size 20]
  node scripts/omnirouters.mjs create-token <name> [--group default] [--unlimited]
  node scripts/omnirouters.mjs switch-group <token_id> <group>
  node scripts/omnirouters.mjs usage <request_id>
  node scripts/omnirouters.mjs copy-token <token_id>

Environment:
  OMNIROUTERS_BASE_URL=https://omnirouters.com
  OMNIROUTERS_ACCESS_TOKEN=<profile access token>
  OMNIROUTERS_USER_ID=<user id>`);
}

async function main() {
  const args = parseArgs();
  const action = args._[0] || 'help';
  const cfg = config(args);

  switch (action) {
    case 'models':
      return actionModels(cfg, args);
    case 'groups':
      return actionGroups(cfg, args);
    case 'balance':
      return actionBalance(cfg, args);
    case 'tokens':
      return actionTokens(cfg, args);
    case 'create-token':
      return actionCreateToken(cfg, args);
    case 'switch-group':
      return actionSwitchGroup(cfg, args);
    case 'usage':
    case 'request':
    case 'reconcile':
      return actionUsage(cfg, args);
    case 'copy-token':
      return actionCopyToken(cfg, args);
    case 'help':
    default:
      return showHelp();
  }
}

main().catch((error) => {
  console.error(redactSecrets(error?.message || String(error)));
  process.exitCode = 1;
});
