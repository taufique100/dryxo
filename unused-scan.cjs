const fs = require('fs');
const path = require('path');
const root = process.cwd();
const exts = ['.js','.jsx','.ts','.tsx','.css','.scss','.html','.json','.md'];
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
const assets = all.filter(f => ['.png','.jpg','.jpeg','.gif','.svg','.webp','.mp4','.ico','.pdf','.bmp'].includes(path.extname(f).toLowerCase()));
const codeFiles = all.filter(f => ['.js','.jsx','.ts','.tsx','.css','.scss','.html','.json'].includes(path.extname(f).toLowerCase()));
const contents = {};
for (const f of codeFiles) {    
  try {
    contents[f] = fs.readFileSync(f, 'utf8');
  } catch (err) {
    contents[f] = '';
  }
}
function isReferenced(file) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const basename = path.basename(file);
  const patterns = [rel, `./${rel}`, `../${rel}`, basename];
  for (const c of Object.values(contents)) {
    for (const pat of patterns) {
      if (pat && c.includes(pat)) return true;
    }
  }
  return false;
}
const unusedAssets = assets.filter(f => {
  if (f.includes('/public/')) {
    const base = path.basename(f);
    for (const c of Object.values(contents)) if (c.includes(base)) return false;
    return true;
  }
  return !isReferenced(f);
});
const possibleUnusedCode = all.filter(f => ['.js','.jsx','.ts','.tsx'].includes(path.extname(f).toLowerCase())).filter(f => {
  const safe = [path.join(root,'src','App.jsx'), path.join(root,'src','main.jsx'), path.join(root,'src','routes.jsx'), path.join(root,'src','ProtectedRoute.jsx')];
  if (safe.includes(f)) return false;
  if (f.includes('src/Store')) return false;
  return !isReferenced(f);
});
console.log('TOTAL ASSETS', assets.length);
console.log('UNUSED ASSETS', unusedAssets.length);
unusedAssets.forEach(f => console.log(f));
console.log('TOTAL CODE FILES', codeFiles.length);
console.log('POSSIBLE UNUSED CODE FILES', possibleUnusedCode.length);
possibleUnusedCode.forEach(f => console.log(f));
