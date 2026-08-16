import os
import glob
import re

files = glob.glob('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/data-science-with-python/**/*.mdx', recursive=True)

for filepath in files:
    with open(filepath, 'r') as file:
        content = file.read()
    
    title_match = re.search(r'^title:\s*(.*)$', content, re.MULTILINE)
    if not title_match:
        continue
    
    # We will use simple string replacement since the strings are highly templated.
    # description
    content = re.sub(r'description: Learn about (.*?) in the context of Python Data Science\.', r'description: ស្វែងយល់អំពី \1 នៅក្នុងបរិបទនៃ Python Data Science។', content)
    
    # objectives
    content = re.sub(r'- Understand the fundamental concepts of (.*)', r'- យល់ដឹងពីគោលគំនិតជាមូលដ្ឋាននៃ \1', content)
    content = re.sub(r'- Write Python code to implement (.*)', r'- សរសេរកូដ Python ដើម្បីអនុវត្ត \1', content)
    content = re.sub(r'- Apply (.*) to real-world datasets', r'- អនុវត្ត \1 ទៅលើបណ្តុំទិន្នន័យជាក់ស្តែង', content)
    
    # quiz questions
    content = re.sub(r'- question: What is the main purpose of (.*?)\?', r'- question: តើគោលបំណងចម្បងនៃ \1 គឺជាអ្វី?', content)
    
    # options for Q1
    content = content.replace("- To store data efficiently", "- ដើម្បីរក្សាទុកទិន្នន័យប្រកបដោយប្រសិទ្ធភាព")
    content = content.replace("- To solve domain-specific problems using statistical and programming techniques", "- ដើម្បីដោះស្រាយបញ្ហាជាក់លាក់ដោយប្រើបច្ចេកទេសស្ថិតិ និងការសរសេរកម្មវិធី")
    content = content.replace("- To compile code faster", "- ដើម្បីចងក្រងកូដបានលឿនជាងមុន")
    content = content.replace("- To visualize 3D objects", "- ដើម្បីមើលឃើញវត្ថុ 3D")
    
    # Q1 explanation
    content = re.sub(r'explanation: (.*?) forms a key component of the data science workflow, aiding in processing, analysis, or representation\.', r'explanation: \1 គឺជាសមាសធាតុដ៏សំខាន់នៃដំណើរការ data science ដែលជួយដល់ការដំណើរការទិន្នន័យ ការវិភាគ ឬការបង្ហាញទិន្នន័យ។', content)
    
    # Q2 question
    content = re.sub(r'- question: Which Python tool or concept is most closely related to (.*?)\?', r'- question: តើឧបករណ៍ ឬគំនិត Python មួយណាដែលទាក់ទងយ៉ាងជិតស្និទ្ធបំផុតទៅនឹង \1?', content)
    
    # options for Q2
    content = content.replace("- Compiler directives", "- សេចក្តីណែនាំរបស់កម្មវិធីចងក្រង (Compiler directives)")
    content = content.replace("- Standard data structures or specialized data science libraries", "- រចនាសម្ព័ន្ធទិន្នន័យស្តង់ដារ ឬបណ្ណាល័យ data science ពិសេស")
    content = content.replace("- Operating system kernels", "- ស្នូលនៃប្រព័ន្ធប្រតិបត្តិការ (Operating system kernels)")
    content = content.replace("- Database index layout", "- ប្លង់សន្ទស្សន៍មូលដ្ឋានទិន្នន័យ (Database index layout)")
    
    # Q2 explanation
    content = re.sub(r"explanation: Python's standard library and data science stack provide direct tools to implement (.*?)\.", r"explanation: បណ្ណាល័យស្តង់ដាររបស់ Python ផ្តល់ឧបករណ៍ផ្ទាល់ដើម្បីអនុវត្ត \1។", content)
    
    with open(filepath, 'w') as file:
        file.write(content)

print(f"Translated frontmatter in {len(files)} files.")
