import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

function PlaceCard({ place, stateData }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col group h-full">
      <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-700">
        <img 
          src={imgError ? "https://images.unsplash.com/photo-1506461883276-594a12b11ce3?auto=format&fit=crop&w=800&q=80" : place.image} 
          alt={place.name} 
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm text-sm font-bold text-slate-800 dark:text-slate-100">
          <Star size={14} className="text-yellow-500 fill-current" />
          {place.rating}
        </div>
        <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
          {place.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {place.name}
        </h3>
        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 mb-3 text-sm font-medium">
          <MapPin size={16} className="text-teal-600 dark:text-teal-400" />
          {place.district}
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 line-clamp-2 flex-grow">
          {place.shortDescription}
        </p>
        
        <Link 
          to={`/states/${stateData.slug}/${place.slug}`}
          state={{ place, stateData }}
          className="mt-auto w-full py-3 px-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-teal-700 dark:text-teal-400 border border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700 font-semibold text-center rounded-xl transition-colors focus:ring-2 focus:ring-teal-500 outline-none"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default React.memo(PlaceCard);
