import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Search, Filter } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import PlaceCard from '../components/PlaceCard';
import { GridSkeleton } from '../components/SkeletonLoader';
import STATES_DATA from '../data/states.json';
import CATEGORIES from '../data/categories.json';
import SEO from '../components/SEO';

export default function StateDetails() {
  const { stateSlug } = useParams();
  const navigate = useNavigate();
  
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const stateData = STATES_DATA.find(s => s.slug === stateSlug);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 12;

  useEffect(() => {
    if (!stateData) {
      navigate('/404', { replace: true });
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(false);

    // Using fetch to dynamically load the JSON file from the public/src path
    // Since we are in Vite, we can also use dynamic import for JSON if configured,
    // but a reliable way for data fetching is standard fetch or dynamic import if in src.
    import(`../data/places/${stateSlug}.json`)
      .then(module => {
        if (isMounted) {
          setPlaces(module.default || module);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to load state places", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [stateSlug, stateData, navigate]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  const filteredAndSortedPlaces = useMemo(() => {
    let result = places.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            place.district.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'free':
        result.sort((a, b) => (a.isFree === b.isFree) ? 0 : a.isFree ? -1 : 1);
        break;
      case 'popular':
      default:
        // Default order from JSON
        break;
    }
    return result;
  }, [places, searchTerm, selectedCategory, sortBy]);

  if (!stateData) return null; // handled by useEffect redirect

  const displayedPlaces = filteredAndSortedPlaces.slice(0, currentPage * placesPerPage);

  const crumbs = [
    { label: 'States', path: '/#explore' },
    { label: stateData.name, path: `/states/${stateData.slug}` }
  ];

  if (error) {
    return (
      <div className="pt-32 pb-20 text-center max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading state data</h2>
        <p className="text-slate-600">Please try again later or contact support.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors pb-20 min-h-screen">
      <SEO 
        title={stateData ? `Explore ${stateData.name}` : 'State Details'}
        description={stateData?.description || `Tourist guide for ${stateData?.name}`}
        url={`/states/${stateSlug}`}
        image={stateData?.image}
      />
      
      {/* Hero Section */}
      <div className="relative h-[45vh] min-h-[400px] w-full bg-slate-900 overflow-hidden">
        <img src={stateData.image} alt={stateData.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8 md:p-16">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">{stateData.name}</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-slate-200 font-medium drop-shadow">{stateData.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <Breadcrumbs crumbs={crumbs} />

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Capital</h3>
            <p className="text-lg font-bold text-slate-800">{stateData.capital}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Best Time</h3>
            <p className="text-lg font-bold text-slate-800">{stateData.bestTimeToVisit}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Famous Food</h3>
            <p className="text-lg font-bold text-slate-800 line-clamp-1">{stateData.famousFood}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Climate</h3>
            <p className="text-lg font-bold text-slate-800">{stateData.climate}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between border border-slate-200 sticky top-20 z-30">
          <div className="relative w-full lg:w-96 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search places or districts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedCategory === 'All' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200/50'}`}
              >
                All
              </button>
              {CATEGORIES.slice(0, 6).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200/50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="shrink-0 flex items-center gap-2 border-l border-slate-200 pl-4 ml-1">
              <Filter size={18} className="text-slate-400" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="free">Free Entry First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Places Header */}
        <div className="mb-6 flex justify-between items-end">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Destinations</h2>
          <span className="text-slate-500 font-medium bg-slate-200/50 px-3 py-1 rounded-lg text-sm">{filteredAndSortedPlaces.length} found</span>
        </div>

        {/* Content */}
        {loading ? (
          <GridSkeleton count={8} />
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-red-100 shadow-sm">
            <div className="text-red-500 mb-4 flex justify-center"><Filter size={48} /></div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Failed to load destinations</h3>
            <p className="text-slate-500">We couldn't retrieve the places for this state. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedPlaces.map(place => (
                <PlaceCard key={place.id} place={place} stateData={stateData} />
              ))}
            </div>
            
            {filteredAndSortedPlaces.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <h3 className="text-2xl font-bold text-slate-700 mb-2">No places found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {/* Load More Pagination */}
            {currentPage * placesPerPage < filteredAndSortedPlaces.length && (
              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-8 py-3.5 bg-white border-2 border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-600 hover:bg-teal-50/50 font-bold rounded-xl shadow-sm transition-all flex items-center gap-2"
                >
                  Load More Places
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
