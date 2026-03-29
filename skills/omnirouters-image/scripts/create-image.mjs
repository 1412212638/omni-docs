import {
  asBoolean,
  asList,
  parseArgs,
  readJsonInput,
  request,
  requireValue
} from './lib/client.mjs';

const usage = `Usage:
  node scripts/create-image.mjs --prompt "..." [options]
  node scripts/create-image.mjs --payload-file payload.json

Options:
  --model            Default: doubao-seedream-4-5-251128
  --prompt           Text prompt for generation
  --images           Comma-separated reference image URLs
  --response-format  Default: url
  --size             Default: 4K
  --stream           Default: false
  --watermark        Default: false
  --dry-run          Print request without sending
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

const payload = readJsonInput(args, () => {
  requireValue(args, 'prompt', 'Missing --prompt or --payload-file.');

  return {
    model: args.model || 'doubao-seedream-4-5-251128',
    prompt: String(args.prompt),
    ...(asList(args.images).length ? { image: asList(args.images) } : {}),
    response_format: String(args.responseFormat || 'url'),
    size: String(args.size || '4K'),
    stream: asBoolean(args.stream, false),
    watermark: asBoolean(args.watermark, false)
  };
});

const response = await request({
  endpoint: '/v1/images/generations',
  body: payload,
  args
});

console.log(JSON.stringify(response, null, 2));
