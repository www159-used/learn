import { mkdir, readdir } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const sourceDir = resolve('assets/diagrams');
const outputDir = resolve('public/assets');
const drawio = process.env.DRAWIO_BIN ?? 'drawio';

async function collectDrawioFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return collectDrawioFiles(path);
      return entry.name.endsWith('.drawio') ? [path] : [];
    }),
  );
  return files.flat();
}

const sources = await collectDrawioFiles(sourceDir);

for (const source of sources) {
  const output = resolve(
    outputDir,
    relative(sourceDir, source).replace(/\.drawio$/, '.svg'),
  );
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

  if (result.status !== 0) process.exit(result.status ?? 1);
}
