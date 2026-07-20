// ============================================================
// MOCK DATA - Central data store for the entire application
// ============================================================
import { Landmark, Utensils, TreePine, Camera, Building2, Palette } from 'lucide-react';

export const GUIDES = [
  {
    id: 1,
    name: 'Dr. Ramesh Kumar',
    role: 'DRAVIDIAN ARCHITECTURE EXPERT',
    city: 'Madurai',
    country: 'India',
    location: 'Madurai, Tamil Nadu',
    rating: 4.98,
    reviews: 124,
    price: 65,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80',
    languages: ['English', 'Tamil'],
    tags: ['History & Culture', 'Art'],
    bio: 'With 15 years of experience unlocking the hidden secrets of the Meenakshi Amman Temple, I specialize in bringing ancient history to life. My PhD in Archaeology lets me offer perspectives you simply cannot find anywhere else.',
    verified: true,
    instantBook: false,
    available: true,
    online: true,
    certifications: ['PhD Archaeology', 'Licensed State Guide - Tamil Nadu'],
    experience: [
      { title: 'Senior Archaeologist & Guide', org: 'Madurai Heritage Society', years: '2015 - Present' },
      { title: 'University Lecturer', org: 'Madurai Kamaraj University', years: '2010 - 2015' },
    ],
  },
  {
    id: 2,
    name: 'Karthik Natarajan',
    role: 'LOCAL HISTORIAN & FOODIE',
    city: 'Chennai',
    country: 'India',
    location: 'Chennai, Tamil Nadu',
    rating: 4.92,
    reviews: 89,
    price: 50,
    image: 'https://randomuser.me/api/portraits/men/96.jpg',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    languages: ['English', 'Tamil'],
    tags: ['Food & Drink', 'History & Culture'],
    bio: 'Born and raised in Chennai, I have spent my life discovering every traditional mess, busy street, and forgotten alley the city has to offer. My tours are a perfect blend of history and authentic culinary experience.',
    verified: false,
    instantBook: true,
    available: true,
    online: false,
    certifications: ['Licensed City Guide - Chennai', 'Food Safety Certification'],
    experience: [
      { title: 'Local Historian & Food Tour Guide', org: 'Self-Employed', years: '2016 - Present' },
    ],
  },
  {
    id: 3,
    name: 'Arun Prakash',
    role: 'NILGIRIS TREKKING SPECIALIST',
    city: 'Ooty',
    country: 'India',
    location: 'Ooty, Tamil Nadu',
    rating: 4.9,
    reviews: 201,
    price: 75,
    image: 'https://randomuser.me/api/portraits/men/43.jpg',
    coverImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80',
    languages: ['English', 'Tamil', 'Malayalam'],
    tags: ['Alpine & Nature', 'Photography'],
    bio: 'With over 12 years of experience traversing the peaks of the Nilgiris, I specialize in high-altitude trekking and cultural immersion with local tribes. My goal is to ensure every traveler leaves with a story that lasts a lifetime.',
    verified: true,
    instantBook: true,
    available: true,
    online: true,
    certifications: ['Wilderness First Responder', 'Nilgiri Wildlife Photography Masterclass'],
    experience: [
      { title: 'Senior Nature Guide', org: 'Ooty Expeditions', years: '2018 - Present' },
      { title: 'Independent Trekking Specialist', org: 'Western Ghats', years: '2014 - 2018' },
    ],
  },
  {
    id: 4,
    name: 'Lakshmi Rajan',
    role: 'CHETTINAD CULINARY EXPERT',
    city: 'Karaikudi',
    country: 'India',
    location: 'Karaikudi, Tamil Nadu',
    rating: 4.88,
    reviews: 156,
    price: 55,
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    coverImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1600&q=80',
    languages: ['English', 'Tamil'],
    tags: ['Food & Drink', 'History & Culture'],
    bio: 'I take travelers to the hidden depths of Chettinad culinary culture — from the traditional mansions to secret spice markets. Tamil Nadu is best understood through its rich, aromatic food.',
    verified: true,
    instantBook: false,
    available: true,
    online: false,
    certifications: ['Licensed Tour Guide - Tamil Nadu', 'Culinary Arts Certificate'],
    experience: [
      { title: 'Culinary Tour Specialist', org: 'Self-Employed', years: '2019 - Present' },
    ],
  },
  {
    id: 5,
    name: 'Sneha Venkatesh',
    role: 'URBAN HERITAGE EXPLORER',
    city: 'Coimbatore',
    country: 'India',
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.80,
    reviews: 73,
    price: 45,
    image: 'https://randomuser.me/api/portraits/women/16.jpg',
    coverImage: '/mountain_hero.png',
    languages: ['English', 'Tamil', 'Hindi'],
    tags: ['Urban Exploration', 'Art'],
    bio: 'Coimbatore is more than the Manchester of South India. I specialise in the vibrant local markets, underground textile galleries, and the contemporary artists shaping the next chapter of Tamil art.',
    verified: true,
    instantBook: true,
    available: false,
    online: false,
    certifications: ['Art History Degree', 'Licensed City Guide'],
    experience: [
      { title: 'Textile & Urban Culture Guide', org: 'Self-Employed', years: '2020 - Present' },
    ],
  },
  {
    id: 6,
    name: 'Prof. Anbumani Selvan',
    role: 'ART HISTORIAN',
    city: 'Mahabalipuram',
    country: 'India',
    location: 'Mahabalipuram, Tamil Nadu',
    rating: 5.0,
    reviews: 44,
    price: 120,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    languages: ['English', 'Tamil', 'French'],
    tags: ['History & Culture', 'Art'],
    bio: 'Former curator of the Pallava Heritage Museum. I offer truly exclusive private tours of the Shore Temple and stone carvings, including access to ancient archaeological sites.',
    verified: true,
    instantBook: false,
    available: true,
    online: true,
    certifications: ['PhD Art History', 'Former Heritage Curator'],
    experience: [
      { title: 'Curator', org: 'Pallava Heritage Museum', years: '2008 - 2020' },
      { title: 'Private Art Tour Guide', org: 'Self-Employed', years: '2020 - Present' },
    ],
  },
];

