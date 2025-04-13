import { AppType } from "@api/index";
import { hc } from "hono/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export const apiClient = hc<AppType>(API_BASE_URL);
