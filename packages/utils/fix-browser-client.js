const fs = require('fs');
const path = require('path');

//!note: you are in a cjs module and the this export is intended for use by a bundler. Hence not fixing of the 'js' extensions =>you may need to if you change the dev environment consuming this client

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
