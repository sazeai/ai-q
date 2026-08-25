import { defineCollection, z } from "astro:content"

const sourceSchema = z.object({
  title: z.string(),
  url: z.string(),
  type: z.enum(["source", "via", "docs", "paper", "reference"]).default("source"),
})

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    author: z.string().default("AI-Q Team"),
    canonicalUrl: z.string().url().optional(),
    sources: z.array(sourceSchema).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    draft: z.boolean().optional(),
  }),
})

const aiModels = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    author: z.string().default("AI-Q Team"),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    sources: z.array(sourceSchema).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    draft: z.boolean().optional(),
  }),
})

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { blog, "ai-models": aiModels, work, legal }
