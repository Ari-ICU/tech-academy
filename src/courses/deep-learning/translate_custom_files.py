import re

def rewrite_what_is_deep_learning():
    path = '/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/deep-learning/dl-module-1-introduction/what-is-deep-learning.mdx'
    with open(path, 'r') as f:
        content = f.read()

    # Frontmatter
    content = re.sub(r'description: Understand deep learning as a subfield of machine learning that uses multi-layered neural networks to learn hierarchical representations from data\.', r'description: ស្វែងយល់អំពី deep learning ដែលជាផ្នែកមួយនៃ machine learning ដែលប្រើប្រាស់ neural networks មានច្រើនស្រទាប់ ដើម្បីរៀនពីឋានានុក្រមទិន្នន័យ។', content)
    content = content.replace("- Explain how deep learning differs from classical machine learning", "- ពន្យល់ពីភាពខុសគ្នារវាង deep learning និង classical machine learning")
    content = content.replace("- Describe the role of layers and representations in a neural network", "- ពណ៌នាពីតួនាទីរបស់ស្រទាប់ (layers) និងការតំណាង (representations) នៅក្នុង neural network")
    content = content.replace("- Identify when deep learning is the right tool", "- កំណត់ពេលដែល deep learning គឺជាឧបករណ៍ត្រឹមត្រូវ")

    content = content.replace("question: What distinguishes deep learning from classical machine learning?", "question: តើអ្វីដែលធ្វើឱ្យ deep learning ខុសពី classical machine learning?")
    content = content.replace("- Deep learning does not require data", "- Deep learning មិនត្រូវការទិន្នន័យទេ")
    content = content.replace("- Deep learning learns hierarchical feature representations automatically", "- Deep learning រៀនពីឋានានុក្រមលក្ខណៈពិសេស (hierarchical feature representations) ដោយស្វ័យប្រវត្តិ")
    content = content.replace("- Deep learning always runs faster", "- Deep learning តែងតែដំណើរការលឿនជាង")
    content = content.replace("- Deep learning can only handle images", "- Deep learning អាចចាត់ចែងបានតែរូបភាពប៉ុណ្ណោះ")
    
    content = re.sub(r'explanation: The key distinction is that deep learning models learn to construct their own feature representations through multiple layers, rather than relying on hand-crafted features\.', r'explanation: ភាពខុសគ្នាសំខាន់គឺ ម៉ូដែល deep learning រៀនបង្កើត feature representations ដោយខ្លួនឯងតាមរយៈស្រទាប់ជាច្រើន ជាជាងការពឹងផ្អែកលើ features ដែលបង្កើតដោយមនុស្ស។', content)

    # Body
    content = content.replace("##  Overview", "## 🌐 ទិដ្ឋភាពទូទៅ")
    content = content.replace("Deep learning is the technology behind image recognition, speech synthesis, large language models, and protein structure prediction. It achieves this by stacking many layers of transformations that progressively extract more abstract representations from raw data.", "Deep learning គឺជាបច្ចេកវិទ្យានៅពីក្រោយការសម្គាល់រូបភាព ការសំយោគសំឡេង ម៉ូដែលភាសាធំៗ និងការទស្សន៍ទាយរចនាសម្ព័ន្ធប្រូតេអ៊ីន។ វាសម្រេចបាននូវចំណុចនេះដោយការរៀបចំស្រទាប់នៃការបំប្លែងជាច្រើនដែលទាញយកតំណាងអរូបីកាន់តែច្រើនឡើងៗពីទិន្នន័យដើម។")
    
    content = re.sub(r'<khmerblock>\n(.*?)\n</khmerblock>', r'\1', content, flags=re.DOTALL)

    content = content.replace("## 💡 The Core Idea", "## 💡 គំនិតសំខាន់")
    content = content.replace("In classical ML, a practitioner hand-engineers features: for image spam detection, you might write rules like \"flag images with red backgrounds and certain text patterns.\" In deep learning, you feed raw pixels and the network discovers on its own which pixel patterns matter — from edges, to shapes, to objects, to context.", "នៅក្នុង classical ML អ្នកអនុវត្តបង្កើត features ដោយដៃ៖ សម្រាប់ការចាប់យកសារឥតបានការនៃរូបភាព អ្នកប្រហែលជាសរសេរច្បាប់ដូចជា \"ដាក់ទង់រូបភាពដែលមានផ្ទៃខាងក្រោយពណ៌ក្រហម និងលំនាំអត្ថបទជាក់លាក់\"។ នៅក្នុង deep learning អ្នកបញ្ចូលភីកសែលដើម (raw pixels) ហើយបណ្តាញរកឃើញដោយខ្លួនឯងថាតើលំនាំភីកសែលមួយណាដែលសំខាន់ — ពីគែម, ទៅជារាង, ទៅជាវត្ថុ, ទៅជាបរិបទ។")
    
    content = content.replace("Each layer learns a slightly more abstract version of the input. A CNN processing a face image might learn:\n- **Layer 1**: edges and colour gradients\n- **Layer 2**: corners and textures\n- **Layer 3**: facial features (eyes, nose)\n- **Layer 4**: faces vs non-faces", "ស្រទាប់នីមួយៗរៀនពីកំណែអរូបីបន្ថែមទៀតនៃធាតុបញ្ចូល។ CNN ដែលដំណើរការរូបភាពមុខអាចរៀន៖\n- **ស្រទាប់ទី 1**: គែម និង gradients ពណ៌\n- **ស្រទាប់ទី 2**: ជ្រុង និងវាយនភាព\n- **ស្រទាប់ទី 3**: លក្ខណៈផ្ទៃមុខ (ភ្នែក, ច្រមុះ)\n- **ស្រទាប់ទី 4**: មុខ vs មិនមែនមុខ")
    
    content = content.replace("## 📖 In Depth", "## 📖 ការសិក្សាស៊ីជម្រៅ")
    content = content.replace("A deep neural network is a composition of parameterised functions:", "បណ្តាញ deep neural network គឺជាសមាសធាតុនៃអនុគមន៍ parameterised៖")
    content = content.replace("Each layer $f_l$ computes:", "ស្រទាប់នីមួយៗ $f_l$ គណនា៖")
    content = content.replace("where $W_l$ is a weight matrix, $b_l$ is a bias vector, and $\\sigma$ is a non-linear activation function (ReLU, sigmoid, etc.).", "ដែល $W_l$ គឺជា weight matrix, $b_l$ គឺជា bias vector, និង $\\sigma$ គឺជាអនុគមន៍សកម្មភាពមិនមែនលីនេអ៊ែរ (ReLU, sigmoid, ។ល។)។")

    content = content.replace("## 🔢 The Math", "## 🔢 គណិតវិទ្យា")
    content = content.replace("The depth of a network is what gives it **representational power**. The universal approximation theorem states that a single-layer network can approximate any continuous function — but in practice, depth allows exponentially more efficient representations:", "ជម្រៅនៃបណ្តាញគឺជាអ្វីដែលផ្តល់ឱ្យវា **representational power**។ ទ្រឹស្តីបទ universal approximation ចែងថាបណ្តាញដែលមានស្រទាប់តែមួយអាចប៉ាន់ប្រមាណមុខងារជាបន្តបន្ទាប់ — ប៉ុន្តែនៅក្នុងការអនុវត្ត ជម្រៅអនុញ្ញាតឱ្យមានការតំណាងឱ្យកាន់តែមានប្រសិទ្ធភាព៖")
    
    content = content.replace("A function requiring $2^n$ parameters in a shallow network may require only $O(n)$ parameters in a deep network.", "មុខងារដែលត្រូវការប៉ារ៉ាម៉ែត្រ $2^n$ នៅក្នុងបណ្តាញរាក់ អាចត្រូវការប៉ារ៉ាម៉ែត្រតែ $O(n)$ ប៉ុណ្ណោះនៅក្នុងបណ្តាញជ្រៅ។")
    
    content = content.replace("Training minimises the loss $\\mathcal{L}$ via **gradient descent** using **backpropagation**:", "ការបណ្តុះបណ្តាលកាត់បន្ថយការបាត់បង់ (loss) $\\mathcal{L}$ តាមរយៈ **gradient descent** ដោយប្រើ **backpropagation**៖")
    
    content = content.replace("where $\\eta$ is the learning rate.", "ដែល $\\eta$ គឺជាអត្រានៃការរៀន (learning rate)។")

    content = content.replace("## 💻 Code", "## 💻 កូដ")
    content = content.replace("## ✅ Key Takeaways", "## ✅ ចំណុចសំខាន់ៗដែលត្រូវចាំ")
    content = content.replace("Deep learning uses stacked layers of transformations to automatically learn hierarchical representations. It removes the need for manual feature engineering and scales powerfully with data and compute. The core mechanism is end-to-end training with backpropagation, minimising a loss function over the training data.", "Deep learning ប្រើប្រាស់ស្រទាប់នៃការបំប្លែងដែលបានជង់គ្នា ដើម្បីរៀនពីឋានានុក្រមដោយស្វ័យប្រវត្តិ។ វាលុបបំបាត់តម្រូវការសម្រាប់ការរៀបចំ features ដោយដៃ ហើយវាដំណើរការយ៉ាងមានអានុភាពជាមួយទិន្នន័យ និងការគណនា។ យន្តការស្នូលគឺការបណ្តុះបណ្តាល end-to-end ជាមួយ backpropagation ដោយកាត់បន្ថយអនុគមន៍ loss លើទិន្នន័យបណ្តុះបណ្តាល។")

    with open(path, 'w') as f:
        f.write(content)

rewrite_what_is_deep_learning()
