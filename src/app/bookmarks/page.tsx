"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark } from "@/types";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bookmarks");
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load bookmarks:", e);
    }
  }, []);

  const removeBookmark = (lessonId: string) => {
    try {
      const updated = bookmarks.filter((b) => b.lessonId !== lessonId);
      setBookmarks(updated);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
    } catch (e) {
      alert("Failed to remove bookmark");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Bookmarks
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Your saved lessons for quick access.
      </p>
      {bookmarks.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No lessons bookmarked yet.
          </p>
          <Link
            href="/learn"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Browse courses to find lessons to bookmark →
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map((bm) => (
            <li
              key={bm.lessonId}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
            >
              <Link
                href={`/learn/${bm.courseSlug}/module/${bm.moduleSlug}/lesson/${bm.lessonSlug}`}
                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              >
                {bm.title}
              </Link>
              <button
                onClick={() => removeBookmark(bm.lessonId)}
                className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-4 shrink-0"
                aria-label={`Remove bookmark for ${bm.title}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
