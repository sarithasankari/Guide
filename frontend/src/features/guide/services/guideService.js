import { GUIDES } from '../../../data/mockData';

// Detailed mockup list of traveler reviews to simulate backend database reviews
const MOCK_REVIEWS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    country: 'United States',
    date: 'Sept 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    text: 'Absolutely phenomenal! The guide brought history to life in a way I never expected. I\'ll be recommending Dr. Ramesh to all my friends. Truly unforgettable experience in Madurai.'
  },
  {
    id: 2,
    name: 'Robert T.',
    country: 'United Kingdom',
    date: 'Aug 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    text: 'Not just a guide but a true expert in the field. Incredibly knowledgeable, punctual, and made everyone in our group feel welcome. A must-book if you visiting Tamil Nadu!'
  },
  {
    id: 3,
    name: 'Emma Dupont',
    country: 'France',
    date: 'July 2025',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    text: 'Wonderful walking tour. We covered all the historical spots in detail and had great conversations about local customs. Dr Ramesh was very flexible with our schedule.'
  },
  {
    id: 4,
    name: 'Hans Müller',
    country: 'Germany',
    date: 'June 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    text: 'Exceeded all expectations! The explanations of Dravidian architecture were top-notch and academically deep yet highly engaging. Five stars all around.'
  },
  {
    id: 5,
    name: 'Priya Sharma',
    country: 'India',
    date: 'May 2025',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    text: 'A very deep and historical perspective of the city temples. Excellent storytelling and recommendation for local food joints. Extremely friendly.'
  }
];

export const guideService = {
  /**
   * Fetches guide details by ID.
   * @param {number|string} id - The guide ID to query.
   * @returns {Promise<Object>} - The guide object.
   */
  async fetchGuideById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = GUIDES.find(g => g.id === parseInt(id, 10));
        if (found) {
          resolve(found);
        } else {
          reject(new Error(`Guide with ID ${id} not found`));
        }
      }, 350); // mock delay
    });
  },

  /**
   * Fetches reviews list by guide ID.
   * @param {number|string} guideId - The guide ID to fetch reviews for.
   * @returns {Promise<Array>} - Reviews array list.
   */
  async fetchReviewsByGuideId(guideId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return standard mock reviews for any guide to simulate database fetch
        resolve(MOCK_REVIEWS);
      }, 300);
    });
  },

  /**
   * Fetches similar guides (excluding the current one).
   * @param {string} stateLocation - The location state to query (e.g. "Tamil Nadu").
   * @param {number} currentGuideId - The ID of the current guide to filter out.
   * @returns {Promise<Array>} - Similar guides list.
   */
  async fetchSimilarGuides(stateLocation, currentGuideId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Parse state name from location (e.g., "Madurai, Tamil Nadu")
        const stateKey = stateLocation.split(',').pop()?.trim().toLowerCase() || '';
        
        const similar = GUIDES.filter(g => {
          if (g.id === currentGuideId) return false;
          const loc = g.location?.toLowerCase() || '';
          return loc.includes(stateKey);
        });

        // Fallback to top-rated if no direct state match
        if (similar.length === 0) {
          resolve(GUIDES.filter(g => g.id !== currentGuideId).slice(0, 3));
        } else {
          resolve(similar.slice(0, 3));
        }
      }, 400);
    });
  }
};
