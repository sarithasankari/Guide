import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import STATES from '../data/states.json';
import StateCard from './StateCard';

export default function TrendingStates() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = STATES.filter(state => 
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="container mx-auto px-4 mt-24 relative" id="explore">
      
      {/* Sticky Header & Search */}
      <div className="pb-6 pt-4 mb-8">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-[2.5rem] font-extrabold tracking-tight text-slate-900 mb-2 font-heading">Trending Destinations</h2>
            <p className="text-lg text-slate-500">Discover the incredible diversity of India across all 36 States & UTs.</p>
          </div>
          
          <div className="relative w-full max-w-lg mt-2">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-600">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search states, taglines or attractions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 h-[3.5rem] text-base rounded-full bg-white shadow-sm border border-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/10 focus:border-teal-600 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredStates.length === 0 ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-24 px-8 text-center bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm"
          >
            <Search size={48} className="mx-auto mb-6 text-slate-300" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No states found</h3>
            <p className="text-lg text-slate-500 mb-6">We couldn't find any destinations matching "{searchQuery}".</p>
            <button onClick={() => setSearchQuery('')} className="px-8 py-3 rounded-full border-2 border-teal-600 text-teal-600 font-bold hover:bg-teal-600 hover:text-white transition-colors">
              Clear Search
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="grid"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full"
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "100px" }}
          >
            {filteredStates.map((state) => (
              <StateCard 
                key={state.slug} 
                state={state} 
                itemVariants={itemVariants} 
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
