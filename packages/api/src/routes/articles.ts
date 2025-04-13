import { Hono } from "hono";
import { Env } from "../db/client";
import { getDbClient } from "../helpers/dbClient";
import { articles } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createArticleSchema, updateArticleSchema } from "../schemas/article";

export const articlesRoutes = new Hono<{ Bindings: Env }>()
  // 記事一覧取得
  .get("/articles", async (c) => {
    const db = getDbClient(c);
    const allArticles = await db.select().from(articles);

    return c.json({
      success: true,
      data: allArticles,
    });
  })

  // 記事詳細取得
  .get("/articles/:slug", async (c) => {
    const db = getDbClient(c);
    const slug = c.req.param("slug");
    const article = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);

    if (!article.length) {
      return c.json(
        {
          success: false,
          message: "記事が見つかりません",
        },
        404,
      );
    }

    return c.json({
      success: true,
      data: article[0],
    });
  })

  // 記事作成
  .post("/articles", zValidator("json", createArticleSchema), async (c) => {
    const articleData = c.req.valid("json");
    const db = getDbClient(c);

    // スラッグが既に存在するか確認
    const existingArticle = await db
      .select({ id: articles.id })
      .from(articles)
      .where(eq(articles.slug, articleData.slug))
      .limit(1);

    if (existingArticle.length) {
      return c.json(
        {
          success: false,
          message: "このスラッグは既に使用されています",
        },
        400,
      );
    }

    const newArticle = await db
      .insert(articles)
      .values(articleData)
      .returning();

    return c.json({
      success: true,
      data: newArticle[0],
    });
  })

  // 記事更新
  .put(
    "/articles/:slug",
    zValidator("json", updateArticleSchema),
    async (c) => {
      const articleData = c.req.valid("json");
      const slug = c.req.param("slug");
      const db = getDbClient(c);

      // 更新対象の記事が存在するか確認
      const existingArticle = await db
        .select({ id: articles.id })
        .from(articles)
        .where(eq(articles.slug, slug))
        .limit(1);

      if (!existingArticle.length) {
        return c.json(
          {
            success: false,
            message: "記事が見つかりません",
          },
          404,
        );
      }

      // スラッグが変更される場合、新しいスラッグが既に使用されていないか確認
      if (articleData.slug && articleData.slug !== slug) {
        const duplicateSlug = await db
          .select({ id: articles.id })
          .from(articles)
          .where(eq(articles.slug, articleData.slug))
          .limit(1);

        if (duplicateSlug.length) {
          return c.json(
            {
              success: false,
              message: "このスラッグは既に使用されています",
            },
            400,
          );
        }
      }

      const updatedArticle = await db
        .update(articles)
        .set({ ...articleData, updatedAt: new Date() })
        .where(eq(articles.slug, slug))
        .returning();

      return c.json({
        success: true,
        data: updatedArticle[0],
      });
    },
  )

  // 記事削除
  .delete("/articles/:slug", async (c) => {
    const slug = c.req.param("slug");
    const db = getDbClient(c);

    const deletedArticle = await db
      .delete(articles)
      .where(eq(articles.slug, slug))
      .returning();

    if (!deletedArticle.length) {
      return c.json(
        {
          success: false,
          message: "記事が見つかりません",
        },
        404,
      );
    }

    return c.json({
      success: true,
      data: deletedArticle[0],
    });
  });
