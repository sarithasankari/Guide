import React from 'react';
import { Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewSummary from './ReviewSummary';
import ReviewCard from './ReviewCard';

/**
 * Traveler Reviews widget with dynamic sort dropdown filters and pagination offset buttons.
 */
export default function GuideReviews({
  reviews = [],
  paginatedReviews = [],
  loading,
  sortBy,
  setSortBy,
  currentPage,
  setCurrentPage,
  totalPages,
  totalReviews,
  averageRating,
  ratingBreakdown
}) {

  return (
    <section className="bg-white border border-slate-100 p-6.5 rounded-3xl shadow-[0_2px_15px_-4px_rgba(15,23,42,0.01)] text-left select-none w-full">
      
      {/* Title bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-50 text-teal-650 rounded-xl">
            <MessageSquare size={18} />
          </div>
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
            Traveler Reviews
          </h2>
        </div>

        {/* Inline sorting dropdown selection list */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Sort Reviews:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-full px-3 py-1.5 focus:ring-0 focus:border-slate-300 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>

      {/* Ratings chart */}
      <ReviewSummary
        averageRating={averageRating}
        totalReviews={totalReviews}
        breakdown={ratingBreakdown}
      />

      {/* Individual review list */}
      <div className="mt-8 space-y-4">
        {paginatedReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}

        {reviews.length === 0 && (
          <p className="text-slate-400 text-xs font-semibold py-4 text-center">
            No reviews yet for this guide.
          </p>
        )}
      </div>

      {/* Pagination arrows */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 select-none">
          <span className="text-[10px] text-slate-450 font-black uppercase tracking-wider">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              type="button"
              className={`w-8.5 h-8.5 rounded-xl border flex items-center justify-center transition-all ${
                currentPage === 1
                  ? 'border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed'
                  : 'border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-2xs'
              }`}
            >
              <ChevronLeft size={14} className="stroke-[2.5px]" />
            </button>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              type="button"
              className={`w-8.5 h-8.5 rounded-xl border flex items-center justify-center transition-all ${
                currentPage === totalPages
                  ? 'border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed'
                  : 'border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-2xs'
              }`}
            >
              <ChevronRight size={14} className="stroke-[2.5px]" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
