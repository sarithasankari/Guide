import { Compass, Camera, Coffee, Mountain, Map, History, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Experiences() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="pb-16 sm:pb-24 bg-slate-50 dark:bg-slate-900 transition-colors">
      
      {/* Banner */}
      <div className="relative h-[380px] sm:h-[480px] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center justify-center text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-5 tracking-tight text-white drop-shadow-lg leading-tight">
              Discover the Extraordinary
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow">
              Curated journeys designed by local experts. Find the perfect category for your next unforgettable adventure.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-16">
        
        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {[
            { title: 'History & Culture', icon: <History size={22}/>, desc: 'Step back in time with archaeologists and historians.', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80' },
            { title: 'Food & Culinary', icon: <Coffee size={22}/>, desc: 'Taste the city secrets with local chefs and foodies.', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80' },
            { title: 'Alpine & Nature', icon: <Mountain size={22}/>, desc: 'Conquer peaks and valleys with certified mountain guides.', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
            { title: 'Photography', icon: <Camera size={22}/>, desc: 'Find the perfect angles with professional local photographers.', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80' },
            { title: 'Urban Exploration', icon: <Map size={22}/>, desc: 'Discover street art and hidden alleys off the beaten path.', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80' },
            { title: 'Sailing & Water', icon: <Compass size={22}/>, desc: 'Explore the coastline with experienced local captains.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' }
          ].map((cat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Link 
                to="/search" 
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full group"
              >
                <div className="h-48 sm:h-60 relative overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    src={cat.img} 
                    alt={cat.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-center gap-3 z-10">
                    <div className="bg-teal-600 p-2.5 sm:p-3 rounded-full shadow-md text-white shrink-0">
                      {cat.icon}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-white drop-shadow-md truncate">
                      {cat.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5 sm:p-6 bg-white dark:bg-slate-800 flex-1 flex flex-col justify-between">
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs sm:text-sm uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    Explore Category <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}


