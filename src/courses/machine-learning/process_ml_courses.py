import re
import glob

def process_file(filepath):
    with open(filepath, 'r') as file:
        content = file.read()

    # Get title
    title_match = re.search(r'^title:\s*(.*)$', content, re.MULTILINE)
    if not title_match:
        return
    title = title_match.group(1).strip()
    title = title.strip('"\'')

    # Frontmatter Translations
    content = re.sub(r'description: Learn about (.*?) in the context of Machine Learning with Python\.', r'description: ស្វែងយល់អំពី \1 នៅក្នុងបរិបទនៃ Machine Learning with Python។', content)
    content = re.sub(r'- Understand the theoretical foundations of (.*)', r'- យល់ដឹងពីមូលដ្ឋានទ្រឹស្តីនៃ \1', content)
    content = re.sub(r'- Implement (.*?) using scikit-learn or related Python packages', r'- អនុវត្ត \1 ដោយប្រើប្រាស់ scikit-learn ឬកញ្ចប់ Python ពាក់ព័ន្ធ', content)
    content = content.replace("- Evaluate the model performance and interpret outcomes", "- វាយតម្លៃប្រសិទ្ធភាពម៉ូដែល និងបកស្រាយលទ្ធផល")
    
    content = re.sub(r'- question: What is the primary concept behind (.*?)\?', r'- question: តើអ្វីជាគំនិតចម្បងនៅពីក្រោយ \1?', content)
    content = content.replace("- Vector optimization and cost reduction", "- ការធ្វើឱ្យប្រសើរវ៉ិចទ័រ និងការកាត់បន្ថយថ្លៃដើម")
    content = content.replace("- Memory storage format definition", "- ការកំណត់ទម្រង់ផ្ទុកទិន្នន័យ (Memory storage)")
    content = content.replace("- Web routing and controller logic", "- ការកំណត់ផ្លូវបណ្តាញ (Web routing) និងតក្កវិជ្ជាបញ្ជា")
    content = content.replace("- High-performance database indexing", "- ការធ្វើលិបិក្រមមូលដ្ឋានទិន្នន័យដែលមានប្រសិទ្ធភាពខ្ពស់")
    
    content = re.sub(r'explanation: (.*?) is key in ML workflows to help model structure, data representation, or parameter optimization\.', r'explanation: \1 គឺជាគន្លឹះសំខាន់ក្នុងដំណើរការ ML ដើម្បីជួយដល់រចនាសម្ព័ន្ធម៉ូដែល ការតំណាងទិន្នន័យ ឬការកំណត់ប៉ារ៉ាម៉ែត្រឱ្យប្រសើរ។', content)
    
    content = re.sub(r'- question: Which tool is commonly used to implement (.*?) in Python\?', r'- question: តើឧបករណ៍មួយណាដែលត្រូវបានប្រើជាទូទៅដើម្បីអនុវត្ត \1 នៅក្នុង Python?', content)
    
    content = content.replace("- scikit-learn or related ML libraries", "- scikit-learn ឬបណ្ណាល័យ ML ពាក់ព័ន្ធ")
    content = content.replace("Scikit-learn is the standard Python package for core machine learning algorithm implementation.", "Scikit-learn គឺជាកញ្ចប់ Python ស្តង់ដារសម្រាប់ការអនុវត្តក្បួនដោះស្រាយ Machine Learning ស្នូល។")
    
    # Body translations
    content = content.replace("## 🌐 Overview", "## 🌐 ទិដ្ឋភាពទូទៅ")
    content = content.replace("## 💡 The Core Idea", "## 💡 គំនិតសំខាន់")
    content = content.replace("## 📖 In Depth", "## 📖 ការសិក្សាស៊ីជម្រៅ")
    content = content.replace("## 💻 Code", "## 💻 កូដ")
    content = content.replace("## ✅ Key Takeaways", "## ✅ ចំណុចសំខាន់ៗដែលត្រូវចាំ")

    # Overview block
    overview_pattern = re.compile(rf"{re.escape(title)} is an essential module in the Machine Learning with Python course\. It provides students with a solid foundation to construct models, prepare features, and evaluate performance\.\n\n---\n\n\n<khmerblock>\n.*? គឺជាចំណុចសំខាន់នៅក្នុងកម្មវិធីសិក្សានេះ។ វាផ្ដល់នូវបច្ចេកទេសស្នូលសម្រាប់អ្នកដើម្បីពង្រឹងចំណេះដឹង និងការអនុវត្តជាក់ស្ដែង។\n</khmerblock>", re.DOTALL)
    
    overview_replacement = f"{title} គឺជាចំណុចសំខាន់នៅក្នុងកម្មវិធីសិក្សានេះ។ វាផ្ដល់នូវបច្ចេកទេសស្នូលសម្រាប់អ្នកដើម្បីពង្រឹងចំណេះដឹង និងការអនុវត្តជាក់ស្ដែង។"
    content = overview_pattern.sub(overview_replacement, content)

    # Core Idea block
    content = re.sub(r'In machine learning, (.*?) plays a vital role\. By mastering this concept, you can solve key challenges in data fitting, predictive analytics, and structural pattern mining\.', r'នៅក្នុង Machine Learning, \1 ដើរតួនាទីយ៉ាងសំខាន់។ ដោយការយល់ច្បាស់ពីគំនិតនេះ អ្នកអាចដោះស្រាយបញ្ហាប្រឈមសំខាន់ៗក្នុងការកែតម្រូវទិន្នន័យ (Data fitting) ការវិភាគទស្សន៍ទាយ (Predictive analytics) និងការស្វែងរកលំនាំរចនាសម្ព័ន្ធ (Structural pattern mining)។', content)

    # In Depth block
    in_depth_str = r"""When studying \*\*(.*?)\*\*, focus on the following details:

1\. \*\*Algorithms & Math\*\*: The underlying objective functions or statistical transformations\.
2\. \*\*Coding\*\*: Practical implementation using Python APIs\.
3\. \*\*Best Practices\*\*: Avoiding common pitfalls such as leakage, target drift, or overfitting\."""
    
    in_depth_rep = r"""នៅពេលសិក្សាអំពី **\1** សូមផ្តោតលើចំណុចលម្អិតខាងក្រោម៖

1. **ក្បួនដោះស្រាយ និងគណិតវិទ្យា (Algorithms & Math)**៖ អនុគមន៍គោលបំណង ឬការបំប្លែងស្ថិតិនៅពីក្រោយ។
2. **ការសរសេរកូដ (Coding)**៖ ការអនុវត្តជាក់ស្តែងដោយប្រើ Python APIs។
3. **ការអនុវត្តល្អបំផុត (Best Practices)**៖ ជៀសវាងកំហុសទូទៅដូចជា ការលេចធ្លាយទិន្នន័យ (Data leakage), target drift, ឬ overfitting។"""
    
    content = re.sub(in_depth_str, in_depth_rep, content)

    # Code block
    content = content.replace("Below is a standard template showing how to write this in Python:", "ខាងក្រោមនេះគឺជាទម្រង់កូដស្តង់ដារដែលបង្ហាញពីរបៀបសរសេរវានៅក្នុង Python៖")

    # Key Takeaways block
    content = re.sub(r'Understanding (.*?) is crucial as you advance to more complex architectures\. Run the example code, try changing parameters, and test your comprehension with the quiz!', r'ការយល់ដឹងពី \1 គឺពិតជាមានសារៈសំខាន់នៅពេលដែលអ្នកឈានទៅប្រើប្រាស់រចនាសម្ព័ន្ធដែលស្មុគស្មាញជាងមុន។ សូមសាកល្បងដំណើរការកូដឧទាហរណ៍ សាកល្បងផ្លាស់ប្តូរប៉ារ៉ាម៉ែត្រ និងធ្វើតេស្តការយល់ដឹងរបស់អ្នកជាមួយសំណួរ quiz!', content)

    # Fallback to remove any khmerblock tags that were missed
    content = re.sub(r'<khmerblock>\n(.*?)\n</khmerblock>', r'\1', content, flags=re.DOTALL)

    with open(filepath, 'w') as file:
        file.write(content)

files = glob.glob('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/machine-learning/**/*.mdx', recursive=True)

for filepath in files:
    process_file(filepath)

print(f"Processed {len(files)} files.")
