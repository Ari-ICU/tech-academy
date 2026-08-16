import re
import glob

def process_file(filepath):
    with open(filepath, 'r') as file:
        content = file.read()

    # Skip custom files based on lack of standard templated text
    if "is an essential module in the Deep Learning with Python course" not in content and "Deep Learning with Python" not in content:
        return

    # Get title
    title_match = re.search(r'^title:\s*(.*)$', content, re.MULTILINE)
    if not title_match:
        return
    title = title_match.group(1).strip()
    title = title.strip('"\'')

    # Frontmatter Translations
    content = re.sub(r'description: Learn about (.*?) in the context of Deep Learning with Python\.', r'description: ស្វែងយល់អំពី \1 នៅក្នុងបរិបទនៃ Deep Learning with Python។', content)
    content = re.sub(r'- Understand the deep architectures and operations of (.*)', r'- យល់ដឹងពីរចនាសម្ព័ន្ធ deep architectures និងប្រតិបត្តិការនៃ \1', content)
    content = re.sub(r'- Implement (.*?) in TensorFlow/Keras or PyTorch', r'- អនុវត្ត \1 ដោយប្រើប្រាស់ TensorFlow/Keras ឬ PyTorch', content)
    content = content.replace("- Train, evaluate, and optimize modern deep networks", "- ហ្វឹកហាត់ (Train), វាយតម្លៃ (evaluate) និងធ្វើឱ្យប្រសើរ (optimize) ដល់បណ្តាញ deep networks ទំនើបៗ")
    
    content = re.sub(r'- question: What is the primary role of (.*?) in Deep Learning\?', r'- question: តើអ្វីជាតួនាទីចម្បងនៃ \1 នៅក្នុង Deep Learning?', content)
    content = content.replace("- Vector math representation and non-linear mappings", "- ការតំណាងគណិតវិទ្យាវ៉ិចទ័រ និងការគូសវាសមិនមែនលីនេអ៊ែរ (non-linear mappings)")
    content = content.replace("- Client-side application routing", "- ការកំណត់ផ្លូវបណ្តាញកម្មវិធី (Client-side application routing)")
    content = content.replace("- Text rendering configurations", "- ការកំណត់រចនាសម្ព័ន្ធបង្ហាញអត្ថបទ")
    content = content.replace("- Thread management on basic hardware", "- ការគ្រប់គ្រង Thread នៅលើផ្នែករឹង (hardware) មូលដ្ឋាន")
    
    content = re.sub(r'explanation: (.*?) provides the computational structure or model component required for neural processing\.', r'explanation: \1 ផ្តល់នូវរចនាសម្ព័ន្ធគណនា ឬសមាសភាគម៉ូដែលដែលចាំបាច់សម្រាប់ដំណើរការសរសៃប្រសាទ (neural processing)។', content)
    
    content = re.sub(r'- question: Which framework is commonly used to implement (.*?) in deep learning pipelines\?', r'- question: តើ framework មួយណាដែលត្រូវបានប្រើជាទូទៅដើម្បីអនុវត្ត \1 នៅក្នុងខ្សែសង្វាក់ deep learning?', content)
    
    content = content.replace("- TensorFlow/Keras or PyTorch", "- TensorFlow/Keras ឬ PyTorch")
    content = content.replace("- Webpack bundler", "- Webpack bundler")
    content = content.replace("- ExpressJS server", "- ExpressJS server")
    content = content.replace("- PostgreSQL database", "- PostgreSQL database")
    content = content.replace("TensorFlow/Keras and PyTorch are the leading Python libraries for building deep learning architectures.", "TensorFlow/Keras និង PyTorch គឺជាបណ្ណាល័យ Python ឈានមុខគេសម្រាប់ការកសាងរចនាសម្ព័ន្ធ deep learning។")
    
    # Body translations
    content = content.replace("## 🌐 Overview", "## 🌐 ទិដ្ឋភាពទូទៅ")
    content = content.replace("## 💡 The Core Idea", "## 💡 គំនិតសំខាន់")
    content = content.replace("## 📖 In Depth", "## 📖 ការសិក្សាស៊ីជម្រៅ")
    content = content.replace("## 💻 Code", "## 💻 កូដ")
    content = content.replace("## ✅ Key Takeaways", "## ✅ ចំណុចសំខាន់ៗដែលត្រូវចាំ")

    # Overview block
    overview_pattern = re.compile(rf"{re.escape(title)} is an essential module in the Deep Learning with Python course\. It enables students to build deep models, operate on tensors, and run multi-layer optimizations\.\n\n---\n\n\n<khmerblock>\n.*? គឺជាចំណុចសំខាន់នៅក្នុងកម្មវិធីសិក្សានេះ។ វាផ្ដល់នូវបច្ចេកទេសស្នូលសម្រាប់អ្នកដើម្បីពង្រឹងចំណេះដឹង និងការអនុវត្តជាក់ស្ដែង។\n</khmerblock>", re.DOTALL)
    
    overview_replacement = f"{title} គឺជាចំណុចសំខាន់នៅក្នុងកម្មវិធីសិក្សានេះ។ វាផ្ដល់នូវបច្ចេកទេសស្នូលសម្រាប់អ្នកដើម្បីពង្រឹងចំណេះដឹង និងការអនុវត្តជាក់ស្ដែង។"
    content = overview_pattern.sub(overview_replacement, content)

    # Core Idea block
    content = re.sub(r'In deep learning, (.*?) provides the building blocks for learning complex feature hierarchies\. By mastering this topic, you will understand how to model high-dimensional inputs such as images, audio, and raw text\.', r'នៅក្នុង Deep Learning, \1 ផ្តល់នូវធាតុផ្សំជាមូលដ្ឋានសម្រាប់ការរៀនពីឋានានុក្រមនៃលក្ខណៈពិសេសដែលស្មុគស្មាញ (complex feature hierarchies)។ ដោយការយល់ច្បាស់ពីប្រធានបទនេះ អ្នកនឹងយល់ពីរបៀបបង្កើតម៉ូដែលសម្រាប់ទិន្នន័យដែលមានវិមាត្រខ្ពស់ (high-dimensional inputs) ដូចជា រូបភាព សំឡេង និងអត្ថបទដើម។', content)

    # In Depth block
    in_depth_str = r"""When studying \*\*(.*?)\*\*, focus on the following key points:

1\. \*\*Computational Graphs\*\*: How gradients flow through layers\.
2\. \*\*Framework API\*\*: Writing native Keras or PyTorch code\.
3\. \*\*Hyperparameter Selection\*\*: Optimizing layers, learning rates, and batch size\."""
    
    in_depth_rep = r"""នៅពេលសិក្សាអំពី **\1** សូមផ្តោតលើចំណុចសំខាន់ៗខាងក្រោម៖

1. **ក្រាហ្វគណនា (Computational Graphs)**៖ របៀបដែល gradient ហូរឆ្លងកាត់ស្រទាប់នានា។
2. **Framework API**៖ ការសរសេរកូដ Keras ឬ PyTorch ផ្ទាល់។
3. **ការជ្រើសរើស Hyperparameter**៖ ការធ្វើឱ្យប្រសើរដល់ស្រទាប់ អត្រារៀន (learning rates) និងទំហំបាច់ (batch size)។"""
    
    content = re.sub(in_depth_str, in_depth_rep, content)

    # Code block
    content = content.replace("Below is a standard template showing how to write this in Python:", "ខាងក្រោមនេះគឺជាទម្រង់កូដស្តង់ដារដែលបង្ហាញពីរបៀបសរសេរវានៅក្នុង Python៖")

    # Key Takeaways block
    content = re.sub(r'Understanding (.*?) is crucial as you build state-of-the-art architectures\. Run the code samples, alter the hyperparameters, and complete the quiz to test your memory!', r'ការយល់ដឹងពី \1 គឺពិតជាមានសារៈសំខាន់នៅពេលដែលអ្នកបង្កើតរចនាសម្ព័ន្ធទំនើបៗ (state-of-the-art architectures)។ សូមដំណើរការកូដឧទាហរណ៍ សាកល្បងផ្លាស់ប្តូរ hyperparameters និងធ្វើ quiz ដើម្បីសាកល្បងការចងចាំរបស់អ្នក!', content)

    # Fallback to remove any khmerblock tags that were missed
    content = re.sub(r'<khmerblock>\n(.*?)\n</khmerblock>', r'\1', content, flags=re.DOTALL)

    with open(filepath, 'w') as file:
        file.write(content)

files = glob.glob('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/deep-learning/**/*.mdx', recursive=True)

processed_count = 0
for filepath in files:
    with open(filepath, 'r') as file:
        if "is an essential module in the Deep Learning with Python course" in file.read():
            process_file(filepath)
            processed_count += 1

print(f"Processed {processed_count} templated files.")
