

import { getArticles } from "@/services/articles";
import Link from "next/link";

export default async function Home() {
  const { data: articles } = await getArticles();

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">記事一覧</h1>
        <Link
          href="/articles/new"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          新規作成
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500">記事がありません。新しい記事を作成してください。</p>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <div key={article.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-2">{article.content}</p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  詳細を見る
                </Link>
                <Link
                  href={`/articles/${article.slug}/edit`}
                  className="text-green-500 hover:underline"
                >
                  編集
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
