import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Eye } from 'lucide-react';
import { GUIDES } from '../../../data/mockData';

/**
 * Renders viewed guides loaded from local storage in a horizontal scrolling row.
 */
export default function RecentlyViewed() {
  const viewedGuides = useMemo(() => {
    try {
      const stored = localStorage.getItem('recentlyViewedGuides');
      if (!stored) return [];
      const ids = JSON.parse(stored);
      if (!Array.isArray(ids)) return [];
      
      // Map IDs to actual guide objects (limit to top 4)
      return ids
        .map(id => GUIDES.find(g => g.id === parseInt(id, 10)))
        .filter(Boolean)
        .slice(0, 4);
    } catch {
      return [];
    }
  }, []);

  if (viewedGuides.length === 0) return null;

  return (
    <section className="container mx-auto px-4 mt-20 pb-12 max-w-7xl select-none text-left">
      <div className="flex items-center gap-2 mb-6">
        <Eye size={18} className="text-teal-600" />
        <h3 className="text-lg font-black text-slate-850 tracking-tight uppercase tracking-widest text-[13px]">Recently Viewed Guides</h3>
      </div>
      
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin">
        {viewedGuides.map(guide => (
          <Link
            key={guide.id}
            to={`/guide/${guide.id}`}
            className="flex-shrink-0 w-80 bg-white rounded-2xl border border-slate-100 hover:border-teal-500/10 shadow-[0_2px_10px_rgba(15,23,42,0.01)] hover:shadow-md flex p-3 gap-3.5 transition-all duration-300 group"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
              <img src={guide.image} alt={guide.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            
            {/* Info */}
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <h4 className="text-sm font-black text-slate-900 leading-tight truncate group-hover:text-teal-650 transition-colors">
                {guide.name}
              </h4>
              <div className="flex items-center gap-1 text-[10px] font-black text-slate-450 uppercase tracking-wide mt-1 mb-2">
                <MapPin size={10} className="text-teal-500" /> {guide.city}
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-black text-slate-900">${guide.price}<span className="text-slate-400 font-medium text-[10px]">/hr</span></span>
                <span className="flex items-center gap-0.5 text-[10px] font-black text-slate-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                  ★ {guide.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
