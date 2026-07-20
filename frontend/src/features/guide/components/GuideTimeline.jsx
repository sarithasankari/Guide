import React from 'react';
import { Briefcase } from 'lucide-react';

/**
 * Vertical experience timeline visual credentials segment.
 */
export default function GuideTimeline({ experience = [] }) {
  return (
    <section className="bg-white border border-slate-100 p-6.5 rounded-3xl shadow-[0_2px_15px_-4px_rgba(15,23,42,0.01)] text-left select-none">
      <div className="flex items-center gap-2 mb-6.5">
        <div className="p-2 bg-teal-50 text-teal-650 rounded-xl">
          <Briefcase size={18} />
        </div>
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          Professional Experience
        </h2>
      </div>

      <div className="relative pl-6 border-l-2 border-slate-100 ml-3 space-y-7 pb-2">
        {experience.map((item, idx) => {
          const isLatest = idx === 0;
          return (
            <div key={idx} className="relative">
              {/* Timeline circle point overlay */}
              <div 
                className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-3 border-white transition-all shadow-sm ${
                  isLatest ? 'bg-teal-500 scale-110 shadow-teal-500/20' : 'bg-slate-350'
                }`}
              />
              
              <h3 className="text-sm font-black text-slate-850 leading-tight">
                {item.title}
              </h3>
              <p className="text-[10px] text-teal-650 font-black tracking-wider uppercase mt-1">
                {item.org}
              </p>
              <span className="text-[10px] text-slate-400 font-extrabold mt-0.5 block">
                {item.years}
              </span>
            </div>
          );
        })}

        {experience.length === 0 && (
          <p className="text-slate-400 text-xs font-semibold py-2">
            No experience history details supplied by this guide.
          </p>
        )}
      </div>
    </section>
  );
}
