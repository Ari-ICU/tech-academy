import glob
import re

files = glob.glob('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/data-science-with-python/**/*.mdx', recursive=True)

descriptions = set()
questions = set()
explanations = set()

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    title_match = re.search(r'^title:\s*(.*)$', content, re.MULTILINE)
    if not title_match:
        continue
    title = title_match.group(1).strip()
    
    # Replace the title back to [TITLE] to see if they are identical
    desc_match = re.search(r'^description:\s*(.*)$', content, re.MULTILINE)
    if desc_match:
        desc = desc_match.group(1).strip().replace(title, "[TITLE]")
        descriptions.add(desc)
    
    # extract questions
    q_matches = re.findall(r'question:\s*(.*)$', content, re.MULTILINE)
    for q in q_matches:
        questions.add(q.strip().replace(title, "[TITLE]"))
        
    exp_matches = re.findall(r'explanation:\s*(.*)$', content, re.MULTILINE)
    for e in exp_matches:
        explanations.add(e.strip().replace(title, "[TITLE]"))

print("Descriptions:")
for d in descriptions: print(d)
print("\nQuestions:")
for q in questions: print(q)
print("\nExplanations:")
for e in explanations: print(e)

