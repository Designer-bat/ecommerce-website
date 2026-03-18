import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the feature products block
    # We look for <section id="product1"...> up to </section>
    # Since there are multiple, we replace <div class="pro-container">...</div> with empty
    
    # We will replace the first occurrence (Featured Products)
    content = re.sub(
        r'(<h2>Featured Products</h2>\s*<p>.*?<div class="pro-container").*?(</div>\s*</section>)',
        r'\1 id="featured-products">\n        \2',
        content,
        flags=re.DOTALL
    )

    # Replace the second occurrence (New Arrivals)
    content = re.sub(
        r'(<h2>New Arrivals</h2>\s*<p>.*?<div class="pro-container").*?(</div>\s*</section>)',
        r'\1 id="new-arrivals">\n        \2',
        content,
        flags=re.DOTALL
    )
    # Add script tag
    content = content.replace('<script src="script.js"></script>', '<script src="products.js"></script>\n    <script src="script.js"></script>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('index.html')
