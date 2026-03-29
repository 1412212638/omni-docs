import { parseArgs, pollTask, request, requireValue } from './lib/client.mjs';

const usage = `Usage:
  node scripts/get-task.mjs --task-id <id> --family video-standard|video-remix|music
  node scripts/get-task.mjs --task-id <id> --family video-standard --poll
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

requireValue(args, 'taskId', 'Missing --task-id.');
requireValue(args, 'family', 'Missing --family. Use video-standard, video-remix, or music.');

function endpointBuilder(id) {
  switch (args.family) {
    case 'video-remix':
      return `/v1/video/generations/${id}`;
    case 'music':
      return `/suno/fetch/${id}`;
    case 'video-standard':
    default:
      return `/v1/videos/generations/${id}`;
  }
}

if (args.poll) {
  const result = await pollTask({
    endpointBuilder,
    taskId: String(args.taskId),
    args
  });
  console.log(JSON.stringify(result, null, 2));
} else {
  const result = await request({
    method: 'GET',
    endpoint: endpointBuilder(String(args.taskId)),
    args
  });
  console.log(JSON.stringify(result, null, 2));
}
