import React from 'react';
import { SORT_OPTIONS } from '../constants/sortOptions';

/**
 * Summarizes the active search outcomes (Destination query, count, sorting method, filters count).
 */
export default function SearchSummary({
  location,
  totalCount,
  activeFiltersCount,
  sortBy
}) {
  const currentSortLabel = SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || 'Recommended';

  return (
    <div className="w-full bg-white border-b border-slate-100 py-5">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
            {location ? `Explore Guides in ${location}` : 'Explore Local Guides'}
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-semibold mt-1">
            <span className="text-teal-650 font-black">{totalCount}</span> verified local expert{totalCount !== 1 ? 's' : ''} available
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-550 mt-1 md:mt-0">
          {activeFiltersCount > 0 && (
            <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-100 tracking-wide">
              {activeFiltersCount} Filter{activeFiltersCount !== 1 ? 's' : ''} Applied
            </div>
          )}
          <div className="bg-slate-50 text-slate-650 px-3 py-1 rounded-full border border-slate-200/60 tracking-wide">
            Sorted by: <span className="text-slate-900 font-extrabold">{currentSortLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
