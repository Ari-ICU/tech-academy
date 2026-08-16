import re

def process_file(path, replacements):
    with open(path, 'r') as f:
        content = f.read()
    
    # Generic heading replacements
    content = content.replace("##  Overview", "## 🌐 ទិដ្ឋភាពទូទៅ")
    content = content.replace("## 🌐 Overview", "## 🌐 ទិដ្ឋភាពទូទៅ")
    content = content.replace("## 💡 The Core Idea", "## 💡 គំនិតសំខាន់")
    content = content.replace("## 📖 In Depth", "## 📖 ការសិក្សាស៊ីជម្រៅ")
    content = content.replace("## 💻 Code", "## 💻 កូដ")
    content = content.replace("## ✅ Key Takeaways", "## ✅ ចំណុចសំខាន់ៗដែលត្រូវចាំ")
    content = content.replace("## 🔢 The Math", "## 🔢 គណិតវិទ្យា")
    
    # Remove khmerblock wrapper
    content = re.sub(r'<khmerblock>\n(.*?)\n</khmerblock>', r'\1', content, flags=re.DOTALL)
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(path, 'w') as f:
        f.write(content)

# what-is-generative-ai.mdx
process_file(
    '/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/generative-ai/genai-module-1-introduction/what-is-generative-ai.mdx',
    [
        ("description: An introduction to generative AI — models that create new content (text, images, audio) rather than simply classifying or predicting.", "description: ការណែនាំអំពី generative AI — ម៉ូដែលដែលបង្កើតមាតិកាថ្មី (អត្ថបទ រូបភាព សំឡេង) ជាជាងគ្រាន់តែចាត់ថ្នាក់ ឬទស្សន៍ទាយ។"),
        ("- Distinguish generative models from discriminative models", "- បែងចែកម៉ូដែល generative ពីម៉ូដែល discriminative"),
        ("- Identify the core generative model families (GANs, VAEs, diffusion, transformers)", "- កំណត់អត្តសញ្ញាណគ្រួសារម៉ូដែល generative ស្នូល (GANs, VAEs, diffusion, transformers)"),
        ("- Describe real-world applications of generative AI", "- ពណ៌នាអំពីការអនុវត្តជាក់ស្តែងនៃ generative AI"),
        ("question: What is the primary difference between a generative and a discriminative model?", "question: តើអ្វីជាភាពខុសគ្នាចម្បងរវាងម៉ូដែល generative និង discriminative?"),
        ("- Generative models classify inputs; discriminative models generate outputs", "- ម៉ូដែល Generative ចាត់ថ្នាក់ធាតុបញ្ចូល; ម៉ូដែល discriminative បង្កើតលទ្ធផល"),
        ("- Generative models learn P(x,y); discriminative models learn P(y|x)", "- ម៉ូដែល Generative រៀន P(x,y); ម៉ូដែល discriminative រៀន P(y|x)"),
        ("- Generative models require labels; discriminative models do not", "- ម៉ូដែល Generative ត្រូវការ labels; ម៉ូដែល discriminative មិនត្រូវការទេ"),
        ("- There is no difference", "- មិនមានភាពខុសគ្នាទេ"),
        ("explanation: Generative models learn the joint distribution P(x,y) and can generate new samples, while discriminative models learn the conditional P(y|x) to classify or predict.", "explanation: ម៉ូដែល Generative រៀនពី joint distribution P(x,y) និងអាចបង្កើតគំរូថ្មីៗ ចំណែកឯម៉ូដែល discriminative រៀនពី conditional P(y|x) ដើម្បីចាត់ថ្នាក់ ឬទស្សន៍ទាយ។")
    ]
)

