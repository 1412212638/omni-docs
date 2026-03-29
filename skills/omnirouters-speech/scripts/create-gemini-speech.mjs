import {
  asNumber,
  parseArgs,
  readJsonInput,
  request,
  requireValue
} from './lib/client.mjs';

const usage = `Usage:
  node scripts/create-gemini-speech.mjs --input "..." [options]
  node scripts/create-gemini-speech.mjs --payload-file payload.json

Options:
  --model             Default: gemini-2.5-flash-preview-tts
  --input             Text to speak
  --voice-name        Default: Kore
  --max-output-tokens Default: 2048
  --dry-run           Print request without sending
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

const model = String(args.model || 'gemini-2.5-flash-preview-tts');
const payload = readJsonInput(args, () => {
  requireValue(args, 'input', 'Missing --input or --payload-file.');

  return {
    contents: [
      {
        parts: [{ text: String(args.input) }]
      }
    ],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: String(args.voiceName || 'Kore')
          }
        }
      },
      maxOutputTokens: asNumber(args.maxOutputTokens, 2048)
    },
    model
  };
});

const response = await request({
  endpoint: `/v1beta/models/${encodeURIComponent(model)}:generateContent`,
  body: payload,
  args
});

console.log(JSON.stringify(response, null, 2));
