import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, ChevronRight, Star, ShieldCheck, MessageSquare, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GUIDES, CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import TrendingStates from '../components/TrendingStates';
import SEO from '../components/SEO';

export default function Home() {
  const navigate = useNavigate();
  const { setSearchQuery } = useApp();
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Track active input focus for styling the search bar segments
  const [focusedSegment, setFocusedSegment] = useState(null); // 'location' | 'dates' | 'guests' | null

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery({ location, dates, guests, category: activeCategory });
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (activeCategory) params.append('category', activeCategory);
    if (dates) params.append('dates', dates);
    if (guests) params.append('guests', guests);
    
    navigate(`/search?${params.toString()}`);
  };

  const handleCategoryClick = (label) => {
    const cat = activeCategory === label ? null : label;
    setActiveCategory(cat);
    setSearchQuery({ location, dates, guests, category: cat });
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (cat) params.append('category', cat);
    if (dates) params.append('dates', dates);
    if (guests) params.append('guests', guests);
    
    navigate(`/search?${params.toString()}`);
  };

  const featuredGuides = GUIDES.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full overflow-hidden bg-slate-50/50">
      <SEO title="Explore India with Verified Local Guides" />
      
      {/* Hero Section */}
      <section className="relative isolate py-12 md:py-0 md:min-h-[600px] md:h-[85vh] flex items-center justify-center text-center text-white">
        {/* Animated Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 z-[-1] bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.75) 65%, rgba(15,23,42,0.95) 100%), url("/hero.png")',
          }}
        />
        
        <motion.div 
          className="container mx-auto px-4 relative z-10 pb-12"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
        >
          {/* Spark Badge */}
          <div className="inline-flex items-center gap-1.5 bg-teal-500/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-teal-300 border border-teal-500/20 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-450" /> Vetted Local Guide Network
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] font-black mb-6 tracking-tight leading-[1.05] text-white drop-shadow-md">
            Discover India with <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
              Verified Local Experts
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-10 max-w-xl mx-auto text-slate-100/90 font-medium leading-relaxed drop-shadow-sm">
            Skip the tourist traps. Find verified, specialized local guides for private custom adventures tailored exactly to your rhythm.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto px-2">
            <div className="bg-white rounded-3xl md:rounded-full p-2 flex flex-col md:flex-row items-center shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-slate-100 gap-1 md:gap-0">
              
              {/* Location Input Segment */}
              <div 
                className={`flex-1 w-full p-3.5 px-4 sm:px-6 rounded-2xl md:rounded-l-full text-left transition-all duration-300 cursor-pointer ${
                  focusedSegment === 'location' ? 'bg-slate-50/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]' : 'hover:bg-slate-50/50'
                }`}
                onClick={() => setFocusedSegment('location')}
              >
                <label className="block text-[9px] font-black text-slate-450 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <MapPin size={11} className="text-teal-655" /> Destination
                </label>
                <input 
                  className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-extrabold" 
                  value={location} 
                  onChange={e => setLocation(e.target.value)} 
                  onFocus={() => setFocusedSegment('location')}
                  onBlur={() => setFocusedSegment(null)}
                  type="text" 
                  placeholder="Where are you going?" 
                />
              </div>

              {/* Separator on Desktop */}
              <div className="hidden md:block h-8 w-px bg-slate-100" />

              {/* Dates Input Segment */}
              <div 
                className={`flex-1 w-full p-3.5 px-4 sm:px-6 text-left transition-all duration-300 cursor-pointer ${
                  focusedSegment === 'dates' ? 'bg-slate-50/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]' : 'hover:bg-slate-50/50'
                }`}
                onClick={() => setFocusedSegment('dates')}
              >
                <label className="block text-[9px] font-black text-slate-450 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Calendar size={11} className="text-teal-655" /> Dates
                </label>
                <input 
                  className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-extrabold" 
                  value={dates} 
                  onChange={e => setDates(e.target.value)} 
                  onFocus={() => setFocusedSegment('dates')}
                  onBlur={() => setFocusedSegment(null)}
                  type="text" 
                  placeholder="Add travel dates" 
                />
              </div>

              {/* Separator on Desktop */}
              <div className="hidden md:block h-8 w-px bg-slate-100" />

              {/* Guests Input Segment */}
              <div 
                className={`flex-1 w-full p-3.5 px-4 sm:px-6 rounded-2xl md:rounded-r-none text-left transition-all duration-300 cursor-pointer ${
                  focusedSegment === 'guests' ? 'bg-slate-50/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]' : 'hover:bg-slate-50/50'
                }`}
                onClick={() => setFocusedSegment('guests')}
              >
                <label className="block text-[9px] font-black text-slate-450 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Users size={11} className="text-teal-655" /> Travelers
                </label>
                <input 
                  className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-extrabold" 
                  value={guests} 
                  onChange={e => setGuests(e.target.value)} 
                  onFocus={() => setFocusedSegment('guests')}
                  onBlur={() => setFocusedSegment(null)}
                  type="text" 
                  placeholder="Add guest count" 
                />
              </div>

              {/* Search Submit Button */}
              <button 
                type="submit" 
                className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white p-4.5 rounded-2xl md:rounded-full flex items-center justify-center transition-all shadow-md shadow-teal-500/10 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer md:mx-2"
              >
                <Search size={18} className="stroke-[3px]" />
                <span className="md:hidden ml-2 font-extrabold text-sm tracking-wide">Search Guides</span>
              </button>

            </div>
          </form>
        </motion.div>
      </section>

      {/* Categories Selector */}
      <section className="container mx-auto px-3 sm:px-4 pt-6 pb-2 md:py-0 md:-mt-20 relative z-20">
        <motion.div 
          className="bg-white/95 backdrop-blur-xl border border-slate-100/80 p-4 sm:p-6.5 rounded-3xl shadow-[0_15px_40px_rgba(15,23,42,0.04)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 items-center justify-items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {CATEGORIES.map(cat => {
            const isSelected = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat.label)}
                className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 w-full group ${
                  isSelected ? '-translate-y-0.5' : 'hover:-translate-y-0.5'
                }`}
              >
                <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/20' 
                    : 'bg-slate-50/70 border-slate-100 text-slate-600 hover:bg-teal-50/50 hover:text-teal-600 hover:border-teal-500/10'
                }`}>
                  <span className="w-5 h-5 sm:w-5.5 sm:h-5.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">{cat.icon}</span>
                </div>
                <span className={`text-[10px] sm:text-[11px] font-black tracking-wide uppercase text-center transition-colors ${
                  isSelected ? 'text-teal-650' : 'text-slate-500 group-hover:text-teal-600'
                }`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* Trending Destinations Component */}
      <TrendingStates />

      {/* Featured Guides Section */}
      <motion.section 
        className="container mx-auto px-4 mt-28 max-w-7xl"
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Meet Elite Local Guides</h2>
            <p className="text-slate-500 text-sm md:text-base font-bold">Verified local specialists reviewed by real global travelers.</p>
          </div>
          <Link to="/search" className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-teal-500/20 hover:bg-teal-50/30 text-teal-605 px-4 py-2 rounded-full font-bold transition-all text-xs tracking-wider uppercase shadow-sm">
            View All Experts <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGuides.map(guide => (
            <motion.div 
              key={guide.id} 
              variants={itemVariants} 
              className="bg-white rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(15,23,42,0.06)] border border-slate-100 overflow-hidden flex flex-col group transition-all duration-300"
            >
              {/* Photo Area */}
              <div className="relative h-[260px] overflow-hidden bg-slate-100">
                <img src={guide.image} alt={guide.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 text-slate-800 shadow-sm z-20 border border-slate-100">
                  <Star size={12} className="fill-amber-500 text-amber-500" /> {guide.rating.toFixed(2)}
                </div>

                {/* Online Indicator */}
                {guide.online && (
                  <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase shadow-md shadow-emerald-500/10 z-20">
                    ● ONLINE NOW
                  </div>
                )}
              </div>

              {/* Guide Profile Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-black text-slate-900 mb-1 leading-tight">{guide.name}</h3>
                <p className="text-[10px] font-black text-slate-450 uppercase tracking-widest mb-4.5 flex items-center gap-1">
                  <MapPin size={11} className="text-teal-500" /> {guide.role} • {guide.city}
                </p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6">
                  {guide.bio || "Local expert specialized in history, arts, architecture, and hidden culinary spots."}
                </p>

                {/* Pricing & Link */}
                <div className="mt-auto pt-5 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-405 font-black uppercase tracking-widest">Hourly Rate</span>
                    <span className="text-slate-900 font-black text-lg">${guide.price}<span className="text-slate-400 font-medium text-xs"> / hr</span></span>
                  </div>
                  <Link 
                    to={`/guide/${guide.id}`} 
                    className="bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works Section */}
      <section className="bg-white py-28 border-t border-slate-100 mt-28 relative">
        <motion.div 
          className="container mx-auto px-4 text-center max-w-7xl"
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Seamless Exploration</h2>
          <p className="text-slate-500 text-sm md:text-base font-bold max-w-lg mx-auto mb-16">Experience the easiest and most secure way to discover authentic private travel.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { icon: <Search size={24} />, step: '1. Find Your Guide', desc: 'Search and filter vetted experts by specialties, languages spoken, budget, and local state knowledge.' },
              { icon: <MessageSquare size={24} />, step: '2. Customize Itinerary', desc: 'Message guides directly to fine-tune your schedules, custom food diets, or hiking trails.' },
              { icon: <ShieldCheck size={24} />, step: '3. Explore Safely', desc: 'Book securely via GuideConnect. Enjoy authorized entry points, VIP access, and local safety.' },
            ].map((item, idx) => (
              <motion.div 
                key={item.step} 
                variants={itemVariants} 
                className="card bg-white p-8 text-center flex flex-col items-center justify-start hover:-translate-y-1.5 shadow-sm hover:shadow-md transition-all duration-300 relative"
              >
                {/* Step Count Bubble */}
                <div className="absolute top-4 right-4 text-[10px] font-bold text-teal-650 bg-teal-50/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Step 0{idx + 1}
                </div>

                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-650 flex items-center justify-center mb-6 shadow-sm border border-emerald-100/30">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-teal-700 tracking-tight">{item.step}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
