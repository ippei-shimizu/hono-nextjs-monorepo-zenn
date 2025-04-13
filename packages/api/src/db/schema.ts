import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

// 記事テーブル
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const schema = { articles };

// 型定義をエクスポート（フロントエンドと共有するため）
export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
