const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const PYTHON_DIR = path.join(process.cwd(), "src", "courses", "python");

const fileOrderMap = {
  "module-1-foundations-setup": [
    "what-is-python.mdx",
    "variables-and-types.mdx",
    "operators-and-expressions.mdx",
    "input-and-output.mdx"
  ],
  "module-2-control-flow-logic": [
    "if-elif-else.mdx",
    "for-loops.mdx",
    "while-loops.mdx"
  ],
  "module-3-core-data-structures": [
    "lists-and-tuples.mdx",
    "dictionaries-and-sets.mdx",
    "strings-in-depth.mdx"
  ],
  "module-4-functions-modular-programming": [
    "defining-functions.mdx",
    "scope-and-closures.mdx",
    "lambda-and-higher-order.mdx",
    "higher-order-functions.mdx",
    "map-filter-reduce.mdx",
    "importing-and-creating-modules.mdx",
    "decorators-and-closures.mdx",
    "iterators-and-generators.mdx",
    "regex-and-datetime.mdx"
  ],
  "module-5-file-handling-error-management": [
    "try-except-finally.mdx",
    "custom-exceptions-and-logging.mdx",
    "reading-and-writing-files.mdx",
    "csv-and-json.mdx",
    "file-system-operations.mdx",
    "pytest-and-unittest.mdx",
    "debugging-and-mocking.mdx"
  ],
  "module-6-oop": [
    "classes-and-objects.mdx",
    "inheritance-and-polymorphism.mdx",
    "encapsulation-and-dunder-methods.mdx"
  ],
  "module-7-ecosystem-tooling": [
    "pip-and-virtual-environments.mdx",
    "web-scraping-and-apis.mdx",
    "asyncio-basics.mdx",
    "threading-and-multiprocessing.mdx"
  ],
  "module-8-capstone-projects": [
    "cli-applications.mdx",
    "pep8-and-clean-code.mdx",
    "profiling-and-optimization.mdx"
  ]
};

function reorderLessons() {
  for (const [moduleSlug, files] of Object.entries(fileOrderMap)) {
    const moduleDir = path.join(PYTHON_DIR, moduleSlug);
    if (!fs.existsSync(moduleDir)) {
      console.warn(`Module directory does not exist: ${moduleDir}`);
      continue;
    }

    files.forEach((filename, index) => {
      const filePath = path.join(moduleDir, filename);
      if (!fs.existsSync(filePath)) {
        console.warn(`File does not exist: ${filePath}`);
        return;
      }

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      // Clean up frontmatter
      delete data.module; // remove old module mapping to let directory path slug govern it
      data.order = index + 1; // set sequential order

      // Recompile frontmatter and content
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, updatedContent, "utf-8");
      console.log(`Updated frontmatter for ${moduleSlug}/${filename} (order: ${index + 1})`);
    });
  }
  console.log("Done reordering lessons.");
}

reorderLessons();
