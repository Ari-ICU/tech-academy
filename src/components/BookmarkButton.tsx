"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";

interface BookmarkButtonProps {
  lessonId: string;
  title: string;
  courseSlug: string;
  moduleSlug: string;
  lessonSlug: string;
}

export function BookmarkButton({
  lessonId,
  title,
  courseSlug,
  moduleSlug,
  lessonSlug,
}: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(lessonId);

  const toggle = () => {
    if (bookmarked) {
      removeBookmark(lessonId);
    } else {
      addBookmark({ lessonId, title, courseSlug, moduleSlug, lessonSlug });
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={bookmarked ? "លុបសំណាក់" : "រក្សាទុក"}
      title={bookmarked ? "លុបសំណាក់" : "រក្សាទុក"}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
    >
      {bookmarked ? (
        <BookmarkCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      ) : (
        <Bookmark className="w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
      )}
    </button>
  );
}
