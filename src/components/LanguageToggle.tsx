"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isKhmer = language === "kh";

  return (
    <button
      onClick={toggleLanguage}
      title={isKhmer ? "Switch to English" : "ប្តូរទៅខ្មែរ"}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200
        border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        hover:bg-gray-50 dark:hover:bg-gray-700
        text-gray-700 dark:text-gray-300
        shadow-sm"
    >
      {/* Track */}
      <span className="relative inline-flex w-10 h-5 rounded-full transition-colors duration-200"
        style={{ backgroundColor: isKhmer ? "#3b82f6" : "#d1d5db" }}>
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: isKhmer ? "translateX(20px)" : "translateX(0)" }}
        />
      </span>
      <span className="min-w-[2.5rem] text-center">
        {isKhmer ? "ខ្មែរ" : "EN"}
      </span>
    </button>
  );
}
