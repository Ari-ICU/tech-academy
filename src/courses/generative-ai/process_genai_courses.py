import re
import glob

def process_file(filepath):
    with open(filepath, 'r') as file:
        content = file.read()

    if "is a critical component in the Generative AI with Python course" not in content and "Generative AI with Python" not in content:
        return

    title_match = re.search(r'^title:\s*(.*)$', content, re.MULTILINE)
    if not title_match:
        return
    title = title_match.group(1).strip()
    title = title.strip('"\'')

    # Frontmatter Translations
    content = re.sub(r'description: Learn about (.*?) in the context of Generative AI with Python\.', r'description: ស្វែងយល់អំពី \1 នៅក្នុងបរិបទនៃ Generative AI with Python។', content)
    content = re.sub(r'- Understand the theoretical foundations of (.*)', r'- យល់ដឹងពីមូលដ្ឋានទ្រឹស្តីនៃ \1', content)
    content = re.sub(r'- Implement and experiment with (.*?) in practical scripts', r'- អនុវត្ត និងពិសោធន៍ជាមួយ \1 នៅក្នុង scripts ជាក់ស្តែង', content)
    content = re.sub(r'- Deploy and scale (.*?) configurations in production applications', r'- ពង្រាយ (Deploy) និងពង្រីក (scale) ការកំណត់រចនាសម្ព័ន្ធ \1 នៅក្នុងកម្មវិធីផលិតកម្ម (production applications)', content)
    
    content = re.sub(r'- question: What is the main utility of (.*?) in Generative AI\?', r'- question: តើអ្វីទៅជាអត្ថប្រយោជន៍ចម្បងនៃ \1 នៅក្នុង Generative AI?', content)
    content = content.replace("- Prompt design, model routing, or agentic control", "- ការរចនា Prompt (Prompt design) ការកំណត់ផ្លូវម៉ូដែល (model routing) ឬការគ្រប់គ្រង agentic")
    content = content.replace("- Low-level network routing", "- ការកំណត់ផ្លូវបណ្តាញកម្រិតទាប (Low-level network routing)")
    content = content.replace("- Compiling local desktop code", "- ការចងក្រងកូដកុំព្យូទ័រមូលដ្ឋាន (Compiling local desktop code)")
    content = content.replace("- Sorting lists of integers", "- ការតម្រៀបបញ្ជីលេខគត់ (Sorting lists of integers)")
    
    content = re.sub(r'explanation: (.*?) is utilized to manage, serve, or customize generative model workflows\.', r'explanation: \1 ត្រូវបានប្រើប្រាស់ដើម្បីគ្រប់គ្រង បម្រើ (serve) ឬប្ដូរតាមបំណងនូវលំហូរការងារនៃម៉ូដែល generative។', content)
    
    content = re.sub(r'- question: Which tool or ecosystem is most prominent for running (.*?) in Python\?', r'- question: តើឧបករណ៍ ឬប្រព័ន្ធអេកូឡូស៊ីមួយណាដែលលេចធ្លោជាងគេសម្រាប់ការដំណើរការ \1 នៅក្នុង Python?', content)
    
    content = content.replace("- Hugging Face, OpenAI API, LangChain, or Ollama", "- Hugging Face, OpenAI API, LangChain ឬ Ollama")
    content = content.replace("- Django ORM", "- Django ORM")
    content = content.replace("- React Native", "- React Native")
    content = content.replace("- Unix shell scripts", "- Unix shell scripts")
    content = content.replace("Python's modern AI ecosystem (Hugging Face, LangChain, OpenAI, etc.) provides built-in tools for this.", "ប្រព័ន្ធអេកូឡូស៊ី AI ទំនើបរបស់ Python (Hugging Face, LangChain, OpenAI, ។ល។) ផ្តល់នូវឧបករណ៍ដែលមានស្រាប់សម្រាប់កិច្ចការនេះ។")
    
    # Body translations
    content = content.replace("## 🌐 Overview", "## 🌐 ទិដ្ឋភាពទូទៅ")
    content = content.replace("## 💡 The Core Idea", "## 💡 គំនិតសំខាន់")
    content = content.replace("## 📖 In Depth", "## 📖 ការសិក្សាស៊ីជម្រៅ")
    content = content.replace("## 💻 Code", "## 💻 កូដ")
    content = content.replace("## ✅ Key Takeaways", "## ✅ ចំណុចសំខាន់ៗដែលត្រូវចាំ")

    # Overview block
    overview_pattern = re.compile(rf"{re.escape(title)} is a critical component in the Generative AI with Python course\. It allows developers to configure LLM prompts, setup local pipelines, build agent behaviors, or manage vectors\.\n\n---\n\n\n<khmerblock>\n.*? គឺជាចំណុចសំខាន់នៅក្នុងកម្មវិធីសិក្សានេះ។ វាផ្ដល់នូវបច្ចេកទេសស្នូលសម្រាប់អ្នកដើម្បីពង្រឹងចំណេះដឹង និងការអនុវត្តជាក់ស្ដែង។\n</khmerblock>", re.DOTALL)
    overview_replacement = f"{title} គឺជាចំណុចសំខាន់នៅក្នុងកម្មវិធីសិក្សានេះ។ វាផ្ដល់នូវបច្ចេកទេសស្នូលសម្រាប់អ្នកដើម្បីពង្រឹងចំណេះដឹង និងការអនុវត្តជាក់ស្ដែង។"
    content = overview_pattern.sub(overview_replacement, content)

    # Core Idea block
    content = re.sub(r'In generative AI, we need systematic methods to control and optimize model outputs\. By mastering (.*?), you gain direct control over contextual generation, model retrieval accuracy, and system integration\.', r'នៅក្នុង Generative AI យើងត្រូវការវិធីសាស្រ្តជាប្រព័ន្ធដើម្បីគ្រប់គ្រង និងបង្កើនប្រសិទ្ធភាពនៃលទ្ធផលម៉ូដែល។ ដោយការយល់ច្បាស់ពី \1 អ្នកនឹងទទួលបានការគ្រប់គ្រងដោយផ្ទាល់ទៅលើការបង្កើតតាមបរិបទ (contextual generation) ភាពត្រឹមត្រូវនៃការទាញយកទិន្នន័យម៉ូដែល និងការរួមបញ្ចូលប្រព័ន្ធ។', content)

    # In Depth block
    in_depth_str = r"""When studying \*\*(.*?)\*\*, focus on:

1\. \*\*Architecture\*\*: How context flow is controlled \(e\.g\. RAG, function call\)\.
2\. \*\*Parameters\*\*: Modifying temperature, top_p, chunk size, or embedding dimensions\.
3\. \*\*Safety & Cost\*\*: Ensuring secure prompts, evaluating accuracy, and scaling deployment\."""
    
    in_depth_rep = r"""នៅពេលសិក្សាអំពី **\1** សូមផ្តោតលើចំណុចខាងក្រោម៖

1. **ស្ថាបត្យកម្ម (Architecture)**៖ របៀបគ្រប់គ្រងលំហូរបរិបទ (ឧទាហរណ៍ RAG, function call)។
2. **ប៉ារ៉ាម៉ែត្រ (Parameters)**៖ ការកែប្រែសីតុណ្ហភាព (temperature), top_p, ទំហំ chunk ឬទំហំ embedding។
3. **សុវត្ថិភាព និងការចំណាយ (Safety & Cost)**៖ ការធានាសុវត្ថិភាពនៃ prompts វាយតម្លៃភាពត្រឹមត្រូវ និងការពង្រីកការដាក់ឱ្យប្រើប្រាស់ (scaling deployment)។"""
    
    content = re.sub(in_depth_str, in_depth_rep, content)

    # Code block
    content = content.replace("Here is a standard template showing how to write this in Python:", "ខាងក្រោមនេះគឺជាទម្រង់កូដស្តង់ដារដែលបង្ហាញពីរបៀបសរសេរវានៅក្នុង Python៖")

    # Key Takeaways block
    content = re.sub(r'Understanding (.*?) is essential for building agentic and retrieval-augmented tools\. Experiment with prompts, explore local model weights, and take the quiz to test your learning!', r'ការយល់ដឹងពី \1 គឺជារឿងចាំបាច់សម្រាប់ការកសាងឧបករណ៍ agentic និង retrieval-augmented។ សូមធ្វើការពិសោធន៍ជាមួយ prompts ស្វែងយល់ពី local model weights និងធ្វើ quiz ដើម្បីសាកល្បងការសិក្សារបស់អ្នក!', content)

    # Fallback to remove any khmerblock tags that were missed
    content = re.sub(r'<khmerblock>\n(.*?)\n</khmerblock>', r'\1', content, flags=re.DOTALL)

    with open(filepath, 'w') as file:
        file.write(content)

files = glob.glob('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/generative-ai/**/*.mdx', recursive=True)

processed_count = 0
for filepath in files:
    with open(filepath, 'r') as file:
        if "is a critical component in the Generative AI with Python course" in file.read():
            process_file(filepath)
            processed_count += 1

print(f"Processed {processed_count} templated files.")
