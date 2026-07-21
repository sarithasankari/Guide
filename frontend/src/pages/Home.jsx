import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, ChevronRight, Star, ShieldCheck, MessageSquare, Sparkles, Compass, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GUIDES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import TrendingStates from '../components/TrendingStates';
import TrendingCarousel from '../components/TrendingCarousel';
import TestimonialsSection from '../components/TestimonialsSection';
import TravelTipsSection from '../components/TravelTipsSection';
import FAQSection from '../components/FAQSection';
import SEO from '../components/SEO';

const CATEGORIES_PILLARS = [
  { id: 'beaches', label: 'Beaches', icon: '🏖️', count: '120+ Spots' },
  { id: 'hills', label: 'Hills & Valleys', icon: '⛰️', count: '85+ Peaks' },
  { id: 'heritage', label: 'Heritage & Forts', icon: '🏰', count: '240+ Forts' },
  { id: 'wildlife', label: 'Wildlife Safaris', icon: '🐅', count: '50+ Parks' },
  { id: 'temples', label: 'Temples & Sacred', icon: '🛕', count: '300+ Temples' },
  { id: 'adventure', label: 'Adventure Treks', icon: '🧗', count: '90+ Trails' },
  { id: 'waterfalls', label: 'Waterfalls', icon: '🌊', count: '65+ Falls' }
];

