"use client";

import { deleteArticle } from "@/services/articles";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("本当にこの記事を削除しますか？")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteArticle(slug);
      if (result.success) {
        router.push("/articles");
        router.refresh();
      } else {
        alert("削除に失敗しました: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("エラーが発生しました");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded disabled:opacity-50"
    >
      {isDeleting ? "削除中..." : "削除"}
    </button>
  );
}
