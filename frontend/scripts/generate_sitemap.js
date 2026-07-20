import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://indiaguide.com';
const PUBLIC_DIR = path.join(__dirname, '../public');
const DATA_DIR = path.join(__dirname, '../src/data');

function generateSitemap() {
  console.log('Generating sitemap.xml...');
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add Home Page
  xml += `  <url>\n    <loc>${DOMAIN}/</loc>\n    <priority>1.0</priority>\n  </url>\n`;

  // Read States
  const statesPath = path.join(DATA_DIR, 'states.json');
  if (!fs.existsSync(statesPath)) {
    console.error('states.json not found!');
    return;
  }

  const states = JSON.parse(fs.readFileSync(statesPath, 'utf-8'));

  states.forEach(state => {
    // Add State Page
    xml += `  <url>\n    <loc>${DOMAIN}/states/${state.slug}</loc>\n    <priority>0.8</priority>\n  </url>\n`;

    // Read Places for State
    const placesPath = path.join(DATA_DIR, `places/${state.slug}.json`);
    if (fs.existsSync(placesPath)) {
      const places = JSON.parse(fs.readFileSync(placesPath, 'utf-8'));
      places.forEach(place => {
        // Add Place Page
        xml += `  <url>\n    <loc>${DOMAIN}/states/${state.slug}/${place.slug}</loc>\n    <priority>0.6</priority>\n  </url>\n`;
      });
    } else {
      console.warn(`Warning: No places file found for ${state.slug}`);
    }
  });

  xml += `</urlset>\n`;

  // Write to public/sitemap.xml
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  
  console.log(`Successfully generated sitemap at ${sitemapPath}`);
}

generateSitemap();
