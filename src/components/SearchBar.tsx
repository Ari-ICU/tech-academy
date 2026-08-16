"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchResult {
  type: "lesson";
  title: string;
  url: string;
  description?: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        // Detect if running on GitHub Pages subpath (/tech-academy) or local development
        const isSubpath = typeof window !== "undefined" && window.location.pathname.startsWith("/tech-academy");
        const indexUrl = isSubpath ? "/tech-academy/search-index.json" : "/search-index.json";

        const res = await fetch(indexUrl);
        if (res.ok) {
          const allLessons: SearchResult[] = await res.json();
          const q = query.toLowerCase();
          const filtered = allLessons.filter(
            (item) =>
              item.title.toLowerCase().includes(q) ||
              (item.description && item.description.toLowerCase().includes(q))
          );
          setResults(filtered.slice(0, 20));
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Failed to perform client-side search:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-64">
      <input
        type="search"
        placeholder="ស្វែងរកមេរៀន..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 2 && setIsOpen(true)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.map((result, idx) => (
            <Link
              key={idx}
              href={result.url}
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
              className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {result.title}
              </div>
              {result.description && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {result.description}
                </div>
              )}
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                មេរៀន
              </div>
            </Link>
          ))}
        </div>
      )}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
          <p className="text-gray-600 dark:text-gray-400">រកមិនឃើញ</p>
        </div>
      )}
    </div>
  );
}
