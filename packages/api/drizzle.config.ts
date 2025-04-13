import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

try {
  dotenv.config({ path: "./.dev.vars" });
} catch (error) {
  console.log("No .dev.vars file found");
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
