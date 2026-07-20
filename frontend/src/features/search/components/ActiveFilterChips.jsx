import React, { useMemo } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRICE_RANGES_OPTIONS } from '../constants/filterOptions';

/**
 * Renders list of removable active filter chips with entrance/exit transitions.
 */
export default function ActiveFilterChips({
  location, setLocation,
  dates, setDates,
  language, setLanguage,
  budget, setBudget,
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
  
  // Transform filters into array of individual chip objects
  const activeChips = useMemo(() => {
    const chips = [];

    if (location) {
      chips.push({ type: 'location', label: `Near: ${location}`, onRemove: () => setLocation('') });
    }
    if (dates) {
      chips.push({ type: 'dates', label: `Date: ${dates}`, onRemove: () => setDates('') });
    }
    if (language) {
      chips.push({ type: 'language', label: `Language: ${language}`, onRemove: () => setLanguage('') });
    }
    if (budget) {
      chips.push({ type: 'budget', label: `Budget: < $${budget}/hr`, onRemove: () => setBudget('') });
    }

    selectedStates.forEach(st => {
      chips.push({
        type: 'state',
        label: st,
        onRemove: () => setSelectedStates(prev => prev.filter(item => item !== st))
      });
    });

    selectedLanguages.forEach(lang => {
      chips.push({
        type: 'lang',
        label: lang,
        onRemove: () => setSelectedLanguages(prev => prev.filter(item => item !== lang))
      });
    });

    selectedCategories.forEach(cat => {
      chips.push({
        type: 'cat',
        label: cat,
        onRemove: () => setSelectedCategories(prev => prev.filter(item => item !== cat))
      });
    });

    if (minRating > 0) {
      chips.push({
        type: 'rating',
        label: `${minRating}★ & Above`,
        onRemove: () => setMinRating(0)
      });
    }

    if (selectedExperience > 0) {
      chips.push({
        type: 'exp',
        label: `${selectedExperience}+ Years Exp`,
        onRemove: () => setSelectedExperience(0)
      });
    }

    priceRanges.forEach(rangeSlug => {
      const option = PRICE_RANGES_OPTIONS.find(opt => opt.value === rangeSlug);
      chips.push({
        type: 'price',
        label: option ? option.label : rangeSlug,
        onRemove: () => setPriceRanges(prev => prev.filter(item => item !== rangeSlug))
      });
    });

    selectedAvailability.forEach(avail => {
      const label = avail === 'instant' ? 'Instant Book' : avail === 'today' ? 'Available Today' : 'Weekend Available';
      chips.push({
        type: 'avail',
        label,
        onRemove: () => setSelectedAvailability(prev => prev.filter(item => item !== avail))
      });
    });

    return chips;
  }, [
    location, setLocation, dates, setDates, language, setLanguage, budget, setBudget,
    selectedStates, setSelectedStates, selectedLanguages, setSelectedLanguages,
    selectedCategories, setSelectedCategories, minRating, setMinRating,
    selectedExperience, setSelectedExperience, priceRanges, setPriceRanges,
    selectedAvailability, setSelectedAvailability
  ]);

  if (activeChips.length === 0) return null;

  return (
    <div className="w-full bg-slate-50 border-b border-slate-100 py-3.5 px-4">
      <div className="container mx-auto max-w-7xl flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1.5">Active Filters:</span>
        
        <div className="flex flex-wrap gap-2 items-center flex-1">
          <AnimatePresence initial={false}>
            {activeChips.map((chip, idx) => (
              <motion.div
                key={`${chip.type}-${idx}`}
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={chip.onRemove}
                  className="p-0.5 hover:bg-slate-100 hover:text-rose-600 rounded-full cursor-pointer transition-colors"
                  aria-label={`Remove filter ${chip.label}`}
                >
                  <X size={12} className="stroke-[2.5px]" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              type="button"
              className="text-xs font-black text-teal-650 hover:text-teal-700 hover:underline px-2 py-1 ml-1 cursor-pointer transition-colors tracking-wide uppercase"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
