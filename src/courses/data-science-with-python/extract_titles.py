import os
import re
import glob

files = glob.glob('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/data-science-with-python/**/*.mdx', recursive=True)

translations = set()

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Extract title
    title_match = re.search(r'^title:\s*(.*)$', content, re.MULTILINE)
    if not title_match:
        continue
    title = title_match.group(1).strip()
    
    # Extract Khmer text from first khmerblock
    khmer_match = re.search(r'<khmerblock>\n(.*?)\n</khmerblock>', content, re.DOTALL)
    if not khmer_match:
        continue
    
    first_khmer_line = khmer_match.group(1).split('\n')[0].strip()
    
    # The pattern is: [Translated Title] គឺជាចំណុចសំខាន់នៅក្នុងកម្មវិធីសិក្សា Python Data Science។
    suffix = ' គឺជាចំណុចសំខាន់នៅក្នុងកម្មវិធីសិក្សា Python Data Science។'
    if suffix in first_khmer_line:
        translated = first_khmer_line.replace(suffix, '')
        translations.add(f"{title}  -->  {translated}")

for t in sorted(translations):
    print(t)
