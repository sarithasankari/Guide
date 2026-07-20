import React from 'react';
import { Star } from 'lucide-react';

/**
 * Renders traveler ratings bar graph breakdown summary.
 */
export default function ReviewSummary({
  averageRating,
  totalReviews,
  breakdown = {}
}) {
  
  // Custom reverse list to display 5 stars down to 1 star in list
  const starsArray = [5, 4, 3, 2, 1];

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-slate-50/50 p-6.5 rounded-3xl border border-slate-100 select-none text-left w-full">
      
      {/* Left side average value badge */}
      <div className="flex flex-col items-center justify-center shrink-0 w-32 h-32 bg-white rounded-3xl border border-slate-150 shadow-sm text-center">
        <h3 className="text-3xl md:text-4.5xl font-black text-slate-855 leading-none">
          {averageRating.toFixed(2)}
        </h3>
        
        <div className="flex gap-0.5 mt-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < Math.round(averageRating) ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}
            />
          ))}
        </div>
        
        <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider mt-3">
          {totalReviews} Reviews
        </span>
      </div>

      {/* Right side progress bars deck */}
      <div className="flex-1 w-full space-y-2.5">
        {starsArray.map(star => {
          const item = breakdown[star] || { percentage: 0, count: 0 };
          return (
            <div key={star} className="flex items-center gap-3.5 text-xs font-bold text-slate-600">
              <span className="w-10 text-right shrink-0 text-[11px] font-black uppercase text-slate-400">
                {star} Star
              </span>
              
              {/* Progress bar line */}
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-500" 
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <span className="w-8.5 text-right shrink-0 font-extrabold text-[10px] text-slate-500">
                {item.percentage}%
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
