import React from 'react';
import { Compass, RefreshCw, MapPin, Star } from 'lucide-react';

/**
 * Premium empty search state with visual icons, reset triggers, and destination suggestions.
 */
export default function EmptySearch({
  onReset,
  onExploreNearby,
  onShowPopular
}) {
  return (
    <div className="py-20 px-6 text-center bg-white rounded-3xl border border-dashed border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.01)] max-w-2xl mx-auto select-none">
      <div className="w-16 h-16 bg-teal-50 text-teal-650 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
        <Compass size={28} className="animate-spin-slow" />
      </div>
      
      <h3 className="text-xl font-black text-slate-850 mb-2.5 tracking-tight">No guides found</h3>
      <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto mb-8 font-medium">
        We couldn't find any local guides matching your exact search criteria. Try modifying your filters or explore popular spots instead.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
        <button
          onClick={onReset}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold text-xs tracking-wide uppercase transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw size={13} />
          <span>Reset Filters</span>
        </button>

        <button
          onClick={onExploreNearby}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-3 rounded-xl font-bold text-xs tracking-wide uppercase transition-colors shadow-sm cursor-pointer"
        >
          <MapPin size={13} className="text-teal-500" />
          <span>Explore Nearby</span>
        </button>

        <button
          onClick={onShowPopular}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-3 rounded-xl font-bold text-xs tracking-wide uppercase transition-colors shadow-sm cursor-pointer"
        >
          <Star size={13} className="text-amber-550 fill-amber-500" />
          <span>Popular Guides</span>
        </button>
      </div>
    </div>
  );
}
