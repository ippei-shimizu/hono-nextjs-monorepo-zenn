import { apiClient } from "@/lib/client";
import { Article } from "@api/schemas/article";

export async function getArticles(): Promise<{ success: boolean; data: Article[] }> {
  const response = await apiClient.api.articles.$get();
  return response.json();
}
