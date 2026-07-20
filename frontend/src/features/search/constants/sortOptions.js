/**
 * JSDoc types for sort options
 * @typedef {Object} SortOption
 * @property {string} id
 * @property {string} label
 * @property {string} value
 */

/**
 * Sorting dropdown options
 * @type {SortOption[]}
 */
export const SORT_OPTIONS = [
  { id: 'sort-recommended', label: 'Recommended', value: 'recommended' },
  { id: 'sort-rating-desc', label: 'Highest Rated', value: 'rating-desc' },
  { id: 'sort-price-asc', label: 'Lowest Price', value: 'price-asc' },
  { id: 'sort-price-desc', label: 'Highest Price', value: 'price-desc' },
  { id: 'sort-exp-desc', label: 'Most Experienced', value: 'experience-desc' },
  { id: 'sort-reviews-desc', label: 'Most Reviewed', value: 'reviews-desc' },
  { id: 'sort-instant', label: 'Instant Book First', value: 'instant-first' },
  { id: 'sort-newest', label: 'Newest Guides', value: 'newest' }
];
