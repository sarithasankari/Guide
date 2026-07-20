import React, { useState } from 'react';
import { useSearch } from '../features/search/hooks/useSearch';
import { useCompare } from '../features/search/hooks/useCompare';
import SearchHeader from '../features/search/components/SearchHeader';
import SearchSummary from '../features/search/components/SearchSummary';
import ActiveFilterChips from '../features/search/components/ActiveFilterChips';
import QuickFilters from '../features/search/components/QuickFilters';
import FilterSidebar from '../features/search/components/FilterSidebar';
import GuideGrid from '../features/search/components/GuideGrid';
import GuideSkeleton from '../features/search/components/GuideSkeleton';
import EmptySearch from '../features/search/components/EmptySearch';
import SortDropdown from '../features/search/components/SortDropdown';
import Pagination from '../features/search/components/Pagination';
import CompareBar from '../features/search/components/CompareBar';
import CompareModal from '../features/search/components/CompareModal';
import RecentlyViewed from '../features/search/components/RecentlyViewed';
import SEO from '../components/SEO';

export default function SearchPage() {
  const {
    guides,
    filteredGuides,
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
    totalCount,
    resetFilters,
    
    // Quick filters
    verifiedOnly, setVerifiedOnly,
    topRated, setTopRated
  } = useSearch(6); // Shows 6 guides per page

  const {
    comparedGuides,
    toggleCompare,
    isCompared,
    clearCompare,
    hasComparedItems
  } = useCompare(guides);

  // Modal drawers triggers
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Empty state alternative exploration click triggers
  const handleExploreNearby = () => {
    resetFilters();
    setLocation('Tamil Nadu');
  };

  const handleShowPopular = () => {
    resetFilters();
    setTopRated(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col text-slate-800">
      <SEO title="Find Verified Local Experts & Private Tour Guides" />

      {/* Sticky Compact Header (No hero banner, Airbnb style) */}
      <SearchHeader
        location={location}
        setLocation={setLocation}
        dates={dates}
        setDates={setDates}
        language={language}
        setLanguage={setLanguage}
        budget={budget}
        setBudget={setBudget}
        onSearch={() => setCurrentPage(1)}
      />

      {/* Summary Row */}
      <SearchSummary
        location={location}
        totalCount={totalCount}
        activeFiltersCount={activeFiltersCount}
        sortBy={sortBy}
      />

      {/* Active Selection Chips */}
      <ActiveFilterChips
        location={location}
        setLocation={setLocation}
        dates={dates}
        setDates={setDates}
        language={language}
        setLanguage={setLanguage}
        budget={budget}
        setBudget={setBudget}
        selectedStates={selectedStates}
        setSelectedStates={setSelectedStates}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        minRating={minRating}
        setMinRating={setMinRating}
        selectedExperience={selectedExperience}
        setSelectedExperience={setSelectedExperience}
        priceRanges={priceRanges}
        setPriceRanges={setPriceRanges}
        selectedAvailability={selectedAvailability}
        setSelectedAvailability={setSelectedAvailability}
        resetFilters={resetFilters}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Horizontal Scroll Quick Filter row */}
      <QuickFilters
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        topRated={topRated}
        setTopRated={setTopRated}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceRanges={priceRanges}
        setPriceRanges={setPriceRanges}
      />

      {/* Main Workspace Layout (Filters sidebar + Results grid) */}
      <div className="container mx-auto px-4 max-w-7xl pt-8 pb-20 flex-grow">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Collapsible/Sticky Sidebar */}
          <FilterSidebar
            isOpen={isMobileFiltersOpen}
            onClose={() => setIsMobileFiltersOpen(false)}
            selectedStates={selectedStates}
            setSelectedStates={setSelectedStates}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            minRating={minRating}
            setMinRating={setMinRating}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
            priceRanges={priceRanges}
            setPriceRanges={setPriceRanges}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
            resetFilters={resetFilters}
            activeFiltersCount={activeFiltersCount}
          />

          {/* Guide Listings Workspace */}
          <main className="flex-1 w-full">
            
            {/* Inline sorting dropdown & mobile toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-left">
                <h3 className="text-base font-black text-slate-900 tracking-tight leading-none">
                  Guides Matching Criteria
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                  Vetted specialists available for private booking
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Toggle Button */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  type="button"
                  className="md:hidden flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-350 bg-white rounded-full text-xs font-bold text-slate-700 shadow-xs cursor-pointer"
                >
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-teal-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-black leading-none">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                <SortDropdown sortBy={sortBy} onChange={setSortBy} />
              </div>
            </div>

            {/* Results Rendering Matrix */}
            {loading ? (
              <GuideSkeleton count={4} />
            ) : totalCount === 0 ? (
              <EmptySearch
                onReset={resetFilters}
                onExploreNearby={handleExploreNearby}
                onShowPopular={handleShowPopular}
              />
            ) : (
              <>
                <GuideGrid
                  guides={paginatedGuides}
                  isCompared={isCompared}
                  onCompareToggle={toggleCompare}
                />
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}

          </main>
        </div>

        {/* LocalStorage Viewed Guides Compact row */}
        <RecentlyViewed />
      </div>

      {/* Floating Compare dashboard */}
      {hasComparedItems && (
        <CompareBar
          comparedGuides={comparedGuides}
          onRemove={toggleCompare}
          onClear={clearCompare}
          onCompareTrigger={() => setIsCompareModalOpen(true)}
        />
      )}

      {/* Side-by-side Attribute Modal drawer */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedGuides={comparedGuides}
      />
    </div>
  );
}

