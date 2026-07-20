import React from 'react';
import { X, ArrowRight, Columns } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Floating bar at bottom of the page showing active guides for comparison (max 3).
 */
export default function CompareBar({
  comparedGuides = [],
  onRemove,
  onCompareTrigger,
  onClear
}) {
  if (comparedGuides.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[250] w-full max-w-2xl px-4 select-none"
    >
      <div className="bg-slate-900 border border-slate-800 text-white p-4.5 rounded-[2rem] shadow-2xl flex items-center justify-between gap-4">
        
        {/* Guides selected */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {comparedGuides.map(guide => (
              <div key={guide.id} className="relative group shrink-0 w-9.5 h-9.5 rounded-full border-2 border-slate-900 overflow-hidden shadow-sm bg-slate-800">
                <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => onRemove(guide.id)}
                  type="button"
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200 cursor-pointer"
                  title={`Remove ${guide.name}`}
                >
                  <X size={13} className="stroke-[2.5px]" />
                </button>
              </div>
            ))}
            
            {/* Empty slots indicator */}
            {comparedGuides.length < 3 && (
              Array.from({ length: 3 - comparedGuides.length }).map((_, i) => (
                <div key={i} className="w-9.5 h-9.5 rounded-full border-2 border-dashed border-slate-700 bg-slate-800/40 flex items-center justify-center text-[10px] text-slate-500 font-bold shrink-0">
                  +
                </div>
              ))
            )}
          </div>

          <div className="hidden sm:block text-left pl-1">
            <h4 className="text-xs font-black tracking-wide text-slate-100">Guide Comparison</h4>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">
              {comparedGuides.length} of 3 guides selected
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            type="button"
            className="text-[10px] font-black text-slate-400 hover:text-slate-200 px-3 py-2 cursor-pointer transition-colors uppercase tracking-widest"
          >
            Clear
          </button>
          
          <button
            onClick={onCompareTrigger}
            disabled={comparedGuides.length < 2}
            type="button"
            className={`inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-md cursor-pointer ${
              comparedGuides.length >= 2
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-teal-500/10 hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700 shadow-none'
            }`}
          >
            <Columns size={12} />
            <span>Compare Now</span>
            <ArrowRight size={12} className="stroke-[2.5px]" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
