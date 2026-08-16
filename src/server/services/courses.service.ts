import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Course, Module, Lesson, LessonFrontmatter } from "@/types";

const COURSES_DIR = path.join(process.cwd(), "src", "courses");

// Human-readable names for course/module slugs
const COURSE_TITLES: Record<string, string> = {
  python: "Python",
  "math-with-python": "Mathematics with Python",
  "data-science-with-python": "Data Science with Python",
  "data-analyst-with-python": "Data Analyst with Python",
  "machine-learning": "Machine Learning",
  "deep-learning": "Deep Learning",
  "generative-ai": "Generative AI",
};

const COURSE_DESCRIPTIONS: Record<string, string> = {
  python:
    "Master Python from the ground up — syntax, data structures, OOP, and the scientific stack.",
  "math-with-python":
    "Bridge the gap to AI with foundational Linear Algebra, Calculus, Probability, and Statistics using Python.",
  "data-science-with-python":
    "Learn to collect, clean, analyse, and visualise data using Python — from NumPy and pandas through statistics and data visualisation.",
  "data-analyst-with-python":
    "Master the tools of a modern data analyst: Pandas, SQL, and Data Visualization for real-world business insights.",
  "machine-learning":
    "Understand supervised and unsupervised learning algorithms, model evaluation, and tuning.",
  "deep-learning":
    "Explore neural networks, CNNs, RNNs, and transformers from first principles.",
  "generative-ai":
    "Build with large language models, diffusion models, and prompt engineering techniques.",
};

