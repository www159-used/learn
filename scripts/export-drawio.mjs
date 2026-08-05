import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const source = resolve('assets/diagrams/self-attention-kqv.drawio');
const output = resolve('public/assets/self-attention-kqv.svg');
const drawio = process.env.DRAWIO_BIN ?? 'drawio';

await mkdir(dirname(output), { recursive: true });

const result = spawnSync(drawio, [
  '--export',
  '--format',
  'svg',
  '--theme',
  'light',
  '--output',
  output,
  source,
], {
  stdio: 'inherit',
});

if (result.error) {
  console.error(
    `无法运行 ${drawio}。请把 draw.io CLI 加入 PATH，或设置 DRAWIO_BIN 为可执行文件路径。`,
  );
  process.exit(1);
}

process.exit(result.status ?? 1);
