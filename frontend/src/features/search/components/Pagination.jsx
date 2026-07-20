import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Clean pagination layout displaying page numbers and active offsets.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  if (totalPages <= 1) return null;

  // Generate range of page numbers to render
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1.5 pt-8 select-none" aria-label="Pagination Navigation">
      
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
        className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center transition-all ${
          currentPage === 1
            ? 'border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed'
            : 'border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-xs'
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} className="stroke-[2.5px]" />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map(page => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            type="button"
            aria-current={isCurrent ? 'page' : undefined}
            className={`w-9.5 h-9.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              isCurrent
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/10 border border-teal-600'
                : 'bg-white border border-slate-200 hover:border-slate-350 text-slate-650 hover:bg-slate-50 shadow-xs'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type="button"
        className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center transition-all ${
          currentPage === totalPages
            ? 'border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed'
            : 'border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer shadow-xs'
        }`}
        aria-label="Next Page"
      >
        <ChevronRight size={16} className="stroke-[2.5px]" />
      </button>

    </nav>
  );
}
