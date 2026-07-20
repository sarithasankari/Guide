import React, { useState } from 'react';
import { Star, Check, X, Bell, HelpCircle, TrendingUp, Calendar as CalendarIcon, Users, MapPin, ArrowUpRight, ShieldCheck, Flame, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const chartData = {
  revenue: [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 14000 },
    { name: 'Apr', value: 20000 },
    { name: 'May', value: 24000 },
    { name: 'Jun', value: 28450 }
  ],
  bookings: [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 72 },
    { name: 'May', value: 85 },
    { name: 'Jun', value: 104 }
  ],
  rating: [
    { name: 'Jan', value: 4.70 },
    { name: 'Feb', value: 4.75 },
    { name: 'Mar', value: 4.80 },
    { name: 'Apr', value: 4.85 },
    { name: 'May', value: 4.90 },
    { name: 'Jun', value: 4.92 }
  ]
};

export default function GuideDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('revenue');
  const [notificationCount, setNotificationCount] = useState(3);
  const [toast, setToast] = useState(null);
  
  const [requests, setRequests] = useState([
    { id: 1, name: 'The Thompson Family', tour: 'Private Gothic Quarter Tour', details: '4 Guests • June 12, 10:00 AM', price: '$320', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Marco Belmonte', tour: 'Gaudi Architecture Walk', details: '1 Guest • June 14, 2:00 PM', price: '$150', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Sophie & Pierre', tour: 'Barcelona Tapas Trail', details: '2 Guests • June 15, 7:00 PM', price: '$180', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' }
  ]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleAccept = (id, name) => {
    setRequests(prev => prev.filter(req => req.id !== id));
    showToast(`Accepted booking for ${name}! Added to your agenda.`, 'success');
  };

  const handleReject = (id, name) => {
    setRequests(prev => prev.filter(req => req.id !== id));
    showToast(`Rejected request from ${name}.`, 'error');
  };

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    showToast(isOnline ? 'You are now Offline. No new booking requests will be received.' : 'You are now Online and accepting bookings!', 'info');
  };

  const resetRequests = () => {
    setRequests([
      { id: 1, name: 'The Thompson Family', tour: 'Private Gothic Quarter Tour', details: '4 Guests • June 12, 10:00 AM', price: '$320', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
      { id: 2, name: 'Marco Belmonte', tour: 'Gaudi Architecture Walk', details: '1 Guest • June 14, 2:00 PM', price: '$150', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
      { id: 3, name: 'Sophie & Pierre', tour: 'Barcelona Tapas Trail', details: '2 Guests • June 15, 7:00 PM', price: '$180', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' }
    ]);
    showToast('Simulation data reloaded!', 'info');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  // Color config based on active tab
  const tabColors = {
    revenue: { stroke: 'var(--color-primary)', stop: 'var(--color-primary)', label: 'Revenue' },
    bookings: { stroke: '#059669', stop: '#10B981', label: 'Tours Completed' },
    rating: { stroke: '#8B5CF6', stop: '#A78BFA', label: 'Overall Rating' }
  };

  return (
    <motion.div 
      className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Toast Notification */}
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
              background: toast.type === 'success' ? '#D1FAE5' : toast.type === 'error' ? '#FEE2E2' : '#EFF6FF',
              color: toast.type === 'success' ? '#065F46' : toast.type === 'error' ? '#991B1B' : '#1E40AF',
              border: `1px solid ${toast.type === 'success' ? '#34D399' : toast.type === 'error' ? '#F87171' : '#60A5FA'}`,
              borderRadius: '1rem',
              padding: '1rem 1.5rem',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 600
            }}
          >
            {toast.type === 'success' && <Check size={18} />}
            {toast.type === 'error' && <X size={18} />}
            {toast.type === 'info' && <Bell size={18} />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
        <div className="flex items-center gap-6">
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="Guide Profile" 
              style={{ width: '80px', height: '80px', borderRadius: '2rem', objectFit: 'cover', border: '3px solid white', boxShadow: 'var(--shadow-md)' }} 
            />
            <motion.div 
              animate={isOnline ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ 
                position: 'absolute', 
                bottom: '2px', 
                right: '2px', 
                width: '16px', 
                height: '16px', 
                borderRadius: '50%', 
                background: isOnline ? '#10B981' : '#94A3B8', 
                border: '3px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} 
            />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', background: 'rgba(13, 148, 136,0.08)', padding: '0.25rem 0.75rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ShieldCheck size={12} /> PRO GUIDE
              </span>
              <motion.div 
                onClick={toggleOnline}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  background: isOnline ? '#D1FAE5' : '#F1F5F9', 
                  color: isOnline ? '#065F46' : '#475569', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '1rem', 
                  fontSize: '0.75rem', 
                  fontWeight: 700 
                }}
              >
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </motion.div>
            </div>
            <h1 className="h2" style={{ color: 'var(--color-secondary)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
              Elena Rostova
            </h1>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              Barcelona & Gothic Quarter Specialist
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.div style={{ position: 'relative' }}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setNotificationCount(0);
                showToast('Cleared all notifications.', 'info');
              }}
              className="btn glass" 
              style={{ padding: '0.75rem', borderRadius: '50%', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}
            >
              <Bell size={20} />
            </motion.button>
            {notificationCount > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--color-danger)', color: 'white', fontSize: '0.65rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '50%' }}>
                {notificationCount}
              </span>
            )}
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetRequests}
            className="btn glass" 
            style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.25rem', border: '1px solid var(--color-border)' }}
          >
            <RefreshCw size={16} /> Reset Simulation
          </motion.button>
        </div>
      </motion.div>

      {/* Smart Alert Insights Banner */}
      <motion.div 
        variants={itemVariants}
        style={{ 
          background: 'linear-gradient(90deg, rgba(13, 148, 136,0.07) 0%, rgba(6,182,212,0.07) 100%)', 
          borderRadius: '1.25rem', 
          padding: '1.25rem 2rem', 
          marginBottom: '3rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          border: '1px solid rgba(13, 148, 136,0.1)'
        }}
      >
        <div className="flex items-center gap-4">
          <div style={{ background: 'white', padding: '0.5rem', borderRadius: '0.75rem', color: 'var(--color-primary)', boxShadow: 'var(--shadow-sm)' }}>
            <Flame size={20} />
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-secondary)' }}>Weekend Demand Spike Expected</h4>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>Barcelona Tapas Tours are up 40% this weekend. Consider expanding your slots on June 13-14.</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="btn" 
          style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'var(--color-primary)', color: 'white', borderRadius: '1.5rem', border: 'none' }}
        >
          Add Slots
        </motion.button>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {[
          { icon: <TrendingUp size={22} />, title: 'Total Earnings', value: '$28,450', color: 'var(--color-primary)', bg: '#EFF6FF', trend: '+12.5%' },
          { icon: <Check size={22} />, title: 'Completed Tours', value: '142', color: '#059669', bg: '#F0FDF4', trend: '+4 this week' },
          { icon: <Users size={22} />, title: 'Pending Guests', value: '18', color: '#DC2626', bg: '#FEF2F2', trend: 'Needs action' }
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)' }}
            className="card glass" 
            style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.3s ease' }}
          >
            <div className="flex justify-between items-start">
              <div style={{ background: stat.bg, padding: '0.8rem', borderRadius: '0.75rem', color: stat.color }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: stat.trend.includes('+') ? '#059669' : 'var(--color-text-muted)', background: stat.trend.includes('+') ? '#D1FAE5' : '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>
                {stat.trend}
              </span>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-secondary)', lineHeight: 1.2 }}>{stat.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500, marginTop: '0.25rem' }}>{stat.title}</div>
            </div>
          </motion.div>
        ))}

        {/* Rating Card - Special Styling */}
        <motion.div 
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(13, 148, 136, 0.2)' }}
          className="card" 
          style={{ padding: '1.75rem', background: 'linear-gradient(135deg, var(--color-secondary), #1E293B)', color: 'white', border: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'all 0.3s ease' }}
        >
          <div className="flex justify-between items-start">
            <div style={{ background: 'rgba(255, 255, 255,0.1)', padding: '0.8rem', borderRadius: '0.75rem', color: '#FBBF24' }}>
              <Star fill="#FBBF24" size={22} />
            </div>
            <ArrowUpRight size={20} color="rgba(255, 255, 255,0.5)" />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>4.92<span style={{fontSize: '1rem', color: 'rgba(255, 255, 255,0.6)', fontWeight: 500}}>/5.0</span></div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255,0.8)', fontWeight: 500, marginTop: '0.25rem' }}>Overall Rating</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Grid section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 sm:mb-12">
        
        {/* Analytics Section with State Switcher Tabs */}
        <motion.div variants={itemVariants} className="lg:col-span-7 card glass flex-col" style={{ padding: '0' }}>
          <div className="flex justify-between items-center" style={{ padding: '2rem 2rem 1rem 2rem' }}>
            <div>
              <h2 className="h3" style={{ color: 'var(--color-secondary)' }}>Performance Insights</h2>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Visualize historical performance benchmarks</p>
            </div>
            {/* Beautiful Custom Tab Switcher */}
            <div style={{ display: 'flex', background: '#F1F5F9', padding: '0.25rem', borderRadius: '2rem' }}>
              {['revenue', 'bookings', 'rating'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    showToast(`Switched view to: ${tab === 'revenue' ? 'Revenue' : tab === 'bookings' ? 'Tours Completed' : 'Rating Trend'}`, 'info');
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '1.5rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    background: activeTab === tab ? 'white' : 'transparent',
                    color: activeTab === tab ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                    boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none',
                    transition: 'all 0.2s ease',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ height: '340px', width: '100%', padding: '0 2rem 2rem 1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData[activeTab]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`gradient-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={tabColors[activeTab].stop} stopOpacity={0.25}/>
                    <stop offset="95%" stopColor={tabColors[activeTab].stop} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} 
                  tickFormatter={(val) => activeTab === 'rating' ? val.toFixed(2) : activeTab === 'revenue' ? `$${val/1000}k` : val} 
                  dx={-10} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255, 255, 255,0.5)', background: 'rgba(255, 255, 255,0.9)', backdropFilter: 'blur(8px)', boxShadow: 'var(--shadow-xl)', padding: '1rem' }}
                  itemStyle={{ color: tabColors[activeTab].stroke, fontWeight: 700, fontSize: '1.1rem' }}
                  labelStyle={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}
                  formatter={(value) => [activeTab === 'revenue' ? `$${value.toLocaleString()}` : activeTab === 'rating' ? `${value.toFixed(2)} Stars` : `${value} Tours`, tabColors[activeTab].label]}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={tabColors[activeTab].stroke} 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill={`url(#gradient-${activeTab})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Upcoming Agenda */}
        <motion.div variants={itemVariants} className="card glass" style={{ padding: '2rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
            <h2 className="h3" style={{ color: 'var(--color-secondary)' }}>Agenda</h2>
            <button className="btn btn-ghost" style={{ color: 'var(--color-primary)', fontWeight: 600, padding: '0.25rem 0.75rem', fontSize: '0.85rem', background: 'rgba(13, 148, 136, 0.05)', borderRadius: '1rem' }}>View Calendar</button>
          </div>

          <div className="flex-col gap-5">
            {[
              { day: 'TODAY', title: 'Tapas & Wine Night Tour', time: '6:30 PM', location: 'Plaça Reial', guests: 8, status: 'IN 2 HOURS', statusColor: 'var(--color-primary)', statusBg: 'rgba(13, 148, 136,0.1)' },
              { day: 'TOMORROW', title: 'Morning Bike Coastline', time: '9:00 AM', location: 'Barceloneta', guests: 4, status: 'UPCOMING', statusColor: '#475569', statusBg: '#F1F5F9' }
            ].map((event, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.01 }}
                style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s' }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>{event.day}</div>
                <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.35rem' }}>{event.title}</h3>
                    <div className="flex gap-3" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      <span className="flex items-center gap-1"><CalendarIcon size={14}/> {event.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={14}/> {event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px dashed var(--color-border)' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=50&q=80" alt="Guest" style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid white', zIndex: 3 }} />
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&q=80" alt="Guest" style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid white', marginLeft: '-10px', zIndex: 2 }} />
                      <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid white', marginLeft: '-10px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-main)', zIndex: 1 }}>+{event.guests - 2}</div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>Guests</span>
                  </div>
                  <span style={{ padding: '0.3rem 0.6rem', borderRadius: '1rem', background: event.statusBg, color: event.statusColor, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.02em' }}>
                    {event.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Booking Requests with AnimatePresence Dynamic Interaction */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
          <h2 className="h3" style={{ color: 'var(--color-secondary)' }}>Pending Requests</h2>
          <span className="badge" style={{ background: requests.length > 0 ? '#FEE2E2' : '#EFF6FF', color: requests.length > 0 ? '#DC2626' : 'var(--color-primary)', padding: '0.4rem 0.8rem', transition: 'all 0.3s' }}>
            {requests.length} {requests.length === 1 ? 'Action Required' : 'Actions Required'}
          </span>
        </div>

        <div style={{ position: 'relative', minHeight: '120px' }}>
          <AnimatePresence mode="popLayout">
            {requests.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ 
                  background: 'rgba(255, 255, 255,0.5)', 
                  border: '1px dashed var(--color-border)', 
                  borderRadius: '1.25rem', 
                  padding: '3rem', 
                  textAlign: 'center',
                  color: 'var(--color-text-muted)'
                }}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>All caught up! 🎉</div>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Check back later or click "Reset Simulation" in the header to reload demo requests.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {requests.map((req) => (
                  <motion.div 
                    key={req.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-md)' }}
                    style={{ background: 'white', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'box-shadow 0.3s, border 0.3s' }}
                  >
                    <div className="flex items-center gap-4">
                      <img src={req.img} alt={req.name} style={{ width: '64px', height: '64px', borderRadius: '1rem', objectFit: 'cover', boxShadow: 'var(--shadow-sm)' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-secondary)', marginBottom: '0.2rem' }}>{req.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{req.tour}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, marginTop: '0.4rem', display: 'inline-block', background: 'rgba(13, 148, 136,0.05)', padding: '0.2rem 0.5rem', borderRadius: '0.5rem' }}>{req.details}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div style={{ color: 'var(--color-secondary)', fontWeight: 800, fontSize: '1.35rem' }}>{req.price}</div>
                      <div className="flex gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          whileTap={{ scale: 0.9 }} 
                          onClick={() => handleAccept(req.id, req.name)}
                          style={{ width: '38px', height: '38px', padding: 0, borderRadius: '50%', background: '#D1FAE5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(5,150,105,0.15)' }}
                        >
                          <Check size={20} />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          whileTap={{ scale: 0.9 }} 
                          onClick={() => handleReject(req.id, req.name)}
                          style={{ width: '38px', height: '38px', padding: 0, borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(220,38,38,0.15)' }}
                        >
                          <X size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

    </motion.div>
  );
}



