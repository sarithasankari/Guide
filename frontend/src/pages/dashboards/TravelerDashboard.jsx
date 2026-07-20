import React, { useState } from 'react';
import { Ticket, Heart, MessageSquare, Compass, ChevronRight, MapPin, Calendar as CalendarIcon, ArrowUpRight, Bell, Sparkles, MessageCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function TravelerDashboard() {
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Dr. Ramesh Kumar', loc: 'Madurai • Architecture Specialist', img: 'https://randomuser.me/api/portraits/men/70.jpg', active: true },
    { id: 2, name: 'Lakshmi Rajan', loc: 'Karaikudi • Gastronomy', img: 'https://randomuser.me/api/portraits/women/17.jpg', active: true },
    { id: 3, name: 'Anbumani Selvan', loc: 'Mahabalipuram • Arts & Architecture', img: 'https://randomuser.me/api/portraits/men/22.jpg', active: true }
  ]);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTour, setSelectedTour] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleFavorite = (id, name) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === id);
      if (exists) {
        showToast(`Removed ${name} from your Saved Guides.`, 'info');
        return prev.filter(fav => fav.id !== id);
      }
      return prev;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const adventures = [
    { id: 1, type: 'upcoming', title: 'Coastal Temple Secret Walk', location: 'Mahabalipuram, Tamil Nadu', price: '$140', travelers: '2 Travelers', daysLeft: 'IN 3 DAYS', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg/960px-Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg', guide: 'Anbumani Selvan', guideImg: 'https://randomuser.me/api/portraits/men/22.jpg', rating: '5.0' },
    { id: 2, type: 'upcoming', title: 'Hidden Temples & Step Wells', location: 'Kumbakonam, Tamil Nadu', price: '$85', travelers: '1 Traveler', daysLeft: 'IN 12 DAYS', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Meenakshi_Amman_West_Tower.jpg/960px-Meenakshi_Amman_West_Tower.jpg', guide: 'Dr. Ramesh Kumar', guideImg: 'https://randomuser.me/api/portraits/men/70.jpg', rating: '4.9' },
    { id: 3, type: 'wishlist', title: 'Chola Art Masterpieces Tour', location: 'Thanjavur, Tamil Nadu', price: '$120', travelers: 'Flexible', daysLeft: 'WISHLIST', img: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Chennai_Central.jpg', guide: 'Lakshmi Rajan', guideImg: 'https://randomuser.me/api/portraits/women/17.jpg', rating: '4.8' }
  ];

  const filteredAdventures = adventures.filter(adv => {
    if (activeTab === 'all') return true;
    return adv.type === activeTab;
  });

  return (
    <motion.div 
      className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            style={{
              position: 'fixed',
              top: '2rem',
              right: '2rem',
              zIndex: 9999,
              background: '#EFF6FF',
              color: '#1E40AF',
              border: '1px solid #60A5FA',
              borderRadius: '1rem',
              padding: '1rem 1.5rem',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 600
            }}
          >
            <Info size={18} />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-end" style={{ marginBottom: '3rem' }}>
        <div>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(13, 148, 136, 0.1)', color: 'var(--color-primary)', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '1rem' }}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> EXPLORER PASS
          </span>
          <h1 className="h1" style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Good morning, Alex.</h1>
          <p className="text-muted" style={{ fontSize: '1.05rem' }}>
            You have 2 adventures scheduled for this month. 3 unread messages from your guides.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <motion.button whileHover={{ scale: 1.05 }} className="btn glass" style={{ padding: '0.75rem', borderRadius: '50%', border: '1px solid var(--color-border)' }}>
            <Bell size={20} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.5rem' }}>
            <Compass size={18} /> Plan New Trip
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {[
          { icon: <Ticket size={22} />, value: '12', label: 'Active Bookings', trend: '+2 this month', bg: '#EFF6FF', color: 'var(--color-primary)' },
          { icon: <Heart size={22} />, value: favorites.length.toString(), label: 'Saved Guides', trend: 'Starred local professionals', bg: '#FFF7ED', color: '#EA580C' },
          { icon: <MessageSquare size={22} />, value: '3', label: 'Unread Chats', trend: 'Direct access open', bg: '#F0FDF4', color: '#059669' }
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
            className="card glass" 
            style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.3s ease' }}
          >
            <div className="flex justify-between items-start">
              <div style={{ background: stat.bg, padding: '0.8rem', borderRadius: '0.75rem', color: stat.color }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', background: '#F1F5F9', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>
                {stat.trend}
              </span>
            </div>
            <div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-secondary)', lineHeight: 1.1 }}>{stat.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500, marginTop: '0.25rem' }}>{stat.title || stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1.2fr', gap: '2.5rem' }}>
        
        {/* Left Column - Upcoming Adventures */}
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
            <h2 className="h3" style={{ color: 'var(--color-secondary)' }}>Your Adventures</h2>
            <div style={{ display: 'flex', background: '#F1F5F9', padding: '0.25rem', borderRadius: '2rem' }}>
              {['all', 'upcoming', 'wishlist'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '1.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    background: activeTab === tab ? 'white' : 'transparent',
                    color: activeTab === tab ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                    boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.2s',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAdventures.map((adv) => (
                <motion.div 
                  key={adv.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.01 }}
                  className="card mb-4"
                  style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s' }}
                >
                  <div className="w-full md:w-60 h-44 md:h-auto relative shrink-0">
                    <img src={adv.img} alt={adv.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)', padding: '0.35rem 0.8rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-secondary)' }}>{adv.daysLeft}</div>
                  </div>
                  
                  <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{adv.location}</p>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-secondary)' }}>{adv.title}</h3>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-secondary)' }}>{adv.price}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{adv.travelers}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px dashed var(--color-border)' }}>
                      <div className="flex items-center gap-3">
                        <img src={adv.guideImg} alt={adv.guide} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: 'var(--shadow-sm)' }} />
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-secondary)' }}>{adv.guide}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Guide • ★ {adv.rating}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => showToast(`Opening chat with ${adv.guide}...`, 'info')}
                          className="btn glass" 
                          style={{ padding: '0.6rem', border: '1px solid var(--color-border)', borderRadius: '50%' }}
                        >
                          <MessageCircle size={16} />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }} 
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedTour(adv)}
                          className="btn btn-primary" 
                          style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                        >
                          Details
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Column - Recommendations & Favorites */}
        <motion.div variants={itemVariants} className="flex-col gap-6">
          {/* Custom Discovery banner */}
          <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-secondary), #1E293B)', color: 'white', padding: '2rem', border: 'none' }}>
            <div style={{ background: 'rgba(255, 255, 255,0.1)', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>
              <Compass size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Where next, Alex?</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              We've curated a custom list of local culinary experiences in Madurai and Ooty based on your wishlist.
            </p>
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="btn" 
              style={{ background: 'white', color: 'var(--color-secondary)', width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', fontWeight: 700 }}
            >
              <Compass size={16} /> Explore Recommendations
            </motion.button>
          </div>

          {/* Favorites List */}
          <div className="card glass">
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)' }}>Saved Local Guides</h3>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>{favorites.length} Saved</span>
            </div>
            
            <div className="flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {favorites.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '1rem 0' }}>No saved guides yet. Explore guides to add favorites.</p>
                ) : (
                  favorites.map((fav, index) => (
                    <motion.div 
                      key={fav.id}
                      layout
                      exit={{ opacity: 0, x: -20 }}
                      className="flex justify-between items-center" 
                      style={{ 
                        paddingBottom: index < favorites.length - 1 ? '1rem' : 0,
                        borderBottom: index < favorites.length - 1 ? '1px solid var(--color-border)' : 'none'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img src={fav.img} alt={fav.name} style={{ width: '44px', height: '44px', borderRadius: '1rem', objectFit: 'cover', border: '2px solid white', boxShadow: 'var(--shadow-sm)' }} />
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)' }}>{fav.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{fav.loc}</div>
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(fav.id, fav.name)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-danger)' }}
                      >
                        <Heart size={18} fill="var(--color-danger)" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Tour Detail Modal (Animated) */}
      <AnimatePresence>
        {selectedTour && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTour(null)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)' }}
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20 }}
              style={{ position: 'relative', width: '90%', maxWidth: '540px', background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: 'var(--shadow-xl)', overflow: 'hidden' }}
            >
              <img src={selectedTour.img} alt={selectedTour.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '1rem', marginBottom: '1.5rem' }} />
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '0.05em' }}>{selectedTour.location}</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{selectedTour.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Explore local culture, history, and secret spots with {selectedTour.guide}. Detailed scheduling information and tour guidelines have been sent to your email.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#F8FAFC', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Date & Time</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-secondary)' }}>June 18, 2026 • {selectedTour.daysLeft}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Booking Cost</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)' }}>{selectedTour.price} Total</div>
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <button onClick={() => setSelectedTour(null)} className="btn btn-ghost" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>Close</button>
                  <button onClick={() => { setSelectedTour(null); showToast("Booking ticket generated successfully!", "success"); }} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>Download Ticket</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


