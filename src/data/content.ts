export function isIdea(id: string) {
  return id === 'ideas' || id.startsWith('ideas/');
}

const SERIES_NOTE = /(?:^|\/)(\d+)-[^/]+$/;

/** 专栏篇序来自文件名：`01-红烧肉.md` → 1 */
export function seriesOrder(id: string): number {
  const match = SERIES_NOTE.exec(id);
  return match ? Number(match[1]) : 0;
}

export function seriesOrderLabel(id: string): string {
  const match = SERIES_NOTE.exec(id);
  return match ? match[1].padStart(2, '0') : '';
}

/** 首页 idea 预览：去图/代码/标记后截断，完整内容进详情页再渲染。 */
export function ideaExcerpt(body: string | undefined, maxLen = 140): string {
  if (!body) return '';

  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<center>[\s\S]*?<\/center>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+\[[ xX]\]\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).replace(/\s+\S*$/, '').trimEnd()}…`;
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
