import React from 'react';
import { Check, Star, ShieldCheck, DollarSign, Compass, Palette, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Renders quick filter chips below the search summary.
 */
export default function QuickFilters({
  verifiedOnly, setVerifiedOnly,
  topRated, setTopRated,
  selectedCategories, setSelectedCategories,
  priceRanges, setPriceRanges
}) {
  
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleBudgetToggle = () => {
    // Treat "Budget Friendly" as max price <= 50 (standard or budget range)
    setPriceRanges(prev => 
      prev.includes('budget') 
        ? prev.filter(r => r !== 'budget') 
        : [...prev, 'budget']
    );
  };

  const filterChips = [
    {
      id: 'quick-verified',
      label: 'Verified Guides',
      icon: <ShieldCheck size={14} />,
      isActive: verifiedOnly,
      onToggle: () => setVerifiedOnly(!verifiedOnly)
    },
    {
      id: 'quick-top-rated',
      label: 'Top Rated (4.9+)',
      icon: <Star size={14} />,
      isActive: topRated,
      onToggle: () => setSortBy ? setSortBy('rating-desc') : setTopRated(!topRated)
    },
    {
      id: 'quick-budget',
      label: 'Budget Friendly',
      icon: <DollarSign size={14} />,
      isActive: priceRanges.includes('budget'),
      onToggle: handleBudgetToggle
    },
    {
      id: 'quick-nature',
      label: 'Nature & Alpine',
      icon: <Compass size={14} />,
      isActive: selectedCategories.includes('Alpine & Nature'),
      onToggle: () => handleCategoryToggle('Alpine & Nature')
    },
    {
      id: 'quick-culture',
      label: 'Culture & Heritage',
      icon: <Palette size={14} />,
      isActive: selectedCategories.includes('History & Culture'),
      onToggle: () => handleCategoryToggle('History & Culture')
    }
  ];

  return (
    <div className="w-full bg-white border-b border-slate-100 py-3 overflow-x-auto scrollbar-none">
      <div className="container mx-auto px-4 max-w-7xl flex items-center gap-2">
        {filterChips.map(chip => (
          <button
            key={chip.id}
            onClick={chip.onToggle}
            type="button"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer border ${
              chip.isActive
                ? 'bg-teal-600 border-teal-600 text-white shadow-sm shadow-teal-600/10'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
            }`}
          >
            {chip.isActive ? <Check size={12} className="stroke-[3px]" /> : chip.icon}
            <span>{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
