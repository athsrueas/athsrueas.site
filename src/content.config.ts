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

export const collections = { writing };