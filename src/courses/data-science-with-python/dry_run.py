import re
import sys

def process_file(filepath):
    with open(filepath, 'r') as file:
        content = file.read()

    # Translate Headings
    content = content.replace("## 🌐 Overview", "## 🌐 ទិដ្ឋភាពទូទៅ")
    content = content.replace("## 💡 The Core Idea", "## 💡 គំនិតសំខាន់")
    content = content.replace("## 📖 In Depth", "## 📖 ការសិក្សាស៊ីជម្រៅ")
    content = content.replace("## 💻 Code", "## 💻 កូដ")
    content = content.replace("## ✅ Key Takeaways", "## ✅ ចំណុចសំខាន់ៗដែលត្រូវចាំ")

    # Translate Code section english text
    content = content.replace("Below is a typical example demonstrating how to implement this in Python:", "ខាងក្រោមនេះគឺជាឧទាហរណ៍ដែលបង្ហាញពីរបៀបអនុវត្តវានៅក្នុង Python៖")

    def process_section(heading_khmer, text_content):
        # Match heading_khmer, then any text, then <khmerblock> inner content </khmerblock>
        pattern = re.compile(rf"({heading_khmer}\n+)(.*?)(<khmerblock>\n(.*?)\n</khmerblock>)", re.DOTALL)
        return pattern.sub(r"\1\4", text_content)

    content = process_section("## 🌐 ទិដ្ឋភាពទូទៅ", content)
    content = process_section("## 💡 គំនិតសំខាន់", content)
    content = process_section("## 📖 ការសិក្សាស៊ីជម្រៅ", content)
    content = process_section("## ✅ ចំណុចសំខាន់ៗដែលត្រូវចាំ", content)

    # Replace translated phrase with title
    title_match = re.search(r'^title:\s*(.*)$', content, re.MULTILINE)
    if title_match:
        title = title_match.group(1).strip()
        first_khmer_match = re.search(r'^(.*?) គឺជាចំណុចសំខាន់នៅក្នុងកម្មវិធីសិក្សា Python Data Science។', content, re.MULTILINE)
        if first_khmer_match:
            translated_phrase = first_khmer_match.group(1).strip()
            if len(translated_phrase) > 2:
                # Also replace instances where it might be wrapped in bold like **translated_phrase**
                content = content.replace(translated_phrase, title)

    print(content)

process_file('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/data-science-with-python/module-1-introduction/what-is-data-science.mdx')
