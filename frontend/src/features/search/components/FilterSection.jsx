import React, { useState } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable collapsible container for filter sidebar groups, featuring reset buttons and selection counters.
 */
export default function FilterSection({
  title,
  count = 0,
  onReset,
  children,
  defaultExpanded = true
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-slate-100 py-4.5 text-left">
      <div className="flex items-center justify-between group">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 font-black text-slate-800 text-xs tracking-wider uppercase cursor-pointer"
        >
          <ChevronDown
            size={16}
            className={`text-slate-400 group-hover:text-slate-650 transition-transform duration-200 ${
              isExpanded ? '' : '-rotate-90'
            }`}
          />
          <span>{title}</span>
          {count > 0 && (
            <span className="bg-teal-500 text-white w-4.5 h-4.5 text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
              {count}
            </span>
          )}
        </button>

        {count > 0 && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-[9px] font-bold text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer uppercase tracking-widest"
            title={`Reset ${title}`}
          >
            <RefreshCw size={10} className="animate-spin-hover" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-1 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
