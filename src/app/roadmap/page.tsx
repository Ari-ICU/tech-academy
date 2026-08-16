import Link from "next/link";
import {
  Code2,
  BarChart2,
  TrendingUp,
  Brain,
  Sparkles,
  BookOpen,
  ChevronRight,
  ArrowDown,
  Lightbulb,
  Zap,
  PlayCircle,
  BookmarkCheck,
} from "lucide-react";
import { getAllCourses } from "@/server/services/courses.service";

export const metadata = {
  title: "ផែនការសិក្សា — DataSci AI",
};

const COURSE_META: Record<
  string,
  {
    Icon: React.ElementType;
    gradient: string;
    border: string;
    bg: string;
    badge: string;
  }
> = {
  python: {
    Icon: Code2,
    gradient: "from-blue-500 to-cyan-400",
    border: "border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    badge: "bg-blue-600",
  },
  "data-science-with-python": {
    Icon: BarChart2,
    gradient: "from-emerald-500 to-teal-400",
    border: "border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    badge: "bg-emerald-600",
  },
  "machine-learning": {
    Icon: TrendingUp,
    gradient: "from-violet-500 to-purple-400",
    border: "border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    badge: "bg-violet-600",
  },
  "deep-learning": {
    Icon: Brain,
    gradient: "from-rose-500 to-pink-400",
    border: "border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    badge: "bg-rose-600",
  },
  "generative-ai": {
    Icon: Sparkles,
    gradient: "from-amber-500 to-orange-400",
    border: "border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    badge: "bg-amber-600",
  },
};

const TOPIC_MAP: Record<string, string> = {
  variable: "Variables & Types",
  operator: "Operators",
  string: "Strings",
  conditional: "Conditionals",
  "if": "Conditionals",
  loop: "Loops",
  iteration: "Loops",
  function: "Functions",
  lambda: "Lambda & HOF",
  closure: "Closures",
  decorator: "Decorators",
  list: "Lists & Tuples",
  tuple: "Lists & Tuples",
  dict: "Dicts & Sets",
  set: "Dicts & Sets",
  class: "Classes & OOP",
  object: "Classes & OOP",
  inherit: "Inheritance",
  encapsulation: "Encapsulation",
  dunder: "Dunder Methods",
  "data science": "Data Science Workflow",
  "machine learning": "ML Fundamentals",
  neural: "Neural Networks",
  deep: "Deep Learning",
  generative: "Generative Models",
  transformer: "Transformers",
};

export default function RoadmapPage() {
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

  const roadmap = courses.map((course, idx) => {
    const totalLessons = course.modules.reduce(
      (sum, mod) => sum + mod.lessons.length,
      0
    );

    const topics = new Set<string>();
    course.modules.forEach((mod) =>
      mod.lessons.forEach((lesson) => {
        const title = lesson.title.toLowerCase();
        Object.entries(TOPIC_MAP).forEach(([key, label]) => {
          if (title.includes(key)) topics.add(label);
        });
      })
    );

    const meta = COURSE_META[course.slug] ?? {
      Icon: BookOpen,
      gradient: "from-gray-400 to-gray-500",
      border: "border-gray-200 dark:border-gray-700",
      bg: "bg-gray-50 dark:bg-gray-900",
      badge: "bg-gray-600",
    };

    return {
      step: idx + 1,
      slug: course.slug,
      title: course.title,
      description: course.description,
      modules: course.modules.length,
      lessons: totalLessons,
      topics: Array.from(topics).slice(0, 6),
      ...meta,
    };
  });

  const tips = [
    {
      Icon: Code2,
      title: "ចាប់ផ្តើមពី Python",
      desc: "ប្រសិនបើអ្នកនៅថ្មី Python គឺជាមូលដ្ឋានសម្រាប់អ្វីៗទាំងអស់។",
    },
    {
      Icon: PlayCircle,
      title: "អនុវត្តនៅ Playground",
      desc: "ប្រើ Playground ដើម្បីសាកល្បង code ដែលបានរៀន។",
    },
    {
      Icon: BookmarkCheck,
      title: "ប្រើ Bookmark",
      desc: "រក្សាទុកមេរៀនដែលចង់ត្រឡប់មកមើលវិញ។",
    },
    {
      Icon: Zap,
      title: "ធ្វើ Quiz",
      desc: "ធ្វើ quiz នៅចុងមេរៀនដើម្បីពិនិត្យការយល់ដឹង។",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 text-white py-16 overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-5 text-sm">
            <TrendingUp className="w-4 h-4" />
            ផែនការសិក្សាសម្រាប់ Data Science
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            ផែនការសិក្សា
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            ដំណើររបស់អ្នកពី Python មូលដ្ឋាន រហូតដល់ Generative AI ។
            ចូលចំណែករៀនពីចំណុចណាដែលអ្នកស្ថិតនៅ។
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        {roadmap.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>មិនទាន់មានវគ្គសិក្សានៅឡើយ។</p>
          </div>
        ) : (
          <ol className="space-y-0">
            {roadmap.map((item, idx) => (
              <li key={item.slug} className="relative">
                {/* Vertical connector */}
                {idx < roadmap.length - 1 && (
                  <div className="absolute left-7 top-[4.5rem] bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 z-0" />
                )}

                <div className="relative z-10 flex gap-5">
                  {/* Step icon */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                      <item.Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Card */}
                  <Link
                    href={`/learn/${item.slug}`}
                    className={`group flex-1 mb-8 p-6 rounded-2xl border-2 ${item.border} ${item.bg} hover:shadow-xl transition-all duration-300`}
                  >
                    {/* Step badge + title */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-white mb-2 ${item.badge}`}>
                          ជំហានទី {item.step}
                        </span>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h2>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {item.modules} module{item.modules !== 1 ? "s" : ""}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        {item.lessons} មេរៀន
                      </span>
                    </div>

                    {/* Topics */}
                    {item.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2.5 py-1 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-xs rounded-lg border border-gray-200 dark:border-gray-700"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </div>

                {/* Arrow between steps */}
                {idx < roadmap.length - 1 && (
                  <div className="flex justify-start pl-5 -mt-4 mb-2 z-10 relative">
                    <ArrowDown className="w-4 h-4 text-gray-300 dark:text-gray-700" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}

        {/* Tips */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
          <div className="flex items-center gap-2 mb-5">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-gray-900 dark:text-white">
              គន្លឹះនៃការសិក្សា
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map(({ Icon, title, desc }, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
