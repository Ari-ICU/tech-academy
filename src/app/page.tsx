import Link from "next/link";
import {
  ArrowRight,
  Map,
  BookOpen,
  Clock,
  ChevronRight,
  BarChart2,
  Brain,
  Cpu,
  Sparkles,
  Code2,
  TrendingUp,
  MessageSquare,
  Zap,
  Lock,
  Globe,
  PieChart,
  Calculator,
} from "lucide-react";
import { getAllCourses } from "@/server/services/courses.service";
import CtaCarousel from "@/components/CtaCarousel";

const COURSE_META: Record<
  string,
  { Icon: React.ElementType; color: string; gradient: string; bgTint: string }
> = {
  python: {
    Icon: Code2,
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-400",
    bgTint: "bg-blue-50 dark:bg-blue-900/20",
  },
  "data-science-with-python": {
    Icon: BarChart2,
    color: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500 to-teal-400",
    bgTint: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  "math-with-python": {
    Icon: Calculator,
    color: "text-indigo-600 dark:text-indigo-400",
    gradient: "from-indigo-500 to-purple-400",
    bgTint: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  "data-analyst-with-python": {
    Icon: PieChart,
    color: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500 to-amber-400",
    bgTint: "bg-orange-50 dark:bg-orange-900/20",
  },
  "machine-learning": {
    Icon: TrendingUp,
    color: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-500 to-purple-400",
    bgTint: "bg-violet-50 dark:bg-violet-900/20",
  },
  "deep-learning": {
    Icon: Brain,
    color: "text-rose-600 dark:text-rose-400",
    gradient: "from-rose-500 to-pink-400",
    bgTint: "bg-rose-50 dark:bg-rose-900/20",
  },
  "generative-ai": {
    Icon: Sparkles,
    color: "text-amber-600 dark:text-amber-400",
    gradient: "from-amber-500 to-orange-400",
    bgTint: "bg-amber-50 dark:bg-amber-900/20",
  },
};

export default function Home() {
  const COURSE_ORDER = ["python", "math-with-python", "data-analyst-with-python", "data-science-with-python", "machine-learning", "deep-learning", "generative-ai"];
  const courses = getAllCourses().sort(
    (a, b) => COURSE_ORDER.indexOf(a.slug) - COURSE_ORDER.indexOf(b.slug)
  );
  const totalLessons = courses.reduce(
    (sum, c) => sum + c.modules.reduce((s, m) => s + m.lessons.length, 0),
    0
  );


  const stats = [
    { value: `${courses.length}`, label: "វគ្គសិក្សា", Icon: BookOpen },
    { value: `${totalLessons}+`, label: "មេរៀន", Icon: Zap },
    { value: "100%", label: "ឥតគិតថ្លៃ", Icon: Lock },
    { value: "∞", label: "រៀនពីគ្រប់ទីកន្លែង", Icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 text-white overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-700" />
          <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">រៀនពីគោលការណ៍ជាមូលដ្ឋាន</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight tracking-tight">
              ស្វែងយល់ពី{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
                Data Science
              </span>
              <br className="hidden sm:block" />
              {" "}និង{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-rose-400">
                Artificial Intelligence
              </span>
            </h1>

            <p className="text-xl sm:text-2xl mb-10 text-gray-300 leading-relaxed max-w-2xl mx-auto">
              ចាប់ផ្តើមដំណើររបស់អ្នកជាមួយ{" "}
              <strong className="text-white">Python</strong>,{" "}
              <strong className="text-white">Machine Learning</strong> និង{" "}
              <strong className="text-white">Generative AI</strong>។
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learn"
                className="group inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                ចាប់ផ្តើមរៀនឥឡូវនេះ
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Map className="w-5 h-5" />
                មើលផែនការសិក្សា
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 30C840 36 960 40 1080 42C1200 44 1320 44 1380 44L1440 44V80H0Z" className="fill-white dark:fill-gray-950" />
          </svg>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section className="py-14 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, Icon }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ──────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                វគ្គសិក្សា
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                ការសិក្សារៀបចំពីដំបូងដល់ advanced
              </p>
            </div>
            <Link
              href="/learn"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              មើលទាំងអស់ <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? courses.map((course) => {
              const meta = COURSE_META[course.slug] ?? {
                Icon: BookOpen,
                color: "text-gray-600",
                gradient: "from-gray-400 to-gray-500",
                bgTint: "bg-gray-50 dark:bg-gray-800",
              };
              const { Icon: CourseIcon } = meta;
              const lessonCount = course.modules.reduce((s, m) => s + m.lessons.length, 0);

              return (
                <Link
                  key={course.slug}
                  href={`/learn/${course.slug}`}
                  className="group relative flex flex-col bg-white dark:bg-gray-900/50 rounded-3xl p-7 sm:p-8 shadow-sm border border-gray-200/60 dark:border-gray-800/80 hover:shadow-2xl hover:shadow-blue-900/10 dark:hover:shadow-blue-900/20 hover:border-transparent dark:hover:border-transparent transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
                >
                  {/* Subtle top glow on hover */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${meta.bgTint} group-hover:scale-110 transition-transform duration-500`}>
                      <CourseIcon className={`w-7 h-7 ${meta.color}`} />
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/80 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-500">
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-blue-400 dark:group-hover:to-cyan-400 transition-all duration-300">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 flex-1 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-5 pt-5 border-t border-gray-100 dark:border-gray-800/80 mt-auto">
                    <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      {lessonCount} មេរៀន
                    </span>
                    <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 text-gray-400" />
                      ឥតគិតថ្លៃ
                    </span>
                  </div>
                </Link>
              );
            }) : (
              <div className="col-span-full text-center py-12 text-gray-400 dark:text-gray-500">
                មិនទាន់មានវគ្គសិក្សា
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ── CTA ──────────────────────────────────── */}
      <CtaCarousel />
    </div>
  );
}
