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

function logTypeName(type) {
  switch (Number(type)) {
    case 1:
      return 'topup';
    case 2:
      return 'consume';
    case 3:
      return 'manage';
    case 4:
      return 'system';
    case 5:
      return 'error';
    case 6:
      return 'refund';
    default:
      return 'unknown';
  }
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

async function actionDiagnose(cfg, args) {
  const requestId = args._[1];
  if (!requestId) throw new Error('Usage: diagnose <request_id>');

  const data = unwrap(
    await api(cfg, '/api/log/self', {
      query: {
        request_id: requestId,
        p: 1,
        page_size: 10
      }
    })
  );
  const items = Array.isArray(data?.items) ? data.items : [];
  if (args.json) return printJson(data);

  if (items.length === 0) {
    console.log(`No log found for request_id=${requestId}.`);
    console.log('Ask the customer for the exact X-Oneapi-Request-Id, approximate time, account email/username, and API key name. Do not ask for the full API key.');
    return;
  }

  const quotaPerUnit = await getQuotaPerUnit(cfg);
  const consume = items.find((item) => Number(item.type) === 2);
  const error = items.find((item) => Number(item.type) === 5);
  const refund = items.find((item) => Number(item.type) === 6);
  const primary = consume || error || refund || items[0];
  const quota = Number(primary?.quota || 0);

  console.log(`Request: ${requestId}`);
  console.log(`Logs found: ${items.length}`);
  for (const item of items) {
    console.log(
      `- ${logTypeName(item.type)} model=${item.model_name || '-'} token=${item.token_name || '-'} quota=${item.quota || 0} time=${item.use_time || 0}s`
    );
  }

  console.log('');
  console.log('Support summary');
  if (consume) {
    console.log(`- The request completed and has a consume log.`);
    console.log(`- Final quota: ${quota} (~$${(quota / quotaPerUnit).toFixed(6)}).`);
    console.log(`- Tokens: prompt=${consume.prompt_tokens || 0}, completion=${consume.completion_tokens || 0}.`);
  } else if (error) {
    console.log('- The request has an error log and no consume log in the first page.');
    console.log(`- Customer-safe error: ${sanitizeCustomerText(error.content || 'Request failed')}`);
  } else if (refund) {
    console.log('- A refund log was found for this request.');
  } else {
    console.log('- Logs exist, but no consume/error/refund entry was identified.');
  }

  console.log('');
  console.log('Customer reply draft');
  console.log(buildReplyFromLogs(requestId, { consume, error, refund, primary, quotaPerUnit }));
}

function sanitizeCustomerText(text) {
  return redactSecrets(String(text || ''))
    .replace(/channel\s*#?\d+/gi, 'upstream route')
    .replace(/通道\s*#?\d+/g, '上游线路')
    .trim();
}

function buildReplyFromLogs(requestId, { consume, error, refund, primary, quotaPerUnit }) {
  if (consume) {
    const quota = Number(consume.quota || 0);
    const usd = (quota / quotaPerUnit).toFixed(6);
    return [
      `您好，已查询到请求 ${requestId} 的调用记录。`,
      `该请求已成功完成，模型为 ${consume.model_name || primary?.model_name || '-'}，实际消耗额度为 ${quota}，约 $${usd}。`,
      `本次用量为 prompt ${consume.prompt_tokens || 0} tokens、completion ${consume.completion_tokens || 0} tokens，耗时 ${consume.use_time || 0} 秒。`
    ].join('\n');
  }

  if (error) {
    return [
      `您好，已查询到请求 ${requestId} 的失败记录。`,
      `当前未查询到该请求的成功消费记录。错误信息为：${sanitizeCustomerText(error.content || '请求失败')}。`,
      '建议您检查请求参数、模型名称、账户额度和 API Key 权限后重试；如仍有问题，请提供请求时间和使用的 API Key 名称，我们继续协助排查。'
    ].join('\n');
  }

  if (refund) {
    return [
      `您好，已查询到请求 ${requestId} 的退款/返还记录。`,
      '系统已按记录处理额度返还，请以账户余额和日志中的最终记录为准。'
    ].join('\n');
  }

  return [
    `您好，已查询到请求 ${requestId} 的相关日志，但暂未识别到明确的成功消费或失败记录。`,
    '请补充请求时间、账户信息和 API Key 名称，我们会继续核对。请不要发送完整 API Key。'
  ].join('\n');
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

function actionReply(args) {
  const situation = args._.slice(1).join(' ').trim();
  if (!situation) {
    console.log(`Usage: reply <situation>

Examples:
  reply 客户说请求失败但没有 request_id
  reply 客户询问为什么扣费`);
    return;
  }

  console.log(buildGenericSupportReply(situation));
}

function buildGenericSupportReply(situation) {
  const text = situation.toLowerCase();

  if (
    text.includes('gemini') ||
    text.includes('claude') ||
    text.includes('openai格式') ||
    text.includes('openai 格式') ||
    text.includes('response_format') ||
    text.includes('tool') ||
    text.includes('tools') ||
    text.includes('兼容') ||
    text.includes('参数不生效')
  ) {
    return [
      '您好，这通常属于不同模型协议之间的兼容性差异。',
      'OmniRouters 支持用 OpenAI 兼容格式调用多类模型，但 Gemini、Claude、OpenAI 等上游的原生能力并不是完全一一对应，部分模型专属参数可能会被忽略、转换或只支持原生协议。',
      '如果您依赖 Gemini/Claude 的原生能力，建议改用对应的原生接口格式；如果只是普通对话，可以继续使用 `/v1/chat/completions`。',
      '请提供脱敏后的请求体、模型名称、endpoint 和请求 ID，我们可以帮您确认应该使用哪种协议。'
    ].join('\n');
  }

  if (text.includes('request') || text.includes('请求') || text.includes('失败') || text.includes('报错')) {
    return [
      '您好，为了准确定位这次 API 调用，请您提供以下信息：',
      '1. 响应头中的 X-Oneapi-Request-Id',
      '2. 大致请求时间和时区',
      '3. 使用的模型名称',
      '4. API Key 名称即可，请不要发送完整 API Key',
      '我们收到后会核对请求日志、错误原因和是否产生实际扣费。'
    ].join('\n');
  }

  if (text.includes('扣费') || text.includes('费用') || text.includes('对账') || text.includes('消耗')) {
    return [
      '您好，单次调用的实际消耗需要按请求 ID 查询。',
      '请提供响应头中的 X-Oneapi-Request-Id，我们会核对该请求的模型、token 用量、最终扣除额度和折算金额。',
      '对账时建议以日志中的原始 quota 数值为准，金额展示仅作为换算参考。'
    ].join('\n');
  }

  if (text.includes('key') || text.includes('令牌') || text.includes('鉴权') || text.includes('401')) {
    return [
      '您好，请先确认 API Key 属于当前账户且处于启用状态。',
      '同时请检查该 Key 是否还有可用额度、是否限制了分组或模型访问权限。',
      '为了安全，请不要发送完整 API Key；提供 API Key 名称或截图中打码后的尾号即可。'
    ].join('\n');
  }

  return [
    '您好，我们可以协助排查。',
    '请提供问题现象、请求时间、模型名称，以及响应头中的 X-Oneapi-Request-Id（如有）。',
    '如果涉及 API Key，请提供 Key 名称即可，请不要发送完整 API Key。'
  ].join('\n');
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
  node scripts/omnirouters.mjs diagnose <request_id>
  node scripts/omnirouters.mjs copy-token <token_id>
  node scripts/omnirouters.mjs reply <situation>

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
    case 'diagnose':
      return actionDiagnose(cfg, args);
    case 'copy-token':
      return actionCopyToken(cfg, args);
    case 'reply':
      return actionReply(args);
    case 'help':
    default:
      return showHelp();
  }
}

main().catch((error) => {
  console.error(redactSecrets(error?.message || String(error)));
  process.exitCode = 1;
});
