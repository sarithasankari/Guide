import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchService } from '../services/searchService';
import { filterGuides, sortGuides, paginateGuides } from '../utils/searchHelpers';

/**
 * Custom hook managing search parameters, filter sidebar options, pagination, and sorting logic.
 * @param {number} itemsPerPage - Number of guides to show per page
 * @returns {Object} - Active search state and action setters
 */
export const useSearch = (itemsPerPage = 6) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial State from URL params
  const initialLocation = searchParams.get('location') || '';
  const initialCategory = searchParams.get('category') || '';

  // Data States
  const [allGuides, setAllGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search Bar States
  const [location, setLocation] = useState(initialLocation);
  const [dates, setDates] = useState('');
  const [language, setLanguage] = useState('');
  const [budget, setBudget] = useState('');

  // Sidebar Filter States
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
  const [minRating, setMinRating] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [topRated, setTopRated] = useState(false);

  // Sorting & Pagination States
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Guides Data
  useEffect(() => {
    let active = true;
    setLoading(true);
    searchService.fetchGuides()
      .then(data => {
        if (active) {
          setAllGuides(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Sync state if URL search params change
  useEffect(() => {
    const loc = searchParams.get('location') || '';
    const cat = searchParams.get('category') || '';
    if (loc) setLocation(loc);
    if (cat) setSelectedCategories(prev => prev.includes(cat) ? prev : [...prev, cat]);
  }, [searchParams]);

  // Handle active filters count calculation
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (location) count++;
    if (dates) count++;
    if (language) count++;
    if (budget) count++;
    count += selectedStates.length;
    count += selectedLanguages.length;
    count += selectedCategories.length;
    if (minRating > 0) count++;
    if (selectedExperience > 0) count++;
    count += priceRanges.length;
    count += selectedAvailability.length;
    if (verifiedOnly) count++;
    if (topRated) count++;
    return count;
  }, [
    location, dates, language, budget,
    selectedStates, selectedLanguages, selectedCategories,
    minRating, selectedExperience, priceRanges, selectedAvailability,
    verifiedOnly, topRated
  ]);

  // Memoized Filter & Sort Logic
  const filteredAndSortedGuides = useMemo(() => {
    const filters = {
      location: location,
      languages: selectedLanguages,
      categories: selectedCategories,
      minRating: minRating,
      availability: selectedAvailability,
      priceRanges: priceRanges,
      minExperience: selectedExperience,
      verifiedOnly: verifiedOnly,
      topRated: topRated
    };

    // If search bar specific inputs are active, include them in filters
    if (language) {
      filters.languages = [...(filters.languages || []), language];
    }
    if (budget) {
      // Treat search bar budget input as maxPrice limit
      filters.maxPrice = parseFloat(budget);
    }

    // Apply states filter (simulate location constraint check in states)
    let list = allGuides;
    if (selectedStates.length > 0) {
      list = allGuides.filter(g => 
        selectedStates.some(st => g.location?.toLowerCase().includes(st.toLowerCase()))
      );
    }

    const filtered = filterGuides(list, filters);
    return sortGuides(filtered, sortBy);
  }, [
    allGuides, location, dates, language, budget,
    selectedStates, selectedLanguages, selectedCategories,
    minRating, selectedExperience, priceRanges, selectedAvailability,
    verifiedOnly, topRated,
    sortBy
  ]);

  // Reset page to 1 whenever filters change to avoid empty page slice issues
  useEffect(() => {
    setCurrentPage(1);
  }, [
    location, language, budget,
    selectedStates, selectedLanguages, selectedCategories,
    minRating, selectedExperience, priceRanges, selectedAvailability,
    verifiedOnly, topRated,
    sortBy
  ]);

  // Memoized Paginated Results
  const paginatedGuides = useMemo(() => {
    return paginateGuides(filteredAndSortedGuides, currentPage, itemsPerPage);
  }, [filteredAndSortedGuides, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredAndSortedGuides.length / itemsPerPage));
  }, [filteredAndSortedGuides, itemsPerPage]);

  // Reset All Filters Handler
  const resetFilters = useCallback(() => {
    setLocation('');
    setDates('');
    setLanguage('');
    setBudget('');
    setSelectedStates([]);
    setSelectedLanguages([]);
    setSelectedCategories([]);
    setMinRating(0);
    setSelectedExperience(0);
    setPriceRanges([]);
    setSelectedAvailability([]);
    setVerifiedOnly(false);
    setTopRated(false);
    setSortBy('recommended');
    setCurrentPage(1);
    setSearchParams({});
  }, [setSearchParams]);

  return {
    guides: allGuides,
    filteredGuides: filteredAndSortedGuides,
    paginatedGuides,
    loading,
    activeFiltersCount,
    
    // Inputs & Setters
    location, setLocation,
    dates, setDates,
    language, setLanguage,
    budget, setBudget,
    
    // Sidebar Sets & Setters
    selectedStates, setSelectedStates,
    selectedLanguages, setSelectedLanguages,
    selectedCategories, setSelectedCategories,
    minRating, setMinRating,
    selectedExperience, setSelectedExperience,
    priceRanges, setPriceRanges,
    selectedAvailability, setSelectedAvailability,
    
    // Sorting & Pagination
    sortBy, setSortBy,
    currentPage, setCurrentPage,
    totalPages,
    totalCount: filteredAndSortedGuides.length,
    resetFilters,
    
    // Quick filters
    verifiedOnly, setVerifiedOnly,
    topRated, setTopRated
  };
};
