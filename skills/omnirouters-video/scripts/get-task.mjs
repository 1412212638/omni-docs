import { parseArgs, pollTask, request, requireValue } from './lib/client.mjs';

const usage = `Usage:
  node scripts/get-task.mjs --task-id <id> [--route standard|remix]
  node scripts/get-task.mjs --task-id <id> --poll [--interval-seconds 5]
`;

const args = parseArgs();

if (args.help) {
  console.log(usage);
  process.exit(0);
}

requireValue(args, 'taskId', 'Missing --task-id.');

const endpointBuilder = (id) =>
  args.route === 'remix' ? `/v1/video/generations/${id}` : `/v1/videos/${id}`;

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