# what-is-llm.mdx
process_file(
    '/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/generative-ai/genai-module-3-llms/what-is-llm.mdx',
    [
        ("description: Understand what Large Language Models (LLMs) are, how they are trained, and why they represent a paradigm shift in NLP.", "description: ស្វែងយល់ថាតើម៉ូដែលភាសាធំៗ (LLMs) ជាអ្វី របៀបដែលពួកវាត្រូវបានបណ្តុះបណ្តាល និងមូលហេតុដែលពួកវាតំណាងឱ្យការផ្លាស់ប្តូរគំរូនៅក្នុង NLP។"),
        ("- Define Large Language Models and their capabilities", "- កំណត់និយមន័យម៉ូដែលភាសាធំៗ (LLMs) និងសមត្ថភាពរបស់ពួកវា"),
        ("- Explain the phases of LLM training (Pre-training vs Fine-tuning)", "- ពន្យល់ពីដំណាក់កាលនៃការបណ្តុះបណ្តាល LLM (Pre-training ធៀបនឹង Fine-tuning)"),
        ("- Identify the difference between base models and instruct/chat models", "- កំណត់ភាពខុសគ្នារវាង base models និង instruct/chat models"),
        ("question: What is the primary objective during the pre-training phase of an LLM?", "question: តើអ្វីជាគោលបំណងចម្បងក្នុងអំឡុងពេល pre-training នៃ LLM?"),
        ("- To follow human instructions safely", "- ដើម្បីធ្វើតាមការណែនាំរបស់មនុស្សដោយសុវត្ថិភាព"),
        ("- To predict the next word (token) in a massive dataset of unlabelled text", "- ដើម្បីទស្សន៍ទាយពាក្យបន្ទាប់ (token) នៅក្នុងសំណុំទិន្នន័យអត្ថបទដ៏ធំដែលមិនមានស្លាក"),
        ("- To answer specific domain questions", "- ដើម្បីឆ្លើយសំណួរជាក់លាក់តាមវិស័យ"),
        ("- To translate between two specific languages", "- ដើម្បីបកប្រែរវាងភាសាជាក់លាក់ពីរ"),
        ("explanation: Pre-training is self-supervised learning where the model simply learns to predict the next token across billions of words, building a general understanding of language and world facts.", "explanation: Pre-training គឺជាការរៀនដោយខ្លួនឯងដែលម៉ូដែលគ្រាន់តែរៀនទស្សន៍ទាយ token បន្ទាប់ឆ្លងកាត់ពាក្យរាប់ពាន់លាន ដោយបង្កើតការយល់ដឹងទូទៅអំពីភាសា និងការពិតក្នុងពិភពលោក។"),
        ("question: Why is RLHF (Reinforcement Learning from Human Feedback) used?", "question: ហេតុអ្វីបានជាគេប្រើ RLHF (Reinforcement Learning from Human Feedback)?"),
        ("- To align the model to be helpful, honest, and harmless", "- ដើម្បីតម្រឹមម៉ូដែលឱ្យមានប្រយោជន៍ ស្មោះត្រង់ និងមិនបង្កគ្រោះថ្នាក់"),
        ("- To increase the vocabulary size", "- ដើម្បីបង្កើនទំហំវាក្យសព្ទ"),
        ("- To reduce the memory footprint of the model", "- ដើម្បីកាត់បន្ថយទំហំអង្គចងចាំរបស់ម៉ូដែល"),
        ("- To allow the model to process images", "- ដើម្បីអនុញ្ញាតឱ្យម៉ូដែលដំណើរការរូបភាព"),
        ("explanation: RLHF fine-tunes the base model so that its responses align with human preferences and safety guidelines, turning a general text generator into a helpful assistant.", "explanation: RLHF ធ្វើការកែសម្រួល (fine-tunes) ម៉ូដែលមូលដ្ឋានដើម្បីឱ្យការឆ្លើយតបរបស់វាស្របតាមចំណូលចិត្តមនុស្ស និងគោលការណ៍ណែនាំសុវត្ថិភាព ដោយបំប្លែងម៉ាស៊ីនបង្កើតអត្ថបទទៅជាជំនួយការដ៏មានប្រយោជន៍។")
    ]
)

