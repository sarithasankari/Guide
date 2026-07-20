import React from 'react';
import { X, Check, ShieldCheck, Zap } from 'lucide-react';
import { calculateExperienceYears } from '../utils/searchHelpers';

/**
 * Compare guides side-by-side modal list.
 */
export default function CompareModal({
  isOpen,
  onClose,
  comparedGuides = []
}) {
  if (!isOpen || comparedGuides.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[350] flex items-center justify-center p-4">
      {/* Overlay Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Modal Card wrapper */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative overflow-hidden z-10 flex flex-col max-h-[85vh] text-left">
        
        {/* Header bar */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Compare Local Guides</h3>
            <p className="text-slate-400 text-xs font-semibold mt-0.5">Evaluating side-by-side attributes</p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer border border-slate-100 shadow-xs"
            aria-label="Close comparison details modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comparison table matrix scroll container */}
        <div className="flex-1 overflow-x-auto p-6 scrollbar-thin">
          <div className="min-w-[700px] grid grid-cols-4 gap-6 select-none">
            
            {/* Left labels column */}
            <div className="space-y-8.5 font-black text-[10px] text-slate-400 uppercase tracking-widest pt-36">
              <div>City Location</div>
              <div>Hourly Price</div>
              <div>Star Rating</div>
              <div>Experience</div>
              <div>Languages</div>
              <div>Specialties</div>
              <div>Vetted Badge</div>
              <div>Instant Booking</div>
            </div>

            {/* Guide cards list columns */}
            {comparedGuides.map(guide => {
              const expYears = calculateExperienceYears(guide.experience);
              return (
                <div key={guide.id} className="flex flex-col text-slate-700">
                  {/* Guide avatar header */}
                  <div className="flex flex-col items-center pb-6 border-b border-slate-100 mb-6 shrink-0 h-30 text-center">
                    <img src={guide.image} alt={guide.name} className="w-13 h-13 rounded-2xl object-cover shadow-md mb-2.5 ring-2 ring-slate-100" />
                    <h4 className="text-sm font-black text-slate-900 line-clamp-1">{guide.name}</h4>
                    <span className="text-[9px] font-black text-teal-650 uppercase tracking-widest mt-0.5">{guide.role.split(' ')[0]}</span>
                  </div>

                  {/* Comparisons Row Matrix */}
                  <div className="space-y-8 text-xs font-extrabold text-slate-850">
                    {/* Location */}
                    <div className="h-4 truncate">{guide.city}</div>
                    
                    {/* Price */}
                    <div className="h-4 text-sm font-black text-slate-900">${guide.price}/hr</div>
                    
                    {/* Star Rating */}
                    <div className="h-4 flex items-center gap-1">
                      <span>★ {guide.rating}</span>
                      <span className="text-[10px] text-slate-450 font-semibold">({guide.reviews} reviews)</span>
                    </div>

                    {/* Experience */}
                    <div className="h-4">{expYears}+ Years</div>

                    {/* Languages */}
                    <div className="h-4 truncate" title={guide.languages?.join(', ')}>
                      {guide.languages?.slice(0, 2).join(', ')}
                    </div>

                    {/* Tags / Categories */}
                    <div className="h-4 truncate" title={guide.tags?.join(', ')}>
                      {guide.tags?.slice(0, 1).join(', ')}
                    </div>

                    {/* Vetted */}
                    <div className="h-4 flex items-center">
                      {guide.verified ? (
                        <span className="text-teal-600 flex items-center gap-1"><ShieldCheck size={15} /> Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </div>

                    {/* Instant Book */}
                    <div className="h-4 flex items-center">
                      {guide.instantBook ? (
                        <span className="text-amber-500 flex items-center gap-1"><Zap size={14} className="fill-current" /> Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty placeholders column in grid */}
            {comparedGuides.length < 3 && (
              Array.from({ length: 3 - comparedGuides.length }).map((_, i) => (
                <div key={i} className="bg-slate-50/40 rounded-3xl border border-dashed border-slate-200/80 flex flex-col items-center justify-center p-6 h-full min-h-[300px]">
                  <span className="text-slate-350 text-xs font-bold">Slot Available</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">Select another guide to compare</span>
                </div>
              ))
            )}

          </div>
        </div>

        {/* Direct Booking Drawer bar */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            type="button"
            className="bg-white border border-slate-200 hover:border-slate-350 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close comparison
          </button>
        </div>

      </div>
    </div>
  );
}
