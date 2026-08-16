export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonFrontmatter {
  title: string;
  description: string;
  descriptionKm?: string;
  objectives: string[];
  objectivesKm?: string[];
  module: string;
  order: number;
  quiz?: QuizQuestion[];
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  descriptionKm?: string;
  objectives: string[];
  objectivesKm?: string[];
  module: string;
  order: number;
  quiz?: QuizQuestion[];
  courseSlug: string;
  moduleSlug: string;
}

export interface Module {
  slug: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  modules: Module[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  slug: string;
}

export interface Bookmark {
  lessonId: string;
  title: string;
  courseSlug: string;
  moduleSlug: string;
  lessonSlug: string;
  addedAt: string;
}
