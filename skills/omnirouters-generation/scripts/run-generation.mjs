import {
  asBoolean,
  asList,
  asNumber,
  encodeInlineFile,
  extractTaskId,
  guessMimeType,
  parseArgs,
  pollTask,
  readJsonInput,
  request,
  requireValue
} from './lib/client.mjs';

const usage = `Usage:
  node scripts/run-generation.mjs --media video --prompt "..." [options]
  node scripts/run-generation.mjs --media image --prompt "..." [options]
  node scripts/run-generation.mjs --media speech --input "..." [options]
  node scripts/run-generation.mjs --payload-file payload.json --endpoint /v1/images/generations

Options:
  --media      video | image | speech
  --mode       video: standard|remix; image: standard|gemini; speech: standard|gemini
  --poll       Poll async task routes for video jobs
  --dry-run    Print request without sending
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

function buildVideoRequest() {
  const mode = String(args.mode || 'standard');

  if (mode === 'remix') {
    return {
      endpoint: '/v1/video/generations',
      body: readJsonInput(args, () => {
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
      }),
      pollEndpoint: (id) => `/v1/video/generations/${id}`
    };
  }

  return {
    endpoint: '/v1/videos',
    body: readJsonInput(args, () => {
      requireValue(args, 'prompt', 'Missing --prompt or --payload-file.');
      const imageList = asList(args.images);

      if (args.image) {
        imageList.unshift(String(args.image));
      }

      return {
        model: args.model || 'Vidu-q2-turbo-720p',
        seconds: String(asNumber(args.seconds ?? args.duration, 5)),
        prompt: String(args.prompt),
        ...(imageList.length === 1 ? { image: imageList[0] } : {}),
        ...(imageList.length > 1 ? { images: imageList } : {}),
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
    }),
    pollEndpoint: (id) => `/v1/videos/${id}`
  };
}

function buildImageRequest() {
  const mode = String(args.mode || 'standard');

  if (mode === 'gemini') {
    const model = String(args.model || 'gemini-2.5-flash-image');
    return {
      endpoint: `/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      body: readJsonInput(args, () => {
        requireValue(args, 'prompt', 'Missing --prompt or --payload-file.');
        const parts = [{ text: String(args.prompt) }];

        for (const filePath of asList(args.inlineFile)) {
          parts.push(
            encodeInlineFile(filePath, args.mimeType || guessMimeType(filePath, 'image/png'))
          );
        }

        return {
          contents: [{ role: 'user', parts }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
            maxOutputTokens: asNumber(args.maxOutputTokens, 8192)
          }
        };
      })
    };
  }

  return {
    endpoint: '/v1/images/generations',
    body: readJsonInput(args, () => {
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
    })
  };
}

function buildSpeechRequest() {
  const mode = String(args.mode || 'standard');

  if (mode === 'gemini') {
    const model = String(args.model || 'gemini-2.5-flash-preview-tts');
    return {
      endpoint: `/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      body: readJsonInput(args, () => {
        requireValue(args, 'input', 'Missing --input or --payload-file.');

        return {
          contents: [{ parts: [{ text: String(args.input) }] }],
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
      })
    };
  }

  return {
    endpoint: '/v1/audio/speech',
    body: readJsonInput(args, () => {
      requireValue(args, 'input', 'Missing --input or --payload-file.');

      return {
        model: args.model || 'seed-tts-1.0',
        voice: args.voice || 'zh_male_wennuanahu_moon_bigtts',
        input: String(args.input),
        response_format: String(args.responseFormat || 'mp3'),
        speed: asNumber(args.speed, 1)
      };
    }),
    defaultBinaryFileName: `omnirouters-speech.${args.responseFormat || 'mp3'}`
  };
}

let config;

switch (args.media) {
  case 'video':
    config = buildVideoRequest();
    break;
  case 'image':
    config = buildImageRequest();
    break;
  case 'speech':
    config = buildSpeechRequest();
    break;
  default:
    if (!args.payloadFile || !args.endpoint) {
      throw new Error('Pass --media video|image|speech, or use --payload-file with --endpoint.');
    }
    config = {
      endpoint: String(args.endpoint),
      body: readJsonInput(args, () => {
        throw new Error('Unreachable');
      })
    };
}

const response = await request({
  endpoint: config.endpoint,
  body: config.body,
  args,
  defaultBinaryFileName: config.defaultBinaryFileName
});

console.log(JSON.stringify(response, null, 2));

if (asBoolean(args.poll, false) && config.pollEndpoint) {
  const taskId = args.taskId || extractTaskId(response);

  if (!taskId) {
    throw new Error('Polling requested but no task ID was found in the response.');
  }

  const result = await pollTask({
    endpointBuilder: config.pollEndpoint,
    taskId,
    args
  });

  console.log(JSON.stringify(result, null, 2));
}