# prompt-engineering-fundamentals.mdx
process_file(
    '/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/generative-ai/genai-module-4-prompting/prompt-engineering-fundamentals.mdx',
    [
        ("description: Learn the core principles of prompt engineering — how to structure inputs to get the best possible outputs from LLMs.", "description: សិក្សាពីគោលការណ៍ស្នូលនៃ prompt engineering — របៀបរៀបចំធាតុបញ្ចូលដើម្បីទទួលបានលទ្ធផលល្អបំផុតពី LLMs។"),
        ("- Structure an effective prompt using roles, context, and formatting instructions", "- រៀបចំ prompt ដែលមានប្រសិទ្ធភាពដោយប្រើ តួនាទី បរិបទ និងការណែនាំអំពីទម្រង់"),
        ("- Apply Zero-shot and Few-shot prompting techniques", "- អនុវត្តបច្ចេកទេស Zero-shot និង Few-shot prompting"),
        ("- Prevent common hallucination triggers through prompt design", "- ការពារការបង្កឱ្យមាន hallucination តាមរយៈការរចនា prompt"),
        ("question: What is 'Few-Shot Prompting'?", "question: តើ 'Few-Shot Prompting' ជាអ្វី?"),
        ("- Prompting the model using very few words", "- ការប្រើប្រាស់ពាក្យតិចតួចបំផុតដើម្បី prompt ម៉ូដែល"),
        ("- Providing the model with a few examples of the desired input-output format within the prompt", "- ការផ្តល់ឱ្យម៉ូដែលនូវឧទាហរណ៍មួយចំនួននៃទម្រង់ input-output ដែលចង់បាននៅក្នុង prompt"),
        ("- Running the model for only a few iterations", "- ការដំណើរការម៉ូដែលសម្រាប់តែ iterations ពីរបីប៉ុណ្ណោះ"),
        ("- Asking the model to generate multiple different shots (answers)", "- ការស្នើសុំឱ្យម៉ូដែលបង្កើតចម្លើយ (shots) ផ្សេងៗគ្នាជាច្រើន"),
        ("explanation: Few-shot prompting involves giving the LLM 1 to 5 examples of the task within the prompt itself, which drastically improves its ability to follow specific formatting and logic patterns.", "explanation: Few-shot prompting ជាប់ពាក់ព័ន្ធនឹងការផ្តល់ឱ្យ LLM នូវឧទាហរណ៍ពី 1 ទៅ 5 នៃកិច្ចការនៅក្នុង prompt ផ្ទាល់ ដែលវាជួយបង្កើនសមត្ថភាពរបស់វាយ៉ាងខ្លាំងក្នុងការធ្វើតាមទម្រង់ និងលំនាំតក្កវិជ្ជាជាក់លាក់។"),
        ("question: Why is providing a 'Role' (e.g., 'Act as a senior Python developer') effective in prompting?", "question: ហេតុអ្វីបានជាការផ្តល់ 'តួនាទី (Role)' (ឧ. 'ធ្វើជា senior Python developer') មានប្រសិទ្ធភាពក្នុងការ prompting?"),
        ("- It forces the model to search the internet for developers", "- វាបង្ខំឱ្យម៉ូដែលស្វែងរកអ្នកអភិវឌ្ឍន៍នៅលើអ៊ីនធឺណិត"),
        ("- It sets the contextual space for the LLM, aligning its vocabulary, tone, and depth to a specific persona", "- វាជួយកំណត់បរិបទសម្រាប់ LLM ដោយតម្រឹមវាក្យសព្ទ សម្លេង និងជម្រៅទៅនឹងបុគ្គលិកលក្ខណៈជាក់លាក់មួយ"),
        ("- It makes the model execute faster", "- វាធ្វើឱ្យម៉ូដែលដំណើរការលឿនជាងមុន"),
        ("- It unlocks hidden parameters in the model", "- វាដោះសោប៉ារ៉ាម៉ែត្រដែលលាក់នៅក្នុងម៉ូដែល"),
        ("explanation: Assigning a persona narrows the probabilistic distribution of words the model will generate, focusing it on terms, tone, and expertise appropriate for that role.", "explanation: ការកំណត់បុគ្គលិកលក្ខណៈជួយបង្រួញការចែកចាយប្រូបាប៊ីលីតេនៃពាក្យដែលម៉ូដែលនឹងបង្កើត ដោយផ្តោតលើពាក្យ សម្លេង និងជំនាញដែលសមស្របសម្រាប់តួនាទីនោះ។")
    ]
)

print("Finished translating custom frontmatters.")
