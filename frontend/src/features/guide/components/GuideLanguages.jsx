import React from 'react';
import { Globe } from 'lucide-react';

/**
 * Display languages spoken in custom travel chips.
 */
export default function GuideLanguages({ languages = [] }) {
  return (
    <section className="bg-white border border-slate-100 p-6.5 rounded-3xl shadow-[0_2px_15px_-4px_rgba(15,23,42,0.01)] text-left select-none">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-teal-50 text-teal-650 rounded-xl">
          <Globe size={18} />
        </div>
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          Spoken Languages
        </h2>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {languages.map(lang => (
          <div 
            key={lang}
            className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs"
          >
            <span className="text-sm">🗣️</span>
            <span>{lang}</span>
            <span className="text-[10px] text-slate-400 font-extrabold bg-white px-2 py-0.5 border border-slate-100 rounded-full">
              Fluent
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
