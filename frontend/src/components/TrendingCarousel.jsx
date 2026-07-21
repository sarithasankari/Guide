import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const TRENDING_DESTINATIONS = [
  {
    id: 1,
    name: 'Taj Mahal & Agra Fort',
    location: 'Agra, Uttar Pradesh',
    category: 'Heritage',
    rating: 4.9,
    reviews: '12.4k',
    price: 'Free - ₹1100',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    stateSlug: 'uttar-pradesh',
    placeSlug: 'taj-mahal'
  },
  {
    id: 2,
    name: 'Alleppey Backwaters',
    location: 'Alappuzha, Kerala',
    category: 'Waterfalls & Backwaters',
    rating: 4.95,
    reviews: '8.1k',
    price: 'Houseboat Day Pass',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    stateSlug: 'kerala',
    placeSlug: 'alleppey-backwaters'
  },
  {
    id: 3,
    name: 'Pangong Tso Lake',
    location: 'Leh, Ladakh',
    category: 'Hills & Adventure',
    rating: 4.88,
    reviews: '6.2k',
    price: 'Permit Required',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    stateSlug: 'ladakh',
    placeSlug: 'pangong-lake'
  },
  {
    id: 4,
    name: 'Varanasi Ghats & Ganga Aarti',
    location: 'Varanasi, Uttar Pradesh',
    category: 'Pilgrimage',
    rating: 4.92,
    reviews: '15.2k',
    price: 'Free Entry',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    stateSlug: 'uttar-pradesh',
    placeSlug: 'varanasi-ghats'
  },
  {
    id: 5,
    name: 'Baga & Anjuna Coast',
    location: 'North Goa',
    category: 'Beaches',
    rating: 4.78,
    reviews: '19.5k',
    price: 'Free Access',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    stateSlug: 'goa',
    placeSlug: 'baga-beach'
  },
  {
    id: 6,
    name: 'Amer Fort & Hawa Mahal',
    location: 'Jaipur, Rajasthan',
    category: 'Heritage',
    rating: 4.86,
    reviews: '11.8k',
    price: '₹50 - ₹500',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    stateSlug: 'rajasthan',
    placeSlug: 'amer-fort'
  }
];

export default function TrendingCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <Flame size={14} className="text-amber-400 fill-amber-400" /> Hot & Trending Now
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Top Trending Destinations
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-medium mt-2 max-w-xl">
              Most booked and highly rated iconic spots across India this month.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all cursor-pointer shadow-md"
              aria-label="Previous destination"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all cursor-pointer shadow-md"
              aria-label="Next destination"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 snap-x snap-mandatory scroll-smooth"
        >
          {TRENDING_DESTINATIONS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl flex flex-col group snap-start shrink-0"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <span className="absolute top-4 left-4 bg-teal-600/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {item.category}
                </span>

                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-amber-400 font-extrabold text-xs border border-white/10">
                  <Star size={13} className="fill-amber-400" />
                  {item.rating} <span className="text-slate-400 font-medium">({item.reviews})</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-white mb-2 leading-snug group-hover:text-teal-400 transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs sm:text-sm font-medium mb-4">
                    <MapPin size={15} className="text-teal-400 shrink-0" />
                    {item.location}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Entry / Permit</span>
                    <span className="text-sm font-extrabold text-teal-300">{item.price}</span>
                  </div>
                  <Link
                    to={`/states/${item.stateSlug}/${item.placeSlug}`}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-md"
                  >
                    Explore Spot
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
