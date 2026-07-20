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
    <div style={{ paddingBottom: '6rem' }}>
      
      {/* Banner */}
      <div style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ 
            position: 'absolute', inset: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />
        
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>Discover the Extraordinary</h1>
            <p style={{ fontSize: '1.35rem', maxWidth: '650px', margin: '0 auto', color: '#F8FAFC', lineHeight: '1.6', textShadow: '0 2px 10px rgba(0,0,0,0.5)', fontWeight: 500 }}>
              Curated journeys designed by local experts. Find the perfect category for your next unforgettable adventure.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '5rem' }}>
        
        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-8"
        >
          {[
            { title: 'History & Culture', icon: <History size={26}/>, desc: 'Step back in time with archaeologists and historians.', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80' },
            { title: 'Food & Culinary', icon: <Coffee size={26}/>, desc: 'Taste the city secrets with local chefs and foodies.', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80' },
            { title: 'Alpine & Nature', icon: <Mountain size={26}/>, desc: 'Conquer peaks and valleys with certified mountain guides.', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80' },
            { title: 'Photography', icon: <Camera size={26}/>, desc: 'Find the perfect angles with professional local photographers.', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80' },
            { title: 'Urban Exploration', icon: <Map size={26}/>, desc: 'Discover street art and hidden alleys off the beaten path.', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80' },
            { title: 'Sailing & Water', icon: <Compass size={26}/>, desc: 'Explore the coastline with experienced local captains.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' }
          ].map((cat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Link 
                to="/search" 
                className="card" 
                style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', border: '1px solid rgba(0,0,0,0.05)' }}
              >
                <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }} className="group">
                  <motion.img 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    src={cat.img} 
                    alt={cat.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.1) 60%, transparent 100%)', pointerEvents: 'none' }}></div>
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 10, width: 'calc(100% - 3rem)' }}>
                    <div style={{ background: 'var(--color-primary)', padding: '0.8rem', borderRadius: '50%', boxShadow: '0 4px 12px rgba(13, 148, 136,0.4)' }}>{cat.icon}</div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{cat.title}</h3>
                  </div>
                </div>
                <div style={{ padding: '2rem 1.5rem', background: 'white', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{cat.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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