// Human-readable module titles — override the auto-generated ones
const MODULE_TITLES: Record<string, string> = {
  // New Python Syllabus (untranslated technical terms)
  "module-1-foundations-setup": "មេរៀនទី ១៖ Foundations & Setup",
  "module-2-control-flow-logic": "មេរៀនទី ២៖ Control Flow & Logic",
  "module-3-core-data-structures": "មេរៀនទី ៣៖ Core Data Structures",
  "module-4-functions-modular-programming": "មេរៀនទី ៤៖ Functions & Modular Programming",
  "module-5-file-handling-error-management": "មេរៀនទី ៥៖ File Handling & Error Management",
  "module-6-oop": "មេរៀនទី ៦៖ Object-Oriented Programming (OOP)",
  "module-7-ecosystem-tooling": "មេរៀនទី ៧៖ Ecosystem & Tooling",
  "module-8-capstone-projects": "មេរៀនទី ៨៖ Capstone Project Tracks",

  "module-1-foundations":   "Module 1 — Foundations",
  "module-2-data-wrangling":"Module 2 — Data Wrangling with pandas",
  "module-3-eda":           "Module 3 — EDA and Feature Engineering",
  "module-4-statistics":    "Module 4 — Statistics and Probability",
  "module-5-visualization": "Module 5 — Data Visualisation",
  "module-1-basics":        "Module 1 — Python Basics",
  "module-2-control-flow":  "Module 2 — Control Flow",
  "module-3-functions":     "Module 3 — Functions",
  "module-4-data-structures":"Module 4 — Data Structures",
  "module-5-oop":           "Module 5 — Object-Oriented Programming",
  "module-1-core":          "Module 1 — Core Concepts",
  "module-2-supervised":    "Module 2 — Supervised Learning",
  "module-3-evaluation":    "Module 3 — Model Evaluation",
  "module-1-fundamentals":  "Module 1 — Fundamentals",
  "module-2-neural-networks":"Module 2 — Neural Networks",
  "module-3-cnns":          "Module 3 — Convolutional Neural Networks",
  "module-1-intro":         "Module 1 — Introduction",

  // Data Science 20-Module curriculum titles
  "module-1-introduction":          "Module 1 — Introduction to Data Science",
  "module-2-python-fundamentals":   "Module 2 — Python Fundamentals Review",
  "module-3-python-data-processing":"Module 3 — Python for Data Processing",
  "module-4-numpy":                 "Module 4 — NumPy",
  "module-5-pandas-fundamentals":   "Module 5 — Pandas Fundamentals",
  "module-6-data-cleaning":         "Module 6 — Data Cleaning & Preparation",
  "module-7-pandas-manipulation":   "Module 7 — Data Manipulation with Pandas",
  "module-8-eda":                   "Module 8 — Exploratory Data Analysis (EDA)",
  "module-9-data-visualization":    "Module 9 — Data Visualization",
  "module-10-statistics":           "Module 10 — Statistics for Data Science",
  "module-11-sql":                  "Module 11 — SQL for Data Science",
  "module-12-feature-engineering":  "Module 12 — Feature Engineering",
  "module-13-machine-learning":     "Module 13 — Introduction to Machine Learning",
  "module-14-projects":             "Module 14 — Real-World Data Science Projects",
  "module-15-workflow":             "Module 15 — Data Science Workflow",
  "module-16-big-data":             "Module 16 — Big Data Fundamentals",
  "module-17-time-series":          "Module 17 — Time Series Analysis",
  "module-18-nlp":                  "Module 18 — Text Data Analysis (NLP Basics)",
  "module-19-dashboards":           "Module 19 — Dashboard & Reporting",
  "module-20-capstone":             "Module 20 — Capstone Project",

  // Machine Learning 15-Module curriculum titles
  "ml-module-1-introduction":       "Module 1 — Introduction to Machine Learning",
  "ml-module-2-mathematics":        "Module 2 — Mathematics for Machine Learning",
  "ml-module-3-preprocessing":       "Module 3 — Data Preprocessing",
  "ml-module-4-regression":          "Module 4 — Regression Algorithms",
  "ml-module-5-classification":      "Module 5 — Classification Algorithms",
  "ml-module-6-evaluation":          "Module 6 — Model Evaluation",
  "ml-module-7-unsupervised":        "Module 7 — Unsupervised Learning",
  "ml-module-8-ensemble":            "Module 8 — Ensemble Learning",
  "ml-module-9-tuning":              "Module 9 — Hyperparameter Tuning",
  "ml-module-10-time-series":        "Module 10 — Time Series Machine Learning",
  "ml-module-11-nlp":                "Module 11 — Natural Language Processing",
  "ml-module-12-cv":                 "Module 12 — Computer Vision Basics",
  "ml-module-13-deployment":         "Module 13 — Model Deployment",
  "ml-module-14-mlops":              "Module 14 — MLOps Fundamentals",
  "ml-module-15-capstone":           "Module 15 — Capstone Projects",

  // Deep Learning 15-Module curriculum titles
  "dl-module-1-introduction":       "Module 1 — Introduction to Deep Learning",
  "dl-module-2-mathematics":        "Module 2 — Mathematics for Deep Learning",
  "dl-module-3-tensors":            "Module 3 — Tensors & Tensor Operations",
  "dl-module-4-fundamentals":       "Module 4 — Neural Network Fundamentals",
  "dl-module-5-training":           "Module 5 — Training Neural Networks",
  "dl-module-6-tensorflow":         "Module 6 — Deep Learning with TensorFlow & Keras",
  "dl-module-7-pytorch":            "Module 7 — Deep Learning with PyTorch",
  "dl-module-8-cnn":                "Module 8 — Convolutional Neural Networks (CNN)",
  "dl-module-9-rnn":                "Module 9 — Recurrent Neural Networks (RNN)",
  "dl-module-10-transformers":      "Module 10 — Transformers & Attention",
  "dl-module-11-cv":                "Module 11 — Computer Vision",
  "dl-module-12-nlp":               "Module 12 — Natural Language Processing",
  "dl-module-13-genai":             "Module 13 — Generative AI",
  "dl-module-14-deployment":         "Module 14 — Model Deployment & Optimization",
  "dl-module-15-capstone":           "Module 15 — Capstone Projects",

  // Generative AI 15-Module curriculum titles
  "genai-module-1-introduction":    "Module 1 — Introduction to Generative AI",
  "genai-module-2-python":          "Module 2 — Python for Generative AI",
  "genai-module-3-llms":            "Module 3 — Foundations of Large Language Models (LLMs)",
  "genai-module-4-prompting":       "Module 4 — Prompt Engineering",
  "genai-module-5-huggingface":     "Module 5 — Hugging Face Ecosystem",
  "genai-module-6-local-models":    "Module 6 — Running Open Models Locally",
  "genai-module-7-rag":             "Module 7 — Retrieval-Augmented Generation (RAG)",
  "genai-module-8-vectordb":        "Module 8 — Vector Databases",
  "genai-module-9-agents":          "Module 9 — AI Agents",
  "genai-module-10-multimodal":     "Module 10 — Multimodal AI",
  "genai-module-11-tuning":         "Module 11 — Fine-Tuning & Customization",
  "genai-module-12-apps":           "Module 12 — AI Application Development",
  "genai-module-13-deployment":     "Module 13 — AI Deployment",
  "genai-module-14-security":       "Module 14 — AI Security & Responsible AI",
  "genai-module-15-capstone":       "Module 15 — Capstone Projects",

  // Math with Python 11-Module curriculum titles
  "math-module-1-introduction":     "Module 1 — Introduction to Mathematical Computing with Python",
  "math-module-2-basic-math":       "Module 2 — Basic Mathematics and Numerical Operations",
  "math-module-3-algebra":          "Module 3 — Algebra with Python",
  "math-module-4-functions-viz":    "Module 4 — Functions and Mathematical Visualization",
  "math-module-5-trigonometry":     "Module 5 — Trigonometry with Python",
  "math-module-6-linear-algebra":   "Module 6 — Linear Algebra with NumPy",
  "math-module-7-calculus":         "Module 7 — Calculus with Python",
  "math-module-8-probability":      "Module 8 — Probability with Python",
  "math-module-9-statistics":       "Module 9 — Statistics with Python",
  "math-module-10-math-for-ai":     "Module 10 — Mathematics for Data Science & AI",
  "math-module-11-capstone":        "Module 11 — Final Capstone Project",

  // Data Analyst 12-Module curriculum titles
  "da-module-1-introduction":        "Module 1 — Introduction to Data Analytics",
  "da-module-2-numpy":               "Module 2 — NumPy for Data Analysis",
  "da-module-3-pandas-fundamentals": "Module 3 — Pandas Fundamentals",
  "da-module-4-data-cleaning":       "Module 4 — Data Cleaning & Preparation",
  "da-module-5-eda":                 "Module 5 — Exploratory Data Analysis (EDA)",
  "da-module-6-matplotlib":          "Module 6 — Matplotlib",
  "da-module-7-seaborn":             "Module 7 — Seaborn",
  "da-module-8-sql":                 "Module 8 — SQL for Data Analysts",
  "da-module-9-statistics":          "Module 9 — Statistics for Data Analysts",
  "da-module-10-bi-reporting":       "Module 10 — Business Intelligence & Reporting",
  "da-module-11-projects":           "Module 11 — Real-World Data Analyst Projects",
  "da-module-12-capstone":           "Module 12 — Final Capstone Project",
};