export const CATEGORIES = [
  { icon: <Landmark size={32} />, label: 'History & Culture' },
  { icon: <Utensils size={32} />, label: 'Food & Drink' },
  { icon: <TreePine size={32} />, label: 'Alpine & Nature' },
  { icon: <Camera size={32} />, label: 'Photography' },
  { icon: <Building2 size={32} />, label: 'Urban Exploration' },
  { icon: <Palette size={32} />, label: 'Art' },
];

export const DESTINATIONS = [
  { city: 'Chennai, Tamil Nadu', exp: '142+ Experiences', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80' },
  { city: 'Madurai, Tamil Nadu', exp: '86+ Experiences', img: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1000&q=80' },
  { city: 'Ooty, Tamil Nadu', exp: '110+ Experiences', img: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80' },
  { city: 'Mahabalipuram, Tamil Nadu', exp: '95+ Experiences', img: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=1000&q=80' },
];

export const MOCK_BOOKINGS = [
  {
    id: 'BK-001',
    guide: GUIDES[2], // Arun Prakash
    tourName: 'Nilgiris Peak Trek',
    status: 'confirmed',
    date: 'Oct 24, 2024',
    time: '08:00 AM',
    duration: '4 Hours',
    guests: 2,
    totalPrice: 196.50,
    image: '/mountain_hero.png',
    location: 'Ooty, Tamil Nadu',
    daysUntil: 3,
  },
  {
    id: 'BK-002',
    guide: GUIDES[0], // Ramesh Kumar
    tourName: 'Private Meenakshi Temple Secrets',
    status: 'pending',
    date: 'Nov 12, 2024',
    time: '10:00 AM',
    duration: '2 Hours',
    guests: 1,
    totalPrice: 65,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
    location: 'Madurai, Tamil Nadu',
    daysUntil: 12,
  },
];

export const INDIAN_STATES = [
  {
    name: 'Andhra Pradesh',
    tagline: 'The Koh-i-Noor of India',
    attractions: ['Tirupati Balaji', 'Araku Valley', 'Visakhapatnam'],
    rating: 4.6,
    placesCount: 120,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Arunachal Pradesh',
    tagline: 'Dawn-Lit Mountains',
    attractions: ['Tawang Monastery', 'Ziro Valley', 'Namdapha'],
    rating: 4.8,
    placesCount: 85,
    image: 'https://images.unsplash.com/photo-1542158862-2432ecff1d95?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Assam',
    tagline: 'Gateway to North East',
    attractions: ['Kaziranga', 'Majuli Island', 'Kamakhya Temple'],
    rating: 4.7,
    placesCount: 150,
    image: 'https://images.unsplash.com/photo-1595185368597-28dceba727a8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bihar',
    tagline: 'Land of Nirvana',
    attractions: ['Bodh Gaya', 'Nalanda', 'Rajgir'],
    rating: 4.5,
    placesCount: 90,
    image: 'https://images.unsplash.com/photo-1622306263543-c0d2eb29b352?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chhattisgarh',
    tagline: 'The Rice Bowl of India',
    attractions: ['Chitrakote Falls', 'Bastar', 'Sirpur'],
    rating: 4.5,
    placesCount: 70,
    image: 'https://images.unsplash.com/photo-1619623861543-d6c547805177?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Goa',
    tagline: 'Pearl of the Orient',
    attractions: ['Baga Beach', 'Dudhsagar Falls', 'Old Goa'],
    rating: 4.9,
    placesCount: 200,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Gujarat',
    tagline: 'Jewel of Western India',
    attractions: ['Rann of Kutch', 'Gir Forest', 'Somnath'],
    rating: 4.8,
    placesCount: 180,
    image: 'https://images.unsplash.com/photo-1588236756855-3343ef0ef5aa?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Haryana',
    tagline: 'Abode of God',
    attractions: ['Kurukshetra', 'Sultanpur Bird Sanctuary', 'Pinjore'],
    rating: 4.5,
    placesCount: 60,
    image: 'https://images.unsplash.com/photo-1625807954546-2775f0a28f87?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Himachal Pradesh',
    tagline: 'Abode of Snow',
    attractions: ['Manali', 'Shimla', 'Spiti Valley'],
    rating: 4.9,
    placesCount: 250,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Jharkhand',
    tagline: 'The Land of Forests',
    attractions: ['Hundru Falls', 'Betla National Park', 'Deoghar'],
    rating: 4.5,
    placesCount: 50,
    image: 'https://images.unsplash.com/photo-1601614949216-9289d1b77bd5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Karnataka',
    tagline: 'One State, Many Worlds',
    attractions: ['Hampi', 'Coorg', 'Mysore Palace'],
    rating: 4.9,
    placesCount: 300,
    image: 'https://images.unsplash.com/photo-1600100397608-f010f41cb8ea?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Kerala',
    tagline: 'God\'s Own Country',
    attractions: ['Munnar', 'Alleppey Backwaters', 'Wayanad'],
    rating: 4.9,
    placesCount: 280,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Madhya Pradesh',
    tagline: 'The Heart of India',
    attractions: ['Khajuraho', 'Bandhavgarh', 'Sanchi Stupa'],
    rating: 4.7,
    placesCount: 150,
    image: 'https://images.unsplash.com/photo-1614774391672-0051cfbe0d4c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Maharashtra',
    tagline: 'The Great Land',
    attractions: ['Ajanta Ellora', 'Mahabaleshwar', 'Mumbai'],
    rating: 4.8,
    placesCount: 400,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6678f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Manipur',
    tagline: 'Jeweled Land',
    attractions: ['Loktak Lake', 'Kangla Fort', 'Dzukou Valley'],
    rating: 4.6,
    placesCount: 45,
    image: 'https://images.unsplash.com/photo-1627855018653-61f6236b28b7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Meghalaya',
    tagline: 'Abode of Clouds',
    attractions: ['Cherrapunji', 'Dawki', 'Living Root Bridges'],
    rating: 4.8,
    placesCount: 80,
    image: 'https://images.unsplash.com/photo-1596707323675-091a0c0a3ea7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Mizoram',
    tagline: 'Land of the Hill People',
    attractions: ['Aizawl', 'Phawngpui', 'Vantawng Falls'],
    rating: 4.7,
    placesCount: 40,
    image: 'https://images.unsplash.com/photo-1632733989182-411a768652d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nagaland',
    tagline: 'Land of Festivals',
    attractions: ['Hornbill Festival', 'Kohima', 'Dzukou Valley'],
    rating: 4.7,
    placesCount: 55,
    image: 'https://images.unsplash.com/photo-1608681123455-83cffb60a364?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Odisha',
    tagline: 'India\'s Best Kept Secret',
    attractions: ['Konark Sun Temple', 'Puri', 'Chilika Lake'],
    rating: 4.7,
    placesCount: 110,
    image: 'https://images.unsplash.com/photo-1574888803525-46747b0e14ea?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Punjab',
    tagline: 'Land of Five Rivers',
    attractions: ['Golden Temple', 'Jallianwala Bagh', 'Wagah Border'],
    rating: 4.8,
    placesCount: 90,
    image: 'https://images.unsplash.com/photo-1623055977114-1e5f8da9cb1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Rajasthan',
    tagline: 'Land of Kings',
    attractions: ['Jaipur', 'Udaipur', 'Jaisalmer'],
    rating: 4.9,
    placesCount: 350,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sikkim',
    tagline: 'Brother of the Seven Sisters',
    attractions: ['Nathula Pass', 'Tsomgo Lake', 'Rumtek'],
    rating: 4.8,
    placesCount: 100,
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tamil Nadu',
    tagline: 'Land of Temples',
    attractions: ['Meenakshi Temple', 'Ooty', 'Mahabalipuram'],
    rating: 4.8,
    placesCount: 320,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Telangana',
    tagline: 'The Seed Capital of India',
    attractions: ['Charminar', 'Golconda Fort', 'Ramoji Film City'],
    rating: 4.6,
    placesCount: 85,
    image: 'https://images.unsplash.com/photo-1626359573859-fdf2d0e74f07?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Tripura',
    tagline: 'The Queen of Eastern Hills',
    attractions: ['Neermahal', 'Unakoti', 'Ujjayanta Palace'],
    rating: 4.5,
    placesCount: 35,
    image: 'https://images.unsplash.com/photo-1601614949216-9289d1b77bd5?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Uttar Pradesh',
    tagline: 'The Heartland of India',
    attractions: ['Taj Mahal', 'Varanasi', 'Mathura'],
    rating: 4.8,
    placesCount: 210,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Uttarakhand',
    tagline: 'Land of the Gods',
    attractions: ['Rishikesh', 'Nainital', 'Kedarnath'],
    rating: 4.9,
    placesCount: 240,
    image: 'https://images.unsplash.com/photo-1614774391672-0051cfbe0d4c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'West Bengal',
    tagline: 'The Sweetest Part of India',
    attractions: ['Darjeeling', 'Sundarbans', 'Victoria Memorial'],
    rating: 4.7,
    placesCount: 190,
    image: 'https://images.unsplash.com/photo-1595185368597-28dceba727a8?auto=format&fit=crop&w=800&q=80'
  }
];


export const MOCK_MESSAGES = [
  {
    id: 1,
    contact: { name: 'Arun P. (Ooty Guide)', img: 'https://randomuser.me/api/portraits/men/43.jpg', online: true },
    lastMessage: "Perfect! I've sent the updated itinerary for...",
    time: '14:20',
    badge: 'CONFIRMED BOOKING',
    unread: 0,
    messages: [
      { from: 'me', text: "That's incredible news! Let's go with 4:30 AM. I'm definitely a morning person when there's a view like that involved.", time: '10:15 AM' },
      { from: 'them', text: "This is where we'll be. It was taken by one of my clients last week!", time: '10:18 AM', image: '/mountain_hero.png' },
      { from: 'me', text: "Stunning! Can't wait. Should I bring my own trekking shoes or will you provide them?", time: '10:20 AM' },
    ],
    typing: true,
  },
  {
    id: 2,
    contact: { name: 'Karthik Natarajan', img: 'https://randomuser.me/api/portraits/men/96.jpg', online: false },
    lastMessage: 'That sounds like a great plan. Mylapore to...',
    time: 'Yesterday',
    badge: null,
    unread: 0,
    messages: [
      { from: 'me', text: 'Hi Karthik, looking forward to the tour tomorrow!', time: '09:00 AM' },
      { from: 'them', text: 'That sounds like a great plan. Mylapore to Marina Beach is a spectacular route.', time: '09:45 AM' },
    ],
    typing: false,
  },
  {
    id: 3,
    contact: { name: 'Lakshmi Rajan', img: 'https://randomuser.me/api/portraits/women/17.jpg', online: true },
    lastMessage: 'New photo from the Chettinad Spice tour!',
    time: 'Tue',
    badge: null,
    unread: 3,
    messages: [
      { from: 'them', text: 'Good morning! Ready for the food tour today?', time: '05:30 AM' },
      { from: 'me', text: 'Yes! On my way now 🚶', time: '05:45 AM' },
      { from: 'them', text: 'New photo from the Chettinad Spice tour!', time: '07:30 AM', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80' },
    ],
    typing: false,
  },
];
