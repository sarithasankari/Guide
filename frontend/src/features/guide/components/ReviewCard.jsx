import React from 'react';
import { Star } from 'lucide-react';

/**
 * Display layout card for a single traveler review.
 */
export default function ReviewCard({ review }) {
  return (
    <div className="bg-slate-50/55 border border-slate-150 p-5 rounded-3xl text-left select-none">
      
      {/* Header bar (Avatar + metadata) */}
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-tight">{review.name}</h4>
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide mt-0.5 block">
              🌍 {review.country || 'Traveler'}
            </span>
          </div>
        </div>

        <div className="text-right">
          {/* Star rating icons list */}
          <div className="flex gap-0.5" aria-label={`Rating: ${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-400 font-bold block mt-1.5">{review.date}</span>
        </div>
      </div>

      {/* Review Text block */}
      <p className="text-slate-650 text-xs md:text-sm font-semibold leading-relaxed italic">
        "{review.text}"
      </p>

    </div>
  );
}
