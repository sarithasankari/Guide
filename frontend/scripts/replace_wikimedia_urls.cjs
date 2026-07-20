const fs = require('fs');
const path = require('path');

const UNSPLASH_POOL = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1506461883276-594a12b11ce3?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1000&q=80"
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.json') || entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const wikimediaRegex = /https:\/\/upload\.wikimedia\.org\/[^\s"'`\\,)]+/g;
      
      if (wikimediaRegex.test(content)) {
        console.log(`Replacing Wikimedia links in: ${fullPath}`);
        content = content.replace(wikimediaRegex, (url) => {
          const index = hashString(url) % UNSPLASH_POOL.length;
          return UNSPLASH_POOL[index];
        });
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

const srcPath = path.join(__dirname, '../src');
processDirectory(srcPath);
console.log('Finished replacing all Wikimedia links with Unsplash URLs!');
