import re

def process_file(path):
    with open(path, 'r') as f:
        content = f.read()

    # Generic frontmatter translations
    content = content.replace("description: Understand why non-linear activation functions are essential, compare ReLU, sigmoid, tanh, Leaky ReLU, and GELU, and know when to use each one.", "description: ស្វែងយល់ពីមូលហេតុដែលអនុគមន៍សកម្មភាពមិនមែនលីនេអ៊ែរមានសារៈសំខាន់ ប្រៀបធៀប ReLU, sigmoid, tanh, Leaky ReLU និង GELU ព្រមទាំងដឹងថាពេលណាត្រូវប្រើពួកវានីមួយៗ។")
    content = content.replace("- Explain why activation functions are necessary in neural networks", "- ពន្យល់ពីមូលហេតុដែលអនុគមន៍សកម្មភាព (activation functions) ចាំបាច់នៅក្នុង neural networks")
    content = content.replace("- Compare the properties and gradient behaviour of common activation functions", "- ប្រៀបធៀបលក្ខណៈសម្បត្តិ និងឥរិយាបថ gradient នៃអនុគមន៍សកម្មភាពទូទៅ")
    content = content.replace("- Choose the right activation function for hidden layers and output layers", "- ជ្រើសរើសអនុគមន៍សកម្មភាពដែលត្រឹមត្រូវសម្រាប់ hidden layers និង output layers")
    
    content = content.replace("question: Why do neural networks need non-linear activation functions?", "question: ហេតុអ្វីបានជា neural networks ត្រូវការអនុគមន៍សកម្មភាពមិនមែនលីនេអ៊ែរ (non-linear activation functions)?")
    content = content.replace("- To speed up training", "- ដើម្បីពន្លឿនការបណ្តុះបណ្តាល")
    content = content.replace("- Without non-linearity, a deep network collapses to a single linear transformation regardless of depth", "- ប្រសិនបើគ្មានភាពមិនមែនលីនេអ៊ែរទេ បណ្តាញជ្រៅមួយ (deep network) នឹងដួលរលំទៅជាបំប្លែងលីនេអ៊ែរតែមួយ ដោយមិនគិតពីជម្រៅរបស់វាឡើយ")
    content = content.replace("- To normalise the outputs between 0 and 1", "- ដើម្បីធ្វើឱ្យលទ្ធផលត្រលប់មកចន្លោះពី 0 ទៅ 1")
    content = content.replace("- To reduce the number of parameters", "- ដើម្បីកាត់បន្ថយចំនួនប៉ារ៉ាម៉ែត្រ")
    
    content = content.replace("explanation: Without non-linear activations, stacking multiple layers is equivalent to a single linear transformation (W1·W2·...·Wn is just another matrix). Non-linearity is what gives deep networks their ability to learn complex, hierarchical representations.", "explanation: ប្រសិនបើគ្មានសកម្មភាពមិនមែនលីនេអ៊ែរទេ ការរៀបស្រទាប់ជាច្រើនគឺស្មើនឹងការបំប្លែងលីនេអ៊ែរតែមួយប៉ុណ្ណោះ (W1·W2·...·Wn គ្រាន់តែជាម៉ាទ្រីសមួយផ្សេងទៀត)។ ភាពមិនមែនលីនេអ៊ែរគឺជាអ្វីដែលផ្តល់ឱ្យបណ្តាញជ្រៅនូវសមត្ថភាពក្នុងការរៀនពីរចនាសម្ព័ន្ធស្មុគស្មាញ និងមានឋានានុក្រម។")
    
    content = content.replace("question: What is the vanishing gradient problem with sigmoid/tanh activations?", "question: តើអ្វីទៅជាបញ្ហា vanishing gradient ជាមួយនឹងសកម្មភាព sigmoid/tanh?")
    content = content.replace("- The gradients become too large and cause instability", "- Gradients ក្លាយជាធំពេក ហើយបណ្តាលឱ្យមានអស្ថិរភាព")
    content = content.replace("- For saturated inputs (very large or very small), the derivative is near zero — gradients vanish as they propagate back through many layers", "- សម្រាប់ធាតុបញ្ចូលដែលឆ្អែត (ធំពេក ឬតូចពេក) ដេរីវេគឺជិតសូន្យ — gradients បាត់ទៅវិញនៅពេលដែលពួកវាសាយភាយត្រលប់មកវិញតាមរយៈស្រទាប់ជាច្រើន")
    content = content.replace("- The functions are not differentiable", "- អនុគមន៍មិនអាចធ្វើដេរីវេបានទេ")
    content = content.replace("- The outputs are not centred at zero", "- លទ្ធផលមិនត្រូវបានដាក់នៅចំកណ្តាលត្រង់ចំណុចសូន្យទេ")

    content = content.replace("explanation: Sigmoid and tanh saturate (output near 0 or 1, or -1 or 1) for large input magnitudes. In these regions the derivative approaches 0, so gradients multiplied through many layers shrink exponentially — making deep networks very hard to train.", "explanation: Sigmoid និង tanh ឆ្អែត (លទ្ធផលជិត 0 ឬ 1 ឬ -1 ឬ 1) សម្រាប់ទំហំបញ្ចូលធំៗ។ នៅក្នុងតំបន់ទាំងនេះ ដេរីវេខិតជិត 0 ដូច្នេះ gradients ដែលគុណតាមរយៈស្រទាប់ជាច្រើនរួមតូចជាអិចស្ប៉ូណង់ស្យែល — ធ្វើឱ្យបណ្តាញជ្រៅ (deep networks) ពិបាកហ្វឹកហាត់យ៉ាងខ្លាំង។")
    
    with open(path, 'w') as f:
        f.write(content)

process_file('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/deep-learning/dl-module-4-fundamentals/activation-functions.mdx')

