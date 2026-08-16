import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getAllCourseSlugs } from "@/server/services/courses.service";
import { Lock, ArrowLeft, Play } from "lucide-react";

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
        {/* Animated Lock Icon */}
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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <Link href="/learn" className="hover:underline">
              Courses
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 dark:text-white font-medium">
            {course.title}
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-gray-900 dark:text-white tracking-tight">
        {course.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10 text-base sm:text-lg max-w-3xl leading-relaxed">
        {course.description}
      </p>

      {course.modules.length > 0 ? (
        <div className="space-y-6">
          {course.modules.map((mod, modIdx) => (
            <div
              key={mod.slug}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-7 bg-white dark:bg-gray-900 shadow-sm"
            >
              {/* Module Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 dark:border-gray-800 gap-2 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm border border-blue-100 dark:border-blue-900 shrink-0">
                    {String(modIdx + 1).padStart(2, "0")}
                  </div>
                  <Link
                    href={`/learn/${courseSlug}/module/${mod.slug}`}
                    className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-tight"
                  >
                    {mod.title}
                  </Link>
                </div>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-12 sm:pl-0">
                  {mod.lessons.length} មេរៀន
                </span>
              </div>

              {/* Lessons Grid / List */}
              <div className="grid gap-3">
                {mod.lessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/learn/${courseSlug}/module/${mod.slug}/lesson/${lesson.slug}`}
                    className="group flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 hover:border-blue-300 dark:hover:border-blue-700 bg-gray-50/50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-none hover:shadow-md"
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-gray-200/70 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {String(lesson.order).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm sm:text-base leading-snug">
                          {lesson.title}
                        </h3>
                        {lesson.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                            {lesson.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                      <span className="text-gray-400 group-hover:text-white transition-colors text-xs font-bold">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <p className="text-yellow-800 dark:text-yellow-200">
            No lessons available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
