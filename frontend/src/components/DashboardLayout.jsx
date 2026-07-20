import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, MessageSquare, Star, Settings, Plus, LogOut, Menu, X, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const path = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const getNavLinks = () => {
    return [
      { name: 'Dashboard', path: user?.role === 'guide' ? '/dashboard/guide' : user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/traveler', icon: <LayoutDashboard size={18} /> },
      { name: 'My Bookings', path: '/dashboard/bookings', icon: <Calendar size={18} /> },
      { name: 'Messages', path: '/dashboard/messages', icon: <MessageSquare size={18} />, badge: 3 },
      { name: 'Reviews', path: '/dashboard/reviews', icon: <Star size={18} /> },
      { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={18} /> },
    ];
  };

  const navLinks = getNavLinks();

  const handleNavClick = (linkPath) => {
    setMobileOpen(false);
    navigate(linkPath);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group select-none">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-teal-500/10">
            <Compass size={20} className="text-white" />
          </div>
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent font-black text-xl tracking-tight">
            GuideConnect
          </span>
        </Link>
        <button 
          onClick={() => setMobileOpen(false)} 
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
        <div className="relative">
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80"} 
            alt={user?.name || "User"} 
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm" 
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </div>
        <div className="overflow-hidden">
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Welcome back</div>
          <div className="font-bold text-slate-800 text-sm truncate">{user ? user.name : "Guest User"}</div>
          <div className="text-xs text-slate-500 capitalize flex items-center gap-1 mt-0.5">
            <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 font-bold text-[10px] uppercase">{user?.role || "Traveler"}</span>
            <span className="flex items-center text-amber-500 font-semibold gap-0.5"><Star size={10} fill="#F59E0B" /> 4.9</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = path === link.path || (link.name === 'Dashboard' && path === '/dashboard');
          return (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' 
                  : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {link.icon}
                <span>{link.name}</span>
              </div>
              {link.badge && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {link.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        {user?.role === 'guide' && (
          <button className="w-full btn btn-primary flex items-center justify-center gap-2 py-2.5 text-sm shadow-sm">
            <Plus size={18} /> Create New Listing
          </button>
        )}
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-sm">
            <Compass size={18} className="text-white" />
          </div>
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent font-black text-lg">
            GuideConnect
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80"} 
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200" 
          />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 min-h-screen bg-white sticky top-0 h-screen z-30 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white z-50 md:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Outlet Content */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
