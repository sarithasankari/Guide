import { PRICE_RANGES_OPTIONS } from '../constants/filterOptions';

/**
 * Parses experience years range and calculates total years.
 * @param {Array} experienceArray - Array of experience items with a 'years' field
 * @returns {number} - Total calculated experience in years
 */
export const calculateExperienceYears = (experienceArray) => {
  if (!experienceArray || !Array.isArray(experienceArray)) return 0;
  const currentYear = 2026; // Setting standard current year based on context metadata
  let totalYears = 0;
  
  experienceArray.forEach(exp => {
    if (!exp.years) return;
    const parts = exp.years.split('-').map(p => p.trim());
    if (parts.length === 2) {
      const start = parseInt(parts[0], 10);
      const endVal = parts[1].toLowerCase();
      const end = (endVal === 'present' || endVal === 'current') ? currentYear : parseInt(parts[1], 10);
      if (!isNaN(start) && !isNaN(end)) {
        totalYears += Math.max(0, end - start);
      }
    }
  });
  
  return totalYears || 1; // Default fallback to 1 year if it exists but parse fails
};

/**
 * Filter the guides array based on active filter options
 * @param {Array} guides - List of guides to filter
 * @param {Object} filters - Active filter states
 * @param {string} filters.location - Search text location
 * @param {string[]} filters.languages - Languages selected
 * @param {string[]} filters.categories - Categories selected
 * @param {number} filters.minRating - Minimum rating selection
 * @param {string[]} filters.availability - Availability items (today, instant, weekend)
 * @param {string[]} filters.priceRanges - Price range slugs selected (budget, standard, etc)
 * @param {number} [filters.maxPrice] - Direct max hourly rate selected
 * @param {number} [filters.minExperience] - Minimum experience years
 * @returns {Array} - Filtered guides list
 */
export const filterGuides = (guides, filters) => {
  if (!guides || !Array.isArray(guides)) return [];
  if (!filters) return guides;

  return guides.filter(guide => {
    // 1. Destination / Location Filter
    if (filters.location) {
      const query = filters.location.toLowerCase().trim();
      const matchCity = guide.city?.toLowerCase().includes(query);
      const matchLoc = guide.location?.toLowerCase().includes(query);
      const matchCountry = guide.country?.toLowerCase().includes(query);
      const matchRole = guide.role?.toLowerCase().includes(query);
      if (!matchCity && !matchLoc && !matchCountry && !matchRole) {
        return false;
      }
    }

    // 2. Languages Spoken Filter
    if (filters.languages && filters.languages.length > 0) {
      const hasLanguage = filters.languages.some(lang => 
        guide.languages?.some(gLang => gLang.toLowerCase() === lang.toLowerCase())
      );
      if (!hasLanguage) return false;
    }

    // 3. Categories / Tags Filter
    if (filters.categories && filters.categories.length > 0) {
      const hasCategory = filters.categories.some(cat => 
        guide.tags?.some(gTag => gTag.toLowerCase() === cat.toLowerCase())
      );
      if (!hasCategory) return false;
    }

    // 4. Rating Filter
    if (filters.minRating && filters.minRating > 0) {
      if (guide.rating < filters.minRating) return false;
    }

    // 4.1 Verified Only Filter
    if (filters.verifiedOnly && !guide.verified) {
      return false;
    }

    // 4.2 Top Rated Filter
    if (filters.topRated && guide.rating < 4.9) {
      return false;
    }

    // 5. Hourly Rate Direct Max Price Filter
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      if (guide.price > filters.maxPrice) return false;
    }

    // 6. Price Range Slug Filters
    if (filters.priceRanges && filters.priceRanges.length > 0) {
      const matchRange = filters.priceRanges.some(rangeSlug => {
        const option = PRICE_RANGES_OPTIONS.find(opt => opt.value === rangeSlug);
        if (!option) return false;
        return guide.price >= option.min && guide.price <= option.max;
      });
      if (!matchRange) return false;
    }

    // 7. Experience Filter
    if (filters.minExperience && filters.minExperience > 0) {
      const expYears = calculateExperienceYears(guide.experience);
      if (expYears < filters.minExperience) return false;
    }

    // 8. Availability Filters
    if (filters.availability && filters.availability.length > 0) {
      for (const avail of filters.availability) {
        if (avail === 'today' && !guide.available) return false;
        if (avail === 'instant' && !guide.instantBook) return false;
        if (avail === 'weekend' && !guide.available) return false;
      }
    }

    return true;
  });
};

/**
 * Sorts the guides array by a specified sort method
 * @param {Array} guides - Guides list to sort
 * @param {string} sortBy - Sort order value
 * @returns {Array} - Sorted guides list
 */
export const sortGuides = (guides, sortBy) => {
  if (!guides || !Array.isArray(guides)) return [];
  const sorted = [...guides];

  switch (sortBy) {
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'experience-desc':
      return sorted.sort((a, b) => {
        const expA = calculateExperienceYears(a.experience);
        const expB = calculateExperienceYears(b.experience);
        return expB - expA;
      });
    case 'reviews-desc':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case 'instant-first':
      return sorted.sort((a, b) => {
        if (a.instantBook && !b.instantBook) return -1;
        if (!a.instantBook && b.instantBook) return 1;
        return b.rating - a.rating;
      });
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'recommended':
    default:
      // Balance of rating and volume of reviews
      return sorted.sort((a, b) => {
        const scoreA = a.rating * Math.log10(a.reviews + 2);
        const scoreB = b.rating * Math.log10(b.reviews + 2);
        return scoreB - scoreA;
      });
  }
};

/**
 * Paginates the guides array
 * @param {Array} guides - Guides list to paginate
 * @param {number} page - Current active page number (1-indexed)
 * @param {number} limit - Guides shown per page
 * @returns {Array} - Paged guides list
 */
export const paginateGuides = (guides, page, limit) => {
  if (!guides || !Array.isArray(guides)) return [];
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;
  return guides.slice(startIdx, endIdx);
};
