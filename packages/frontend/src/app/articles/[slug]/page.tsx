import DeleteButton from "@/app/articles/_components/DeleteButton";
import { getArticle } from "@/services/articles";
import Link from "next/link";

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { success, data: article } = await getArticle((await params).slug);

  if (!success || !article) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          記事が見つかりませんでした。
        </div>
        <div className="mt-4">
          <Link href="/articles" className="text-blue-500 hover:underline">
            記事一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <article className="prose lg:prose-xl max-w-none">
        <h1>{article.title}</h1>
        <div className="text-gray-500 text-sm mb-6">
          作成日:{" "}
          {article.createdAt
            ? new Date(article.createdAt).toLocaleDateString()
            : "不明"}
          {article.updatedAt !== article.createdAt &&
            ` • 更新日: ${article.updatedAt ? new Date(article.updatedAt).toLocaleDateString() : "不明"}`}
        </div>

        <div className="whitespace-pre-wrap">{article.content}</div>
      </article>

      <div className="mt-8 flex gap-2">
        <Link
          href="/articles"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          一覧に戻る
        </Link>
        <Link
          href={`/articles/${article.slug}/edit`}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          編集
        </Link>
        <DeleteButton slug={article.slug} />
      </div>
    </div>
  );
}
