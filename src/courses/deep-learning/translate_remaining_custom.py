import re

def process_custom_frontmatter(path):
    with open(path, 'r') as f:
        content = f.read()

    # Generic UI heading translations
    content = content.replace("##  Overview", "## 🌐 ទិដ្ឋភាពទូទៅ")
    content = content.replace("## 🌐 Overview", "## 🌐 ទិដ្ឋភាពទូទៅ")
    content = content.replace("## 💡 The Core Idea", "## 💡 គំនិតសំខាន់")
    content = content.replace("## 📖 In Depth", "## 📖 ការសិក្សាស៊ីជម្រៅ")
    content = content.replace("## 💻 Code", "## 💻 កូដ")
    content = content.replace("## ✅ Key Takeaways", "## ✅ ចំណុចសំខាន់ៗដែលត្រូវចាំ")
    content = content.replace("## 🔢 The Math", "## 🔢 គណិតវិទ្យា")
    
    # Drop khmerblocks wrappers
    content = re.sub(r'<khmerblock>\n(.*?)\n</khmerblock>', r'\1', content, flags=re.DOTALL)

    with open(path, 'w') as f:
        f.write(content)

process_custom_frontmatter('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/deep-learning/dl-module-4-fundamentals/backpropagation.mdx')
process_custom_frontmatter('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/deep-learning/dl-module-4-fundamentals/activation-functions.mdx')
process_custom_frontmatter('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/deep-learning/dl-module-8-cnn/introduction-to-cnns.mdx')

print("Processed custom files frontmatter/headings.")
