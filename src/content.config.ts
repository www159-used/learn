import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = ['算法', '数学', 'LLM', '分布式系统'] as const;

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(categories).optional(),
    series: z.string().optional(),
    seriesOrder: z.number().int().nonnegative().optional(),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './series' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { notes, series };
