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
            className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 z-[9999] p-3.5 sm:px-6 sm:py-4 rounded-2xl shadow-xl flex items-center gap-3 font-semibold text-xs sm:text-sm border ${
              toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
              toast.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-300' :
              'bg-blue-50 text-blue-800 border-blue-300'
            }`}
          >
            {toast.type === 'success' && <Check size={18} className="shrink-0" />}
            {toast.type === 'error' && <X size={18} className="shrink-0" />}
            {toast.type === 'info' && <Bell size={18} className="shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
        <div className="flex items-center gap-3.5 sm:gap-6 min-w-0">
          <div className="relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="Guide Profile" 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2rem] object-cover border-2 sm:border-3 border-white shadow-md" 
            />
            <motion.div 
              animate={isOnline ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 sm:border-3 border-white shadow-sm ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black text-teal-700 bg-teal-50 dark:bg-teal-950/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1 border border-teal-200/50">
                <ShieldCheck size={12} /> PRO GUIDE
              </span>
              <motion.div 
                onClick={toggleOnline}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-bold transition-colors ${
                  isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}
              >
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </motion.div>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1 mb-0.5 truncate">
              Elena Rostova
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium truncate">
              Barcelona & Gothic Quarter Specialist
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <motion.div className="relative">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setNotificationCount(0);
                showToast('Cleared all notifications.', 'info');
              }}
              className="btn glass p-2.5 sm:p-3 rounded-full text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer" 
            >
              <Bell size={18} />
            </motion.button>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                {notificationCount}
              </span>
            )}
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetRequests}
            className="btn glass flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold rounded-xl cursor-pointer" 
          >
            <RefreshCw size={15} /> Reset Simulation
          </motion.button>
        </div>
      </motion.div>

      {/* Smart Alert Insights Banner */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-teal-500/5 rounded-2xl p-4 sm:px-8 sm:py-5 mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border border-teal-500/15"
      >
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
          <div className="bg-white dark:bg-slate-800 p-2 sm:p-2.5 rounded-xl text-teal-600 shadow-sm shrink-0 mt-0.5 sm:mt-0">
            <Flame size={20} />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Weekend Demand Spike Expected</h4>
            <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">Barcelona Tapas Tours are up 40% this weekend. Consider expanding your slots on June 13-14.</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full transition-all shrink-0 self-end sm:self-auto cursor-pointer border-none"
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
            className="card glass p-5 sm:p-7 flex flex-col gap-3 transition-all duration-300" 
          >
            <div className="flex justify-between items-start">
              <div style={{ background: stat.bg, padding: '0.8rem', borderRadius: '0.75rem', color: stat.color }}>
                {stat.icon}
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: stat.trend.includes('+') ? '#059669' : 'var(--color-text-muted)', background: stat.trend.includes('+') ? '#D1FAE5' : '#F1F5F9' }}>
                {stat.trend}
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{stat.title}</div>
            </div>
          </motion.div>
        ))}

        {/* Rating Card - Special Styling */}
        <motion.div 
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(13, 148, 136, 0.2)' }}
          className="card p-5 sm:p-7 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none flex flex-col gap-3 transition-all duration-300 rounded-2xl" 
        >
          <div className="flex justify-between items-start">
            <div className="bg-white/10 p-3 rounded-xl text-amber-400">
              <Star fill="#FBBF24" size={22} />
            </div>
            <ArrowUpRight size={20} className="text-white/50" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">4.92<span className="text-sm text-white/60 font-medium">/5.0</span></div>
            <div className="text-xs sm:text-sm text-white/80 font-medium mt-1">Overall Rating</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Grid section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 sm:mb-12">
        
        {/* Analytics Section with State Switcher Tabs */}
        <motion.div variants={itemVariants} className="lg:col-span-7 card glass flex flex-col p-0 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-8 sm:pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">Performance Insights</h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Visualize historical performance benchmarks</p>
            </div>
            {/* Beautiful Custom Tab Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full self-start sm:self-auto overflow-x-auto max-w-full">
              {['revenue', 'bookings', 'rating'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    showToast(`Switched view to: ${tab === 'revenue' ? 'Revenue' : tab === 'bookings' ? 'Tours Completed' : 'Rating Trend'}`, 'info');
                  }}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap border-none ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64 sm:h-[340px] w-full px-2 sm:px-6 pb-4 sm:pb-8">
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
        <motion.div variants={itemVariants} className="card glass p-4 sm:p-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">Agenda</h2>
            <button className="text-teal-600 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 font-bold px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer border-none">View Calendar</button>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { day: 'TODAY', title: 'Tapas & Wine Night Tour', time: '6:30 PM', location: 'Plaça Reial', guests: 8, status: 'IN 2 HOURS', statusColor: 'var(--color-primary)', statusBg: 'rgba(13, 148, 136,0.1)' },
              { day: 'TOMORROW', title: 'Morning Bike Coastline', time: '9:00 AM', location: 'Barceloneta', guests: 4, status: 'UPCOMING', statusColor: '#475569', statusBg: '#F1F5F9' }
            ].map((event, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
              >
                <div className="text-[10px] font-extrabold tracking-wider text-slate-400 mb-2">{event.day}</div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mb-1">{event.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><CalendarIcon size={13}/> {event.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={13}/> {event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-dashed border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=50&q=80" alt="Guest" className="w-6 h-6 rounded-full border-2 border-white object-cover z-[3]" />
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&q=80" alt="Guest" className="w-6 h-6 rounded-full border-2 border-white object-cover -ml-2.5 z-[2]" />
                      <div className="w-6 h-6 rounded-full border-2 border-white -ml-2.5 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-200 z-[1]">+{event.guests - 2}</div>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Guests</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold" style={{ background: event.statusBg, color: event.statusColor }}>
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">Pending Requests</h2>
          <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: requests.length > 0 ? '#FEE2E2' : '#EFF6FF', color: requests.length > 0 ? '#DC2626' : 'var(--color-primary)' }}>
            {requests.length} {requests.length === 1 ? 'Action Required' : 'Actions Required'}
          </span>
        </div>

        <div className="relative min-h-[120px]">
          <AnimatePresence mode="popLayout">
            {requests.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center text-slate-500"
              >
                <div className="text-base font-bold text-slate-800 dark:text-slate-100">All caught up! 🎉</div>
                <p className="text-xs mt-1">Check back later or click "Reset Simulation" in the header to reload demo requests.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {requests.map((req) => (
                  <motion.div 
                    key={req.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <img src={req.img} alt={req.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl object-cover shrink-0 shadow-sm" />
                      <div className="min-w-0">
                        <div className="font-extrabold text-sm sm:text-lg text-slate-900 dark:text-white truncate">{req.name}</div>
                        <div className="text-xs sm:text-sm text-slate-500 font-medium truncate">{req.tour}</div>
                        <div className="text-[11px] sm:text-xs text-teal-700 dark:text-teal-400 font-bold mt-1 inline-block bg-teal-50 dark:bg-teal-950/50 px-2.5 py-1 rounded-lg">
                          {req.details}
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700 gap-2">
                      <div className="text-slate-900 dark:text-white font-black text-lg sm:text-2xl">{req.price}</div>
                      <div className="flex gap-2">
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          whileTap={{ scale: 0.9 }} 
                          onClick={() => handleAccept(req.id, req.name)}
                          className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border-none cursor-pointer shadow-sm hover:bg-emerald-200"
                        >
                          <Check size={18} />
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          whileTap={{ scale: 0.9 }} 
                          onClick={() => handleReject(req.id, req.name)}
                          className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center border-none cursor-pointer shadow-sm hover:bg-rose-200"
                        >
                          <X size={18} />
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



