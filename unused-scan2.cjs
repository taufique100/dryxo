const fs = require('fs');
const path = require('path');
const root = process.cwd();
function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(p)); else files.push(p);
  }
  return files;
}
const all = walk(root);
const assetExts = new Set(['.png','.jpg','.jpeg','.gif','.svg','.webp','.mp4','.ico','.pdf','.bmp']);
const codeExts = new Set(['.js','.jsx','.ts','.tsx','.css','.scss','.html','.json']);
const assets = all.filter(f => assetExts.has(path.extname(f).toLowerCase()));
const codeFiles = all.filter(f => codeExts.has(path.extname(f).toLowerCase()));
const contents = {};
for (const f of codeFiles) {
  try { contents[f] = fs.readFileSync(f, 'utf8'); }
  catch (err) { contents[f] = ''; }
}
function searchAll(pattern) {
  return Object.values(contents).some(c => c.includes(pattern));
}
function getSearchPatterns(file) {
  const relRoot = path.relative(root, file).replace(/\\/g,'/');
  const relSrc = relRoot.replace(/^src\//, '');
  const noExt = relSrc.replace(/\.[^.]+$/, '');
  const basename = path.basename(file);
  const dirPart = path.dirname(noExt);
  const patterns = new Set();
  patterns.add(basename);
  patterns.add(noExt);
  if (dirPart !== '.') patterns.add(dirPart);
  const parts = noExt.split('/');
  for (let i = 0; i < parts.length; i++) {
    patterns.add(parts.slice(i).join('/'));
  }
  return Array.from(patterns);
}
const unusedAssets = assets.filter(f => {
  const patterns = getSearchPatterns(f);
  return !patterns.some(p => searchAll(p));
});
const possibleUnusedCode = all.filter(f => ['.js','.jsx','.ts','.tsx'].includes(path.extname(f).toLowerCase())).filter(f => {
  const relRoot = path.relative(root, f).replace(/\\/g,'/');
  const safe = ['src/App.jsx','src/main.jsx','src/routes.jsx','src/ProtectedRoute.jsx'];
  if (safe.includes(relRoot)) return false;
  if (relRoot.startsWith('src/Store/')) return false;
  const patterns = getSearchPatterns(f);
  return !patterns.some(p => searchAll(p));
});
console.log('TOTAL ASSETS', assets.length);
console.log('UNUSED ASSETS', unusedAssets.length);
unusedAssets.forEach(f => console.log(f));
console.log('TOTAL CODE FILES', codeFiles.length);
console.log('POSSIBLE UNUSED CODE FILES', possibleUnusedCode.length);
possibleUnusedCode.forEach(f => console.log(f));
