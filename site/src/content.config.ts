import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    role: z.string(),
    period: z.string(),
    summary: z.string(),
    industry: z.string(),
    outcomes: z.array(z.object({ value: z.string(), label: z.string() })),
    stack: z.array(z.string()),
    tracks: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(50),
    verify: z.array(z.string()).default([]),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    track: z.enum(['executive', 'agentic', 'platform', 'leadership']),
    tags: z.array(z.string()).default([]),
    linkedin: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const architecture = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/architecture' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['reference-architecture', 'playbook', 'adr', 'framework', 'methodology']),
    summary: z.string(),
    status: z.string().default('Adopted'),
    order: z.number().default(50),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    designation: z.string(),
    relationship: z.string(),
    approved: z.boolean().default(false),
    source: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const collections = { caseStudies, insights, architecture, testimonials };
