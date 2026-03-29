import fs from 'node:fs';
import path from 'node:path';

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function parseArgs(argv = process.argv.slice(2)) {
  const args = { _: [] };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith('--')) {
      args._.push(token);
      continue;
    }

    const rawKey = token.slice(2);

    if (!rawKey) {
      continue;
    }

    if (rawKey.startsWith('no-')) {
      args[toCamelCase(rawKey.slice(3))] = false;
      continue;
    }

    const key = toCamelCase(rawKey);
    const next = argv[index + 1];

    if (next === undefined || next.startsWith('--')) {
      args[key] = true;
      continue;
    }

    if (args[key] === undefined) {
      args[key] = next;
    } else if (Array.isArray(args[key])) {
      args[key].push(next);
    } else {
      args[key] = [args[key], next];
    }

    index += 1;
  }

  return args;
}

export function asBoolean(value, fallback = false) {
  if (value === undefined) {
    return fallback;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
}

export function asNumber(value, fallback) {
  if (value === undefined) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function asList(value) {
  if (value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(asList);
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getBaseUrl(args) {
  return String(
    args.baseUrl || process.env.OMNIROUTERS_BASE_URL || 'https://omnirouters.com'
  ).replace(/\/+$/, '');
}

export function getApiKey(args) {
  return args.apiKey || process.env.OMNIROUTERS_API_KEY;
}

export function requireValue(args, key, message) {
  if (args[key] === undefined || args[key] === '') {
    throw new Error(message);
  }
}

export function readJsonInput(args, fallbackBuilder) {
  if (args.payloadFile) {
    const payloadPath = path.resolve(String(args.payloadFile));
    return JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  }

  if (args.payload) {
    return JSON.parse(String(args.payload));
  }

  return fallbackBuilder();
}

export function encodeInlineFile(filePath, mimeType) {
  const resolvedPath = path.resolve(filePath);
  const fileBuffer = fs.readFileSync(resolvedPath);

  return {
    inlineData: {
      mimeType,
      data: fileBuffer.toString('base64')
    }
  };
}

export function guessMimeType(filePath, fallback = 'application/octet-stream') {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.pdf':
      return 'application/pdf';
    case '.mp3':
      return 'audio/mpeg';
    case '.wav':
      return 'audio/wav';
    default:
      return fallback;
  }
}

export async function request({
  method = 'POST',
  endpoint,
  body,
  args,
  defaultBinaryFileName
}) {
  const url = `${getBaseUrl(args)}${endpoint}`;

  if (asBoolean(args.dryRun, false)) {
    console.log(
      JSON.stringify(
        {
          method,
          url,
          headers: {
            Authorization: getApiKey(args) ? 'Bearer ***' : 'Bearer <OMNIROUTERS_API_KEY>',
            'Content-Type': body === undefined ? undefined : 'application/json'
          },
          body
        },
        null,
        2
      )
    );

    return { dryRun: true, url, body };
  }

  const apiKey = getApiKey(args);

  if (!apiKey) {
    throw new Error(
      'Missing OMNIROUTERS_API_KEY. Set the environment variable or pass --api-key.'
    );
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' })
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status} ${response.statusText}\n${errorText}`);
  }

  if (
    contentType.includes('application/json') ||
    contentType.includes('+json') ||
    contentType.includes('text/json')
  ) {
    const json = await response.json();

    if (args.save) {
      const outputPath = path.resolve(String(args.save));
      fs.writeFileSync(outputPath, `${JSON.stringify(json, null, 2)}\n`);
      console.error(`Saved JSON response to ${outputPath}`);
    }

    return json;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const outputPath = path.resolve(
    String(args.output || args.save || defaultBinaryFileName || 'omnirouters-output.bin')
  );

  fs.writeFileSync(outputPath, buffer);
  console.error(`Saved binary response to ${outputPath}`);

  return {
    savedTo: outputPath,
    bytes: buffer.length,
    contentType
  };
}

export function extractTaskId(value) {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  if (typeof value.task_id === 'string') {
    return value.task_id;
  }

  if (typeof value.taskId === 'string') {
    return value.taskId;
  }

  if (typeof value.id === 'string' && (value.status || value.progress || value.data)) {
    return value.id;
  }

  for (const nestedValue of Object.values(value)) {
    const taskId = extractTaskId(nestedValue);
    if (taskId) {
      return taskId;
    }
  }

  return undefined;
}

export function extractStatus(value) {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  if (typeof value.status === 'string') {
    return value.status;
  }

  for (const nestedValue of Object.values(value)) {
    const status = extractStatus(nestedValue);
    if (status) {
      return status;
    }
  }

  return undefined;
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function pollTask({
  endpointBuilder,
  taskId,
  args,
  defaultBinaryFileName
}) {
  if (asBoolean(args.dryRun, false)) {
    console.log(
      JSON.stringify(
        {
          action: 'poll',
          taskId,
          url: `${getBaseUrl(args)}${endpointBuilder(taskId)}`
        },
        null,
        2
      )
    );
    return { dryRun: true, taskId };
  }

  const intervalSeconds = asNumber(args.intervalSeconds, 5);
  const timeoutSeconds = asNumber(args.timeoutSeconds, 300);
  const startedAt = Date.now();

  while (true) {
    const result = await request({
      method: 'GET',
      endpoint: endpointBuilder(taskId),
      args,
      defaultBinaryFileName
    });

    const status = String(extractStatus(result) || '').toLowerCase();
    console.error(`Task ${taskId} status: ${status || 'unknown'}`);

    if (
      ['succeeded', 'success', 'completed', 'done', 'failed', 'error', 'cancelled'].includes(
        status
      )
    ) {
      return result;
    }

    if (Date.now() - startedAt > timeoutSeconds * 1000) {
      throw new Error(`Polling timed out after ${timeoutSeconds} seconds.`);
    }

    await sleep(intervalSeconds * 1000);
  }
}
