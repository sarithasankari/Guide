import { useState, useEffect } from 'react';
import { guideService } from '../services/guideService';

/**
 * Custom React hook governing guide profile details retrieval, similar guides matching,
 * photo slider indexes, and date/guest ticket booking states.
 * @param {string|number} guideId - ID of guide to fetch details for
 * @returns {Object} - Guide detail states and setters
 */
export const useGuide = (guideId) => {
  const [guide, setGuide] = useState(null);
  const [similarGuides, setSimilarGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Traveler selections inside booking card
  const [selectedDate, setSelectedDate] = useState(null);
  const [guestsCount, setGuestsCount] = useState(1);
  
  // Gallery slider overlay state
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    if (!guideId) return;

    let active = true;
    setLoading(true);
    setError(null);

    guideService.fetchGuideById(guideId)
      .then(async (data) => {
        if (!active) return;
        setGuide(data);
        
        // Load similar guides recommendations from same state
        try {
          const similar = await guideService.fetchSimilarGuides(data.location, data.id);
          if (active) setSimilarGuides(similar);
        } catch {
          // Fail silently for similar guide recommendations
        }
        
        if (active) setLoading(false);
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Failed to fetch guide details');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [guideId]);

  // Sync viewed guides list into localStorage when guide changes
  useEffect(() => {
    if (!guide || !guide.id) return;
    try {
      const stored = localStorage.getItem('recentlyViewedGuides');
      let ids = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(ids)) ids = [];
      
      // Filter out existing and prepend new ID to keep recent first
      ids = [guide.id, ...ids.filter(id => id !== guide.id)].slice(0, 8);
      localStorage.setItem('recentlyViewedGuides', JSON.stringify(ids));
    } catch {
      // Fail silently if localStorage block issues happen
    }
  }, [guide]);

  const handleGuestsChange = (val) => {
    // Constraint bounds: min 1 traveler, max 12 travelers
    setGuestsCount(Math.min(12, Math.max(1, val)));
  };

  return {
    guide,
    similarGuides,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    guestsCount,
    setGuestsCount: handleGuestsChange,
    activePhotoIdx,
    setActivePhotoIdx
  };
};
