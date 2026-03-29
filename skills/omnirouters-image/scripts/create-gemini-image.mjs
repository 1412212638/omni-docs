import {
  asList,
  asNumber,
  encodeInlineFile,
  guessMimeType,
  parseArgs,
  readJsonInput,
  request,
  requireValue
} from './lib/client.mjs';

const usage = `Usage:
  node scripts/create-gemini-image.mjs --text "..." [options]
  node scripts/create-gemini-image.mjs --payload-file payload.json

Options:
  --model             Default: gemini-2.5-flash-image
  --text              Prompt text
  --inline-file       Optional local files to send as inlineData
  --mime-type         Optional mime type override for inline files
  --max-output-tokens Default: 8192
  --dry-run           Print request without sending
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

const payload = readJsonInput(args, () => {
  requireValue(args, 'text', 'Missing --text or --payload-file.');

  const parts = [{ text: String(args.text) }];

  for (const filePath of asList(args.inlineFile)) {
    parts.push(
      encodeInlineFile(filePath, args.mimeType || guessMimeType(filePath, 'image/png'))
    );
  }

  return {
    contents: [
      {
        role: 'user',
        parts
      }
    ],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE'],
      maxOutputTokens: asNumber(args.maxOutputTokens, 8192)
    }
  };
});

const model = String(args.model || 'gemini-2.5-flash-image');
const response = await request({
  endpoint: `/v1beta/models/${encodeURIComponent(model)}:generateContent`,
  body: payload,
  args
});

console.log(JSON.stringify(response, null, 2));
