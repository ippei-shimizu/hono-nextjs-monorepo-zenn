import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env } from "./db/client";
import { articlesRoutes } from "./routes/articles";

const app = new Hono<{ Bindings: Env }>()
  .use(
    "/*",
    cors({
      origin: (origin, c) => {
        return c.env.APP_FRONTEND_URL || "http://localhost:3000";
      },
      allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
      maxAge: 864_000,
      credentials: true,
    }),
  )
  // APIルート登録
  .route("/api/", articlesRoutes);

export default app;
export type AppType = typeof app;
