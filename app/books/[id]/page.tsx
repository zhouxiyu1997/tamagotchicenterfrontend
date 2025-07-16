"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBookById } from "../../../services/books";
import ReactMarkdown from "react-markdown";

export default function BookDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBookById(id)
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching book:", error);
          setBook(null);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>加载中...</div>;
  if (!book) return <div>未找到该书籍</div>;

  const pdfs = Array.isArray(book.pdf) ? book.pdf : [];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8">
      {/* 左侧 PDF 预览或下载 */}
      <div className="flex-1 border rounded p-2 bg-gray-50 min-h-[600px]">
        {pdfs.length > 0 ? (
          pdfs.map((pdf: any, idx: number) => (
            <div key={pdf.id || idx} className="mb-4">
              <a
                href={
                  pdf.url.startsWith("http")
                    ? pdf.url
                    : `http://localhost:1337${pdf.url}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                查看/下载 PDF: {pdf.name}
              </a>
            </div>
          ))
        ) : (
          <div>暂无 PDF 文件</div>
        )}
      </div>
      {/* 右侧翻译 */}
      <div className="flex-1 border rounded p-4 bg-white min-h-[600px]">
        {book.translation ? (
          <ReactMarkdown className="prose">{book.translation}</ReactMarkdown>
        ) : (
          <div className="text-gray-500">暂无翻译，仅显示 PDF</div>
        )}
        <div className="mt-4 text-sm text-gray-400">作者：{book.author}</div>
      </div>
    </div>
  );
}
