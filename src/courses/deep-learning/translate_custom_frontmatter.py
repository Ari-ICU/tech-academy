import re

def process_file(path):
    with open(path, 'r') as f:
        content = f.read()

    # Generic frontmatter translations
    content = content.replace("description: Understand how neural networks learn — the backpropagation algorithm, chain rule of calculus, and the optimisers that extend gradient descent.", "description: ស្វែងយល់ពីរបៀបដែល neural networks រៀន — ក្បួនដោះស្រាយ backpropagation, chain rule, និង optimisers ដែលពង្រីក gradient descent។")
    content = content.replace("- Explain the forward pass and backward pass in a neural network", "- ពន្យល់ពី forward pass និង backward pass នៅក្នុង neural network")
    content = content.replace("- Apply the chain rule to compute gradients through multiple layers", "- អនុវត្ត chain rule ដើម្បីគណនា gradients តាមរយៈស្រទាប់ជាច្រើន")
    content = content.replace("- Compare SGD, Momentum, RMSProp, and Adam optimisers", "- ប្រៀបធៀប optimisers SGD, Momentum, RMSProp, និង Adam")
    
    content = content.replace("question: What does backpropagation compute?", "question: តើ backpropagation គណនាអ្វី?")
    content = content.replace("- The forward pass predictions", "- ការទស្សន៍ទាយ (predictions) នៃ forward pass")
    content = content.replace("- The gradient of the loss with respect to every weight in the network", "- gradient នៃការបាត់បង់ (loss) ធៀបនឹង weight នីមួយៗនៅក្នុងបណ្តាញ")
    content = content.replace("- The optimal learning rate", "- អត្រារៀន (learning rate) ដ៏ល្អបំផុត")
    content = content.replace("- The number of neurons needed per layer", "- ចំនួន neurons ដែលត្រូវការក្នុងមួយស្រទាប់")
    
    content = content.replace("question: What problem does the Adam optimiser solve compared to vanilla SGD?", "question: តើ Adam optimiser ដោះស្រាយបញ្ហាអ្វីខ្លះបើប្រៀបធៀបទៅនឹង vanilla SGD?")
    content = content.replace("- Adam uses less memory", "- Adam ប្រើប្រាស់អង្គចងចាំតិចជាង")
    content = content.replace("- Adam adapts the learning rate for each parameter individually, leading to faster and more stable convergence", "- Adam សម្របអត្រារៀនសម្រាប់ប៉ារ៉ាម៉ែត្រនីមួយៗដាច់ដោយឡែក ដែលនាំឱ្យ convergence លឿន និងមានស្ថិរភាពជាងមុន")
    content = content.replace("- Adam removes the need for backpropagation", "- Adam លុបបំបាត់តម្រូវការសម្រាប់ backpropagation")
    content = content.replace("- Adam works without gradients", "- Adam ដំណើរការដោយគ្មាន gradients")

    content = content.replace("description: Understand how CNNs exploit spatial structure in images using convolution, pooling, and learned filters — the architecture behind modern computer vision.", "description: ស្វែងយល់ពីរបៀបដែល CNNs ទាញយកអត្ថប្រយោជន៍ពីរចនាសម្ព័ន្ធលំហក្នុងរូបភាពដោយប្រើ convolution, pooling, និង learned filters ដែលជារចនាសម្ព័ន្ធនៅពីក្រោយ computer vision ទំនើប។")
    content = content.replace("- Explain how a convolution operation detects spatial features in images", "- ពន្យល់ពីរបៀបដែលប្រតិបត្តិការ convolution ចាប់យកលក្ខណៈពិសេសលំហក្នុងរូបភាព")
    content = content.replace("- Describe the role of pooling layers and activation functions in CNNs", "- ពណ៌នាពីតួនាទីរបស់ស្រទាប់ pooling និងអនុគមន៍សកម្មភាពនៅក្នុង CNNs")
    content = content.replace("- Build and train a CNN for image classification with PyTorch", "- បង្កើត និងបណ្តុះបណ្តាល CNN សម្រាប់ការចាត់ថ្នាក់រូបភាពជាមួយ PyTorch")
    
    content = content.replace("question: What does a 3×3 convolutional filter learn to detect?", "question: តើ 3×3 convolutional filter រៀនដើម្បីចាប់យកអ្វី?")
    content = content.replace("- Global patterns across the entire image", "- លំនាំសកលនៅទូទាំងរូបភាពទាំងមូល")
    content = content.replace("- Local spatial patterns (edges, textures, shapes) in a 3×3 neighbourhood", "- លំនាំលំហក្នុងតំបន់ (គែម វាយនភាព រាង) នៅក្នុងជិតខាង 3×3")
    content = content.replace("- The average pixel value in the image", "- តម្លៃភីកសែលមធ្យមនៅក្នុងរូបភាព")
    content = content.replace("- The class label of the image", "- ស្លាកចំណាត់ថ្នាក់ (class label) នៃរូបភាព")
    
    content = content.replace("question: What is the purpose of max pooling?", "question: តើគោលបំណងនៃ max pooling គឺជាអ្វី?")
    content = content.replace("- To increase the spatial resolution of feature maps", "- ដើម្បីបង្កើនកម្រិតភាពច្បាស់ (spatial resolution) នៃ feature maps")
    content = content.replace("- To reduce spatial dimensions, create translation invariance, and reduce computation", "- ដើម្បីកាត់បន្ថយវិមាត្រលំហ បង្កើតភាពមិនប្រែប្រួលនៃការបកប្រែ (translation invariance) និងកាត់បន្ថយការគណនា")
    content = content.replace("- To normalise pixel values between 0 and 1", "- ដើម្បីធ្វើឱ្យតម្លៃភីកសែលធម្មតារវាង 0 និង 1")
    content = content.replace("- To add non-linearity", "- ដើម្បីបន្ថែមភាពមិនមែនលីនេអ៊ែរ (non-linearity)")

    with open(path, 'w') as f:
        f.write(content)

process_file('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/deep-learning/dl-module-4-fundamentals/backpropagation.mdx')
process_file('/Users/thoeurnratha/Documents/web-development/data-science/platform/src/courses/deep-learning/dl-module-8-cnn/introduction-to-cnns.mdx')
