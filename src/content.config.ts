import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    oldPath: z.string(),
    order: z.number(),
    updatedDate: z.string().optional(),
  }),
});

const software = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/software" }),
  schema: z.object({
    title: z.string().min(1).max(200),
    summary: z.string().min(1).max(600),
    description: z.string().min(1).max(30000),
    status: z.enum(["planned", "prototype", "active", "archived"]),
    stack: z.array(z.string().min(1).max(60)).max(20),
    featured: z.boolean(),
    repository: z.union([z.literal(""), z.url({ protocol: /^https$/ })]),
    website: z.union([z.literal(""), z.url({ protocol: /^https$/ })]),
    demo: z.object({
      enabled: z.boolean(),
      title: z.string().min(1).max(200),
      html: z.string().max(200000),
      css: z.string().max(200000),
      js: z.string().max(200000),
    }),
  }),
});

export const collections = { writing, software };
