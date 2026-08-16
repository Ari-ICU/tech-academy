import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getAllCourseSlugs } from "@/server/services/courses.service";

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
