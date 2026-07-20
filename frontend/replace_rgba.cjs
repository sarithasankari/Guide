const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));

let replacementsCount = 0;

files.forEach(file => {
  if (file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.js')) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace rgba(255, 255, 255, alpha) -> rgba(245, 245, 220, alpha)
    content = content.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,/gi, "rgba(245, 245, 220,");
    
    // Replace rgb(255, 255, 255) -> rgb(245, 245, 220)
    content = content.replace(/rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)/gi, "rgb(245, 245, 220)");

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      replacementsCount++;
      console.log(`Updated ${file}`);
    }
  }
});

console.log(`Total files updated for rgba: ${replacementsCount}`);
