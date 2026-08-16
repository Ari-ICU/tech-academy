import glob
import re

files = glob.glob('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/deep-learning/**/*.mdx', recursive=True)

custom_files = []
templated_files = []

for filepath in files:
    with open(filepath, 'r') as file:
        content = file.read()
    
    # Check for templated string pattern
    if "is an essential module in the Deep Learning with Python course" in content or "Deep Learning with Python" in content:
        templated_files.append(filepath)
    else:
        custom_files.append(filepath)

print(f"Templated files: {len(templated_files)}")
print(f"Custom files: {len(custom_files)}")
print("\nSome Custom files:")
for f in custom_files[:10]:
    print(f)
