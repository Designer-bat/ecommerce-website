import os
import glob

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '<link rel="stylesheet" href="modern.css">' not in content:
        # replace </head> with the link and </head>
        content = content.replace('</head>', '    <link rel="stylesheet" href="modern.css">\n</head>')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
    else:
        print(f"Skipped {file} (already updated)")
