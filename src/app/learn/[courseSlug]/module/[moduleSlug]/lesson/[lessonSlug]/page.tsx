import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCourse,
  getLesson,
  getAdjacentLessons,
  getAllCourseSlugs,
  getCourse as getCourseData,
} from "@/server/services/courses.service";
import { LessonSidebar } from "@/components/LessonSidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { QuizBlock } from "@/components/QuizBlock";
import { BookmarkButton } from "@/components/BookmarkButton";
import { LessonContent } from "@/components/LessonContent";
import { MobileLessonDrawer } from "@/components/MobileLessonDrawer";

type PageParams = {
  courseSlug: string;
  moduleSlug: string;
  lessonSlug: string;
};

export async function generateStaticParams() {
  const paths: PageParams[] = [];
  for (const courseSlug of getAllCourseSlugs()) {
    const course = getCourseData(courseSlug);
    if (!course) continue;
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        paths.push({
          courseSlug,
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
        });
      }
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { courseSlug, moduleSlug, lessonSlug } = await params;
  const result = getLesson(courseSlug, moduleSlug, lessonSlug);
  if (!result) return { title: "Lesson Not Found" };
  return {
    title: `${result.lesson.title} — DataSci AI`,
    description: result.lesson.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { courseSlug, moduleSlug, lessonSlug } = await params;
  const result = getLesson(courseSlug, moduleSlug, lessonSlug);

  if (!result) notFound();

  const { lesson, content } = result;
  const course = getCourse(courseSlug);
  const { prev, next } = getAdjacentLessons(courseSlug, moduleSlug, lessonSlug);

  if (!course) notFound();

  const lessonId = `${courseSlug}/${moduleSlug}/${lessonSlug}`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
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
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
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
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px] inline-block align-bottom">
              {lesson.title}
            </span>
          </li>
        </ol>
      </nav>

      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <LessonSidebar
            courseSlug={courseSlug}
            modules={course.modules}
            activeLesson={lesson}
          />
        </div>

        {/* Main Content */}
        <article className="flex-1 min-w-0">
          {/* Title + actions */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {lesson.title}
            </h1>
            <div className="shrink-0 mt-1">
              <BookmarkButton
                lessonId={lessonId}
                title={lesson.title}
                courseSlug={courseSlug}
                moduleSlug={moduleSlug}
                lessonSlug={lessonSlug}
              />
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 max-w-2xl">
            {lesson.description}
          </p>

          {/* Learning Objectives */}
          {lesson.objectives.length > 0 && (
            <section
              id="what-youll-learn"
              className="mb-10 scroll-mt-20 p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50"
            >
              <h2 className="text-lg font-bold mb-3 text-blue-900 dark:text-blue-200 flex items-center gap-2">
                <span>🎯</span> What You&apos;ll Learn
              </h2>
              <ul className="space-y-2">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="text-blue-500 mt-0.5 shrink-0">✓</span>
                    <span className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* MDX Content */}
          <LessonContent content={content} />

          {/* Quiz */}
          {lesson.quiz && lesson.quiz.length > 0 && (
            <QuizBlock
              questions={lesson.quiz}
              nextLesson={next ? { ...next, courseSlug: next.courseSlug } : null}
            />
          )}

          {/* Previous / Next Navigation */}
          <nav
            aria-label="Lesson navigation"
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4"
          >
            {/* Prev */}
            {prev ? (
              <Link
                href={`/learn/${prev.courseSlug}/module/${prev.moduleSlug}/lesson/${prev.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
              >
                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {/* Next */}
            {next ? (
              <Link
                href={`/learn/${next.courseSlug}/module/${next.moduleSlug}/lesson/${next.slug}`}
                className="group flex flex-col gap-1 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all text-right ml-auto w-full"
              >
                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 justify-end">
                  Next
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>

        {/* Right Table of Contents */}
        <div className="hidden xl:block">
          <TableOfContents objectives={lesson.objectives} />
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileLessonDrawer
        courseSlug={courseSlug}
        modules={course.modules}
        activeLesson={lesson}
      />
    </div>
  );
}
