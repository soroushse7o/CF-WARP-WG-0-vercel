import worker from '../../src/index.js';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function handle(request) {
  return worker.fetch(request);
}

export const GET = handle;
export const HEAD = handle;
export const POST = handle;
