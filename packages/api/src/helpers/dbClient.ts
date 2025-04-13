import { Context } from "hono";
import { createClient, Env } from "../db/client";

export const getDbClient = (c: Context<{ Bindings: Env }>) => {
  return createClient({
    DATABASE_URL: c.env.DATABASE_URL,
    APP_FRONTEND_URL: c.env.APP_FRONTEND_URL,
    NODE_ENV: c.env.NODE_ENV,
  });
};
