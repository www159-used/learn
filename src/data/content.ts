export function isIdea(id: string) {
  return id === 'ideas' || id.startsWith('ideas/');
}

export type BoardItem = {
  title: string;
  remark?: string;
  href?: string;
  date: Date;
};

/** 正文独占一行：`todo: 可选备注`。标题取最近标题，没有则用文章名。 */
export function collectTodos(
  notes: { id: string; body?: string; data: { title: string; date: Date } }[],
): BoardItem[] {
  const items: BoardItem[] = [];

  for (const note of notes) {
    let lastHeading = '';
    let inCode = false;

    for (const line of (note.body ?? '').split('\n')) {
      if (line.trim().startsWith('```')) {
        inCode = !inCode;
        continue;
      }
      if (inCode) continue;

      const heading = /^#{1,6}\s+(.+)/.exec(line);
      if (heading) {
        lastHeading = heading[1].trim();
        continue;
      }

      const match = /^\s*todo:\s*(.*)$/i.exec(line);
      if (!match) continue;

      const remark = match[1].trim() || undefined;
      items.push({
        title: lastHeading || note.data.title,
        remark,
        href: `/notes/${note.id}/`,
        date: note.data.date,
      });
    }
  }

  return items.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export const categories = ['算法', '数学', 'LLM', '分布式系统'] as const;

export const categorySlugs = {
  算法: 'algorithms',
  数学: 'mathematics',
  LLM: 'llm',
  分布式系统: 'distributed-systems',
} as const;

export type Category = keyof typeof categorySlugs;
