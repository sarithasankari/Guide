import { useState, useCallback, useMemo } from 'react';

/**
 * Custom React hook managing the state for compared guides (maximum of 3).
 * @param {Array} guides - All guides list to lookup objects by ID
 * @returns {Object} - Compare states and toggle handlers
 */
export const useCompare = (guides = []) => {
  const [comparedIds, setComparedIds] = useState([]);

  /**
   * Toggles a guide ID into the compare lists (validates max limit constraint).
   * @param {number} guideId - ID of guide to compare
   * @returns {boolean} - True if toggled successfully, false if constraint blocks it
   */
  const toggleCompare = useCallback((guideId) => {
    let success = true;
    setComparedIds(prev => {
      if (prev.includes(guideId)) {
        return prev.filter(id => id !== guideId);
      }
      if (prev.length >= 3) {
        success = false;
        return prev; // Block adding more than 3
      }
      return [...prev, guideId];
    });
    return success;
  }, []);

  const isCompared = useCallback((guideId) => {
    return comparedIds.includes(guideId);
  }, [comparedIds]);

  const clearCompare = useCallback(() => {
    setComparedIds([]);
  }, []);

  // Map compared IDs to actual guide objects from guides data
  const comparedGuides = useMemo(() => {
    if (!guides || !Array.isArray(guides)) return [];
    return comparedIds
      .map(id => guides.find(g => g.id === id))
      .filter(Boolean); // Filter out any undefined elements
  }, [comparedIds, guides]);

  return {
    comparedIds,
    comparedGuides,
    toggleCompare,
    isCompared,
    clearCompare,
    hasComparedItems: comparedIds.length > 0
  };
};
