import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { categories } from './data/categories';

const category = z.string().refine((value) => categories.includes(value), {
  message: '分类必须存在于 src/data/categories.yaml',
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: category.optional(),
    series: z.string().optional(),
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
