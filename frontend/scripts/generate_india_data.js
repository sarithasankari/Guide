import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');
const PLACES_DIR = path.join(DATA_DIR, 'places');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(PLACES_DIR)) fs.mkdirSync(PLACES_DIR, { recursive: true });

const STATES = [
  { id: 1, name: 'Andhra Pradesh', capital: 'Amaravati', climate: 'Tropical', language: 'Telugu', famousFood: 'Pulihora', bestTimeToVisit: 'Nov - Feb' },
  { id: 2, name: 'Arunachal Pradesh', capital: 'Itanagar', climate: 'Alpine', language: 'Nyishi, English', famousFood: 'Thukpa', bestTimeToVisit: 'Oct - Apr' },
  { id: 3, name: 'Assam', capital: 'Dispur', climate: 'Tropical Monsoon', language: 'Assamese', famousFood: 'Masor Tenga', bestTimeToVisit: 'Nov - Mar' },
  { id: 4, name: 'Bihar', capital: 'Patna', climate: 'Subtropical', language: 'Hindi', famousFood: 'Litti Chokha', bestTimeToVisit: 'Oct - Mar' },
  { id: 5, name: 'Chhattisgarh', capital: 'Raipur', climate: 'Tropical', language: 'Hindi', famousFood: 'Muthia', bestTimeToVisit: 'Oct - Mar' },
  { id: 6, name: 'Goa', capital: 'Panaji', climate: 'Tropical', language: 'Konkani', famousFood: 'Goan Fish Curry', bestTimeToVisit: 'Nov - Feb' },
  { id: 7, name: 'Gujarat', capital: 'Gandhinagar', climate: 'Arid to semi-arid', language: 'Gujarati', famousFood: 'Dhokla', bestTimeToVisit: 'Oct - Mar' },
  { id: 8, name: 'Haryana', capital: 'Chandigarh', climate: 'Continental', language: 'Hindi', famousFood: 'Bajre ki Khichdi', bestTimeToVisit: 'Oct - Mar' },
  { id: 9, name: 'Himachal Pradesh', capital: 'Shimla', climate: 'Alpine', language: 'Hindi', famousFood: 'Madra', bestTimeToVisit: 'Mar - Jun, Sep - Dec' },
  { id: 10, name: 'Jharkhand', capital: 'Ranchi', climate: 'Tropical', language: 'Hindi', famousFood: 'Dhuska', bestTimeToVisit: 'Oct - Mar' },
  { id: 11, name: 'Karnataka', capital: 'Bengaluru', climate: 'Tropical', language: 'Kannada', famousFood: 'Bisi Bele Bath', bestTimeToVisit: 'Oct - Apr' },
  { id: 12, name: 'Kerala', capital: 'Thiruvananthapuram', climate: 'Tropical Wet', language: 'Malayalam', famousFood: 'Appam with Stew', bestTimeToVisit: 'Sep - Mar' },
  { id: 13, name: 'Madhya Pradesh', capital: 'Bhopal', climate: 'Subtropical', language: 'Hindi', famousFood: 'Poha', bestTimeToVisit: 'Oct - Mar' },
  { id: 14, name: 'Maharashtra', capital: 'Mumbai', climate: 'Tropical', language: 'Marathi', famousFood: 'Misal Pav', bestTimeToVisit: 'Oct - Mar' },
  { id: 15, name: 'Manipur', capital: 'Imphal', climate: 'Subtropical', language: 'Meitei', famousFood: 'Eromba', bestTimeToVisit: 'Oct - Apr' },
  { id: 16, name: 'Meghalaya', capital: 'Shillong', climate: 'Subtropical', language: 'Khasi', famousFood: 'Jadoh', bestTimeToVisit: 'Oct - Apr' },
  { id: 17, name: 'Mizoram', capital: 'Aizawl', climate: 'Mild', language: 'Mizo', famousFood: 'Bai', bestTimeToVisit: 'Oct - Mar' },
  { id: 18, name: 'Nagaland', capital: 'Kohima', climate: 'Subtropical', language: 'English', famousFood: 'Smoked Pork', bestTimeToVisit: 'Oct - May' },
  { id: 19, name: 'Odisha', capital: 'Bhubaneswar', climate: 'Tropical', language: 'Odia', famousFood: 'Dalma', bestTimeToVisit: 'Oct - Mar' },
  { id: 20, name: 'Punjab', capital: 'Chandigarh', climate: 'Semi-arid', language: 'Punjabi', famousFood: 'Makki di Roti', bestTimeToVisit: 'Oct - Mar' },
  { id: 21, name: 'Rajasthan', capital: 'Jaipur', climate: 'Arid', language: 'Hindi', famousFood: 'Dal Baati Churma', bestTimeToVisit: 'Oct - Mar' },
  { id: 22, name: 'Sikkim', capital: 'Gangtok', climate: 'Tundra', language: 'Nepali', famousFood: 'Momo', bestTimeToVisit: 'Mar - May, Oct - Dec' },
  { id: 23, name: 'Tamil Nadu', capital: 'Chennai', climate: 'Tropical', language: 'Tamil', famousFood: 'Idli Dosa', bestTimeToVisit: 'Nov - Feb' },
  { id: 24, name: 'Telangana', capital: 'Hyderabad', climate: 'Semi-arid', language: 'Telugu', famousFood: 'Hyderabadi Biryani', bestTimeToVisit: 'Oct - Mar' },
  { id: 25, name: 'Tripura', capital: 'Agartala', climate: 'Tropical', language: 'Bengali', famousFood: 'Mui Borok', bestTimeToVisit: 'Oct - Mar' },
  { id: 26, name: 'Uttar Pradesh', capital: 'Lucknow', climate: 'Humid Subtropical', language: 'Hindi', famousFood: 'Tunday Kababi', bestTimeToVisit: 'Oct - Mar' },
  { id: 27, name: 'Uttarakhand', capital: 'Dehradun', climate: 'Alpine', language: 'Hindi', famousFood: 'Kafuli', bestTimeToVisit: 'Mar - Jun, Sep - Nov' },
  { id: 28, name: 'West Bengal', capital: 'Kolkata', climate: 'Tropical', language: 'Bengali', famousFood: 'Machher Jhol', bestTimeToVisit: 'Oct - Mar' },
  // Union Territories
  { id: 29, name: 'Andaman and Nicobar Islands', capital: 'Port Blair', climate: 'Tropical', language: 'Hindi, English', famousFood: 'Seafood', bestTimeToVisit: 'Oct - May' },
  { id: 30, name: 'Chandigarh', capital: 'Chandigarh', climate: 'Subtropical', language: 'Punjabi, Hindi', famousFood: 'Chole Bhature', bestTimeToVisit: 'Aug - Nov' },
  { id: 31, name: 'Dadra and Nagar Haveli and Daman and Diu', capital: 'Daman', climate: 'Tropical', language: 'Gujarati, Hindi', famousFood: 'Fish Koliwada', bestTimeToVisit: 'Oct - Mar' },
  { id: 32, name: 'Delhi', capital: 'New Delhi', climate: 'Semi-arid', language: 'Hindi', famousFood: 'Butter Chicken', bestTimeToVisit: 'Oct - Mar' },
  { id: 33, name: 'Jammu and Kashmir', capital: 'Srinagar', climate: 'Alpine', language: 'Urdu, Kashmiri', famousFood: 'Rogan Josh', bestTimeToVisit: 'Apr - Oct' },
  { id: 34, name: 'Ladakh', capital: 'Leh', climate: 'Cold Desert', language: 'Ladakhi', famousFood: 'Thukpa', bestTimeToVisit: 'Jun - Sep' },
  { id: 35, name: 'Lakshadweep', capital: 'Kavaratti', climate: 'Tropical', language: 'Malayalam', famousFood: 'Tuna Curry', bestTimeToVisit: 'Oct - Mar' },
  { id: 36, name: 'Puducherry', capital: 'Puducherry', climate: 'Tropical', language: 'Tamil, French', famousFood: 'Quiche', bestTimeToVisit: 'Oct - Mar' },
];

