import glob

files = glob.glob('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/machine-learning/**/*.mdx', recursive=True)

for filepath in files[:3]:
    with open(filepath, 'r') as file:
        content = file.read()
    
    print(f"File: {filepath}")
    khmer_blocks = content.count("<khmerblock>")
    print(f"Number of <khmerblock>: {khmer_blocks}")

print(f"\nTotal files checked: {len(files)}")