export function getModuleTitle(slug: string): string {
  if (MODULE_TITLES[slug]) return MODULE_TITLES[slug];
  return slug
    .replace(/-\d+$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getModuleOrder(slug: string): number {
  const match = slug.match(/module-(\d+)/i);
  return match ? parseInt(match[1], 10) : 1;
}

export function getAllCourseSlugs(): string[] {
  if (!fs.existsSync(COURSES_DIR)) return [];
  return fs
    .readdirSync(COURSES_DIR)
    .filter((f) => fs.statSync(path.join(COURSES_DIR, f)).isDirectory());
}

export function getCourseLessons(courseSlug: string): Lesson[] {
  const courseDir = path.join(COURSES_DIR, courseSlug);
  if (!fs.existsSync(courseDir)) return [];

  const lessons: Lesson[] = [];
  const moduleDirs = fs
    .readdirSync(courseDir)
    .filter((f) => fs.statSync(path.join(courseDir, f)).isDirectory());

  for (const moduleSlug of moduleDirs) {
    const moduleDir = path.join(courseDir, moduleSlug);
    const files = fs
      .readdirSync(moduleDir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    for (const file of files) {
      const lessonSlug = file.replace(/\.mdx?$/, "");
      const filePath = `${process.cwd()}/src/courses/${courseSlug}/${moduleSlug}/${file}`;
      const read = fs.readFileSync;
      const raw = read(filePath, "utf-8");
      const { data } = matter(raw);
      const fm = data as LessonFrontmatter;

      lessons.push({
        slug: lessonSlug,
        title: fm.title ?? lessonSlug,
        description: fm.description ?? "",
        descriptionKm: fm.descriptionKm,
        objectives: fm.objectives ?? [],
        objectivesKm: fm.objectivesKm,
        module: fm.module ?? moduleSlug,
        order: fm.order ?? 1,
        quiz: fm.quiz,
        courseSlug,
        moduleSlug,
      });
    }
  }

  return lessons;
}

export function getCourse(courseSlug: string): Course | null {
  const courseDir = path.join(COURSES_DIR, courseSlug);
  if (!fs.existsSync(courseDir)) return null;

  const moduleDirs = fs
    .readdirSync(courseDir)
    .filter((f) => fs.statSync(path.join(courseDir, f)).isDirectory())
    .sort((a, b) => getModuleOrder(a) - getModuleOrder(b));

  const modules: Module[] = moduleDirs.map((moduleSlug) => {
    const moduleDir = path.join(courseDir, moduleSlug);
    const files = fs
      .readdirSync(moduleDir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    const lessons: Lesson[] = files
      .map((file) => {
        const lessonSlug = file.replace(/\.mdx?$/, "");
        const filePath = `${process.cwd()}/src/courses/${courseSlug}/${moduleSlug}/${file}`;
        const read = fs.readFileSync;
        const raw = read(filePath, "utf-8");
        const { data } = matter(raw);
        const fm = data as LessonFrontmatter;
        return {
          slug: lessonSlug,
          title: fm.title ?? lessonSlug,
          description: fm.description ?? "",
          descriptionKm: fm.descriptionKm,
          objectives: fm.objectives ?? [],
          objectivesKm: fm.objectivesKm,
          module: fm.module ?? moduleSlug,
          order: fm.order ?? 1,
          quiz: fm.quiz,
          courseSlug,
          moduleSlug,
        };
      })
      .sort((a, b) => a.order - b.order);

    return {
      slug: moduleSlug,
      title: getModuleTitle(moduleSlug),
      order: getModuleOrder(moduleSlug),
      lessons,
    };
  });

  return {
    slug: courseSlug,
    title: COURSE_TITLES[courseSlug] ?? courseSlug,
    description: COURSE_DESCRIPTIONS[courseSlug] ?? "",
    modules,
  };
}

export function getAllCourses(): Course[] {
  return getAllCourseSlugs()
    .map((slug) => getCourse(slug))
    .filter(Boolean) as Course[];
}

export function getLesson(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): { lesson: Lesson; content: string } | null {
  const extensions = [".mdx", ".md"];
  for (const ext of extensions) {
    const filePath = `${process.cwd()}/src/courses/${courseSlug}/${moduleSlug}/${lessonSlug}${ext}`;
    if (fs.existsSync(filePath)) {
      const read = fs.readFileSync;
      const raw = read(filePath, "utf-8");
      const { data, content } = matter(raw);
      const fm = data as LessonFrontmatter;
      return {
        lesson: {
          slug: lessonSlug,
          title: fm.title ?? lessonSlug,
          description: fm.description ?? "",
          objectives: fm.objectives ?? [],
          module: fm.module ?? moduleSlug,
          order: fm.order ?? 1,
          quiz: fm.quiz,
          courseSlug,
          moduleSlug,
        },
        content,
      };
    }
  }
  return null;
}

export function getAdjacentLessons(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
): { prev: Lesson | null; next: Lesson | null } {
  const course = getCourse(courseSlug);
  if (!course) return { prev: null, next: null };

  const allLessons = course.modules
    .sort((a, b) => a.order - b.order)
    .flatMap((m) => m.lessons.sort((a, b) => a.order - b.order));

  const idx = allLessons.findIndex(
    (l) => l.moduleSlug === moduleSlug && l.slug === lessonSlug
  );

  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}

export function searchLessons(
  query: string
): { lesson: Lesson; matchType: string }[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase();
  const results: { lesson: Lesson; matchType: string }[] = [];

  for (const courseSlug of getAllCourseSlugs()) {
    const lessons = getCourseLessons(courseSlug);
    for (const lesson of lessons) {
      if (lesson.title.toLowerCase().includes(q)) {
        results.push({ lesson, matchType: "title" });
      } else if (lesson.description.toLowerCase().includes(q)) {
        results.push({ lesson, matchType: "description" });
      }
    }
  }

  return results.slice(0, 20);
}
