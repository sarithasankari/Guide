import React, { useState } from 'react';
import { Compass, HelpCircle } from 'lucide-react';

/**
 * Expandable biography description detailing tour philosophy and local expertise.
 */
export default function GuideAbout({ guide }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const bioText = guide.bio || "Local guide specializing in heritage walks, historical architectures, and nature exploration.";
  
  // Decide whether to show "Read More" toggle based on text length
  const isLongText = bioText.length > 250;
  const displayText = isExpanded || !isLongText ? bioText : `${bioText.slice(0, 240)}...`;

  return (
    <section className="bg-white border border-slate-100 p-6.5 rounded-3xl shadow-[0_2px_15px_-4px_rgba(15,23,42,0.01)] text-left select-none">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-teal-50 text-teal-650 rounded-xl">
          <Compass size={18} />
        </div>
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          About the Guide
        </h2>
      </div>

      {/* Biography */}
      <div className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed mb-6">
        <p>{displayText}</p>
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
            className="text-teal-650 font-black hover:text-teal-700 mt-2 block cursor-pointer transition-colors"
          >
            {isExpanded ? 'Show Less ↑' : 'Read More ↓'}
          </button>
        )}
      </div>

      {/* Grid of philosophy and local secrets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5 border-t border-slate-100">
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <HelpCircle size={13} className="text-teal-500" /> Why travelers choose me
          </h4>
          <p className="text-slate-600 text-xs leading-relaxed font-semibold">
            Deep historical contexts, custom itineraries, private tempo pacing, and verified safety focus on every tour route.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Compass size={13} className="text-teal-500" /> Tour Philosophy
          </h4>
          <p className="text-slate-600 text-xs leading-relaxed font-semibold">
            Tours are interactive conversations, not standard lectures. Let's unlock the local food stops and secrets of the city together!
          </p>
        </div>
      </div>

    </section>
  );
}
