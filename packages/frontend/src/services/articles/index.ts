import { apiClient } from "@/lib/client";
import { Article, CreateArticle, UpdateArticle } from "@api/schemas/article";

export async function getArticles(): Promise<{
  success: boolean;
  data: Article[];
}> {
  const response = await apiClient.api.articles.$get();
  return response.json();
}

export async function getArticle(
  slug: string,
): Promise<{ success: boolean; data?: Article; message?: string }> {
  const response = await apiClient.api.articles[":slug"].$get({
    param: { slug },
  });
  return await response.json();
}

export async function createArticle(
  data: CreateArticle,
): Promise<
  | { success: boolean; message: string }
  | { success: boolean; data: Article; message?: string }
> {
  const response = await apiClient.api.articles.$post({
    json: data,
  });
  return await response.json();
}

export async function updateArticle(
  slug: string,
  data: UpdateArticle,
): Promise<
  | { success: boolean; message: string }
  | { success: boolean; data: Article; message?: string }
> {
  const response = await apiClient.api.articles[":slug"].$put({
    param: { slug },
    json: data,
  });
  return await response.json();
}

export async function deleteArticle(
  slug: string,
): Promise<{ success: boolean; data?: Article; message?: string }> {
  const response = await apiClient.api.articles[":slug"].$delete({
    param: { slug },
  });
  return await response.json();
}
