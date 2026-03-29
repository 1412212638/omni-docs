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
  --model             Default: Vidu-q2-turbo-720p
  --prompt            Text prompt for generation
  --image             Optional reference image URL
  --images            Optional comma-separated reference image URLs
  --aspect-ratio      Default: 16:9
  --seconds           Default: 5
  --duration          Alias for --seconds
  --enhance-prompt    Default: Enabled
  --input-region      Default: Oversea
  --generate-audio    Default: false
  --person-generation Default: AllowAdult
  --input-compliance-check  Default: Disabled
  --output-compliance-check Default: Disabled
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
  const images = [];

  if (args.image) {
    images.push(String(args.image));
  }

  if (args.images) {
    const parsed = String(args.images)
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    images.push(...parsed);
  }

  return {
    model: args.model || 'Vidu-q2-turbo-720p',
    seconds: String(asNumber(args.seconds ?? args.duration, 5)),
    prompt: String(args.prompt),
    ...(images.length === 1 ? { image: images[0] } : {}),
    ...(images.length > 1 ? { images } : {}),
    metadata: {
      aspect_ratio: String(args.aspectRatio || args.ratio || '16:9'),
      enhance_prompt: String(args.enhancePrompt || 'Enabled'),
      input_region: String(args.inputRegion || 'Oversea'),
      output_config: {
        AudioGeneration: asBoolean(args.generateAudio, false) ? 'Enabled' : 'Disabled',
        PersonGeneration: String(args.personGeneration || 'AllowAdult'),
        InputComplianceCheck: String(args.inputComplianceCheck || 'Disabled'),
        OutputComplianceCheck: String(args.outputComplianceCheck || 'Disabled')
      }
    }
  };
});

const response = await request({
  endpoint: '/v1/videos',
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
    endpointBuilder: (id) => `/v1/videos/${id}`,
    taskId,
    args
  });

  console.log(JSON.stringify(result, null, 2));
}
