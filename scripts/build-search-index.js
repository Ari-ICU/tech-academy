const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const COURSES_DIR = path.join(process.cwd(), "src", "courses");
const OUTPUT_FILE = path.join(process.cwd(), "public", "search-index.json");

function getAllCourseSlugs() {
  if (!fs.existsSync(COURSES_DIR)) return [];
  return fs
    .readdirSync(COURSES_DIR)
    .filter((f) => fs.statSync(path.join(COURSES_DIR, f)).isDirectory());
}

function getCourseLessons(courseSlug) {
  const courseDir = path.join(COURSES_DIR, courseSlug);
  if (!fs.existsSync(courseDir)) return [];

  const lessons = [];
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
      const filePath = path.join(moduleDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);

      lessons.push({
        type: "lesson",
        title: data.title ?? lessonSlug,
        description: data.description ?? "",
        url: `/learn/${courseSlug}/module/${moduleSlug}/lesson/${lessonSlug}`,
      });
    }
  }

  return lessons;
}

function generateIndex() {
  const allLessons = [];
  const slugs = getAllCourseSlugs();
  for (const slug of slugs) {
    allLessons.push(...getCourseLessons(slug));
  }
  
  // Make sure public directory exists
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allLessons, null, 2), "utf-8");
  console.log(`Successfully generated search index with ${allLessons.length} lessons at ${OUTPUT_FILE}`);
}

generateIndex();
