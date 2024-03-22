const fs = require('fs');
const path = require('path');

function updateImportPaths(filePath) {
  if (filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // This will replace all occurrences of /dist/cjs with /dist/esm in the file's content
    content = content.replaceAll('/dist/cjs', '/dist/esm');
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      updateImportPaths(fullPath);
    }
  }
}

walkDir('./dist/browser');
