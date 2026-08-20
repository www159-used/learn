import { parse } from 'yaml';
import { z } from 'astro/zod';
import categoryYaml from './categories.yaml?raw';

const categoryDefinition = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

const categoryFile = z.array(categoryDefinition).min(1);

export const categoryDefinitions = categoryFile.parse(parse(categoryYaml));

export const categories = categoryDefinitions.map((category) => category.name);

export const categorySlugs = Object.fromEntries(
  categoryDefinitions.map((category) => [category.name, category.slug]),
);

export type Category = (typeof categories)[number];
