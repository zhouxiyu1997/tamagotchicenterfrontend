"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBooks } from "../../services/books"; // 你需要实现这个服务

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">图书/说明书列表</h1>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id} className="border rounded p-4 hover:bg-gray-50">
            <Link href={`/books/${book.id}`}>
              {" "}
              <span>{book.id}</span>
              <span className="text-lg font-semibold text-green-700 hover:underline cursor-pointer">
                {book.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
