import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Compass, ChevronRight, ChevronDown, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import statesData from '../data/statesData';

// Reusable StateImage component to handle fallbacks
const StateImage = ({ src, alt, slug }) => {
  const [error, setError] = useState(false);
  return (
    <img 
      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      src={error ? "https://images.unsplash.com/photo-1506461883276-594a12b11ce3?auto=format&fit=crop&w=800&q=80" : src} 
      alt={alt} 
      onError={() => setError(true)}
    />
  );
};

// Reusable PlacesList component for chip layout
const PlacesList = ({ places }) => {
  if (!places || places.length === 0) return null;
  
  return (
    <div className="mt-2.5">
      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Famous Attractions:</h4>
      <div className="flex flex-wrap gap-1.5">
        {places.map((place, index) => (
          <span 
            key={index} 
            className="text-[10px] sm:text-xs bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-teal-100 dark:border-teal-900/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors duration-200"
          >
            {place}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function StateCard({ state, itemVariants }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Match current state with the loaded statesData by state name
  const matchedStateData = statesData.find(
    (s) => s.state.toLowerCase() === state.name.toLowerCase()
  );
  const places = matchedStateData ? matchedStateData.places : [];

  return (
    <motion.div variants={itemVariants} className="h-full">
      <div 
        onClick={() => setIsExpanded(prev => !prev)}
        className="group h-full flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(15,23,42,0.06)] hover:-translate-y-1.5 border border-slate-100 dark:border-slate-800 transition-all duration-300 cursor-pointer relative"
      >
        {/* Top Image Section */}
        <div className="w-full h-40 sm:h-44 shrink-0 relative overflow-hidden bg-slate-200 dark:bg-slate-700">
          <StateImage src={state.image} alt={state.name} slug={state.slug} />
          
          {/* Rating Badge */}
          <div className="absolute top-2.5 right-2.5 z-10 bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm">
            <Star size={13} className="fill-amber-500 text-amber-500" /> 4.8
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4.5 flex flex-col flex-grow">
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1.5 tracking-tight flex items-center justify-between w-full">
            <span className="flex items-center gap-1.5 min-w-0">
              <MapPin size={16} className="text-teal-700 dark:text-teal-400 shrink-0" /> 
              <span className="truncate">{state.name}</span>
            </span>
            <ChevronDown 
              size={18} 
              className={`text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} shrink-0`} 
            />
          </h3>
          
          <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 italic mb-3.5 pl-[22px] line-clamp-1">
            "{state.description}"
          </p>
          
          <div className="flex items-start gap-1.5 mb-2 text-slate-600 dark:text-slate-400">
            <Navigation size={13} className="shrink-0 mt-0.5 opacity-70" />
            <p className="text-xs leading-relaxed line-clamp-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Top:</span> {state.capital}
            </p>
          </div>

          <div className="flex items-center gap-1.5 mb-4 text-slate-600 dark:text-slate-400">
            <Compass size={13} className="opacity-70" />
            <span className="text-xs font-medium truncate">
              {state.touristPlacesCount}+ Popular Places
            </span>
          </div>

          <div 
            onClick={(e) => {
              e.stopPropagation(); // Prevent toggling expansion when clicking "Explore"
              navigate(`/states/${state.slug}`);
            }}
            className="mt-auto w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs md:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all duration-300"
          >
            Explore <ChevronRight size={15} />
          </div>

          {/* Expandable places section */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/50 mt-3">
                  <PlacesList places={places} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
