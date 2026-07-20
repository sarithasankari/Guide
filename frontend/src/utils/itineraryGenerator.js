import statesData from '../data/statesData';

// Map of styles to custom activity profiles
const STYLE_PROFILES = {
  'History & Culture': {
    Morning: { title: 'Historical Guided Tour', desc: 'Dive into the history and architecture with an authorized local guide.' },
    Afternoon: { title: 'Museum & Heritage Complex Visit', desc: 'Explore curated relics, ancient artifacts, and heritage galleries.' },
    Evening: { title: 'Light & Sound Show / Traditional Performance', desc: 'Witness ancient stories come to life through a dazzling local cultural show.' }
  },
  'Food & Drink': {
    Morning: { title: 'Traditional Breakfast Walk', desc: 'Sample legendary local breakfast items and regional street delicacies with a food specialist.' },
    Afternoon: { title: 'Culinary Cooking Masterclass', desc: 'Learn to cook authentic regional recipes from local chefs and family cooks.' },
    Evening: { title: 'Heritage Dinner Experience', desc: 'Indulge in a multi-course traditional meal at a highly-rated historic dining venue.' }
  },
  'Alpine & Nature': {
    Morning: { title: 'Nature Trail & Sunrise Hike', desc: 'Catch the crisp morning air and stunning views from a local scenic viewpoint.' },
    Afternoon: { title: 'Botanical Garden / Lake Boating', desc: 'Relax amidst lush green foliage or enjoy a serene boat ride surrounded by nature.' },
    Evening: { title: 'Sunset Photography Session', desc: 'Capture panoramic landscape shots as the golden hour highlights the natural terrain.' }
  },
  'Photography & Art': {
    Morning: { title: 'Photogenic Architecture Trail', desc: 'Capture magnificent arches, symmetric structures, and fine detailed carvings in soft morning light.' },
    Afternoon: { title: 'Artisan Workshop & Galleries', desc: 'Meet local craftsmen, watch traditional art creation, and browse local paintings.' },
    Evening: { title: 'Street Photography Walk', desc: 'Walk through lively bazaars, capturing vibrant local life, color combinations, and dynamic portraits.' }
  },
  'Adventure & Sports': {
    Morning: { title: 'Thrilling Outdoor Activity', desc: 'Participate in adventure sports like paragliding, hot air ballooning, or forest canopy walks.' },
    Afternoon: { title: 'Trek or Safari Exploration', desc: 'Traverse wilderness trails or take an exciting wildlife/safari tour through national park boundaries.' },
    Evening: { title: 'Campfire & Stargazing', desc: 'Wind down around a cozy bonfire under clear skies, sharing stories of the day\'s adventures.' }
  },
  'Default': {
    Morning: { title: 'Sightseeing & Iconic Landmarks', desc: 'Visit the most popular and celebrated sightseeing spot in the area.' },
    Afternoon: { title: 'Local Market & Souvenir Shopping', desc: 'Explore bustling markets, interact with local shopkeepers, and purchase unique handicrafts.' },
    Evening: { title: 'Scenic Promenade Walk & Relaxation', desc: 'Stroll along popular viewpoints, riverbanks, or central plazas to enjoy the local evening vibe.' }
  }
};

// Budget pricing range multipliers
const BUDGET_MULTIPLIERS = {
  'Budget': { range: '₹200 - ₹500', costLevel: '$' },
  'Moderate': { range: '₹800 - ₹2,000', costLevel: '$$' },
  'Luxury': { range: '₹3,500 - ₹8,000+', costLevel: '$$$' }
};

export function generateItinerary({ state, duration, style, budget }) {
  // Find state data
  const stateInfo = statesData.find(s => s.state.toLowerCase() === state.toLowerCase()) || {
    state: state,
    places: ['Local Heritage Center', 'Central Market', 'Main City Viewpoint', 'Traditional Craft Hub']
  };

  const places = [...stateInfo.places];
  const numDays = Math.max(1, Math.min(7, parseInt(duration) || 3));
  const selectedStyle = STYLE_PROFILES[style] ? style : 'Default';
  const profile = STYLE_PROFILES[selectedStyle];
  const pricing = BUDGET_MULTIPLIERS[budget] || BUDGET_MULTIPLIERS['Moderate'];

  const days = [];

  // Distribute places across days
  for (let i = 0; i < numDays; i++) {
    const dayNum = i + 1;
    
    // Pick 3 key places for this day's itinerary, cycle if we run out
    const place1 = places[i % places.length];
    const place2 = places[(i + 1) % places.length];
    const place3 = places[(i + 2) % places.length];

    days.push({
      dayNum,
      title: `Exploring ${place1} & Surroundings`,
      activities: [
        {
          slot: 'Morning',
          time: '09:00 AM - 12:00 PM',
          title: `${profile.Morning.title} at ${place1}`,
          description: `Begin your morning visiting the majestic ${place1}. ${profile.Morning.desc} Enjoy the cooler temperatures and lively atmosphere.`,
          location: place1,
          cost: budget === 'Budget' ? '₹150 (Entry fee)' : budget === 'Moderate' ? '₹750 (Guide + entry)' : '₹2,500 (VIP private access)',
          costLevel: pricing.costLevel
        },
        {
          slot: 'Afternoon',
          time: '01:30 PM - 04:30 PM',
          title: `${profile.Afternoon.title} near ${place2}`,
          description: `After a delicious lunch, head towards ${place2}. ${profile.Afternoon.desc} Take your time to discover lesser-known viewpoints and historical details.`,
          location: place2,
          cost: budget === 'Budget' ? '₹200 (Lunch + local ride)' : budget === 'Moderate' ? '₹600 (Café dining + cab)' : '₹2,200 (Fine dining + private chauffeur)',
          costLevel: pricing.costLevel
        },
        {
          slot: 'Evening',
          time: '06:00 PM - 09:00 PM',
          title: `${profile.Evening.title} at ${place3}`,
          description: `Conclude your day near ${place3}. ${profile.Evening.desc} Ideal for winding down and absorbing the local evening ambiance.`,
          location: place3,
          cost: budget === 'Budget' ? '₹100 (Street food/snacks)' : budget === 'Moderate' ? '₹450 (Light show + dinner)' : '₹3,000 (Luxury dinner cruise / gourmet restaurant)',
          costLevel: pricing.costLevel
        }
      ]
    });
  }

  return {
    stateName: stateInfo.state,
    duration: numDays,
    style: selectedStyle,
    budget,
    pricingRange: pricing.range,
    days
  };
}
