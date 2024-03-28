const fs = require('fs');
const path = require('path');

function addJsExtension(filePath) {
  if (filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/from\s+['"]([^'"]+)['"]/g, (match, p1) => {
      if (p1.startsWith('.') && !p1.endsWith('.js')) {
        return match.replace(p1, `${p1}.js`);
      }
      return match;
    });
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
      addJsExtension(fullPath);
    }
  }
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function writePackageJson(filePath, jsonData) {
  ensureDirectoryExistence(filePath);
  fs.writeFileSync(filePath, JSON.stringify(jsonData), 'utf8');
}

try {
  //fix export statements
  walkDir('./dist/esm');

  //ESM
  writePackageJson('./dist/esm/package.json', { type: 'module' });

  //CJS
  writePackageJson('./dist/cjs/package.json', { type: 'commonjs' });

  console.log('Postbuild script completed successfully.');
} catch (error) {
  console.error('Error occurred during postbuild script:', error);
}
