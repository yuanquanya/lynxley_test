import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text_from_docx(docx_path):
    with zipfile.ZipFile(docx_path) as docx:
        tree = ET.XML(docx.read('word/document.xml'))
        namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        return '\n'.join([node.text for node in tree.iterfind('.//w:t', namespaces) if node.text])

if __name__ == '__main__':
    try:
        text = extract_text_from_docx(sys.argv[1])
        with open('extracted_text.txt', 'w', encoding='utf-8') as f:
            f.write(text)
    except Exception as e:
        print("Error:", e)
