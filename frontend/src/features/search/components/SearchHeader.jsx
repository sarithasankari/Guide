import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Globe, DollarSign, Search } from 'lucide-react';
import { LANGUAGES_OPTIONS } from '../constants/filterOptions';

/**
 * Sticky, responsive search bar with shrink-on-scroll logic.
 */
export default function SearchHeader({
  location, setLocation,
  dates, setDates,
  language, setLanguage,
  budget, setBudget,
  onSearch
}) {
  const [isShrunk, setIsShrunk] = useState(false);

  // Monitor scroll positioning to trigger shrink animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <div className={`sticky top-20 z-50 w-full transition-all duration-300 ${
      isShrunk 
        ? 'py-2 bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100' 
        : 'py-6 bg-slate-50 border-b border-slate-100'
    }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <form onSubmit={handleSubmit} className="w-full">
          <div className={`bg-white rounded-2xl md:rounded-full flex flex-col md:flex-row items-center border border-slate-200 gap-1 md:gap-0 p-1.5 transition-all duration-300 ${
            isShrunk ? 'shadow-sm max-w-5xl mx-auto' : 'shadow-[0_8px_30px_rgb(0,0,0,0.03)]'
          }`}>
            
            {/* Destination Input */}
            <div className="flex-1 w-full flex items-center gap-2.5 px-4.5 py-2.5 md:py-1 hover:bg-slate-50/70 rounded-xl md:rounded-l-full group transition-colors">
              <MapPin size={18} className="text-teal-500 group-hover:scale-105 transition-transform" />
              <div className="flex-1 text-left">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Destination</span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-extrabold focus:ring-0"
                />
              </div>
            </div>

            <div className="hidden md:block h-7 w-px bg-slate-100" />

            {/* Travel Date Input */}
            <div className="flex-1 w-full flex items-center gap-2.5 px-4.5 py-2.5 md:py-1 hover:bg-slate-50/70 rounded-xl group transition-colors">
              <Calendar size={18} className="text-teal-500 group-hover:scale-105 transition-transform" />
              <div className="flex-1 text-left">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Travel Date</span>
                <input
                  type="text"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder="Add dates (e.g. Oct 24)"
                  className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-extrabold focus:ring-0"
                />
              </div>
            </div>

            <div className="hidden md:block h-7 w-px bg-slate-100" />

            {/* Language Input Selector */}
            <div className="flex-1 w-full flex items-center gap-2.5 px-4.5 py-2.5 md:py-1 hover:bg-slate-50/70 rounded-xl group transition-colors">
              <Globe size={18} className="text-teal-500 group-hover:scale-105 transition-transform" />
              <div className="flex-1 text-left">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Language</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-800 text-sm font-extrabold focus:ring-0 cursor-pointer pr-8"
                >
                  <option value="">Any Language</option>
                  {LANGUAGES_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hidden md:block h-7 w-px bg-slate-100" />

            {/* Budget Max Rate Input */}
            <div className="flex-1 w-full flex items-center gap-2.5 px-4.5 py-2.5 md:py-1 hover:bg-slate-50/70 rounded-xl group transition-colors">
              <DollarSign size={18} className="text-teal-500 group-hover:scale-105 transition-transform" />
              <div className="flex-1 text-left">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Max Budget / hr</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Max rate (USD)"
                  min="0"
                  className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-extrabold focus:ring-0"
                />
              </div>
            </div>

            {/* Search Submit CTA Button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-650 hover:to-emerald-700 text-white p-4 px-6.5 rounded-xl md:rounded-full flex items-center justify-center transition-all shadow-md shadow-teal-500/10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer font-bold text-sm tracking-wide md:ml-2"
            >
              <Search size={16} className="stroke-[3px] md:mr-0" />
              <span className="md:hidden ml-2">Search Guides</span>
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
