"use client";

import { useState } from "react";
import { List, X } from "lucide-react";
import { LessonSidebar } from "./LessonSidebar";
import { Module, Lesson } from "@/types";

interface MobileLessonDrawerProps {
  courseSlug: string;
  modules: Module[];
  activeLesson: Lesson;
}

export function MobileLessonDrawer({ courseSlug, modules, activeLesson }: MobileLessonDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-3.5 bg-blue-600 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
        aria-label="Open course menu"
      >
        <List className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-72 bg-white dark:bg-gray-950 shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-bold text-gray-900 dark:text-white">បញ្ជីមេរៀន (Course Menu)</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 h-[calc(100vh-4rem)] overflow-y-auto">
          <LessonSidebar
            courseSlug={courseSlug}
            modules={modules}
            activeLesson={activeLesson}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
}
