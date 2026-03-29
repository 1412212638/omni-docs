import {
  asBoolean,
  extractTaskId,
  parseArgs,
  pollTask,
  readJsonInput,
  request,
  requireValue
} from './lib/client.mjs';

const usage = `Usage:
  node scripts/create-lyrics.mjs --prompt "dance"
  node scripts/create-lyrics.mjs --payload-file payload.json [--poll]
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

const payload = readJsonInput(args, () => {
  requireValue(args, 'prompt', 'Missing --prompt or --payload-file.');

  return {
    prompt: String(args.prompt),
    ...(args.notifyHook ? { notify_hook: String(args.notifyHook) } : {})
  };
});

const response = await request({
  endpoint: '/suno/submit/lyrics',
  body: payload,
  args
});

console.log(JSON.stringify(response, null, 2));

if (asBoolean(args.poll, false)) {
  const taskId = args.taskId || extractTaskId(response);

  if (!taskId) {
    throw new Error('Polling requested but no task ID was found in the response.');
  }

  const result = await pollTask({
    endpointBuilder: (id) => `/suno/fetch/${id}`,
    taskId,
    args
  });

  console.log(JSON.stringify(result, null, 2));
}
