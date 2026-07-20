import React, { useState } from 'react';
import { Bell, Calendar as CalendarIcon, Compass, FileText, AlertCircle, CheckCircle2, Star, Clock, ChevronLeft, ChevronRight, User, Search, Check, X, ShieldAlert, Sparkles, Send, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const growthData = {
  bookings: [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 3500 },
    { name: 'Mar', value: 4200 },
    { name: 'Apr', value: 5800 },
    { name: 'May', value: 6500 },
    { name: 'Jun', value: 8900 }
  ],
  users: [
    { name: 'Jan', value: 1100 },
    { name: 'Feb', value: 1800 },
    { name: 'Mar', value: 2500 },
    { name: 'Apr', value: 3100 },
    { name: 'May', value: 4200 },
    { name: 'Jun', value: 5800 }
  ],
  revenue: [
    { name: 'Jan', value: 145000 },
    { name: 'Feb', value: 180000 },
    { name: 'Mar', value: 210000 },
    { name: 'Apr', value: 245000 },
    { name: 'May', value: 230000 },
    { name: 'Jun', value: 289000 }
  ]
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [guidesCount, setGuidesCount] = useState(3891);
  const [bookingsCount, setBookingsCount] = useState(14282);
  
  const [pendingGuides, setPendingGuides] = useState([
    { id: 1, name: 'Elena Fischer', email: 'elena.f@mountains.at', loc: 'Innsbruck, Austria', exp: 'Alpine Trekking', date: 'Oct 24, 2026', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=50&q=80', priority: true },
    { id: 2, name: 'Kenji Tanaka', email: 'k.tanaka@foodie.jp', loc: 'Kyoto, Japan', exp: 'Gastronomy', date: 'Oct 23, 2026', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=50&q=80', priority: false },
    { id: 3, name: 'Marcus Thorne', email: 'marcus.t@london.uk', loc: 'London, UK', exp: 'Historical Tours', date: 'Oct 22, 2026', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=50&q=80', priority: true }
  ]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleApproveGuide = (id, name) => {
    setPendingGuides(prev => prev.filter(g => g.id !== id));
    setGuidesCount(c => c + 1);
    setBookingsCount(b => b + 1); // Mock impact
    showToast(`Guide credentials for ${name} verified successfully! Status updated to Active.`, 'success');
  };

  const handleRejectGuide = (id, name) => {
    setPendingGuides(prev => prev.filter(g => g.id !== id));
    showToast(`Application for ${name} has been rejected. Notification sent.`, 'error');
  };

  const resetQueue = () => {
    setPendingGuides([
      { id: 1, name: 'Elena Fischer', email: 'elena.f@mountains.at', loc: 'Innsbruck, Austria', exp: 'Alpine Trekking', date: 'Oct 24, 2026', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=50&q=80', priority: true },
      { id: 2, name: 'Kenji Tanaka', email: 'k.tanaka@foodie.jp', loc: 'Kyoto, Japan', exp: 'Gastronomy', date: 'Oct 23, 2026', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=50&q=80', priority: false },
      { id: 3, name: 'Marcus Thorne', email: 'marcus.t@london.uk', loc: 'London, UK', exp: 'Historical Tours', date: 'Oct 22, 2026', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=50&q=80', priority: true }
    ]);
    showToast('Simulation verification queue reloaded.', 'info');
  };

  const filteredGuides = pendingGuides.filter(guide => 
    guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.loc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.exp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const chartThemes = {
    bookings: { fill: 'var(--color-primary)', label: 'Bookings Created' },
    users: { fill: '#059669', label: 'New Registered Users' },
    revenue: { fill: '#EA580C', label: 'Gross Platform Revenue ($)' }
  };

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
            {toast.type === 'success' && <CheckCircle2 size={18} />}
            {toast.type === 'error' && <ShieldAlert size={18} />}
            {toast.type === 'info' && <Sparkles size={18} />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
        <div className="flex items-center gap-6">
          <div>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: '#0F172A', color: 'white', borderRadius: '2rem', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              ADMINISTRATIVE CONTROL PORTAL
            </span>
            <h1 className="h1" style={{ color: 'var(--color-secondary)' }}>Platform Overview</h1>
          </div>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '1.25rem', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
            <input 
              type="text" 
              placeholder="Search pending guides..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '2rem', border: '1px solid var(--color-border)', background: 'white', fontSize: '0.85rem', outline: 'none', boxShadow: 'var(--shadow-sm)' }} 
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            onClick={resetQueue}
            className="btn glass" 
            style={{ padding: '0.75rem', borderRadius: '50%', border: '1px solid var(--color-border)' }}
          >
            <RefreshCwIcon size={20} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            onClick={() => showToast('Exported dashboard metadata CSV.', 'info')}
            className="btn btn-primary" 
            style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.5rem', fontWeight: 600 }}
          >
            <Download size={18} /> Export Data
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {[
          { icon: <CalendarIcon size={20} />, title: 'TOTAL BOOKINGS', value: bookingsCount.toLocaleString(), trend: '↗ +12.5% vs last month', color: 'var(--color-primary)', bg: '#EFF6FF', trendColor: '#10B981' },
          { icon: <Compass size={20} />, title: 'ACTIVE GUIDES', value: guidesCount.toLocaleString(), trend: '↗ +5.2% vs last month', color: 'var(--color-text-main)', bg: '#F1F5F9', trendColor: '#10B981' },
          { icon: <FileText size={20} />, title: 'MONTHLY REVENUE', value: '$248,590', trend: '↘ -2.1% vs last month', color: '#B45309', bg: '#FFFBEB', trendColor: '#EF4444' },
          { icon: <AlertCircle size={20} />, title: 'PENDING APPROVAL', value: pendingGuides.length.toString(), trend: 'Requires active audit', color: '#EF4444', bg: '#FEE2E2', trendColor: 'var(--color-text-muted)' }
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
            className="card glass" 
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'all 0.3s ease' }}
          >
            <div className="flex justify-between items-start">
              <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--color-text-light)' }}>{stat.title}</span>
              <div style={{ background: stat.bg, color: stat.color, padding: '0.5rem', borderRadius: '8px' }}>{stat.icon}</div>
            </div>
            <div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-secondary)' }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: stat.trendColor, fontWeight: 600 }}>{stat.trend}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 sm:mb-12">
        
        {/* Growth Analytics with Custom Metric Select */}
        <motion.div variants={itemVariants} className="lg:col-span-8 card glass flex-col" style={{ padding: '0' }}>
          <div className="flex justify-between items-center" style={{ padding: '2rem 2rem 1rem 2rem' }}>
            <div>
              <h2 className="h3" style={{ color: 'var(--color-secondary)' }}>Platform Performance</h2>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Review core platform usage analytics</p>
            </div>
            {/* Metric Tab Selector */}
            <div style={{ display: 'flex', background: '#F1F5F9', padding: '0.25rem', borderRadius: '2rem' }}>
              {['bookings', 'users', 'revenue'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    showToast(`Metrics changed to: ${tab.toUpperCase()}`, 'info');
                  }}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '1.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
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
          
          <div style={{ height: '320px', width: '100%', padding: '0 2rem 2rem 1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData[activeTab]} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} 
                  tickFormatter={(val) => activeTab === 'revenue' ? `$${val/1000}k` : val} 
                  dx={-10} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255, 255, 255,0.5)', background: 'rgba(255, 255, 255,0.9)', backdropFilter: 'blur(8px)', boxShadow: 'var(--shadow-xl)', padding: '1rem' }}
                  itemStyle={{ color: chartThemes[activeTab].fill, fontWeight: 700 }}
                  formatter={(value) => [activeTab === 'revenue' ? `$${value.toLocaleString()}` : value, chartThemes[activeTab].label]}
                />
                <Bar dataKey="value" fill={chartThemes[activeTab].fill} radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Stats & System Priority support line */}
        <motion.div variants={itemVariants} className="flex-col gap-6">
          <div className="card glass" style={{ padding: '1.75rem' }}>
            <h3 className="h4" style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>Core Benchmarks</h3>
            <div className="flex-col gap-4">
              {[
                { label: 'User Conversion', value: '18.4%', bg: '#ECFDF5', text: '#10B981', icon: <CheckCircle2 size={18} /> },
                { label: 'Avg Guide Rating', value: '4.92', bg: '#EFF6FF', text: 'var(--color-primary)', icon: <Star size={18} /> },
                { label: 'Resolution Time', value: '2.4 hours', bg: '#FFFBEB', text: '#B45309', icon: <Clock size={18} /> }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div style={{ width: '36px', height: '36px', background: item.bg, color: item.text, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>{item.label}</span>
                  </div>
                  <span style={{ fontWeight: 850, fontSize: '0.95rem', color: 'var(--color-secondary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-secondary), #1E293B)', color: 'white', border: 'none', padding: '1.75rem' }}>
            <h3 className="h4" style={{ marginBottom: '0.75rem', color: 'white' }}>Administrative Support</h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Your high-priority override line is fully active. Connect directly with deployment engineers.
            </p>
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              onClick={() => showToast('Opening console stream with DevOps on Slack...', 'info')}
              className="btn" 
              style={{ background: 'rgba(255, 255, 255,0.08)', color: 'white', width: '100%', border: '1px solid rgba(255, 255, 255,0.15)', display: 'flex', gap: '0.5rem', justifyContent: 'center', fontWeight: 700 }}
            >
              <Send size={14} /> Contact DevOps
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* Pending Verifications with AnimatePresence Dynamic Table Rows */}
      <motion.div variants={itemVariants} className="card glass" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
          <div>
            <h2 className="h3" style={{ color: 'var(--color-secondary)' }}>Pending Guide Verifications</h2>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Audit submitted credentials, certifications, and identity paperwork</p>
          </div>
          <div className="flex gap-2">
            <span className="badge" style={{ background: '#F1F5F9', color: 'var(--color-text-main)' }}>
              {filteredGuides.length} Pending Audit
            </span>
          </div>
        </div>

        <div className="responsive-table-wrapper">
          <table style={{ width: '100%', minWidth: '640px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead style={{ background: '#F8FAFC', color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>
              <tr>
                <th style={{ padding: '1.25rem 2rem' }}>GUIDE NAME</th>
                <th style={{ padding: '1.25rem 2rem' }}>LOCATION</th>
                <th style={{ padding: '1.25rem 2rem' }}>SPECIALIZATION</th>
                <th style={{ padding: '1.25rem 2rem' }}>SUBMISSION DATE</th>
                <th style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredGuides.length === 0 ? (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      No verifications match your search query or queue is empty.
                    </td>
                  </motion.tr>
                ) : (
                  filteredGuides.map((row) => (
                    <motion.tr 
                      key={row.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      style={{ borderBottom: '1px solid var(--color-border)', background: 'white' }}
                    >
                      <td style={{ padding: '1.25rem 2rem' }}>
                        <div className="flex items-center gap-3">
                          <img src={row.img} alt={row.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: 'var(--shadow-sm)' }} />
                          <div>
                            <div className="flex items-center gap-2">
                              <span style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{row.name}</span>
                              {row.priority && (
                                <span style={{ fontSize: '0.65rem', background: '#FEE2E2', color: '#DC2626', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '0.5rem' }}>PRIORITY</span>
                              )}
                            </div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>{row.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 2rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} style={{ color: 'var(--color-text-light)' }} /> {row.loc}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 2rem' }}>
                        <span style={{ background: '#F1F5F9', color: 'var(--color-text-main)', padding: '0.3rem 0.75rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.02em' }}>
                          {row.exp}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 2rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{row.date}</td>
                      <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                        <div className="flex gap-2 justify-end">
                          <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApproveGuide(row.id, row.name)}
                            style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#D1FAE5', color: '#059669', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 2px 6px rgba(5,150,105,0.1)' }}
                          >
                            <Check size={16} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRejectGuide(row.id, row.name)}
                            style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 2px 6px rgba(220,38,38,0.1)' }}
                          >
                            <X size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div style={{ padding: '1.25rem 2rem', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          <span>Showing {filteredGuides.length} of {pendingGuides.length} active verifications</span>
          <div className="flex items-center gap-4">
            <ChevronLeft size={16} style={{ cursor: 'pointer' }} />
            <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Page 1 of 1</span>
            <ChevronRight size={16} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}


