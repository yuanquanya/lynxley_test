import re
import json

def update_file():
    with open('src/constants.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace categories for questions 1-10 in Set 1&2 and 1-6 in Set 3
    # Wait, the simplest way is to just replace all first, then explicitly set for the replaced ones
    categories = [
        "核心概念", "原理解析", "综合应用", 
        "安全基础", "问题测算", "逻辑推理", "案例分析"
    ]
    for cat in categories:
        content = content.replace(f"category: '{cat}'", "category: '单选题'")
        
    with open('src/constants.ts', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    update_file()
