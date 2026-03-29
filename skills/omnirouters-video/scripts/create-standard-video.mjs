import {
  asBoolean,
  asNumber,
  extractTaskId,
  parseArgs,
  pollTask,
  readJsonInput,
  request,
  requireValue
} from './lib/client.mjs';

const usage = `Usage:
  node scripts/create-standard-video.mjs --prompt "..." [options]
  node scripts/create-standard-video.mjs --payload-file payload.json [--poll]

Options:
  --model             Default: doubao-seedance-1-5-pro-251215
  --prompt            Text prompt for generation
  --image             Optional reference image URL
  --resolution        Default: 1280x720
  --ratio             Default: 16:9
  --duration          Default: 5
  --seed              Default: 12345
  --generate-audio    Default: false
  --watermark         Default: false
  --poll              Poll the task result after submission
  --interval-seconds  Poll interval, default 5
  --timeout-seconds   Poll timeout, default 300
  --dry-run           Print request without sending
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

const payload = readJsonInput(args, () => {
  requireValue(args, 'prompt', 'Missing --prompt or --payload-file.');

  return {
    model: args.model || 'doubao-seedance-1-5-pro-251215',
    prompt: String(args.prompt),
    ...(args.image ? { image: String(args.image) } : {}),
    metadata: {
      resolution: String(args.resolution || '1280x720'),
      ratio: String(args.ratio || '16:9'),
      duration: asNumber(args.duration, 5),
      seed: asNumber(args.seed, 12345),
      generate_audio: asBoolean(args.generateAudio, false),
      watermark: asBoolean(args.watermark, false)
    }
  };
});

const response = await request({
  endpoint: '/v1/videos/generations',
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
    endpointBuilder: (id) => `/v1/videos/generations/${id}`,
    taskId,
    args
  });

  console.log(JSON.stringify(result, null, 2));
}
