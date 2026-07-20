import { useState, useEffect, useMemo, useCallback } from 'react';
import { guideService } from '../services/guideService';

/**
 * Custom React hook managing the traveler reviews state, average breakdown metrics,
 * sort order selections, and paginated review views.
 * @param {string|number} guideId - ID of guide to fetch reviews for
 * @param {number} reviewsPerPage - Number of reviews to show per page
 * @returns {Object} - Reviews states and calculated values
 */
export const useReviews = (guideId, reviewsPerPage = 3) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'highest' | 'lowest'
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!guideId) return;

    let active = true;
    setLoading(true);
    guideService.fetchReviewsByGuideId(guideId)
      .then(data => {
        if (active) {
          setReviews(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [guideId]);

  // Compute rating breakdown metrics (stars percentages: 5★ down to 1★)
  const statsSummary = useMemo(() => {
    const total = reviews.length;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    reviews.forEach(rev => {
      const roundedRating = Math.round(rev.rating);
      if (counts[roundedRating] !== undefined) {
        counts[roundedRating]++;
      }
      sum += rev.rating;
    });

    const average = total > 0 ? parseFloat((sum / total).toFixed(2)) : 0;

    const breakdown = Object.keys(counts).reduce((acc, star) => {
      const countVal = counts[star];
      acc[star] = {
        count: countVal,
        percentage: total > 0 ? Math.round((countVal / total) * 100) : 0
      };
      return acc;
    }, {});

    return {
      totalReviews: total,
      averageRating: average,
      breakdown
    };
  }, [reviews]);

  // Reset pagination if sorting parameter adjustments are selected
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  // Filter & Sort logic applied memoized
  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    
    switch (sortBy) {
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'newest':
      default:
        // Assume ID matches chronological ordering (higher is newer)
        return sorted.sort((a, b) => b.id - a.id);
    }
  }, [reviews, sortBy]);

  // Page slice paginate mapping
  const paginatedReviews = useMemo(() => {
    const startIdx = (currentPage - 1) * reviewsPerPage;
    const endIdx = currentPage * reviewsPerPage;
    return sortedReviews.slice(startIdx, endIdx);
  }, [sortedReviews, currentPage, reviewsPerPage]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(reviews.length / reviewsPerPage));
  }, [reviews, reviewsPerPage]);

  return {
    reviews: sortedReviews,
    paginatedReviews,
    loading,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    totalReviews: statsSummary.totalReviews,
    averageRating: statsSummary.averageRating,
    ratingBreakdown: statsSummary.breakdown
  };
};
