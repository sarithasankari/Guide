import React from 'react';
import { Heart, Star, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { calculateExperienceYears } from '../../search/utils/searchHelpers';

/**
 * Premium Hero banner showing cover image, avatar, title info, and badges.
 */
export default function GuideHero({ guide }) {
  const { toggleSave, isSaved } = useApp();
  const saved = isSaved(guide.id);
  const expYears = calculateExperienceYears(guide.experience);

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Cover Image Banner */}
      <div 
        className="h-80 md:h-[450px] bg-slate-100 bg-cover bg-center relative"
        style={{ backgroundImage: `url("${guide.coverImage}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        
        {/* Top Control Bar (Favorites & Back buttons) */}
        <div className="absolute top-6 inset-x-4 max-w-7xl mx-auto flex items-center justify-end px-4 z-20">
          <button
            onClick={() => toggleSave(guide.id)}
            type="button"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-500 hover:text-rose-500 active:scale-90 transition-all shadow-md cursor-pointer border border-slate-100"
            aria-label={saved ? 'Remove from saved' : 'Save guide details'}
          >
            <Heart size={18} fill={saved ? '#F43F5E' : 'none'} className={saved ? 'text-rose-500' : 'text-slate-500'} />
          </button>
        </div>

        {/* Floating Profile Title Summary Details */}
        <div className="absolute bottom-0 inset-x-0 pb-8 z-10">
          <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row md:items-end gap-6 text-left">
            
            {/* Avatar image frame */}
            <div className="relative -mb-16 md:-mb-10 shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 border-white bg-slate-200 overflow-hidden shadow-xl z-20">
              <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
              {guide.online && (
                <span 
                  className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-md animate-pulse" 
                  title="Online Guide Available"
                />
              )}
            </div>

            {/* Information details */}
            <div className="flex-1 text-white md:mb-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                {guide.verified && (
                  <span className="inline-flex items-center gap-1 bg-teal-500 text-white px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">
                    <ShieldCheck size={11} className="stroke-[2.5px]" /> Verified Pro
                  </span>
                )}
                {guide.instantBook && (
                  <span className="inline-flex items-center gap-1 bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">
                    <Zap size={11} className="fill-current" /> Instant Confirmation
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-4.5xl font-black tracking-tight leading-tight mb-2 text-white">
                {guide.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm font-semibold text-slate-200">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-teal-400" /> {guide.location}
                </span>
                <span className="hidden md:inline text-slate-400">•</span>
                <span className="flex items-center gap-1 text-amber-300">
                  <Star size={14} className="fill-current text-amber-300" /> {guide.rating} ({guide.reviews} traveler reviews)
                </span>
                <span className="hidden md:inline text-slate-400">•</span>
                <span>🏅 {expYears}+ Years Experience</span>
              </div>
            </div>

          </div>
        </div>

      </div>
      {/* Spacer to push details layout below avatar stack overflow on mobile */}
      <div className="h-16 md:h-8 bg-transparent" />
    </div>
  );
}
