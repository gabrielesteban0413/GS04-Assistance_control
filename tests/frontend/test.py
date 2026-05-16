# convert_to_typescript.py
import os
import re
from pathlib import Path

def convert_js_to_ts(root_dir='.'):
    """
    Convierte archivos .jsx a .tsx y .js a .ts
    Omite node_modules y archivos de configuración
    """
    root_path = Path(root_dir)
    
    # Extensiones a convertir
    conversions = {
        '.jsx': '.tsx',
        '.js': '.ts'
    }
    
    # Archivos a excluir (configuraciones, build, etc)
    exclude_patterns = [
        'node_modules',
        'dist',
        'build',
        '.git',
        'vite.config.js',  # Lo manejaremos aparte
        'eslint.config.js'
    ]
    
    renamed_files = []
    
    for ext_from, ext_to in conversions.items():
        for file_path in root_path.rglob(f'*{ext_from}'):
            # Verificar exclusiones
            if any(excl in str(file_path) for excl in exclude_patterns):
                continue
            
            # Nuevo nombre del archivo
            new_path = file_path.with_suffix(ext_to)
            
            # Leer contenido y actualizar imports
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Actualizar imports de archivos .jsx/.js a .tsx/.ts
            content = re.sub(
                r"from ['\"](.*?)\.jsx(['\"])",
                r"from '\1.tsx\2'",
                content
            )
            content = re.sub(
                r"from ['\"](.*?)\.js(['\"])",
                r"from '\1.ts\2'",
                content
            )
            
            # Agregar tipos básicos (puedes ajustar según necesidades)
            if ext_from == '.jsx' and 'React' in content:
                if "import React from 'react'" not in content:
                    content = "import React from 'react'\n" + content
            
            # Escribir nuevo archivo
            with open(new_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            # Eliminar archivo original
            file_path.unlink()
            
            renamed_files.append(f"{file_path} → {new_path}")
            print(f"✅ Convertido: {file_path} → {new_path}")
    
    return renamed_files

def update_config_files(root_dir='.'):
    """Actualiza archivos de configuración para TypeScript"""
    root_path = Path(root_dir)
    
    # Actualizar package.json
    package_json = root_path / 'package.json'
    if package_json.exists():
        import json
        with open(package_json, 'r') as f:
            pkg = json.load(f)
        
        # Agregar dependencias de TypeScript
        dev_deps = pkg.get('devDependencies', {})
        dev_deps.update({
            'typescript': '^5.0.0',
            '@types/react': '^18.0.0',
            '@types/react-dom': '^18.0.0',
            '@types/node': '^20.0.0'
        })
        pkg['devDependencies'] = dev_deps
        
        with open(package_json, 'w') as f:
            json.dump(pkg, f, indent=2)
        print("✅ Actualizado package.json")
    
    # Crear tsconfig.json
    tsconfig = {
        "compilerOptions": {
            "target": "ES2020",
            "useDefineForClassFields": True,
            "lib": ["ES2020", "DOM", "DOM.Iterable"],
            "module": "ESNext",
            "skipLibCheck": True,
            "moduleResolution": "bundler",
            "allowImportingTsExtensions": True,
            "resolveJsonModule": True,
            "isolatedModules": True,
            "noEmit": True,
            "jsx": "react-jsx",
            "strict": True,
            "noUnusedLocals": True,
            "noUnusedParameters": True,
            "noFallthroughCasesInSwitch": True,
            "baseUrl": ".",
            "paths": {
                "@/*": ["src/*"]
            }
        },
        "include": ["src"],
        "references": [{"path": "./tsconfig.node.json"}]
    }
    
    with open(root_path / 'tsconfig.json', 'w') as f:
        json.dump(tsconfig, f, indent=2)
    print("✅ Creado tsconfig.json")
    
    # Crear tsconfig.node.json
    tsconfig_node = {
        "compilerOptions": {
            "composite": True,
            "skipLibCheck": True,
            "module": "ESNext",
            "moduleResolution": "bundler",
            "allowSyntheticDefaultImports": True
        },
        "include": ["vite.config.ts"]
    }
    
    with open(root_path / 'tsconfig.node.json', 'w') as f:
        json.dump(tsconfig_node, f, indent=2)
    print("✅ Creado tsconfig.node.json")
    
    # Actualizar vite.config.js a vite.config.ts
    vite_js = root_path / 'vite.config.js'
    if vite_js.exists():
        with open(vite_js, 'r') as f:
            vite_content = f.read()
        
        vite_content = vite_content.replace(
            "export default defineConfig({",
            "export default defineConfig({\n  server: {\n    port: 3000\n  },"
        )
        
        with open(root_path / 'vite.config.ts', 'w') as f:
            f.write(vite_content)
        
        vite_js.unlink()
        print("✅ Convertido vite.config.js → vite.config.ts")

def create_type_declarations(root_dir='.'):
    """Crea archivos de declaración de tipos"""
    root_path = Path(root_dir)
    src_path = root_path / 'src'
    
    # Crear vite-env.d.ts
    vite_env = src_path / 'vite-env.d.ts'
    with open(vite_env, 'w') as f:
        f.write("""/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // más variables de entorno aquí
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
""")
    print("✅ Creado src/vite-env.d.ts")
    
    # Crear types declaration para CSS modules (si usas)
    css_decl = src_path / 'declarations.d.ts'
    with open(css_decl, 'w') as f:
        f.write("""declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}
""")
    print("✅ Creado src/declarations.d.ts")

if __name__ == "__main__":
    import json
    
    print("=== CONVIRTIENDO A TYPESCRIPT ===\n")
    
    # Ejecutar conversión
    renamed = convert_js_to_ts('.')
    
    print(f"\n📊 Resumen: {len(renamed)} archivos convertidos\n")
    
    # Actualizar configuraciones
    update_config_files('.')
    
    # Crear declaraciones de tipos
    create_type_declarations('.')
    
    print("\n" + "="*50)
    print("✅ CONVERSIÓN COMPLETADA")
    print("="*50)
    print("\n📦 Para instalar dependencias, ejecuta:")
    print("npm install --save-dev typescript @types/react @types/react-dom @types/node")
    print("\n🚀 Luego ejecuta:")
    print("npm run dev")