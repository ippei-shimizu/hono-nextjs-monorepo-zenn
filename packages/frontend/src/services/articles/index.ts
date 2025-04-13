import { apiClient } from "@/lib/client";
import { Article } from "@api/schemas/article";

export async function getArticles(): Promise<{ success: boolean; data: Article[] }> {
  const response = await apiClient.api.articles.$get();
  return response.json();
}

export async function getArticle(slug: string): Promise<{ success: boolean; data?: Article }> {
  const response = await apiClient.api.articles[":slug"].$get({
    param: { slug },
  });
  return await response.json();
}

export async function deleteArticle(slug: string): Promise<{ success: boolean; data?: Article, message?: string }> {
  const response = await apiClient.api.articles[":slug"].$delete({
    param: { slug },
  });
  return await response.json();
}
