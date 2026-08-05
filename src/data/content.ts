export const categories = ['算法', '数学', 'LLM', '分布式系统'] as const;

export const categorySlugs = {
  算法: 'algorithms',
  数学: 'mathematics',
  LLM: 'llm',
  分布式系统: 'distributed-systems',
} as const;

export type Category = keyof typeof categorySlugs;
