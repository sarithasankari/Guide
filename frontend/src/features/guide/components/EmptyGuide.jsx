import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Search } from 'lucide-react';

/**
 * Standard visual error block when guide lookup query fails.
 */
export default function EmptyGuide({ error }) {
  const navigate = useNavigate();

  return (
    <div className="py-24 px-6 text-center max-w-lg mx-auto select-none">
      <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
        <AlertCircle size={28} />
      </div>

      <h3 className="text-xl font-black text-slate-850 mb-2.5 tracking-tight">
        Guide Profile Unavailable
      </h3>
      
      <p className="text-slate-500 text-sm leading-relaxed mb-8 font-semibold">
        {error || 'We couldn\'t load the profile for the requested guide. They might be temporarily offline or deactivated.'}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold text-xs tracking-wide uppercase transition-colors cursor-pointer shadow-sm"
        >
          <ArrowLeft size={13} className="stroke-[2.5px]" />
          <span>Go Back</span>
        </button>
        
        <button
          onClick={() => navigate('/search')}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-3 rounded-xl font-bold text-xs tracking-wide uppercase transition-colors cursor-pointer shadow-sm"
        >
          <Search size={13} className="text-teal-500 stroke-[2.5px]" />
          <span>Search Guides</span>
        </button>
      </div>
    </div>
  );
}
