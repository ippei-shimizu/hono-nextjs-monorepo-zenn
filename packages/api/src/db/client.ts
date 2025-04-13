import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export interface Env {
  DATABASE_URL: string;
  APP_FRONTEND_URL: string;
  NODE_ENV: string;
}

export function createClient(env: Env) {
  const connectionString = env.DATABASE_URL;

  const client = postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
  });

  return drizzle(client);
}
