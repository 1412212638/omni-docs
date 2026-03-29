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
  node scripts/create-music.mjs --prompt "..." [options]
  node scripts/create-music.mjs --payload-file payload.json [--poll]

Options:
  --prompt                  Lyrics or custom prompt
  --mv                      Default: chirp-crow
  --title                   Optional title
  --tags                    Optional style tags
  --make-instrumental       Default: false
  --task-id                 Optional source task for continuation
  --continue-at             Optional continuation timestamp
  --continue-clip-id        Optional continuation clip ID
  --gpt-description-prompt  Inspiration mode prompt
  --notify-hook             Optional callback URL
  --poll                    Poll /suno/fetch/{task_id}
  --dry-run                 Print request without sending
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

const payload = readJsonInput(args, () => {
  if (args.prompt === undefined && args.gptDescriptionPrompt === undefined) {
    throw new Error('Missing --prompt, --gpt-description-prompt, or --payload-file.');
  }

  return {
    ...(args.prompt !== undefined ? { prompt: String(args.prompt) } : {}),
    mv: String(args.mv || 'chirp-crow'),
    ...(args.title ? { title: String(args.title) } : {}),
    ...(args.tags ? { tags: String(args.tags) } : {}),
    ...(args.makeInstrumental !== undefined
      ? { make_instrumental: asBoolean(args.makeInstrumental, false) }
      : {}),
    ...(args.taskId ? { task_id: String(args.taskId) } : {}),
    ...(args.continueAt ? { continue_at: String(args.continueAt) } : {}),
    ...(args.continueClipId ? { continue_clip_id: String(args.continueClipId) } : {}),
    ...(args.gptDescriptionPrompt
      ? { gpt_description_prompt: String(args.gptDescriptionPrompt) }
      : {}),
    ...(args.notifyHook ? { notify_hook: String(args.notifyHook) } : {})
  };
});

const response = await request({
  endpoint: '/suno/submit/music',
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
