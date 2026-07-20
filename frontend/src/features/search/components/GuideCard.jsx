import React, { useState } from 'react';
import { Heart, Star, MapPin, CheckCircle2, Zap, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import { calculateExperienceYears } from '../utils/searchHelpers';

/**
 * Premium guide result card. Displays rich details, rating counts, comparing checkboxes, and direct book buttons.
 */
export default function GuideCard({
  guide,
  isCompared,
  onCompareToggle
}) {
  const navigate = useNavigate();
  const { toggleSave, isSaved } = useApp();
  const [imgError, setImgError] = useState(false);

  const expYears = calculateExperienceYears(guide.experience);
  const isFavorite = isSaved(guide.id);

  const handleBookNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/book/${guide.id}`);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 hover:border-teal-500/10 shadow-[0_2px_15px_-4px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.08)] flex flex-col group overflow-hidden transition-all duration-350 select-none text-left">
      
      {/* Cover Image & Overlays */}
      <div className="relative h-56 bg-slate-100 overflow-hidden shrink-0">
        <img
          src={imgError ? `https://picsum.photos/seed/${guide.id}/800/600` : guide.coverImage || guide.image}
          alt={`${guide.name} Cover`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent z-10" />

        {/* Top Floating Icons */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
          {/* Compare Checkbox */}
          <label 
            onClick={(e) => e.stopPropagation()} 
            className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest cursor-pointer border border-white/10 hover:bg-black/50 transition-colors"
          >
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onCompareToggle(guide.id)}
              className="accent-teal-500 cursor-pointer rounded border-slate-300 w-3.5 h-3.5"
            />
            <span>Compare</span>
          </label>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); toggleSave(guide.id); }}
            className="w-8.5 h-8.5 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-500 hover:text-rose-500 active:scale-90 transition-all shadow-sm border border-slate-100 cursor-pointer"
            aria-label={isFavorite ? "Remove from saved" : "Save to favorites"}
          >
            <Heart size={16} fill={isFavorite ? '#F43F5E' : 'none'} className={isFavorite ? 'text-rose-500' : 'text-slate-500'} />
          </button>
        </div>

        {/* Bottom Floating Badges */}
        <div className="absolute bottom-4 inset-x-4 flex flex-wrap gap-1.5 z-20 items-end justify-between">
          <div className="flex flex-wrap gap-1.5">
            {guide.verified && (
              <span className="inline-flex items-center gap-1 bg-teal-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase shadow-sm">
                <ShieldCheck size={11} className="stroke-[2.5px]" /> Verified
              </span>
            )}
            {guide.instantBook && (
              <span className="inline-flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase shadow-sm">
                <Zap size={11} className="fill-current" /> Instant Book
              </span>
            )}
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-0.5 text-slate-800 shadow-sm border border-slate-150">
            <Star size={11} className="fill-amber-500 text-amber-500" /> {guide.rating.toFixed(2)} ({guide.reviews})
          </div>
        </div>
      </div>

      {/* Guide Metadata Area */}
      <div className="p-5.5 flex flex-col flex-grow relative pt-10">
        {/* Overlapping Avatar Icon */}
        <div className="absolute -top-7 left-5 w-14 h-14 rounded-2xl border-3 border-white bg-slate-200 overflow-hidden shadow-md">
          <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex justify-between items-start gap-2 mb-1.5">
          <h3 className="text-base font-black text-slate-850 leading-tight tracking-tight hover:text-teal-600 transition-colors">
            <Link to={`/guide/${guide.id}`}>{guide.name}</Link>
          </h3>
          {/* Availability Pill */}
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase flex items-center gap-1 shrink-0 ${
            guide.available 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
              : 'bg-rose-50 text-rose-600 border border-rose-100'
          }`}>
            <span className={`w-1 h-1 rounded-full ${guide.available ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {guide.available ? 'Available' : 'Booked'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">
          <MapPin size={12} className="text-teal-500" /> {guide.city}, India
        </div>

        {/* Specifications Matrix */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 bg-slate-50/70 p-3 rounded-2xl border border-slate-100 mb-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-slate-400 shrink-0" />
            <span className="truncate">Responds: <span className="text-slate-800 font-bold">1h</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] shrink-0 leading-none">🎖️</span>
            <span className="truncate">Exp: <span className="text-slate-800 font-bold">{expYears}+ Years</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] shrink-0 leading-none">🗣️</span>
            <span className="truncate">Languages: <span className="text-slate-800 font-bold">{guide.languages?.slice(0,2).join(', ')}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] shrink-0 leading-none">🎒</span>
            <span className="truncate">Tours: <span className="text-slate-800 font-bold">{guide.reviews + 10}+ done</span></span>
          </div>
        </div>

        <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2 mb-5">
          {guide.bio || "Vetted local guide specializing in cultural heritage, city exploration, architecture, and secret spot discovery."}
        </p>

        {/* Price & Action Buttons */}
        <div className="mt-auto pt-4.5 border-t border-slate-50 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Starting Price</span>
            <span className="text-slate-850 font-black text-lg">${guide.price}<span className="text-slate-400 font-medium text-xs"> / hr</span></span>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/guide/${guide.id}`}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-50 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              Profile
            </Link>
            <button
              onClick={handleBookNow}
              disabled={!guide.available}
              className={`px-4.5 py-2.5 rounded-xl text-white text-[10px] font-black uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                guide.available
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-teal-500/10 hover:shadow-lg hover:-translate-y-0.5'
                  : 'bg-slate-200 cursor-not-allowed text-slate-400 shadow-none'
              }`}
            >
              Book Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
