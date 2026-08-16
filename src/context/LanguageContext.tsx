"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "kh";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Persist preference
  useEffect(() => {
    const saved = localStorage.getItem("lesson-language") as Language | null;
    if (saved === "en" || saved === "kh") setLanguage(saved);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "kh" : "en";
      localStorage.setItem("lesson-language", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