export default function Home() {
  const navigate = useNavigate();
  const { setSearchQuery } = useApp();
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [focusedSegment, setFocusedSegment] = useState(null);

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
    <div className="w-full overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors">
      <SEO title="Explore Incredible India with Verified Local Guides & Custom Itineraries" />
      
      {/* Hero Section */}
      <section className="relative isolate py-16 sm:py-24 md:min-h-[720px] md:h-[90vh] flex items-center justify-center text-center text-white">
        {/* Animated Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 z-[-1] bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.75) 60%, rgba(15,23,42,0.98) 100%), url("https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=80")',
          }}
        />
        
        <motion.div 
          className="container mx-auto px-4 relative z-10 pb-8"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
        >
          {/* Spark Badge */}
          <div className="inline-flex items-center gap-2 bg-teal-500/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-teal-300 border border-teal-500/30 mb-6 shadow-md">
            <Sparkles className="w-4 h-4 text-teal-300" /> Incredible India Tourism Portal
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] text-white drop-shadow-lg max-w-5xl mx-auto">
            Experience Incredible India with <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
              Verified Local Experts
            </span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto text-slate-100/90 font-medium leading-relaxed drop-shadow">
            Uncover ancient temples, tropical coastlines, royal palaces, and pristine hill stations with certified private guides.
          </p>

          {/* Search Bar & Explore CTA */}
          <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto px-2">
            <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl md:rounded-full p-2 flex flex-col md:flex-row items-center shadow-2xl border border-white/20 gap-1 md:gap-0">
              
              {/* Location Input Segment */}
              <div 
                className={`flex-1 w-full p-3.5 px-4 sm:px-6 rounded-2xl md:rounded-l-full text-left transition-all duration-300 cursor-pointer ${
                  focusedSegment === 'location' ? 'bg-slate-100/80 dark:bg-slate-800' : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/50'
                }`}
                onClick={() => setFocusedSegment('location')}
              >
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <MapPin size={11} className="text-teal-600" /> Destination
                </label>
                <input 
                  className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder:text-slate-400 text-sm font-extrabold" 
                  value={location} 
                  onChange={e => setLocation(e.target.value)} 
                  onFocus={() => setFocusedSegment('location')}
                  onBlur={() => setFocusedSegment(null)}
                  type="text" 
                  placeholder="e.g. Rajasthan, Kerala, Goa..." 
                />
              </div>

              {/* Separator on Desktop */}
              <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-700" />

              {/* Dates Input Segment */}
              <div 
                className={`flex-1 w-full p-3.5 px-4 sm:px-6 text-left transition-all duration-300 cursor-pointer ${
                  focusedSegment === 'dates' ? 'bg-slate-100/80 dark:bg-slate-800' : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/50'
                }`}
                onClick={() => setFocusedSegment('dates')}
              >
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Calendar size={11} className="text-teal-600" /> Travel Dates
                </label>
                <input 
                  className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder:text-slate-400 text-sm font-extrabold" 
                  value={dates} 
                  onChange={e => setDates(e.target.value)} 
                  onFocus={() => setFocusedSegment('dates')}
                  onBlur={() => setFocusedSegment(null)}
                  type="text" 
                  placeholder="Add travel dates" 
                />
              </div>

              {/* Separator on Desktop */}
              <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-700" />

              {/* Guests Input Segment */}
              <div 
                className={`flex-1 w-full p-3.5 px-4 sm:px-6 rounded-2xl md:rounded-r-none text-left transition-all duration-300 cursor-pointer ${
                  focusedSegment === 'guests' ? 'bg-slate-100/80 dark:bg-slate-800' : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/50'
                }`}
                onClick={() => setFocusedSegment('guests')}
              >
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Users size={11} className="text-teal-600" /> Travelers
                </label>
                <input 
                  className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder:text-slate-400 text-sm font-extrabold" 
                  value={guests} 
                  onChange={e => setGuests(e.target.value)} 
                  onFocus={() => setFocusedSegment('guests')}
                  onBlur={() => setFocusedSegment(null)}
                  type="text" 
                  placeholder="Number of guests" 
                />
              </div>

              {/* Search Submit Button - Explore India CTA */}
              <button 
                type="submit" 
                className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white py-3.5 px-7 rounded-2xl md:rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer md:mx-1 font-black text-sm tracking-wide shrink-0"
              >
                <Search size={18} className="stroke-[3px]" />
                <span>Explore India</span>
              </button>

            </div>
          </form>
        </motion.div>
      </section>

      {/* 7 Core Categories Selector */}
      <section className="container mx-auto px-4 pt-6 pb-2 md:py-0 md:-mt-16 relative z-20 max-w-7xl">
        <motion.div 
          className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 p-4 sm:p-6 rounded-3xl shadow-xl grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 items-center justify-items-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {CATEGORIES_PILLARS.map(cat => {
            const isSelected = activeCategory === cat.label;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.label)}
                className={`flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-300 w-full group ${
                  isSelected ? '-translate-y-1' : 'hover:-translate-y-0.5'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/30' 
                    : 'bg-slate-50 dark:bg-slate-700/60 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:border-teal-300'
                }`}>
                  {cat.icon}
                </div>
                <span className={`text-[11px] font-extrabold tracking-tight text-center leading-tight transition-colors ${
                  isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-slate-700 dark:text-slate-300 group-hover:text-teal-600'
                }`}>
                  {cat.label}
                </span>
                <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* Trending Destinations Carousel Component */}
      <TrendingCarousel />

      {/* Popular States Component */}
      <TrendingStates />

      {/* Featured Guides Section */}
      <motion.section 
        className="container mx-auto px-4 py-16 sm:py-24 max-w-7xl"
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200/50 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <ShieldCheck size={14} /> Vetted Local Talent
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Meet Elite Local Guides</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium mt-1">Verified local specialists reviewed by real global travelers.</p>
          </div>
          <Link to="/search" className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500/30 text-teal-700 dark:text-teal-400 px-5 py-2.5 rounded-full font-bold transition-all text-xs tracking-wider uppercase shadow-sm">
            View All Experts <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGuides.map(guide => (
            <motion.div 
              key={guide.id} 
              variants={itemVariants} 
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col group transition-all duration-300"
            >
              {/* Photo Area */}
              <div className="relative h-[260px] overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img src={guide.image} alt={guide.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 text-slate-800 dark:text-slate-100 shadow-sm z-20 border border-slate-100 dark:border-slate-700">
                  <Star size={13} className="fill-amber-500 text-amber-500" /> {guide.rating.toFixed(2)}
                </div>

                {/* Online Indicator */}
                {guide.online && (
                  <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-md z-20">
                    ● ONLINE NOW
                  </div>
                )}
              </div>

              {/* Guide Profile Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1 leading-tight">{guide.name}</h3>
                <p className="text-[11px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-4 flex items-center gap-1">
                  <MapPin size={12} className="text-teal-600" /> {guide.role} • {guide.city}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed line-clamp-2 mb-6">
                  {guide.bio || "Local expert specialized in history, arts, architecture, and hidden culinary spots."}
                </p>

                {/* Pricing & Link */}
                <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hourly Rate</span>
                    <span className="text-slate-900 dark:text-white font-black text-xl">${guide.price}<span className="text-slate-400 font-medium text-xs"> / hr</span></span>
                  </div>
                  <Link 
                    to={`/guide/${guide.id}`} 
                    className="bg-slate-900 dark:bg-slate-700 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* How It Works Section */}
      <section className="bg-white dark:bg-slate-900 py-20 sm:py-28 border-t border-slate-100 dark:border-slate-800 relative">
        <motion.div 
          className="container mx-auto px-4 text-center max-w-7xl"
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 border border-teal-200/50 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <Compass size={14} /> Simple 3-Step Process
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Seamless Exploration</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-lg mx-auto mb-16">Experience the easiest and most secure way to discover authentic private travel in India.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { icon: <Search size={24} />, step: '1. Find Your Guide', desc: 'Search and filter vetted experts by state specialties, languages spoken, budget, and local knowledge.' },
              { icon: <MessageSquare size={24} />, step: '2. Customize Itinerary', desc: 'Message guides directly to fine-tune your schedules, custom food diets, photography stops, or hiking trails.' },
              { icon: <ShieldCheck size={24} />, step: '3. Explore Safely', desc: 'Book securely via GuideConnect. Enjoy authorized entry points, VIP access, and verified local safety.' },
            ].map((item, idx) => (
              <motion.div 
                key={item.step} 
                variants={itemVariants} 
                className="bg-slate-50 dark:bg-slate-800/70 p-8 rounded-3xl text-center flex flex-col items-center justify-start border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 relative group"
              >
                {/* Step Count Bubble */}
                <div className="absolute top-4 right-4 text-[10px] font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Step 0{idx + 1}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center mb-6 shadow-md shadow-teal-600/20 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-slate-900 dark:text-white tracking-tight">{item.step}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xs font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Travel Tips Section */}
      <TravelTipsSection />

      {/* FAQ Section */}
      <FAQSection />

    </div>
  );
}

