import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function addJsExtension(filePath) {
  if (filePath.endsWith('.js')) {
    let content = readFileSync(filePath, 'utf8');
    content = content.replace(/from\s+['"]([^'"]+)['"]/g, (match, p1) => {
      if (p1.startsWith('.') && !p1.endsWith('.js')) {
        return match.replace(p1, `${p1}.js`);
      }
      return match;
    });
    writeFileSync(filePath, content, 'utf8');
  }
}

function walkDir(dir) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      addJsExtension(fullPath);
    }
  }
}

walkDir('./dist/esm');