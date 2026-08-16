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

      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        {course.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
        {course.description}
      </p>

      {course.modules.length > 0 ? (
        <div className="space-y-8">
          {course.modules.map((mod) => (
            <div
              key={mod.slug}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {mod.title}
              </h2>
              <ul className="space-y-2">
                {mod.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link
                      href={`/learn/${courseSlug}/module/${mod.slug}/lesson/${lesson.slug}`}
                      className="flex items-center gap-3 p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-gray-400 text-sm w-6 text-right">
                        {lesson.order}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {lesson.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
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
