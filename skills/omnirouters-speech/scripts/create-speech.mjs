import {
  asBoolean,
  asNumber,
  parseArgs,
  readJsonInput,
  request,
  requireValue
} from './lib/client.mjs';

const usage = `Usage:
  node scripts/create-speech.mjs --input "..." [options]
  node scripts/create-speech.mjs --payload-file payload.json [--output out.mp3]

Options:
  --model          Default: seed-tts-1.0
  --voice          Default: zh_male_wennuanahu_moon_bigtts
  --input          Text to speak
  --response-format Default: mp3
  --speed          Default: 1
  --timestamps     Default: false
  --emotion        Optional emotion tag
  --volume-ratio   Optional volume multiplier
  --pitch-ratio    Optional pitch multiplier
  --output         Save binary output to this file path
  --dry-run        Print request without sending
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

const payload = readJsonInput(args, () => {
  requireValue(args, 'input', 'Missing --input or --payload-file.');

  const metadata = {};
  const doubaoTts = {};

  if (args.timestamps !== undefined) {
    doubaoTts.enable_timestamp = asBoolean(args.timestamps, false);
  }

  if (args.emotion !== undefined) {
    doubaoTts.emotion = String(args.emotion);
  }

  if (args.volumeRatio !== undefined) {
    doubaoTts.volume_ratio = asNumber(args.volumeRatio, 1);
  }

  if (args.pitchRatio !== undefined) {
    doubaoTts.pitch_ratio = asNumber(args.pitchRatio, 1);
  }

  if (Object.keys(doubaoTts).length) {
    metadata.doubao_tts = {
      enable_timestamp: doubaoTts.enable_timestamp ?? false,
      emotion: doubaoTts.emotion ?? 'neutral',
      volume_ratio: doubaoTts.volume_ratio ?? 1,
      pitch_ratio: doubaoTts.pitch_ratio ?? 1
    };
  }

  return {
    model: args.model || 'seed-tts-1.0',
    voice: args.voice || 'zh_male_wennuanahu_moon_bigtts',
    input: String(args.input),
    response_format: String(args.responseFormat || 'mp3'),
    speed: String(args.speed || '1'),
    ...(Object.keys(metadata).length ? { metadata } : {})
  };
});

const response = await request({
  endpoint: '/v1/audio/speech',
  body: payload,
  args,
  defaultBinaryFileName: `omnirouters-speech.${payload.response_format || 'mp3'}`
});

console.log(JSON.stringify(response, null, 2));