const CATEGORIES = [
  'Temple', 'Beach', 'Hill Station', 'Fort', 'Museum', 'Wildlife', 'Waterfall', 'Lake', 'Island', 'Adventure', 'UNESCO', 'Pilgrimage', 'Nature', 'Historical'
];

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Write states.js
const statesWithMeta = STATES.map(state => ({
  ...state,
  slug: generateSlug(state.name),
  image: `https://picsum.photos/seed/${generateSlug(state.name)}/1200/800`,
  description: `Experience the rich culture, beautiful landscapes, and vibrant history of ${state.name}.`,
  touristPlacesCount: 150 + Math.floor(Math.random() * 200) // Simulate large numbers
}));

fs.writeFileSync(
  path.join(DATA_DIR, 'states.js'),
  `export const STATES = ${JSON.stringify(statesWithMeta, null, 2)};\n`
);

fs.writeFileSync(
  path.join(DATA_DIR, 'categories.js'),
  `export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};\n`
);

// Generate dummy places for each state (simulating 150-300 per state)
console.log('Generating dummy tourist places for all states...');

let globalPlaceId = 1;

statesWithMeta.forEach(state => {
  const places = [];
  const numPlaces = state.touristPlacesCount;
  
  for (let i = 1; i <= numPlaces; i++) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const placeName = `${state.name} Tourist Spot ${i}`;
    
    places.push({
      id: globalPlaceId++,
      stateId: state.id,
      name: placeName,
      slug: generateSlug(placeName),
      district: `${state.name} District ${Math.ceil(Math.random() * 10)}`,
      city: `${state.name} City ${Math.ceil(Math.random() * 5)}`,
      category: category,
      rating: (4 + Math.random()).toFixed(1),
      image: `https://picsum.photos/seed/${globalPlaceId}/800/600`,
      gallery: [
        `https://picsum.photos/seed/${globalPlaceId}_1/800/600`,
        `https://picsum.photos/seed/${globalPlaceId}_2/800/600`,
        `https://picsum.photos/seed/${globalPlaceId}_3/800/600`
      ],
      shortDescription: `A beautiful ${category.toLowerCase()} destination in ${state.name}.`,
      fullDescription: `This is a comprehensive description of ${placeName}, detailing its incredible history, cultural significance, and stunning natural beauty. Visitors flock here year-round to experience its unique charm.`,
      history: `Discovered centuries ago, ${placeName} has played a crucial role in the development of the region.`,
      whyFamous: `Famous for its breathtaking views and rich cultural heritage.`,
      bestTimeToVisit: state.bestTimeToVisit,
      openingTime: '06:00 AM',
      closingTime: '06:00 PM',
      entryFee: Math.random() > 0.5 ? '₹50' : 'Free',
      address: `${placeName}, ${state.name}, India`,
      latitude: 20 + (Math.random() * 10 - 5),
      longitude: 78 + (Math.random() * 10 - 5),
      googleMapsLink: 'https://maps.google.com',
      nearbyHotels: ['Grand Palace Hotel', 'budget Stay Inn', 'Luxury Resort'],
      nearbyRestaurants: ['Spicy Kitchen', 'Local Flavors', 'Cafe Sunrise'],
      nearbyTouristPlaces: ['Nearby Spot A', 'Nearby Spot B'],
      activities: ['Photography', 'Sightseeing', 'Guided Tour'],
      travelTips: ['Carry water', 'Wear comfortable shoes'],
      safetyTips: ['Beware of monkeys', 'Do not litter'],
      accessibility: ['Wheelchair Friendly', 'Restrooms Available'],
      officialWebsite: 'https://tourism.gov.in'
    });
  }
  
  // Write state-specific chunk file
  fs.writeFileSync(
    path.join(PLACES_DIR, `${state.slug}.js`),
    `export const PLACES = ${JSON.stringify(places, null, 2)};\n`
  );
  
  console.log(`Generated ${places.length} places for ${state.name} -> ${state.slug}.js`);
});

console.log('Successfully generated all mock data for 28 states and 8 UTs!');
