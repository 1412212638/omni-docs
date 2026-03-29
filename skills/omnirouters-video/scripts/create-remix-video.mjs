import {
  asBoolean,
  asList,
  asNumber,
  extractTaskId,
  parseArgs,
  pollTask,
  readJsonInput,
  request,
  requireValue
} from './lib/client.mjs';

const usage = `Usage:
  node scripts/create-remix-video.mjs --video-url https://... --prompt "..." [options]
  node scripts/create-remix-video.mjs --payload-file payload.json [--poll]

Options:
  --model             Default: agent-vod-replicate
  --video-url         Source video URL
  --images            Comma-separated product/reference image URLs
  --prompt            Remix prompt
  --aspect-ratio      Default: 16:9
  --remove-audio      Default: false
  --seconds           Default: 180
  --poll              Poll the task result after submission
  --dry-run           Print request without sending
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

const payload = readJsonInput(args, () => {
  requireValue(args, 'videoUrl', 'Missing --video-url or --payload-file.');
  requireValue(args, 'prompt', 'Missing --prompt or --payload-file.');

  return {
    model: args.model || 'agent-vod-replicate',
    video_url: String(args.videoUrl),
    ...(asList(args.images).length ? { images: asList(args.images) } : {}),
    prompt: String(args.prompt),
    aspect_ratio: String(args.aspectRatio || '16:9'),
    remove_audio: asBoolean(args.removeAudio, false),
    seconds: String(asNumber(args.seconds, 180))
  };
});

const response = await request({
  endpoint: '/v1/video/generations',
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
    endpointBuilder: (id) => `/v1/video/generations/${id}`,
    taskId,
    args
  });

  console.log(JSON.stringify(result, null, 2));
}
