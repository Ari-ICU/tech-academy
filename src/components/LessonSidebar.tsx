"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Module, Lesson } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";

interface LessonSidebarProps {
  courseSlug: string;
  modules: Module[];
  activeLesson: Lesson;
  className?: string;
}

export function LessonSidebar({
  courseSlug,
  modules,
  activeLesson,
  className = "w-60",
}: LessonSidebarProps) {
  const { isBookmarked } = useBookmarks();
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      const activeEl = sidebarRef.current.querySelector('[aria-current="page"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeLesson.slug, activeLesson.moduleSlug]);

  return (
    <aside ref={sidebarRef} className={`shrink-0 ${className}`}>
      <nav aria-label="Course navigation">
        {modules.map((mod) => (
          <div key={mod.slug} className="mb-6">
            {/* Module header */}
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-950 dark:text-gray-200 mb-2 px-2">
              {mod.title}
            </h3>

            <ul className="space-y-0.5">
              {mod.lessons.map((lesson, index) => {
                const isActive =
                  lesson.slug === activeLesson.slug &&
                  lesson.moduleSlug === activeLesson.moduleSlug;
                const bookmarked = isBookmarked(
                  `${courseSlug}/${lesson.moduleSlug}/${lesson.slug}`
                );

                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/learn/${courseSlug}/module/${lesson.moduleSlug}/lesson/${lesson.slug}`}
                      className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/25 text-blue-700 dark:text-blue-300 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {/* Lesson number dot */}
                      <span
                        className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
                        }`}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </span>

                      <span className="flex-1 leading-snug line-clamp-2">{lesson.title}</span>

                      {bookmarked && (
                        <svg
                          className="w-3 h-3 text-blue-500 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-label="Bookmarked"
                        >
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
