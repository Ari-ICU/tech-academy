"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  objectives: string[];
}

export function TableOfContents({ objectives }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const sections: TocItem[] = [
    { id: "what-youll-learn",      label: "🎯 What You'll Learn" },
    { id: "overview",              label: "🌍 Overview" },
    { id: "the-core-idea",         label: "💡 The Core Idea" },
    { id: "in-depth",              label: "📖 In Depth" },
    { id: "the-math",              label: "🔢 The Math" },
    { id: "diagram",               label: "📊 Diagram" },
    { id: "code",                  label: "💻 Code" },
    { id: "real-world-example",    label: "🌐 Real-world Example" },
    { id: "watch-out-for",         label: "⚠️ Watch Out For" },
    { id: "common-misconceptions", label: "❌ Common Misconceptions" },
    { id: "practice",              label: "✏️ Practice" },
    { id: "key-takeaways",         label: "✅ Key Takeaways" },
    { id: "quiz",                  label: "🧠 Quiz" },
  ];

  const [visibleSections, setVisibleSections] = useState<TocItem[]>([]);

  useEffect(() => {
    const present = sections.filter((s) => document.getElementById(s.id));
    setVisibleSections(present);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleSections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (visibleSections.length === 0) return null;

  return (
    <aside className="w-52 shrink-0">
      <div className="sticky top-20">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 px-1">
          On this page
        </p>
        <nav aria-label="Table of contents">
          {/* Left border track */}
          <div className="relative border-l-2 border-gray-100 dark:border-gray-800">
            <ul className="space-y-0.5">
              {visibleSections.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleClick(item.id)}
                      className={`relative -left-px text-left w-full text-xs py-1.5 pl-3 pr-2 border-l-2 transition-all duration-150 rounded-r-md ${
                        isActive
                          ? "border-blue-500 text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
