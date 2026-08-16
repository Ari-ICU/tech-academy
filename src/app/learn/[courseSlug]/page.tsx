import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getAllCourseSlugs } from "@/server/services/courses.service";
import { Lock, ArrowLeft, Play, ArrowRight, BookOpen, Layers, Sparkles } from "lucide-react";

export async function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return slugs.map((courseSlug) => ({ courseSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) return { title: "Course Not Found" };
  return { title: `${course.title} — DataSci AI` };
}

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);

  if (!course) {
    notFound();
  }

  // Handle locked/coming soon courses
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

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/learn"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            វគ្គសិក្សាផ្សេងទៀត
          </Link>
          <Link
            href="/learn/python"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium shadow-md shadow-blue-500/15"
          >
            <Play className="w-4 h-4 fill-white" />
            រៀន Python ឥឡូវនេះ
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);

  return (
    <div className="min-h-screen bg-gray-50/40 dark:bg-gray-950">
      {/* Course Header Banner */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 items-center">
              <li>
                <Link href="/learn" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-gray-900 dark:text-white font-semibold">
                {course.title}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black mb-3 text-gray-900 dark:text-white tracking-tight">
                {course.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Quick stats box */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-5 py-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">ម៉ូឌុលសរុប</div>
                <div className="text-2xl font-black text-blue-950 dark:text-blue-200">{course.modules.length} ម៉ូឌុល</div>
              </div>
              <div className="px-5 py-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">មេរៀនសរុប</div>
                <div className="text-2xl font-black text-emerald-950 dark:text-emerald-200">{totalLessons} មេរៀន</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Roadmap Grid */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              ផែនការសិក្សាតាមម៉ូឌុល (Modules Curriculum)
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              សូមចុចលើម៉ូឌុលណាមួយដើម្បីចូលមើលព័ត៌មានលម្អិត និងមេរៀនទាំងអស់ក្នុងម៉ូឌុលនោះ។
            </p>
          </div>
        </div>

        {course.modules.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {course.modules.map((mod, modIdx) => {
              const moduleUrl = `/learn/${courseSlug}/module/${mod.slug}`;
              return (
                <Link
                  key={mod.slug}
                  href={moduleUrl}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-200 overflow-hidden"
                >
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Milestone badge & Lesson counter */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-blue-500/20">
                          {String(modIdx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/50">
                          MILESTONE {modIdx + 1}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                        {mod.lessons.length} មេរៀន
                      </span>
                    </div>

                    {/* Module Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-4 leading-snug">
                      {mod.title}
                    </h3>

                    {/* Lesson Preview Tags */}
                    <div className="space-y-2 mb-6">
                      {mod.lessons.slice(0, 3).map((lesson, lIdx) => (
                        <div key={lesson.slug} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                          <span className="truncate">{lesson.title}</span>
                        </div>
                      ))}
                      {mod.lessons.length > 3 && (
                        <div className="text-xs text-gray-400 dark:text-gray-500 pl-3.5 font-medium">
                          + {mod.lessons.length - 3} មេរៀនបន្ថែមទៀត...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>ចូលរៀនម៉ូឌុលនេះ (Enter Module)</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <p className="text-yellow-800 dark:text-yellow-200">
              No lessons available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
