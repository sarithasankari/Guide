import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SORT_OPTIONS } from '../constants/sortOptions';

/**
 * Custom sorting dropdown UI component.
 */
export default function SortDropdown({
  sortBy,
  onChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentOption = SORT_OPTIONS.find(opt => opt.value === sortBy) || SORT_OPTIONS[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative select-none text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center justify-between gap-2.5 bg-white border border-slate-200 hover:border-slate-350 px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 shadow-xs transition-all cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>Sort: <span className="text-slate-900 font-extrabold">{currentOption.label}</span></span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            role="listbox"
            className="absolute right-0 top-[115%] bg-white border border-slate-150 rounded-2xl shadow-xl shadow-slate-100/70 z-[100] min-w-[210px] py-1.5 overflow-hidden"
          >
            {SORT_OPTIONS.map(opt => {
              const isSelected = opt.value === sortBy;
              return (
                <li
                  key={opt.id}
                  onClick={() => handleSelect(opt.value)}
                  role="option"
                  aria-selected={isSelected}
                  className={`flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 text-teal-700 font-extrabold'
                      : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={13} className="text-teal-650 stroke-[3px]" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
