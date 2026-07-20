import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Eye } from 'lucide-react';

/**
 * Renders alternative recommendations of guides located in the same state.
 */
export default function SimilarGuides({ guides = [] }) {
  if (guides.length === 0) return null;

  return (
    <section className="w-full mt-16 select-none text-left">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-base">🧭</span>
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          Similar Guides in the Area
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map(item => (
          <Link
            key={item.id}
            to={`/guide/${item.id}`}
            className="flex flex-col bg-white rounded-3xl border border-slate-100 hover:border-teal-500/10 shadow-[0_2px_15px_-4px_rgba(15,23,42,0.01)] hover:shadow-md overflow-hidden group transition-all duration-300"
          >
            {/* Thumbnail banner */}
            <div className="h-36 bg-slate-100 overflow-hidden relative">
              <img 
                src={item.coverImage} 
                alt={`${item.name} Cover`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-black flex items-center gap-0.5 text-slate-800 border border-slate-150 shadow-sm">
                <Star size={10} className="fill-amber-500 text-amber-500" /> {item.rating.toFixed(2)}
              </div>
            </div>

            {/* Info details */}
            <div className="p-4 flex gap-3 relative">
              <div className="w-10 h-10 rounded-xl border border-white bg-slate-200 overflow-hidden shadow-sm shrink-0 -mt-8 z-10">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow min-w-0">
                <h4 className="text-xs font-black text-slate-900 truncate leading-tight group-hover:text-teal-650 transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center gap-1 text-[9px] font-black text-slate-450 uppercase tracking-wide mt-1">
                  <MapPin size={10} className="text-teal-500" /> {item.city}
                </div>
              </div>
              
              <div className="text-right shrink-0">
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider block">From</span>
                <span className="text-xs font-black text-slate-850">${item.price}/hr</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
