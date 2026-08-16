import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCourse,
  getAllCourseSlugs,
  getCourse as getCourseData,
} from "@/server/services/courses.service";
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Play,
  CheckCircle2,
  Clock,
  Layers,
  Lock,
} from "lucide-react";

type PageParams = {
  courseSlug: string;
  moduleSlug: string;
};

export async function generateStaticParams() {
  const paths: PageParams[] = [];
  for (const courseSlug of getAllCourseSlugs()) {
    const course = getCourseData(courseSlug);
    if (!course) continue;
    for (const mod of course.modules) {
      paths.push({
        courseSlug,
        moduleSlug: mod.slug,
      });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { courseSlug, moduleSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) return { title: "Course Not Found" };

  const currentModule = course.modules.find((m) => m.slug === moduleSlug);
  if (!currentModule) return { title: "Module Not Found" };

  return {
    title: `${currentModule.title} — ${course.title} | DataSci AI`,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { courseSlug, moduleSlug } = await params;
  const course = getCourse(courseSlug);

  if (!course) notFound();

  // If the course is locked (non-python), display the Coming Soon screen
  if (courseSlug !== "python") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 border border-amber-500/20 shadow-sm animate-pulse">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-gray-900 dark:text-white tracking-tight">
          {course.title}
        </h1>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-6">
          ជិតមកដល់ • Coming Soon
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-10 text-sm sm:text-base leading-relaxed">
          វគ្គសិក្សានេះកំពុងត្រូវបានរៀបចំឡើងយ៉ាងយកចិត្តទុកដាក់។ សូមត្រឡប់មកពិនិត្យឡើងវិញនៅពេលក្រោយ ឬចាប់ផ្តើមសិក្សាវគ្គ Python ជាមុនសិន។
        </p>
        <Link
          href="/learn/python"
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium shadow-md shadow-blue-500/15"
        >
          <Play className="w-4 h-4 fill-white" />
          រៀន Python ឥឡូវនេះ
        </Link>
      </div>
    );
  }

  const moduleIndex = course.modules.findIndex((m) => m.slug === moduleSlug);
  if (moduleIndex === -1) notFound();

  const currentModule = course.modules[moduleIndex];
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex < course.modules.length - 1
      ? course.modules[moduleIndex + 1]
      : null;

  const firstLesson =
    currentModule.lessons.length > 0 ? currentModule.lessons[0] : null;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
      {/* Top Header Banner */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/learn"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link
                  href={`/learn/${courseSlug}`}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
                >
                  {course.title}
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <span className="text-blue-600 dark:text-blue-400 font-semibold truncate max-w-[280px] inline-block align-bottom">
                  {currentModule.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Module Path Milestone Indicator */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
              {String(moduleIndex + 1).padStart(2, "0")}
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
              <Layers className="w-3.5 h-3.5" />
              PATH MILESTONE {moduleIndex + 1} OF {course.modules.length}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 leading-tight">
            {currentModule.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pt-2">
            <div className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>{currentModule.lessons.length} មេរៀនអនុវត្តជាក់ស្តែង</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>ឥតគិតថ្លៃ ១០០%</span>
            </div>
          </div>

          {firstLesson && (
            <div className="mt-8">
              <Link
                href={`/learn/${courseSlug}/module/${moduleSlug}/lesson/${firstLesson.slug}`}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-white" />
                ចាប់ផ្តើមរៀនមេរៀនដំបូង ({firstLesson.title})
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          បញ្ជីមេរៀនក្នុងម៉ូឌុលនេះ (Lessons Roadmap)
        </h2>

        {/* Lessons List */}
        <div className="grid gap-3.5">
          {currentModule.lessons.map((lesson, idx) => (
            <Link
              key={lesson.slug}
              href={`/learn/${courseSlug}/module/${moduleSlug}/lesson/${lesson.slug}`}
              className="group flex items-start justify-between gap-4 p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-blue-100 dark:border-blue-900/50">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base sm:text-lg leading-snug">
                    {lesson.title}
                  </h3>
                  {lesson.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Module Navigation Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
          {prevModule ? (
            <Link
              href={`/learn/${courseSlug}/module/${prevModule.slug}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              ម៉ូឌុលមុន: {prevModule.title}
            </Link>
          ) : (
            <div />
          )}

          {nextModule ? (
            <Link
              href={`/learn/${courseSlug}/module/${nextModule.slug}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium shadow-md shadow-blue-500/15"
            >
              ម៉ូឌុលបន្ទាប់: {nextModule.title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
