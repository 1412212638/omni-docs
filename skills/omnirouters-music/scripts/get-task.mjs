import { parseArgs, pollTask, request, requireValue } from './lib/client.mjs';

const usage = `Usage:
  node scripts/get-task.mjs --task-id <id>
  node scripts/get-task.mjs --task-id <id> --poll [--interval-seconds 5]
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

requireValue(args, 'taskId', 'Missing --task-id.');

if (args.poll) {
  const result = await pollTask({
    endpointBuilder: (id) => `/suno/fetch/${id}`,
    taskId: String(args.taskId),
    args
  });
  console.log(JSON.stringify(result, null, 2));
} else {
  const result = await request({
    method: 'GET',
    endpoint: `/suno/fetch/${String(args.taskId)}`,
    args
  });
  console.log(JSON.stringify(result, null, 2));
}
