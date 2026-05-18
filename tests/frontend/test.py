#GENERAR LISTA DE ARCHIVOS Y CARPETAS DE FORMA GERARQUICA 


import os
import sys

def generate_tree(startpath, exclude="node_modules"):
    startpath = os.path.abspath(startpath)
    for root, dirs, files in os.walk(startpath):
        if exclude in dirs:
            dirs.remove(exclude)
        level = root.replace(startpath, "").count(os.sep)
        indent = "│   " * level
        print(f"{indent}├── {os.path.basename(root)}/")
        subindent = "│   " * (level + 1)
        for f in files:
            print(f"{subindent}├── {f}")

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "."
    generate_tree(path)