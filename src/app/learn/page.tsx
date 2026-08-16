import Link from "next/link";
import {
  Code2,
  BarChart2,
  TrendingUp,
  Brain,
  Sparkles,
  BookOpen,
  Clock,
  ChevronRight,
  PieChart,
  Calculator,
} from "lucide-react";
import { getAllCourses } from "@/server/services/courses.service";

export const metadata = {
  title: "មេរៀនទាំងអស់ — DataSci AI",
};

const COURSE_META: Record<
  string,
  {
    Icon: React.ElementType;
    gradient: string;
    description: string;
  }
> = {
  python: {
    Icon: Code2,
    gradient: "from-blue-500 to-cyan-400",
    description:
      "ស្វែងយល់ Python ពីដំបូង — syntax, data structures, OOP និង scientific stack។",
  },
  "data-science-with-python": {
    Icon: BarChart2,
    gradient: "from-emerald-500 to-teal-400",
    description:
      "រៀនការប្រមូល ការសម្អាត ការវិភាគ និងការមើលឃើញ data ដោយប្រើ Python — NumPy, pandas, statistics និង visualisation។",
  },
  "math-with-python": {
    Icon: Calculator,
    gradient: "from-indigo-500 to-purple-400",
    description:
      "កសាងគ្រឹះគណិតវិទ្យាសម្រាប់ AI រួមមាន Linear Algebra, Calculus, Probability, និង Statistics ជាមួយ Python។",
  },
  "data-analyst-with-python": {
    Icon: PieChart,
    gradient: "from-orange-500 to-amber-400",
    description:
      "ស្ទាត់ជំនាញវិភាគទិន្នន័យជាមួយ Pandas, SQL និង Data Visualization សម្រាប់ដោះស្រាយបញ្ហាអាជីវកម្ម។",
  },
  "machine-learning": {
    Icon: TrendingUp,
    gradient: "from-violet-500 to-purple-400",
    description:
      "យល់ algorithm supervised និង unsupervised learning, model evaluation និង tuning។",
  },
  "deep-learning": {
    Icon: Brain,
    gradient: "from-rose-500 to-pink-400",
    description:
      "ស្វែងយល់ neural networks, CNNs, RNNs និង transformers ពីគោលការណ៍ជាមូលដ្ឋាន។",
  },
  "generative-ai": {
    Icon: Sparkles,
    gradient: "from-amber-500 to-orange-400",
    description:
      "បង្កើតជាមួយ large language models, diffusion models និង prompt engineering។",
  },
};

export default function CoursesPage() {
  const COURSE_ORDER = [
    "python",
    "math-with-python",
    "data-analyst-with-python",
    "data-science-with-python",
    "machine-learning",
    "deep-learning",
    "generative-ai",
  ];

  const courses = getAllCourses().sort(
    (a, b) => COURSE_ORDER.indexOf(a.slug) - COURSE_ORDER.indexOf(b.slug)
  );

  const displayCourses =
    courses.length > 0
      ? courses
      : COURSE_ORDER.map((slug) => ({
          slug,
          title: COURSE_META[slug]
            ? slug
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")
            : slug,
          description: COURSE_META[slug]?.description ?? "",
          modules: [] as { lessons: unknown[] }[],
        }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            វគ្គសិក្សាទាំងអស់
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            ចាប់ផ្តើមពី Python មូលដ្ឋាន ឬចូលទៅកាន់ប្រធានបទដែលអ្នកចាប់អារម្មណ៍ភ្លាម។
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map((course) => {
            const meta = COURSE_META[course.slug] ?? {
              Icon: BookOpen,
              gradient: "from-gray-400 to-gray-500",
              description: "",
            };
            const { Icon, gradient } = meta;
            const lessonCount = course.modules.reduce(
              (s, m) => s + m.lessons.length,
              0
            );
            const description =
              course.description || meta.description;

            return (
              <Link
                key={course.slug}
                href={`/learn/${course.slug}`}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Gradient top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon box */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-md`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 flex-1 leading-relaxed line-clamp-2">
                    {description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                      {lessonCount > 0 ? (
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {lessonCount} មេរៀន
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        ឥតគិតថ្លៃ
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
