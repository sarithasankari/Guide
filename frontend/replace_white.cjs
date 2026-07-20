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

    // Replace 'white' or "white"
    content = content.replace(/'white'/g, "'beige'");
    content = content.replace(/"white"/g, '"beige"');
    
    // Replace #fff and #ffffff
    content = content.replace(/#ffffff\b/gi, "#f5f5dc");
    content = content.replace(/#fff\b/gi, "#f5f5dc");

    // Replace white in CSS not surrounded by quotes, but preceded by : or space
    if (file.endsWith('.css')) {
      content = content.replace(/:\s*white\b/gi, ": beige");
    }

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      replacementsCount++;
      console.log(`Updated ${file}`);
    }
  }
});

console.log(`Total files updated: ${replacementsCount}`);
