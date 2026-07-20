import React from 'react';
import { X, Filter, Check } from 'lucide-react';
import FilterSection from './FilterSection';
import {
  STATES_OPTIONS,
  LANGUAGES_OPTIONS,
  CATEGORIES_OPTIONS,
  RATINGS_OPTIONS,
  EXPERIENCE_OPTIONS,
  PRICE_RANGES_OPTIONS,
  AVAILABILITY_OPTIONS
} from '../constants/filterOptions';

/**
 * Filter sidebar containing multiple collapsible filter sections.
 * Supports desktop sticky presentation and mobile drawer overlay.
 */
export default function FilterSidebar({
  isOpen,
  onClose,
  selectedStates, setSelectedStates,
  selectedLanguages, setSelectedLanguages,
  selectedCategories, setSelectedCategories,
  minRating, setMinRating,
  selectedExperience, setSelectedExperience,
  priceRanges, setPriceRanges,
  selectedAvailability, setSelectedAvailability,
  resetFilters,
  activeFiltersCount
}) {

  // Checkbox toggle helpers
  const handleToggle = (item, selected, setSelected) => {
    setSelected(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white md:bg-transparent">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
        <h2 className="text-sm font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest">
          <Filter size={15} className="text-teal-650" /> Filters
        </h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            type="button"
            className="text-[10px] font-black text-teal-650 hover:text-rose-600 transition-colors uppercase tracking-widest cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Sections Scroll Container */}
      <div className="flex-1 overflow-y-auto pr-1 select-none space-y-1">
        
        {/* Categories section */}
        <FilterSection
          title="Categories"
          count={selectedCategories.length}
          onReset={() => setSelectedCategories([])}
        >
          <div className="grid grid-cols-1 gap-2">
            {CATEGORIES_OPTIONS.map(cat => {
              const isSelected = selectedCategories.includes(cat.value);
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => handleToggle(cat.value, selectedCategories, setSelectedCategories)}
                  className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border-teal-500 text-teal-700'
                      : 'bg-slate-50/50 border-slate-200 text-slate-655 hover:bg-slate-100/50 hover:border-slate-300'
                  }`}
                >
                  <span className="text-base">{cat.icon === 'Compass' ? '🧭' : cat.icon === 'Umbrella' ? '🏖️' : cat.icon === 'BookOpen' ? '📖' : cat.icon === 'Utensils' ? '🍽️' : cat.icon === 'Landmark' ? '🏛️' : cat.icon === 'Sparkles' ? '✨' : '🦁'}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* States Section */}
        <FilterSection
          title="Indian States"
          count={selectedStates.length}
          onReset={() => setSelectedStates([])}
          defaultExpanded={false}
        >
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {STATES_OPTIONS.map(opt => {
              const isChecked = selectedStates.includes(opt.value);
              return (
                <label key={opt.id} className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer group">
                  <div
                    onClick={() => handleToggle(opt.value, selectedStates, setSelectedStates)}
                    className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked ? 'bg-teal-600 border-teal-600' : 'bg-white border-slate-300 group-hover:border-slate-400'
                    }`}
                  >
                    {isChecked && <Check size={11} className="text-white stroke-[3.5px]" />}
                  </div>
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* Languages Section */}
        <FilterSection
          title="Languages"
          count={selectedLanguages.length}
          onReset={() => setSelectedLanguages([])}
        >
          <div className="space-y-2">
            {LANGUAGES_OPTIONS.map(opt => {
              const isChecked = selectedLanguages.includes(opt.value);
              return (
                <label key={opt.id} className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer group">
                  <div
                    onClick={() => handleToggle(opt.value, selectedLanguages, setSelectedLanguages)}
                    className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked ? 'bg-teal-600 border-teal-600' : 'bg-white border-slate-300 group-hover:border-slate-400'
                    }`}
                  >
                    {isChecked && <Check size={11} className="text-white stroke-[3.5px]" />}
                  </div>
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* Price Ranges Section */}
        <FilterSection
          title="Price Ranges"
          count={priceRanges.length}
          onReset={() => setPriceRanges([])}
        >
          <div className="space-y-2">
            {PRICE_RANGES_OPTIONS.map(opt => {
              const isChecked = priceRanges.includes(opt.value);
              return (
                <label key={opt.id} className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer group">
                  <div
                    onClick={() => handleToggle(opt.value, priceRanges, setPriceRanges)}
                    className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked ? 'bg-teal-600 border-teal-600' : 'bg-white border-slate-300 group-hover:border-slate-400'
                    }`}
                  >
                    {isChecked && <Check size={11} className="text-white stroke-[3.5px]" />}
                  </div>
                  <span className="flex-1">{opt.label}</span>
                  <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded-full">
                    {opt.max === 9999 ? `$${opt.min}+` : `$${opt.min} - $${opt.max}`}
                  </span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* Ratings Section */}
        <FilterSection
          title="Guide Rating"
          count={minRating > 0 ? 1 : 0}
          onReset={() => setMinRating(0)}
        >
          <div className="grid grid-cols-3 gap-1.5">
            {RATINGS_OPTIONS.map(opt => {
              const numVal = parseFloat(opt.value);
              const isActive = minRating === numVal;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMinRating(isActive ? 0 : numVal)}
                  className={`py-2 px-1 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 border-teal-600 text-white shadow-sm shadow-teal-600/10'
                      : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100/50 hover:border-slate-300'
                  }`}
                >
                  {opt.label.replace(' Stars', '★')}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Experience Section */}
        <FilterSection
          title="Min Experience"
          count={selectedExperience > 0 ? 1 : 0}
          onReset={() => setSelectedExperience(0)}
          defaultExpanded={false}
        >
          <div className="grid grid-cols-2 gap-1.5">
            {EXPERIENCE_OPTIONS.map(opt => {
              const expVal = parseInt(opt.value, 10);
              const isActive = selectedExperience === expVal;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedExperience(isActive ? 0 : expVal)}
                  className={`py-2 px-1 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 border-teal-600 text-white shadow-sm shadow-teal-600/10'
                      : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100/50 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Availability Section */}
        <FilterSection
          title="Availability"
          count={selectedAvailability.length}
          onReset={() => setSelectedAvailability([])}
        >
          <div className="space-y-2">
            {AVAILABILITY_OPTIONS.map(opt => {
              const isChecked = selectedAvailability.includes(opt.value);
              return (
                <label key={opt.id} className="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer group">
                  <div
                    onClick={() => handleToggle(opt.value, selectedAvailability, setSelectedAvailability)}
                    className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked ? 'bg-teal-600 border-teal-600' : 'bg-white border-slate-300 group-hover:border-slate-400'
                    }`}
                  >
                    {isChecked && <Check size={11} className="text-white stroke-[3.5px]" />}
                  </div>
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky View */}
      <aside className="hidden md:block w-72 shrink-0 select-none">
        <div className="sticky top-44 border border-slate-100 bg-white shadow-[0_4px_20px_-5px_rgba(15,23,42,0.02)] p-6.5 rounded-3xl max-h-[calc(100vh-210px)] flex flex-col">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Slide-over Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[300] md:hidden">
          {/* Overlay Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer container */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl p-6.5 flex flex-col">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer"
              aria-label="Close filters menu"
            >
              <X size={20} />
            </button>
            <div className="flex-1 overflow-hidden pt-4">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
