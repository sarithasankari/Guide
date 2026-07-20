/**
 * JSDoc types for search options
 * @typedef {Object} FilterOption
 * @property {string} id
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} PriceRangeOption
 * @property {string} id
 * @property {string} label
 * @property {string} value
 * @property {number} min
 * @property {number} max
 */

/**
 * @typedef {Object} CategoryOption
 * @property {string} icon - React Icon name string
 * @property {string} label
 * @property {string} value
 */

/**
 * Indian states filter options
 * @type {FilterOption[]}
 */
export const STATES_OPTIONS = [
  { id: 'state-goa', label: 'Goa', value: 'Goa' },
  { id: 'state-himachal', label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
  { id: 'state-karnataka', label: 'Karnataka', value: 'Karnataka' },
  { id: 'state-kerala', label: 'Kerala', value: 'Kerala' },
  { id: 'state-rajasthan', label: 'Rajasthan', value: 'Rajasthan' },
  { id: 'state-tamilnadu', label: 'Tamil Nadu', value: 'Tamil Nadu' },
  { id: 'state-uttarakhand', label: 'Uttarakhand', value: 'Uttarakhand' }
];

/**
 * Languages spoken filter options
 * @type {FilterOption[]}
 */
export const LANGUAGES_OPTIONS = [
  { id: 'lang-english', label: 'English', value: 'English' },
  { id: 'lang-kannada', label: 'Kannada', value: 'Kannada' },
  { id: 'lang-malayalam', label: 'Malayalam', value: 'Malayalam' },
  { id: 'lang-tamil', label: 'Tamil', value: 'Tamil' },
  { id: 'lang-telugu', label: 'Telugu', value: 'Telugu' },
  { id: 'lang-hindi', label: 'Hindi', value: 'Hindi' }
];

/**
 * Guide categories filter options
 * @type {CategoryOption[]}
 */
export const CATEGORIES_OPTIONS = [
  { icon: 'Compass', label: 'Adventure', value: 'Alpine & Nature' },
  { icon: 'Umbrella', label: 'Beaches', value: 'Beaches' },
  { icon: 'BookOpen', label: 'Culture', value: 'Culture' },
  { icon: 'Utensils', label: 'Food', value: 'Food & Drink' },
  { icon: 'Landmark', label: 'Heritage', value: 'History & Culture' },
  { icon: 'Sparkles', label: 'Pilgrimage', value: 'Pilgrimage' },
  { icon: 'Bird', label: 'Wildlife', value: 'Wildlife' }
];

/**
 * Star ratings filter options
 * @type {FilterOption[]}
 */
export const RATINGS_OPTIONS = [
  { id: 'rating-5', label: '5 Stars', value: '5.0' },
  { id: 'rating-4', label: '4+ Stars', value: '4.0' },
  { id: 'rating-3', label: '3+ Stars', value: '3.0' }
];

/**
 * Availability filter options
 * @type {FilterOption[]}
 */
export const AVAILABILITY_OPTIONS = [
  { id: 'avail-today', label: 'Available Today', value: 'today' },
  { id: 'avail-instant', label: 'Instant Book', value: 'instant' },
  { id: 'avail-weekend', label: 'Weekend Available', value: 'weekend' }
];

/**
 * Experience years filter options
 * @type {FilterOption[]}
 */
export const EXPERIENCE_OPTIONS = [
  { id: 'exp-1', label: '1+ Years', value: '1' },
  { id: 'exp-3', label: '3+ Years', value: '3' },
  { id: 'exp-5', label: '5+ Years', value: '5' },
  { id: 'exp-10', label: '10+ Years', value: '10' }
];

/**
 * Price ranges filter options
 * @type {PriceRangeOption[]}
 */
export const PRICE_RANGES_OPTIONS = [
  { id: 'price-budget', label: 'Budget', value: 'budget', min: 0, max: 40 },
  { id: 'price-standard', label: 'Standard', value: 'standard', min: 41, max: 80 },
  { id: 'price-premium', label: 'Premium', value: 'premium', min: 81, max: 150 },
  { id: 'price-luxury', label: 'Luxury', value: 'luxury', min: 151, max: 9999 }
];
