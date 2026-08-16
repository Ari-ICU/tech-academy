"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "@/types";

const MAX_BOOKMARKS = 100;

export function useBookmarks() {
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

  const addBookmark = (bookmark: Omit<Bookmark, "addedAt">) => {
    try {
      if (bookmarks.length >= MAX_BOOKMARKS) {
        throw new Error("Maximum bookmarks reached");
      }
      const newBookmark: Bookmark = {
        ...bookmark,
        addedAt: new Date().toISOString(),
      };
      const updated = [...bookmarks, newBookmark];
      setBookmarks(updated);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return true;
    } catch (e) {
      alert("Failed to save bookmark");
      return false;
    }
  };

  const removeBookmark = (lessonId: string) => {
    try {
      const updated = bookmarks.filter((b) => b.lessonId !== lessonId);
      setBookmarks(updated);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return true;
    } catch (e) {
      alert("Failed to remove bookmark");
      return false;
    }
  };

  const isBookmarked = (lessonId: string) => {
    return bookmarks.some((b) => b.lessonId === lessonId);
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}
