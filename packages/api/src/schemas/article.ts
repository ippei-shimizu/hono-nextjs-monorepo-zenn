import { z } from "zod";

export const articleSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(255, "タイトルは255文字以内で入力してください"),
  content: z.string().min(1, "内容は必須です"),
  slug: z
    .string()
    .min(1, "スラッグは必須です")
    .max(255, "スラッグは255文字以内で入力してください")
    .regex(/^[a-z0-9-]+$/, "スラッグは小文字英数字とハイフンのみ使用できます"),
  createdAt: z
    .union([
      z.preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val),
        z.date(),
      ),
      z.string(),
    ])
    .optional(),
  updatedAt: z
    .union([
      z.preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val),
        z.date(),
      ),
      z.string(),
    ])
    .optional(),
});

export const createArticleSchema = articleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateArticleSchema = articleSchema
  .partial()
  .omit({ id: true, createdAt: true, updatedAt: true });

export type Article = z.infer<typeof articleSchema>;
export type CreateArticle = z.infer<typeof createArticleSchema>;
export type UpdateArticle = z.infer<typeof updateArticleSchema>;
